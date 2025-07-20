---
sidebar_position: 2
---

# Registry using Google Storage

To use Google Storage make sure you have an account and credentials. When running on a server don't forget to set your `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your authentication json.

[Setting Up Authentication for Server to Server Production Applications](https://cloud.google.com/docs/authentication/production)

Install the oc-gs-storage-adapter

```
npm install oc-gs-storage-adapter --save
```

Then on the entry point, what you need on an `index.js` file is:

```js
var oc = require("oc");
var gs = require("oc-gs-storage-adapter");

var configuration = {
  verbosity: 0,
  baseUrl: "https://my-components-registry.mydomain.com/",
  port: 3000,
  tempDir: "./temp/",
  refreshInterval: 600,
  pollingInterval: 5,
  storage: {
    adapter: gs,
    options: {
      projectId: "myproject-12345",
      bucket: "my-components-bucket",
      path: "//storage.googleapis.com/my-components-bucket/",
      componentsDir: "components",
      maxAge: 3600,
    },
  },
  env: { name: "production" },
};

const registry = new oc.Registry(configuration);

registry.start(function (err, app) {
  if (err) {
    console.log("Registry not started: ", err);
    process.exit(1);
  }
  console.log("Registry started successfully on port", configuration.port);
});
```

## Advanced Configuration Options

### Complete Storage Options

```js
const storageOptions = {
  // Required
  projectId: "myproject-12345",
  bucket: "my-components-bucket",
  path: "//storage.googleapis.com/my-components-bucket/",
  
  // Optional
  componentsDir: "components",           // Directory for components
  maxAge: 3600,                         // Cache control max-age (seconds)
  keyFilename: "./service-account.json", // Path to service account key
  
  // Advanced options
  timeout: 30000,                       // Request timeout (ms)
  retries: 3,                          // Number of retries for failed requests
  autoRetry: true,                     // Enable automatic retries
  maxRetryDelay: 64000,                // Maximum retry delay (ms)
  
  // Custom metadata
  metadata: {
    cacheControl: "public, max-age=3600",
    contentType: "application/javascript"
  }
};
```

## Deployment Scenarios

### Single Region Deployment

```js
// Basic single-region setup
const configuration = {
  baseUrl: "https://components.mycompany.com/",
  storage: {
    adapter: gs,
    options: {
      projectId: "mycompany-components",
      bucket: "components-prod-us-central1",
      path: "//storage.googleapis.com/components-prod-us-central1/",
      componentsDir: "components",
      maxAge: 86400, // 24 hours
    },
  },
};
```

### Multi-Region Deployment

```js
// Multi-region setup with CDN
const configuration = {
  baseUrl: "https://components-cdn.mycompany.com/",
  storage: {
    adapter: gs,
    options: {
      projectId: "mycompany-components",
      bucket: "components-prod-multi-region",
      path: "//storage.googleapis.com/components-prod-multi-region/",
      componentsDir: "components",
      maxAge: 604800, // 7 days for CDN caching
      metadata: {
        cacheControl: "public, max-age=604800, s-maxage=86400"
      }
    },
  },
};
```

### Staging and Production Setup

```js
// Environment-based configuration
const environment = process.env.NODE_ENV || 'development';

const configurations = {
  development: {
    bucket: "components-dev",
    maxAge: 300, // 5 minutes
    verbosity: 2
  },
  staging: {
    bucket: "components-staging",
    maxAge: 3600, // 1 hour
    verbosity: 1
  },
  production: {
    bucket: "components-prod",
    maxAge: 86400, // 24 hours
    verbosity: 0
  }
};

const config = configurations[environment];

const configuration = {
  baseUrl: `https://components-${environment}.mycompany.com/`,
  verbosity: config.verbosity,
  storage: {
    adapter: gs,
    options: {
      projectId: "mycompany-components",
      bucket: config.bucket,
      path: `//storage.googleapis.com/${config.bucket}/`,
      maxAge: config.maxAge,
    },
  },
};
```

## Cost Optimization Strategies

### Storage Class Optimization

```js
// Configure lifecycle policies for cost optimization
const { Storage } = require('@google-cloud/storage');

const setupLifecyclePolicies = async (bucketName) => {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  
  await bucket.setMetadata({
    lifecycle: {
      rule: [
        {
          condition: {
            age: 30, // 30 days
            matchesStorageClass: ['STANDARD']
          },
          action: {
            type: 'SetStorageClass',
            storageClass: 'NEARLINE'
          }
        },
        {
          condition: {
            age: 90, // 90 days
            matchesStorageClass: ['NEARLINE']
          },
          action: {
            type: 'SetStorageClass',
            storageClass: 'COLDLINE'
          }
        },
        {
          condition: {
            age: 365, // 1 year
            matchesStorageClass: ['COLDLINE']
          },
          action: {
            type: 'SetStorageClass',
            storageClass: 'ARCHIVE'
          }
        }
      ]
    }
  });
  
  console.log(`Lifecycle policies set for bucket ${bucketName}`);
};

// Apply lifecycle policies
setupLifecyclePolicies('my-components-bucket');
```

### CDN Integration

```js
// Configure Cloud CDN for better performance and cost
const configuration = {
  baseUrl: "https://components-cdn.mycompany.com/",
  storage: {
    adapter: gs,
    options: {
      projectId: "mycompany-components",
      bucket: "components-prod",
      path: "//storage.googleapis.com/components-prod/",
      maxAge: 2592000, // 30 days
      metadata: {
        cacheControl: "public, max-age=2592000, s-maxage=86400"
      }
    },
  },
};
```

### Compression and Optimization

```js
// Enable compression for better performance
const configuration = {
  storage: {
    adapter: gs,
    options: {
      projectId: "mycompany-components",
      bucket: "components-prod",
      path: "//storage.googleapis.com/components-prod/",
      metadata: {
        contentEncoding: "gzip",
        cacheControl: "public, max-age=86400"
      }
    },
  },
};
```

## Security Best Practices

### IAM Roles and Permissions

```bash
# Create custom role with minimal permissions
gcloud iam roles create ocRegistryRole \
  --project=myproject-12345 \
  --title="OC Registry Role" \
  --description="Minimal permissions for OC registry" \
  --permissions="storage.objects.create,storage.objects.delete,storage.objects.get,storage.objects.list,storage.objects.update"

# Assign role to service account
gcloud projects add-iam-policy-binding myproject-12345 \
  --member="serviceAccount:oc-registry-sa@myproject-12345.iam.gserviceaccount.com" \
  --role="projects/myproject-12345/roles/ocRegistryRole"
```

### Bucket Security Configuration

```js
// Secure bucket configuration
const { Storage } = require('@google-cloud/storage');

const setupBucketSecurity = async (bucketName) => {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  
  // Set uniform bucket-level access
  await bucket.setMetadata({
    iamConfiguration: {
      uniformBucketLevelAccess: {
        enabled: true
      }
    }
  });
  
  // Enable versioning for component history
  await bucket.setMetadata({
    versioning: {
      enabled: true
    }
  });
  
  // Set CORS policy for web access
  await bucket.setCorsConfiguration([
    {
      origin: ['https://mycompany.com', 'https://*.mycompany.com'],
      method: ['GET', 'HEAD'],
      responseHeader: ['Content-Type', 'Access-Control-Allow-Origin'],
      maxAgeSeconds: 3600
    }
  ]);
  
  console.log(`Security configuration applied to bucket ${bucketName}`);
};
```

### Environment Variable Security

```js
// Secure environment configuration
const configuration = {
  storage: {
    adapter: gs,
    options: {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      bucket: process.env.GOOGLE_STORAGE_BUCKET,
      path: process.env.GOOGLE_STORAGE_PATH,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      // Never hardcode credentials in source code
    },
  },
};
```

## Troubleshooting Common Issues

### Authentication Problems

**Issue**: "Error: Could not load the default credentials"

```bash
# Solution 1: Set environment variable
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"

# Solution 2: Use gcloud auth for development
gcloud auth application-default login

# Solution 3: Verify service account permissions
gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --format="table(bindings.role)" \
  --filter="bindings.members:serviceAccount:YOUR_SERVICE_ACCOUNT"
```

**Issue**: "Access denied" errors

```bash
# Check bucket permissions
gsutil iam get gs://your-bucket-name

# Add necessary permissions
gsutil iam ch serviceAccount:your-sa@project.iam.gserviceaccount.com:objectAdmin gs://your-bucket-name
```

### Storage and Upload Issues

**Issue**: "Component upload fails"

```js
// Debug storage adapter issues
const configuration = {
  verbosity: 2, // Enable detailed logging
  storage: {
    adapter: gs,
    options: {
      // ... your options
      timeout: 60000, // Increase timeout for large components
      retries: 5,     // Increase retry attempts
    },
  },
};
```

**Issue**: "Bucket not found" errors

```bash
# Verify bucket exists and is accessible
gsutil ls gs://your-bucket-name

# Create bucket if needed
gsutil mb -p your-project-id -c STANDARD -l us-central1 gs://your-bucket-name
```

### Performance Issues

**Issue**: "Slow component loading"

```js
// Optimize for performance
const configuration = {
  storage: {
    adapter: gs,
    options: {
      // Use regional bucket for better performance
      bucket: "components-us-central1",
      // Increase cache time
      maxAge: 86400,
      // Enable compression
      metadata: {
        contentEncoding: "gzip",
        cacheControl: "public, max-age=86400"
      }
    },
  },
};
```

**Issue**: "High storage costs"

```bash
# Analyze storage usage
gsutil du -sh gs://your-bucket-name

# Check storage class distribution
gsutil ls -L -b gs://your-bucket-name

# Apply lifecycle policies to reduce costs
gsutil lifecycle set lifecycle.json gs://your-bucket-name
```

### Network and Connectivity Issues

**Issue**: "Timeout errors during component requests"

```js
// Increase timeouts and add retry logic
const configuration = {
  storage: {
    adapter: gs,
    options: {
      timeout: 30000,
      retries: 3,
      autoRetry: true,
      maxRetryDelay: 64000,
    },
  },
};
```

**Issue**: "CORS errors in browser"

```bash
# Set CORS configuration
gsutil cors set cors.json gs://your-bucket-name

# Example cors.json:
# [
#   {
#     "origin": ["https://yoursite.com"],
#     "method": ["GET", "HEAD"],
#     "responseHeader": ["Content-Type"],
#     "maxAgeSeconds": 3600
#   }
# ]
```

## Monitoring and Maintenance

### Health Checks

```js
// Add health check endpoint
const configuration = {
  // ... other options
  customRoutes: [
    {
      route: '/health',
      method: 'get',
      handler: (req, res) => {
        // Check storage connectivity
        const storage = new (require('@google-cloud/storage').Storage)();
        storage.bucket(process.env.GOOGLE_STORAGE_BUCKET)
          .exists()
          .then(([exists]) => {
            if (exists) {
              res.json({ status: 'healthy', storage: 'connected' });
            } else {
              res.status(500).json({ status: 'unhealthy', storage: 'bucket not found' });
            }
          })
          .catch(error => {
            res.status(500).json({ status: 'unhealthy', error: error.message });
          });
      }
    }
  ]
};
```

### Logging and Monitoring

```js
// Enhanced logging configuration
const configuration = {
  verbosity: process.env.NODE_ENV === 'production' ? 0 : 1,
  storage: {
    adapter: gs,
    options: {
      // ... storage options
    },
  },
  // Custom logging
  customLogger: {
    info: (message) => console.log(`[INFO] ${new Date().toISOString()} ${message}`),
    warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} ${message}`),
    error: (message) => console.error(`[ERROR] ${new Date().toISOString()} ${message}`)
  }
};
```

## Next Steps

- **[Registry Configuration](registry-configuration)** - Complete registry setup options
- **[Publishing Components](../components/publishing-to-a-registry)** - Deploy components to your registry
- **[Client-side Integration](../consumers/client-side-rendering)** - Consume components in applications
- **[Architecture Overview](../miscellaneous/architecture-overview)** - Understand the complete system
