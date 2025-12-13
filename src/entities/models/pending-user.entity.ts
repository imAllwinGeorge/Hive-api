export interface IPendingUserEntity {
    email: string;
    otp: string;
    password: string;
    userName: string;
    expiresAt: Date;
}