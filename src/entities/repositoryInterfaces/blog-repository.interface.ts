import type { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import type { IBaseRepository } from "./base-repository.interface";

export interface IBlogRepository extends IBaseRepository<IBlogModel>{

}