<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import {db, songs, users} from './database'

export default {
  name: 'app',

  firebase: {
    songs: songs,
    users: users
  },

  data() {
    return {
      added: [],
      artist: "",
      createEmail: "",
      createPassword: "",
      coins: 0,
      downvoted: [],
      email: "",
      password: "",
      permission: "",
      saved: "",
      song: "",
      upvoted: ""
    }
  },
  
  methods: {
    guest: function() {
      //proceed as guest
      console.log("guest test");
    },
    authenticate: function(email, password) {
      //authenticate user if info match in credentials database
      console.log("authenticate test");
      console.log(email);
      console.log(password);
    },
    createAccount: function(email, password) {
      //add info to credentials database
      console.log("createAccount test");
      console.log(email);
      console.log(password);
      //var key = database.ref('users/').push().key;
      //var exists = database.ref('users/' + email);
      //console.log(exists);
      //if (exists === false) {
      //console.log(database.ref('users/').child(email).exists());
      //console.log(2);
      //var temp = email.replace(new RegExp(".","g"), "<>");
      //var temp = email.replace(/./g, "<>");
      var temp = email.split('.').join("<>");
      console.log(temp);
      var ref = db.ref('users/' + temp);
      ref.once("value")
        .then(function(snapshot) {
          if(!(snapshot.exists())) {
            console.log(1);
            db.ref('users/' + temp).set({
              added: ["null"],
              coins: 10,
              downvoted: ["null"],
              password: password,
              permission: "user",
              saved: ["null"],
              upvoted: ["null"]
            });
          }
        });
      this.coins = 10;
      this.email = email;
      this.password = password;
      this.permission = "user";
    },
    viewProfile: function() {
      //maybe just do this in HTML
    },
    changePassword: function(prevPassword, newPassword) {
      //if prevPassword matches that in the credentials database, change prevPassword to newPassword
    },
    resetPassword: function() {
      //this seems tedious and we can probably cut it out
    },
    viewMusic: function() {
      //views input in checkboxes and displays respective lists
    },
    addSong: function() {
      //check info with song database and if true, give user a coin, else display error msg
      //make sure that song uploaded is unique, or else throw error msg
      var thisTrack = this.song.replace(/\s/, '%20');
      console.log(thisTrack);
      var thisArtist = this.artist.replace(/\s/, '%20');

      $.ajax({
        url: 'https://api.spotify.com/v1/search/q=artist:' + thisArtist + '%20name:' + thisTrack + '&type=track',
        success: function (response) {
                console.log(response);
                var key = db.ref('songs/').push().key;
          db.ref('songs/' + key).set({
            song: song,
            artist: artist,
            key: key
          });
            }
          });
      

    },
    generateSong: function(artist, track) {
      //remove 1 coin from user
      //display song
      //make sure that songs are not repeatedly generated

    },
    saveSong: function() {
      //add generated song to saved list
    },
    upvoteSong: function() {
      //add generated song to upvoted list
    },
    downvoteSong: function() {
      //add generated song to downvoted list
    }
  } //methods 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
