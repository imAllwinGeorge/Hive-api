import type { IPendingUserRepository } from "../../entities/repositoryInterfaces/pending-user-repository.interface";
import { PendingUserModel, type IPendingUserModel } from "../../frameworks/database/mongo/models/pending-user.model";
import { BaseRepository } from "./base.repository";

export class PendingUserRepository extends BaseRepository<IPendingUserModel> implements IPendingUserRepository {
    constructor () {
        super(PendingUserModel);
    }
}