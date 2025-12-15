import type { IBlogMapper } from "../../entities/mapperInterfaces/blog-mapper.interface";
import type { FilterQuery } from "../../entities/repositoryInterfaces/base-repository.interface";
import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface";
import type { IGetHomeDataUsecase } from "../../entities/usecaseInterfaces/blog/get_home-Data.usecase.interface";
import type { BlogResponseDTO } from "../../shared/types/responseDTO";

export class GetHomeDataUsecase implements IGetHomeDataUsecase {
  constructor(
    private _blogRepository: IBlogRepository,

    private _blogMapper: IBlogMapper
  ) {}

  async execute(
    limit: number,
    skip: number,
    filter: FilterQuery<object>
  ): Promise<{
    featuredPosts: BlogResponseDTO[];
    sidebarPosts: BlogResponseDTO[];
    total: number;
  }> {
    const [featuredPosts, sidebarPosts] = await Promise.all([
      this._blogRepository.findAll(limit, skip, filter),
      this._blogRepository.findAll(limit, skip, filter),
    ]);

    return {
      featuredPosts: this._blogMapper.toDTOs(featuredPosts.items),
      sidebarPosts: this._blogMapper.toDTOs(sidebarPosts.items),
      total: featuredPosts.total,
    };
  }
}
