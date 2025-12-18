import type { JwtPayload } from "jsonwebtoken";
import type { IRefreshTokenUsecase } from "../../entities/usecaseInterfaces/auth/refresh_token.usecase.interface";
import type { IJwtServices } from "../../entities/services/jwt-services.interface";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

export class RefreshTokenUsecase implements IRefreshTokenUsecase {
    constructor(
        private _jwtServices: IJwtServices,
    ) {}

    async execute(refreshToken: string): Promise<JwtPayload> {
        const payload = await this._jwtServices.verifyRefreshToken(refreshToken);

        if(!payload) throw new AppError("unexpected error", HttpStatusCode.INTERNAL_SERVER_ERROR);

        return payload;
    }
}