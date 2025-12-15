import type { IUserEntity } from "../../models/user.entity.js";

export interface IRegisterUsecase {
    execute(data: IUserEntity): Promise<string>;
}