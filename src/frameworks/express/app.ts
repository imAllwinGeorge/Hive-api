import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { config } from "../../shared/config";
import { AuthRoutes } from "../../interfaceAdapters/routes/auth-route";

const app = express();
const authRoutes = new AuthRoutes();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: config.cors.allowed_origin,
    credentials: true
}))

app.use("/api", authRoutes.router);


export default app