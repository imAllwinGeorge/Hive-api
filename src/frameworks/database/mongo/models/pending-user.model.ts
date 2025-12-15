import { model, Schema, type ObjectId } from "mongoose";
import type { IPendingUserEntity } from "../../../../entities/models/pending-user.entity.js";

export interface IPendingUserModel extends IPendingUserEntity {
    _id: ObjectId
}

const pendingUserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {expires: 0}
    }
})

export const PendingUserModel = model<IPendingUserModel>("PendingUser", pendingUserSchema);