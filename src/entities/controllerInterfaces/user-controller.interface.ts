import type { NextFunction, Request, Response } from "express";

export interface IUserController {
    getBlogs (req: Request, res: Response, next: NextFunction): Promise<void>
}