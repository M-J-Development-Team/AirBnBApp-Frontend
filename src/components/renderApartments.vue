<template>
  <div>
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
</style>
