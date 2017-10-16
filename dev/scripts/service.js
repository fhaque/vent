const db =[];

//Note: uid is a security issue and in actual production, backend would
//compare authenticated session uid with message post uid.

const service = {
  uid: '',
};

service.newMessage = function() {
  return {
    msg: '',
    msgid: '' + Date.now(),
    uid: '',
    date: Date.now(),
    sentiment: 0,
  }
};

//POST
service.addMessage = function(msg) {
  msg.uid = service.uid;
  db.push(msg);
  return Promise.resolve(true);
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