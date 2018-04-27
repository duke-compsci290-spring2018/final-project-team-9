 import Firebase from 'firebase'

 var config = {
    apiKey: "AIzaSyBdLoyJdNa1hug8fmJVq08YQjfOjdsoyC0",
    authDomain: "cs290-trello-f0978.firebaseapp.com",
    databaseURL: "https://cs290-trello-f0978.firebaseio.com",
    storageBucket: "cs290-trello-f0978.appspot.com"
  };

  var fb = Firebase.initializeApp(config)


// global reference to remote database app
export const db = fb.database()
export const songs = db.ref('songs')
export const users = db.ref('users')
