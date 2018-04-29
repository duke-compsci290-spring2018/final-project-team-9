<template>
  <div id="app">
    <div>
      <h2>Welcome to your playlist management and song recommendation buddy</h2>
      <h3>Without an account, you can only access our basic guest features</h3>
      <h3>As a user, you can filter song generation criteria as well as save, downvote, and upvote songs</h3>
      <h3>To create an account, click the "user" tab in the upper right of this screen</h3>
    </div>
    
    <div>
      <button type="button" class="btn" id="generateSong" v-on:click="generateSong">Get a song recommendation</button><br>
      <br>
    </div>

    <ol id="playlist">

    </ol>

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
          thSong.appendChild(document.createTextNode(curSong));
          thArtist.appendChild(document.createTextNode(curArtist));
          thGenre.appendChild(document.createTextNode(curGenre));
          thLength.appendChild(document.createTextNode(curLength));
          tr.appendChild(thSong);
          tr.appendChild(thArtist);
          tr.appendChild(thGenre);
          tr.appendChild(thLength);
          trtable.appendChild(tr);
          //alert("Song: " + key + "; Song metadata: " + temp);  
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
#categories {
  color: blue;
  font-size: 30px;
}
</style>
