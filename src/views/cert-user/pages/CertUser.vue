<template>
  <div class="cert-user">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <div class="search-bar">
        <el-form
          :inline="true"
          :model="searchForm"
          ref="searchForm"
          :rules="rules"
          class="form-style"
        >
          <el-form-item label="用户:" prop="user">
            <dsn-input v-model="searchForm.user"></dsn-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="name">
            <dsn-input v-model="searchForm.name"></dsn-input>
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
        <!-- <dsn-button class="mr25 pad1025" size="small" type="primary" @click="add" :disabled="this.checkedList.length>0">新增</dsn-button> 逻辑变更，此功能去掉，注意后面去掉路由配置信息 -->
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
      <div>
        <dsn-table
          ref="multipleTable"
          :data="this.tableData.data"
          tooltip-effect="dark"
          row-key="user"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="user" label="用户"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="cert" label="上岗证"></el-table-column>
          <el-table-column prop="certDes" label="上岗证描述"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{ scope.row.status == true ? '已启用' : '未启用' }}</template>
          </el-table-column>
          <el-table-column label="持续时间类型">
            <template slot-scope="scope">{{ scope.row.certType == true ? '永久' : '临时' }}</template>
          </el-table-column>
          <el-table-column prop="certTime" label="上岗证截止日期"></el-table-column>
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
import { getCertUserList, deleteData } from "../../../api/cert.user.api";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      tHeader: [
        "用户",
        "姓名",
        "上岗证",
        "上岗证描述",
        "状态",
        "持续时间类型",
        "上岗证截止日期"
      ],
      filterVal: [
        "user",
        "name",
        "cert",
        "certDes",
        "status",
        "certType",
        "certTime"
      ],
      fileName: "用户证明维护表",
      checkedList: [],
      formLabelWidth: "100px",
      searchForm: {
        user: "",
        name: ""
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
    ...mapMutations(["SETCERTUSEREDITLIST"]),
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    search() {
      const params = this.searchForm;
      params.pageSize = this.tableData.page.pageSize;
      params.currentPage = this.tableData.page.currentPage;
      if (!params.name) delete params.name;
      if (!params.user) delete params.user;
      getCertUserList(params).then(data => {
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
          this.checkedList.map(item => {
            item.cert = [];
          });
          deleteData(this.checkedList).then(data => {
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
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
      this.$router.push({ path: "/certUser/addCertUser" });
    },
    edit() {
      this.SETCERTUSEREDITLIST(this.checkedList);
      this.$router.push({ path: "/certUser/editCertUser" });
    },
    //导出开始
    handleExport() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.checkedList.map(item => {
          item.status = item.status ? "已启用" : "未启用";
          item.certType = item.certType ? "永久" : "临时";
        });
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = this.searchForm;
      params.pageSize = 0;
      params.currentPage = this.tableData.page.currentPage;
      getCertUserList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          res.map(item => {
            item.status = item.status ? "已启用" : "未启用";
            item.certType = item.certType ? "永久" : "临时";
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
.cert-user {
  padding: 10px 0;
  .search-bar {
		
  }
}
</style>
