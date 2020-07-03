<template>
  <div>
    <div class="commentDiv" v-if="isAdmin || isHost">  
        <b-card  v-for="comment in this.comments"  v-bind:key="comment.idOne" class="oneApartmentGuest">
            <b-card-body style="textAlign:center">
                 <span style="textTransform:capitalize">{{comment.guest}}</span> says
             <span>" {{comment.text}} "</span><hr/>
             <span>Rating: <b-img src="../assets/star (1).svg" variant="light" style="height:80px;widht:80px"/></span> <hr/>
              <p v-if="comment.status =='VISIBLE'">Visible</p> 
                <p v-if="comment.status == 'HIDDEN' && isAdmin" style="textDecoration:line-through;">Visible</p>
                <p v-if="comment.status == 'HIDDEN' && isAdmin">(Host has not reviewed it yet)</p> 
                <p v-if="comment.status == 'DECLINED' && isAdmin">Host declined this comment</p> 

                <p v-if="comment.status == 'DECLINED' && isHost">You declined this comment</p> 
                <p v-if="comment.status == 'HIDDEN' && isHost" style="textDecoration:line-through;">Visible</p> 
                <p v-if="comment.status == 'HIDDEN' && isHost">(You have not reviewed it yet)</p>

            </b-card-body>          
        </b-card>
    </div> 

    <div class="commentDiv" v-if="isGuest">  
        <b-card  v-for="comment in this.comments"  v-bind:key="comment.idOne" class="oneApartmentGuest">
            <b-card-body style="textAlign:center">
                 <span style="textTransform:capitalize">{{comment.guest}}</span> says
             <span>" {{comment.text}} "</span><hr/>
             <span>Rating: <b-img src="../assets/star (1).svg" variant="light" style="height:80px;widht:80px"/></span><hr/>
            </b-card-body>          
        </b-card>
    </div>
  </div>    
</template>

<script>
export default {
  name: "renderComments",
 props: ['apartmentName'],
  data() {
    return {
      comments: [],
      isAdmin: '',
      isGuest : '',
      isHost: '',
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  },

      created(){

          console.log(this.apartmentId);

          if(this.$session.exists()){
                this.$http.get(`http://localhost:8082/PocetniREST/rest/userinfo/${this.$session.get('idOne')}` ,{headers:this.headers}).then((response) => {

                    if(response.body.role == 'ADMIN'){
                        
                        this.$http.get(`http://localhost:8082/PocetniREST/rest/get-all-comments-by-apartment/${this.apartmentName}`,{headers:this.headers}).then(response =>{     
                        this.comments = response.body; 
                        this.isAdmin = true;
                        console.log(this.comments);
                        })
                    }
                     if(response.body.role == 'HOST'){
                        
                        this.$http.get(`http://localhost:8082/PocetniREST/rest/get-all-comments-by-apartment/${this.apartmentName}`,{headers:this.headers}).then(response =>{     
                        this.comments = response.body; 
                        this.isHost= true;
                        console.log(this.comments);
                        })
                    }

                      if(response.body.role == 'GUEST'){
                        
                        this.$http.get(`http://localhost:8082/PocetniREST/rest/get-all-approved-by-apartment/${this.apartmentName}`,{headers:this.headers}).then(resp =>{     
                        this.comments = resp.body; 
                        this.isGuest = true;
                        console.log(this.comments);
                        })
                    }
          
          })

        }

  },

  methods : {}

};
</script>

<style scoped>
.commentDiv{
    display: grid;
}
</style>
