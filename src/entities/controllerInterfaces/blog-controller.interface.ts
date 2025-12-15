import type { NextFunction, Request, Response } from "express";

export interface IBlogController {
    createBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    editBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    getHomeData(req: Request, res: Response, next: NextFunction): Promise<void>;
}