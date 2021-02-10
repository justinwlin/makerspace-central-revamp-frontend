<template>
    <div class = "login">
      <el-row type="flex" justify="center">
        <el-col :span="50">
            <h1>MakerSpace Central</h1>
            <h3>Log into Your NYU Account</h3>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="50">
            <el-input placeholder="NetID" v-model="netID"></el-input> 
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="50">
            <el-input placeholder="Password" v-model="password"></el-input> 
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="50">
            <el-button type="primary">Login</el-button> 
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  name: "login",
  methods: {
    
  },
  computed: {
    
  },
};
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.el-row {
  margin: 1rem;
}
</style>
