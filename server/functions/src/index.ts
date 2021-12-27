import * as functions from 'firebase-functions';
import { launch } from 'puppeteer';
import { defaultRuntimeOpts } from './configs';
import PrecedentCrawler from './modules/precedentCrawler';
// import TweetBot from './modules/tweetBot';
import Firebase from './modules/firebase';
import convertToTweet from './utils/parsingHelper'

const firebase = new Firebase()

exports.initialCrawler = functions.runWith(defaultRuntimeOpts).https.onRequest(async(req, res) => {
    try {
        console.log('전체 판례 크롤링을 시작합니다')
        const browser = await launch({headless:true})
        const page = await browser.newPage()
        const crawler = new PrecedentCrawler(browser, page)

        const result = []

        const issueLength = await crawler.getTargetPrecedentsLength('issue');
        result.push(...await crawler.scrapAllPrecedents('issue'))
        await firebase.updateIssueLength(issueLength)

        const recentLength = await crawler.getTargetPrecedentsLength('recent');
        result.push(...await crawler.scrapAllPrecedents('recent'))
        await firebase.updateRecentLength(recentLength)

        await crawler.shutCrawlerDown()

        console.log(`${issueLength + recentLength}개의 판례를 크롤링했습니다`)
        console.log(`DB에 화제 판례 개수(${issueLength}), 최신 판례 개수(${recentLength})를 기록했습니다.`)

        const tweets = result.reduce((acc, cur) => acc.concat(convertToTweet(cur)), [])
        await firebase.saveTweets(tweets)

        console.log(`DB에 ${tweets.length}개 트윗을 저장했습니다.`)

        console.log('크롤러를 종료하고 200 응답을 보냅니다.')
        res.status(200).send({
            precedentLength: issueLength + recentLength,
            tweetLength: tweets.length
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
        console.log('최신 판례 크롤링을 시작합니다')
        const browser = await launch({headless:false})
        const page = await browser.newPage()
        const crawler = new PrecedentCrawler(browser, page)

        const {lastIssueLength, lastRecentLength} = await firebase.getFormerLength()
        console.log(`현재까지 DB에 저장된 화제판례는 ${lastIssueLength}개, 최신판례는 ${lastRecentLength}개 입니다.`)

        let newPrecedents = []
        const newIssueLength = await crawler.getTargetPrecedentsLength('issue');
        if (newIssueLength - lastIssueLength > 0) {
            newPrecedents.push(...await crawler.scrapRecentPrecedents('issue', newIssueLength - lastIssueLength));
            await firebase.updateIssueLength(newIssueLength)
        }

        const newRecentLength = await crawler.getTargetPrecedentsLength('recent');
        if (newRecentLength - lastRecentLength > 0) {
            newPrecedents.push(...await crawler.scrapRecentPrecedents('recent', newRecentLength - lastRecentLength));
            await firebase.updateRecentLength(newRecentLength)
        }

        if (newPrecedents.length > 0) {
            console.log(`현재 화제판례 ${newIssueLength}개, 최신판례 ${newRecentLength}개를 크롤링했습니다`)
            const tweets = (newPrecedents as any[]).reduce((acc, cur) => acc.concat(convertToTweet(cur)), [])
            await firebase.saveTweets(tweets)
            console.log(`DB에 ${tweets.length}개 트윗을 저장했습니다.`)
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
