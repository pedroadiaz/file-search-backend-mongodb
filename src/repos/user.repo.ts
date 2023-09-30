import { IUser, UserSchema } from "@schemas/user";
import { AbstractRepo } from "./abstract.repo";

export class UserRepo extends AbstractRepo<IUser> {
    constructor() {
        super("Users", UserSchema);
    }
}