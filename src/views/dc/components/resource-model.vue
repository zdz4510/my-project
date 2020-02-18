<template>
  <div class="resourceModel">
    <dsn-table
      ref="singleTable"
      :data="cloneResourceList"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentResourceChange"
    >
      <el-table-column type="index" label="序号" width="45"></el-table-column>
      <el-table-column prop="resource" label="资源" show-overflow-tooltip></el-table-column>
      <el-table-column prop="resourceDes" label="资源描述" show-overflow-tooltip></el-table-column>
    </dsn-table>
  </div>
</template>

<script>
export default {
  name: "resourceModel",
  props: {
    resource: {
      type: Array,
      required: true
    }
  },
  created() {
    this.cloneResourceList = JSON.parse(JSON.stringify(this.resource));
  },
  data() {
    return {
      cloneResourceList: []
    };
  },
  methods: {
    //单选表格内容
    handleCurrentResourceChange(row) {
      this.$emit("selectResource", row);
    }
  }
};
</script>

<style></style>
