<template>
  <div>
    <nav-bar :key="navBarKey" @logOut="forceRerender"></nav-bar>

    <router-view :key="updateKey" @changedView="forceRenderChange"></router-view>

  </div>

</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
     'nav-bar' : Navbar

  },

  data() {
    return {
      navBarKey: 0,
      updateKey: 1000
    }
  },
  methods : {
        forceRerender(){
      this.navBarKey += 1;
    },
    forceRenderChange(){
      this.updateKey += 1;
    }
  }
}

</script>

<style scoped>
#app {
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}





</style>
