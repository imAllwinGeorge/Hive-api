import type { IBlogModel } from "../../frameworks/database/mongo/models/blog.model.js";
import type { BlogResponseDTO } from "../../shared/types/responseDTO.js";


export interface IBlogMapper {
  toDTO(blog: IBlogModel): BlogResponseDTO;
  toDTOs(entities: IBlogModel[]): BlogResponseDTO[];
}
