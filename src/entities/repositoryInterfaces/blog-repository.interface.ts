import type { IBlogModel } from "../../frameworks/database/mongo/models/blog.model.js";
import type { IBaseRepository } from "./base-repository.interface.js";

export interface IBlogRepository extends IBaseRepository<IBlogModel>{

}