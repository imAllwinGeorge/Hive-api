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
import { clearAuthCookies, setAuthCookies } from "../../../shared/utils/cookie.helpers";
import type { IResendOtpUsecase } from "../../../entities/usecaseInterfaces/auth/resend_otp.usecase.interface";
import type { ILoginUsecase } from "../../../entities/usecaseInterfaces/auth/login.usecase.interface";
import { emailSchema } from "../../../shared/validations/email-validation";
import { passwordSchema } from "../../../shared/validations/password-validation";

export class AuthController implements IAuthController {
    constructor (
        private _registerUsecase: IRegisterUsecase,

        private _userMapper: IUserMapper,

        private _verifyOtpUsecase: IVerifyOtpUsecase,

        private _generateTokenUsecase: IGenerateTokenUsecase,

        private _resendOtpUsecase: IResendOtpUsecase,

        private _loginUsecase: ILoginUsecase,
    ) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const parsed = userRegisterSchema.parse(req.body);

            const data = this._userMapper.toEntity(parsed);

            const otp = await this._registerUsecase.execute(data);

            res.status(HttpStatusCode.OK).json({message: "OTP sented to your email please check for it."})
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, otp } = req.query;
            console.log(email, otp)
            const user = await this._verifyOtpUsecase.execute(email as string, otp as string);

            const {accessToken, refreshToken} = await this._generateTokenUsecase.execute(user._id, user.email);

            setAuthCookies(res, accessToken, refreshToken);

            res.status(HttpStatusCode.CREATED).json({user});
        } catch (error) {
            next(error);
        }
    }

    async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.params;

            await this._resendOtpUsecase.execute(email as string);

            res.status(HttpStatusCode.OK).json({message: "OTP send to your email"});
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const email = emailSchema.parse(req.body.email);
            const password = passwordSchema.parse(req.body.password);

            const user = await this._loginUsecase.execute(email, password);

            const { accessToken, refreshToken } = await this._generateTokenUsecase.execute(user._id, user.email);

            setAuthCookies(res, accessToken, refreshToken);

            res.status(HttpStatusCode.OK).json({user});
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            clearAuthCookies(res);

            res.status(HttpStatusCode.OK).json({success: true})
        } catch (error) {
            next(error);
        }
    }
}