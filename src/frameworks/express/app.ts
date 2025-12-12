import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { config } from "../../shared/config";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: config.cors.allowed_origin,
    credentials: true
}))


export default app