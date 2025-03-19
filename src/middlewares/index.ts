import { Request, Response, NextFunction } from 'express';
import { ApiError } from "../helpers";

const errorMiddleware = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return;
    }

    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
    });
};

export default errorMiddleware;
