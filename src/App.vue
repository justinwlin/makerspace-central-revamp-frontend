<template>
  <div id="app">
    <!-- NAVIGATION -->
    <div class="navBar center">
      <el-button type="primary" v-on:click="page = true">Home</el-button>
      <el-button type="success" v-on:click="page = false">Add User</el-button>
    </div>
    <!-- PAGES -->
    <Home v-if="page" :BASEURL="BASE_URL"></Home>
    <About :BASEURL="BASE_URL" v-else></About>
  </div>
</template>

<script>
import Home from "./views/Home";
import About from "./views/About";
export default {
  name: "App",
  components: { Home, About },
  data() {
    return {
      page: true,
      BASE_URL: "https://mkrspcbackendv2.herokuapp.com",
    };
  },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
</style>