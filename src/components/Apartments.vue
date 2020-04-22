<template>

    <div>
             <b-button variant="outline-light" style="marginTop:9%;marginLeft:1%;position:absolute" v-on:click.prevent="backToHome"><img style="width:30px;height:30px;" src="../assets/back.png"/></b-button>

        <b-card class="card">
          <b-row inline>
          <b-avatar variant="light" style="height:60px;width:60px" src="../assets/happy.png"></b-avatar>
          <h1 v-if="isHost" style="padding:5px">My active apartments</h1>
          </b-row>
         <b-input id="input-lg" style="marginTop:10px" size="sm" placeholder="Enter apartment name" type="search" ></b-input >

        <b-list-group style="width:100%;marginTop:20px;" v-for="apartment in apartmentsActive"  v-bind:key="apartment.idOne">

            <b-list-group-item class="d-flex align-items-center">
                <b-avatar class="mr-3"  variant="light" src="../assets/beachhouse.png" ></b-avatar>
                <span class="mr-auto">{{apartment.name}}</span>

            </b-list-group-item>
        </b-list-group>
        </b-card>

        <b-card v-if="isHost" class="deletedApartments">
          <b-row inline>
          <b-avatar variant="light" style="height:60px;width:60px" src="../assets/sad (1).png"></b-avatar>
        <h1 v-if="isHost" style="padding:5px">My deleted apartments</h1>
        </b-row>
        
             <b-list-group style="width:100%;marginTop:20px;" v-for="apartment in apartmentsDeleted"  v-bind:key="apartment.idOne">

            <b-list-group-item class="d-flex align-items-center">
                <b-avatar class="mr-3"  variant="light" src="../assets/beachhouse.png" ></b-avatar>
                <span class="mr-auto">{{apartment.name}}</span>
                
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
    apartmentsDeleted:[],
    allApartments:[],
    user:'',
    isAdmin:'',
    isHost:'',
      headers : {
        'Content-Type' : 'application/json'
      }   
    }
  },
  methods:{
    backToHome : function(){
            this.$router.push('/');
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

        })

        this.$http.get(`http://localhost:8082/PocetniREST/rest/apartments/deleted/all/${this.$session.get('idOne')}`,{headers:this.headers}).then(response =>{
        
        this.apartmentsDeleted = response.body;
        
        

        })



        

      } else if (this.user.role === "ADMIN"){
           alert("ADMIN");
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

.card{
    margin-top:9%;
    margin-left:7%;
    width: 40%;
    height: auto;
    position: absolute;
}

.deletedApartments{
  height:auto;
  margin-left: 50%;
  margin-top:9%;
  position:absolute;

}
</style>
