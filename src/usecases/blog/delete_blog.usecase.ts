import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface";
import type { IDeleteBlogUsecase } from "../../entities/usecaseInterfaces/blog/delete_blog.usecase.interface";

export class DeleteBlogUsecase implements IDeleteBlogUsecase {
    constructor (
        private _blogRepository: IBlogRepository,
    ) {}

    async execute(blogId: string): Promise<void> {
        console.log("deleteblog usecase: ", blogId)
        await this._blogRepository.delete(blogId);
    }
}