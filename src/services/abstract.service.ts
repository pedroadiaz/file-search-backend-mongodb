import { IEntityRepo } from "@repos/entity-repo.interface";
import { BaseModel } from "@schemas/baseModel";

export abstract class AbstractService<T extends BaseModel> {
    protected readonly repository: IEntityRepo<T>;
    constructor(repo: IEntityRepo<T>) {
        this.repository = repo;
    }

    public async getEntities() : Promise<T[]> {
        return this.repository.getEntities();
    }

    public async getEntityById(id: string) : Promise<T | null> {
        return this.repository.getEntityById(id);
    }

    public async queryEntities(query: Record<string, any>): Promise<T[]> {
        return this.repository.queryEntities(query);
    }

    public async deleteById(id: string): Promise<void> {
        return this.repository.deleteById(id);
    }

    public async updateById(entity: T): Promise<T | null> {
        return this.repository.updateById(entity, entity._id);
    }

    public async createEntity(entity: T): Promise<T> {
        return this.repository.createEntity(entity);
    }
}