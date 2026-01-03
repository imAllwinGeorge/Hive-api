import type { IBlogMapper } from "../../entities/mapperInterfaces/blog-mapper.interface";
import type { IBlogRepository } from "../../entities/repositoryInterfaces/blog-repository.interface";
import type { IJwtServices } from "../../entities/services/jwt-services.interface";
import type { IGetUserBlogs } from "../../entities/usecaseInterfaces/user/get_user_blogs-usecase.interface";
import { HttpStatusCode } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import type { BlogResponseDTO } from "../../shared/types/responseDTO";

export class GetUserBlogsUsecase implements IGetUserBlogs {
  constructor(
    private _tokenServices: IJwtServices,

    private _blogRepository: IBlogRepository,

    private _blogMapper: IBlogMapper,
  ) {}

  async execute(
    token: string,
    limit: number,
    skip: number
  ): Promise<{ blogs: BlogResponseDTO[]; total: number }> {

    const payload = await this._tokenServices.verifyAccessToken(token);
    if(!payload) throw new AppError("Invalid request", HttpStatusCode.UNAUTHORIZED);

    const result = await this._blogRepository.findAll(limit, skip, {
        userId: payload.userId
    })

    return {
        blogs: this._blogMapper.toDTOs(result.items),
        total: result.total
    }
  }
}
