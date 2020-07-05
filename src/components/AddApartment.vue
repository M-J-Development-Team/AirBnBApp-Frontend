<template>
  <div>
    <b-button
      variant="outline-light"
      style="marginTop:0%;marginLeft:0%;position:absolute"
      v-on:click.prevent="backToHome"
    >
      <img style="width:30px;height:30px;" src="../assets/back.png" />
    </b-button>

    <b-card style="marginTop:5%;width:300px;padding:10px;textAlign:center">
      <div
        v-b-tooltip.hover
        title="New guests are waiting for what your apartment has to offer! Hurry up and add your apartment to our site.">
        <b-img src="../assets/add.png" style="height:100px;width:100px"></b-img>
        </div>
    </b-card>

    <b-card class="card">
      <b-form @submit.prevent="submitInfo" inline>

        <div style="padding:15px">
          <b-row style="marginLeft:0.5%">
          <b-form-group >
            <label>Apartment name</label>
            <b-form-input
              required="true"
              id="input-2"
              placeholder="Name"
              v-model="apartment.name"
              style="width:300px"
            ></b-form-input>
          </b-form-group>
          </b-row>
                  
       
          <b-form-group style="marginTop:4%">
            <b-form-file
              accept="image/*"
              @change="onFileSelected"
              type="file"
              placeholder=" Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-form-group>
        

        <b-form-group id="input-group-1" label-for="input-1" style="marginTop:4%">
          <label>Apartment type</label>
          <b-form-select required="true" v-model="apartment.type" :options="options" style="width:300px"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2" v-if="!isRoom" style="marginTop:4%">
          <label >Number of rooms</label>
          <b-form-input v-model="apartment.numberOfRooms" id="input-2" style="width:300px"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label-for="input-1" style="marginTop:4%">
          <label>Number of guests</label>
          <b-form-select
            v-model="apartment.numberOfGuests"
            :options="optionsGuests"
            style="width:300px"
            required="true"
          ></b-form-select>
        </b-form-group>
   
          <b-form-group
            id="input-group-1"
            label="Check in time"
            label-for="input-1"
            style="width:150px;marginLeft:4px;marginTop:4%"
          >
            <b-form-timepicker required="true" v-model="apartment.checkInTime" locale="en"></b-form-timepicker>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Check out time"
            label-for="input-1"
            style="width:150px;marginLeft:4px;marginTop:4%"
          >
            <b-form-timepicker required="true" v-model="apartment.checkOutTime" locale="en"></b-form-timepicker>
          </b-form-group>
      
          <b-list-group label="Amenities">
            <multiselect
              v-model="value"
              :multiple="true"
              :close-on-select="true"
              placeholder="Check amenities"
              track-by="name"
              :clear-on-select="false"
              :preserve-search="true"
              :options="optionsAmenities"
              label="name"
              style="marginLeft:4px;marginTop:4%;width:200px"
              @input="seeValues"
            ></multiselect>
          </b-list-group>

        <b-form-group label="Enter price" style="marginTop:4%">
          <b-img
            variant="light"
            src="../assets/money.png"
            style="marginBottom:7px;marginRight:7px;height:30px;width:30px"

          ></b-img>
          <b-form-input
            v-model="apartment.price"
            id="input-2"
            type="number"
            required="true"
          ></b-form-input>
        </b-form-group>
    

        <div style="borderStyle:solid;borderWidth:1px;width:300px;height:auto;textAlign:center;marginTop:5%">
        <b-row>
          <b-form-group>
            <b-form-input
              placeholder="Street"
              v-model="address.street"
              id="input-2"
              required="true"
              style="marginTop:5px;marginLeft:25px;width:280px"

            ></b-form-input>
            <br/>

            <b-form-input
              placeholder="Number"
              required="true"
              v-model="address.number"
             style="marginTop:5px;marginLeft:25px;width:280px"
              id="input-2"
            ></b-form-input>
          </b-form-group>
        </b-row>

        <b-row>
          <b-form-group>
            <b-form-input
              placeholder="City"
              required="true"
              v-model="address.city"
              id="input-2"
              style="marginTop:5px;marginLeft:25px;width:280px"
            ></b-form-input>
            <br/>
            <b-form-input
            required="true"
              placeholder="Zipcode"
              style="marginTop:5px;marginLeft:25px;width:280px;marginBottom:5px"
              v-model="address.zipCode"
              id="input-2"
            ></b-form-input>
          </b-form-group>
        </b-row>
        </div>

        <div>
        <b-form-group style="marginTop:4%">
          <label for="example-datepicker">Rent from:</label>
          <b-form-datepicker
            :min="minDate"
            v-model="apartment.from"
            class="mb-2"
            required="true"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group style="marginTop:4%">
          <label for="example-datepicker">Rent to:</label>
          <b-form-datepicker required="true" :min="minDate" v-model="apartment.to" class="mb-2" style="width:300px"></b-form-datepicker>
        </b-form-group>
        </div>
        <b-button
          style="width:200px;marginTop:4%"
          id="submit-button"
          variant="secondary"
          type="submit"
          size="sm"
        >Create</b-button>
        </div>
      </b-form>

      <b-card v-if="apartment.photoPath.length > 0" class="photocard">
        <h1>Apartment photo</h1>
        <b-img :src="apartment.photoPath" class="apartmentPhoto"></b-img>
      </b-card>
    </b-card>
  </div>
</template>



<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  name: "AddApartment",
  data() {
    return {
      host: "",
      minDate: new Date(),
      minDateTo: new Date() + 1,
      isHost: "",
      apartment: {
        price: "",
        from: "",
        to: "",
        type: "",
        numberOfRooms: "",
        numberOfGuests: "",
        datesForRenting: [],
        host: "",
        photoPath: "",
        checkInTime: "",
        checkOutTime: "",
        status: "",
        amenities: [],
        name: ""
      },
      location: { gWidth: "", gHeight: "", address: "" },
      address: { street: "", number: "", city: "", zipCode: "" },
      selected: null,
      optionsAmenities: [],
      value: [],
      options: [
        { value: "none", text: "Please select an option" },
        { value: "ROOM", text: "Room" },
        { value: "ENTIREPLACE", text: "Entire place" }
      ],
      optionsGuests: [
        { value: "none", text: "Please select an option" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" }
      ],
      headers: {
        "Content-Type": "application/json"
      }
    };
  },
  computed: {
    isRoom: function() {
      if (this.apartment.type == "ROOM") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    seeValues: function() {
      console.log(this.value);
    },

    CheckedAmenity: function(name) {
      console.log(document.getElementsByName("wifi"));

      if (document.getElementsByName(name)[0].checked == true) {
        this.apartment.amenities.push(name);
      } else {
        this.apartment.amenities.forEach(a => {
          if (a == name) {
            const index = this.apartment.amenities.indexOf(a);
            if (index > -1) {
              this.apartment.amenities.splice(index, 1);
            }
          }
        });
      }

      console.log(this.apartment.amenities);
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
          this.apartment.photoPath = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },

    backToHome: function() {
      this.$router.push("/");
    },

    submitInfo: function() {
      console.log(this.apartment);
      console.log(this.host);

      console.log(this.address);

      console.log(this.value);

      console.log(this.apartment.checkInTime);

      if(this.apartment.checkInTime == ''){
        this.$swal("'You didn't enter check in time'");
        return;
      }
      if(this.apartment.checkOutTime == ''){
        this.$swal("'You didn't enter check out time'");
        return;
      }

       if(this.apartment.from == ''){
        this.$swal("'You didn't enter rent from date'");
        return;
      }
      if(this.apartment.to == ''){
        this.$swal("'You didn't enter rent to date'");
        return;
      }

      //var from = moment(this.apartment.from,'YYYY-MM-DD').format('YYYY-MM-DD');
      //var to = moment(this.apartment.to,'YYYY-MM-DD').format('YYYY-MM-DD');

      var datesForRenting = [];
      var onePeriod = { from: this.apartment.from, to: this.apartment.to };
      datesForRenting.push(onePeriod);

      console.log(datesForRenting);

      var fullstreet =
        this.address.street.replace(" ", "%20") + "%20" + this.address.number;
      console.log(fullstreet);

      this.$http
        .get(
          `https://eu1.locationiq.com/v1/search.php?key=10295fe5fa497d&q=${fullstreet}&format=json`
        )
        .then(
          response => {
            //https://eu1.locationiq.com/v1/search.php?key=10295fe5fa497d&street=${this.address.street}&city=${this.address.city}&postalcode=${this.address.zipCode}&format=json

            //pravi
            //https://eu1.locationiq.com/v1/search.php?key=10295fe5fa497d&q=${fullstreet}&format=json

            if (response.ok) {
              console.log(response.body[0].lat);

              this.location.gWidth = response.body[0].lat;
              this.location.gHeight = response.body[0].lon;

              console.log(this.location);
            }
          },
          response => {
            if (response.status == 400) {
              this.$swal("Error with geocoding");
            }
          }
        );

      this.location.address = this.address;
      console.log(this.location);

      var objekat = {
        type: this.apartment.type,
        numberOfRooms: this.apartment.numberOfRooms,
        numberOfGuests: this.apartment.numberOfGuests,
        location: this.location,
        datesForRenting: datesForRenting,
        freeDates: [],
        host: this.host.username,
        comments: [],
        photoPath: this.apartment.photoPath,
        price: this.apartment.price,
        checkInTime: this.apartment.checkInTime,
        checkOutTime: this.apartment.checkOutTime,
        status: "ACTIVE",
        amenities: this.value,
        reservations: [],
        name: this.apartment.name,
        idOne: ""
      };

      console.log(objekat);

      this.$http
        .post("http://localhost:8082/PocetniREST/rest/apartmentsadd", objekat, {
          headers: this.headers
        })
        .then(
          () => {
            this.$swal("Added successfully!");
            this.$router.push("/");
          },
          response => {
            if (response.status == 400) {
              this.$swal("Error please try again.");
            }
          }
        );
    }
  },

  created() {
    if (this.$session.exists()) {
      this.$http
        .get(
          `http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get(
            "idOne"
          )}`,
          { headers: this.headers }
        )
        .then(response => {
          if (response.status == 400) {
            this.$swal("Error");
          } else {
            this.host = response.body;

            if (this.host.role === "HOST") {
              this.isHost = true;
            } else if (response.body.role === "ADMIN") {
              this.$router.push("/");
              location.reload();
            } else if (response.body.role === "GUEST") {
              this.$router.push("/");
              location.reload();
            }
          }
        });
    }

    this.$http
      .get("http://localhost:8082/PocetniREST/rest/amenity/all", {
        headers: this.headers
      })
      .then(response => {
        response.body.forEach(element => {
          this.optionsAmenities.push({
            name: element.name,
            image: element.image,
            amenityStatus: element.amenityStatus,
            idOne: element.idOne
          });
        });

        console.log(this.optionsAmenities);
        console.log(this.options);
      });
  }
};
</script>

<style scoped>

.card {
  margin-top: 2%;
  margin-left: 10%;
  width: 60%;
  height: auto;
}

.apartmentPhoto {
  width: 600px;
  height: 400px;
}

.photocard {
  margin-top: 2%;
  margin-left: 0%;
  width: auto;
  height: auto;
}
</style>
