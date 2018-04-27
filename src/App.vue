<template>
    <div id="app">
      <header id="header">
        <h1>Splootify</h1>
      </header>
      <div>
        <h3><a href="plan.html">Project Plan</a></h3>
      </div>

      <div id="authentication">
        <a href="guest.html"><button>Proceed as guest</button></a><br>
        <!--<button type="button" class="btn" id="guest" v-on:click="guest">Proceed as guest</button><br>-->
        <br>

        <input class="email" placeholder="Enter your email" v-model="createEmail">
        <input class="password" placeholder="Create a password" v-model="createPassword">
        <button type="button" class="btn" id="createAccount" v-on:click="createAccount(createEmail, createPassword)">Create account</button><br>
        <br>

        <input class="email" placeholder="Enter your email" v-model="email">
        <input class="password" placeholder="Enter your password" v-model="password">
        <button type="button" class="btn" id="login" v-on:click="authenticate(email, password)">Login</button><br>
        <br>
 
        <!-- Temp testing for addSong function -->
        <input class="song" placeholder="Enter song name" v-model="song">
        <input class="artist" placeholder="Enter song artist" v-model="artist">
        <button type="button" class="btn" id="add" v-on:click="addSong(song, artist)">Add song</button><br>
        <br>
      </div>
      <footer id="footer">
        <h3>Created by: Kevin Bu and Sherry Feng</h3>
      </footer>
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

      var temp = email.split('.').join("<>");
      db.ref('users/' + temp + "/password").once("value").then(function(snapshot) {
        var realPassword = snapshot.val();
        if(password === realPassword) {
          console.log("Authenticated");
        }
        else {
          console.log("Not authenticated");
        }
        return true;
      });
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
      var ref = db.ref('users/' + temp);
      ref.once("value")
        .then(function(snapshot) {
          if(!(snapshot.exists())) {
            db.ref('users/' + temp).set({
              added: ["null"],
              coins: 10,
              downvoted: ["null"],
              password: password,
              permission: "user",
              saved: ["null"],
              upvoted: ["null"]
            });
            return true;
          }
          else {
            alert("This email already exists in our system");
            return true;
          }
        });
      this.coins = 10;
      //this.email = email;
      //this.password = password;
      this.permission = "user";
      this.createEmail = "";
      this.createPassword = ""; 
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
    addSong: function(song, artist) {
      //check info with song database and if true, give user a coin, else display error msg
      //make sure that song uploaded is unique, or else throw error msg
      var thisTrack = this.song.replace(/\s/, '%20');
      console.log(thisTrack);
      var thisArtist = this.artist.replace(/\s/, '%20');

      //check if song is in Spotify database and not already been added by this user
      //if yes, update local database and increase coin count by 1
      $.ajax({
        url: 'https://api.spotify.com/v1/search/q=artist:' + thisArtist + '%20name:' + thisTrack + '&type=track',
        success: function (response) {
                console.log(response);
                var key = db.ref('songs/').push().key;
          db.ref('songs/' + song).set({
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
