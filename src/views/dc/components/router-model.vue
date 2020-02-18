<template>
  <div class="routerModel">
    <dsn-table
      ref="singleTable"
      :data="cloneRouterList"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentRouterChange"
    >
      <el-table-column type="index" label="序号" width="45"></el-table-column>
      <el-table-column prop="router" label="工艺路线" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="工艺路线描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="revision" label="工艺路线版本" show-overflow-tooltip></el-table-column>
    </dsn-table>
  </div>
</template>

<script>
export default {
  name: "routerModel",
  props: {
    router: {
      type: Array,
      required: true
    }
  },
  created() {
    this.cloneRouterList = JSON.parse(JSON.stringify(this.router));
  },
  data() {
    return {
      cloneRouterList: []
    };
  },
  methods: {
    //单选表格内容
    handleCurrentRouterChange(row) {
      this.$emit("selectRouter", row);
    }
  }
};
</script>

<style></style>
