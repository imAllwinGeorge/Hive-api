import type { IBlogModel } from "../../../frameworks/database/mongo/models/blog.model";
import type { BlogResponseDTO } from "../../../shared/types/responseDTO";

export interface ICreateBlogUsecase {
    execute(blog: Partial<IBlogModel>): Promise<BlogResponseDTO>;
}