import type { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./base-route";
import upload from "../../frameworks/multer/multer";
import { blogController } from "../../frameworks/di/container";
import { verifyToken } from "../middleware/auth.middleware";

export class BlogRoute extends BaseRoute {
    constructor () {
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/create", verifyToken, upload.any(), (req: Request, res: Response, next: NextFunction) => {
            blogController.createBlog(req, res, next);
        })

        this.router.get("/get-blog/:blogId", verifyToken, (req: Request, res: Response, next: NextFunction) => {
            console.log("hello")
            blogController.getBlog(req, res, next);
        })

        this.router.put("/edit-blog/:blogId", verifyToken, upload.any(), (req: Request, res: Response, next: NextFunction) => {
            blogController.editBlog(req, res, next);
        })

        this.router.get("/home", (req: Request, res: Response, next: NextFunction) => {
            blogController.getHomeData(req, res, next);
        })
    }
}