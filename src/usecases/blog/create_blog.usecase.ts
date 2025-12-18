import type { IBlogMapper } from "../../entities/mapperInterfaces/blog-mapper.interface";
import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface";
import type { ICreateBlogUsecase } from "../../entities/usecaseInterfaces/blog/create_blog.usecase.interface";
import type { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import { HttpStatusCode } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import type { BlogResponseDTO } from "../../shared/types/responseDTO";

export class CreateBlogUsecase implements ICreateBlogUsecase {
    constructor (
        private _blogRepository: IBlogRepository,

        private _blogMapper: IBlogMapper,
    ) {}

    async execute(blog: Partial<IBlogModel>): Promise<BlogResponseDTO> {
        const newBlog = await this._blogRepository.save(blog);

        if(!newBlog) throw new AppError("Currently we are facing some issue please try again", HttpStatusCode.INTERNAL_SERVER_ERROR);

        return this._blogMapper.toDTO(newBlog);
    }
}