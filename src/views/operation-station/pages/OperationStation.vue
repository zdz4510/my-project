<template>
  <div class="operation-station">
    <div class="search-bar">
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        :rules="rules"
        class="form-style"
        :label-width="formLabelWidth"
      >
        <el-form-item label="工序:" prop="operation">
          <el-input v-model="searchForm.operation"></el-input>
        </el-form-item>
        <el-form-item label prop>
          <el-button size="small" type="primary" @click="search">查询</el-button>
          <el-button size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="add" :disabled="this.checkedList.length>0">新增</el-button>
      <el-button
        size="small"
        type="primary"
        @click="edit"
        :disabled="this.checkedList.length === 0"
      >编辑</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
    </div>

    <div class>
      <el-table
        ref="multipleTable"
        :data="this.tableData.data"
        tooltip-effect="dark"
        row-key="mat"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="operation" label="工序"></el-table-column>
        <el-table-column prop="station" label="站位"></el-table-column>
        <el-table-column prop="workCenterRelation" label="产线"></el-table-column>
      </el-table>
      <el-pagination
        class="mtb20"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.tableData.page.currentPage"
        :page-sizes="[5, 10, 15, 20, 25, 30]"
        :page-size="this.tableData.page.pageSize"
        layout="->, total, prev, pager, next, sizes, jumper"
        :total="this.tableData.page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getStationList } from "../../../api/operation.station.api.js";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
export default {
  name: "operation-station",
  data() {
    return {
      tHeader: ["工序", "站位", "产线"],
      filterVal: ["operation", "station", "workCenterRelation"],
      fileName: "工序与站位维护表",
      checkedList: [],
      formLabelWidth: "100px",
      searchForm: {
        operation: ""
      },
      rules: {},
      tableData: {
        data: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    };
  },
  created() {
    this.search();
  },
  methods: {
    ...mapMutations(["SETSTATIONEDITLIST"]),
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    search() {
      let params = {
        pageSize: this.tableData.page.pageSize,
        currentPage: this.tableData.page.currentPage,
        operation: this.searchForm.operation
      };
      getStationList(params).then(data => {
        if (data.data.code == 200) {
          this.tableData.data = data.data.data.data;
          this.tableData.page.total = data.data.data.total;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleSizeChange(pageSize) {
      this.tableData.page.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.tableData.page.currentPage = currentPage;
      this.search();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
    },
    add() {
      this.$router.push({ path: "/operationStation/addOperationStation" });
    },
    edit() {
      this.SETSTATIONEDITLIST(this.checkedList);
      this.$router.push({ path: "/operationStation/editOperationStation" });
    },
    //导出开始
    handleExport() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = {
        pageSize: 0,
        currentPage: this.tableData.page.currentPage,
        operation: this.searchForm.operation
      };
      getStationList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          this.exportResult(res);
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    exportResult(data) {
      const tipString = exportExcel(
        this.tHeader,
        this.filterVal,
        data,
        this.fileName
      );
      if (tipString === undefined) {
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    }
    //导出结束
  }
};
</script>

<style scoped lang="scss">
.operation-station {
  padding: 0 30px;
  .search-bar {
    padding: 10px;
    .el-form {
      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
  .operate {
    padding: 10px 5px;
  }
}
</style>
