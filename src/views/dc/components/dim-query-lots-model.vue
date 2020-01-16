<template>
  <div class="allLotModel">
    <el-table
      ref="singleTable"
      :data="lot"
      highlight-current-row
      style="width: 100%"
      height="200px"
      @current-change="handleCurrentLotChange"
      filter-placement="100"
    >
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <!-- <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="scope.row.lot"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
      </el-table-column> -->
      <el-table-column prop="lot" label="LOT" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "dimQueryLotsModel",
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
