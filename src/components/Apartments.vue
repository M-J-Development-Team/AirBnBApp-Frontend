<template>

    <div>
             <b-button variant="outline-light" style="marginTop:9%;marginLeft:1%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>

        <b-card class="card" v-if="isHost">
          <b-row inline v-if="isHost">
          <b-avatar variant="light" style="height:60px;width:60px" src="../assets/tick.png" v-if="isHost"></b-avatar>
          <h1 v-if="isHost" style="padding:5px">My active apartments</h1>
          </b-row>
         <b-input v-if="isHost" id="input-lg" style="marginTop:10px" size="sm" placeholder="Enter apartment name" @input="filterActiveApartments" v-model="parameter" type="search" ></b-input >

        <div v-if="isHost">
        <b-list-group style="width:100%;marginTop:20px;" v-for="apartment in this.apartmentsActive"  v-bind:key="apartment.idOne">

            <b-list-group-item class="d-flex align-items-center">
                <b-avatar class="mr-3" style="height:50px;width:50px" variant="light" src="../assets/location-pin.png" ></b-avatar>
                <span class="mr-auto">{{apartment.name}}</span>

                 <b-button variant="outline-success" @click="edit(apartment.idOne)" >Edit</b-button>
                 <b-button style="marginLeft:7px" variant="outline-danger" @click="deleteApartment(apartment.idOne)">Delete</b-button>

            </b-list-group-item>
        </b-list-group>
        </div>


        </b-card>

        <b-card v-if="isAdmin" style="marginLeft:27%">

          <div v-if="isAdmin">
        <b-list-group style="width:100%;marginTop:20px;" v-for="apartment in this.allApartments"  v-bind:key="apartment.idOne">

            <b-list-group-item class="d-flex align-items-center">
                <b-avatar class="mr-3"  variant="light" src="../assets/location-pin.png" ></b-avatar>
                <span class="mr-auto">{{apartment.name}}
                  <b-badge>{{apartment.status}}</b-badge>
                </span>

                 <b-button variant="outline-primary" @click="edit(apartment.idOne)">Edit</b-button>
                 <b-button style="marginLeft:7px" variant="outline-primary" @click="deleteApartment(apartment.idOne)">Delete</b-button>

            </b-list-group-item>
        </b-list-group>
        </div>

        </b-card>

        <b-card v-if="isHost" class="deletedApartments">
          <b-row inline>
          <b-avatar variant="light" style="height:60px;width:60px" src="../assets/close (3).png"></b-avatar>
        <h1 v-if="isHost" style="padding:6px">My inactive apartments</h1>
        </b-row>
        <b-input id="input-lg" style="marginTop:10px" size="sm" placeholder="Enter apartment name" @input="filterInactiveApartments" v-model="parameterD" type="search" ></b-input >

             <b-list-group style="width:100%;marginTop:20px;" v-for="apartment in this.apartmentsInactive"  v-bind:key="apartment.idOne">

            <b-list-group-item class="d-flex align-items-center">
                <b-avatar class="mr-3"  variant="light" style="height:50px;width:50px" src="../assets/location-pin.png" ></b-avatar>
                <span class="mr-auto">{{apartment.name}}</span>
                <b-button variant="outline-success" @click="edit(apartment.idOne)">Edit</b-button>
                <b-button style="marginLeft:7px" variant="outline-danger" @click="deleteApartment(apartment.idOne)">Delete</b-button>

            </b-list-group-item>

    </b-list-group>
        </b-card>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
    apartmentsActive:[],
    parameter:'',
    parameterIn:'',
    allActive:[],
    allInactive:[],
    apartmentsInactive:[],
    allApartments:[],
    user:'',
    isAdmin:'',
    isHost:'',
    apartment:{price:'',from:'',to:'',type:'',numberOfRooms:'',numberOfGuests:'',datesForRenting:[],host:'',photoPath:'',checkInTime:'',checkOutTime:'',status:'',amenities:[],name:''},
      location:{gWidth:'',gHeight:'',address:''},
      address:{street:'',number:'',city:'',zipCode:''},
      value:[],
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },
  methods:{
    backToHome : function(){
            this.$router.push('/');
       },

    deleteApartment: function(id){

      this.$http.delete(`http://localhost:8082/PocetniREST/rest/apartments/delete/${id}`,{headers:this.headers}).then(response =>{
        location.reload();
        console.log(response.body);


        })
    },

    edit: function(id){

        this.$router.push(`/edit/${id}`);
    },

     filterActiveApartments : function(p){
                if(p == ""){
                    this.apartmentsActive = this.allActive;
                }
                this.apartmentsActive = this.apartmentsActive.filter(a => (a.name.indexOf(p) > -1));
       },

        filterInactiveApartments : function(p){
                if(p == ""){
                    this.apartmentsInactive = this.allInactive;
                }
                this.apartmentsInactive = this.apartmentsInactive.filter(a => (a.name.indexOf(p) > -1));
       },
  

    filterAllApartments : function(p){
       console.log(p);


                if(p == ""){
                    this.apartmentsAll = this.allApartments;
                }

                this.apartmentsAll = this.apartmentsAll.filter(apartment => (apartment.name.indexOf(p) > -1) );
                console.log()
       },

       },


  created(){

      if(this.$session.exists()){

        this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {

      if(response.status == 400){
          this.$swal('Error');
      }else{

      this.user = response.body;
      console.log(this.user);


      if(this.user.role === "HOST"){

        this.isHost = true;

        this.$http.get(`http://localhost:8082/PocetniREST/rest/apartments/all/${this.$session.get('idOne')}`,{headers:this.headers}).then(response =>{

        this.apartmentsActive = response.body;
        this.allActive =  response.body;
        console.log(this.apartmentsActive);

        this.allApartments = response.body;


        })

        this.$http.get(`http://localhost:8082/PocetniREST/rest/apartments/inactive/all/{idOne}${this.$session.get('idOne')}`,{headers:this.headers}).then(response =>{

        this.apartmentsInactive = response.body;
        this.allInactive = response.body;
        console.log(this.apartmentsInactive);
        })

         this.$http.get(`http://localhost:8082/PocetniREST/rest/apartments/all`,{headers:this.headers}).then(response =>{

            this.allApartments = response.body;

            })


      } else if (this.user.role === "ADMIN"){

        this.isAdmin = true;

          this.$http.get(`http://localhost:8082/PocetniREST/rest/apartments/all`,{headers:this.headers}).then(response =>{

            this.allApartments = response.body;

            })

      } else{
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
.card {
  margin-top: 9%;
  margin-left: 7%;
  width: 40%;
  height: auto;
  position: absolute;
}

.deletedApartments {
  height: auto;
  margin-left: 50%;
  margin-top: 9%;
  position: absolute;
}

.appStatus {
  padding: 10px;
  margin: 10px;
  background-color: rgb(0, 191, 197);
}

</style>
