import type { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { UserModel, type IUserModel } from "../../frameworks/database/mongo/models/user.model.js";
import { BaseRepository } from "./base.repository.js";

export class UserRepository extends BaseRepository<IUserModel> implements IUserRepository {
    constructor () {
        super(UserModel)
    }
}