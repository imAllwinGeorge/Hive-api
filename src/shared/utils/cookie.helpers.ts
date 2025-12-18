import type { Response } from "express";
import { config } from "../config";

export const setAuthCookies = ( res: Response, accessToken: string, refreshToken: string) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: config.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: config.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    })
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
}