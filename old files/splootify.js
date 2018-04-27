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
		songs: database.ref('songs/'),
		users: database.ref('users/')
	},
	data: {
		added: [],
		artist: "",
		createEmail: "",
		createPassword: "",
		coins: 0,
		downvoted: [],
		email: "",
		password: "",
		permission: "",
		saved: "",
		song: "",
		upvoted: ""
	},
	methods: {
		guest: function() {
			//proceed as guest
			console.log("guest test");
		},
		authenticate: function(email, password) {
			//authenticate user if info match in credentials database
			console.log("authenticate test");
			console.log(email);
			console.log(password);
		},
		createAccount: function(email, password) {
			//add info to credentials database
			console.log("createAccount test");
			console.log(email);
			console.log(password);
			//var key = database.ref('users/').push().key;
			//var exists = database.ref('users/' + email);
			//console.log(exists);
			//if (exists === false) {
			//console.log(database.ref('users/').child(email).exists());
			//console.log(2);
			//var temp = email.replace(new RegExp(".","g"), "<>");
			//var temp = email.replace(/./g, "<>");
			var temp = email.split('.').join("<>");
			console.log(temp);
			var ref = database.ref('users/' + temp);
			ref.once("value")
				.then(function(snapshot) {
					if(!(snapshot.exists())) {
						console.log(1);
						database.ref('users/' + temp).set({
							added: ["null"],
							coins: 10,
							downvoted: ["null"],
							password: password,
							permission: "user",
							saved: ["null"],
							upvoted: ["null"]
						});
					}
				});
			this.coins = 10;
			this.email = email;
			this.password = password;
			this.permission = "user";
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
		addSong: function() {
			//check info with song database and if true, give user a coin, else display error msg
			//make sure that song uploaded is unique, or else throw error msg
			var thisTrack = this.song.replace(/\s/, '%20');
			console.log(thisTrack);
			var thisArtist = this.artist.replace(/\s/, '%20');

			$.ajax({
				url: 'https://api.spotify.com/v1/search/q=artist:' + thisArtist + '%20name:' + thisTrack + '&type=track',
				success: function (response) {
	            	console.log(response);
	            	var key = database.ref('songs/').push().key;
					database.ref('songs/' + key).set({
						song: song,
						artist: artist,
						key: key
					});
	        	}
	        });
			

		},
		generateSong: function(artist, track) {
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