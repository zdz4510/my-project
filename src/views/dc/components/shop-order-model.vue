<template>
  <div class="shopOrderModel">
    <dsn-table
      ref="singleTable"
      :data="cloneShopOrderList"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentShopOrderChange"
    >
      <el-table-column type="index" label="序号" width="45"></el-table-column>
      <el-table-column prop="shopOrder" label="工单" show-overflow-tooltip></el-table-column>
      <el-table-column prop="shopOrderType" label="工单类型" show-overflow-tooltip></el-table-column>
    </dsn-table>
  </div>
</template>

<script>
export default {
  name: "shopOrderModel",
  props: {
    shopOrder: {
      type: Array,
      required: true
    }
  },
  created() {
    this.cloneShopOrderList = JSON.parse(JSON.stringify(this.shopOrder));
  },
  data() {
    return {
      cloneShopOrderList: []
    };
  },
  methods: {
    //单选表格内容
    handleCurrentShopOrderChange(row) {
      this.$emit("selectShopOrder", row);
    }
  }
};
</script>

<style></style>
