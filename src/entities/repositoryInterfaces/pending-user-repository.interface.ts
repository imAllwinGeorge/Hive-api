import type { IPendingUserModel } from "../../frameworks/database/mongo/models/pending-user.model.js";
import type { IBaseRepository } from "./base-repository.interface.js";

export interface IPendingUserRepository extends IBaseRepository<IPendingUserModel> {
    
}