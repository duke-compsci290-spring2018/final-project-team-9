# final-project
Name: Sherry Feng (sf197) and Kevin Bu 
Started 4/20 ended 4/30 
Total time: 50 hours 


# Notes
Our plan is located in the footer of our project. Our application is useful as a random song generator, because services like Spotify and Pandora only recommend songs that fit specific criteria-- this advantages mainstream songs and disadvantages smaller singers. We think that allowing this to be completely randomized and crowdsourced is a unique approach to song generation. 

Running the app: 
The app does NOT RUN in final project folder!! cd into the router-app folder to run it!! 
Server for OAuth login authentication is hosted on https://splootserver.herokuapp.com/login.
This was cloned from https://github.com/mpj/oauth-bridge-template, as per Duvall's response on Piazza that we could copy OAuth server code. 
The website itself is hosted on https://splootify2.herokuapp.com. Instructions to run locally are in the router-app README file. 
To log in as an admin to the site, enter in either kevin.bu@duke.edu or sherrycherry123@gmail.com as the email and 9doggo5 as the password on the user page. A link to the admin page will pop up. 

Sources:
https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489
https://samypesse.gitbooks.io/heroku-node/deployment.html
https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
https://github.com/jmperez/spotify-web-api-js

Data: 
All data is verified by the Spotify API. We perform a search of the track and artist, and if no results show up the user is prompted to enter a valid song. You cannot add an invalid song to our database. 

Frameworks: 
We chose to use Vue because that's ultimately what we're most familiar with: we didn't think it would be feasible to learn an entirely new framework in a matter of one month. We liked how easy it was to bind form data with Vue, as this was a huge component of our project. 


# Usability Testing 
Name: Michelle Shin
Time of Interaction: 4/28 
Feedback: The website looks a lot better with the Vue package, aesthetically. Some of the buttons are confusing, because they aren't accompanied with instructions so I'm not really sure what they do: for example, what am I upvoting and downvoting on the user page? Is it the songs I've added, or the songs that have been suggested to me? Also, I think that if users are supposed to log in before accessing their website, there shouldn't be a user button at the top, or else people can just navigate to the user page without logging in and use your app, which would be kind of bad for you guys. 

Name: Matt Greenwald
Time of Interaction: 4/29
Feedback: This app looks so pretty! I like the dog at the top especially :) I think the purpose of the app is generally clear, but as a person I'm not sure how useful this is to me. Is there any way to add, for example, a URL to open Spotify, or a clip of the recording, or some other way I can actually listen to the music that gets recommended to me? Also, I noticed that some of the capitalization for songs and artists is not consistent. Like some songs are all lowercase, while others are properly camel-cased. It might look more professional if all of this was consistently marked. 

Name: Aditi Pilani
Time of Interaction: 4/29
Feedback: It can be a little disorienting to see text that is a lot bigger than the buttons. For aesthetic purposes, I would balance these two out a bit more-- some of the buttons are really small and hard to read in comparison to the actual words on the page. There's also a long gray bar on the user page that doesn't look really good, but I understand if you can't hide that. The directions on the user page are a bit jumbled. The words are all really far apart horizontally but still spaced vertically, which makes it a little hard to read, especially on a bigger computer like mine. Also, I think the URL should open in a separate tab, or else I lose the songs that were recommended to me when I accidentally navigate out of the page. 
