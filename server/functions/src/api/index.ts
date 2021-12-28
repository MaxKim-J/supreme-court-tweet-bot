import {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors'
import Controller from "./controller";
import Firebase from "../modules/firebase";

const loadExpressApp = (app:Express, fireBaseInstance:Firebase) => {
    const controller = new Controller(fireBaseInstance); // 싱글턴 파이어베이스 인스턴스

    app.use(cors({ origin: true, credentials: true }))

    app.get('/info', controller.getInfo.bind(controller))
    app.get('/tweet/:id', controller.getTweetById.bind(controller))
    app.get('/tweets/last', controller.getLastTweets.bind(controller))

    app.use((error:any, req:Request, res:Response, next:NextFunction) => {
        res.status(500).json({
            message: error.message,
            statusCode: error.statusCode,
            error,
        }).end()
    })
}

export default loadExpressApp;
