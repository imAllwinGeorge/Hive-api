import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller";
import { BlogController } from "../../interfaceAdapters/controllers/auth/blog.controller";
import { UserController } from "../../interfaceAdapters/controllers/user.controller";
import { BlogMapper } from "../../interfaceAdapters/mappers/blog-mapper";
import { UserMapper } from "../../interfaceAdapters/mappers/user-mapper";
import { BlogRepository } from "../../interfaceAdapters/repositories/blog.repository";
import { PendingUserRepository } from "../../interfaceAdapters/repositories/pending-user.repository";
import { UserRepository } from "../../interfaceAdapters/repositories/user.repository";
import { JwtServices } from "../../interfaceAdapters/services/jwt-services";
import { OtpSerivce } from "../../interfaceAdapters/services/otp-service";
import { SendOtpService } from "../../interfaceAdapters/services/send-otp.service";
import { GenerageTokenUsecase } from "../../usecases/auth/generate_token.usecase";
import { LoginUsecase } from "../../usecases/auth/login-usecase";
import { RefreshTokenUsecase } from "../../usecases/auth/refresh_token.usecase";
import { RegisterUsecase } from "../../usecases/auth/register-usecase";
import { ResendOtpUsecase } from "../../usecases/auth/resend_otp.usecase";
import { SendOtpUsecase } from "../../usecases/auth/send-otp.usecase";
import { VerifyOtpUsecase } from "../../usecases/auth/verify-otp.usecase";
import { VerifyTokenUsecase } from "../../usecases/auth/verify-token.usecase";
import { CreateBlogUsecase } from "../../usecases/blog/create_blog.usecase";
import { DeleteBlogUsecase } from "../../usecases/blog/delete_blog.usecase";
import { EditBlogUsecase } from "../../usecases/blog/edit_blog.usecase";
import { GetBlogUsecase } from "../../usecases/blog/get_blog.usecase";
import { GetHomeDataUsecase } from "../../usecases/blog/get_home-data.usecase";
import { GetUserBlogsUsecase } from "../../usecases/user/get_user_blog.usecase";
import { PasswordBcrypt } from "../security/password-bcyrpt";

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

const deleteBlogUsecase = new DeleteBlogUsecase(blogRepository);

const getUserBlogsUsecase = new GetUserBlogsUsecase(jwtServices, blogRepository, blogMapper);

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
  getHomeDataUsecase,
  deleteBlogUsecase
);

export const userController = new UserController(getUserBlogsUsecase);
