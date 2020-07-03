<template>

    <div class="background">
      
                <div class="overflow-hidden"  align="center"  style="max-width: 370px;">
                    <b-button class="dugme" v-on:click.prevent="cancelInfo" variant="outline-light"><b-img class="icon" src="../assets/close (2).png"/></b-button> 
                  
                    
                        
                                <form @submit.prevent="submitInfo" class="forma">
                                    <b-row >
                                        
                                        <b-form-input id="input-lg" size="sm" placeholder="Username" v-model="user.username"></b-form-input >                                 
                                    </b-row>
                                   
                                   <b-row >
                                        
                                        <b-form-input id="input-lg" size="sm" placeholder="Password" type="password" v-model="user.password"></b-form-input >                                 
                                    </b-row>


                                    <b-row >
                                         <b-button id="submit-button" variant="outline-success"  type="submit" size="sm">Login</b-button>  
                                                   
                                    </b-row>

                                   <a href="/registration">Sign Up</a>
       
                                                                     
                                </form>
                        
                   
                         
                         <div class="space"></div>
                </div>
    </div>
          
  
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },

  methods : {
    submitInfo : function(){
        
        if(this.user.username == "" || this.user.password == ""){
            this.$swal("You didn't enter username or password. Please try again");
            return;
        }


      this.$http.post('http://localhost:8082/PocetniREST/rest/login', this.user, {headers:this.headers}).then((response) =>{
        if(response.ok){
         
          this.$session.start(); 
          this.$session.set('idOne', response.bodyText);
          this.$http.headers.common['Authorization'] = 'Bearer ' + response.bodyText;
          this.$router.push('/');
          location.reload();
          this.$emit('loggedIn');

        }
      }, (response) => {
        if(response.status == 400){
          this.$swal('Error. Please try again.');
        }
      });
    },

    
    cancelInfo : function() {
      this.$router.push('/');
    },
    
  },
  beforeCreate(){
    if(this.$session.exists()){
      this.$router.push('/');
    }
  }

};
</script>

<style scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: url(../assets/map.jpg);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top:60px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  
}

.space{
    height: 30px;
}

.label{
    text-align: right;
}

#link{
  
    text-align: left;
    padding:50px;
        
}

.dugme{
    margin-left:88%;
    margin-top:2%;
}

#submit-button{
    text-align: center;
}

#input-lg{
    
    width: 250px;
    
}

.row{
    margin-top:7%;
    
}


.forma{
    margin-left: 20%;
    margin-top:10%;
}

#submit-button{
    margin-left:22%;
    margin-bottom: 6%;
    width: 100px;
}

.overflow-hidden{
    margin-left: 39%;
    margin-top: 14%;
    background-color:rgba(245, 245, 245, 0.5);
    text-align: left;
}

.user-icon{
    height: 200px;
    width: 200px;
    margin-top: 5%;
    margin-left:25%;
   
}

h1 {
  margin-left: 50%;
}

.icon{
    height: 15px;
    width: 15px;
}
</style>
