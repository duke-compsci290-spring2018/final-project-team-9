<template>
  <div id="app">
    <header id="header">
      <h1>Splootify</h1>
      <img src="./assets/dog.jpg" alt="dog">
      <a href="http://animalphotos.info/a/2007/12/22/terrier-being-wheeled-in-an-asian-city/"><img src="http://farm1.static.flickr.com/54/179593264_648a9524de.jpg">
      </a>
      Picture Source: <a href="http://www.flickr.com/photos/28481088@N00">28481088@N00</a> 
      and <a href="http://animalphotos.info/a/">Animal Photos!</a>
    </header>

    <div>
        <h3><a href="plan.html">Project Plan</a></h3>
    </div>

    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/user">User</router-link>
    <router-view/>

    <footer id="footer">
      <h3>Created by: Kevin Bu and Sherry Feng</h3>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
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
