import type { Request, Response, NextFunction } from "express";
import type { IUserController } from "../../entities/controllerInterfaces/user-controller.interface";
import { calculateTotalPages, getPaginationParams } from "../../shared/utils/pagination.helpers";
import type { IGetUserBlogs } from "../../entities/usecaseInterfaces/user/get_user_blogs-usecase.interface";
import { HttpStatusCode } from "../../shared/constants/constants";

export class UserController implements IUserController {

    constructor (
        private _getBlogsUsecase: IGetUserBlogs,
    ) {}

    async getBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.cookies.accessToken;
            const { limit, skip } = getPaginationParams(req);

            const result = await this._getBlogsUsecase.execute(token, limit, skip);

            const pages = calculateTotalPages(result.total, limit);

            res.status(HttpStatusCode.OK).json({blogs: result.blogs, total: pages});

        } catch (error) {
            next(error)
        }
    }

}