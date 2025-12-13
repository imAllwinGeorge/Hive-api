import type { UserResponseDTO } from "../../../shared/types/responseDTO";

export interface IVerifyOtpUsecase {
    execute (email: string, otp: string): Promise<UserResponseDTO>;
}