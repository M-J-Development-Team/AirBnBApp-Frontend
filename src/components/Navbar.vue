
<template>
<header>

    <div>
        <nav>
        <router-link class="links" to="/"  v-tooltip.hover title="Home"><img src="../assets/homeicon.png" class="icon"/></router-link>
        <router-link class="links" to="/login" v-if="!this.$session.exists()" v-tooltip.hover title="Login">Login</router-link>
        <router-link class="links" to="/registration" v-if="!this.$session.exists()" v-tooltip.hover title="Registration">Registration</router-link>
        <button v-if="this.$session.exists()" v-on:click.prevent="logout">Log Out</button>
        </nav>
    
    </div>

</header>
</template>


<script>
export default {

  
   
  data() {
    return {
     role: "",
        host: false,
        admin: false,
        guest: false,
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    },

    methods : {
    logout : function() {
      this.$http.post('http://localhost:8080/PocetniREST/rest/logout', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
        console.log(response);
        this.$emit('logOut');
        this.$session.destroy();
        this.$router.push('/')
        
        }, () =>{
            this.swal("Logged Out!")
        })
    },
  },

  mounted(){
    if(this.$session.exists()){
    this.$http.get(`http://localhost:8080/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {
      console.log(response.body);
      this.role = response.body.role;
      if(this.role === "HOST"){
        this.host = true;
      } else if (response.body.role === "ADMIN"){
        this.admin = true;
        alert("admin");
      } else if (response.body.role === "GUEST"){
        this.guest = true;
      }
    })
      
  }
}




 

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