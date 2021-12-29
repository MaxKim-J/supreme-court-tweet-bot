import admin from 'firebase-admin';
import { batchDivider } from '../../crawler/utils/batchSplitHelper';
import { Tweet } from '../types';

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

const readTweet = async (id: string) => {
  const query = admin.firestore().collection('tweet').where('id', '==', id);
  const result = await query.get();
  return result.docs.map((x) => x.data() as Tweet)[0];
};

const readUploadedTweetsLength = async () => {
  const query = admin
    .firestore()
    .collection('tweet')
    .where('uploadedAt', '!=', null);
  const result = await query.get();
  return result.docs.length;
};

const readTweetForPost = async () => {
  const query = admin
    .firestore()
    .collection('tweet')
    .where('uploadedAt', '==', null)
    .limit(1);
  const result = await query.get();
  return result.docs.map((x) => x.data() as Tweet)[0];
};

const updateTweetTimeStamp = async (id: string) => {
  const docRef = admin.firestore().collection('tweet').doc(id);
  await docRef.update({
    uploadedAt: new Date(),
  });
};

const createTweets = async (tweets: any[]) => {
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
};
