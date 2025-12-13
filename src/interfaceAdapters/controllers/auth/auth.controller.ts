import type { Request, Response, NextFunction } from "express";
import type { IAuthController } from "../../../entities/controllerInterfaces/auth-controller.interface";
import { userRegisterSchema } from "../../../shared/validations/user-register.validation.schema";
import type { IRegisterUsecase } from "../../../entities/usecaseInterfaces/auth/register-usecase.interface";
import type { IUserMapper } from "../../../entities/mapperInterfaces/user-mapper.interface";
import { HttpStatusCode } from "../../../shared/constants/constants";
import type { ISendOtpUsecase } from "../../../entities/usecaseInterfaces/auth/send-otp.interface";
import type { IVerifyOtpUsecase } from "../../../entities/usecaseInterfaces/auth/verify_otp-usecase.interface";
import { VerifyOtpUsecase } from "../../../usecases/auth/verify-otp.usecase";
import type { IGenerateTokenUsecase } from "../../../entities/usecaseInterfaces/auth/generate_token.usecase.interface";
import { setAuthCookies } from "../../../shared/utils/cookie.helpers";

export class AuthController implements IAuthController {
    constructor (
        private _registerUsecase: IRegisterUsecase,

        private _userMapper: IUserMapper,

        private _sendOtpUsecase: ISendOtpUsecase,

        private _verifyOtpUsecase: IVerifyOtpUsecase,

        private _generateTokenUsecase: IGenerateTokenUsecase,
    ) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const parsed = userRegisterSchema.parse(req.body);

            const data = this._userMapper.toEntity(parsed);

            const otp = await this._registerUsecase.execute(data);

            await this._sendOtpUsecase.execute(otp, data.email);

            res.status(HttpStatusCode.OK).json({message: "OTP sented to your email please check for it."})
        } catch (error) {
            next(error);
        }
    }

    async verfiyOtp (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, otp } = req.query;
            console.log(email, otp)
            const user = await this._verifyOtpUsecase.execute(email as string, otp as string);

            const {accessToken, refreshToken} = await this._generateTokenUsecase.execute(user._id, user.email);

            setAuthCookies(res, accessToken, refreshToken);

            res.status(HttpStatusCode.OK).json(user);
        } catch (error) {
            next(error);
        }
    }
}