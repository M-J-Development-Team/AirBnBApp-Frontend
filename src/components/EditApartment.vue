<template>
  <div>
    <b-card style="marginTop:10%;width:80%;marginLeft:5%;height:auto">

      <b-card
      style="marginTop:2%;width:50%;marginLeft:5%;height:40%"
      v-if="apartment.photoPath.length > 0"
      class="photocard"
    >
      <h1 stle=" textTransform:capitalize">{{apartment.name}}</h1>
      <b-img :src="apartment.photoPath" style="width:50%;height:40%"></b-img>
    </b-card>

      <b-form @submit.prevent="edit" inline>

        <div style="padding:15px">
          <b-row >
            <b-form-group >
              <label >Apartment name</label>
              <b-form-input
                id="input-2"
                :placeholder="apartment.name"
                v-model="apartment.name"
                style="width:300px"
                required="true"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-form-group style="marginLeft:-14px;marginTop:5px" >
            <label >Apartment type</label>
            <b-form-select required="true" style="width:300px" v-model="apartment.type" :options="options"></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-2"
           
            label-for="input-2"
            v-if="!isRoom"
            style="marginTop:5px"
          >

          <label >Number of rooms</label>
           
            <b-form-input

              v-model="apartment.numberOfRooms"
              :placeholder="apartment.numberOfRooms"
              id="input-2"
              style="width:300px;marginLeft:-14px"
            ></b-form-input>

          </b-form-group>
        

        <b-form-group id="input-group-1" style="marginTop:5px;marginLeft:-14px" label-for="input-1">
          <label>Number of guests</label>
          <b-form-select
            :selected="apartment.numberOfGuests"
            v-model="apartment.numberOfGuests"
            :options="optionsGuests"
            style="width:300px"
            required="true"
          ></b-form-select>
        </b-form-group>

        </div>

        <div style="marginLeft:30px">       
          <b-form-group
            id="input-group-1"
            :value="apartment.checkInTime"
            label="Check in time"
            label-for="input-1"
            style="width:150px;marginLeft:0px"
          >
            <b-form-timepicker required="true" v-model="apartment.checkInTime" locale="en"></b-form-timepicker>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            :value="apartment.checkOutTime"
            label="Check out time"
            label-for="input-1"
            style="width:150px;marginLeft:0px"
          >
            <b-form-timepicker required="true" v-model="apartment.checkOutTime" locale="en"></b-form-timepicker>
          </b-form-group>

          </div>

          <div style="marginLeft:20px">

          <b-list-group>
            <label>Add amenities</label>
            <multiselect
              v-model="value"
              :multiple="true"
              :close-on-select="true"
              placeholder="Add new amenities"
              track-by="name"
              :clear-on-select="false"
              :preserve-search="true"
              :options="optionsAmenities"
              label="name"
            ></multiselect>
          </b-list-group>


          <b-card style="marginTop:10px">
          <b-card-title v-if="apartment.amenities.length > 0">Current amenities</b-card-title>
          <span v-if="apartment.amenities.length == 0">
            No current amenities
            <b-avatar
              variant="light"
              src="../assets/sad.png"
              style="padding:5px"
              v-if="apartment.amenities.length == 0"
            ></b-avatar>
          </span>
          <ul v-for="amenity in apartment.amenities" v-bind:key="amenity.name">
            <li>
              <b-avatar variant="light" :src="amenity.image"></b-avatar>
            </li>
          </ul>
        </b-card>
        

          </div>

          <div style="marginLeft:50px">

        <b-form-group label="Enter price">
          <b-img
            style="marginBottom:7px;marginRight:7px;height:30px;width:30px"
            variant="light"
            src="../assets/money.png"
          ></b-img>
          <b-form-input
            v-model="apartment.price"
            :placeholder="apartment.price"
            id="input-2"
            type="number"
            style="width:300px;marginBottom:10px"
            required="true"
          ></b-form-input>
        </b-form-group>

        </div>

        <div style="borderStyle:solid;borderWidth:1px;width:300px;height:auto;textAlign:center">

        <b-row >
          <b-form-group label="Address">
            <b-form-input
            style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.street"
              v-model="apartment.location.address.street"
              id="input-2"
              required="true"
              
            ></b-form-input>
            <br/>
            <b-form-input
              style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.number"
              v-model="apartment.location.address.number"
              id="input-2"
              required="true"
              
            ></b-form-input>
          </b-form-group>
        </b-row>

        <b-row>
          <b-form-group >
            <br/>
            <b-form-input
               style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.city"
              v-model="apartment.location.address.city"
              id="input-2"
              required="true"
              
            ></b-form-input>
            <br/>
            <b-form-input
               style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.zipCode"
              v-model="apartment.location.address.zipCode"
              id="input-2"
              required="true"
              
            ></b-form-input>
          </b-form-group>
        </b-row>

        </div>

      <div style="marginLeft:50px">

        <b-button variant="outline-primary" style="marginLeft:5%" v-b-modal.modal-1>
          Add new dates for renting
          <b-avatar variant="light" style="marginLeft:3px" src="../assets/interface.png"></b-avatar>
        </b-button>
        <b-form-group
          style="marginTop:4.5%"
          v-for="period in apartment.datesForRenting"
          v-bind:key="period"
        >
          <b-card style="marginLeft:10px">
            <label for="example-datepicker">Avaliable for renting from:</label>
            <b-form-datepicker disabled="true" :value="period.from" class="mb-2" style="width:300px"></b-form-datepicker>

            <label for="example-datepicker">To:</label>
            <b-form-datepicker  disabled="true" :value="period.to" class="mb-2" style="width:300px;marginTop:4px"></b-form-datepicker>
          </b-card>
          
        </b-form-group>
        </div>

        <b-button
          style="marginLeft:80%;width:200px;marginTop:2%"
          id="submit-button"
          variant="outline-primary"
          type="submit"
          size="sm"
        >Update</b-button>
      </b-form>
    </b-card>

    <b-modal id="modal-1" title="Add new dates" hide-footer="true">
      <form v-on:submit.prevent="addNewDate">
        <b-form-group>
          <label for="example-datepicker">Rent from:</label>
          <b-form-datepicker :min="minDate"  v-model="rentPeriod.from" class="mb-2" style="width:300px"></b-form-datepicker>
        </b-form-group>

        <b-form-group>
          <label for="example-datepicker">Rent to:</label>
          <b-form-datepicker :min="minDate" v-model="rentPeriod.to" class="mb-2" style="width:300px"></b-form-datepicker>
        </b-form-group>
        <b-button  id="submit-button" variant="outline-primary" type="submit" size="sm">Add</b-button>
      </form>
    </b-modal>
  </div>

  
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  name: "EditApartment",
  data() {
    return {
      apartment: {},
      rentPeriod: { from: "", to: "" },
      minDate: new Date(),
      minDateTo: new Date() + 1,
      value: [],
      options: [
        { value: "none", text: "Please select an option" },
        { value: "ROOM", text: "Room" },
        { value: "ENTIREPLACE", text: "Entire place" }
      ],
      checkAmenities: [],
      optionsGuests: [
        { value: "none", text: "Please select an option" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" }
      ],
      optionsAmenities: [],

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

  beforeCreate() {
    this.$http
      .get(
        `http://localhost:8082/PocetniREST/rest/apartments/{idOne}${this.$route.params.id}`,
        { headers: this.headers }
      )
      .then(response => {
        this.apartment = response.body;
        console.log(this.apartment);
      });
  },

  created() {
    this.$http
      .get(
        `http://localhost:8082/PocetniREST/rest/amenity/avaliable/{idOne}${this.$route.params.id}`,
        { headers: this.headers }
      )
      .then(response => {
        console.log(response);

        response.body.forEach(element => {
          this.optionsAmenities.push({
            name: element.name,
            image: element.image,
            amenityStatus: element.amenityStatus,
            idOne: element.idOne
          });
          console.log(element);
        });
      });

      if(this.$session.exists()){
        this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {
      
      if(response.status == 400){
          this.$swal('Error');
      }else{
        if (response.body.role === "GUEST"){
          this.$router.push('/');
      }     
      }
    })
                 
  }
  },
  methods: {
    addNewDate: function() {
      var object = { from: this.rentPeriod.from, to: this.rentPeriod.to };
      console.log(object);

      if(this.rentPeriod.from == '' || this.rentPeriod.to == ''){
         this.$swal('You have to enter start and end date of rent period.');
      }

      this.$http
        .post(
          `http://localhost:8082/PocetniREST/rest/apartments/adddate/{idOne}${this.$route.params.id}`,
          object,
          { headers: this.headers }
        )
        .then(
          () => {
            location.reload();
          },
          response => {
            if (response.status == 400) {
              this.$swal("error");
            }
          }
        );
    }, 
     edit: function() {
       if(this.apartment.location.address.zipCode == ''){
          this.$swal("Zip code can not be empty");
        return;
       }

       this.apartment.amenities = this.value;
      this.$http.post(`http://localhost:8082/PocetniREST/rest/editapartment`,this.apartment,{ headers: this.headers}).then(() => {
            this.$swal("Successfully edited apartment");
            location.reload();
          },
          response => {
            if (response.status == 400) {
              this.$swal("error");
              }
          }
        );
    }
  }
};
</script>

<style scoped>
</style>
