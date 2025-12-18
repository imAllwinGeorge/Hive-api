import { Schema, Types } from "mongoose";
import type { IBlogMapper } from "../../entities/mapperInterfaces/blog-mapper.interface";
import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface";
import type { IEditBlogUsecase } from "../../entities/usecaseInterfaces/blog/edit_blog.usecase.interface";
import type { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import type { BlogResponseDTO } from "../../shared/types/responseDTO";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

export class EditBlogUsecase implements IEditBlogUsecase {
  constructor(
    private _blogRepository: IBlogRepository,

    private _blogMapper: IBlogMapper
  ) {}

  async execute(
    blogId: string,
    editedBlog: Partial<IBlogModel>
  ): Promise<BlogResponseDTO> {
    console.log(blogId, editedBlog)
    const updatedBlog = await this._blogRepository.findByIdAndUpdate(
      blogId,
      editedBlog
    );

    if(!updatedBlog) throw new AppError("Cannot process this request right now please try again", HttpStatusCode.INTERNAL_SERVER_ERROR);

    return this._blogMapper.toDTO(updatedBlog as IBlogModel);
  }
}
