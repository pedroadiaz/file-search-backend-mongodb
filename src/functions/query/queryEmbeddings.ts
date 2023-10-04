import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { MongDBService } from "@services/mongodb.service";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL!); 

export const handler = async (event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> =>  {
    if (!event.body) {      
        return formatJSONResponse({
            message: "Body cannot be empty"
        }, 400);
    }
    const body = JSON.parse(event.body);
    const service = new MongDBService(client);
    const useFilter = body.useFilter ? true : false;
    const result = await service.queryIndex(body.classId, body.prompt, useFilter);

    return formatJSONResponse({
        results: result
    }, 200);
}