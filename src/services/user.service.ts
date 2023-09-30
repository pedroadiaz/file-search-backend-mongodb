import { UserRepo } from "@repos/user.repo";
import { IUser } from "@schemas/user";
import { AbstractService } from "./abstract.service";

export class UserService extends AbstractService<IUser> {
    constructor() {
        const repo = new UserRepo();

        super(repo);
    }
}