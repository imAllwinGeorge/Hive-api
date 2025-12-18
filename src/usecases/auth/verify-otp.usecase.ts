import type { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface";
import type { IPendingUserRepository } from "../../entities/repositoryInterfaces/pending-user-repository.interface";
import type { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface";
import type { IVerifyOtpUsecase } from "../../entities/usecaseInterfaces/auth/verify_otp-usecase.interface";
import { HttpStatusCode } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import type { UserResponseDTO } from "../../shared/types/responseDTO";

export class VerifyOtpUsecase implements IVerifyOtpUsecase {
  constructor(
    private _userPendingRepository: IPendingUserRepository,

    private _userRepository: IUserRepository,

    private _userMapper: IUserMapper
  ) {}

  async execute(email: string, otp: string): Promise<UserResponseDTO> {
    const pendingUser = await this._userPendingRepository.findOne({ email });

    if (!pendingUser)
      throw new AppError("Please try again", HttpStatusCode.BAD_REQUEST);

    if (otp !== pendingUser.otp)
      throw new AppError("Please enter valide OTP", HttpStatusCode.BAD_REQUEST);

    const user = await this._userRepository.save({
      userName: pendingUser.userName,
      email: pendingUser.email,
      password: pendingUser.password,
    });

    return this._userMapper.toResponse(user);
  }
}
