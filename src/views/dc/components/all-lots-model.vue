<template>
  <div class="allLotModel">
    <dsn-table
      ref="singleTable"
      :data="lot"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentLotChange"
    >
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="lot" label="LOT" show-overflow-tooltip></el-table-column>
    </dsn-table>
  </div>
</template>

<script>
export default {
  name: "allLotModel",
  props: {
    lot: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCurrentLotChange(row) {
      this.$emit("selectLot", row);
    }
  }
};
</script>

<style></style>
