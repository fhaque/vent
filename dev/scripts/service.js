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
service.getMessages = function() {
  return Promise.resolve(db);
};

service.setCurrentUser = function(uid) {
  service.uid = uid;
};

export default service;