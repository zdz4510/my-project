<template>
  <div class="operation-maintain">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <div class="search-bar">
        <el-form
          :inline="true"
          :model="searchForm"
          ref="searchForm"
          :rules="rules"
          class="form-style"
        >
          <el-form-item label="工序:" prop="operation">
            <dsn-input v-model="searchForm.operation"></dsn-input>
          </el-form-item>
          <el-form-item label prop>
            <dsn-button size="small" type="primary" @click.native="search">查询</dsn-button>
            <dsn-button size="small" type="primary" @click.native="resetForm('searchForm')">重置</dsn-button>
          </el-form-item>
        </el-form>
      </div>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <dsn-button size="small" icon="el-icon-folder-add" type="success" @click.native="add" :disabled="this.checkedList.length>0">新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          @click.native="edit"
          :disabled="this.checkedList.length === 0"
        >编辑</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click.native="del"
          :disabled="this.checkedList.length === 0"
        >删除</dsn-button>
        <dsn-button size="small" icon="el-icon-upload2" type="primary" @click.native="handleExport">导出</dsn-button>
      </div>

      <div>
        <dsn-table
          ref="multipleTable"
          :data="this.tableData.data"
          tooltip-effect="dark"
          row-key="mat"
          @selection-change="handleSelectionChange"
          @row-dblclick="rowDblClick"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="operation" label="工序"></el-table-column>
          <el-table-column prop="operationDes" label="工序描述"></el-table-column>
          <el-table-column prop="reportingStep" label="报告步骤"></el-table-column>
          <el-table-column prop="resourceGroup" label="设备组"></el-table-column>
          <el-table-column prop="certOperation" label="上岗证"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{ scope.row.status ? '已启用' : '未启用' }}</template>
          </el-table-column>
        </dsn-table>
        <dsn-pagination
          class="mtb20"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.tableData.page.currentPage"
          :page-size="this.tableData.page.pageSize"
          layout="->, total, prev, pager, next, sizes"
          :total="this.tableData.page.total"
        ></dsn-pagination>
      </div>
    </DsnPanel>
  </div>
</template>

<script>
import {
  getOperationList,
  deleteOperation
} from "../../../api/operation.maintain.api.js";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
import qs from "qs";
export default {
  name: "operation-maintain",
  data() {
    return {
      tHeader: ["工序", "工序描述", "报告步骤", "设备组", "上岗证", "状态"],
      filterVal: [
        "operation",
        "operationDes",
        "reportingStep",
        "resourceGroup",
        "certOperation",
        "status"
      ],
      fileName: "工序维护表",
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
    ...mapMutations(["SETOPERATIONEDITLIST"]),
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs['multipleTable'].clearSelection();
      this.search();
    },
    search() {
      let params = {
        pageSize: this.tableData.page.pageSize,
        currentPage: this.tableData.page.currentPage,
        operation: this.searchForm.operation
      };
      getOperationList(params).then(data => {
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
    del() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let arr = [];
          arr = this.checkedList.map(item => {
            return item.operation;
          });
          let obj = {
            list: arr
          };
          let params = qs.stringify(obj, { indices: false });
          deleteOperation(params).then(data => {
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.search();
              this.$refs.multipleTable.clearSelection();
            } else {
              this.$message.error(data.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      this.$router.push({ path: "/operationMaintain/addOperationMaintain" });
    },
    edit() {
      this.SETOPERATIONEDITLIST(this.checkedList);
      this.$router.push({ path: "/operationMaintain/editOperationMaintain" });
    },
    //导出开始
    handleExport() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.checkedList.map(item => {
          item.status = item.status ? "已启用" : "未启用";
        });
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = {
        pageSize: 0,
        currentPage: this.tableData.page.currentPage,
        operation: this.searchForm.operation
      };
      getOperationList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          res.map(item => {
            item.status = item.status ? "已启用" : "未启用";
          });
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
    },
    //导出结束
    //当某一行被双击时会触发该事件
    rowDblClick(row) {
      const tempList = [];
      tempList.push(row);
      this.SETOPERATIONEDITLIST(tempList);
      this.$router.push({ path: "/operationMaintain/editOperationMaintain" });
    }
  }
};
</script>

<style scoped lang="scss">
/* .operation-maintain {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .search-bar {
    padding: 10px;
    .el-form {
      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
} */
</style>
