<template>
  <div id="app">
    <!-- NAVIGATION --> 
    <div class="navBar center" v-if="valid">
      <router-link to="/home"><el-button type="primary" v-on:click="page = true">Home</el-button></router-link>
      <router-link to="/about"><el-button type="success" v-on:click="page = false">Add User</el-button></router-link>
    </div>
    
    <!-- PAGES -->
    <router-view></router-view>
    

  </div>
</template>

<script>
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

  computed:{
    valid(){
      return this.$store.getters.loggedIn
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
</style>