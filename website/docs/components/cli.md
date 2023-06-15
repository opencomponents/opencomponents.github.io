---
sidebar_position: 2
---

# Command Line Tool

## Install the cli

To install cli, you should type:

```sh
$ npm install oc -g
```

## Configure autocomplete

Autocomplete is supported for Mac and Linux.

To enable it in **zsh**, you should type:

```sh
echo '. <(oc completion)' >> .zshrc
```

To enable it in **bash**, you should type:

```sh
oc completion >> ~/.bashrc
```

or

```sh
oc completion >> ~/.bash_profile
```

After enabling autocomplete you should reload the shell.

## Commands

Basic usage:

```sh
$ oc <command> [options]
```

Hint: Run -h with any command to show the help

For a list of all the available commands, ype **oc** in your terminal

```sh
$ oc
```

---

### clean

Remove the node_modules directory from each component's subfolder

#### Usage:

```sh
$ oc clean <dirPath> [options]
```

#### Parameters:

| Name      | Description                                               | Default |
| --------- | --------------------------------------------------------- | ------- |
| `dirPath` | The name of the directory where the components are stored |

#### Options:

| Name    | Description                   |
| ------- | ----------------------------- |
| `--yes` | Skip all confirmation prompts |

#### Example:

```sh
$ oc clean ../all-components --yes
```

---

### dev

Runs a local oc test registry in order to develop and test components

#### Usage:

```sh
$ oc dev <dirPath> [port] [baseUrl] [options]
```

#### Parameters:

| Name      | Description                                                         | Default                |
| --------- | ------------------------------------------------------------------- | ---------------------- |
| `dirPath` | The name of the directory to watch, where the components are stored |
| `port`    | The port where to start a local oc instance.                        | 3000                   |
| `baseUrl` | The base url the component is hosted from.                          | http://localhost:port/ |

#### Options:

| Name                       | Description                                                                                                                                                                                                                                                          | Default |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--fallbackRegistryUrlUrl` | Url to another registry which will be used by dev registry when component cannot be found in local registry                                                                                                                                                          | empty   |
| `--hotReloading`           | Enables hot reloading. Note: when hot reloading is set to true, each request to the component will make the registry to create a new instance for the javascript closures to be loaded, while when false the instance will be recycled between components executions | true    |
| `--verbose`                | Verbosity                                                                                                                                                                                                                                                            | false   |
| `--watch`                  | enable the watcher                                                                                                                                                                                                                                                   | true    |
| `--production`             | force packaging for production                                                                                                                                                                                                                                       | false   |

#### Example:

```sh
$ oc dev ../all-components 3001 127.0.0.1:3001 --fallbackRegistryUrl=http://anotherhost:anotherport/
```

---

### init

Creates a new empty component in the current folder

#### Usage:

```sh
$ oc init <componentPath> [templateType]
```

#### Parameters:

| Name            | Description                                              | Default                |
| --------------- | -------------------------------------------------------- | ---------------------- |
| `componentPath` | The relative path with a name of the component to create |
| `templateType`  | The name of the published template module on npm         | oc-template-handlebars |

#### Example:

```sh
$ oc init test-component oc-template-jade
```

or with using relative path:

```sh
$ oc init components/test-component oc-template-jade
```

which will create `test-component` in `components` directory.

---

### mock

Allows to mock configuration in order to facilitate local development

#### Usage

```sh
$ oc mock <targetType> <targetName> <targetValue>
```

#### Parameters:

| Name          | Description                                                           | Default |
| ------------- | --------------------------------------------------------------------- | ------- |
| `targetType`  | The type of item to mock                                              |         |
| `targetName`  | The item to mock                                                      |         |
| `targetValue` | The mocked value (static plugin) or the file to read (dynamic plugin) |         |

#### Example:

```sh
$ oc mock plugin hash "always-returned-value"
```

Creates static mock for a "hash" plugin which always returns "always-returned-value" value

To run a dynamic plugin, you can run a plugin locally. This could be the same one running in your registry, or a mock js that behaves differently locally.

```sh
$ oc mock plugin <targetName> <path to mock .js>
```

---

### package

Creates the packaged component ready to be published

#### Usage:

```sh
$ oc package <componentPath> [options]
```

#### Parameters:

| Name            | Description                          | Default |
| --------------- | ------------------------------------ | ------- |
| `componentPath` | The path of the component to package |         |

#### Options:

| Name                         | Description                                                                       | Default |
| ---------------------------- | --------------------------------------------------------------------------------- | ------- |
| `--compress`                 | Create zipped file                                                                | false   |
| `--useComponentDependencies` | Reuse already installed dependencies to save packaging time and network bandwidth | false   |

#### Example:

```
$ oc publish my-new-component/
```

---

### preview

Runs a test page consuming a component

#### Usage:

```sh
$ oc preview <componentHref>
```

#### Parameters:

| Name            | Description                          | Default |
| --------------- | ------------------------------------ | ------- |
| `componentHref` | The name of the component to preview |         |

#### Examples:

```sh
$ oc preview "http://localhost:3000/my-new-component/1.0.0/?param1=hello&name=Arthur"
```

---

### publish

Publish a component

#### Usage:

```sh
$ oc publish <componentPath> [options]
```

#### Parameters:

| Name            | Description                          | Default |
| --------------- | ------------------------------------ | ------- |
| `componentPath` | The path of the component to publish |         |

#### Options:

| Name            | Description                                                                        | Default |
| --------------- | ---------------------------------------------------------------------------------- | ------- |
| `--password`    | password used to authenticate when publishing to registry                          |         |
| `--username`    | username used to authenticate when publishing to registry                          |         |
| `--skipPackage` | to skip packaging step (useful if you publish at a different stage than packaging) | false   |
| `--registries`  | alternative to pass a list of registries directly on the command instead of a json |         |
| `--dryRun`      | Indicates that you don't want to publish the OC and only report if it's ready to   | false   |

#### Examples:

```sh
$ oc publish my-new-component/
```

---

### registry

Shows, adds, removes oc registries to the current project

#### Usage:

```sh
$ oc registry <command>
```

#### Parameters:

| Name          | Description     | Default |
| ------------- | --------------- | ------- |
| `registryUrl` | url of registry |         |

#### Commands:

| Name                   | Description                                      | Default |
| ---------------------- | ------------------------------------------------ | ------- |
| `add <registryUrl>`    | Adds oc registries to the current project        |         |
| `ls`                   | Shows oc registries added to the current project |         |
| `remove <registryUrl>` | Removes oc registries from the current project   |         |

#### Examples:

```
$ oc registry add http://my-registry.in.my.domain/
$ oc registry ls
$ oc registry remove http://my-registry.in.my.domain/
```
