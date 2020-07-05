
<template>
<header>

    <div>
        <nav>
        <router-link class="links" to="/"  v-b-tooltip.hover title="Home"><img src="../assets/home-run (1).png" class="icon"/></router-link>


        <router-link class="links" v-b-tooltip.hover title="Login" to="/login" v-if="!this.$session.exists()" >Login</router-link>
        <router-link class="links" v-b-tooltip.hover title="Register" to="/registration" v-if="!this.$session.exists()" >Registration</router-link>
        <router-link class="links" v-b-tooltip.hover title="My info"  v-if="this.$session.exists()" to="/myinfo"><img class="icon" src="../assets/usernew.png"/></router-link>
        <b-button    class="links"  v-b-tooltip.hover title="Log out" variant="outline-light" v-if="this.$session.exists()" v-on:click.prevent="logout"><img class="logout" src="../assets/logout.png"/></b-button>
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
      this.$http.post('http://localhost:8082/PocetniREST/rest/logout', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
        console.log(response);
        this.$emit('logOut');
        this.$session.destroy();
        this.$router.push('/');
        location.reload();
        
        }, () =>{
            this.swal("Logged Out!")
        })
    },
  },

  created(){
    if(this.$session.exists()){
    this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {
      
      this.role = response.body.role;
      
      if(this.role === "HOST"){
        this.host = true;
      } else if (response.body.role === "ADMIN"){
        this.admin = true;
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
    position: absolute; 
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
    width: 28x;
    height: 28px;
    margin-top: 3px;
    
}

.logout{
    width: 25px;
    height: 25px;
    margin-right: 27px;
}

.links{
    margin-left: 7px;
    padding: 6px;
    
}



</style>