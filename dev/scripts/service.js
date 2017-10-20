import firebase, { auth, provider } from './firebase';

const messagesRef = firebase.database().ref('messages');
const usersRef = firebase.database().ref('users');


const GOOGLE_API_KEY = 'AIzaSyALAOVJ8EJrA2C9SxcX9rB8-xPoAPXCuzk';
const GOOGLE_SENTIMENT_URL = `https://language.googleapis.com/v1/documents:analyzeSentiment`;
const GOOGLE_API_LANGUAGE_URL = 'https://language.googleapis.com/$discovery/rest?version=v1beta1';

//Note: uid is a security issue and in actual production, backend would
//compare authenticated session uid with message post uid.

const service = {
  uid: '',
  gapi: {},
  auth: auth,
  provider: provider,
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
    uid: '',
    date: Date.now(),
    sentiment: 0,
  }
};


service.subscribeToMessages = function({ limit= 99999, userMessagesOnly= false, minSentiment= -1, maxSentiment= 1, startDate, endDate }={}, handle) {

  /* argument validation */
  if (minSentiment >= maxSentiment) {
    throw `minSentiment, ${minSentiment}, greater or equal to maxSentiment, ${maxSentiment}.`;
  }

  if ( minSentiment > 1 || minSentiment < -1 ) {
    throw `minSentiment not in (-1,1) range: ${minSentiment}`;
  }

  if ( maxSentiment > 1 || maxSentiment < -1 ) {
    throw `maxSentiment not in (-1,1) range: ${maxSentiment}`;
  }

  if (limit < 1) {
    throw `limit set below 1.`;
  }

  if (typeof(userMessagesOnly) !== 'boolean') {
    throw `userMessagesOnly not boolean.`;
  }

  /* construct the Query */
  // Note: Firebase has limited querying ability. So, some filtering
  // happens on the local browser.

  let dbQuery = messagesRef;

  dbQuery.limitToFirst(limit).on('value', snapshot => {
    const dbMessages = snapshot.val();
    const messages = service.dbMessagesToMessagesArray(dbMessages);

    console.log("Services, pre-filter messages", messages);

    let filtered = messages;

    if (startDate && endDate) {
      filtered = filtered.filter( msg => (msg.sentiment >= minSentiment) && (msg.sentiment <= maxSentiment) && (msg.date >= startDate) && (msg.date <= endDate + 24 * 60 * 60 * 1000 - 1) );
    } else {
      filtered = filtered.filter( msg => (msg.sentiment >= minSentiment) && (msg.sentiment <= maxSentiment));
    }
    

    if (userMessagesOnly && service.uid) {
      
      filtered = filtered.filter(msg => {
        return (msg.uid + "") === (service.uid + "");
      });
    }

    if (handle) {
      handle(filtered);
    }

  });

}

service.unsubscribeToMessages = function() {
  messagesRef.off();
}


service.addMessage = function(msg) {
  msg.uid = service.uid || '';

  return service.getSentiment(msg.msg)
      .then( sentimentData =>  msg.sentiment = sentimentData.documentSentiment.score )
      .then( () => messagesRef.push(msg) )
      .then( () => true );
}


//GET
service.getMessages = function({ limit= 99999, userMessagesOnly= false, minSentiment= -1, maxSentiment= 1, startDate, endDate }={}) {

  /* argument validation */
  if (minSentiment >= maxSentiment) {
    throw `minSentiment, ${minSentiment}, greater or equal to maxSentiment, ${maxSentiment}.`;
  }

  if ( minSentiment > 1 || minSentiment < -1 ) {
    throw `minSentiment not in (-1,1) range: ${minSentiment}`;
  }

  if ( maxSentiment > 1 || maxSentiment < -1 ) {
    throw `maxSentiment not in (-1,1) range: ${maxSentiment}`;
  }

  if (limit < 1) {
    throw `limit set below 1.`;
  }

  if (typeof(userMessagesOnly) !== 'boolean') {
    throw `userMessagesOnly not boolean.`;
  }

  /* construct the Query */
  // Note: Firebase has limited querying ability. So, some filtering
  // happens on the local browser.

  let dbQuery = messagesRef;

  //Query by date range first if date range given, if not, by sentiment
  if(startDate && endDate) {
    if (startDate <= endDate) {
      dbQuery = dbQuery
        .orderByChild('date')
        .startAt(startDate)
        .endAt(endDate);
    } else {
      throw `startDate greater than enDate.`;
    }
  } else {
    dbQuery
    .orderByChild('sentiment')
    .startAt(minSentiment)
    .endAt(maxSentiment);
  }

  

  return dbQuery.limitToFirst(limit).once('value')
    .then(snapshot => snapshot.val())
    .then(service.dbMessagesToMessagesArray)
    .then( messages => {
      let filtered = messages;
      if (startDate && endDate) {
        filtered = filtered.filter( msg => (msg.sentiment >= minSentiment) && (msg.sentiment <= maxSentiment) );
      }

      if (userMessagesOnly && service.uid) {
        filtered = filtered.filter(msg => msg.uid === service.uid);
      }

      return filtered;
    });
};

service.dbMessagesToMessagesArray = function(dbMessages) {
  const messages = [];
  for (const key in dbMessages) {
    if ( dbMessages.hasOwnProperty(key) ) {
      const msg = Object.assign({}, dbMessages[key]);
      msg.msgid = key;
      messages.push(msg);
    }
  }

  return messages;
}

service.setCurrentUser = function(uid) {
  service.uid = uid;
};

service.removeCurrentUser = function() {
  service.uid = null;
};

export default service;