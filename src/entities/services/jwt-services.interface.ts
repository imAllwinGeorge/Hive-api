import type { JwtPayload } from "jsonwebtoken";

export interface IJwtServices {
    generateAccessToken(payload: object): string;
    generateRefreshToken(payload: Object): string;
    verifyAccessToken(token: string): JwtPayload;
    verifyRefreshToken(token: string): JwtPayload;
}