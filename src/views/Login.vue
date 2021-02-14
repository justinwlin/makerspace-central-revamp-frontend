<template>
    <div class = "login">
      <el-row type="flex" justify="center">
        <el-col :span="50">
            <h1>MakerSpace Central</h1>
            <h3>Log into MakerSpace Central</h3>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="50">
            <el-input placeholder="Username" v-model="username"></el-input> 
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="50">
            <el-input type="password" placeholder="Password" v-model="password"></el-input> 
        </el-col>
      </el-row>
      <div class="center">
        <el-button type="primary" v-on:click="login()">Login{{
          createUserText
        }}</el-button>
      </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {

  computed:{
    username: {
      set(username){
        this.$store.commit("userUpdate",username)
        //user
        
      },
      get(){
        return this.$store.getters.user
      }

    },
    password: {
      set(password){
        this.$store.commit("passwordUpdate",password)
        //user
        
      },
      get(){
        return this.$store.getters.pass
      }

    }
  },
  methods:{
    ...mapActions(['login'])


  }
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
