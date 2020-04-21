<template>

    <div>
        hello
    </div>    
  
</template>

<script>
export default {
  name: "AllUsers",
  data() {
    return {
        users: "",
        host: false,
        admin: false,
        guest: false,
        
        headers : {
          'Content-Type' : 'application/json'
        }
      }
  },

  methods : {
      
  
  }

};
</script>

<style scoped>

</style>
