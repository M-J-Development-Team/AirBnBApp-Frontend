<template>
  <div class="registration">
    <h2>Registration</h2>
    <form>
      <div class="row">
        <input type="text" class="input-first" placeholder="Name" required />
        <input type="text" class="input-first" placeholder="Lastname" required />
        <select name="gender" id="gender">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="RatherNotSay">Rather Not Say</option>
        </select>

      </div>
      <br />
      <div class="profil">
        <input type="text" class="input-username" placeholder="Username" required />
        <input type="password" class="input-pass" placeholder="Password" required />
        <input type="password" class="input-pass" placeholder="Repeat Password" required />
      </div>
      <div class="dugmad">
        <input class="dugme1" type="submit" value="Register">
        <button class="dugme2">Cancel</button> 
      </div>
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
        password: ""
      },

      headers: {
        "Content-Type": "application/json"
      }
    };
  }
};
</script>

<style scoped>
h2{
    text-align: center;
    color: #5e565e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
    background-color: #eee5f3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
}

.dugmad{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}

.input-first{
    margin-left: 50px;
    padding: 7px;
    width: 176px;
    height: 15px;
    font-size: 15px;
    border: 1px solid #baa1c9;
    border-radius: 18px;
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