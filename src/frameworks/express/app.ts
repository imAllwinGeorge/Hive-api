import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { config } from "../../shared/config";
import { AuthRoutes } from "../../interfaceAdapters/routes/auth-route";
import { BlogRoute } from "../../interfaceAdapters/routes/blog-route";

const app = express();
const authRoutes = new AuthRoutes();
const blogRoute = new BlogRoute();

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




export default app