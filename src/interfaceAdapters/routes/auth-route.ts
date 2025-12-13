import { request, type NextFunction, type Request, type Response } from "express";
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
            authController.verifyOtp(req, res, next);
        });

        this.router.get("/resend-otp/:email", (req: Request, res: Response, next: NextFunction) => {
            authController.resendOtp(req, res, next);
        })

        this.router.post("/login", (req: Request, res: Response, next: NextFunction) => {
            authController.login(req, res, next);
        })

        this.router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
            authController.logout(req, res, next);
        })
    }
}