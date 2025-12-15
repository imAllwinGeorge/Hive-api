import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import type { Error } from "mongoose";
import { AppError } from "../../shared/errors/appError.js";
import { ZodError } from "zod";
import { config } from "../../shared/config.js";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("errors", err.stack || err.message);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    sucess: false,
    message:
      config.NODE_ENV === "prodcution"
        ? "Something went wrong. Please try again later."
        : err.message,
  });
};
