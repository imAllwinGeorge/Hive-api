import type { Schema } from "mongoose";

export interface IGenerateTokenUsecase { 
    execute(userId: Schema.Types.ObjectId, email: string): Promise<{accessToken: string; refreshToken: string}>;
}