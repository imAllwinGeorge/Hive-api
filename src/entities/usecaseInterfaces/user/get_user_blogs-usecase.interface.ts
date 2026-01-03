import type { BlogResponseDTO } from "../../../shared/types/responseDTO";

export interface IGetUserBlogs{
    execute (token: string, limit: number, skip: number): Promise<{blogs: BlogResponseDTO[], total: number}>
}