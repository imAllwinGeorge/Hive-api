import type { IPendingUserModel } from "../../frameworks/database/mongo/models/pending-user.model";
import type { IBaseRepository } from "./base-repository.interface";

export interface IPendingUserRepository extends IBaseRepository<IPendingUserModel> {
    
}