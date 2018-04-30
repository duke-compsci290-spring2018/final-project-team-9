<template>
	<div id="Admin">


		<h2>Hello, Admin</h2>
		<p>The cumulative crowd-sourced song database is below.</p>
		<p>To delete a song, enter the song and artist information below.</p>
	    <input class="song" placeholder="Enter name of song" v-model="song">
	    <input class="artist" placeholder="Enter name of artist" v-model="artist">
	    <button type="button" class="btn" id="deleteSong" v-on:click="deleteSong(song, artist)">Delete song</button><br>
	    <br>
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
  }
}
</script>