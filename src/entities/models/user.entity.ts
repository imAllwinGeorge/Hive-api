import type { IBaseEntity } from "./base.entity";

export interface IUserEntity extends IBaseEntity {
    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isBlocked: boolean;
}