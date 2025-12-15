import type { NextFunction, Request, Response } from "express";

export interface IBlogController {
    createBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
}