# Storage

The `storage` component lets us easily deploy S3 buckets to store files.

## Quick start

```yaml
service: my-app
provider:
  name: aws

storage:
  avatars:

plugins:
    - serverless-lift
```

On `serverless deploy`, a properly configured S3 bucket will be created.

## How it works

The `storage` component creates and configures the S3 bucket for production:

- Files stored in the bucket are automatically encrypted (S3 takes care of encrypting and decrypting data on the fly, without change to our applications).
- File versioning is enabled to prevent any accidental data loss. Old versions are automatically purged after 30 days to avoid extra costs.
- Storage costs are optimized automatically via [intelligent tiering](https://aws.amazon.com/s3/storage-classes/).
