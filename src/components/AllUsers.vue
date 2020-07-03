<template>

    <div >
        <b-button variant="outline-light" style="marginTop:10%;marginLeft:13%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>
        
        <b-card class="card">
            <h1>Users</h1>
         <b-input id="input-lg" style="marginTop:10px;width:320px;marginTop:3%" size="sm" placeholder="Search " type="search" @input="filterUsers" v-model="parameterUsername"></b-input >
          
        <b-row style="marginTop:5%;marginBottom:5%">
          <b-avatar style="marginLeft:2%" variant="light" src="../assets/gender.png"></b-avatar>
         
          <b-form-select style="width:150px;marginLeft:1%" v-model="parameterGender" class="genderSelect" @change="onGenderChange" :options="optionsGender"></b-form-select>
          <b-avatar style="marginLeft:10%" variant="light" src="../assets/group (1).png"></b-avatar>
          <b-form-select style="width:150px;marginLeft:1%" v-model="parameterRole" class="genderSelect" @change="onRoleChange" :options="optionsRole"></b-form-select>
        </b-row>

        

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
        parameterRole: "ALL",
        parameterGender:"ALL",
        parameterUsername:"",
        allusers:[],
         optionsGender: [
        { value: "FEMALE", text: "Female" },
        { value: "MALE", text: "Male" },
        { value: "ALL", text: "All" }
      ],
       optionsRole: [
        { value: "HOST", text: "Host" },
        { value: "ADMIN", text: "Admin" },
        { value: "GUEST", text: "Guest" },
        { value: "ALL", text: "All" }
      ],
        
        headers : {
          'Content-Type' : 'application/json'
        }
      }
  },

  methods : {   

    onGenderChange: function(){
        if(this.parameterGender == "ALL"){
          if(this.parameterRole !== "ALL"){
          this.users = this.allusers.filter(u => (u.role == this.parameterRole.toUpperCase()));
          }else if(this.parameterRole == "ALL" || this.parameterRole == ""){
            this.users =  this.allusers;
          }
        }else{
          if(this.parameterRole !== "" && this.parameterRole !==  "ALL"){
        this.users = this.allusers.filter(u => (u.gender == this.parameterGender.toUpperCase() && (u.role == this.parameterRole.toUpperCase())));
          }else{
            this.users = this.allusers.filter(u=> u.gender == this.parameterGender.toUpperCase());
          }
        }

        console.log("Gender");
        
        console.log(this.users);

    },

     onRoleChange: function(){
        if(this.parameterRole == "ALL"){
          if(this.parameterGender !== "ALL"){
          this.users = this.allusers.filter(u=> u.gender == this.parameterGender.toUpperCase());
          }else if (this.parameterGender == 'ALL' || this.parameterGender == ""){
            this.users = this.allusers;
          }
        }else{
        if(this.parameterGender !==  "" && this.parameterGender != "ALL"){
          this.users = this.allusers.filter(u => (u.role == this.parameterRole.toUpperCase() && (u.gender == this.parameterGender)));
        }else{
          this.users = this.allusers.filter(u=> u.role == this.parameterRole);
        }
        }

        console.log("Role");
        
        console.log(this.users);
        

    },
      
       filterUsers : function(){

        if(this.parameterUsername == ""){
              if((this.parameterGender !== "" && this.parameterGender !== 'ALL') && this.parameterRole !== ""){
             this.users = this.allusers.filter(u => (u.role == this.parameterRole.toUpperCase() && (u.gender == this.parameterGender.toUpperCase())));
              }else if(this.parameterGender !=="" && this.parameterRole == ""){
                this.users =  this.allusers.filter(u=> u.gender == this.parameterGender);
              }else if(this.parameterGender =="" && this.parameterRole !==""){
                    this.users =  this.allusers.filter(u=> u.role == this.parameterRole);
              }else if(this.parameterGender=="ALL" && this.parameterRole==""){
                this.users = this.allusers;
              }else if(this.parameterRole=="ALL" && this.parameterGender ==""){
                this.users = this.allusers;
              }else if(this.optionsGender=="ALL" && this.optionsRole == "ALL"){
                this.users = this.allusers;
              }
        }else{
          this.users = this.users.filter(u => u.username.toUpperCase().includes(this.parameterUsername.toUpperCase()));
        }
              
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

            console.log(this.users);
            
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
