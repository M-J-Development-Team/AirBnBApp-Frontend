<template>
  <div>
     <b-button variant="outline-light" style="marginTop:-5%;marginLeft:5%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>
    <b-card
      style="marginTop:10%;width:80%;marginLeft:5%;height:40%;textAlign:center"
      v-if="apartment.photoPath.length > 0"
      class="photocard"
    >
      <h1 stle=" textTransform:capitalize">{{apartment.name}}</h1>
      <b-img :src="apartment.photoPath" style="width:50%;height:40%"></b-img>
    </b-card>

    <b-card style="marginTop:2%;width:80%;marginLeft:5%;height:auto">

        <div style="padding:15px">
            <b-row >
                <b-form-group >
                <label >Apartment name</label>
                <b-form-input
                    id="input-2"
                    :value="apartment.name"
                    readonly="true"
                    style="width:300px"
                ></b-form-input>
                </b-form-group>
            </b-row>

            <b-form-group style="marginLeft:-14px;marginTop:5px" >
                <label >Apartment type</label>
                <b-input style="width:300px" :value="apartment.type" readonly="true" ></b-input>
            </b-form-group>

            <b-form-group id="input-group-2" label-for="input-2" v-if="apartment.type != 'ROOM'" style="marginTop:5px">
            <label >Number of rooms</label>          
                <b-form-input :value="apartment.numberOfRooms" readonly="true" style="width:300px;marginLeft:-14px"></b-form-input>
            </b-form-group>
            

            <b-form-group id="input-group-1" style="marginTop:5px;marginLeft:-14px" label-for="input-1">
            <label>Number of guests</label>
            <b-form-input  :value="apartment.numberOfGuests" readonly="true" style="width:300px"></b-form-input>
            </b-form-group>
        </div>

        <div>       
            <b-form-group
                id="input-group-1"
                :value="apartment.checkInTime"
                label="Check in time"
                label-for="input-1"
                style="width:150px;marginLeft:0px"
            >
                <b-form-timepicker :value="apartment.checkInTime" readonly="true" locale="en"></b-form-timepicker></b-form-group>

            <b-form-group
                id="input-group-1"
                :value="apartment.checkOutTime"
                label="Check out time"
                label-for="input-1"
                style="width:150px;marginLeft:0px"
            >
                <b-form-timepicker :value="apartment.checkOutTime" readonly="true" locale="en"></b-form-timepicker></b-form-group>
          </div>

          <div style="width:50%">
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
          <div>
        <b-form-group label="Price">
          <b-img
            style="marginBottom:7px;marginRight:7px;height:30px;width:30px"
            variant="light"
            src="../assets/money.png"
          ></b-img>
          <b-form-input
            :value="apartment.price"
            readonly="true"
            :placeholder="apartment.price"
            id="input-2"
            type="number"
            style="width:300px;marginBottom:10px"
          ></b-form-input>
        </b-form-group>

        </div>

        <div style="borderStyle:solid;borderWidth:1px;width:300px;height:auto;textAlign:center">
        <b-row >
          <b-form-group label="Address">
            <b-form-input
            style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.street"
              :value="apartment.location.address.street"
              readonly="true"
              
            ></b-form-input>
            <br/>
            <b-form-input
              style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.number"
              :value="apartment.location.address.number"
              readonly="true"             
            ></b-form-input>
          </b-form-group>
        </b-row>

        <b-row>
          <b-form-group >
            <br/>
            <b-form-input
               style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.city"
              :value="apartment.location.address.city"
              readonly="true"
              
            ></b-form-input>
            <br/>
            <b-form-input
               style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.zipCode"
              :value="apartment.location.address.zipCode"
              readonly="true"
            ></b-form-input>
          </b-form-group>
        </b-row>
        </div>
        
          <b-button
            class="reserveButton"
            v-on:click="checkToReserve(apartment.name)"
          >Check for free dates</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ViewApartment",
  data() {
    return {
      apartment: {},
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },

       beforeCreate() {
        this.$http.get(`http://localhost:8082/PocetniREST/rest/apartments/{idOne}${this.$route.params.id}`,{ headers: this.headers })
      .then(response => {
        this.apartment = response.body;
        console.log(this.apartment);
      });
  },

  methods : {

       backToHome : function(){
            this.$router.push('/');
       },
       checkToReserve(id) {
      this.$router.push(`/reservethis/${id}`);
    }

  }

};
</script>

<style scoped>

.reserveButton {
  margin-left: 60%;
  margin-top: -180%;
}
</style>
