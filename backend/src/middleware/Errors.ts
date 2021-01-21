import { Request, Response, NextFunction } from "express"

export const defaultErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }

    return res.status(422).json(err)
}
