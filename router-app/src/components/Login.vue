<template>
      <div id="login">
        <h1>This is an example of the Implicit Grant flow</h1>
        <button id="login-button" class="btn btn-primary" v-on:click="signIn">Log in with Spotify</button>
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
  		console.log("signing...");
  		window.location='http://localhost:8888/'
  		//server must be running for this to work
  		//change the location to the backend server heroku 
  	}
  }
}
</script>