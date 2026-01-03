import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { config } from "../../shared/config";
import { AuthRoutes } from "../../interfaceAdapters/routes/auth-route";
import { BlogRoute } from "../../interfaceAdapters/routes/blog-route";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { UserRoutes } from "../../interfaceAdapters/routes/user-route";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const authRoutes = new AuthRoutes();
const blogRoute = new BlogRoute();
const userRoute = new UserRoutes();

app.set("trust proxy", 1);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: config.cors.allowed_origin,
    credentials: true
}))

app.use("/uploads", express.static(path.join(__dirname, "multer", "uploads")));
app.use("/uploads", express.static("uploads"));

app.use("/api", authRoutes.router);
app.use("/api/blog", blogRoute.router);
app.use("/api/user", userRoute.router);




export default app