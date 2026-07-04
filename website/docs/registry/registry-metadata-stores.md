---
sidebar_position: 3
---

# Registry Metadata Stores

:::info New feature
Registry metadata stores are available since **v0.50.56**.
:::

## Overview

By default, an OpenComponents registry keeps its **metadata index** — the list of
which components and versions exist — in two storage files:
`components.json` and `components-details.json`. This index is *derived*: the
registry rebuilds it by scanning the whole storage directory tree
(`componentsDir/<component>/<version>/package.json`) on startup and again after
every publish.

That scan is `O(registry size)`. It also isn't transactional: concurrent
publishes on different nodes each scan and then overwrite `components.json`
(last-writer-wins), which only "works" because the next scan re-derives the truth
from the immutable directory tree. Under heavy, multi-node publishing this drives
CPU and GC pressure and makes publish cost grow with the size of the registry.

A **metadata store** is an opt-in feature that moves this index into a pluggable
database that becomes the source of truth for *what exists*. With it:

- **Publish** becomes an `O(1)` atomic row append instead of a full scan + blob
  rewrite.
- **Startup** becomes a single `O(registry size)` query instead of a directory
  walk (and steady-state hydration is just one query).
- **Cross-node correctness** is enforced by a `PRIMARY KEY (component_name,
  version)` constraint instead of relying on self-healing rescans. Concurrent
  publishes of the same version → one wins, the other gets a clear
  "already exists" error; different components never contend.

### What it changes — and what it doesn't

The metadata store **only** owns the index of which `name@version` pairs exist.
It does **not** change:

- **Static files** — component bundles still live in the configured storage
  adapter (S3, GS, Azure Blob, …). Storage is still required.
- **`package.json` files** — still fetched from storage by `getComponentInfo`.
- **The hot read path** — component reads are still served from OC's in-memory
  cache and never hit the database.

The metadata store contains only four fields per version: component name,
version, publish date, and template size — exactly what the in-memory caches
need.

> Metadata mode is **opt-in and non-breaking**. With no `metadata` block in the
> configuration, the registry behaves byte-for-byte as before (storage-only
> mode).

## How it works

The store is a pluggable adapter, injected the same way as the `storage.adapter`.
The registry core takes zero database dependencies. The contract each adapter
implements is exported by the `oc-metadata-adapters-utils` package:

```ts
type ComponentRow = {
  name: string;
  version: string;
  publishDate: number;   // unix seconds
  templateSize?: number;
};

interface MetadataStore {
  adapterType: string;
  isValid(): boolean;                            // synchronous config sanity check
  initialise(): Promise<void>;                   // open pool; ensure/verify schema
  getAllComponents(): Promise<ComponentRow[]>;   // hydration — feeds the caches
  addVersion(row: ComponentRow): Promise<void>;  // commit point
  close?(): Promise<void>;                        // optional: release pool on shutdown
}
```

Runtime behavior in metadata mode:

- **Startup** — the registry initialises the store, then hydrates its in-memory
  list and details caches from a single `getAllComponents()` call. If the store
  cannot be initialised or queried, startup fails (fail-closed).
- **Reads** — served entirely from the in-memory cache; hot component reads never
  touch the database.
- **Polling** — the cache is re-hydrated from `getAllComponents()` on the polling
  interval. If a poll fails, the registry keeps serving the last good in-memory
  cache and retries on the next interval.
- **Publish** uses a reservation state machine so a failed/concurrent publish can
  never clobber another:
  1. validate the publish
  2. write the `package.json`
  3. **reserve** the metadata row
  4. upload the statics to storage
  5. **commit** the metadata row
  A duplicate or in-progress reservation surfaces as the usual
  "component version already exists" publish error. If the upload or commit
  fails, the reservation is best-effort aborted; any orphaned statics are
  harmless unreferenced bytes and a re-publish is idempotent.
- **Shutdown** — `registry.close(callback)` closes the HTTP server and then calls
  the adapter's optional `close()` hook so it can release its connection pool.

## Configuration

Add a `metadata` block as a sibling to `storage`. Storage remains required.

```js
const azureSqlMetadataAdapter = require("oc-azure-sql-metadata-adapter").default;
const s3StorageAdapter = require("oc-s3-storage-adapter");

registry.configure({
  storage: {
    adapter: s3StorageAdapter,
    options: {
      bucket: process.env.OC_STORAGE_BUCKET,
      region: process.env.OC_STORAGE_REGION,
      componentsDir: "components",
      path: process.env.OC_STORAGE_BASE_URL,
    },
  },
  metadata: {
    adapter: azureSqlMetadataAdapter,
    options: {
      connectionString: process.env.OC_METADATA_SQL_CONNECTION_STRING,
    },
    manageSchema: true,
    reconcileFromStorage: false,
    exportLegacyFiles: false,
  },
});
```

### `metadata` options

| Parameter                            | Type             | Mandatory | Default | Description                                                                                                                                                                              |
| ------------------------------------ | ---------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metadata`                           | object           | no        | -       | Presence enables metadata mode. Absent → storage-only mode (default).                                                                                                                    |
| `metadata.adapter`                   | function         | yes\*     | -       | Metadata adapter factory returning a `MetadataStore` (\*required if using metadata).                                                                                                     |
| `metadata.options`                   | object           | yes\*     | -       | Connection / pool options passed to the adapter.                                                                                                                                         |
| `metadata.manageSchema`              | boolean          | no        | `true`  | When `true`, the adapter auto-creates its table/index if missing. Set `false` for locked-down databases where operators manage DDL; the adapter then only verifies the schema.          |
| `metadata.reconcileFromStorage`      | boolean          | no        | `false` | Bake-in flag. On startup, scan storage and idempotently insert any `name@version` present in the directory tree but missing from the database (existing rows skipped).                   |
| `metadata.exportLegacyFiles`         | boolean          | no        | `false` | Bake-in / DR flag. On startup, write database-derived `components.json` and `components-details.json` projections back to storage.                                                       |
| `metadata.exportLegacyFilesInterval` | number (seconds) | no        | -       | When set (and `exportLegacyFiles` is `true`), also refresh those projections on a non-overlapping background timer. Omit to export on startup only. The timer is cleared on shutdown.    |

The bake-in flags (`reconcileFromStorage`, `exportLegacyFiles`,
`exportLegacyFilesInterval`) are only needed while migrating; see
[Migrating an existing registry](#migrating-an-existing-registry).

> The legacy file export is **decoupled from the publish path** — a publish never
> triggers a full-registry export, so publishing stays an `O(1)` append. The
> exported files are a **one-directional projection** of the database (DB → files,
> never read back to mutate the DB). They exist for rollback and as a
> cold-start / DR snapshot; they do **not** replace the storage adapter, which
> still holds all component statics.

## Available adapters

### Azure SQL / SQL Server — `oc-azure-sql-metadata-adapter`

A connection-pool-based (`mssql`) adapter.

```sh
npm install oc-azure-sql-metadata-adapter
```

```js
metadata: {
  adapter: require("oc-azure-sql-metadata-adapter").default,
  options: {
    connectionString: process.env.OC_METADATA_SQL_CONNECTION_STRING,
  },
}
```

You can also pass object connection settings instead of a connection string
(`server`, `database`, `user`, `password`, nested `options`, etc. — passed
through to `mssql`). When no `connectionString`, `password`, or explicit
`authentication` is provided, the adapter defaults to Microsoft Entra ID
(`azure-active-directory-default`), so it can connect using an ambient managed
identity with **no secret in config** (pass `clientId` for a user-assigned
identity).

Adapter-specific options: `manageSchema` (default `true`), `schemaName` (default
`dbo`), and `tableName` (default `oc_components`). Identifiers must match
`/^[A-Za-z_][A-Za-z0-9_]*$/`.

With `manageSchema: true` the adapter creates (roughly):

```sql
CREATE TABLE [dbo].[oc_components] (
  component_name  NVARCHAR(255) NOT NULL,
  version         NVARCHAR(64)  NOT NULL,
  publish_date    BIGINT        NOT NULL,
  template_size   BIGINT        NULL,
  status          NVARCHAR(16)  NOT NULL DEFAULT N'committed',
  publish_token   NVARCHAR(64)  NULL,
  created_at      DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at      DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
  PRIMARY KEY (component_name, version)
);
CREATE INDEX ix_oc_components_name ON [dbo].[oc_components] (component_name);
```

The primary key is the concurrency guard: same-version unique violations
(`2627` / `2601`) are mapped to the shared duplicate / in-progress error codes
before any storage upload happens.

### Azure Table Storage — `oc-azure-table-metadata-adapter`

A schemaless, HTTP-based adapter (`@azure/data-tables`). If you already use Azure
Blob Storage for statics, you can reuse the **same storage account** for the
metadata table — no second database to provision. Its `PartitionKey + RowKey`
uniqueness is exactly the concurrency model the metadata store needs.

```sh
npm install oc-azure-table-metadata-adapter
```

```js
metadata: {
  adapter: require("oc-azure-table-metadata-adapter").default,
  options: {
    connectionString: process.env.OC_METADATA_TABLE_CONNECTION_STRING,
  },
}
```

Authentication precedence when `connectionString` is absent:
`accountName` + `accountKey` → `sasToken` → explicit `credential` →
`DefaultAzureCredential` (managed identity / workload identity / `az login`), so
the registry can run with no secret. Other options include `endpoint`,
`tableName` (default `occomponents`), `manageSchema` (default `true`), and
`allowInsecureConnection` (for Azurite / local development). The adapter maps a
`409 Conflict` to the shared `VERSION_ALREADY_EXISTS` code.

### Writing a custom adapter

Implement the contract from `oc-metadata-adapters-utils`. Each adapter maps its
driver's unique-violation to the shared error codes (e.g. SQL Server
`2627`/`2601`, Postgres `23505`, MySQL `1062`):

```ts
import type { ComponentRow, MetadataStore } from "oc-metadata-adapters-utils";
import {
  VERSION_ALREADY_EXISTS,
  VERSION_PUBLISH_IN_PROGRESS,
} from "oc-metadata-adapters-utils";
```

## Migrating an existing registry

Migration is **gradual and lossless** — storage stays authoritative-enough
throughout the window so you can roll back at any point.

### 1. Backfill the database

Before serving traffic in metadata mode, populate the store from your existing
index using the CLI command:

```sh
oc registry migrate-metadata ./registry.config.js
```

The argument is a path to a module exporting the **same config object** you pass
to `registry.configure()`. It must include both `storage` and `metadata` and pass
registry config validation. The module may be CommonJS, an ES module `default`
export, or an **async function** returning the config (useful for resolving
secrets first):

```js
// registry.config.js — CommonJS
const azureSqlMetadataAdapter = require("oc-azure-sql-metadata-adapter").default;
const s3StorageAdapter = require("oc-s3-storage-adapter");

module.exports = {
  baseUrl: "http://my-registry.example.com/",
  storage: {
    adapter: s3StorageAdapter,
    options: {
      bucket: "my-bucket",
      region: "us-east-1",
      componentsDir: "components",
      path: "https://cdn.example.com/",
    },
  },
  metadata: {
    adapter: azureSqlMetadataAdapter,
    options: {
      connectionString: process.env.OC_METADATA_SQL_CONNECTION_STRING,
    },
  },
};
```

The command initialises the adapter and backfills rows from
`${componentsDir}/components-details.json` (which already *is* the
`ComponentRow` set). If that file is missing, it falls back to scanning
`${componentsDir}/<component>/<version>/package.json`. Existing rows are skipped,
so the command is **idempotent** and safe to re-run across nodes. It logs
`{ scanned, inserted, skipped }` and closes the adapter pool on exit (even on
failure).

### 2. Cut over

Deploy with the `metadata` block configured. During the migration window enable
the bake-in flags:

```js
metadata: {
  adapter: azureSqlMetadataAdapter,
  options: { /* ... */ },
  reconcileFromStorage: true,  // heal anything published by still-storage-mode nodes
  exportLegacyFiles: true,     // keep components.json fresh for rollback / external consumers
}
```

Nodes now hydrate from the database. A safe rollout order:

1. Deploy the metadata config to a non-serving environment.
2. Run `oc registry migrate-metadata ./registry.config.js`.
3. Start **one** registry instance in metadata mode and verify reads.
4. Roll out metadata mode to the remaining instances.

### 3. Bake-in

Run mixed / observe. While the bake-in flags are on:

- **`reconcileFromStorage`** upserts, on each boot, any `name@version` that exists
  in the directory tree but is missing from the database — healing anything a
  node still running in storage mode published during the cutover.
- **`exportLegacyFiles`** (optionally on `exportLegacyFilesInterval`) keeps
  `components.json` / `components-details.json` fresh in storage, so external
  consumers keep working and **rollback to storage mode loses at most one export
  interval**.

The directory tree remains authoritative-enough that the reconcile can heal any
miss — the same self-healing principle storage mode relies on, applied
deliberately once at the boundary.

### 4. Steady state

Once you're confident, drop the bake-in scaffolding:

- Set `reconcileFromStorage: false` (the directory scan is now abandoned).
- Optionally keep `exportLegacyFiles: true` permanently as a cheap, one-way DR
  snapshot / cold-start fallback so the database is never an absolute single
  point of failure for booting.

`components.json` is now a **non-authoritative projection** of the database.

### Rolling back

Because the legacy files are kept fresh during bake-in, rolling back is simply
removing the `metadata` block (or reverting the deploy): the registry returns to
storage mode and reads the projected `components.json`, losing at most one export
interval of updates.

## Failure model

- **Startup, DB down** — readiness fails and the node retries with backoff;
  already-running nodes keep serving from cache and the load balancer skips the
  not-ready node. The registry never starts silently empty.
- **Poll, DB blip** — fully resilient: keep serving the in-memory cache, log, and
  retry next interval. The only effect is that new publishes propagate slightly
  later.
- **Publish, DB unreachable** — the publish fails with a clear error; any statics
  uploaded are harmless orphans and the client can retry (idempotent). There is
  no buffering.

Net: **reads survive any DB blip, and publishes correctly refuse during one.**
