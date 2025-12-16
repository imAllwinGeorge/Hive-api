import type { UserResponseDTO } from "../../../shared/types/responseDTO";

export interface IVerifyTokenUsecase {
    execute(token: string): Promise<UserResponseDTO>;
}