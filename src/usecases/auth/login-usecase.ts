import type { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface";
import type { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface";
import type { IBcrypt } from "../../entities/security/bcrypt.interface";
import type { IJwtServices } from "../../entities/services/jwt-services.interface";
import type { ILoginUsecase } from "../../entities/usecaseInterfaces/auth/login.usecase.interface";
import { HttpStatusCode } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import type { UserResponseDTO } from "../../shared/types/responseDTO";

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