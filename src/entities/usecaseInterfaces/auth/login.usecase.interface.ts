import type { UserResponseDTO } from "../../../shared/types/responseDTO";

export interface ILoginUsecase {
    execute(email: string, password: string): Promise<UserResponseDTO>;
}