import type { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import type { UserDTO } from "../../shared/types/dto";
import type { UserResponseDTO } from "../../shared/types/responseDTO";
import type { IUserEntity } from "../models/user.entity";

export interface IUserMapper {
    toEntity(userData: UserDTO): IUserEntity;
    toResponse(userEntity: IUserModel): UserResponseDTO;
}