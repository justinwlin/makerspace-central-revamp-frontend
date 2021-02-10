<template>
  <div class="home">
    <!-- SEARCH BOX -->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <h4>Searching by: {{ toggleButtonText }}</h4>
        <h4>Please only use lower-case letters for net-id</h4>
        <el-input
          :placeholder="toggleButtonText"
          v-model="inputTextNetIDBarCode"
        ></el-input>
      </el-col>
    </el-row>
    <div class="center">
      <el-button type="success" v-on:click="searchUser()">
        {{ searchButtonText }}</el-button
      >
      <el-button type="info" plain v-on:click="toggleNetBarcode">
        Toggle NetID / Barcode
      </el-button>
    </div>
    <!-- RESULTS OF SEARCH -->
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <h2>User: {{ fullName }}</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div>
          <h4>Edit Barcode</h4>
          <el-input
            placeholder="Please input"
            v-model="editBarcodeVal"
          ></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <h4>{{ foundUserState }}</h4>
      </el-col>
    </el-row>

    <!-- GRID -->
    <div class="center">
      <el-button type="info" v-on:click="allowedToEdit = !allowedToEdit" plain
        >EDIT</el-button
      >
      <el-button type="success" v-on:click="saveState" plain>SAVE</el-button>
    </div>
    <div class="center">
      <h4>{{ editableText }}</h4>
      <h4>/ {{ savedText }}</h4>
    </div>
    <div class="center">
      <h2>{{ sendingSaveRequest }}</h2>
    </div>

    <result-grid
      :result="combined"
      :editable="allowedToEdit"
      @toggleItemState="updateItemState"
    ></result-grid>
  </div>
</template>

<script>
import axios from "axios";
import ResultGrid from "../components/resultGrid.vue";
export default {
  name: "Home",
  components: { ResultGrid },
  inject: ["BASEURL"],
  data() {
    return {
      searchButtonState: true, //true is search, false is loading
      toggleButtonState: true, //true = barcode; false = netid
      inputTextNetIDBarCode: "",
      foundUserState: "",
      searchResult: [],
      categories: [],
      combined: {},
      allowedToEdit: false,
      beenSaved: true,
      editBarcodeVal: "",
    };
  },
  methods: {
    async searchUser() {
      if (!this.inputTextNetIDBarCode) {
        alert("please type something in");
        return;
      }
      if (!this.beenSaved) {
        alert("You haven't saved the current user, please save");
        return;
      }
      if (this.searchButtonState) {
        this.searchResult = [];
        this.combined = {};
        this.searchButtonState = !this.searchButtonState;
        try {
          // FIRST SEARCHES BY NETID OR BARCODE
          if (this.toggleButtonState) {
            await this.searchByBarCode();
          } else {
            await this.searchByNetID();
          }
          if (this.searchResult.length < 2) {
            alert("no user found");
          }
          //UPDATE BARCODE
          let idxBarcode = this.getIndexOfBarcode();
          this.editBarcodeVal = this.searchResult[1][idxBarcode];
          //GRABS THE CATEGORIES TO DISPLAY
          await this.getCategories();
          //CREATES AN OBJECT FROM THE CATEGORIES AND NETID / BARCODE RESULTS
          this.combineCategoriesAndResults();
          this.searchButtonState = !this.searchButtonState;
        } catch {
          this.searchButtonState = !this.searchButtonState;
          alert("error pinging server / request");
        }
      }
    },
    toggleNetBarcode() {
      this.toggleButtonState = !this.toggleButtonState;
    },
    updateItemState(itemName) {
      //saved state when an item is being updated set to false
      this.beenSaved = false;
      //Search through results and edit the state
      let titles = this.searchResult[0];
      let idxToUpdate = titles.indexOf(itemName);
      let date = new Date();
      if (this.searchResult[1][idxToUpdate]) {
        this.searchResult[1][idxToUpdate] = "";
      } else {
        this.searchResult[1][idxToUpdate] =
          "" +
          new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0];
      }
      this.combineCategoriesAndResults();
    },
    searchByNetID() {
      return axios
        .get(this.BASEURL + "/getByNetID/" + this.inputTextNetIDBarCode)
        .then((res) => {
          this.searchResult = res.data;
        });
    },
    searchByBarCode() {
      let lengthString = this.inputTextNetIDBarCode.length - 1;
      let derived = this.inputTextNetIDBarCode.slice(1, lengthString);
      return axios
        .post(this.BASEURL + "/getBarcode", {
          barcode: derived,
        })
        .then((res) => {
          this.searchResult = res.data;
        });
    },
    getCategories() {
      return axios.get(this.BASEURL + "/getCategories").then((res) => {
        this.categories = res.data;
      });
    },
    async combineCategoriesAndResults() {
      const regex = /\d/g;
      let listToRender = {};
      //Creating an Object
      for (const row of this.categories) {
        const title = row[0];
        listToRender[title] = {};
        let arrToLoopOver = [...row].splice(1, row.length);
        let searchtitles = [...this.searchResult[0]];
        let resultVals = [...this.searchResult[1]];
        for (const ele of arrToLoopOver) {
          const idx = searchtitles.indexOf(ele);
          regex.test(resultVals[idx]); //Don't delete this line of code, for some reason keeps the program working
          listToRender[title][ele] = regex.test(resultVals[idx]);
          regex.test(resultVals[idx]); //Don't delete this line of code, for some reason keeps the program working
        }
      }
      this.combined = listToRender;
    },
    async saveState() {
      if (this.beenSaved || this.beenSaved == "LOADING") {
        return;
      }
      //Grab net id
      let netidx = this.searchResult[0].indexOf("net_id");
      let netId = this.searchResult[1][netidx];
      //Update barcode
      this.searchResult[1][this.getIndexOfBarcode()] = this.editBarcodeVal;
      console.log(this.searchResult);
      this.beenSaved = "LOADING";
      this.allowedToEdit = false;
      //Make async request
      await axios.post(this.BASEURL + "/updateRow", {
        netid: netId,
        columnIdx: netidx,
        row: this.searchResult[1],
      });
      //RESET
      (this.beenSaved = true), (this.allowedToEdit = false);
    },
    getIndexOfBarcode() {
      let firstRow = this.searchResult[0];
      return firstRow.indexOf("barcode");
    },
  },
  computed: {
    searchButtonText() {
      return this.searchButtonState ? "Search" : "Loading";
    },
    toggleButtonText() {
      return this.toggleButtonState ? "Barcode" : "NetID";
    },
    editableText() {
      return this.allowedToEdit ? "Editable" : "Not Editable";
    },
    savedText() {
      return this.beenSaved ? "Saved" : "Not Saved";
    },
    fullName() {
      if (this.searchResult.length < 2) {
        return "";
      }
      let firstRow = this.searchResult[0];
      let secondRow = this.searchResult[1];
      let firstName = secondRow[firstRow.indexOf("first_name")];
      let lastName = secondRow[firstRow.indexOf("last_name")];
      return firstName + " " + lastName;
    },
    sendingSaveRequest() {
      if (this.beenSaved == "LOADING") {
        return "SENDING SAVE REQUEST....";
      }
      return "";
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
</style>