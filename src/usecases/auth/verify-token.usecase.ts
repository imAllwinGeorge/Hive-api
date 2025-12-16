import type { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface.js";
import type { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import type { IJwtServices } from "../../entities/services/jwt-services.interface.js";
import type { IVerifyTokenUsecase } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface.js";
import type { IUserModel } from "../../frameworks/database/mongo/models/user.model.js";
import { HttpStatusCode } from "../../shared/constants/constants.js";
import { AppError } from "../../shared/errors/appError.js";
import type { UserResponseDTO } from "../../shared/types/responseDTO.js";

export class VerifyTokenUsecase implements IVerifyTokenUsecase {
    constructor (
        private _jwtServices: IJwtServices,

        private _userRepository: IUserRepository,

        private _userMapper: IUserMapper,
    ) {}

    async execute(token: string): Promise<UserResponseDTO> {
        console.log("verify token usecase", token)
        const payload = await this._jwtServices.verifyAccessToken(token);
        console.log(payload)
        if(!payload) throw new AppError("session expired",HttpStatusCode.UNAUTHORIZED)

        const user = await this._userRepository.findById(payload.userId.toString());

    console.log(user);
        if(!user) throw new AppError("coldn't resolve this request", HttpStatusCode.INTERNAL_SERVER_ERROR);

        return this._userMapper.toResponse(user as IUserModel);
    }
}