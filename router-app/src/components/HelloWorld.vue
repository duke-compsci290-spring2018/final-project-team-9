<template>
  <div id="app">
    <header id="header">
      <h1>Splootify</h1>
    </header>

    <div>
        <h3><a href="plan.html">Project Plan</a></h3>
    </div>

    <div>
      <h2>Welcome to your playlist management and song recommendation buddy</h2>
      <h3>Without an account, you can only access our basic guest features below</h3> 
      <h3>When you decide that you want to create an account, click the "users" tab in the upper right of this screen</h3>
    </div>
    
    <div>
      <button type="button" class="btn" id="generateSong" v-on:click="generateSong">Get a song recommendation</button><br>
      <br>
    </div>

    <footer id="footer">
      <h3>Created by: Kevin Bu and Sherry Feng</h3>
    </footer>

  </div>
</template>

<script>
import {db, songs} from './database'

export default {
  name: 'HelloWorld',

  firebase: {
    songs: songs
  },

  data () {
    return {
      artist: "",
      song: "",
      songCount: 4
    }
  },

  methods: {
    generateSong: function() {
      const random = Math.floor(Math.random() * this.songCount);
      var ref = db.ref("songs");
      ref.limitToFirst(random).limitToLast(1).once("value").then(snapshot=>{
        var temp = snapshot.val();
        console.log(temp);
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
</style>
