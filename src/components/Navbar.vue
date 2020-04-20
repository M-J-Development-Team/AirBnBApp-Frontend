
<template>
<header>

    <div>
        <nav>
        <router-link class="links" to="/"  v-tooltip.hover title="Home"><img src="../assets/homeicon.png" class="icon"/></router-link>
        <router-link class="links" to="/login" v-if="!this.$session.exists()" v-tooltip.hover title="Login">Login</router-link>
        </nav>
    
    </div>

</header>
</template>


<script>
export default {

  
   
  data() {
    return {
      //
    }
  },
 

}

</script>

<style scoped>

header{
    position: fixed; 
    top: 0; 
    width: 100%; 
    background-color: rgba(235, 246, 255,0.7);
    opacity: 0.7;
    padding: 0;
    margin: 0; 
    height: 60px;
    text-align: right;
    padding: 10px;

}

.icon{
    width: 40x;
    height: 40px;
    margin-top: 3px;
    
}

.links{
    margin-left: 10px;
}



</style>