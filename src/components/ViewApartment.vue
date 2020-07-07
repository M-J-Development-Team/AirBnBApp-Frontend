<template>
  <div>

     <b-button variant="outline-light" style="marginTop:-5%;marginLeft:5%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>  
    <b-card style="marginTop:10%;width:80%;marginLeft:5%;height:auto">
          <b-card
            style="marginTop:1%;width:80%;marginLeft:5%;height:40%;textAlign:center;marginBottom:1%"
            v-if="apartment.photoPath.length > 0"
            class="photocard"
            >
            <h1 stle=" textTransform:capitalize">{{apartment.name}}</h1>
            <b-img :src="apartment.photoPath" style="width:50%;height:40%"></b-img>
          </b-card>

         <b-button
            class="reserveButton"
            v-on:click="checkToReserve(apartment.name)"
          >Reserve apartment
          <b-img src="../assets/calendar.svg" style="height:20px;width:20px"/>
          </b-button>

          <b-form-group style="marginTop:15px">
              <b-avatar variant="secondary" src="../assets/user (2).svg" style="height:30px;width:30px"/>
              <label>Host {{apartment.host}}</label>       
          </b-form-group>

          <b-form-group style="marginTop:15px" >
              <label >Rating</label>
            <b-form-input style="width:100px" type="number" readonly v-model="rating"/>         
          </b-form-group>

        <div style="padding:15px">
            <b-row >
                <b-form-group >
                <label >Apartment name</label>
                <b-form-input
                    id="input-2"
                    :value="apartment.name"
                    readonly=true
                    style="width:300px"
                ></b-form-input>
                </b-form-group>
            </b-row>

            <b-form-group style="marginLeft:-14px;marginTop:5px" >
                <label >Apartment type</label>
                <b-input style="width:300px" :value="apartment.type" readonly=true ></b-input>
            </b-form-group>

            <b-form-group id="input-group-2" label-for="input-2" v-if="apartment.type != 'ROOM'" style="marginTop:5px">
            <label >Number of rooms</label>
                <b-form-input :value="apartment.numberOfRooms" readonly=true style="width:300px;marginLeft:-14px"></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-1" style="marginTop:5px;marginLeft:-14px" label-for="input-1">
            <label>Number of guests</label>
            <b-form-input  :value="apartment.numberOfGuests" readonly=true style="width:300px"></b-form-input>
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
                <b-form-timepicker :value="apartment.checkInTime" readonly=true locale="en"></b-form-timepicker></b-form-group>

            <b-form-group
                id="input-group-1"
                :value="apartment.checkOutTime"
                label="Check out time"
                label-for="input-1"
                style="width:150px;marginLeft:0px"
            >
                <b-form-timepicker :value="apartment.checkOutTime" readonly=true locale="en"></b-form-timepicker></b-form-group>
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
              <label>{{amenity.name}}</label>
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
            readonly=true
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
              readonly=true

            ></b-form-input>
            <br/>
            <b-form-input
              style="marginTop:5px;marginLeft:25px;width:280px"
              :placeholder="apartment.location.address.number"
              :value="apartment.location.address.number"
              readonly=true
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
              readonly=true

            ></b-form-input>
            <br/>
            <b-form-input
               style="marginTop:5px;marginLeft:25px;width:280px"
              :value="apartment.location.address.zipCode"
              readonly=true
              type="number"
            ></b-form-input>
          </b-form-group>
        </b-row>
        </div>
    </b-card>

    <b-card class="commentsCard">
      <b-card-title style="textAlign:center"><b-avatar src="../assets/message.svg" variant="light" style="height:30px;widht:30px"/>Comments and reviews</b-card-title>
      <div v-if="canComment">
      Leave a comment
      <form @submit.prevent="submitComment" >
      <input min="1" max="5" type="number" placeholder="Rate us!" required v-model="comment.rating"/>
      <b-input required placeholder="Enter your comment here." v-model="comment.text"></b-input>
      <b-button type="submit" v-on:click.prevent="submitComment">Submit comment</b-button>
      </form>
      </div>
      <hr/>
      <renderComments :apartmentId="this.apartment.idOne"/>
    </b-card>

  </div>
</template>

<script>
import renderComments from './renderComments.vue';


export default {
  name: "ViewApartment",
    components: {
     'renderComments' : renderComments,
  },
  data() {
    return {
      apartment: {},
      user:{},
      rating:null,
      comment:{text:'',guest:'',apartmentId:this.$route.params.id,rating:''},
      canComment:false,
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },

       beforeCreate() {
          if(this.$session.exists()){

              this.$http.get(`http://localhost:80/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then(response => {
                  
                  this.$http.get(`http://localhost:80/PocetniREST/rest/apartments/${this.$route.params.id}`,{ headers: this.headers }).then(resp => {
                      this.apartment = resp.body;
                      this.rating = resp.body.rating;                     
                      console.log('this is rating'+this.rating);
                      });

                  if(response.body.role == 'GUEST'){
                    this.user =  response.body;   
                        
                     
                      this.$http.get(`http://localhost:80/PocetniREST/rest/check-can-comment/${this.user.idOne}/${this.$route.params.id}`,{ headers: this.headers }).then(respCheck => {
                           
                          if(respCheck.status == 200){
                             this.canComment = true;
                          }

                           /*this.$http.get(`http://localhost:8082/PocetniREST/rest/has-commented/${this.user.idOne}/${this.$route.params.id}` ,{headers:this.headers}).then(resp => {
                             this.hasCom = resp;

                             if(this.hasCom == false && this.canCom == true){
                              this.canComment = true;
                      }

                      
                      });*/

                      });     
  
                  }
              });
          }else{

             this.$http.get(`http://localhost:80/PocetniREST/rest/apartments/${this.$route.params.id}`,{ headers: this.headers }).then(resp => {
                      this.apartment = resp.body;
                     this.rating = resp.body.rating;
                      console.log('this is rating'+this.rating);
                      });

          }


  },

  methods : {

       backToHome : function(){
            this.$router.push('/');
       },
       checkToReserve(id) {
      this.$router.push(`/reservethis/${id}`);
    },
     submitComment : function(){
            
        this.comment.guest = this.user.username;
        this.$http.post(`http://localhost:80/PocetniREST/rest/submit-comment`,this.comment,{ headers: this.headers }).then(resp => {

            console.log(resp.body);
            this.$swal("Successfully submitted");
            this.$router.push(`/`);
             });
       },


  }

};
</script>

<style scoped >

.commentsCard{
  width:30%;
  margin-left:5%;
  margin-top:1.5%;
}
.reserveButton {
  margin-left: 0%;
  margin-top:  0%;
}
</style>
