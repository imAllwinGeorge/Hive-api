import type { BlogResponseDTO } from "../../../shared/types/responseDTO.js";

export interface IGetBlogUsecase {
    execute(blogId: string): Promise<BlogResponseDTO>;
}