import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { initializeMongoose } from '@libs/mongoose.config';
import { sleep } from 'openai/core';
import { IService } from '@services/service.interface';
import { BaseModel } from '@schemas/baseModel';

let successful: boolean | undefined = undefined;
initializeMongoose().then(b => {
    console.log("initializing mongoose")
    successful = b
});

export const genericLambda = async<T extends BaseModel>(event: APIGatewayProxyEvent, service: IService<T>, someMethod: (service: IService<T>, event: APIGatewayProxyEvent)=> Promise<APIGatewayProxyResult>) : Promise<APIGatewayProxyResult> => {
    while (typeof successful === "undefined") {
        console.log("here!");
        await sleep(10);
    }

    return someMethod(service, event);
}