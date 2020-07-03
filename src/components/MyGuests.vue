<template>
  <div style="marginTop:10%;width:60%;marginLeft:20%">
         <b-button variant="outline-light" style="marginTop:0%;marginLeft:-10%" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>
    <b-card class="card">
      <h1>My guests</h1>

      <b-input id="input-lg" style="marginTop:10px;width:500px;marginTop:3%" size="sm" placeholder="Search " type="search" @input="filterUsers" v-model="parameterUsername"></b-input >         
        <b-row style="marginTop:5%;marginBottom:5%">
          <b-avatar style="marginLeft:2%" variant="light" src="../assets/gender.png"></b-avatar>       
          <b-form-select style="width:150px;marginLeft:1%" v-model="parameterGender" class="genderSelect" @change="onGenderChange" :options="optionsGender"></b-form-select>
          <b-avatar style="marginLeft:10%" variant="light" src="../assets/group (1).png"></b-avatar>
          <b-form-select disabled="true" style="width:150px;marginLeft:1%" v-model="parameterRole" class="genderSelect" @change="onRoleChange" :options="optionsRole"></b-form-select>
        </b-row>


      <b-list-group
        style="width:100%;marginTop:20px;"
        v-for="guest in guests"
        @input="filterUsers"
        v-bind:key="guest.username"
      >
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar
            class="mr-3"
            v-if="guests.gender=='MALE'"
            variant="light"
            src="../assets/bosozoku (1).svg"
          ></b-avatar>
          <b-avatar
            class="mr-3"
            v-if="guest.gender=='FEMALE'"
            variant="light"
            src="../assets/woman.svg"
          ></b-avatar>
          <span class="mr-auto">@ {{guest.username}}</span>
          <b-badge>{{user.role}}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "MyGuests",
  data() {
    return {
      guests: [],
      user: {},
      parameterRole: "GUEST",
      parameterGender:"ALL",
      parameterUsername:"",
      allGuests:[],
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

      headers: {
        "Content-Type": "application/json"
      }
    };
  },

  created() {
    if (this.$session.exists()) {
      this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get("idOne")}`,{ headers: this.headers }).then(response => {
          if (response.status == 400) {
            this.$swal("Error");
          }if(response.body.role !== 'HOST'){
              this.$router.push("/");
          } 
          else {
              this.$http.get(`http://localhost:8082/PocetniREST/rest/reservations/all-my-guests/${this.$session.get("idOne")}`,{ headers: this.headers } ).then(resp => {
                this.guests = resp.body;
                this.allGuests = resp.body;
                });           
          }
        });
    }
  },

  methods: {

       backToHome : function(){
            this.$router.push('/');
       },

       onGenderChange: function(){
        if(this.parameterGender == "ALL"){
          if(this.parameterRole !== "ALL"){
          this.guests = this.allGuests.filter(u => (u.role == this.parameterRole.toUpperCase()));
          }else if(this.parameterRole == "ALL" || this.parameterRole == ""){
            this.guest =  this.allGuests;
          }
        }else{
          if(this.parameterRole !== "" && this.parameterRole !==  "ALL"){
        this.guests = this.allGuests.filter(u => (u.gender == this.parameterGender.toUpperCase() && (u.role == this.parameterRole.toUpperCase())));
          }else{
            this.guests = this.allGuests.filter(u=> u.gender == this.parameterGender.toUpperCase());
          }
        }
    },

     onRoleChange: function(){
        if(this.parameterRole == "ALL"){
          if(this.parameterGender !== "ALL"){
          this.guest = this.allGuests.filter(u=> u.gender == this.parameterGender.toUpperCase());
          }else if (this.parameterGender == 'ALL' || this.parameterGender == ""){
            this.guests = this.allGuests;
          }
        }else{
        if(this.parameterGender !==  "" && this.parameterGender != "ALL"){
          this.guests = this.allGuests.filter(u => (u.role == this.parameterRole.toUpperCase() && (u.gender == this.parameterGender)));
        }else{
          this.guests = this.allGuests.filter(u=> u.role == this.parameterRole);
        }
        }
    },
      
       filterUsers : function(){

        if(this.parameterUsername == ""){
              if((this.parameterGender !== "" && this.parameterGender !== 'ALL') && this.parameterRole !== ""){
                this.guests = this.allGuests.filter(u => (u.role == this.parameterRole.toUpperCase() && (u.gender == this.parameterGender.toUpperCase())));        
              }else if(this.parameterGender !=="" && this.parameterRole == ""){
                this.guests =  this.allGuests.filter(u=> u.gender == this.parameterGender);
              }else if(this.parameterGender =="" && this.parameterRole !==""){
                    this.guests =  this.allGuests.filter(u=> u.role == this.parameterRole);
              }else if(this.parameterGender="ALL" && this.parameterRole==""){
                this.guests = this.allGuests;
              }else if(this.parameterRole="ALL" && THIS.parameterGender ==""){
                this.guest = this.allGuests;
              }else if(this.optionsGender=="ALL" && this.optionsRole == "ALL"){
                this.guests = this.allGuests;
              }else if(this.parameterGender == "ALL" && this.optionsRole != "" ){
                  this.guests =  this.allGuests.filter(u=> u.role == this.parameterRole);
              }
        }else{
          this.guests = this.guests.filter(u => u.username.toUpperCase().includes(this.parameterUsername.toUpperCase()));
        }
              
       },
  }
};
</script>

<style scoped>
</style>
