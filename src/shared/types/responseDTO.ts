import type { ObjectId } from "mongoose";

export type UserResponseDTO = {
    _id: ObjectId;
    userName: string;
    email: string;
    isAdmin: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}