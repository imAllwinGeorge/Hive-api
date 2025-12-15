import type { IPendingUserRepository } from "../../entities/repositoryInterfaces/pending-user-repository.interface.js";
import type { IBcrypt } from "../../entities/security/bcrypt.interface.js";
import type { IOtpService } from "../../entities/services/otp-service.interface.js";
import type { ISendOtpService } from "../../entities/services/send-otp.service.interface.js";
import type { IResendOtpUsecase } from "../../entities/usecaseInterfaces/auth/resend_otp.usecase.interface.js";
import { HttpStatusCode } from "../../shared/constants/constants.js";
import { AppError } from "../../shared/errors/appError.js";

export class ResendOtpUsecase implements IResendOtpUsecase {
    constructor (
        private _pendingUserRepository: IPendingUserRepository,

        private _otpServices: IOtpService,

        private _sendOtpService: ISendOtpService,
    ) {}

    async execute(email: string): Promise<void> {
        const pendingUser = await this._pendingUserRepository.findOne({email});

        if(!pendingUser) throw new AppError("Your session might be expired: please try again", HttpStatusCode.UNAUTHORIZED);

        const otp = this._otpServices.generateOTP();

        await this._pendingUserRepository.findOneAndUpdate({_id: pendingUser._id},{ otp });

        await this._sendOtpService.sendOTP(otp, email);
    }
}