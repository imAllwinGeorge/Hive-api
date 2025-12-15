import type { ISendOtpService } from "../../entities/services/send-otp.service.interface.js";
import { sendMail } from "../../frameworks/email/sendEmail.js";

export class SendOtpService implements ISendOtpService {
    constructor () {}
    
    async sendOTP(otp: string, email: string): Promise<void> {
        sendMail(email, "Verify Your Email", `Your otp is: ${otp}`)
    }
}