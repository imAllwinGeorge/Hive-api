import type { Schema } from "mongoose";
import type { IJwtServices } from "../../entities/services/jwt-services.interface";
import type { IGenerateTokenUsecase } from "../../entities/usecaseInterfaces/auth/generate_token.usecase.interface";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

export class GenerageTokenUsecase implements IGenerateTokenUsecase {
  constructor(private _jwtServices: IJwtServices) {}
  async execute(
    userId: Schema.Types.ObjectId,
    email: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
        const payload = {
      userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this._jwtServices.generateAccessToken(payload),
      this._jwtServices.generateRefreshToken(payload),
    ]);

    return {accessToken, refreshToken
    }
    } catch (error) {
        throw new AppError("Failed process the request", HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
