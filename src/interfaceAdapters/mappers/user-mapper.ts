import type { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface.js";
import type { IUserEntity } from "../../entities/models/user.entity.js";
import type { IUserModel } from "../../frameworks/database/mongo/models/user.model.js";
import type { UserDTO } from "../../shared/types/dto.js";
import type { UserResponseDTO } from "../../shared/types/responseDTO.js";

export class UserMapper implements IUserMapper {
  toEntity(userData: UserDTO): IUserEntity {
    return {
      userName: userData.userName,
      email: userData.email,
      password: userData.password,
      isAdmin: false,
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  toResponse(userEntity: IUserModel): UserResponseDTO {
    return {
      _id: userEntity._id,
      userName: userEntity.userName,
      email: userEntity.email,
      isAdmin: false,
      isBlocked: false,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
