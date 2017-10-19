import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCjzrYI_z2hxbx--Vg3A1JXazoVOuvi6tE",
  authDomain: "vent-7ab40.firebaseapp.com",
  databaseURL: "https://vent-7ab40.firebaseio.com",
  projectId: "vent-7ab40",
  storageBucket: "vent-7ab40.appspot.com",
  messagingSenderId: "848024223036"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;