<template>
    <div id="app">
      <div id="authentication">
        <div id="hello"></div>

        <button v-on:click="userprint">View your profile</button>

        <div id="coinremain"></div>

        <div id="userinfo"></div>

        
        <!-- <router-link to="/admin">Admin</router-link> -->
        <p>ADMINISTRATORS ONLY</p>
        <input class="email" placeholder="Enter your email" v-model="email">
        <input class="uniqueID" placeholder="Enter your uniqueID" v-model="uniqueID">
        <button type = "button" class="btn" id="admin" v-on:click="verifyAdmin(email, uniqueID)">Authenticate admin</button>
        <div id="admin"></div>
        <div v-if="isAdmin">
          <router-link to="/admin">Admin</router-link>
        </div>

        <div>
          <p id="inst">How to add a song to our crowdsourced database:</p>
          <p id="inst">First, enter the name of the song and artist</p>
          <p id="inst">Second, click the verify button to check that your song exists. If successful, the box's text will turn green</p>
          <p id="inst">Third, click the submit button to add it to the database. You will receive two coins for your efforts</p>
        </div>
        <!-- Temp testing for verifySong and addSong function -->
        <input class="song" placeholder="Enter song name" v-model="song">
        <input class="artist" placeholder="Enter song artist" v-model="artist">
        <button type = "button" class="btn" id="add" v-on:click="verifySong(song,artist)" v-bind:class="{ isGreen: verified}">Verify song</button>
        <button type="button" class="btn" id="add" v-on:click="addSong(song, artist)">Add song</button><br>
        <div id="added"></div>
        <br>

        <div>
          <button type="button" class="btn" id="generateSong" v-on:click="generateSong">Get a song recommendation</button><br>
          <br>
        </div>

        <!-- Temp testing for viewMusic function -->
        <br>

        <table style="width:100%" id="table">
          <tr>
            <th id="categories">Song</th>
            <th id="categories">Artist</th>
            <th id="categories">Genre</th>
            <th id="categories">Length</th>
            <th id="categories">Upvote/Downvote</th>
            <th id="categories" class="urlcat">URL</th>
            <!--<th id="categories">Downvote</th>-->
          </tr>
        </table><br>
        <br>

        <div id="chart">

        </div>

      </div>
    </div>

</template>

<script>
import {db, songs, usersRef} from './database'
import queryString from 'query-string'

export default {
  name: 'User',

  firebase: {
    //songs: songs,
    //userRef: users
  },

  data() {
    return {
      added: [],
      artist: "",
      //createEmail: "",
      //createPassword: "",
      downvoted: [],
      email: "",
      //password: "",
      password: "",
      permission: "user",
      song: "",
      upvoted: "",
      verified: false,
      viewProfile: false,
      //these are temp variables for track and artist data before they're pushed to fb
      tempURL: "",
      tempPopularity: 0,
      tempLength: "",
      tempGenre: "",
      users: usersRef,
      uniqueID: "",
      dbusers: db.ref('users'),
      profilesongs: db.ref('users/' + this.curEmail + '/added/'),
      isAdmin: false

    }
  },
  computed: {
    curEmail: function(){
      return this.email.split('.').join("<>");
    }
  },

  methods: {
    verifyAdmin: function(email, uniqueID){
      if (email == "sherrycherry123@gmail.com" || email == "kevin.bu@duke.edu"){
        console.log("email passed");
        if (uniqueID == "9doggo5") {
          console.log("id passed");
          this.isAdmin = true;
        }
      }
      console.log(this.isAdmin);
    },
    userprint: function(){
      console.log(this.users);
      console.log(this.profilesongs);
      console.log(this.curEmail);
      //display coins
      db.ref('users/' + this.curEmail + '/coins/').once("value")
        .then(function(snapshot) {
          var coincount = snapshot.child("remaining").val();

          var headline = document.getElementById("coinremain");
          var greet = document.createElement("h3");
          greet.appendChild(document.createTextNode("You have " + coincount + " coins remaining!"));
          headline.appendChild(greet);

          return coincount;
        });

      //display added songs
      db.ref('users/' + this.curEmail + '/added/').once("value")
        .then(function(snapshot) {
          var allSongs = snapshot.val();
          console.log(allSongs);

          var rootbox = document.getElementById("userinfo");
          var heading = document.createElement("h2");
          heading.appendChild(document.createTextNode("Songs you've added:"));
          rootbox.appendChild(heading);

          snapshot.forEach(function(childSnapshot) {
            var toadd = document.createElement("p");
            toadd.appendChild(document.createTextNode(childSnapshot.key +" by " + childSnapshot.child("artist").val()));
            rootbox.appendChild(toadd);
          })
      });

      //display upvoted songs
      db.ref('users/' + this.curEmail + '/upvoted/').once("value")
        .then(function(snapshot) {
          var allSongs = snapshot.val();
          console.log(allSongs);

          var rootbox = document.getElementById("userinfo");
          var heading = document.createElement("h2");
          heading.appendChild(document.createTextNode("Songs you've upvoted:"));
          rootbox.appendChild(heading);

          snapshot.forEach(function(childSnapshot) {
            var toadd = document.createElement("p");
            toadd.appendChild(document.createTextNode(childSnapshot.key +" by " + childSnapshot.child("artist").val()));
            rootbox.appendChild(toadd);
          })
      });

    },
    showProfile: function() {
      console.log("yoyo!");
      var curEmail = this.email.split('.').join("<>");
      console.log(this.user.child(curEmail));
      return this.user.child(curEmail).child("added");

      //maybe just do this in HTML
    },
    addSong: function(song, artist) {
      if (this.verified === false) {
        alert("Please verify this song first");
        return;
      }
      else {
        this.artist = artist;
        this.song = song;
        var addbox = document.getElementById("added");
        var successadd = document.createElement("p");
        successadd.appendChild(document.createTextNode("You successfully added " + this.song + " by " + this.artist));
        addbox.appendChild(successadd);

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

        //db.ref('songs/' + temp + '/temp')
        var genre = this.tempGenre;
        var length = this.tempLength;
        var URL = this.tempURL;
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
              genre: genre,
              length: length,
              uploads: uploadsCount,
              upvotes: upvotesCount,
              URL: URL
            });
            db.ref('users/' + curEmail + '/added/' + temp).set({
              artist: artist,
              downvotes: downvotesCount,
              genre: genre,
              length: length,
              uploads: uploadsCount,
              upvotes: upvotesCount,
              URL: URL
            });
            return true;
          });

          this.song = "";
          this.artist = "";
          this.verified = false;
          this.tempGenre = "";
          this.tempLength = "";
          this.tempURL = "";
        
        var tempEmail = this.curEmail;
        db.ref('users/' + tempEmail + '/coins/').once("value")
        .then(function(snapshot) {
            var coincount = snapshot.child("remaining").val()+2;
            alert(coincount);
            var postData = {
              remaining: coincount
            };
            var updates = {};
            updates['/users/' + tempEmail + '/coins'] = postData;
            db.ref().update(updates);

            var newcc = "<h3>You have " + coincount + " coins remaining!";
            document.getElementById("coinremain").innerHTML = newcc;
          })
        }
    },
    verifySong: function(songin, artistin) {
      //replacing strings for API formatting 
      var thisSong = songin.replace(/\s/, '%20');
      thisSong = thisSong.replace(/\(/, '%28');
      thisSong = thisSong.replace(/\)/, '%29');
      thisSong = thisSong.replace(/'/, '%27');
      var thisArtist = artistin.replace(/\s/, '%20');
      thisArtist = thisArtist.replace(/'/, '%27');

      console.log(thisSong + " " + thisArtist);

      let accessToken = window.location.hash.substring(20);
        console.log(accessToken);
      fetch('https://api.spotify.com/v1/search?q=artist:' + thisArtist + '%20track:' + thisSong + '&type=track', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response=>response.json())
      .then(data=>this.setTrack(data));

      //fetch artist info for genre 
      fetch('https://api.spotify.com/v1/search?q=artist:' + thisArtist + '&type=artist', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response=>response.json())
      .then(data=>this.setGenre(data));
    },
    setEmail: function(email){
      this.email = email;
      if (email=="") {
        alert("Please Authenticate");
      }
      console.log(this.email);
      var headline = document.getElementById("hello");
      var greet = document.createElement("h2");
      greet.appendChild(document.createTextNode("Hello, " + this.email + "!"));
      headline.appendChild(greet);

    },
    setTrack: function(data){
      //sets the track data from spotify api
      console.log(data);
      if (data.tracks.items[0] == undefined){
        alert("Invalid song, please try again");
        return;
      }
      //obtaining URL, popularity, and legnth data 
      this.tempURL = data.tracks.items[0].external_urls.spotify;
      console.log(this.tempURL);
      this.tempPopularity = data.tracks.items[0].popularity;
      var previewURL = data.tracks.items[0].preview_url;
      this.tempLength = data.tracks.items[0].duration_ms / 1000; 

      console.log(this.tempPopularity + " " + this.tempLength);


      if (this.tempURL=="") {
        alert("Invalid song, please try again");
        return;
      }
      console.log("verified in settrack");
      this.verified = true;
    },
    setGenre: function(data){
      //sets genre from spotify artist api
      console.log(data);
      if (data.artists.items[0] == undefined){
        alert("Invalid song, please try again");
        return;
      }
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
        //update database to decrement coin

        var temp = this.email.split('.').join("<>");
        var ref = db.ref('users/' + temp);
        ref.once("value")
          .then(function(snapshot) {
            var curCoins = snapshot.val().coins.remaining;
            console.log(curCoins);
            var postData = {
              remaining: curCoins-1
            };
            var updates = {};
            updates['/users/' + temp + '/coins'] = postData;
            db.ref().update(updates);

            var newcc = "<h3>You have " + curCoins-1 + " coins remaining!";
            document.getElementById("coinremain").innerHTML = newcc
            console.log("success");
            return;
          });

        var ref = db.ref('songs');
        ref.once("value")
          .then(function(snapshot) {
            var songs = snapshot.val();
            var numSongs = Object.keys(songs).length;
            var random = Math.floor(Math.random() * numSongs);
            var curSong = Object.keys(songs)[random];
            var metadata = songs[curSong];

            var curArtist = metadata["artist"];
            var curDownvotes = metadata["downvotes"];
            var curGenre = metadata["genre"];
            var curLength = metadata["length"];
            //calculating time in minutes and seconds from ms 
            var minutes = Math.floor(curLength/60);
            var seconds = Math.floor(curLength - 60*minutes);
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            curLength = minutes + ":" + seconds;
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
            var thURL = document.createElement("th");

            curSong = curSong.split('<>').join(".");
            curSong = curSong.split(')(').join("#");
            curSong = curSong.split('&&').join("$");
            curSong = curSong.split('%%').join("[");
            curSong = curSong.split('@@').join("]");

            thSong.appendChild(document.createTextNode(curSong));
            thArtist.appendChild(document.createTextNode(curArtist));
            thGenre.appendChild(document.createTextNode(curGenre));
            thLength.appendChild(document.createTextNode(curLength));

            var aURL = document.createElement("a");
            aURL.appendChild(document.createTextNode("Preview"));
            aURL.href = curURL;
            thURL.appendChild(aURL);

            var thUpvote = document.createElement("button");
            //thUpvote.data = "Upvote";
            thUpvote.innerHTML = "Upvote";
            thUpvote.onclick = function() {
              db.ref('users/' + temp + '/upvoted/' + curSong).set({
                artist: curArtist,
                genre: curGenre,
                length: curLength
              });
              thUpvote.style.backgroundColor = "green";
            };
            var thDownvote = document.createElement("button");
            //thDownvote.data = "Downvote";
            thDownvote.innerHTML = "Downvote";
            thDownvote.onclick = function() {
              db.ref('users/' + temp + '/downvoted/' + curSong).set({
                artist: curArtist,
                genre: curGenre,
                length: curLength
              });
              thDownvote.style.backgroundColor = "red";
            };

            tr.appendChild(thSong);
            tr.appendChild(thArtist);
            tr.appendChild(thGenre);
            tr.appendChild(thLength);
            tr.appendChild(thUpvote);
            tr.appendChild(thDownvote);
            tr.appendChild(thURL);
            trtable.appendChild(tr);
        });
      }
      //this.displayGenres();
      var temp = this.email.split('.').join("<>");
      var ref = db.ref('users/' + temp + '/upvoted');
      ref.once("value")
        .then(function(snapshot) {
          var upvoted = snapshot.val();
          var genresDict = {};
          Object.keys(upvoted).forEach(function(key) {
            console.log(key, upvoted[key]);
            if (upvoted[key]["genre"] in genresDict) {
              genresDict[upvoted[key]["genre"]] += 1;
            }
            else {
              genresDict[upvoted[key]["genre"]] = 1;
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
          d3.select("svg").remove();
          var graph = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", barHeight*values.length);
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
          //return true;
      });
    }
  },
  mounted: function(){
    let accessToken = window.location.hash.substring(20);
    console.log(accessToken);
    //fetch user info and email 
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response=>response.json())
    .then(data=>this.setEmail(data.email));



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
  margin-top: 30px;
}

#verify{
  background-color: #ccffdd;
  margin: 2px;
  padding: 2px;
}

.isGreen{
  color: green;
}

p{
  padding-left: 30px;
  padding-right: 30px;
}

h1, h2 {
  font-weight: 600;
}

h2{
  font-size: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

ol {
  list-style-type: lower-roman;
}

a {
  color: #42b983;
}

#categories {
  color: royalblue;
  font-size: 25px;
}


#userinfo{
  border-style: solid;
  border-width: 2px;
  border-color: lightgray;
}
#inst {
  display: block;
}
</style>

