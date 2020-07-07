<template>
  <div class="background">
    <div class="overflow-hidden"  align="center">
      <div class="whitespace"></div>
      <form v-on:submit.prevent="register">
        <b-form-input v-model="user.name" type="text" class="inputname" placeholder="Name"></b-form-input>
        <b-form-input v-model="user.lastname" type="text" class="inputs" placeholder="Lastanme"></b-form-input>
        <b-form-select v-model="user.gender" class="genderSelect" :options="options"></b-form-select>
        <br />
        <br />
        <b-form-input v-model="user.username" type="text" class="inputs" placeholder="Username"></b-form-input>
        <b-form-input v-model="user.password" type="password" class="inputs" placeholder="Password"></b-form-input>
        <b-form-input
          
          type="password"
          class="inputs"
          placeholder="Repeat password"
        ></b-form-input>
        <br />

        <b-button type="submit" class="btns" variant="outline-primary"><b-img class="icon" src="../assets/sign-up.svg"/></b-button>
      </form>
    </div>
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
        
      },
      selected: null,
      options: [
        { value: "none", text: "Please select an option" },
        { value: "FEMALE", text: "Female" },
        { value: "MALE", text: "Male" },
        { value: "rathernotsay", text: "Rather Not Say" }
      ],
      headers: {
        "Content-Type": "application/json"
      }
    };
  },

  methods: {
    register: function() {
      this.$http
        .post("http://localhost:80/PocetniREST/rest/register", this.user, {
          headers: this.headers
        })
        .then(
          () => {
            this.$swal("You are now registered");
            this.$router.push('/login');
          },
          response => {
            if (response.status == 401) {
              alert("Error");
            }
          }
        );
    }
  }
};
</script>

<style scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: url(../assets/map.jpg);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 60px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
}

.overflow-hidden{
    margin-left: 37%;
    margin-top: 5%;
    background-color:rgba(245, 245, 245, 0.5);
    text-align: left;
    width: 350px;
    border-radius: 10px;
}

.icon {
  width: 42px;
  height: 42px;
}

#image {
  margin: 10px;
}

h2 {
  text-align: center;
  color: #5e565e;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-top: 5px;
}

#gender {
  height: 30px;
  margin-top: 1px;
  border: 1px solid #baa1c9;
  margin-left: 50px;
  border-radius: 18px;
  width: 250px;
}

.genderSelect {
  width: 250px;
  margin-left: 46px;
}

.registration {
  padding: 30px;
  background-color: #d9f2fc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.1);
}

.btns {
  margin-left: 46px;
  margin-bottom: 15px;
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

.dugmad {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}

.inputs {
  margin-left: 46px;
  width: 250px;
  padding: 8px;
  margin-bottom: 6px;
}

.inputname {
   margin-left: 46px;
  width: 250px;
  padding: 8px;
  margin-bottom: 6px;
  margin-top: 10px
}

.input-username,
.input-pass {
  margin: 6px;
  padding: 7px;
  width: 381px;
  height: 15px;
  font-size: 15px;
  border: 1px solid #baa1c9;
  border-radius: 18px;
}

.dugme1 {
  height: 36px;
  width: 140px;
  color: #d8d5cf;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border: none;
  background-color: #5e565e;
  font-size: 16px;
  margin: 5% 21%;
  border-radius: 18px;
}
.dugme2 {
  height: 36px;
  width: 140px;
  color: #d8d5cf;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border: none;
  background-color: #5e565e;
  font-size: 16px;
  margin: 5% 0%;
  border-radius: 18px;
}
.dugme1:hover,
.dugme2:hover {
  background-color: #363236;
  color: #d8d5cf;
}
</style>