import admin from 'firebase-admin';
import {arrayDivider} from '../utils/batchSplitHelper'

class Firebase {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://supreme-court-tweet-bot-63f82.firebaseio.com/'
    });
  }

  async savePrecedentsInFireStore(data:any[]) {
    // 배치를 나눠야함
    const realData = arrayDivider(data)
    console.log(realData.length)
    for (const data of realData) {
      const batch = admin.firestore().batch();
      for (const obj of data) {
        const newDocRef = admin.firestore().collection('tweet').doc(obj.id);
        batch.set(newDocRef, obj)
      }
      await batch.commit()
    }
  }

  async getFormerLengthFromDB() {
    const lastIssueLength = await admin.database().ref('/lastIssueLength').once('value')
    const lastRecentLength = await admin.database().ref('/lastRecentLength').once('value')
    return {lastIssueLength:lastIssueLength.val(), lastRecentLength:lastRecentLength.val()}
  }

  async updateIssueLengthToDB(lastIssueLength:number) {
    await admin
      .database()
      .ref("/lastIssueLength")
      .set(lastIssueLength);
  }

  async updateRecentLengthToDB(lastRecentLength:number) {
    await admin
      .database()
      .ref("/lastRecentLength")
      .set(lastRecentLength);
  }
}

export default Firebase
