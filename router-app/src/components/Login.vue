<template>
      <div id="login">
        <div>
          <h2>Welcome to Splootify, your song recommendation buddy</h2>
        </div>
        <p>Please log into Spotify for full access to Splootify features.</p>
        <button id="login-button" class="btn btn-primary" v-on:click="signIn">Log into Spotify</button>
      </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
  	return {
  		email: ""
  	}
  },
  methods: {
    signIn: function() {
  		window.location='https://splootserver.herokuapp.com/login'
  		//server must be running for this to work
  		//change the location to the backend server heroku 
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