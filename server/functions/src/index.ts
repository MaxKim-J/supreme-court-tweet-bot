import * as functions from 'firebase-functions';
import express from 'express';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import crawler from './crawler';
import tweetBot from './tweetBot';
import loadExpressApp from './api';
import { defaultRuntimeOpts } from './@shared/configs';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.DATABASE_URL,
});

const app = express();
loadExpressApp(app);
exports.api = functions.https.onRequest(app);

exports.scrapAll = functions
  .runWith(defaultRuntimeOpts)
  .https.onRequest(crawler.scrapAll);

exports.scheduledScrap = functions
  .runWith(defaultRuntimeOpts)
  .https.onRequest(crawler.scrapRecent);

exports.scheduledPostTweet = functions.pubsub
  .schedule('00 7,12,18 * * *')
  .timeZone('Asia/Seoul')
  .onRun(tweetBot.postTweet);
