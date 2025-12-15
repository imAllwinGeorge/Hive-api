import type { IUserModel } from "../../frameworks/database/mongo/models/user.model.js";
import type { UserDTO } from "../../shared/types/dto.js";
import type { UserResponseDTO } from "../../shared/types/responseDTO.js";
import type { IUserEntity } from "../models/user.entity.js";

export interface IUserMapper {
    toEntity(userData: UserDTO): IUserEntity;
    toResponse(userEntity: IUserModel): UserResponseDTO;
}