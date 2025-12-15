import type { IUserModel } from "../../frameworks/database/mongo/models/user.model.js";
import type { IBaseRepository } from "./base-repository.interface.js";

export interface IUserRepository extends IBaseRepository<IUserModel> {

}