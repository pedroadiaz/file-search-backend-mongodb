import { BaseModel } from "@schemas/baseModel";

export interface IService<T extends BaseModel> {
    getEntities(): Promise<T[]>;
    getEntityById(id: string) : Promise<T | null>;
    queryEntities(query: Record<string, any>): Promise<T[]>;
    deleteById(id: string): Promise<void>;
    updateById(entity: T): Promise<T | null>;
    createEntity(entity: T): Promise<T>;
}