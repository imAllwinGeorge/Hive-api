import type { IUserEntity } from "../../models/user.entity";

export interface IRegisterUsecase {
    execute(data: IUserEntity): Promise<string>;
}