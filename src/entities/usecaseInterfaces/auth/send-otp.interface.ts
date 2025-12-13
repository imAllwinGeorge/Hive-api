export interface ISendOtpUsecase {
    execute(otp: string, email: string): Promise<void>;
}