import type { Request, Response, NextFunction, response } from "express";
import type { IAuthController } from "../../../entities/controllerInterfaces/auth-controller.interface.js";
import { userRegisterSchema } from "../../../shared/validations/user-register.validation.schema.js";
import type { IRegisterUsecase } from "../../../entities/usecaseInterfaces/auth/register-usecase.interface.js";
import type { IUserMapper } from "../../../entities/mapperInterfaces/user-mapper.interface.js";
import { HttpStatusCode } from "../../../shared/constants/constants.js";
import type { ISendOtpUsecase } from "../../../entities/usecaseInterfaces/auth/send-otp.interface.js";
import type { IVerifyOtpUsecase } from "../../../entities/usecaseInterfaces/auth/verify_otp-usecase.interface.js";
import { VerifyOtpUsecase } from "../../../usecases/auth/verify-otp.usecase.js";
import type { IGenerateTokenUsecase } from "../../../entities/usecaseInterfaces/auth/generate_token.usecase.interface.js";
import { clearAuthCookies, setAuthCookies } from "../../../shared/utils/cookie.helpers.js";
import type { IResendOtpUsecase } from "../../../entities/usecaseInterfaces/auth/resend_otp.usecase.interface.js";
import type { ILoginUsecase } from "../../../entities/usecaseInterfaces/auth/login.usecase.interface.js";
import { emailSchema } from "../../../shared/validations/email-validation.js";
import { passwordSchema } from "../../../shared/validations/password-validation.js";
import type { UserDTO } from "../../../shared/types/dto.js";
import type { IRefreshTokenUsecase } from "../../../entities/usecaseInterfaces/auth/refresh_token.usecase.interface.js";
import type { IJwtServices } from "../../../entities/services/jwt-services.interface.js";

export class AuthController implements IAuthController {
    constructor (
        private _registerUsecase: IRegisterUsecase,

        private _userMapper: IUserMapper,

        private _verifyOtpUsecase: IVerifyOtpUsecase,

        private _generateTokenUsecase: IGenerateTokenUsecase,

        private _resendOtpUsecase: IResendOtpUsecase,

        private _loginUsecase: ILoginUsecase,

        private _refreshTokenUsecase: IRefreshTokenUsecase,
    ) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const parsed = userRegisterSchema.parse(req.body);

            const data = this._userMapper.toEntity(parsed as UserDTO);

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

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { refreshToken } = req.cookies;

            const payload = await this._refreshTokenUsecase.execute(refreshToken);

            const tokens = await this._generateTokenUsecase.execute(payload.userId, payload.email);

            setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

            res.status(HttpStatusCode.OK).json({message: "Token validated"});
        } catch (error) {
            next(error);
        }
    }
}