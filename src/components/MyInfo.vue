<template>

    <div>
        <b-card :title="user.username" style="text-transform:capitalize" class="card">
            <b-img src="../assets/talk.png" class="photo"></b-img>
            <b-form @submit.prevent="submitInfo" class="forma">


                <b-row class="my-1">
                    <b-col sm="3">
                    <label for="input-none">Name</label>
                    </b-col>
                    <b-col sm="9">
                    <b-form-input id="input-none" style="width:200px" v-model="user.name"></b-form-input>
                    </b-col>
                </b-row>


                 <b-row class="my-1">
                    <b-col sm="3">
                    <label for="input-none">LastName</label>
                    </b-col>
                    <b-col sm="9">
                    <b-form-input id="input-none" style="width:200px" v-model="user.lastname"></b-form-input>
                    </b-col>
                </b-row>

                 <b-row class="my-1">
                    <b-col sm="3">
                    <label for="input-none">Password</label>
                    </b-col>
                    <b-col sm="9">
                    <b-form-input id="input-none" type="password" style="width:200px" v-model="user.password"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="3">
                    <label for="input-none">Repeated password</label>
                    </b-col>
                    <b-col sm="9">
                    <b-form-input id="input-none" type="password" style="width:200px" v-model="user.repeatedPassword"></b-form-input>
                    </b-col>
                </b-row>

                 <b-row class="my-1">
                    <b-col sm="3">
                    <label for="input-none">Gender</label>
                    </b-col>
                    <b-col sm="5">
                    <b-form-select style="marginTop:10px" v-model="user.gender" class="genderSelect" :options="options"></b-form-select>
                    </b-col>
                </b-row>

                <b-row class="dugme">
                   
                   <b-button type="submit" variant="outline-light"><img src="../assets/updated (2).png" class="updatebuttonicon"/></b-button>
                    
                </b-row>


            </b-form>
        </b-card>
     </div>
</template>

<script>

export default {
  name: "MyInfo",
  data() {
    return {
      user: {
        username: "",
        password: "",
        name:"",
        lastname:"",
        gender:"",
        role:"",
        repeatedPassword:""

      },
      selected: null,
      options: [
        { value: "none", text: "Please select an option" },
        { value: "FEMALE", text: "Female" },
        { value: "MALE", text: "Male" },
        { value: "rathernotsay", text: "Rather Not Say" }
      ],
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },

  methods : {

      submitInfo : function(){

    if(this.user.password !== this.user.repeatedPassword){ 

        this.$swal('Passwords do not match. Try again.');
        return;

    }

    if(this.user.gender == "none"){

        this.$swal("You didn't choose a gender.");
        return;

    }

    var  object = {
        username: this.user.username,
        password: this.user.password,
        name: this.user.name,
        lastname: this.user.lastname,
        gender: this.user.gender,
        role: this.user.role,

      }

        console.log(this.user);
    

      this.$http.post('http://localhost:8082/PocetniREST/rest/edituser', object, {headers:this.headers}).then((response) =>{
        if(response.ok){
          this.$swal('You successfully changed your information!');
         
        this.$router.push('/myinfo');       

        }
      }, (response) => {
        if(response.status == 400){
          this.$swal('Error. Please try again.');
        }
      });
    }


  },

  created(){
      
    if(this.$session.exists()){

        this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {
      
      if(response.status == 400){
          this.$swal('Error');
      }else{
          this.user = response.body;
          this.user.repeatedPassword = response.body.password;
      }
    })
             
     
  }

  } 

};
</script>

<style scoped>

.card{

    margin-top:10%;
    margin-left: 34%;
    width: 30%;
    height: auto;
    padding: 10px;
}

.dugme{
    margin-left:42%;
    margin-top: 20px;
    width:100px;
}

.photo{
    width:100px;
    height: 100px;
    padding:10px;
}

#input-none{
    margin-top:10px;
}

.genderSelect{
    width:200px;
}

.forma{
    margin-left:10%;
    margin-top:5%;
}

.updatebuttonicon{
    width: 40px;
    height: 40px;
}

</style>
