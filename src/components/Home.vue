 
<template>
  <div>
  <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#ccc"
      style="text-shadow: 1px 1px 2px #000;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Venice, Italy"
        text="Welcome to TravelApp.Where are here to make your travels easier!"
        img-src="../assets/italy.jpg"
      ></b-carousel-slide>

        <b-carousel-slide
        caption="Stockholm, Sweden"
        text="Welcome to TravelApp.Where are here to make your travels easier!"
        img-src="../assets/stockholm.jpg"
      ></b-carousel-slide>

        <b-carousel-slide
        caption="Maldives"
        text="Welcome to TravelApp.Where are here to make your travels easier!"
        img-src="../assets/chairs.jpeg"
      ></b-carousel-slide>


    <b-carousel-slide
        caption="Barcelona, Spain"
        text="Welcome to TravelApp.Where are here to make your travels easier!"
        img-src="../assets/guell.jpg"
      ></b-carousel-slide>

  </b-carousel>

  </div>
</template>

<script>

export default {
    name:'Home',
  data () {
      return {
      //
    }
    
  }
}
</script>

<style scoped>
.naslov{
    margin-left: 60%;
    margin-top:20%;
}

#carousel-1{

    width: 70%;
    height: 60%;
    margin-top: 5%;
    margin-left:14%;
    position: fixed;
    max-height: 40%;
}



.card{
    width: 90%;
    height: 50%;
    background-image: url(../assets/newvan.jpg);
    margin-left:5%;
    margin-top: 6%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
}

h1{
    text-align: right;
    margin-top: 14%;
    color:rgb(94, 91, 91);
    font-family: Calibri;
}

</style>