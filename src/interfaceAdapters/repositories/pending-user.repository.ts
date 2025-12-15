import type { IPendingUserRepository } from "../../entities/repositoryInterfaces/pending-user-repository.interface.js";
import { PendingUserModel, type IPendingUserModel } from "../../frameworks/database/mongo/models/pending-user.model.js";
import { BaseRepository } from "./base.repository.js";

export class PendingUserRepository extends BaseRepository<IPendingUserModel> implements IPendingUserRepository {
    constructor () {
        super(PendingUserModel);
    }
}