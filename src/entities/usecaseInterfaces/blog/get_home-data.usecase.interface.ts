import type { BlogResponseDTO } from "../../../shared/types/responseDTO";
import type { FilterQuery } from "../../repositoryInterfaces/base-repository.interface";

export interface IGetHomeDataUsecase {
  execute(
    limit: number,
    skip: number,
    filter: FilterQuery<object>
  ): Promise<{
    featuredPosts: BlogResponseDTO[];
    sidebarPosts: BlogResponseDTO[];
    total: number;
  }>;
}
