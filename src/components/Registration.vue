<template>
  <div class="registration">
    <img  src="../assets/sign-up.svg" alt="Smiley face" height="42" width="42">
    <div class="whitespace"></div>
    <form v-on:submit.prevent="register">
      <b-form-input v-model="user.name" type=text class="inputs" placeholder="Name"></b-form-input>
      <b-form-input v-model="user.lastname" type=text class="inputs" placeholder="Lastanme"></b-form-input>
      <b-form-select v-model="user.gender" class="genderSelect" :options="options"></b-form-select>
      <br/>
      <br/>
      <b-form-input v-model="user.username" type=text class="inputs" placeholder="Username"></b-form-input>
      <b-form-input v-model="user.password" type=password class="inputs" placeholder="Password"></b-form-input>
      <b-form-input v-model="repeatedpassword" type=password class="inputs" placeholder="Repeat password"></b-form-input>
      <br/>

      <b-button type=submit class="btns" variant="outline-primary">Sign Up</b-button>
    </form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        gender: "",
        username: "",
        password: "",
        repeatedpassword: ""
      },
       selected: null,
        options: [
          { value: 'none', text: 'Please select an option' },
          { value: 'FEMALE', text: 'Female' },
          { value: 'male', text: 'Male' },
          { value: 'rathernotsay', text: 'Rather Not Say' }
        ],
      headers: {
        "Content-Type": "application/json"
      }
    };
  },

  methods: {
     register : function(){
         this.$http.post('http://localhost:8080/PocetniREST/rest/register', this.user ,{headers:this.headers}).then(() => {
          this.$swal('You are now registered');
        }, (response) => {
          if(response.status == 400){
            alert('Error');
          }
        })
        
    }
  
}
};


</script>

<style scoped>
h2{
    text-align: center;
    color: #5e565e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-top: 5px;
}

#gender {
    height: 30px;
    margin-top: 1px;
    border: 1px solid #baa1c9;
    margin-left: 50px;
    border-radius: 18px;
}

.registration{
    padding: 30px;
    background-color: #d9f2fc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.1);
}

.btns {
  margin: 10px;
  border-color: #06a757;
  color: #06a757;
}

.btns:hover {
  background-color: #06a757;
  color: #d9f2fc;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
}

.whitespace {
  padding: 7px;
}

.dugmad{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}

.inputs {
  margin: 7px 1px;
}

.input-username, .input-pass{
    margin: 6px;
    padding: 7px;
    width: 381px;
    height: 15px;
    font-size: 15px;
    border: 1px solid #baa1c9;
    border-radius: 18px;
}

.dugme1{
    
    height: 36px;
    width: 140px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 16px;
    margin: 5% 21%;
    border-radius: 18px;
}
.dugme2{
    
    height: 36px;
    width: 140px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 16px;
    margin: 5% 0%;
    border-radius: 18px;
    
}
.dugme1:hover, .dugme2:hover {
  background-color:  #363236;
  color: #d8d5cf;
}
</style>