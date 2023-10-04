import { Context, S3Event } from "aws-lambda";
import { S3Loader } from "../../services/s3.service";
import { RecursiveCharacterTextSplitter, CharacterTextSplitter } from "langchain/text_splitter";
import { MongDBService } from "@services/mongodb.service";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!); 

export const handler = async (event: S3Event, context: Context) => {
    await Promise.all(event.Records.map(async (rec) => {
        const bucket = rec.s3.bucket.name;
        const key = rec.s3.object.key;

        const indexId = key.split("/")?.[0];

        const loader = new S3Loader({
            bucket: bucket,
            key: key, 
            unstructuredAPIURL: "",
            unstructuredAPIKey: "",
        });

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 0
        });

        const doc = await loader.loadAndSplit(splitter);

        console.log("number of documents: ", doc.length);
        if (doc.length > 0) {
            const max = doc.length < 20 ? doc.length : 20;
            for (let i=0;i<max;i++) {
                console.log(`content for index ${i}`, doc[i].pageContent);
                // console.log(`metadata for index ${i}`, doc[i].metadata);
            }
        }

        const service = new MongDBService(client);

        await service.saveData(doc, indexId);
    }));
}