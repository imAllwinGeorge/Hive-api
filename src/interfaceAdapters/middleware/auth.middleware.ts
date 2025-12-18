import type { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/constants";
import { verifyTokenUsecase } from "../../frameworks/di/container";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("verify token");
        const token = req.cookies.accessToken
        console.log(token)
        const user = await verifyTokenUsecase.execute(token);
        console.log(token, user)
        if(user.isBlocked) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({message: " you have been blocked please contact admin"});
            return;
        }

        next();
    } catch (error) {
        if(error instanceof Error) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({message: "session expired"});
        }
    }
} 

// import type { NextFunction, Request, Response } from "express";
// import type { IVerifyTokenUsecase } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
// import { HttpStatusCode } from "../../shared/constants/constants";

// export const verifyToken =
//   (verifyTokenUsecase: IVerifyTokenUsecase) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const token = req.cookies?.accessToken;
//       console.log(token)
//       if (!token) {
//         return res
//           .status(HttpStatusCode.UNAUTHORIZED)
//           .json({ message: "No token provided" });
//       }
//       console.log(verifyTokenUsecase)
//       const user = await verifyTokenUsecase.execute(token);
//       console.log(user)
//       if (user.isBlocked) {
//         return res
//           .status(HttpStatusCode.UNAUTHORIZED)
//           .json({ message: "You have been blocked" });
//       }
//       console.log(user);
//       next();
//     } catch {
//       res
//         .status(HttpStatusCode.UNAUTHORIZED)
//         .json({ message: "Session expired" });
//     }
//   };
