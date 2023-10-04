import { Context, S3Event } from "aws-lambda";
import { S3AudioLoader } from "../../services/s3-audio.service";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongDBService } from "@services/mongodb.service";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!); 

export const handler = async (event: S3Event, context: Context) => {
    await Promise.all(event.Records.map(async (rec) => {
        const bucket = rec.s3.bucket.name;
        const key = rec.s3.object.key;

        const classId = key.split("/")?.[0];

        const loader = new S3AudioLoader({
            bucket: bucket,
            key: key, 
            unstructuredAPIURL: "",
            unstructuredAPIKey: "",
        });

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 0
        });

        const doc = await loader.load();

        try {
            console.log("number of documents: ", doc.length);
            const max = doc.length < 20 ? doc.length : 20;
            if (doc.length > 0) {
                for (let i=0;i<max;i++) {
                    console.log(`content for index ${i}`, doc[i]?.pageContent);
                }
            }
        } catch (error) {
            console.log(error);
        }

        const newDocs = await splitter.splitDocuments(doc);

        try {
            console.log("number of documents: ", newDocs.length);
            const max = doc.length < 20 ? newDocs.length : 20;
            if (newDocs.length > 0) {
                for (let i=0;i<max;i++) {
                    console.log(`content for index ${i}`, newDocs[i]?.pageContent);
                }
            }
        } catch (error) {
            console.log(error);
        }

        const service = new MongDBService(client);

        await service.saveData(newDocs, classId);
    }));
}