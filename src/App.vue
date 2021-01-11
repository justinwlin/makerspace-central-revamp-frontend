<template>
  <div id="app">
    <!-- NAVIGATION -->
    <div class="navBar center">
      <el-button type="primary">Home</el-button>
      <el-button type="success">Add User</el-button>
    </div>

    <!-- SEARCH BOX -->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-input placeholder="Please input" v-model="input"></el-input>
      </el-col>
      <el-button type="primary" plain>Search By NetID</el-button>
    </el-row>
    <!-- RESULTS OF SEARCH -->
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <h2>User:</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div>
          <h4>Edit Barcode</h4>
          <el-input placeholder="Please input" v-model="input"></el-input>
        </div>
        <div>
          <h4>Edit NetID</h4>
          <el-input placeholder="Please input" v-model="input"></el-input>
        </div>
      </el-col>
    </el-row>
    <!-- GRID -->
    <div class="center">
      <el-button type="info" plain>EDIT</el-button>
      <el-button type="success" plain>SAVE</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
</style>
