<template>
  <div class="define-program-model">
    <el-table
      ref="singleTable"
      :data="defineProgramData.definedData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column
        v-for="(field, index) in defineProgramData.fields"
        :key="index"
        :prop="field.fieldName"
        :label="field.fieldName"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "define-program-model",
  props: {
    customizedItems: Object
  },
  data() {
    return {
      // currentRow: null,
      defineProgramData: {}
    };
  },
  created() {
    console.log(this.customizedItems);
    this.defineProgramData = JSON.parse(JSON.stringify(this.customizedItems));
  },
  methods: {
    handleCurrentChange(val) {
      // this.currentRow = val;
      this.$emit("selectDefineProgram", val);
    }
  }
};
</script>

<style>
</style>