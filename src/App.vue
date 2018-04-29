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

        <!-- Temp testing for saveSong function -->
        <button type="button" class="btn" id="add" v-on:click="saveSong('Yellow', 'Coldplay')">Save song</button><br>
        <br>

        <!-- Temp testing for upvoteSong function -->
        <button type="button" class="btn" id="add" v-on:click="upvoteSong('Yellow', 'Coldplay')">Upvote song</button><br>
        <br>

        <!-- Temp testing for downvoteSong function -->
        <button type="button" class="btn" id="add" v-on:click="downvoteSong('Yellow', 'Coldplay')">Downvote song</button><br>
        <br>

        <!-- Categories for filtering: uploads, upvotes/downvotes, genre-->
        <input type="radio" name="genre" value="Pop">Pop<br>
        <input type="radio" name="genre" value="Hip-Hop/Rap">Hip-Hop/Rap<br>

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
      email: "kb@gmail.com",
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
          }
          else {
            alert("This email already exists in our system");
          }
          return true;
        });
      this.coins = 10;
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
      var thisTrack = this.song.replace(/\s/, '%20');
      console.log(thisTrack);
      var thisArtist = this.artist.replace(/\s/, '%20');

      // $.ajax({
      //   url: 'https://api.spotify.com/v1/search/q=artist:' + thisArtist + '%20name:' + thisTrack + '&type=track',
      //   success: function (response) {
      //           console.log(response);
      //           var key = db.ref('songs/').push().key;
      //     db.ref('songs/' + song).set({
      //       artist: artist,
      //       key: key
      //     });
      //       }
      //     });

      //check to make sure user has not already uploaded this song
      //if song match found in Spotify API, grab genre, length, and URL info

      var curEmail = this.email.split('.').join("<>");
      var downvotesCount = 0;
      var uploadsCount = 1;
      var upvotesCount = 0;
      //temp to avoid disallowed characters in firebase (cant include ., #, $, [, ])
      var temp = song.split('.').join("<>");
      temp = temp.split('#').join(")(");
      temp = temp.split('$').join("&&");
      temp = temp.split('[').join("%%");
      temp = temp.split(']').join("@@");
      var ref = db.ref('songs/' + temp);
      ref.once("value")
        .then(function(snapshot) {
          if(snapshot.exists()) {
            downvotesCount = snapshot.val().downvotes;
            uploadsCount = snapshot.val().uploads + 1;
            upvotesCount = snapshot.val().upvotes;
          }
          db.ref('songs/' + temp).set({
            artist: artist,
            downvotes: downvotesCount,
            genre: "null",
            length: "null",
            uploads: uploadsCount,
            upvotes: upvotesCount,
            URL: "null"
          });
          db.ref('users/' + curEmail + '/added/' + temp).set({
            artist: artist,
            downvotes: downvotesCount,
            genre: "null",
            length: "null",
            uploads: uploadsCount,
            upvotes: upvotesCount,
            URL: "null"
          });     
          return true;
        });
        this.coins += 1;  
        this.song = "";
        this.artist = "";
    },
    generateSong: function(artist, track) {
      this.coins -= 1;
      //display song
      //make sure that songs are not repeatedly generated

    },
    saveSong: function(song, artist) {
      var curEmail = this.email.split('.').join("<>");
      var curSong = song.split('.').join("<>");
      curSong = curSong.split('#').join(")(");
      curSong = curSong.split('$').join("&&");
      curSong = curSong.split('[').join("%%");
      curSong = curSong.split(']').join("@@");

      var ref = db.ref('songs/' + curSong);
      ref.once("value")
        .then(function(snapshot) {
          var curURL = snapshot.val().URL;
          var curDownvotes = snapshot.val().downvotes;
          var curGenre = snapshot.val().genre;
          var curLength = snapshot.val().length;
          var curUploads = snapshot.val().uploads;
          var curUpvotes = snapshot.val().upvotes;
          db.ref('users/' + curEmail + '/saved/' + curSong).set({
            URL: curURL,
            artist: artist,
            downvotes: curDownvotes,
            genre: curGenre,
            length: curLength,
            uploads: curUploads,
            upvotes: curUpvotes
          });
          return true;
        });
    },
    upvoteSong: function(song, artist) {
      var curEmail = this.email.split('.').join("<>");
      var curSong = song.split('.').join("<>");
      curSong = curSong.split('#').join(")(");
      curSong = curSong.split('$').join("&&");
      curSong = curSong.split('[').join("%%");
      curSong = curSong.split(']').join("@@");

      var ref = db.ref('songs/' + curSong);
      ref.once("value")
        .then(function(snapshot) {
          var curURL = snapshot.val().URL;
          var curDownvotes = snapshot.val().downvotes;
          var curGenre = snapshot.val().genre;
          var curLength = snapshot.val().length;
          var curUploads = snapshot.val().uploads;
          var curUpvotes = snapshot.val().upvotes;
          db.ref('users/' + curEmail + '/upvoted/' + curSong).set({
            URL: curURL,
            artist: artist,
            downvotes: curDownvotes,
            genre: curGenre,
            length: curLength,
            uploads: curUploads,
            upvotes: curUpvotes
          });
          return true;
        });
    },
    downvoteSong: function(song, artist) {
      var curEmail = this.email.split('.').join("<>");
      var curSong = song.split('.').join("<>");
      curSong = curSong.split('#').join(")(");
      curSong = curSong.split('$').join("&&");
      curSong = curSong.split('[').join("%%");
      curSong = curSong.split(']').join("@@");

      var ref = db.ref('songs/' + curSong);
      ref.once("value")
        .then(function(snapshot) {
          var curURL = snapshot.val().URL;
          var curDownvotes = snapshot.val().downvotes;
          var curGenre = snapshot.val().genre;
          var curLength = snapshot.val().length;
          var curUploads = snapshot.val().uploads;
          var curUpvotes = snapshot.val().upvotes;
          db.ref('users/' + curEmail + '/downvoted/' + curSong).set({
            URL: curURL,
            artist: artist,
            downvotes: curDownvotes,
            genre: curGenre,
            length: curLength,
            uploads: curUploads,
            upvotes: curUpvotes
          });
          return true;
        });
    }
  }
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
