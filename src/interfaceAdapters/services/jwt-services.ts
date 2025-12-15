import type { IJwtServices } from "../../entities/services/jwt-services.interface.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../shared/config.js";

export class JwtServices implements IJwtServices {
    generateAccessToken(payload: object): string {
        const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET!, {
            expiresIn: "1h",
        });
        return accessToken;
    }

    generateRefreshToken(payload: Object): string {
        const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET!, {
            expiresIn: "7d",
        });
        return refreshToken;
    }

    verifyAccessToken(token: string): jwt.JwtPayload {
        const payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET!);
        return payload as JwtPayload
    }

    verifyRefreshToken(token: string): jwt.JwtPayload {
        const payload = jwt.verify(token, config.REFRESH_TOKEN_SECRET!);
        return payload as JwtPayload
    }
}