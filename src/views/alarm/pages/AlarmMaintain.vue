<template>
  <div class="alarm-maintain">
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
          :label-width="formLabelWidth"
        >
          <el-form-item label="事件编号:" prop="alarm">
            <dsn-input v-model="searchForm.alarm"></dsn-input>
          </el-form-item>
          <el-form-item label="事件主题:" prop="theme">
            <dsn-input v-model="searchForm.theme"></dsn-input>
          </el-form-item>
          <el-form-item>
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

      <div class>
        <dsn-table
          ref="multipleTable"
          :data="this.tableData.data"
          tooltip-effect="dark"
          row-key="alarm"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="alarm" label="事件编号"></el-table-column>
          <el-table-column prop="theme" label="事件主题"></el-table-column>
          <el-table-column label="事件等级">
            <template
              slot-scope="scope"
            >{{ scope.row.alarmLevelFlag == 10 ? '提示' : (scope.row.alarmLevelFlag == 20 ? '警告' : '错误') }}</template>
          </el-table-column>
          <el-table-column prop="createUserName" label="创建人"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="modifyUserName" label="修改人"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
        </dsn-table>
        <dsn-pagination
          class="mtb20"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.tableData.page.currentPage"
          :page-sizes="[1, 10, 15, 20, 30, 50]"
          :page-size="this.tableData.page.pageSize"
          layout="->, total, prev, pager, next, sizes"
          :total="this.tableData.page.total"
        ></dsn-pagination>
      </div>
    </DsnPanel>
  </div>
</template>

<script>
import { getAlarmDefList, deleteData } from "../../../api/alarm.maintain.api";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
export default {
  name: "alarm-maintain",
  data() {
    return {
      tHeader: [
        "事件编号",
        "事件主题",
        "事件等级",
        "创建人",
        "创建时间",
        "修改人",
        "修改时间"
      ],
      filterVal: [
        "alarm",
        "theme",
        "alarmLevelFlag",
        "createUserName",
        "createTime",
        "modifyUserName",
        "modifyTime"
      ],
      fileName: "预警事件维护表",
      checkedList: [],
      formLabelWidth: "100px",
      searchForm: {
        alarm: "",
        theme: ""
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
    ...mapMutations(["SETALARMMAINTAINEDITLIST"]),
    search() {
      let params = this.searchForm;
      params.pageSize = this.tableData.page.pageSize;
      params.currentPage = this.tableData.page.currentPage;
      getAlarmDefList(params).then(data => {
        if (data.data.code == 200) {
          this.tableData.data = data.data.data.data;
          this.tableData.page.total = data.data.data.total;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.tableData.page.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.tableData.page.currentPage = currentPage;
      this.search();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
      console.log(val);
    },
    del() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteData(this.checkedList).then(data => {
            if (data.data.code == 200) {
              this.$message.success("删除成功");
              this.search();
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
    add() {
      this.$router.push({ path: "/alarm/addAlarmMaintain" });
    },
    edit() {
      this.SETALARMMAINTAINEDITLIST(this.checkedList);
      this.$router.push({ path: "/alarm/editAlarmMaintain" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
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
          item.alarmLevelFlag =
            item.alarmLevelFlag == 10
              ? "提示"
              : item.alarmLevelFlag == 20
              ? "警告"
              : "错误";
        });
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = this.searchForm;
      params.pageSize = 0;
      params.currentPage = this.tableData.page.currentPage;
      getAlarmDefList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          res.map(item => {
            item.alarmLevelFlag =
              item.alarmLevelFlag == 10
                ? "提示"
                : item.alarmLevelFlag == 20
                ? "警告"
                : "错误";
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
    }
    //导出结束
  }
};
</script>

<style scoped lang="scss">
/* .alarm-maintain {
  padding: 0 30px;
  .search-bar {
    padding: 10px 0;
    .el-form {
      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
} */
</style>
