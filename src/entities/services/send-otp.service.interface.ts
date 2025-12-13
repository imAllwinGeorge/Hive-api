export interface ISendOtpService {
    sendOTP(otp: string, email: string): Promise<void>;
}