<template>
    <div class="commentsContainer"> 
        <h1><b-img src="../assets/message.svg" variant="light" style="height:50px;widht:50px"/>Managing comments</h1> 
        <b-card  v-for="comment in this.unapprovedComments"  v-bind:key="comment.idOne">
            <b-card-body style="textAlign:center">
                 <span style="textTransform:capitalize">{{comment.guest}}</span> says
             <span>" {{comment.text}} "</span><hr/>
             <span>Rating: <b-img src="../assets/star (1).svg" variant="light" style="height:80px;widht:80px"/></span> <hr/>
             <span v-on:click.prevent="seeApartment(comment.apartmentId)" style="cursor:pointer" >Comment for apartment(Click here)</span> <hr/>
              <b-button v-on:click.prevent="approve(comment.idOne)">I want this comment to be visible</b-button> 
              <b-button v-on:click.prevent="decline(comment.idOne)" style="marginTop:3%">I dont' want this comment to be visible</b-button>
            </b-card-body>          
        </b-card>
        </div>
</template>

<script>
export default {
  name: "ApproveComments",
  data() {
    return {
      unapprovedComments: [],
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },

      created(){
          if(this.$session.exists()){

              this.$http.get(`http://localhost:80/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {

                this.$http.get(`http://localhost:80/PocetniREST/rest/get-all-unapproved-for-host/${response.body.username}`,{headers:this.headers}).then(resp =>{
                this.unapprovedComments = resp.body;
                console.log(this.unapprovedComments);
                })
            });
          }

  },

  methods : {

      approve : function(id) {
            this.$http.post(`http://localhost:80/PocetniREST/rest/set-comment-visible/${id}`,{headers:this.headers}).then(resp =>{
            console.log(resp);
            this.$swal("Successfully approved");
            this.$router.push(`/`);
          })
    },

     decline : function(id) {
            this.$http.post(`http://localhost:80/PocetniREST/rest/set-comment-declined/${id}`,{headers:this.headers}).then(resp =>{
            console.log(resp);
            this.$swal("Successfully declined");
            this.$router.push(`/`);
          })
    },

     seeApartment : function(id) {
             this.$router.push(`/view/${id}`);
  
    },
  }

};
</script>

<style scoped>
.commentsContainer{
    display: grid;
    margin-top: 10%;
    margin-left: 30%;
    width:40%
}
</style>
