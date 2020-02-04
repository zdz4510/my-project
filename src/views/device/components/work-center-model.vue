<template>
  <div class="work-center-model">
    <el-table
      ref="workCenter"
      :data="workCenterData"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentWorkCenterChange"
    >
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="workCenter" label="工作中心"></el-table-column>
      <el-table-column prop="workCenterDes" label="工作中心描述" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "workCneterModel",
  props: {
    workCenterData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCurrentWorkCenterChange(row) {
      this.$emit("selectWorkCenter", row);
    }
  }
};
</script>

<style>
</style>