import type { IUserEntity } from "../../entities/models/user.entity.js";
import type { IPendingUserRepository } from "../../entities/repositoryInterfaces/pending-user-repository.interface.js";
import type { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import type { IBcrypt } from "../../entities/security/bcrypt.interface.js";
import type { IOtpService } from "../../entities/services/otp-service.interface.js";
import type { ISendOtpService } from "../../entities/services/send-otp.service.interface.js";
import type { IRegisterUsecase } from "../../entities/usecaseInterfaces/auth/register-usecase.interface.js";
import { HttpStatusCode } from "../../shared/constants/constants.js";
import { AppError } from "../../shared/errors/appError.js";

export class RegisterUsecase implements IRegisterUsecase {
    constructor (
        private _otpService: IOtpService,

        private _userRepository: IUserRepository,

        private _passwordBcrypt: IBcrypt,

        private _pendingUserRepository: IPendingUserRepository,

        private _sendOtpService: ISendOtpService,
    ) {}
    
    async execute(data: IUserEntity): Promise<string> {
        const isExist = await this._userRepository.findOne({email: data.email});

        if(isExist) throw new AppError("User already exist", HttpStatusCode.CONFLICT);


        const otp = this._otpService.generateOTP();

        const hashedPassword = await this._passwordBcrypt.hash(data.password)

        const pendingUser = await this._pendingUserRepository.save({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })

        if(!pendingUser) throw new AppError("Unable to complete your request at the moment. Please try again!", HttpStatusCode.INTERNAL_SERVER_ERROR);

        await this._sendOtpService.sendOTP(otp, data.email);

        return otp;
    }
}