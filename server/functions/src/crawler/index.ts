import { launch } from 'puppeteer';
import Crawler from './Crawler';
import dataBase from '../@shared/dataBase';
import convertToTweet from './utils/parsingHelper';
import { Request, Response } from 'express';
import { Precedent, Tweet } from '../@shared/types';

const scrapAll = async (req: Request, res: Response) => {
  try {
    console.log('전체 판례 크롤링을 시작합니다');
    const browser = await launch({ headless: false });
    const page = await browser.newPage();
    const crawler = new Crawler(browser, page);

    const precedents: Precedent[] = [];

    const issueLength = await crawler.getTargetPrecedentsLength('issue');
    precedents.push(...(await crawler.scrapAllPrecedents('issue')));
    await dataBase.updateIssueLength(issueLength);

    const recentLength = await crawler.getTargetPrecedentsLength('recent');
    precedents.push(...(await crawler.scrapAllPrecedents('recent')));
    await dataBase.updateRecentLength(recentLength);

    await crawler.shutCrawlerDown();

    console.log(`${issueLength + recentLength}개의 판례를 크롤링했습니다`);
    console.log(
      `DB에 화제 판례 개수(${issueLength}), 최신 판례 개수(${recentLength})를 기록했습니다.`
    );

    await dataBase.createPrecedents(precedents);

    const tweets = precedents.reduce(
      (acc: Tweet[], cur) => acc.concat(convertToTweet(cur)),
      []
    );

    await dataBase.createTweets(tweets);

    console.log(`DB에 ${tweets.length}개 트윗을 저장했습니다.`);

    console.log('크롤러를 종료하고 200 응답을 보냅니다.');
    res.status(200).send({
      precedentLength: issueLength + recentLength,
      tweetLength: tweets.length,
    });
    return;
  } catch (err: any) {
    console.log(
      `***에러가 발생했습니다. 크롤러를 종료하고 500 응답을 보냅니다.***`
    );
    res.status(500).send({
      message: err.message,
      error: err,
    });
    return;
  }
};

const scrapRecent = async (req: Request, res: Response) => {
  try {
    console.log('최신 판례 크롤링을 시작합니다');
    const browser = await launch({ headless: false });
    const page = await browser.newPage();
    const crawler = new Crawler(browser, page);

    const { lastIssueLength, lastRecentLength } =
      await dataBase.readFormerLength();
    console.log(
      `현재까지 DB에 저장된 화제판례는 ${lastIssueLength}개, 최신판례는 ${lastRecentLength}개 입니다.`
    );

    let newPrecedents: Precedent[] = [];
    const newIssueLength = await crawler.getTargetPrecedentsLength('issue');
    if (newIssueLength - lastIssueLength > 0) {
      newPrecedents.push(
        ...(await crawler.scrapRecentPrecedents(
          'issue',
          newIssueLength - lastIssueLength
        ))
      );
      await dataBase.updateIssueLength(newIssueLength);
    }

    const newRecentLength = await crawler.getTargetPrecedentsLength('recent');
    if (newRecentLength - lastRecentLength > 0) {
      newPrecedents.push(
        ...(await crawler.scrapRecentPrecedents(
          'recent',
          newRecentLength - lastRecentLength
        ))
      );
      await dataBase.updateRecentLength(newRecentLength);
    }

    if (newPrecedents.length > 0) {
      console.log(
        `현재 화제판례 ${newIssueLength}개, 최신판례 ${newRecentLength}개를 크롤링했습니다`
      );

      await dataBase.createPrecedents(newPrecedents);
      const tweets = (newPrecedents as any[]).reduce(
        (acc, cur) => acc.concat(convertToTweet(cur)),
        []
      );
      await dataBase.createTweets(tweets);
      console.log(`DB에 ${tweets.length}개 트윗을 저장했습니다.`);

      console.log('크롤러를 종료하고 200 응답을 보냅니다.');
      res.status(200).send({
        precedentLength: newIssueLength + newRecentLength,
        tweetLength: tweets.length,
      });
    } else {
      console.log(
        `***새롭게 크롤링할 판례가 없습니다. 크롤러를 종료하고 200 응답을 보냅니다.***`
      );
      res.status(200).send({
        message: '새롭게 크롤링할 판례가 없습니다.',
      });
    }
    return;
  } catch (err: any) {
    console.log(
      `***에러가 발생했습니다. 크롤러를 종료하고 500 응답을 보냅니다.***`
    );
    console.error(err);
    res.status(500).send({
      message: err.message,
    });
    return;
  }
};

export default {
  scrapAll,
  scrapRecent,
};
