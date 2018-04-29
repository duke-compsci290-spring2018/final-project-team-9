<template>
    <div id="app">
      <div id="authentication">
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
        <button type="button" class="btn" id="add" v-on:click="saveSong('Weekend', 'Louis the Child')">Save song</button><br>
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

        <div>
          <button type="button" class="btn" id="generateSong" v-on:click="generateSong">Get a song recommendation</button><br>
          <br>
        </div>

        <!-- Temp testing for viewMusic function -->
        <button type="button" class="btn" id="viewMusic" v-on:click="viewMusic">View music genres in a chart</button><br>
        <br>

        <table style="width:100%" id="table">
          <tr>
            <th id="categories">Song</th>
            <th id="categories">Artist</th>
            <th id="categories">Genre</th>
            <th id="categories">Length</th>
          </tr>
        </table>

      </div>
    </div>

</template>

<script>
import {db, songs, users} from './database'
import queryString from 'query-string'

export default {
  name: 'User',

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
      upvoted: "",
      //these are temp variables for track and artist data before they're pushed to fb
      tempURL: "",
      tempPopularity: 0,
      tempLength: "",
      tempGenre: ""
    }
  },
  
  methods: {
    authenticate: function(email, password) {
      //authenticate user if info match in credentials database
      console.log("authenticate test");
      console.log(email);
      console.log(password);

      var temp = email.split('.').join("<>");
      db.ref('users/' + temp + "/password").once("value").then(function(snapshot) {
        var realPassword = snapshot.val();
        if (password === realPassword) {
          this.permission = "user";
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
      //currently use this method to display chart of saved genres
    },
    addSong: function(song, artist) {
      var thisSong = this.song.replace(/\s/, '%20');
      var thisArtist = this.artist.replace(/\s/, '%20');

      this.artist = artist;

      //getting access token for api call 
      let accessToken = window.location.hash.substring(20);
      console.log(accessToken);

      //TODO: fix bugs with non normal input 
      
      //fetch track info
      fetch('https://api.spotify.com/v1/search?q=artist:' + thisArtist + '%20track:' + thisSong + '&type=track', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response=>response.json())
      .then(data=>this.setTrack(data));

      //fetch user info and email 
      fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response=>response.json())
      .then(data=>this.setEmail(data.email));

      //fetch artist info for genre 
      fetch('https://api.spotify.com/v1/search?q=artist:' + thisArtist + '&type=artist', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response=>response.json())
      .then(data=>this.setGenre(data));
    

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
    setEmail: function(email){
      this.email = email; 
    },
    setTrack: function(data){
      //sets the track data from spotify api
      this.tempURL = data.tracks.items[0].external_urls.spotify;
      console.log(this.tempURL);
      this.tempPopularity = data.tracks.items[0].popularity;
      var previewURL = data.tracks.items[0].preview_url;
      this.tempLength = data.tracks.items[0].duration_ms / 100; 

      console.log(this.tempPopularity + " " + this.tempLength);
    },
    setGenre: function(data){
      //sets genre from spotify artist api
      this.tempGenre = data.artists.items[0].genres[0];
      console.log(this.tempGenre);
    },
    generateSong: function(artist, track) {
      //make sure that songs are not repeatedly generated
      console.log(this.permission);
      if (this.permission != "user") {
        alert("You have not successfully logged in. Please do so first.")
        return;
      }
      else {
        this.coins -= 1;
        var ref = db.ref('songs');
        ref.once("value")
          .then(function(snapshot) {
            var songs = snapshot.val();
            var numSongs = Object.keys(songs).length;
            var random = Math.floor(Math.random() * numSongs);
            var curSong = Object.keys(songs)[random];
            var metadata = songs[curSong];

            console.log(curSong);
            console.log(metadata);

            var curArtist = metadata["artist"];
            var curDownvotes = metadata["downvotes"];
            var curGenre = metadata["genre"];
            var curLength = metadata["length"];
            var curUploads = metadata["uploads"];
            var curUpvotes = metadata["upvotes"];
            var curURL = metadata["URL"];

            var display = "Song: " + curSong + "; Artist: " + curArtist + "; Genre: " + curGenre + "; Length: " + curLength;
            var trtable = document.getElementById("table");
            var tr = document.createElement("tr");
            var thSong = document.createElement("th");
            var thArtist = document.createElement("th");
            var thGenre = document.createElement("th");
            var thLength = document.createElement("th");

            curSong = curSong.split('<>').join(".");
            curSong = curSong.split(')(').join("#");
            curSong = curSong.split('&&').join("$");
            curSong = curSong.split('%%').join("[");
            curSong = curSong.split('@@').join("]");

            thSong.appendChild(document.createTextNode(curSong));
            thArtist.appendChild(document.createTextNode(curArtist));
            thGenre.appendChild(document.createTextNode(curGenre));
            thLength.appendChild(document.createTextNode(curLength));
            tr.appendChild(thSong);
            tr.appendChild(thArtist);
            tr.appendChild(thGenre);
            tr.appendChild(thLength);
            trtable.appendChild(tr);
        });
      }
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
var temp = this.email.split('.').join("<>");
      var ref = db.ref('users/' + temp + '/saved');
      ref.once("value")
        .then(function(snapshot) {
          var saved = snapshot.val();
          var genresDict = {};
          Object.keys(saved).forEach(function(key) {
            console.log(key, saved[key]);
            if (saved[key]["genre"] in genresDict) {
              genresDict[saved[key]["genre"]] += 1;
            }
            else {
              genresDict[saved[key]["genre"]] = 1;
            }
          });

        console.log(genresDict);
        var values = Object.values(genresDict);//song counts
        var keys = Object.keys(genresDict);//genres
        console.log(values);
        console.log(keys);
        var counts = {};
        var width = 400;
        var scaleFactor = 25;
        var barHeight = 40;
        var graph = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", barHeight*values);
          //values.length
        var bar = graph.selectAll("g")
          .data(values)
          .enter()
          .append("g")
          .attr("transform", function(d, i) {
            return "translate(0," + i*barHeight + ")";
          });
        bar.append("rect")
          .attr("width", function(d) {
            return d*scaleFactor;
          })
          .attr("height", barHeight-1);
        bar.append("text")
          .attr("x", function(d) { return (d*scaleFactor); })
          .attr("y", barHeight/2)
          .attr("dy", ".35em")
          .text(function(d, i) { return keys[i] + ": " + d; })
        // }
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

