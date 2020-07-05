<template>
  <div>
    
      <div class="filters">
        <b-dropdown text="Sort by" variant="light" style="marginLeft:-10px;marginBottom:15px">
          <b-dropdown-item href="#">Ascending</b-dropdown-item>
          <b-dropdown-item href="#">Descending</b-dropdown-item>
        </b-dropdown>

        <div class="filteringDiv">
          <label for="">Location</label>
          <br>
          <input type="text" v-model="location" class="firstInput" placeholder="Location"/>
          <br>
          <br>
          <label>Date</label>
          <br>
          <b-form-datepicker style="marginTop:10px;width:195px" id="example-datepicker" v-model="startDate" class="mb-2"></b-form-datepicker>
          <b-form-datepicker style="marginTop:10px;width:195px" v-model="endDate" class="mb-2"></b-form-datepicker>
          <label>Price</label>
          <br>
          <input class="inputs" v-model="startPrice" type="dropdown" placeholder="From" />
          <input class="inputs" v-model="endPrice" type="dropdown" placeholder="To" />
          <br>
          <br>
          <label>Number of rooms</label>
          <br>
          <input class="inputs" v-model="numberOfRoomsFrom" type="dropdown" placeholder="From" />
          <input class="inputs" v-model="numberOfRoomsTo" type="dropdown" placeholder="To" />
          <br>
          <br>
          <label>Number of guests</label>
          <input class="inputs" v-model="numberOfGuests" style="width:150px" type="text" placeholder="Guests" />
          <b-button @click="filterApartments" class="searchButton" variant="outline-dark">
            <b-img style="width:20px;height:20px;marginLeft:2px" src="../assets/search (1).svg"></b-img>Search
          </b-button>
        </div>
      </div>
    <div class="apartmentContainer" v-if="isLoggedInGuest">  
        <b-card @click="view(apartment.idOne)" v-for="apartment in this.apartments"  v-bind:key="apartment.idOne" class="oneApartmentGuest">
            <b-card-header style="backgroundColor:transparent">
            <b-img class="mr-3" v-if="apartment.photoPath !== 0"  variant="light" style="height:150ox;width:150px" :src="apartment.photoPath"></b-img>
            <b-img class="mr-3" v-if="apartment.photoPath == 0"  variant="light" style="height:150ox;width:150px" src="../assets/house.png"></b-img>
            </b-card-header>
            <b-card-body style="textAlign:center">
             <a class="button">{{apartment.name}}</a> 
            </b-card-body>          
        </b-card>
    </div> 
     <div @click="view(apartment.idOne)" class="apartmentContainer" v-if="!isLoggedInGuest">  
        <b-card v-for="apartment in this.apartments"  v-bind:key="apartment.idOne" class="oneApartment">
            <b-card-header>
            <b-img class="mr-3"  variant="light" style="height:250px;width:250px;marginTop:5px" :src="apartment.photoPath"></b-img>
            </b-card-header>
            <b-card-body style="textAlign:center">
             <a class="button">{{apartment.name}}</a> 
            </b-card-body>          
        </b-card>
    </div> 
  </div>    
</template>

<script>
export default {
  name: "renderApartments",
  props: ['isLoggedInGuest'],
  data() {
    return {
      apartments: [],
      startDate: "",
      endDate: "",
      startPrice: "",
      endPrice: "",
      location: "",
      numberOfRoomsFrom: "",
      numberOfRoomsTo: "",
      numberOfGuests: "",
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },

      created(){
        console.log(this.isLoggedInGuest);
        this.$http.get(`http://localhost:8082/PocetniREST/rest/apartments/all-active`,{headers:this.headers}).then(response =>{
        
        this.apartments = response.body; 
        console.log(this.apartments)

        })

  },

  methods : {
        view: function(id){

        this.$router.push(`/view/${id}`);
    },

    filterApartments() {
      var filter = {
        startDate : this.startDate,
        endDate : this.endDate,
        startPrice : this.startPrice,
        endPrice : this.endPrice,
        location : this.location,
        numberOfRoomsFrom : this.numberOfRoomsFrom,
        numberOfRoomsTo : this.numberOfRoomsTo,
        numberOfGuests : this.numberOfGuests
      }

      console.log(filter);

      this.$http.post(`http://localhost:8082/PocetniREST/rest/apartments/filter`,filter, {headers:this.headers}).then(response =>{
        this.apartments = response.body; 
        console.log(this.apartments)

        })
    }
  }

};
</script>

<style scoped>
.oneApartment{
    margin-top: 10px;
    width:25%;
    text-align: center;
    margin-left: 2%;
    border-radius: 10px;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    cursor: pointer;
 
}

.oneApartmentGuest{
    margin-top: 10px;
    width:auto;
    text-align: center;
    margin-left: 1.5%;
    border-radius: 10px;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    cursor: pointer;
}

.apartmentContainer{
    display: table;
    justify-content: space-around;
    flex-direction: row;
    width: 80%;
}


.button{
    text-align: center;
    background-color: rgb(209, 231, 253);
    border-radius: 5px;
    margin-top: 5%;
    cursor: pointer;
}

.guestFiltersDiv {
  margin-left: 1.5%;
  width: 100%;
}

.filteringDiv {
  width: auto;
  margin-bottom: 2%;
}
.filters {
  margin-left: 2%;
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
