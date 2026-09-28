import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>;

const catchAsync = (handler: AsyncHandler): RequestHandler => {
    return (req, res, next) => {
        handler(req, res, next).catch((err) => next(err));
    };
};

export default catchAsync;