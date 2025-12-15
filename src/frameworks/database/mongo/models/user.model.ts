import { model, Schema, type ObjectId } from "mongoose";
import type { IUserEntity } from "../../../../entities/models/user.entity.js";

export interface IUserModel extends IUserEntity{
    _id: ObjectId
}

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

export const UserModel = model<IUserModel>("User", userSchema)