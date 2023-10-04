import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { MongDBService } from "@services/mongodb.service";
import { DeleteResult, MongoClient } from "mongodb";

export const handler = async (event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> =>  {
    const classId = event.queryStringParameters?.classId;
    const client = new MongoClient(process.env.MONGO_URL!); 
    const service = new MongDBService(client);

    const database = client.db("vector-database");
    const collection = database.collection("text-vector-data")

    let result:DeleteResult;
    if (!classId) {
        result = await collection.deleteMany({});
    } else {
        result = await collection.deleteMany({ classId: { $eq: classId }})
    }        

    return formatJSONResponse({
        results: result
    }, 200);
}