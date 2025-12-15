import type { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface.js";
import type { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import type { IBcrypt } from "../../entities/security/bcrypt.interface.js";
import type { IJwtServices } from "../../entities/services/jwt-services.interface.js";
import type { ILoginUsecase } from "../../entities/usecaseInterfaces/auth/login.usecase.interface.js";
import { HttpStatusCode } from "../../shared/constants/constants.js";
import { AppError } from "../../shared/errors/appError.js";
import type { UserResponseDTO } from "../../shared/types/responseDTO.js";

export class LoginUsecase implements ILoginUsecase {
    constructor (
        private _userRepository: IUserRepository,

        private _passwordServices: IBcrypt,

        private _userMapper:IUserMapper,
    ) {}

    async execute(email: string, password: string): Promise<UserResponseDTO> {
        const user = await this._userRepository.findOne({ email });

        if(!user) throw new AppError("User not found", HttpStatusCode.UNAUTHORIZED);

        const isMatch = await this._passwordServices.compare(password, user.password);

        if(!isMatch) throw new AppError("Incorrect password", HttpStatusCode.UNAUTHORIZED);


        return await this._userMapper.toResponse(user);
        
    }
}