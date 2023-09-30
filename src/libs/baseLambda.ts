import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IService } from "@services/service.interface";
import { formatJSONResponse } from './api-gateway';
import { BaseModel } from '@schemas/baseModel';

export const createLambda = async<T extends BaseModel>(service: IService<T>, event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {    
    if (!event.body) {
        return formatJSONResponse({
            message: `Request body must not be empty.`,
        },
        400); 
    }

    const entity = JSON.parse(event.body) as T;
    console.log("entity base lambda: ", entity);

    const result = await service.createEntity(entity);

    if (result) {
        return formatJSONResponse({
            message: "Entity successfully created"
        },
        201);
    } else {
        return formatJSONResponse({
            message: `There was an error inserting the entity.`,
        },
        500);
    }
}

export const updateLambda = async<T extends BaseModel>(service: IService<T>, event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {    
    if (!event.body) {
        return formatJSONResponse({
            message: `Request body must not be empty.`,
        },
        400); 
    }

    const entity = JSON.parse(event.body) as T;
    console.log("entity base lambda: ", entity);

    const result = await service.updateById(entity);

    if (result) {
        return formatJSONResponse({
            message: "Entity successfully updated."
        },
        201);
    } else {
        return formatJSONResponse({
            message: `There was an error updating the entity.`,
        },
        500);
    }
}

export const getLambda = async<T extends BaseModel>(service: IService<T>, event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const results = await service.getEntities();
    console.log("results: ", results);

    if (results) {
        return formatJSONResponse({
            data: results
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the results",
        });
    }
}

export const getByIdLambda = async<T extends BaseModel>(service: IService<T>, event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;

    if (!id) {
        return formatJSONResponse({
            message: `Path parameter must not be empty.`,
        },
        400); 
    } 

    const result = await service.getEntityById(id);
    console.log("result: ", result);

    if (result) {
        return formatJSONResponse({
            data: result
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the result",
        },
        404);
    }
}

export const getByForeginKeyIdLambda = async<T extends BaseModel>(service: IService<T>, query: Record<string, any>) : Promise<APIGatewayProxyResult> => {
    const result = await service.queryEntities(query);

    if (result) {
        return formatJSONResponse({
            data: result
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the result",
        },
        404);
    }
}

export const deleteByIdLambda = async<T extends BaseModel>(service: IService<T>, event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;

    console.log("id to delete", id);

    if (!id) {
        return formatJSONResponse({
            message: `Path parameter must not be empty.`,
        },
        400); 
    } 

    try {
        await service.deleteById(id);
        return formatJSONResponse({
            message: "Entity deleted successfully"
        });
    } catch (error) {
        return formatJSONResponse({
            message: "There was a problem deleting the entity",
        });
    }
}