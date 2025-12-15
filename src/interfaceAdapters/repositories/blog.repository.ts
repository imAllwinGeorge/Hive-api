import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface.js";
import { BlogModel, type IBlogModel } from "../../frameworks/database/mongo/models/blog.model.js";
import { BaseRepository } from "./base.repository.js";

export class BlogRepository extends BaseRepository<IBlogModel> implements IBlogRepository {
    constructor() {
        super(BlogModel)
    }
}