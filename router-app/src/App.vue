<template>
  <div id="app">
    <header id="header">
      <h1>Splootify</h1>
      <img src="http://farm1.static.flickr.com/54/179593264_648a9524de.jpg" alt="Splootify logo: A dog with its tongue out" width="150" height="200"><br>
    </header>

    <div>
        
    </div>

    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/user">User</router-link>
    <router-link to="/admin">Admin</router-link>
    <router-view/>

    <footer id="footer">
      <p>Created by: Kevin Bu and Sherry Feng | <a href="plan.html">Project Plan</a> | Picture Source: <a href="http://www.flickr.com/photos/28481088@N00">28481088@N00</a> and <a href="http://animalphotos.info/a/">Animal Photos!</a></p>
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

footer{
  margin: 10px;
  margin-top: 20px;
  padding: 10px;
  background-color: #ccffe6;
  line-height: 60%;
}
</style>
