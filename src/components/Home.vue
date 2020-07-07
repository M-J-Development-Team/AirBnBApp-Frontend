
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
      <b-carousel-slide
        caption="Venice, Italy"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/italy.jpg"
        style="height:300px"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="Stockholm, Sweden"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/stockholm.jpg"
        style="height:300px"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="Maldives"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/chairs.jpeg"
        style="height:300px"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="Barcelona, Spain"
        text="Welcome to TravelApp.We are here to make your travels easier!"
        img-src="../assets/guell.jpg"
        style="height:300px"
      ></b-carousel-slide>
    </b-carousel>

    <b-card class="apartmentsCardLoggedOut" v-if="!this.$session.exists() ">
      <renderApartments isLoggedInGuest="false" />
    </b-card>

    <b-card class="card" v-if="this.$session.exists()">
      <div class="smallcard">
        <b-avatar
          v-if="gender == 'MALE'"
          src="../assets/bosozoku (1).svg"
          variant="light"
          style="height:150px;width:150px"
        ></b-avatar>
        <b-avatar
          v-if="gender == 'FEMALE'"
          src="../assets/woman.svg"
          variant="light"
          style="height:150px;width:150px"
        ></b-avatar>
        <h1 class="username">@{{this.username}}</h1>

        <br />
        <b-button
          class="button"
          title="My reservations"
          v-on:click.prevent="goToReservationsPage"
          variant="light"
          v-if="guest"
        >
          My reservations
          <b-avatar
            variant="light"
            src="../assets/passport (1).png"
            v-if="guest"
            style="width:50px;height:50px"
          ></b-avatar>
        </b-button>
      </div>
    </b-card>
    <b-card class="welcomecard" v-if="this.$session.exists() && (admin || host)">
      <b-button
        class="adminbuttons"
        style="marginTop:1%"
        title="Users"
        variant="outline-primary"
        v-on:click.prevent="goToUsersPage"
        v-if=" admin"
      >
        All users
        <b-avatar src="../assets/user (1).svg" variant="light" style="height:30px;widht:30px" />
      </b-button>
      <br />
      <b-button
        class="adminbuttons"
        title="Apartments"
        variant="outline-primary"
        v-if=" admin"
        v-on:click.prevent="goToApartmentsPage"
      >
        All apartments
        <b-avatar src="../assets/tent.png" variant="light" style="height:30px;widht:30px" />
      </b-button>
      <br />
      <b-button
        class="adminbuttons"
        title="Amenities"
        variant="outline-primary"
        v-if="admin"
        v-on:click.prevent="goToAmenitiesPage"
      >
        All amenities
        <b-avatar src="../assets/iron2.png" variant="light" style="height:30px;widht:30px" />
      </b-button>
      <br />
      <b-button
        class="adminbuttons"
        title="Reservations"
        variant="outline-primary"
        v-on:click.prevent="goToReservationsPage"
        v-if="admin"
      >
        All reservations
        <b-avatar src="../assets/passport (1).png" variant="light" style="height:30px;widht:30px" />
      </b-button>

      <b-button
        class="hostbuttons"
        style="marginTop:-7%"
        title="Apartments"
        variant="outline-primary"
        v-if="host"
        v-on:click.prevent="goToApartmentsPage"
      >My apartments</b-button>
      <br />
      <b-button
        class="hostbuttons"
        title="My guests"
        @click="seeMyGuests"
        variant="outline-primary"
        v-if="host"
      >My guests</b-button>
      <br />
      <b-button
        class="hostbuttons"
        title="Comments"
        @click="seeCommentsToApprove"
        variant="outline-primary"
        v-if="host"
      >You have {{this.numberOfUnapprovedComments}} new comments to approve</b-button>
      <br />
      <b-button
        class="hostbuttons"
        title="Reservations"
        variant="outline-primary"
        v-on:click.prevent="goToReservationsPage"
        v-if="host"
      >Reservations</b-button>
    </b-card>

    <b-card class="addingcard" v-if="this.$session.exists() && (admin || host)">
      <b-avatar
        id="hoAvatar"
        style="padding:10px;height:100px;width:100px"
        variant="light"
        src="../assets/home.png"
        v-if="admin"
      ></b-avatar>
      <br />
      <b-button
        id="hoButton"
        v-b-modal.modal-1
        title="Host"
        variant="outline-primary"
        v-if="admin"
      >Add host</b-button>

      <b-avatar
        id="amAvatar"
        style="padding:5px;height:80px;width:80px"
        variant="light"
        src="../assets/vacuum.png"
        v-if="admin"
      ></b-avatar>
      <br />
      <b-button
        v-b-modal.modal-2
        id="amButton"
        class="button"
        title="Host"
        style="marginRight:6%"
        variant="outline-primary"
        v-if="admin"
      >Add amenity</b-button>

      <b-avatar
        style="padding:10px;height:100px;width:100px"
        variant="light"
        src="../assets/house.png"
        v-if="host"
      ></b-avatar>
      <br />
      <b-button
        class="button"
        title="Apartment"
        @click="addApartment"
        style="marginRight:7%"
        variant="outline-primary"
        v-if="host"
      >Add apartment</b-button>
    </b-card>

    <b-card class="apartmentsCard" v-if="(this.$session.exists() && guest)">
      <renderApartments style="width:100%" isLoggedInGuest="true" />
    </b-card>

    <b-modal
      id="modal-1"
      title="Add host"
      hide-footer="true"
      v-if="this.$session.exists() && admin"
    >
      <form v-on:submit.prevent="addHost">
        <b-form-input
          name="name"
          v-model="hostObject.name"
          type="text"
          class="input"
          placeholder="Name"
        ></b-form-input>
        <b-form-input
          name="lastname"
          v-model="hostObject.lastname"
          type="text"
          class="input"
          placeholder="Lastanme"
        ></b-form-input>
        <b-form-select name="gender" v-model="hostObject.gender" class="input" :options="options"></b-form-select>
        <b-form-input
          name="username"
          v-model="hostObject.username"
          type="text"
          class="input"
          placeholder="Username"
        ></b-form-input>
        <b-form-input
          name="password"
          type="password"
          v-model="hostObject.password"
          class="input"
          placeholder="Password"
        ></b-form-input>
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
          <b-form-input required="true"  name="name" v-model="amenityObject.name" type="text" class="input" placeholder="Name"></b-form-input>
          <br />
              <b-form-group>
              <b-form-file required="true" style="width:300px" accept="image/*" @change="onFileSelected" type="file" placeholder=" Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
          </b-form-group>
          <br/>
          <b-button type="submit" class="btns" variant="outline-primary">Add amenity</b-button>
        </form>
    </b-modal>
  </div>
</template>

<script>
import renderApartments from "./renderApartments.vue";

export default {
  components: {
    renderApartments: renderApartments
  },
  name: "Home",
  data() {
    return {
      role: "",
      host: false,
      admin: false,
      guest: false,
      username: "",
      gender: "",
      location: "",
      numberOfUnapprovedComments: "",
      unapprovedComments: [],
      hostObject: {
        name: "",
        lastname: "",
        password: "",
        repeatedPassword: "",
        username: "",
        gender: ""
      },
      selected: null,
      amenityObject: { name: "", image: "" },
      options: [
        { value: "none", text: "Please select an option" },
        { value: "FEMALE", text: "Female" },
        { value: "MALE", text: "Male" },
        { value: "rathernotsay", text: "Rather Not Say" }
      ],
      headers: {
        "Content-Type": "application/json"
      }
    };
  },
  methods: {
    goToUsersPage: function() {
      this.$router.push("/allusers");
    },
    goToAmenitiesPage: function() {
      this.$router.push("/allamenities");
    },

    goToSearchApartmentPage: function() {
      this.$router.push("/apartments");
    },

    goToReservationsPage: function() {
      this.$router.push("/allreservations");
    },

    seeCommentsToApprove: function() {
      this.$router.push("/approvecomments");
    },

    onLocationChanged: function() {
      console.log(this.location);
    },

    onFileSelected(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.amenityObject.image = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },

    addApartment: function() {
      this.$router.push("/addapartment");
    },
    goToApartmentsPage: function() {
      this.$router.push("/apartments");
    },

    seeMyGuests: function() {
      this.$router.push("/myguests");
    },

    addHost: function() {
      alert(this.hostObject.gender);

      if (
        this.hostObject.username == "" ||
        this.hostObject.name == "" ||
        this.hostObject.lastname == "" ||
        this.hostObject.password == "" ||
        this.hostObject.gender == ""
      ) {
        this.$$swal("Some fileds are empty.Please try again.");
        return;
      }

      if (this.hostObject.password != this.hostObject.repeatedPassword) {
        this.$$swal("Passwords do not match.");
        return;
      }

      var object = {
        name: this.hostObject.name,
        lastname: this.hostObject.lastname,
        password: this.hostObject.password,
        gender: this.hostObject.gender,
        username: this.hostObject.username
      };

      console.log(object);

      this.$http
        .post("http://localhost:80/PocetniREST/rest/addhost", object, {
          headers: this.headers
        })
        .then(
          () => {
            this.$router.push(`/`);
          },
          response => {
            if (response.status == 400) {
              this.$swal("User with this username already exists.");
            }
          }
        );
    },

    addAmenity: function() {
      if (this.amenityObject.name == "") {
        this.$swal("Please fill out the name field");
        return;
      }

      var object = {
        name: this.amenityObject.name,
        image: this.amenityObject.image,
        amenityStatus: "ACTIVE"
      };

      this.$http
        .post("http://localhost:80/PocetniREST/rest/addamenity", object, {
          headers: this.headers
        })
        .then(
          () => {
            this.$swal("Amenity is added");
            this.$router.push(`/`);
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

        this.$http.get(`http://localhost:80/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {

      if(response.status == 400){
          this.$swal('Error');
      }else{

      this.role = response.body.role;
      this.username = response.body.username;
      console.log(response.body);

      if(this.role === "HOST"){
        this.host = true;
        this.$http.get(`http://localhost:80/PocetniREST/rest/get-all-unapproved-for-host/${response.body.username}`,{headers:this.headers}).then(resp =>{
          this.numberOfUnapprovedComments = resp.body.reduce((acc) => acc + Object.length, 0);
          this.unapprovedComments = resp.body;
          console.log(this.unapprovedComments);
          })
      } else if (response.body.role === "ADMIN"){
        this.admin = true;
      } else if (response.body.role === "GUEST"){
        this.guest = true;
      }
      this.gender=response.body.gender;
      }
    })

  }
}
}
</script>

<style scoped>
.naslov {
  margin-left: 60%;
  margin-top: 20%;
}

.icon {
  width: 100px;
  height: 100px;
}

.usericon {
  width: 60px;
  height: 60px;
}

.input {
  margin-top: 10px;
}

.card {
  padding: 10px;
  text-align: left;
  width: 20%;
  height: 62%;
  margin-top: 10%;
  margin-left: 7%;
  position: fixed;
}

.button {
  margin-top: 7%;
  margin-left: 0%;
  width: 200px;
}

.adminbuttons {
  margin-top: 4%;
  margin-left: 0%;
  width: 200px;
}

.hostbuttons {
  margin-top: 3%;
  margin-left: 0%;
  width: 200px;
}
.addingcard {
  margin-left: 35%;
  margin-top: 35%;
  width: 35%;
  height: auto;
  position: absolute;
  text-align: center;
}

.username {
  color: rgb(161, 207, 245);
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

#carousel-1 {
  width: 90%;
  height: 30%;
  margin-top: 5%;
  margin-left: 3%;
  position: absolute;
  max-height: 40%;
}

.smallcard {
  width: auto;
  height: auto;
  margin-left: 0px;
  text-align: center;
  margin-bottom: 10px;
}

.welcomecard {
  margin-left: 35%;
  width: 35%;
  height: auto;
  position: absolute;
  text-align: center;
}

h1 {
  text-align: right;
  margin-top: 14%;
  color: rgb(94, 91, 91);
  font-family: Calibri;
}

.apartmentsCard {
  margin-top: 10%;
  position: absolute;
  margin-left: 30%;
  width: 35%;
  height: auto;
}

.apartmentsCardLoggedOut {
  margin-top: 27%;
  position: absolute;
  margin-left: 3%;
  width: inherit;
  width: 90%;
  height: auto;
}

.filters {
  margin-left: 2%;
}

.filteringDiv {
  width: auto;
  margin-bottom: 2%;
}

.inputs {
  border-radius: 5px;
  border-width: 0.5px;
  width: 200px;
  height: 50px;
  margin-left: 5px;
  margin-top: 5px;
}

.firstInput {
  border-radius: 5px;
  border-width: 0.5px;
  width: 200px;
  height: 50px;
  margin-left: -1%;
}

.guestFiltersDiv {
  margin-left: 1.5%;
  width: 100%;
}

.searchButtonGuest {
  margin-left: 3%;
  height: 50px;
  margin-top: -1%;
}

.searchButton {
  margin-left: 0.7%;
  height: 50px;
  margin-top: 0%;
}

.inputsGuest {
  border-radius: 5px;
  border-width: 0.5px;
  width: 150px;
  height: 50px;
  margin-left: 7px;
  margin-top: 7px;
}
</style>
