import type { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./base-route";
import upload from "../../frameworks/multer/multer";
import { blogController } from "../../frameworks/di/container";

export class BlogRoute extends BaseRoute {
    constructor () {
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/create", upload.any(), (req: Request, res: Response, next: NextFunction) => {
            blogController.createBlog(req, res, next);
        })

        this.router.get("/get-blog/:blogId", (req: Request, res: Response, next: NextFunction) => {
            blogController.getBlog(req, res, next);
        })

        this.router.put("/edit-blog/:blogId", upload.any(), (req: Request, res: Response, next: NextFunction) => {
            blogController.editBlog(req, res, next);
        })
    }
}