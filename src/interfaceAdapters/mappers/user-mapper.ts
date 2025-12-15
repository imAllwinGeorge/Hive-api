import type { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface";
import type { IUserEntity } from "../../entities/models/user.entity";
import type { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import type { UserDTO } from "../../shared/types/dto";
import type { UserResponseDTO } from "../../shared/types/responseDTO";

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
