import type { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import type { IBaseRepository } from "./base-repository.interface";

export interface IUserRepository extends IBaseRepository<IUserModel> {

}