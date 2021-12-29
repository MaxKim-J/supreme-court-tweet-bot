import TweetBot from './TweetBot';
import dataBase from '../@shared/dataBase';
import { Request, Response } from 'express';

const postTweet = async (req: Request, res: Response) => {
  console.log('트윗봇을 시작합니다.');
  const bot = new TweetBot();
  try {
    console.log(`업로드할 트윗을 가져옵니다.`);
    const tweet = await dataBase.readTweetForPost();
    if (tweet) {
      const { id, name } = tweet;

      console.log(`${id}번 ${name} 트윗을 업로드합니다.`);
      bot.postTweet(id, name);

      const uploadedAt = await dataBase.updateTweetTimeStamp(id);
      console.log(`${id}번 트윗의 타임스탬프를 표시합니다.`);

      console.log(`${id}트윗을 트위터 포스팅합니다.`);
      console.log('트윗이 성공적으로 올라갔습니다. 트윗봇을 종료합니다.');
      res.status(200).send({
        id,
        name,
        uploadedAt,
      });
    } else {
      console.log('포스트할 트윗이 없습니다. 트윗봇을 종료합니다.');
      res.status(200).send({
        message: '포스트할 트윗이 없습니다!',
      });
    }
  } catch (err: any) {
    console.log(
      `***에러가 발생했습니다. 트윗봇을 종료하고 500 응답을 보냅니다.***`
    );
    res.status(500).send({
      message: err.message,
      error: err,
    });
  }
};

export default {
  postTweet,
};
