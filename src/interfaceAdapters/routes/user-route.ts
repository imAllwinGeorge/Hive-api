import type { NextFunction, Request, Response } from "express"
import { BaseRoute } from "./base-route"
import { userController } from "../../frameworks/di/container"
import { verifyToken } from "../middleware/auth.middleware"

export class UserRoutes extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.get("/blogs", verifyToken, (req: Request, res: Response, next: NextFunction) => {
            userController.getBlogs(req, res, next);
        })
    }
}