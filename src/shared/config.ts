import dotenv from "dotenv";
dotenv.config();

export const config = {
    cors: {
        allowed_origin: process.env.ALLOWED_ORIGIN,
    },
    port: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
}