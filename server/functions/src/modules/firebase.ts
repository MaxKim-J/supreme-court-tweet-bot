import admin from 'firebase-admin';
import { batchDivider } from '../utils/batchSplitHelper'

class Firebase {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://supreme-court-tweet-bot-63f82.firebaseio.com/'
    });
  }

  async saveTweets(tweets:any[]) {
    const batchedTweets = batchDivider(tweets)
    for (const tweets of batchedTweets) {
      const batch = admin.firestore().batch();
      for (const tweet of tweets) {
        const newDocRef = admin.firestore().collection('tweet').doc(tweet.id);
        batch.set(newDocRef, tweet)
      }
      await batch.commit()
    }
  }

  async getFormerLength() {
    const lastIssueLength = await admin.database().ref('/lastIssueLength').once('value')
    const lastRecentLength = await admin.database().ref('/lastRecentLength').once('value')
    return {lastIssueLength:lastIssueLength.val(), lastRecentLength:lastRecentLength.val()}
  }

  async updateIssueLength(lastIssueLength:number) {
    await admin
      .database()
      .ref("/lastIssueLength")
      .set(lastIssueLength);
  }

  async updateRecentLength(lastRecentLength:number) {
    await admin
      .database()
      .ref("/lastRecentLength")
      .set(lastRecentLength);
  }
}

export default Firebase
