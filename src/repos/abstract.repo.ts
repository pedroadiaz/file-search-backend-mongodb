import mongoose, { Model, Schema, model } from "mongoose";
import { BaseModel } from "@schemas/baseModel";
import { IEntityRepo } from "./entity-repo.interface";

export abstract class AbstractRepo<T extends BaseModel> implements IEntityRepo<T> {
    protected readonly entityModel: Model<T>;
    protected toType: { new(): T };

    constructor(modelName: string, schema: Schema<T>) {
        this.entityModel = mongoose.model<T>(modelName, schema);
    }

    public async getEntities(): Promise<T[]> {
        return this.entityModel.find({});
    }

    public async getEntityById(id: string) : Promise<T | null> {
        return this.entityModel.findById(id);
    }

    public async queryEntities(query: Record<string, any>): Promise<T[]> {
        return this.entityModel.find(query);
    }

    public async deleteById(id: string): Promise<void> {
        console.log("id to delete in repo: ", id);
        const result = await this.entityModel.findByIdAndDelete(id);
        console.log("delete result: ", result);
    }

    public async updateById(entity: T, id: string): Promise<T | null> {
        return this.entityModel.findByIdAndUpdate(id, entity);
    }

    public async createEntity(entity: T): Promise<T> {
        const model = new this.entityModel(entity);

        const newEntity = await model.save();

        return newEntity.toObject();
    }
}