<template>

    <div>
        <b-card class="card">
        <b-form>

        <b-form-group label="Apartment name">
        <b-form-input id="input-2" placeholder="Name" v-model="this.apartment.name" style="width:300px"></b-form-input >
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
            <b-form-timepicker v-model="value" locale="en" hour12="false"></b-form-timepicker>  
            </b-form-group>


            <b-form-group id="input-group-1" label="Check out time" label-for="input-1" style="width:150px;padding:10px">
            <b-form-timepicker v-model="value" locale="en" hour12="false"></b-form-timepicker>   
            </b-form-group> 
        </b-row>
            
        <b-form-group id="input-group-1" label="Status" label-for="input-1" style="width:150px">
                <b-form-select v-model="apartment.status" :options="optionsStatus"></b-form-select>
        </b-form-group>
       
        <b-form-group id="input-group-1" label="Amenities" label-for="input-1" style="width:150px">
            <b-form-select v-model="apartment.amenities"></b-form-select>
        </b-form-group>


        <b-form-group label="Enter address">
            

        </b-form-group>

        </b-form>
        </b-card>

        <b-card v-if="apartment.photoPath.length > 0"  class="photocard">
                <b-img :src="apartment.photoPath" class="apartmentPhoto"></b-img>
            </b-card>


    </div>
          
  
</template>

<script>

export default {
  name: "AddApartment",
  data() {
    return {
      host:'',
      isHost:'',
      apartment:{type:'',numberOfRooms:'',numberOfGuests:'',datesForRenting:[],host:'',photoPath:'',checkInTime:'',checkOutTime:'',status:'',amenities:[],name:''},
      location:{gWidth:'',gHeight:'',adress:{street:'',number:'',city:'',zipCode:''}},
      selected: null,
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
      ],optionsStatus: [
        { value: "none", text: "Please select an option" },
        { value: "ACTIVE", text: "Active" },
        { value: "DELETED", text: "Deleted"},
      ],
        value: '',
      headers : {
        'Content-Type' : 'application/json'
      }
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

    validate: function(query) {
        return fetch(`https://geocoder.api.here.com/6.2/geocode.json?app_id=APP_ID_HERE&app_code=APP_CODE_HERE&searchtext=${query}`)
            .then(result => result.json())
            .then(result => {
                if(result.Response.View.length > 0 && result.Response.View[0].Result.length > 0) {
                    let data = result.Response.View[0].Result[0];
                    return data;
                }
            }, error => {
                console.error(error);
            });
    }    
    
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

  } 

  

};
</script>

<style scoped>

.card{

    margin-top: 7%;
    margin-left: 20%;
    width: 26%;
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
