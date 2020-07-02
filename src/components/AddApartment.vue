<template>

    <div>

       <b-button variant="outline-light" style="marginTop:0%;marginLeft:0%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>

        <b-card  style="marginTop:5%;width:300px;padding:10px;textAlign:center" >
          <div v-b-tooltip.hover title="New guests are waiting for what your apartment has to offer! Hurry up and add your apartment to our site.">
          <b-img src="../assets/add.png" style="height:100px;width:100px;position:fixed" ></b-img>
          <b-img src="../assets/beachhouse.png" style="height:100px;width:100px;marginLeft:50%" ></b-img>
          </div>

        </b-card>
    
        <b-card class="card">

        <b-form @submit.prevent="submitInfo" inline>
        
        <b-row style="marginLeft:10px">
        <b-form-group style="marginLeft:20px" >
          <label style="marginTop:3px;marginBottom:3px" >Apartment name</label>
        <b-form-input id="input-2" placeholder="Name" v-model="apartment.name" style="width:300px"></b-form-input >
        </b-form-group>

        <b-form-group>
            <b-form-file  style="width:350px;marginTop:31px;marginLeft:10px" accept="image/*" @change="onFileSelected" type="file" placeholder=" Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
        </b-form-group>

       </b-row>

        <b-form-group  style="marginLeft:30px" id="input-group-1" label-for="input-1">
          <label style="marginTop:3px;marginBottom:3px">Apartment type</label>
            <b-form-select  v-model="apartment.type" :options="options" style="width:300px" ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" style="marginLeft:10px" label-for="input-2" v-if="!isRoom">
          <label style="marginTop:3px;marginBottom:3px" >Number of rooms</label>
            <b-form-input v-model="apartment.numberOfRooms" id="input-2" style="width:300px" ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1"  style="marginLeft:2%;width:150px" label-for="input-1">
          <label style="marginBottom:3px">Number of guests</label>
            <b-form-select v-model="apartment.numberOfGuests" :options="optionsGuests" style="width:300px"></b-form-select>
        </b-form-group>
        
        <b-row inline style="marginLeft:14%;marginTop:2%">
            <b-form-group id="input-group-1"  label="Check in time" label-for="input-1" style="width:150px;marginLeft:4px">
            <b-form-timepicker v-model="apartment.checkInTime" locale="en"></b-form-timepicker>  
            </b-form-group>


            <b-form-group id="input-group-1" label="Check out time" label-for="input-1" style="width:150px;marginLeft:15px">
            <b-form-timepicker v-model="apartment.checkOutTime" locale="en"></b-form-timepicker>   
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
              style="marginLeft:25%;marginTop:10%;width:200px"

              
              @input="seeValues">
          </multiselect> 
          
          

          </b-list-group>

        </b-row>
        
        

        <b-form-group label="Enter price" style="marginLeft:8.5%">

            <b-img style="marginBottom:7px;marginRight:7px;height:30px;width:30px" variant="light" src="../assets/money.png"></b-img>
             <b-form-input  v-model="apartment.price" id="input-2" type=number style="width:300px;marginBottom:10px" ></b-form-input>
             
        
        </b-form-group>

        
        <b-row inline>
        <b-form-group style="marginLeft:16%" >
             <b-form-input placeholder="Street" v-model="address.street" id="input-2" style="width:150px" ></b-form-input>
        </b-form-group>

        <b-form-group>
            
             <b-form-input  placeholder="Number" v-model="address.number" id="input-2" style="width:80px;marginLeft:20px" ></b-form-input>
        </b-form-group>
        </b-row>
        
        <b-row inline>
        <b-form-group style="marginLeft:15%">
             <b-form-input placeholder="City" v-model="address.city" id="input-2" style="width:80px;;marginLeft:50px;marginTop:13%" ></b-form-input>
             <b-form-input placeholder="Zipcode" v-model="address.zipCode" id="input-2" style="width:90px;marginLeft:20px;marginTop:13%" ></b-form-input>
        </b-form-group>
        </b-row>
        
        

        <b-form-group style="marginLeft:18.5%;marginTop:20px">
            <label for="example-datepicker">Rent from:</label>
            <b-form-datepicker :min="minDate" v-model="apartment.from"  class="mb-2" style="width:300px"></b-form-datepicker>
        </b-form-group>

        <b-form-group style="marginLeft:3%;marginTop:20px"> 
            <label for="example-datepicker">Rent to:</label>
            <b-form-datepicker :min="minDate" v-model="apartment.to" class="mb-2" style="width:300px"></b-form-datepicker>
        </b-form-group>
         <b-button style="marginLeft:80%;width:200px;marginTop:2%" id="submit-button" variant="outline-primary"  type="submit" size="sm">Create</b-button>  


        </b-form>

         <b-card v-if="apartment.photoPath.length > 0"  class="photocard">
           <h1>Apartment photo</h1>
                <b-img :src="apartment.photoPath" class="apartmentPhoto"></b-img>
            </b-card>
        </b-card>

       




    </div>
          
  
</template>



<script>

import Multiselect from 'vue-multiselect'

export default {

  components: {
    Multiselect
  },
  name: "AddApartment",
  data() {
    return {
      host:'',
      minDate: new Date(),
      minDateTo: new Date()+1,
      isHost:'',
      apartment:{price:'',from:'',to:'',type:'',numberOfRooms:'',numberOfGuests:'',datesForRenting:[],host:'',photoPath:'',checkInTime:'',checkOutTime:'',status:'',amenities:[],name:''},
      location:{gWidth:'',gHeight:'',address:''},
      address:{street:'',number:'',city:'',zipCode:''},
      selected: null,
      optionsAmenities:[],
      value:[],
      options: [
        { value: "none", text: "Please select an option" },
        { value: "ROOM", text: "Room" },
        { value: "ENTIREPLACE", text: "Entire place" },
      ],
      optionsGuests: [
        { value: "none", text: "Please select an option" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
      ],
      headers : {
        'Content-Type' : 'application/json'
      },

    }
  },
  computed:{
            isRoom: function(){

                if(this.apartment.type == "ROOM"){
                    return true;     
                } else{
                    return false;
                }                 
          }

  },
  methods: {

    seeValues: function(){

      console.log(this.value);
      
    },

    CheckedAmenity: function(name){

        console.log(document.getElementsByName("wifi"));
        
        if(document.getElementsByName(name)[0].checked == true){
          this.apartment.amenities.push(name)
        }else{
          this.apartment.amenities.forEach(a => {
            
              if(a == name){
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
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.apartment.photoPath = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },

         backToHome : function(){
            this.$router.push('/');
       },

    
    submitInfo: function(){

      console.log(this.apartment);
      console.log(this.host);
      
      console.log(this.address);
      
      
      console.log(this.value);
      
        
        //var from = moment(this.apartment.from,'YYYY-MM-DD').format('YYYY-MM-DD');
        //var to = moment(this.apartment.to,'YYYY-MM-DD').format('YYYY-MM-DD');

        

        var datesForRenting = [];
        var onePeriod = {from: this.apartment.from,to:this.apartment.to};
        datesForRenting.push(onePeriod);

        console.log(datesForRenting);

        var fullstreet = this.address.street.replace(' ', '%20')+'%20'+this.address.number;
        console.log(fullstreet);

        

        
      this.$http.get(`https://eu1.locationiq.com/v1/search.php?key=10295fe5fa497d&q=${fullstreet}&format=json`).then((response) =>{
        
        if(response.ok){

          console.log(response.body[0].lat);
          
         this.location.gWidth =  response.body[0].lat;
         this.location.gHeight =  response.body[0].lon;

         console.log(this.location);
         
         

        }
      }, (response) => {
        if(response.status == 400){
          this.$swal('Error with geocoding');
        }
      });

        
        this.location.address = this.address;
        console.log(this.location);
        
        console.log(JSON.stringify( this.location));     

        var objekat =  {
        
        type:this.apartment.type,
        numberOfRooms:this.apartment.numberOfRooms,
        numberOfGuests:this.apartment.numberOfGuests,
        location: this.location,
        datesForRenting:datesForRenting,
        freeDates:[],
        host:this.host.username,
        comments:[],
        photoPath:this.apartment.photoPath,
        price: this.apartment.price,
        checkInTime:this.apartment.checkInTime,
        checkOutTime:this.apartment.checkOutTime,
        status:'ACTIVE',
        amenities:this.value,
        reservations:[],
        name:this.apartment.name,
        idOne: ''}

        console.log(objekat);
        

        
        
        this.$http.post('http://localhost:8082/PocetniREST/rest/apartmentsadd', objekat,{headers:this.headers}).then(() => {
          this.$swal('Added successfully!');
          this.$router.push('/');
        }, (response) => {
          if(response.status == 400){
            this.$swal("Error please try again.");
          }
        })
    
    },


    
  },


   created(){
      
    if(this.$session.exists()){

        this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {
      
      if(response.status == 400){
          this.$swal('Error');
      }else{
      
      this.host = response.body;
        
      if(this.host.role === "HOST"){
        this.isHost = true;
      } else if (response.body.role === "ADMIN"){
        this.$router.push('/');
          location.reload();
      } else if (response.body.role === "GUEST"){
        this.$router.push('/');
          location.reload();
      }

      
        
      }
    })
                 
  }

  this.$http.get('http://localhost:8082/PocetniREST/rest/amenity/all',{headers:this.headers}).then(response =>{
        

        response.body.forEach(element => {
          
          this. optionsAmenities.push({name:element.name,image:element.image,amenityStatus:element.amenityStatus,idOne:element.idOne});     
        });

        console.log(this. optionsAmenities);
        console.log(this.options);
        
        

      })

   }

};
</script>

<style scoped>

.card{

    margin-top: 2%;
    margin-left: 5%;
    width: 90%;
    height: 50%;
 
    

}

.apartmentPhoto{
    width: 600px;
    height: 400px;
}

.photocard{
    margin-top:2%;
    margin-left:0%;
    width: auto;
    height: auto;
    
}

</style>
