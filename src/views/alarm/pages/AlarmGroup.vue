<template>
  <div class="alarm-group">
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
          <el-form-item label="预警事件分组:" prop="alarmGroup">
            <dsn-input v-model="searchForm.alarmGroup"></dsn-input>
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
        <dsn-button icon="el-icon-upload2" size="small" type="primary" @click.native="handleExport">导出</dsn-button>
      </div>

      <div class>
        <dsn-table
          ref="multipleTable"
          :data="this.tableData.data"
          tooltip-effect="dark"
          row-key="alarmGroup"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="alarmGroup" label="预警事件分组"></el-table-column>
          <el-table-column prop="alarmCount" label="事件数量"></el-table-column>
          <el-table-column prop="groupDes" label="分组描述"></el-table-column>
          <el-table-column prop="createUserName" label="创建人"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="modifyUserName" label="修改人"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
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
import { getAlarmGroupList, deleteData } from "../../../api/alarm.group.api";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
export default {
  name: "alarm-group",
  data() {
    return {
      tHeader: [
        "预警事件分组",
        "事件数量",
        "分组描述",
        "创建人",
        "创建时间",
        "修改人",
        "修改时间"
      ],
      filterVal: [
        "alarmGroup",
        "alarmCount",
        "groupDes",
        "createUserName",
        "createTime",
        "modifyUserName",
        "modifyTime"
      ],
      fileName: "预警事件分组维护表",
      checkedList: [],
      formLabelWidth: "120px",
      searchForm: {
        alarmGroup: ""
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
    ...mapMutations(["SETALARMGROUPEDITLIST"]),
    search() {
      let params = this.searchForm;
      params.pageSize = this.tableData.page.pageSize;
      params.currentPage = this.tableData.page.currentPage;
      getAlarmGroupList(params).then(data => {
        this.tableData.data = data.data.data.data;
        this.tableData.page.total = data.data.data.total;
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
            console.log(data, "adddata");
            if (data.data.code == 200) {
              this.$message.success("删除成功");
              this.$refs.multipleTable.clearSelection();
              this.search();
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
      this.$router.push({ path: "/alarm/addAlarmGroup" });
    },
    edit() {
      this.SETALARMGROUPEDITLIST(this.checkedList);
      this.$router.push({ path: "/alarm/editAlarmGroup" });
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
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = this.searchForm;
      params.pageSize = 0;
      params.currentPage = this.tableData.page.currentPage;
      getAlarmGroupList(params).then(data => {
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

<style lang="scss">
/* .alarm-group {
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
