<template>
  <div id="container">
    <div v-for="(item, idx) in keysInCombinedResults" :key="idx">
      <h4>{{ item }}</h4>
      <li
        v-for="(val, idx) in result[item]"
        :key="idx"
        :class="itemColor(val)"
        v-on:click="toggleItem(idx)"
      >
        <el-button :type="itemColor(val)">
          {{ idx }}
        </el-button>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: "resultGrid",
  props: ["result", "editable"],
  emits: ["toggleItemState"],
  methods: {
    toggleItem(itemName) {
      if (this.editable) {
        this.$emit("toggleItemState", itemName);
      }
    },
    itemColor(val) {
      return val ? "success" : "warning";
    },
  },
  computed: {
    keysInCombinedResults() {
      return Object.keys(this.result);
    },
  },
};
</script>
<style scoped>
#container {
  display: flex;
  justify-content: space-evenly;
  overflow-x: scroll;
  margin: 2rem;
  border: 1px solid grey;
}

#result {
  margin: 0.3rem;
}

li {
  list-style: none;
  margin: 5px;
}

.success {
  color: green;
}

.warning {
  color: red;
}
</style>