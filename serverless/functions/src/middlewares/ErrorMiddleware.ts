import type { Request, Response,NextFunction } from "express";

interface Error {
    message: string;
    stack: string;
}

export const notFound = (req:Request,res:Response,next:NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(400)
    next(error)
}

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
