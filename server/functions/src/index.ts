import * as functions from 'firebase-functions';
import { launch } from 'puppeteer';
import { defaultRuntimeOpts } from './configs';
import PrecedentCrawler from './modules/precedentCrawler';
// import TweetBot from './modules/tweetBot';
import Firebase from './modules/firebase';
import convertPrecedentToTweet from './utils/parsingHelper'

const firebase = new Firebase()

exports.initialCrawler = functions.runWith(defaultRuntimeOpts).https.onRequest(async(req, res) => {
    try {
        const browser = await launch({headless:false})
        const page = await browser.newPage()
        const crawler = new PrecedentCrawler(browser, page)

        const result = []

        console.log('화제 판례 페이지 크롤링을 시작합니다')
        const issueLength = await crawler.getTargetPrecedentsLength('issue');
        result.push(...await crawler.scrapAllPrecedents('issue'))
        console.log(issueLength)
        await firebase.updateIssueLengthToDB(issueLength)

        console.log('최신선고 판례 페이지 크롤링을 시작합니다')
        const recentLength = await crawler.getTargetPrecedentsLength('recent');
        console.log(recentLength)
        result.push(...await crawler.scrapAllPrecedents('recent'))
        await firebase.updateRecentLengthToDB(recentLength)

        await crawler.shutCrawlerDown()

        console.log('DB에 판례를 트윗으로 전환해 저장합니다')
        await firebase.savePrecedentsInFireStore(
            result.reduce((acc, cur) => {
                return acc.concat(convertPrecedentToTweet(cur))
            }, [])
        )

        console.log(`6. 크롤러를 종료하고 200 응답을 보냅니다.`)
        res.status(200).send({
            length: issueLength + recentLength,
            precedents: result
        })
    } catch(err:any) {
        console.log(`***에러가 발생했습니다. 크롤러를 종료하고 500 응답을 보냅니다.***`)
        console.log(err)
        res.status(500).send(
            {
                message : err.message,
                error:err,
            }
        )
    }
})

exports.watchCrawler = functions.runWith(defaultRuntimeOpts).https.onRequest(async(req,res) => {
    try {
        const browser = await launch({headless:true})
        const page = await browser.newPage()
        const crawler = new PrecedentCrawler(browser, page)

        const {lastIssueLength, lastRecentLength} = await firebase.getFormerLengthFromDB()

        let newPrecedents = []
        const newIssueLength = await crawler.getTargetPrecedentsLength('issue');
        if (newIssueLength - lastIssueLength > 0) {
            newPrecedents.push(...await crawler.scrapRecentPrecedents('issue', newIssueLength - lastIssueLength));
            await firebase.updateIssueLengthToDB(newIssueLength)
        }

        const newRecentLength = await crawler.getTargetPrecedentsLength('recent');
        if (newRecentLength - lastRecentLength > 0) {
            newPrecedents.push(...await crawler.scrapRecentPrecedents('recent', newRecentLength - lastRecentLength));
            await firebase.updateRecentLengthToDB(newRecentLength)
        }

        if (newPrecedents.length > 0) {
            // DB 업데이트하기

        } else {
            console.log(`***새롭게 크롤링할 판례가 없습니다. 크롤러를 종료하고 200 응답을 보냅니다.***`)
            res.status(200).send({
                message : '새롭게 크롤링할 판례가 없습니다!'
            })
        }
    } catch(err:any) {
        console.log(`***에러가 발생했습니다. 크롤러를 종료하고 500 응답을 보냅니다.***`)
        res.status(500).send(
            {
                message : err.message,
                error:err,
            }
        )
    }
})

// exports.uploadData = functions.https.onRequest(async(req, res) => {
//
//
// };

// exports.tweetBot = functions.https.onRequest(async(req, res) => {
//     console.log('트윗봇을 시작합니다.')
//     const bot = new TweetBot()
//     try {
//         console.log(`업로드할 트윗을 가져옵니다.`)
//         const {id,name} = await bot.getCurrentTweet()
//         console.log(`${id}번 ${name} 트윗을 업로드합니다.`)
//         const uploadedAt = await bot.putTweetTimeStamp(id)
//         console.log(`${id}번 트윗의 타임스탬프를 표시합니다.`)
//         if(uploadedAt) { bot.postTweet(id,name) }
//         console.log(`${id}트윗을 트위터 포스팅합니다.`)
//         console.log('트윗이 성공적으로 올라갔습니다. 트윗봇을 종료합니다.')
//         return await res.status(200).send({
//             id,
//             name,
//             uploadedAt
//         })
//     } catch(err) {
//         console.log(`***에러가 발생했습니다. 트윗봇을 종료하고 500 응답을 보냅니다.***`)
//         res.status(500).send(
//             {
//                 message : err.message,
//                 error:err,
//             }
//         )
//     }
//
//     res.send("나는 트윗봇이다")
// })
