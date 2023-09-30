import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { getByIdLambda } from '@libs/baseLambda';
import { genericLambda } from '@libs/genericLambda';
import { ClassService } from '@services/class.service';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    return genericLambda(event, new ClassService(), getByIdLambda);
}