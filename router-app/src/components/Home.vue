<template>
  <div id="app">
    <div>
      <h2>Welcome to Splootify, your song recommendation buddy</h2>
      <div id="description">
        <p>Our web application lets you generate random songs using a crowd-sourced song database. As a guest, you will only be able to use this feature. Once you authenticate your Spotify credentials, you will be able to contribute to this database, apply filtering criteria when you generate random songs, and generate playlists through upvoting and downvoting. To log in with Spotify, click the "login" tab.</p>
      </div>
    </div>
    
    <div>
      <button type="button" class="btn" id="generateSong" v-on:click="generateSong">Generate a random song</button><br>
      <br>
    </div>

    <table style="width:100%" id="table">
      <tr>
        <th id="categories">Song</th>
        <th id="categories">Artist</th>
        <th id="categories">Genre</th>
        <th id="categories">Length</th>
      </tr>
    </table>
  </div>
</template>

<script>
import {db, songs} from './database'

export default {
  name: 'Home',

  firebase: {
    songs: songs
  },

  data () {
    return {
      artist: "",
      song: ""
    }
  },

  methods: {
    generateSong: function() {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: 600;
}
h3{
  font-weight: 200;
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

#categories {
  color: royalblue;
  font-size: 25px;
}
#description{
  line-height: 100%;
}
</style>