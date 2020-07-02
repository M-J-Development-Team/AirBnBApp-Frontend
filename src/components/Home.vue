 
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
        <div class="smallcard">
      <b-avatar v-if="admin" src="../assets/tentt.png" variant="light" style="height:150px;width:150px"></b-avatar>
      <b-avatar v-if="host" src="../assets/balloon.png" variant="light" style="height:150px;width:150px"></b-avatar>
       <b-avatar variant="light" src="../assets/passport (1).png" v-if="guest" style="width:150px;height:150px"></b-avatar>
        </div>
      <b-button class="button" title="Users" variant="outline-primary"  v-on:click.prevent="goToUsersPage" v-if=" admin">All users</b-button>
      <b-button class="button" title="Apartments" variant="outline-primary" v-if=" admin" v-on:click.prevent="goToApartmentsPage">All apartments</b-button>
      <b-button class="button" title="Amenities" variant="outline-primary" v-if="admin" v-on:click.prevent="goToAmenitiesPage">All amenities</b-button>
      <b-button class="button" title="Reservations" variant="outline-primary" v-if="admin" >All reservations</b-button>

      <b-button class="button" title="Apartments" variant="outline-success" v-if="host"  v-on:click.prevent="goToApartmentsPage"> My apartments</b-button>
      <b-button class="button" title="My guests" variant="outline-success" v-if="host" >My guests</b-button>
      <b-button class="button" title="Reservations" variant="outline-success" v-if="host" >Reservations </b-button>

      <b-button class="button" title="My reservations" variant="outline-success"  v-on:click.prevent="goToReservationsPage" v-if="guest" >My reservations</b-button>


      </b-card>


      <b-card class="welcomecard" v-if="this.$session.exists()">
        <h1 class="username">@{{this.username}}</h1>
      
      </b-card>

      <b-card class="addingcard" v-if="this.$session.exists()">

              <b-avatar id="hoAvatar" style="padding:10px;height:100px;width:100px" variant="light" src="../assets/home.png" v-if="admin"></b-avatar>
              <br/>
              <b-button id="hoButton" v-b-modal.modal-1 title="Host" variant="outline-primary" v-if="admin" >Add host</b-button>

              <b-avatar id="amAvatar" style="padding:5px;height:80px;width:80px" variant="light" src="../assets/vacuum.png" v-if="admin"></b-avatar>
              <br/>
              <b-button v-b-modal.modal-2 id="amButton" class="button" title="Host" style="marginRight:6%" variant="outline-primary" v-if="admin" >Add amenity</b-button>            

              
              <b-avatar style="padding:10px;height:100px;width:100px" variant="light" src="../assets/beachhouse.png" v-if="host"></b-avatar>
              <br/>
              <b-button class="button" title="Apartment" @click="addApartment" style="marginRight:7%" variant="outline-success" v-if="host" >Add apartment</b-button>      

              
              <b-avatar style="marginTop:-60px;height:100px;width:100px;" variant="light" src="../assets/travelling.png" v-if="guest"></b-avatar>
              <br/>
              <b-button class="button" title="See all apartments" style="marginRight:10%" variant="outline-success"  v-on:click.prevent="goToSearchApartmentPage" v-if="guest" >Search for apartment</b-button>      
              

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

    <b-modal id="modal-2" title="Add amenity" hide-footer="true" v-if="this.$session.exists() && admin">
        <form v-on:submit.prevent="addAmenity">
        <b-form-input  name="name" v-model="amenityObject.name" type="text" class="input" placeholder="Name"></b-form-input>
        <br />
             <b-form-group>
            <b-form-file  style="width:300px" accept="image/*" @change="onFileSelected" type="file" placeholder=" Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
        </b-form-group>
        <br/>
        <b-button type="submit" class="btns" variant="outline-primary">Add amenity</b-button>
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
        amenityObject: {name: '', image: ''},
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
    goToAmenitiesPage : function() {
      this.$router.push('/allamenities')
    },

    goToSearchApartmentPage : function() {
      this.$router.push('/apartments')
    },

    goToReservationsPage : function() {
      this.$router.push('/allreservations')
    },

    onFileSelected(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.amenityObject.image = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
      },

    addApartment : function() {
      this.$router.push('/addapartment')
    },
    goToApartmentsPage : function() {
      this.$router.push('/apartments')
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
    },


    addAmenity: function() {

      if(this.amenityObject.name == ""){
        this.$swal("Please fill out the name field");
        return;
      }

      var object = {name:this.amenityObject.name,image:this.amenityObject.image,amenityStatus:'ACTIVE'}
    
      this.$http.post("http://localhost:8082/PocetniREST/rest/addamenity", object, {headers: this.headers}).then(() => {
          this.$swal("Amenity is added");
          location.reload();
          
            
          },
          response => {
            if (response.status == 400) {
              this.$swal("Amenity with this name already exists.");
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
  position: fixed;
  text-align: center;


}

.username{
  color:rgb(151, 204, 151);
}

#amButton {
  margin-top: -30%;
  width: 85px;
  margin-left: 2%;
}

#amAvatar {
  margin-left: -6%;
  margin-top: -62%;
}

#hoAvatar {
  margin-right: 70%;
}

#hoButton {
  margin-right: 80%;
  margin-top: 5%;
  margin-left: 8.5%;
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
  position: fixed;
  text-align: right;
}



h1{
    text-align: right;
    margin-top: 14%;
    color:rgb(94, 91, 91);
    font-family: Calibri;
}

</style>