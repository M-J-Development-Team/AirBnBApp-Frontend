<template>

    <div class="background">
      
                <div class="overflow-hidden"  align="center"  style="max-width: 350px;">
                  
                    
                        
                                <form class="forma">
                                    <b-row >
                                        
                                        <b-form-input id="input-lg" size="sm" placeholder="Username" ></b-form-input >                                 
                                    </b-row>
                                   
                                   <b-row >
                                        
                                        <b-form-input id="input-lg" size="sm" placeholder="Password" ></b-form-input >                                 
                                    </b-row>


                                    <b-row >
                                         <b-form-input id="submit-button" type="submit" value="Login" size="sm"></b-form-input>                 
                                    </b-row>

                        
                                                                     
                                </form>
                        
                   
                    
                </div>
    </div>
          
  
</template>

<script>
export default {
  name: "Login"
};
</script>

<style>
.background {
  height: 100%;
  width: 100%;
  background-image: url(../assets/map.jpg);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top:60px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  
}

.label{
    text-align: right;
}

#submit-button{
    text-align: center;
}

#input-lg{
    
    width: 250px;
    
}

.row{
    margin-top:7%;
    
}


.forma{
    margin-left: 20%;
    margin-top:10%;
}

#submit-button{
    margin-left:22%;
    margin-bottom: 10%;
    width: 100px;
}

.overflow-hidden{
    margin-left: 39%;
    margin-top: 14%;
    background-color:rgba(245, 245, 245, 0.5);
    text-align: left;
}

.user-icon{
    height: 200px;
    width: 200px;
    margin-top: 5%;
    margin-left:25%;
   
}

h1 {
  margin-left: 50%;
}
</style>
