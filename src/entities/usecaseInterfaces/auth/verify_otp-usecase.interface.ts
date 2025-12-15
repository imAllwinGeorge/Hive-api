import type { UserResponseDTO } from "../../../shared/types/responseDTO.js";

export interface IVerifyOtpUsecase {
    execute (email: string, otp: string): Promise<UserResponseDTO>;
}