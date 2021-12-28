import {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors'
import controller from "./controller";
import {ResponseError} from "./error/responseError";

const loadExpressApp = (app:Express) => {
    app.use(cors({ origin: true, credentials: true }))

    app.get('/info', controller.getInfo)
    app.get('/tweet/:id', controller.getTweetById)
    app.get('/tweets/last', controller.getLastTweets) // 거슬리는데..

    app.use((error:Error, req:Request, res:Response, next:NextFunction) => {
        const errorCode = error instanceof ResponseError ? error.statusCode : 500;
        res.status(errorCode).json({
            message: error.message,
            statusCode: errorCode,
            error,
        }).end()
    })
}

export default loadExpressApp;
