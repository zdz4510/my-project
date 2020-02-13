<template>
  <div class="work-center">
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
          @submit.native.prevent
        >
          <el-form-item label="工作中心:" prop="workCenter">
            <dsn-input
              v-model="searchForm.workCenter"
              placeholder="请输入内容"
              @keyup.enter.native="onEnterSearch"
            ></dsn-input>
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
        <dsn-button icon="el-icon-folder-add" size="small" type="success" @click.native="add" :disabled="this.checkedList.length>0">新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          @click.native="edit"
          :disabled="this.checkedList.length === 0 || this.checkedList.length > 1"
        >编辑</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click.native="del"
          :disabled="this.checkedList.length === 0"
        >删除</dsn-button>
        <dsn-button icon="el-icon-upload2" size="small" type="primary" @click.native="handleExport">导出</dsn-button>
      </div>

      <div>
        <dsn-table
          ref="multipleTable"
          :data="this.tableData.data"
          tooltip-effect="dark"
          row-key="workCenter"
          @selection-change="handleSelectionChange"
          @row-dblclick="rowDblClick"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="workCenter" label="工作中心"></el-table-column>
          <el-table-column prop="workCenterDes" label="工作中心描述"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">{{ scope.row.workCenterType == 1 ? '车间' : '产线' }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template
              slot-scope="scope"
            >{{ scope.row.status == 1 ? '已启用' : (scope.row.status == 2 ? '未启用' : '--') }}</template>
          </el-table-column>
        </dsn-table>
        <dsn-pagination
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
  getWorkCenterList,
  deleteWorkCenter
} from "../../../api/work.center.api.js";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
export default {
  name: "work-center",
  data() {
    return {
      tHeader: ["工作中心", "工作中心描述", "类型", "状态"],
      filterVal: ["workCenter", "workCenterDes", "workCenterType", "status"],
      fileName: "工作中心维护表",
      checkedList: [],
      formLabelWidth: "120px",
      dialog: false,
      activeName: "first",
      searchForm: {
        workCenter: "",
        tenantSiteCode: "test",
        deleteFlag: false
      },
      rules: {
        // process: [
        // 	{ required: true, message: '请输入工序名称', trigger: 'blur' },
        // ],
      },
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
    ...mapMutations(["SETWORKCENTEREDITLIST"]),
    onEnterSearch() {
      return false;
    },
    search() {
      let params = {
        deleteFlag: false,
        tenantSiteCode: this.searchForm.tenantSiteCode,
        workCenter: this.searchForm.workCenter,
        pageSize: this.tableData.page.pageSize,
        currentPage: this.tableData.page.currentPage
      };
      getWorkCenterList(params).then(data => {
        if (data.data.code == 200) {
          this.tableData.data = data.data.data.data;
          this.tableData.page.total = data.data.data.total;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleSizeChange(pageSize) {
      let _this = this;
      this.tableData.page.pageSize = pageSize;
      _this.search();
    },
    handleCurrentChange(currentPage) {
      let _this = this;
      this.tableData.page.currentPage = currentPage;
      _this.search();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
    },
    add() {
      this.$router.push({ path: "/workCenter/addWorkCenter" });
    },
    edit() {
      this.SETWORKCENTEREDITLIST(this.checkedList);
      this.$router.push({ path: "/workCenter/editWorkCenter" });
    },
    del() {
      let _this = this;
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = this.checkedList;
          deleteWorkCenter(params).then(data => {
            if (data.data.code == 200) {
              this.$message.success("删除成功");
              _this.search();
              this.$refs.multipleTable.clearSelection();
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    //导出开始
    handleExport() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.checkedList.map(item => {
          item.status = item.status ? "已启用" : "未启用";
          item.workCenterType = item.workCenterType == 1 ? "车间" : "产线";
        });
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = {
        deleteFlag: false,
        tenantSiteCode: this.searchForm.tenantSiteCode,
        workCenter: this.searchForm.workCenter,
        pageSize: 0,
        currentPage: this.tableData.page.currentPage
      };
      getWorkCenterList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          res.map(item => {
            item.status = item.status ? "已启用" : "未启用";
            item.workCenterType = item.workCenterType == 1 ? "车间" : "产线";
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
      // console.log(row, column, event);
      const tempList = [];
      tempList.push(row);
      this.SETWORKCENTEREDITLIST(tempList);
      this.$router.push({ path: "/workCenter/editWorkCenter" });
    }
  }
};
</script>

<style scoped lang="scss">
/* .work-center {
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
