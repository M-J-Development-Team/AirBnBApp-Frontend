
<template>
<header>

    <div>
        <nav>
        <router-link class="links" to="/"   title="Home"><img src="../assets/homeicon.png" class="icon"/></router-link>
        <router-link class="links" to="/login" v-if="!this.$session.exists()"  title="Login">Login</router-link>
        <router-link class="links" to="/registration" v-if="!this.$session.exists()" title="Registration">Registration</router-link>
        <router-link class="links"  title="My info" v-if="this.$session.exists()" to="/myinfo"><img class="icon" src="../assets/myprofile.png"/></router-link>
        <b-button class="links"  title="Log out" variant="outline-light" v-if="this.$session.exists()" v-on:click.prevent="logout"><img class="logout" src="../assets/logout.png"/></b-button>
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
      this.$http.post('http://localhost:8082/PocetniREST/rest/logout', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
        console.log(response);
        this.$emit('logOut');
        this.$session.destroy();
        this.$router.push('/')
        
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

.logout{
    width: 25px;
    height: 25px;
}

.links{
    margin-left: 7px;
}



</style>