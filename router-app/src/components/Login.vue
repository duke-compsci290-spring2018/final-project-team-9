<template>
      <div id="login">
        <h1>Log in to have full music access</h1>
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
      console.log("teehee");
  		window.location='https://splootserver.herokuapp.com/login'
  		//server must be running for this to work
  		//change the location to the backend server heroku 
  	}
  }
}
</script>