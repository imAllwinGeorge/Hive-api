import type { UserResponseDTO } from "../../../shared/types/responseDTO.js";

export interface ILoginUsecase {
    execute(email: string, password: string): Promise<UserResponseDTO>;
}