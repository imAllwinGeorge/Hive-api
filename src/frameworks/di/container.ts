import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";
import { BlogController } from "../../interfaceAdapters/controllers/auth/blog.controller.js";
import { BlogMapper } from "../../interfaceAdapters/mappers/blog-mapper.js";
import { UserMapper } from "../../interfaceAdapters/mappers/user-mapper.js";
import { BlogRepository } from "../../interfaceAdapters/repositories/blog.repository.js";
import { PendingUserRepository } from "../../interfaceAdapters/repositories/pending-user.repository.js";
import { UserRepository } from "../../interfaceAdapters/repositories/user.repository.js";
import { JwtServices } from "../../interfaceAdapters/services/jwt-services.js";
import { OtpSerivce } from "../../interfaceAdapters/services/otp-service.js";
import { SendOtpService } from "../../interfaceAdapters/services/send-otp.service.js";
import { GenerageTokenUsecase } from "../../usecases/auth/generate_token.usecase.js";
import { LoginUsecase } from "../../usecases/auth/login-usecase.js";
import { RefreshTokenUsecase } from "../../usecases/auth/refresh_token.usecase.js";
import { RegisterUsecase } from "../../usecases/auth/register-usecase.js";
import { ResendOtpUsecase } from "../../usecases/auth/resend_otp.usecase.js";
import { SendOtpUsecase } from "../../usecases/auth/send-otp.usecase.js";
import { VerifyOtpUsecase } from "../../usecases/auth/verify-otp.usecase.js";
import { VerifyTokenUsecase } from "../../usecases/auth/verify-token.usecase.js";
import { CreateBlogUsecase } from "../../usecases/blog/create_blog.usecase.js";
import { EditBlogUsecase } from "../../usecases/blog/edit_blog.usecase.js";
import { GetBlogUsecase } from "../../usecases/blog/get_blog.usecase.js";
import { GetHomeDataUsecase } from "../../usecases/blog/get_home-data.usecase.js";
import { PasswordBcrypt } from "../security/password-bcyrpt.js";

//----------Mappers-------------
const userMapper = new UserMapper();

const blogMapper = new BlogMapper();

//----------Repositories-------------
const userRepository = new UserRepository();

const pendingUserRepository = new PendingUserRepository();

const blogRepository = new BlogRepository();

//---------Services-----------------
const otpSerivce = new OtpSerivce();

const sendOtpService = new SendOtpService();

const bcrypt = new PasswordBcrypt();

const jwtServices = new JwtServices();

//--------------UseCases-----------------
const registerUsecase = new RegisterUsecase(
  otpSerivce,
  userRepository,
  bcrypt,
  pendingUserRepository,
  sendOtpService
);

const sendOtpUsecase = new SendOtpUsecase(sendOtpService);

const verifyUsecase = new VerifyOtpUsecase(
  pendingUserRepository,
  userRepository,
  userMapper
);

const generateTokenUsecase = new GenerageTokenUsecase(jwtServices);

const resendOtpUsecase = new ResendOtpUsecase(
  pendingUserRepository,
  otpSerivce,
  sendOtpService
);

const loginUsecase = new LoginUsecase(userRepository, bcrypt, userMapper);

const createBlogUsecase = new CreateBlogUsecase(blogRepository, blogMapper);

const getBlogUsecase = new GetBlogUsecase(blogRepository, blogMapper);

const editBlogUsecase = new EditBlogUsecase(blogRepository, blogMapper);

const getHomeDataUsecase = new GetHomeDataUsecase(blogRepository, blogMapper);

export const verifyTokenUsecase = new VerifyTokenUsecase(
  jwtServices,
  userRepository,
  userMapper
);

const refreshTokenUsecase = new RefreshTokenUsecase(jwtServices);

//-----------Controllers---------------
export const authController = new AuthController(
  registerUsecase,
  userMapper,
  verifyUsecase,
  generateTokenUsecase,
  resendOtpUsecase,
  loginUsecase,
  refreshTokenUsecase
);

export const blogController = new BlogController(
  createBlogUsecase,
  getBlogUsecase,
  editBlogUsecase,
  getHomeDataUsecase
);
