# final-project
Name: Sherry Feng (sf197) and Kevin Bu (kb271)
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
We also used D3 for data visualization purposes. We represented a user's upvoted song genres in a horizontal bar chart to display to them what their preferences may be.



