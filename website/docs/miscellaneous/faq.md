---
sidebar_position: 4
---

# F.A.Q.

## What's the difference between rendered and un-rendered components?

Un-rendered components delegate the rendering to the clients. This is useful for performance and cacheability.
[More details about rendered components](architecture-overview#consuming-rendered-components) and about [un-rendered components](architecture-overview#consuming-un-rendered-components)

## What happens when a publish is made?

[Look at this page](architecture-overview#what-happens-when-a-publish-is-made)

## How the distribution works?

[Look at this page](architecture-overview#how-distribution-works)

## Can I link a CDN on top of the S3 bucket?

Yes! Either you use Cloudfront or any other vendor's on top of the S3, you will get a url, for instance `https://123456789.cloudfront.org/...` or `https://my-cdn.my-company.com`. Then set the `s3.path` property in the [registry configuration](/docs/registry/registry-configuration#registry-configuration).

## Can I avoid using S3?

Yes! There is support for [Google Storage](../registry/registry-using-google-storage), Microsoft Azure and more. For more storage adapters and creating new ones, please join the conversation in this repo: https://github.com/opencomponents/storage-adapters

## I already use S3 to save my assets via a consolidated build pipeline. Can I reference this files from my OC components?

Yes. OC allows you to bundle all the resources a component needs inside itself (and takes care of putting all the stuff in place during the publishing), but you are free to link (absolutely) any other static asset inside your components' markup. OC will still need S3 for saving its stuff though: if you decide to share the same S3 bucket (probably because you already got a configured CDN on top of it) be careful! In particular,

- OC heavily relies on S3 for its operations. Dedicating its own bucket is a good measure for limiting it to interfere with any other application.
- OC saves some files with different ACL policies when a component is published. If your bucket is already configured to be completely public (it may be the case if you use it for hosting a static site), this may not be good for OC as you may not want to expose some private stuff. In this case, you may need to get a separate bucket so that you can apply the appropriate configuration.

## I've successfully published a component on the registry, what if I want to remove it?

Removing a component manually in s3 is tricky because oc relies on immutability for keeping infinite caches on many layers (clients, registry, and cdn - if there's any). That's why publishing a new version is always the recommended approach to easily invalidate all the caches. If you are doing it in an experimental phase is fine, but we ultimately wouldn't recommend it in production.

## Where can i find the logs for oc registry?

logs are not automatically saved as text files anywhere as the registry is supposed to be stateless and distributed. When instantiating the registry app, the registry [exposes a set of events](../registry/registry-configuration#registryoneventname-callback) that you can use to connect to your logging infrastructure

For example, at OpenTable we do logging with the ELK stack for business metrics, and Graphite/Graphana for system metrics - so in real time we can profile resources, performance, and behaviour when we have millions of requests/hour(and connect those metrics to monitoring and alerting)

## Can I setup a debugger with Visual Studio Code?

Yes, [look at this page](debugging).
