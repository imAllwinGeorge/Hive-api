import dotenv from "dotenv";
dotenv.config();

export const config = {
  cors: {
    allowed_origin: process.env.ALLOWED_ORIGIN,
  },
  port: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV,
  GMAIL_ID: process.env.GMAIL_ID,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET,
};
