import { Request, Response, NextFunction } from 'express'
import {NotFound} from "./error/responseError";
import database from '../@shared/dataBase'

const getInfo = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const tweetsLength = await database.readUploadedTweetsLength()
        const {lastIssueLength, lastRecentLength} = await database.readFormerLength()
        return res.status(200).json({
            tweets : tweetsLength,
            precedents: lastRecentLength + lastIssueLength
        })
    } catch(e) {
        return next(e)
    }
}

const getTweetById = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params
        const tweet = await database.readTweet(id)
        if (!tweet) { throw new NotFound('해당 ID의 트윗이 없습니다')}
        return res.status(200).json({tweet})
    } catch(e) {
        return next(e)
    }
}

const getLastTweets = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const tweets = await database.readUploadedTweets()
        return res.status(200).json({tweets})
    } catch(e) {
        return next(e)
    }
}

export default {
    getInfo,
    getTweetById,
    getLastTweets
};
