import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface";
import { BlogModel, type IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import { BaseRepository } from "./base.repository";

export class BlogRepository extends BaseRepository<IBlogModel> implements IBlogRepository {
    constructor() {
        super(BlogModel)
    }
}