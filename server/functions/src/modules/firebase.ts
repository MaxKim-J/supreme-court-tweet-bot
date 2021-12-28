import admin from 'firebase-admin';
import { batchDivider } from '../utils/batchSplitHelper'
import {Tweet} from "../types";

class Firebase {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: process.env.DATABASE_URL
    });
  }

  // TODO: firebase 제품별로 계층분리
  async getUploadedTweets() {
    const query = admin.firestore().collection('tweet')
        .where("uploadedAt", "!=", null).limit(10)
    const result = await query.get()
    return result.docs.map(x => x.data() as Tweet)
  }

  async getTweet(id:string) {
    const query = admin.firestore().collection('tweet')
        .where("id", "==", id)
    const result = await query.get()
    return result.docs.map(x => x.data() as Tweet)[0]
  }

  async getUploadTweetsLength() {
    const query = admin.firestore().collection('tweet')
        .where("uploadedAt", "!=", null)
    const result = await query.get()
    return result.docs.length;
  }

  async getTweetForPost() {
    const query = admin.firestore().collection('tweet')
        .where("uploadedAt", "==", null)
        .limit(1)
    const result = await query.get()
    return result.docs.map(x => x.data() as Tweet)[0]
  }

  async putTweetTimeStamp (id:string) {
    const docRef = admin.firestore().collection('tweet').doc(id)
    await docRef.update({
      uploadedAt:new Date()
    })
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
