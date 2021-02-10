<template>
  <div class="about">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input placeholder="First Name" v-model="first"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input placeholder="Last Name" v-model="last"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input placeholder="Barcode" v-model="barcode"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input placeholder="NetID" v-model="netid"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input placeholder="NNumber" v-model="nnum"></el-input>
      </el-col>
    </el-row>
    <div class="center">
      <el-button type="danger" plain v-on:click="clear()">Clear</el-button>
      <el-button type="success" plain v-on:click="submitUser()">{{
        createUserText
      }}</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "About",
  inject: ["BASEURL"],
  data() {
    return {
      first: "",
      last: "",
      barcode: "",
      netid: "",
      nnum: "",
      createUserState: false,
    };
  },
  methods: {
    async submitUser() {
      if (this.createUserState) {
        return;
      }
      if (
        !this.first ||
        !this.last ||
        !this.barcode ||
        !this.netid ||
        !this.nnum
      ) {
        alert("fill in all the boxes");
        return;
      }
      console.log(this.BASEURL);
      this.createUserState = true;
      await axios
        .post(this.BASEURL + "/newUser", {
          FirstName: this.first,
          LastName: this.last,
          Barcode: this.barcode,
          NetID: this.netid,
          NNumber: this.nnum,
        })
        .then(() => {
          this.clear();
        })
        .catch(() => {
          alert("error submitting form");
        });
      this.createUserState = false;
    },
    clear() {
      this.first = "";
      this.last = "";
      this.barcode = "";
      this.netid = "";
      this.nnum = "";
    },
  },
  computed: {
    createUserText() {
      return !this.createUserState ? "Create" : "Sending";
    },
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