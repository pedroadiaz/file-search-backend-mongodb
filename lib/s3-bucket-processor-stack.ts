import * as cdk from 'aws-cdk-lib';
import { AwsEnvStackProps, nodejsLambda } from './file-search-backend-mongodb-stack';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Construct } from 'constructs';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const stage = process.env.STAGE ?? "development";

export class S3BucketProcessorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsEnvStackProps) {
    super(scope, id, props);
    
    const {config} = props;

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'FileSearchBackendMongodbQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const bucket = new Bucket(this, "my-upload-bucket", {
        bucketName: "file-upload-bucket-mongodb-development"
    });

    const pdfProcessor = nodejsLambda(this, "pdf-processor-mongodb-development", "../src/functions/processFiles/convertPDFToText.ts", 120, 512);
    const textProcessor = nodejsLambda(this, "text-processor-mongodb-development", "../src/functions/processFiles/processTextFile.ts", 120, 512);
    const audioProcessor = nodejsLambda(this, "audio-processor-mongodb-development", "../src/functions/processFiles/convertAudioToText.ts", 120, 512);

    bucket.addObjectCreatedNotification(new LambdaDestination(pdfProcessor), {
        suffix: "pdf"
    });
    bucket.addObjectCreatedNotification(new LambdaDestination(textProcessor), {
        suffix: "txt"
    });
    bucket.addObjectCreatedNotification(new LambdaDestination(audioProcessor), {
        suffix: "mp3"
    });

    bucket.grantRead(pdfProcessor);
    bucket.grantRead(textProcessor);
    bucket.grantRead(audioProcessor);

  }
}
