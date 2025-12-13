import type { ISendOtpService } from "../../entities/services/send-otp.service.interface";
import type { ISendOtpUsecase } from "../../entities/usecaseInterfaces/auth/send-otp.interface";

export class SendOtpUsecase implements ISendOtpUsecase {

    constructor(
        private _sendOtpService: ISendOtpService,
    ) {
    
    }
    async execute(otp: string, email: string): Promise<void> {
        await this._sendOtpService.sendOTP(otp, email);
    }
}