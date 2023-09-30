import { ClassSchema, IClass } from "@schemas/class";
import { AbstractRepo } from "./abstract.repo";

export class ClassRepo extends AbstractRepo<IClass> {
    constructor() {
        super("Classes", ClassSchema);
    }
}