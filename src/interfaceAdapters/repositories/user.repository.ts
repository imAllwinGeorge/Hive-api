import type { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface";
import { UserModel, type IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUserModel> implements IUserRepository {
    constructor () {
        super(UserModel)
    }
}