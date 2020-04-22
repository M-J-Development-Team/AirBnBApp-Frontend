<template>

    <div >
        <b-button variant="outline-light" style="marginTop:10%;marginLeft:13%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>
        
        <b-card class="card">
            <h1>Users</h1>
         <b-input id="input-lg" style="marginTop:10px" size="sm" placeholder="Enter username" type="search" @input="filterUsers" v-model="parameter"></b-input >

        <b-list-group style="width:100%;marginTop:20px;" v-for="user in users" @input="filterUsers" v-bind:key="user.username">

            <b-list-group-item class="d-flex align-items-center">
                <b-avatar class="mr-3" v-if="user.role =='ADMIN'" variant="light" src="../assets/setting.png" ></b-avatar>
                <b-avatar class="mr-3" v-if="user.role =='HOST'" variant="light" src="../assets/home.png"></b-avatar>
                <b-avatar class="mr-3" v-if="user.role =='GUEST' && user.gender=='MALE'" variant="light" src="../assets/male.png"></b-avatar>
                <b-avatar class="mr-3" v-if="user.role =='GUEST' && user.gender=='FEMALE'" variant="light" src="../assets/female.png"></b-avatar>
                <span class="mr-auto">@ {{user.username}}</span>
                <b-badge>{{user.role}}</b-badge>
            </b-list-group-item>
    
    </b-list-group>
   
    </b-card>   
  </div>
</template>

<script>

export default {
  name: "AllUsers",
  data() {
    return {
        users: [],
        host: false,
        admin: false,
        guest: false,
        parameter: "",
        allusers:[],
        
        headers : {
          'Content-Type' : 'application/json'
        }
      }
  },

  methods : {   
      
       filterUsers : function(p){

                console.log(p);

                if(p == ""){
                    this.users = this.allusers;
                }
                
                    
                console.log(this.users.filter(user => user.username.includes(p)));
                this.users = this.users.filter(user => (user.username.indexOf(p) > -1) );
                
                
            
             
             
       },

       backToHome : function(){
            this.$router.push('/');
       }
  
  },

   beforeCreate(){
        this.$http.get('http://localhost:8082/PocetniREST/rest/allusers',{headers:this.headers}).then((response) => {
            response.body.forEach(element => {

                  this.users.push(element);
                  this.allusers.push(element)
                
            });
            });
        },

};
</script>

<style scoped>

.card{

    margin-top:10%;
    margin-left: 25%;
    width: 50%;
    height: auto;
    position: absolute;
}

</style>
