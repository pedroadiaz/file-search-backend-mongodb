#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FileSearchBackendMongodbStack } from '../lib/file-search-backend-mongodb-stack';
import { S3BucketProcessorStack } from '../lib/s3-bucket-processor-stack';
import { config } from '../lib/env-config';

const app = new cdk.App();

new FileSearchBackendMongodbStack(app, 'FileSearchBackendMongodbStack', {
  config
});

new S3BucketProcessorStack(app, "S3BucketProcessorStack", {
  config
});