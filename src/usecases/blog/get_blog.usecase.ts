import type { IBlogMapper } from "../../entities/mapperInterfaces/blog-mapper.interface.js";
import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface.js";
import type { IGetBlogUsecase } from "../../entities/usecaseInterfaces/blog/get_blog.usecase.interface.js";
import type { BlogResponseDTO } from "../../shared/types/responseDTO.js";
import { AppError } from "../../shared/errors/appError.js";
import { HttpStatusCode } from "../../shared/constants/constants.js";
import { Schema } from "mongoose";

export class GetBlogUsecase implements IGetBlogUsecase {
    constructor (
        private _blogRepository: IBlogRepository,

        private _blogMapper: IBlogMapper,
    ) {}

    async execute(blogId: string): Promise<BlogResponseDTO> {


        const blog = await this._blogRepository.findById(blogId);

        if(!blog) throw new AppError("couldn't find the blog", HttpStatusCode.INTERNAL_SERVER_ERROR);

        return this._blogMapper.toDTO(blog);
    }
}