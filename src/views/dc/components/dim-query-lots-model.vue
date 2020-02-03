<template>
  <div class="allLotModel">
    <el-table
      ref="singleTable"
      :data="lot"
      highlight-current-row
      style="width: 100%"
      height="500px"
      @current-change="handleCurrentLotChange"
      filter-placement="100"
    >
      <el-table-column type="index" label="序号" width="80">
        <template slot="header">
          <span>序号</span>
          <div style="height:38px"></div>
        </template>
      </el-table-column>
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
        <template slot="header">
          <span>Lot编号</span>
          <el-input
            placeholder="请输入搜索关键字"
            v-model="search.lot"
            @input="searchLot"
          />
        </template>
      </el-table-column>
      <el-table-column prop="shopOrder" label="LOT" show-overflow-tooltip>
        <template slot="header">
          <span>工单</span>
          <el-input placeholder="请输入搜索关键字" v-model="search.shopOrder" />
        </template>
      </el-table-column>
      <el-table-column prop="router" label="LOT" show-overflow-tooltip>
        <template slot="header">
          <span>工艺路线</span>
          <el-input placeholder="请输入搜索关键字" v-model="search.router" />
        </template>
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
  created() {
    this.cloneLotList = JSON.parse(JSON.stringify(this.lot));
  },
  data() {
    return {
      search: {
        lot: "",
        shopOrder: "",
        router: ""
      },
      cloneLotList: []
    };
  },
  methods: {
    //单选表格内容
    handleCurrentLotChange(row) {
      this.$emit("selectLot", row);
    },
    searchLot() {
      console.log(this.search.lot);
    }
  }
};
</script>

<style></style>
