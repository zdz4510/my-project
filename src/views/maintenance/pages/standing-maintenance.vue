<template>
  <div class="standingMaintenance">
    <div class="query">
      <el-form
        :inline="true"
        :model="standingForm"
        ref="standingForm"
        label-width="70px"
      >
        <el-form-item label="产线">
          <el-input
            v-model="standingForm.workCenterRelation"
            placeholder="请输入产线"
          ></el-input>
        </el-form-item>
        <el-form-item label="站位">
          <el-input
            v-model="standingForm.station"
            placeholder="请输入站位"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleQuery">
            查询
          </el-button>
          <el-button size="small" type="primary" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="handleAdd">
        新增
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length < 1"
        @click="handleEdit"
      >
        修改
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length < 1"
        @click="handleDelete"
      >
        删除
      </el-button>
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
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="currentPage"
        @size-change="handlePagesize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findPageHttp,
  deleteStationBatchHttp
} from "@/api/maintenance/standing.api.js";
import { mapMutations } from "vuex";
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
      tableData: [],
      selectionList: [],
      stations: [],
      deleteDialog: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["STANDINGLIST"]),
    //初始化数据
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        station: this.standingForm.station,
        workCenterRelation: this.standingForm.workCenterRelation
      };
      findPageHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.total = res.data.total;
          this.tableData = res.data.data;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pageSize) {
      this.pageSize = pageSize;
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
    handleQuery() {
      console.log(11);
      this.init();
    },
    //重置
    handleReset() {
      this.standingForm.station = "";
      this.standingForm.workCenterRelation = "";
      this.init();
    },
    //新增
    handleAdd() {
      this.STANDINGLIST([]);
      this.$router.push({
        name: "standingMaintenanceEdit",
        query: { operateType: "add" }
      });
    },
    // //双击站位单元格
    // handleDblClick(row, column) {
    //   if (column.label === "站位") {
    //     const tempArr = [];
    //     tempArr.push(JSON.parse(JSON.stringify(row)));
    //     console.log(tempArr);
    //     this.STANDINGLIST(tempArr);
    //     this.$router.push({
    //       name: "standingMaintenanceEdit",
    //       query: { operateType: "edit" }
    //     });
    //   }
    // },
    //编辑
    handleEdit() {
      const tempArr = JSON.parse(JSON.stringify(this.selectionList));
      this.STANDINGLIST(tempArr);
      this.$router.push({
        name: "standingMaintenanceEdit",
        query: { operateType: "edit" }
      });
    },
    // checkSelectionLength() {
    //   if (this.selectionList.length === 0) {
    //     this.$message({
    //       message: "还没有选择哦",
    //       type: "warning"
    //     });
    //     return;
    //   }
    //   this.deleteDialog = true;
    // },
    handleDelete() {
      const data = this.selectionList;
      deleteStationBatchHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteDialog = false;
          this.init();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.deleteDialog = false;
      });
    },
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
