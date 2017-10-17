import 'whatwg-fetch';
// import 'googleapis';

import {ajax} from 'jquery';

const db =[];
const GOOGLE_API_KEY = 'AIzaSyALAOVJ8EJrA2C9SxcX9rB8-xPoAPXCuzk';
const GOOGLE_SENTIMENT_URL = `https://language.googleapis.com/v1/documents:analyzeSentiment`;
const GOOGLE_API_LANGUAGE_URL = 'https://language.googleapis.com/$discovery/rest?version=v1beta1';

//Note: uid is a security issue and in actual production, backend would
//compare authenticated session uid with message post uid.

const service = {
  uid: '',
  gapi: {},
};

service.init = function({uid, cb} = {}) {
  if (uid && uid !== '') {
    service.setCurrentUser(uid);
  }

  //initialize Google API service
  function start() {

    service.gapi = gapi.client.init({
      'apiKey': GOOGLE_API_KEY,
      'discoveryDocs': [GOOGLE_API_LANGUAGE_URL]
    });
    
    if (cb) {
      cb();
    }
    
  };

  gapi.load('client', start);

}




//Fetch from Google, Sentiment Analysis
service.getSentiment = function(txt) {
  return service.gapi
  .then(() =>
    gapi.client.language.documents.analyzeSentiment({
      document: {
        type: 'PLAIN_TEXT',
        content: txt
      }
    })
  )
  .then( (res) => res.result )
  //For some reason, the GAPI won't let me use catch() method.

  // .catch( (err) => console.log('Google API Error Caught: ' + err.result.error.message) );


}

service.newMessage = function(txt) {
  return {
    msg: txt,
    msgid: '' + Date.now(),
    uid: '',
    date: Date.now(),
    sentiment: 0,
  }
};

//POST
service.addMessage = async function(msg) {
  msg.uid = service.uid;

  const sentimentData = await service.getSentiment(msg.msg);
  msg.sentiment = sentimentData.documentSentiment.score; 

  db.push(msg);
  return true;
};


//GET
service.getMessages = function({limit= 99999, userMessagesOnly= false, minSentiment= -1, maxSentiment= 1}={}) {

  if (minSentiment >= maxSentiment) {
    throw `minSentiment, ${minSentiment}, greater or equal to maxSentiment, ${maxSentiment}.`;
  }

  if ( minSentiment > 1 || minSentiment < -1 ) {
    throw `minSentiment not in (-1,1) range: ${minSentiment}`
  }

  if ( maxSentiment > 1 || maxSentiment < -1 ) {
    throw `maxSentiment not in (-1,1) range: ${maxSentiment}`
  }

  if (limit < 1) {
    throw `limit set below 1.`
  }

  if (typeof(userMessagesOnly) !== 'boolean') {
    throw `userMessagesOnly not boolean.`
  }

  return Promise.resolve(db);
};

service.setCurrentUser = function(uid) {
  service.uid = uid;
};

export default service;