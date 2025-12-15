import type { IBlogModel } from "../../../frameworks/database/mongo/models/blog.model.js";
import type { BlogResponseDTO } from "../../../shared/types/responseDTO.js";

export interface ICreateBlogUsecase {
    execute(blog: Partial<IBlogModel>): Promise<BlogResponseDTO>;
}