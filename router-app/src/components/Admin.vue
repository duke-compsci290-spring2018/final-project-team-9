<template>
	<div id="Admin">


		<h2>Hello, Admin</h2>
		<p>If you have administrator privileges, please enter your email along with your unique identifier to get authenticated.</p>
	    <input class="email" placeholder="Enter your email" v-model="email">
	    <input class="uniqueID" placeholder="Enter your unique identifier" v-model="uniqueID">
	    <button type="button" class="btn" id="login" v-on:click="authenticate(email, uniqueID)">Login</button><br>
	    <br>
    <div>
      <h2> All Inputted Song Data: <a href=https://cs290-trello-f0978.firebaseio.com/>https://cs290-trello-f0978.firebaseio.com/</a></h2>
    </div>  
    <table style="width:100%" id="table">
      <tr>
        <th id="categories">Song</th>
        <th id="categories">Artist</th>
        <!--<th id="categories">Downvote</th>-->
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
  		permission: ""
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

          var trtable = document.getElementById("table");
          var tr = document.createElement("tr");
          var thSong = document.createElement("th");
          var thArtist = document.createElement("th");

          curSong = curSong.split('<>').join(".");
          curSong = curSong.split(')(').join("#");
          curSong = curSong.split('&&').join("$");
          curSong = curSong.split('%%').join("[");
          curSong = curSong.split('@@').join("]");

          thSong.appendChild(document.createTextNode(curSong));
          thArtist.appendChild(document.createTextNode(curArtist));

          tr.appendChild(thSong);
          tr.appendChild(thArtist);
          trtable.appendChild(tr);
          
      });
    })
  }
}
</script>