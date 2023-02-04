<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/config">config</router-link>
  </nav> -->
  <router-view/>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
.bg-custom {
  background-color: #292c32;
}
</style>
