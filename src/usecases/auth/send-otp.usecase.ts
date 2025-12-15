import type { ISendOtpService } from "../../entities/services/send-otp.service.interface.js";
import type { ISendOtpUsecase } from "../../entities/usecaseInterfaces/auth/send-otp.interface.js";

export class SendOtpUsecase implements ISendOtpUsecase {

    constructor(
        private _sendOtpService: ISendOtpService,
    ) {
    
    }
    async execute(otp: string, email: string): Promise<void> {
        await this._sendOtpService.sendOTP(otp, email);
    }
}