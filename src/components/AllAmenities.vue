<template>

    <div >
        <b-button variant="outline-light" style="marginTop:10%;marginLeft:13%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>
        
        <b-card class="card">
            <h1>Amenities</h1>
         <b-input id="input-lg" style="marginTop:10px" size="sm" placeholder="Enter name" type="search" @input="filterAmenities" v-model="parameter"></b-input >

        <b-list-group style="width:100%;marginTop:20px;" v-for="amenity in amenities" @input="filterAmenities" v-bind:key="amenity.name">

            <b-list-group-item class="d-flex align-items-center">
                <span class="mr-auto"> {{amenity.name}}</span>
                <b-button variant="outline-danger" v-on:click="deleteAmenity(amenity.name)">Delete</b-button>
            </b-list-group-item>
    
    </b-list-group>
   
    </b-card>   
  </div>
</template>

<script>

export default {
  name: "AllAmenities",
  data() {
    return {
        amenities: [],
        parameter: "",
        allAmenities:[],
        
        headers : {
          'Content-Type' : 'application/json'
        }
      }
  },

  methods : {   
      
       filterAmenities : function(p){

                console.log(p);

                if(p == ""){
                    this.amenities = this.allAmenities;
                }
                
                this.amenities = this.amenities.filter(amenity => (amenity.name.indexOf(p) > -1) );
             
       },

       deleteAmenity(name) {
        this.$http.delete(`http://localhost:8082/PocetniREST/rest/amenity/delete/${name}`,{headers:this.headers}).then(() =>{
          alert('Amenity is deleted!')
          window.location.reload();
          
        })
      },

       backToHome : function(){
            this.$router.push('/');
       }
  
  },

  

   beforeCreate(){
        this.$http.get('http://localhost:8082/PocetniREST/rest/amenity/all',{headers:this.headers}).then((response) => {
            response.body.forEach(element => {

                  this.amenities.push(element);
                  this.allAmenities.push(element)
                
            });
            });
        },

};
</script>

<style scoped>

.card{

    margin-top:10%;
    margin-left: 25%;
    width: 50%;
    height: auto;
    position: absolute;
}

</style>
