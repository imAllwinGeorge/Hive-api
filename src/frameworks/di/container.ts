import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller";
import { UserMapper } from "../../interfaceAdapters/mappers/user-mapper";
import { PendingUserRepository } from "../../interfaceAdapters/repositories/pending-user.repository";
import { UserRepository } from "../../interfaceAdapters/repositories/user.repository";
import { JwtServices } from "../../interfaceAdapters/services/jwt-services";
import { OtpSerivce } from "../../interfaceAdapters/services/otp-service";
import { SendOtpService } from "../../interfaceAdapters/services/send-otp.service";
import { GenerageTokenUsecase } from "../../usecases/auth/generate_token.usecase";
import { LoginUsecase } from "../../usecases/auth/login-usecase";
import { RegisterUsecase } from "../../usecases/auth/register-usecase";
import { ResendOtpUsecase } from "../../usecases/auth/resend_otp.usecase";
import { SendOtpUsecase } from "../../usecases/auth/send-otp.usecase";
import { VerifyOtpUsecase } from "../../usecases/auth/verify-otp.usecase";
import { PasswordBcrypt } from "../security/password-bcyrpt";


//----------Mappers-------------
const userMapper = new UserMapper();

//----------Repositories-------------
const userRepository = new UserRepository();

const pendingUserRepository = new PendingUserRepository();



//---------Services-----------------
const otpSerivce = new OtpSerivce();

const sendOtpService = new SendOtpService();

const bcrypt = new PasswordBcrypt();

const jwtServices = new JwtServices();



//--------------UseCases-----------------
const registerUsecase = new RegisterUsecase(otpSerivce, userRepository, bcrypt, pendingUserRepository, sendOtpService);

const sendOtpUsecase = new SendOtpUsecase(sendOtpService);

const verifyUsecase = new VerifyOtpUsecase(pendingUserRepository, userRepository, userMapper);

const generateTokenUsecase = new GenerageTokenUsecase(jwtServices);

const resendOtpUsecase = new ResendOtpUsecase(pendingUserRepository, otpSerivce, sendOtpService);

const loginUsecase = new LoginUsecase(userRepository, bcrypt, userMapper);



//-----------Controllers---------------
export const authController = new AuthController(registerUsecase, userMapper, verifyUsecase, generateTokenUsecase, resendOtpUsecase, loginUsecase);