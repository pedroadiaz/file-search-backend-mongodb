import { ClassRepo } from "@repos/class.repo";
import { IClass } from "@schemas/class";
import { AbstractService } from "./abstract.service";

export class ClassService extends AbstractService<IClass> {
    constructor() {
        const repo = new ClassRepo();

        super(repo);
    }
}