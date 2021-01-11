<template>
  <div id="app">
    <Home></Home>

    <About v-if="false"></About>
  </div>
</template>

<script>
import Home from "./views/Home";
import About from "./views/About";
export default {
  name: "App",
  components: { Home, About },
};
</script>

<style scoped>
</style>
