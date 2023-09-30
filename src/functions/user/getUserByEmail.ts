import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createLambda, getByForeginKeyIdLambda } from '@libs/baseLambda';
import { initializeMongoose } from '@libs/mongoose.config';
import { UserService } from '@services/user.service';
import { sleep } from 'openai/core';
import { formatJSONResponse } from '@libs/api-gateway';

let successful: boolean | undefined = undefined;
initializeMongoose().then(b => successful = b);

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const email = event.queryStringParameters?.email;
    
    if (!email) {
        return formatJSONResponse({
            message: `Email parameter must not be empty.`,
        },
        400); 
    } 

    while (typeof successful === "undefined") {
        console.log("here!");
        await sleep(10);
    }

    const service = new UserService();
    const result = await getByForeginKeyIdLambda(service, {
        email: email
    });

    return result;
}