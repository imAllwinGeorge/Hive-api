import type { BlogResponseDTO } from "../../../shared/types/responseDTO";

export interface IGetBlogUsecase {
    execute(blogId: string): Promise<BlogResponseDTO>;
}