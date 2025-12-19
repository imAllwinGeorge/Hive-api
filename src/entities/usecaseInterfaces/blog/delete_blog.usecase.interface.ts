export interface IDeleteBlogUsecase {
    execute(blogId: string): Promise<void>;
}