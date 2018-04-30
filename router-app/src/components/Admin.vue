<template>
	<div id="Admin">


		<h2>Hello, Admin</h2>
		<p>The cumulative crowd-sourced song database is below.</p>
		<p>To delete a song, enter the song and artist information below.</p>
	    <input class="song" placeholder="Enter name of song" v-model="song">
	    <input class="artist" placeholder="Enter name of artist" v-model="artist">
	    <button type="button" class="btn" id="deleteSong" v-on:click="deleteSong(song, artist)">Delete song</button><br>
	    <br>
    <div>
      <h2> All Inputted Song Data: <a href=https://cs290-trello-f0978.firebaseio.com/>https://cs290-trello-f0978.firebaseio.com/</a></h2>
    </div>  
    <table style="width:100%" id="table">
      <tr>
        <th id="categories">Song</th>
        <th id="categories">Artist</th>
        <th id="categories">Genre</th>
        <th id="categories">Length</th>
        <th id="categories">URL</th>
      </tr>
    </table><br>
	</div>
</template>

<script>
import {db, songs, users} from './database'

export default {
  name: 'Admin',

  firebase: {
  	songs: songs,

  },

  data () {
  	return {
  		email: "",
  		uniqueID: "",
  		permission: "",
  		song: "",
  		artist: ""
  	}
  },
  methods: {
  	authenticate: function(email, uniqueID) {
      //authenticate user if info match in credentials database
      console.log("authenticate test");
      console.log(email);
      console.log(uniqueID);
      
      //give yourself more coins with this code
      // var temp = email.split('.').join("<>");
      // db.ref('users/' + temp).set({
      // 	added: "null",
      // 	coins: { "remaining": 10 },
      // 	downvoted: "null",
      // 	permission: "admin",
      // 	uniqueID: "9doggo5",
      // 	upvoted: "null"
      // });

      db.ref('songs/' + temp).set({
              artist: artist,
              downvotes: downvotesCount,
              genre: genre,
              length: length,
              uploads: uploadsCount,
              upvotes: upvotesCount,
              URL: URL
            });
      
      db.ref('users/' + temp + "/uniqueID").once("value").then(function(snapshot) {
        var realUniqueID = snapshot.val();
        if (uniqueID === realUniqueID) {
          console.log("Authenticated");
        }
        else {
          console.log("Not authenticated");
        }
        return true;
      });
      this.permission = "admin";
    },
    deleteSong: function (song, artist) {
      var temp = song.split('.').join("<>");
      temp = temp.split('#').join(")(");
      temp = temp.split('$').join("&&");
      temp = temp.split('[').join("%%");
      temp = temp.split(']').join("@@");

      var tempArtist = artist.split('.').join("<>");
      tempArtist = tempArtist.split('#').join(")(");
      tempArtist = tempArtist.split('$').join("&&");
      tempArtist = tempArtist.split('[').join("%%");
      tempArtist = tempArtist.split(']').join("@@");

      console.log(temp);
      console.log(tempArtist);
      var ref = db.ref('songs/' + temp);
      ref.once("value")
      .then(function(snapshot) {
        if(snapshot.exists()) {
          ref.remove();
        }
        else {
          alert("Song does not exist");
        }
        return true;
      });
      this.song = "";
      this.artist = "";
    }
  },
  mounted: function(){
    var query = db.ref('songs').orderByKey();
    query.once("value")
      .then(function(snapshot) {
        console.log(snapshot);
        snapshot.forEach(function(childSnapshot) {
			var curSong = childSnapshot.key;
			var curArtist = childSnapshot.child("artist").val();
			var curGenre = childSnapshot.child("genre").val();
			var curLength = childSnapshot.child("length").val();
          	var minutes = Math.floor(curLength/60);
        	var seconds = Math.floor(curLength - 60*minutes);
        	if (seconds < 10) {
          		seconds = "0" + seconds;
        	}
        	curLength = minutes + ":" + seconds;
          	var curURL = childSnapshot.child("URL").val();

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

			tr.appendChild(thSong);
			tr.appendChild(thArtist);
			tr.appendChild(thGenre);
			tr.appendChild(thLength);
			tr.appendChild(thURL);
			trtable.appendChild(tr);   
      });
    })
  }
}
</script>