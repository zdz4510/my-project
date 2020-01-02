<template>
  <div class="standingMaintenance">
    <div class="query">
      <el-form
        :inline="true"
        :model="standingForm"
        ref="standingForm"
        label-width="100px"
      >
        <el-form-item label="产线">
          <el-autocomplete
            v-model="standingForm.workCenterRelation"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="站位" prop="station">
          <el-input
            v-model="standingForm.station"
            placeholder="请输入站位"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="warning" @click="handleQuery">
            查询
          </el-button>
          <el-button size="small" type="info" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="handleAdd">
        新增
      </el-button>
      <el-button size="small" type="primary" disabled>保存</el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length !== 1"
        @click="handleEdit"
      >
        修改
      </el-button>
      <!-- <el-button size="small" type="danger" @click="checkDeleteSelection">
        删除
      </el-button> -->
      <!-- <el-button size="small" type="primary" @click="handleExport"
        >导出</el-button
      > -->
      <el-button size="small" type="primary" @click="handleImport"
        >导入</el-button
      >
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="station" label="站位" width="60">
        </el-table-column>
        <el-table-column prop="stationDes" label="站位描述" width="100">
        </el-table-column>
        <el-table-column prop="padIp" label="IP地址" width="120">
        </el-table-column>
        <el-table-column prop="resource" label="设备" width="100">
        </el-table-column>
        <el-table-column prop="workCenter" label="工作中心" width="100">
        </el-table-column>
        <el-table-column prop="workCenterRelation" label="产线" width="80">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="60">
        </el-table-column>
        <el-table-column prop="stationType" label="站位类型" width="100">
        </el-table-column>
        <el-table-column prop="fullQty" label="满站数量" width="100">
        </el-table-column>
        <el-table-column prop="name" label="总在制" width="100">
        </el-table-column>
        <el-table-column prop="address" label="站内在制" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pagesize"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="currentPage"
        @size-change="handlePagesize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import { findPageHttp } from "@/api/maintenance/standing.api.js";

export default {
  data() {
    return {
      standingForm: {
        //产线
        workCenterRelation: "",
        //站位
        station: ""
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      selectionList: [],
      stations: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化数据
    init() {
      // findPageHttp().then(() => {});
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pagesize) {
      this.pagesize = pagesize;
      this.currentPage = 1;
      this.init();
    },
    //模糊查询建议
    querySearch() {},
    //模糊查询后选择
    handleSelect() {},
    //复选框选择
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //查询
    handleQuery() {},
    //重置
    handleReset() {},
    //新增
    handleAdd() {},
    //编辑
    handleEdit() {},
    //导入
    handleImport() {}
  }
};
</script>

<style lang="scss">
.standingMaintenance {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .right {
      width: 680px;
      padding: 5px 30px;
    }
  }
}
</style>
