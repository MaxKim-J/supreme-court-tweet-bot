import Firebase from "../modules/firebase";
import { Request, Response, NextFunction } from 'express'

class Controller {
    constructor(private firebase:Firebase) {}

    async getInfo(req:Request, res:Response, next:NextFunction) {
        try {
            const tweetsLength = await this.firebase.getUploadTweetsLength()
            const {lastIssueLength, lastRecentLength} = await this.firebase.getFormerLength()
            return res.status(200).json({
                tweets : tweetsLength,
                precedents: lastRecentLength + lastIssueLength
            })
        } catch(e) {
            return next(e)
        }
    }

    async getTweetById(req:Request, res:Response, next:NextFunction) {
        try {
            const { id } = req.params
            const tweet = await this.firebase.getTweet(id)
            if (!tweet) { throw Error('해당 ID의 트윗이 없습니다')}
            return res.status(200).json({tweet})
        } catch(e) {
            return next(e)
        }
    }

    async getLastTweets(req:Request, res:Response, next:NextFunction) {
        try {
            const tweets = await this.firebase.getUploadedTweets()
            return res.status(200).json({tweets})
        } catch(e) {
            return next(e)
        }
    }
}

export default Controller;
