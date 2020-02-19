<template>
  <div class="operationModel">
    <dsn-table
      ref="singleTable"
      :data="cloneOperationList"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentOperationChange"
    >
      <el-table-column type="index" label="序号" width="45"></el-table-column>
      <el-table-column prop="operation" label="工序" show-overflow-tooltip></el-table-column>
      <el-table-column prop="operationDes" label="工序描述" show-overflow-tooltip></el-table-column>
    </dsn-table>
  </div>
</template>

<script>
export default {
  name: "operationModel",
  props: {
    operation: {
      type: Array,
      required: true
    }
  },
  created() {
    this.cloneOperationList = JSON.parse(JSON.stringify(this.operation));
  },
  data() {
    return {
      cloneOperationList: []
    };
  },
  methods: {
    //单选表格内容
    handleCurrentOperationChange(row) {
      this.$emit("selectOperation", row);
    }
  }
};
</script>

<style></style>
