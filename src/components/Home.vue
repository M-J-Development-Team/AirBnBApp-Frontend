 
<template>
  <div>
  <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#ccc"
      style="text-shadow: 1px 1px 2px #000;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      v-if="!this.$session.exists()"
      
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Venice, Italy"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/italy.jpg"
      ></b-carousel-slide>

        <b-carousel-slide
        caption="Stockholm, Sweden"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/stockholm.jpg"
      ></b-carousel-slide>

        <b-carousel-slide
        caption="Maldives"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/chairs.jpeg"
      ></b-carousel-slide>


    <b-carousel-slide
        caption="Barcelona, Spain"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/guell.jpg"
      ></b-carousel-slide>

  </b-carousel>

      

      <b-card class="card" v-if="this.$session.exists()">
        <div class="smallcard" v-if="admin">
      <b-img src="../assets/sea-waves.png" class="icon"/>
        </div>
      <b-button class="button" title="Users" variant="outline-primary"  v-on:click.prevent="goToUsersPage" v-if=" admin">All users</b-button>
      <b-button class="button" title="Apartments" variant="outline-primary" v-if=" admin" >All apartments</b-button>
      <b-button class="button" title="Amenities" variant="outline-primary" v-if="admin" >All amenities</b-button>
      <b-button class="button" title="Reservations" variant="outline-primary" v-if="admin" >All reservations</b-button>

      <b-button class="button" title="Apartments" variant="outline-success" v-if="host" >My apartments</b-button>

      </b-card>


      <b-card class="welcomecard" v-if="this.$session.exists()">
        <h1>@{{this.username}}</h1>
      
      </b-card>

      <b-card class="addingcard" v-if="this.$session.exists()">

              <b-avatar style="padding:10px;height:100px;width:100px" variant="light" src="../assets/host.png" v-if="admin"></b-avatar>
              <br/>
              <b-button v-b-modal.modal-1 class="button" title="Host" style="marginRight:6%" variant="outline-primary" v-if="admin" >Add host</b-button>      

              
              <b-avatar style="padding:10px;height:100px;width:100px" variant="light" src="../assets/beach.png" v-if="host"></b-avatar>
              <br/>
              <b-button class="button" title="Apartment" @click="addApartment" style="marginRight:7%" variant="outline-success" v-if="host" >Add apartment</b-button>      



        <b-modal id="modal-1" title="Add host" hide-footer="true" v-if="this.$session.exists() && admin">
      
        <form v-on:submit.prevent="addHost">
        <b-form-input  name="name" v-model="hostObject.name" type="text" class="input" placeholder="Name"></b-form-input>
        <b-form-input name="lastname"  v-model="hostObject.lastname" type="text" class="input" placeholder="Lastanme"></b-form-input>
        <b-form-select name="gender" v-model="hostObject.gender" class="input" :options="options"></b-form-select>
        
        <b-form-input  name="username" v-model="hostObject.username" type="text" class="input" placeholder="Username"></b-form-input>
        <b-form-input name="password" type="password" v-model="hostObject.password" class="input" placeholder="Password"></b-form-input>
        <b-form-input
          
          type="password"
          class="input"
          placeholder="Repeat password"
          name="repeatedPassword"
          v-model="hostObject.repeatedPassword"
        ></b-form-input>
        <br />

        <b-button type="submit" class="btns" variant="outline-primary">Add host</b-button>
      </form>


    </b-modal>
      </b-card>


  </div>
</template>

<script>

export default {
    name:'Home',
  data () {
      return {
      
      role: "",
        host: false,
        admin: false,
        guest: false,
        username:'',
        hostObject:{name:'',lastname:'',password:'',repeatedPassword:'',username:'',gender:''},
        selected: null,
        options: [
        { value: "none", text: "Please select an option" },
        { value: "FEMALE", text: "Female" },
        { value: "MALE", text: "Male" },
        { value: "rathernotsay", text: "Rather Not Say" }
      ],
        headers : {
          'Content-Type' : 'application/json'
        }

    }
    
  },
  methods:{
    goToUsersPage : function() {
      this.$router.push('/allusers')
    },

    addApartment : function() {
      this.$router.push('/addapartment')
    },

    addHost: function() {

      if(this.hostObject.username == "" || this.hostObject.name == "" || this.hostObject.lastname == "" || this.hostObject.password == "" || this.hostObject.gender == "" ){
        this.$$swal("Some fileds are empty.Please try again.");
        return;
      }

      if(this.hostObject.password != this.hostObject.repeatedPassword){
        this.$$swal("Passwords do not match.");
        return;
      }

      
      var object = {name:this.hostObject.name, lastname: this.hostObject.lastname, password: this.hostObject.password,
      gender: this.host.gender,username:this.hostObject.username}

      console.log(object);
      
      
      this.$http.post("http://localhost:8082/PocetniREST/rest/addhost", object, {headers: this.headers}).then(() => {
            
          location.reload();
          
            
          },
          response => {
            if (response.status == 400) {
              this.$swal("User with this username already exists.");
            }
          }
        );
    }
  },

  created(){
      
    if(this.$session.exists()){

        this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {
      
      if(response.status == 400){
          this.$swal('Error');
      }else{
      
      this.role = response.body.role;
      this.username = response.body.username;
        
      if(this.role === "HOST"){
        this.host = true;
      } else if (response.body.role === "ADMIN"){
        this.admin = true;
      } else if (response.body.role === "GUEST"){
        this.guest = true;
      }

      
        
      }
    })
                 
  }

  } 
};

</script>

<style scoped>
.naslov{
    margin-left: 60%;
    margin-top:20%;
}

.icon{
  width: 100px;
  height: 100px;
}

.usericon{
  width: 60px;
  height: 60px;
}

.input{
  margin-top:10px;
}

.card{

  padding:10px;
  text-align: left;
  width: 20%;
  height: 62%;
  margin-top:10%;
  margin-left:15%;
  position: absolute;
}

.button{

    margin-top:7%;
    margin-left: 10%;
    width: 200px;
}

.addingcard{

  margin-left:40%;
  margin-top:24%;
  width: 35%;
  height: auto;
  position: absolute;
  text-align: center;


}


#carousel-1{

    width: 70%;
    height: 60%;
    margin-top: 5%;
    margin-left:14%;
    position: fixed;
    max-height: 40%;
}

.smallcard{
  width: auto;
  height: auto;
  margin-left:0px;
  text-align:center;
  margin-bottom:10px;
}

.welcomecard{
  margin-left:40%;
  width: 35%;
  height: auto;
  position: absolute;
  text-align: right;
}



h1{
    text-align: right;
    margin-top: 14%;
    color:rgb(94, 91, 91);
    font-family: Calibri;
}

</style>