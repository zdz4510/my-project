<template>
  <div class="materialModel">
    <dsn-table
      ref="singleTable"
      :data="cloneMaterialList"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentMaterialChange"
    >
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="material" label="物料号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="materialDes" label="物料描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="materialRev" label="物料版本" show-overflow-tooltip></el-table-column>
    </dsn-table>
  </div>
</template>

<script>
export default {
  name: "materialModel",
  props: {
    material: {
      type: Array,
      required: true
    }
  },
  created() {
    this.cloneMaterialList = JSON.parse(JSON.stringify(this.material));
  },
  data() {
    return {
      cloneMaterialList: []
    };
  },
  methods: {
    //单选表格内容
    handleCurrentMaterialChange(row) {
      this.$emit("selectMaterial", row);
    }
  }
};
</script>

<style></style>
