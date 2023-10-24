import { SageMakerRuntimeClient, InvokeEndpointCommand, InvokeEndpointCommandInput } from "@aws-sdk/client-sagemaker-runtime";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';

const client = new SageMakerRuntimeClient({ region: "us-west-2" });

export const handler = async (event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> =>  {
    if (!event.body) {      
        return formatJSONResponse({
            message: "Body cannot be empty"
        }, 400);
    }
    
    const params:InvokeEndpointCommandInput = {
        EndpointName: process.env.SAGE_MAKER_ENDPOINT,
        ContentType: "application/json",
        Body: event.body,
        CustomAttributes: "accept_eula=true"
    };
    const command = new InvokeEndpointCommand(params);
    const data = await client.send(command);

    const decoder = new TextDecoder();
    const myString = decoder.decode(data.Body);

    return formatJSONResponse({
        results: myString
    }, 200);
}