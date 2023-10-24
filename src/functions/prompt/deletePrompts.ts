import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { deleteByIdLambda } from '@libs/baseLambda';
import { genericLambda } from '@libs/genericLambda';
import { PromptService } from '@services/prompt.service';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    return genericLambda(event, new PromptService(), deleteByIdLambda);
}