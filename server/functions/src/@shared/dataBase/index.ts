import admin from 'firebase-admin';
import { batchDivider } from '../../crawler/utils/batchSplitHelper';
import { Precedent, Tweet, TweetResponse } from '../types';
import { parseContent } from '../../crawler/utils/parsingHelper';

const readUploadedTweets = async () => {
  const query = admin
    .firestore()
    .collection('tweet')
    .where('uploadedAt', '!=', null)
    .orderBy('uploadedAt')
    .limit(10);
  const result = await query.get();
  return result.docs.map((x) => x.data() as Tweet);
};

const readTweet = async (id: string): Promise<TweetResponse> => {
  const query = admin.firestore().collection('tweet').doc(id);
  const tweetById = await query.get();
  const tweet = tweetById.data() as Tweet;

  const precedentQuery = await admin
    .firestore()
    .collection('precedent')
    .doc(tweet.id.split('-')[0]);

  const precedents = await precedentQuery.get();
  const precedent = precedents.data() as Precedent;

  return {
    ...tweet,
    precedentContent: parseContent(precedent.content),
    type: precedent.type,
  };
};

const readUploadedTweetsLength = async () => {
  const query = admin
    .firestore()
    .collection('tweet')
    .where('uploadedAt', '!=', null);
  const result = await query.get();
  return result.docs.length;
};

const readTweetForPost = async (): Promise<Tweet> => {
  const tweetQuery = admin
    .firestore()
    .collection('tweet')
    .where('uploadedAt', '==', null);

  const tweets = await tweetQuery.get();
  const randomIndex = Math.floor(Math.random() * tweets.docs.length);

  return tweets.docs[randomIndex].data() as Tweet;
};

const updateTweetTimeStamp = async (id: string) => {
  const docRef = admin.firestore().collection('tweet').doc(id);
  await docRef.update({
    uploadedAt: new Date(),
  });
};

const createPrecedents = async (precedents: Precedent[]) => {
  const batchedPrecedents = batchDivider(precedents);
  for (const precedents of batchedPrecedents) {
    const batch = admin.firestore().batch();
    for (const precedent of precedents) {
      const newDocRef = admin
        .firestore()
        .collection('precedent')
        .doc(precedent.id);
      batch.set(newDocRef, precedent);
    }
    await batch.commit();
  }
};

const createTweets = async (tweets: Tweet[]) => {
  const batchedTweets = batchDivider(tweets);
  for (const tweets of batchedTweets) {
    const batch = admin.firestore().batch();
    for (const tweet of tweets) {
      const newDocRef = admin.firestore().collection('tweet').doc(tweet.id);
      batch.set(newDocRef, tweet);
    }
    await batch.commit();
  }
};

const readFormerLength = async () => {
  const lastIssueLength = await admin
    .database()
    .ref('/lastIssueLength')
    .once('value');
  const lastRecentLength = await admin
    .database()
    .ref('/lastRecentLength')
    .once('value');
  return {
    lastIssueLength: lastIssueLength.val(),
    lastRecentLength: lastRecentLength.val(),
  };
};

const updateIssueLength = async (lastIssueLength: number) => {
  await admin.database().ref('/lastIssueLength').set(lastIssueLength);
};

const updateRecentLength = async (lastRecentLength: number) => {
  await admin.database().ref('/lastRecentLength').set(lastRecentLength);
};

export default {
  readUploadedTweets,
  readTweet,
  readUploadedTweetsLength,
  readTweetForPost,
  updateTweetTimeStamp,
  createTweets,
  readFormerLength,
  updateIssueLength,
  updateRecentLength,
  createPrecedents,
};
