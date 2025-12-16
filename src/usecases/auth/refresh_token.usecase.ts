import type { JwtPayload } from "jsonwebtoken";
import type { IRefreshTokenUsecase } from "../../entities/usecaseInterfaces/auth/refresh_token.usecase.interface.js";
import type { IJwtServices } from "../../entities/services/jwt-services.interface.js";
import { AppError } from "../../shared/errors/appError.js";
import { HttpStatusCode } from "../../shared/constants/constants.js";

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