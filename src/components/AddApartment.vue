<template>

    <div>

       <b-button variant="outline-light" style="marginTop:7%;marginLeft:5%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>

    
        <b-card class="card">
        <b-form @submit.prevent="submitInfo">

        <b-form-group label="Apartment name">
        <b-form-input id="input-2" placeholder="Name" v-model="apartment.name" style="width:300px"></b-form-input >
        </b-form-group>

        <b-form-group>
            <b-form-file  style="width:300px" accept="image/*" @change="onFileSelected" type="file" placeholder=" Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
        </b-form-group>

        <b-form-group id="input-group-1" label="Apartment type" label-for="input-1">
            <b-form-select  v-model="apartment.type" :options="options" style="width:300px" ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" v-model="apartment.numberOfRooms" label="Number of rooms" label-for="input-2" v-if="!isRoom">
            <b-form-input id="input-2" style="width:300px" ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Number of guests" label-for="input-1" style="width:150px">
            <b-form-select v-model="apartment.numberOfGuests" :options="optionsGuests" style="width:300px"></b-form-select>
        </b-form-group>
        
        <b-row inline>
            <b-form-group id="input-group-1" label="Check in time" label-for="input-1" style="width:150px;padding:10px;marginLeft:4px">
            <b-form-timepicker v-model="apartment.checkInTime" locale="en" ></b-form-timepicker>  
            </b-form-group>


            <b-form-group id="input-group-1" label="Check out time" label-for="input-1" style="width:150px;padding:10px">
            <b-form-timepicker v-model="apartment.checkOutTime" locale="en"></b-form-timepicker>   
            </b-form-group> 

            <b-list-group label="Amenities" style="width:100%;marginTop:20px;">

            <multiselect
             v-model="value"
              :multiple="true"
              :close-on-select="true"
              placeholder="Pick some"
              track-by="name"
              :clear-on-select="false"
              :preserve-search="true"       
              :options="optionsAmenities"
              label="name"
              
              @input="seeValues">
          </multiselect> 
          

          </b-list-group>

        </b-row>
        
        

        <b-form-group label="Enter price">
             <b-form-input  v-model="apartment.price" id="input-2" style="width:300px" ></b-form-input>
        </b-form-group>

        <b-row inline>
        <b-form-group label="Enter address and number" >
             <b-form-input  v-model="address.street" id="input-2" style="width:150px" ></b-form-input>
             <b-form-input  placeholder="number" v-model="address.number" id="input-2" style="width:80px;marginTop:10px" ></b-form-input>
        </b-form-group>
        </b-row>
        
        <b-row inline>
        <b-form-group label="Enter city and zip code">
             <b-form-input placeholder="city" v-model="address.city" id="input-2" style="width:80px;marginTop:10px" ></b-form-input>
             <b-form-input placeholder="zipcode" v-model="address.zipCode" id="input-2" style="width:80px;marginTop:10px" ></b-form-input>
        </b-form-group>
        </b-row>

        <b-form-group>
            <label for="example-datepicker">Rent from:</label>
            <b-form-datepicker v-model="apartment.from"  class="mb-2" style="width:300px"></b-form-datepicker>
        </b-form-group>

        <b-form-group>
            <label for="example-datepicker">Rent to:</label>
            <b-form-datepicker v-model="apartment.to" class="mb-2" style="width:300px"></b-form-datepicker>
        </b-form-group>

         <b-button id="submit-button" variant="outline-primary"  type="submit" size="sm">Create</b-button>  


        </b-form>
        </b-card>

        <b-card v-if="apartment.photoPath.length > 0"  class="photocard">
                <b-img :src="apartment.photoPath" class="apartmentPhoto"></b-img>
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
         

        }
      }, (response) => {
        if(response.status == 400){
          this.$swal('Error with geocoding');
        }
      });

        
        this.location.address = this.address;
        console.log(this.location);
        
        console.log(JSON.stringify( this.location));     

        var adresa = {
          street : this.address.street,
          number : this.address.number,
          city :  this.address.city,
          zipCode :  this.address.zipCode
        }

        var lokacija = {

          gWidth: this.location.gWidth,
          gHeight: this.location.gHeight,
          address : adresa

        }
        


        var objekat =  {
        
        type:this.apartment.type,
        numberOfRooms:this.apartment.numberOfRooms,
        numberOfGuests:this.apartment.numberOfGuests,
        location: lokacija,
        datesForRenting:datesForRenting,
        freeDates:[],
        host:this.host.username,
        comments:[],
        photoPath:this.apartment.photoPath,
        idOne:'',
        price: this.apartment.price,
        checkInTime:this.apartment.checkInTime,
        checkOutTime:this.apartment.checkOutTime,
        status:'ACTIVE',
        amenities:this.value,
        reservations:[],
        name:this.apartment.name}

        console.log(objekat);
        

        
        
        this.$http.post('http://localhost:8082/PocetniREST/rest/apartmentsadd', objekat,{headers:this.headers}).then(() => {
          alert('Uspesno!');
          this.$router.push('/');
        }, (response) => {
          if(response.status == 400){
            alert('Neuspesno');
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

    margin-top: 7%;
    margin-left: 20%;
    width: 28%;
    height: auto;
    position: absolute;

}

.apartmentPhoto{
    width: 300px;
    height: 300px;
}

.photocard{
    margin-top:7%;
    margin-left:50%;
    margin-bottom:10px;
    position:absolute;
    width: auto;
    height: auto;
}

</style>
