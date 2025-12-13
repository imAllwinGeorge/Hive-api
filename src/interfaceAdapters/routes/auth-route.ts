import type { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./base-route";
import { authController } from "../../frameworks/di/container";

export class AuthRoutes extends BaseRoute {
    constructor () {
        super();
    }

    protected initializeRoutes(): void {
        this.router.post("/register", (req: Request, res: Response, next: NextFunction) => {
            authController.register(req, res, next);
        });

        this.router.post("/verify-otp", (req: Request, res: Response, next: NextFunction) => {
            authController.verfiyOtp(req, res, next);
        })
    }
}