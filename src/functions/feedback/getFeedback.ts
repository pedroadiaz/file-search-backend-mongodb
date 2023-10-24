import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { getLambda } from '@libs/baseLambda';
import { genericLambda } from '@libs/genericLambda';
import { FeedbackService } from '@services/feedback.service';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    return genericLambda(event, new FeedbackService(), getLambda);
}