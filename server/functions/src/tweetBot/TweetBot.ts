import Twitter from 'twitter';

class TweetBot {
  private client: Twitter;
  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY as string,
      consumer_secret: process.env.CONSUMER_KEY_SECRET as string,
      access_token_key: process.env.ACCESS_TOKEN_KEY as string,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
    });
  }

  postTweet(id: string, title: string) {
    this.client.post(
      'statuses/update',
      {
        status: `${this.sliceTweet(
          title
        )}\nhttps://supreme-court-tweet-bot.vercel.app/tweet/${id}`,
      },
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }

  private sliceTweet(title: string) {
    if (title.length > 136) return title.slice(0, 137) + '...';
    return title;
  }
}

export default TweetBot;
