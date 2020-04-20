 
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

      

      <b-card class="card">
        <div class="smallcard">
      <b-img src="../assets/sea-waves.png" class="icon"/>
        </div>
      <b-button class="button" title="Users" variant="outline-primary" v-if="this.$session.exists() && admin" v-on:click.prevent="goToUsersPage">All users</b-button>
      <b-button class="button" title="Apartments" variant="outline-primary" v-if="this.$session.exists() && admin" >All apartments</b-button>
      <b-button class="button" title="Amenities" variant="outline-primary" v-if="this.$session.exists() && admin" >All amenities</b-button>
      <b-button class="button" title="Reservations" variant="outline-primary" v-if="this.$session.exists() && admin" >All reservations</b-button>

      </b-card>


      <b-card class="welcomecard">
        <h1>@{{this.username}}</h1>
      
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
        headers : {
          'Content-Type' : 'application/json'
        }

    }
    
  },
  methods:{
    goToUsersPage : function() {
      this.$router.push('/allusers')
    },
  },

   beforeCreate(){
      
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

.card{

  padding:10px;
  text-align: left;
  width: 20%;
  height: 55%;
  margin-top:10%;
  margin-left:13%;
  position: absolute;
}

.button{

    margin-top:7%;
    margin-left: 10%;
    width: 200px;
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
  margin-left:35%;
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