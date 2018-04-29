<template>
  <div id="app">
    <header id="header">
      <h1>Splootify</h1>
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
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
