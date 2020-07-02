<template>
  <div class="background" style="marginTop:100px;marginLeft:6%">
    <div class="inside">
      <span>Your first night will be on:</span>
      <b-form-datepicker
        style="width:300px"
        id="startDate"
        locale="rs"
        :date-disabled-fn="dateDisabled"
        v-model="reservedFrom"
        class="mb-2"
      ></b-form-datepicker>
      <span>Your last night will be on:</span>
      <b-form-datepicker
        style="width:300px"
        id="endDate"
        locale="rs"
        v-model="reservedTill"
        :min="minimumDate"
        :max="maximumDate"
        class="mb-2"
      ></b-form-datepicker>
      <span>Your special message for the host:</span>
      <b-form-textarea
        id="textarea"
        v-model="specialText"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-button class="reserveButton" v-on:click.prevent="reserve">Check for free dates</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReserveApartment",
  data() {
    return {
      reservedFrom: "",
      reservedTill: "",
      freeDates: [],
      minimumDate: "",
      maximumDate: "",
      specialText: "",
      guest: "",
      apartment: ""
    };
  },

  methods: {
    
    reserve: function() {

        var r = {
            guest: this.guest,
            reservedFrom: this.reservedFrom,
            reservedTill: this.reservedTill,
            apartment: this.$route.params.name,
            message: this.specialText
        }

        console.log(r);
        
         this.$http.post('http://localhost:8082/PocetniREST/rest/reservations/save', r, {headers:this.headers}).then(() => {
          alert('Uspesno!');
          this.$router.push('/');
        }, (response) => {
          if(response.status != 200){
            alert('Neuspesno');
          }
        })
    },
    dateDisabled(ymd) {
      //ako se ymd ne nalazi u spisku dana koji su slobodni vrati true
      this.$http
        .get(
          `http://localhost:8082/PocetniREST/rest/apartments/freedates/${this.$route.params.name}`,
          {
            headers: this.headers
          }
        )
        .then(response => {
          this.freeDates = response.body;
          this.minimumDate = this.freeDates[0];
          this.maximumDate = this.freeDates[this.freeDates.length - 1];
          console.log(this.freeDates);
        });
      let toReturn = false;
      if (!this.freeDates.includes(ymd)) {
        toReturn = true;
      }

      return toReturn;
    }
  },

  beforeCreate() {
      if (!this.$session.exists()) {
        this.$router.push("/");
      }
    },
    created() {
      if (this.$session.exists()) {
        this.$http
          .get(
            `http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get(
              "idOne"
            )}`,
            { headers: this.headers }
          )
          .then(response => {
            if (response.status == 400) {
              this.$swal("Error");
            } else {
              this.guest = response.body.username;
            }
          });
      }
    }
};
</script>

<style scoped>
#textarea {
  width: 500px;
}

.background {
  height: 600px;
  width: 600px;
  background-image: url(../assets/reserve.jpg);
  background-position: inherit;
  background-repeat: repeat;
  background-size: cover;
  position: fixed;
  opacity: 0.9;
}

.inside {
  padding: 50px;
  margin-top: 10%;
}

span {
  color: rgb(255, 241, 196);
}
</style>