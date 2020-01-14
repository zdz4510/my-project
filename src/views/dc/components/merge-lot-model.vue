<template>
  <div class="mergeLot">
    <el-table
      ref="multipleTable"
      :data="lot"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="lot" label="LOT" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "mergeLot",
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
    handleSelectionChange(selection) {
      this.$emit("selectLot", selection);
    }
  }
};
</script>

<style></style>
