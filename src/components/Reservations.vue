<template>
  <div class="divv" >
    <b-button
      variant="outline-light"
      style="marginTop:5%;marginLeft:3%;position:absolute"
      v-on:click.prevent="backToHome"
    >
      <img style="width:30px;height:30px;" src="../assets/back.png" />
    </b-button>
    <b-container>
      <b-card-group>
        <b-card
          v-for="reservation in this.reservations"
          v-bind:key="reservation.idOne"
          img-src="https://picsum.photos/600/300/?image=25"
          bg-variant="light"
          :header="reservation.apartment"
          class="text-center"
          style="max-width: 23rem; color:rgb(127, 129, 198)"
        >
          <b-card-text>This is reserved from  <b-form-datepicker :value="reservation.reservedFrom" id="ex-disabled-readonly" :readonly="readonly"></b-form-datepicker> till <b-form-datepicker :value="reservation.reservedTill" id="ex-disabled-readonly" :readonly="readonly"></b-form-datepicker>. Number of nights is <b>{{reservation.numberOfNights}}</b> and the price is <b>{{reservation.price}}</b> </b-card-text>
          <b-badge class="appStatus">{{reservation.reservationStatus}}</b-badge>
          <b-button class="cancelBtn"
            @click="cancel(reservation.idOne)"
          >Cancel Reservation
          </b-button>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Reservations",
  data() {
    return {
      reservations: [],
      host: false,
      admin: false,
      guest: false,
      parameter: "",
      user: "",
      allReservations: [],
      state: 'readonly',

      headers: {
        "Content-Type": "application/json"
      }
    };
  },

  methods: {
    backToHome: function() {
      this.$router.push("/");
    },

    readonly() {
        return this.state === 'readonly'
      },

    cancel(id) {
      this.$http
        .post(
          `http://localhost:8082/PocetniREST/rest/reservations/cancel/${id}`,
          {
            headers: this.headers
          }
        )
        .then(response => {
          if (response.status == 200) {
            alert("Uspesno otkazano");
            this.$router.push("/");
          } else {
            alert("Neuspesno otkazivanje");
          }
        });
    }
  },

  beforeCreate() {
    this.$http
      .get("http://localhost:8082/PocetniREST/rest/reservations/all", {
        headers: this.headers
      })
      .then(response => {
        response.body.forEach(element => {
          this.reservations.push(element);
        });

        console.log(this.reservations);
      });
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
            this.user = response.body;
            console.log(this.user);

            if (this.user.role === "HOST") {
              this.isHost = true;

              /*this.$http
                .get(
                  `http://localhost:8082/PocetniREST/rest/apartments/all/${this.$session.get(
                    "idOne"
                  )}`,
                  { headers: this.headers }
                )
                .then(response => {
                  this.reservations = response.reservations;
                });*/
            } else if (this.user.role === "ADMIN") {
              this.isAdmin = true;

              /*this.$http
                .get(`http://localhost:8082/PocetniREST/rest/apartments/all`, {
                  headers: this.headers
                })
                .then(response => {
                  this.reservations = response.body;
                  console.log(this.reservations);
                });*/
            } else if (this.user.role === "GUEST") {
              this.isGuest = true;
              this.$http
                .get(`http://localhost:8082/PocetniREST/rest/reservations/all/${this.user.username}`, {
                  headers: this.headers
                })
                .then(response => {
                  this.reservations = response.body;
                  console.log(this.reservations);
                });
            } else {
              this.$router.push("/");
              location.reload();
            }
          }
        });
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 10%;
  margin-left: -1%;
  width: max-content;
  height: 100%;
  padding: 15px;
}

.cancelBtn {
    background-color: rgb(245, 118, 139);
    border-color:rgb(245, 118, 139) ;
}
</style>
