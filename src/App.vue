var config = {
	apiKey: "AIzaSyBdLoyJdNa1hug8fmJVq08YQjfOjdsoyC0",
	authDomain: "cs290-trello-f0978.firebaseapp.com",
	databaseURL: "https://cs290-trello-f0978.firebaseio.com",
	storageBucket: "cs290-trello-f0978.appspot.com"
};
var database = firebase.initializeApp(config).database();

var app = new Vue({
	el: '#app',
	firebase: {
		//lists: database.ref('lists/')
	},
	data: {
		authenticationStatus: "",
		email: "",
		password: "",
		song: "",
		artist: ""
	},
	methods: {
		guest: function() {
			//proceed as guest
		}
		authenticate: function(email, password) {
			//authenticate user if info match in credentials database
		},
		createAccount: function(email, password) {
			//add info to credentials database
		},
		viewProfile: function() {
			//maybe just do this in HTML
		},
		changePassword: function(prevPassword, newPassword) {
			//if prevPassword matches that in the credentials database, change prevPassword to newPassword
		},
		resetPassword: function() {
			//this seems tedious and we can probably cut it out
		},
		viewMusic: function() {
			//views input in checkboxes and displays respective lists
		},
		addSong: function(song, artist) {
			//check info with song database and if true, give user a coin, else display error msg
			//make sure that song uploaded is unique, or else throw error msg
		},
		generateSong: function() {
			//remove 1 coin from user
			//display song
			//make sure that songs are not repeatedly generated
		},
		saveSong: function() {
			//add generated song to saved list
		},
		upvoteSong: function() {
			//add generated song to upvoted list
		},
		downvoteSong: function() {
			//add generated song to downvoted list
		}
	}
})




