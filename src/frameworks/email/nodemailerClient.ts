import nodemailer from "nodemailer";
import { config } from "../../shared/config";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config.GMAIL_ID,
        pass: config.GMAIL_PASSWORD,
    },
});

export default transporter;