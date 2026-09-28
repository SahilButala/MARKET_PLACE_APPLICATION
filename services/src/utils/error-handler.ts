import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiRes from "./api-response";
import AppError from "./app-error";

// middlewares/error-handler.ts
const errorHandler = (
    err: AppError | Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void => {
    const statusCode = (err as AppError).statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json(
        new ApiRes(
            statusCode,
            false,
            message,
            process.env.NODE_ENV === "development" ? err.stack : undefined
        )
    );
};

export default errorHandler;