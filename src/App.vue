<template>
  <div id="app">
    <!-- NAVIGATION --> 
    <div class="navBar center" v-if="valid">
      <el-button type="success" v-if="button" disabled id="light">Connected</el-button>
      <el-button type="danger" v-else disabled id="light">Disconnected</el-button>

      <router-link to="/home"><el-button type="primary" v-on:click="page = true">Home</el-button></router-link>
      <router-link to="/about"><el-button type="success" v-on:click="page = false">Add User</el-button></router-link>

    </div>
    
    <!-- PAGES -->
    <router-view></router-view>
    </div>
</template>

<script>
import axios from "axios";
export default {

  name: "App", 
  data() {
    return {
      page: true,
      BASE_URL: "https://mkrspcbackendv2.herokuapp.com",
      
    };
  },

  provide(){
    return{
      BASEURL:this.BASE_URL
    }
  },
  async mounted(){
    let self = this.$store.state
      setInterval(async function(){
        await axios.get("https://mkrspcbackendv2.herokuapp.com").then((result)=>{
          console.log(result)
          self.button = true
        }).catch((err)=>{
          console.log(err)
          self.button=false
        })
      },5000)
      console.log("MOUNTED")
    
      

  },

  computed:{
    valid(){
      return this.$store.getters.loggedIn
    },
    button(){
      return this.$store.state.button
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
#light{
  margin-right:.5rem;
}
</style>