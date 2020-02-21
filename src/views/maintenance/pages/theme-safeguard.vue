<template>
  <div class="topic">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form
        :model="themeForm"
        ref="themeForm"
        label-width="100px"
        class="themeForm"
        :inline="true"
      >
        <el-form-item label="主题" prop="topic">
          <dsn-input v-model.trim="themeForm.topic" placeholder="请输入主题"></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="handleQuery">查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="handleReset">重置</dsn-button>
        </el-form-item>
      </el-form>
    </DsnPanel>
    
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
      <dsn-button size="small" type="success" icon="el-icon-folder-add" @click="handleAdd">新增</dsn-button>
      <dsn-button
        size="small"
        type="primary"
        icon="el-icon-edit"
        :disabled="selectionList.length !=1"
        @click="handleEdit"
      >编辑</dsn-button>
      <dsn-button size="small" type="primary" :disabled="true">保存</dsn-button>
      <dsn-button
        size="small"
        type="danger"
        icon="el-icon-delete"
        :disabled="selectionList.length <= 0"
        @click="handleDelete"
        >删除</dsn-button>
      </div>
      <dsn-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="topic" label="主题"></el-table-column>
        <el-table-column prop="topicDes" label="主题描述"></el-table-column>
        <el-table-column prop="catenation" label="地址连接"></el-table-column>
      </dsn-table>
    </DsnPanel>
    <div class="pagination">
      <dsn-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pagesize"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="currentPage"
        @size-change="handlePagesize"
        @current-change="handleCurrentChange"
      ></dsn-pagination>
    </div>
    <el-dialog title="删除" :visible.sync="deleteDialog" :width="defaltDialogWidth">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="deleteDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="sureDelete">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findTopicPageHttp,
  deleteTopicBatchHttp
} from "@/api/theme/theme.api.js";
import { mapMutations } from "vuex";
// import { exportExcel } from "@/until/excel.js";

const tHeader = ["主题", "主题描述", "地址连接"];
const filterVal = [
  "topic",
  "materialTotal",
  "topicDes",
  "catenation",
  "createTime",
  "modifyUserName",
  "modifyTime"
];
const fileName = "主题维护表";
export default {
  inject: ["defaltDialogWidth"],
  data() {
    return {
      tHeader,
      filterVal,
      fileName,
      themeForm: {
        topic: ""
      },
      tableData: [],
      selectionList: [],
      //分页
      currentPage: 1,
      pagesize: 10,
      total: 0,
      deleteDialog:false
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["THEMELIST"]),
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        topic: this.themeForm.topic
      };
      findTopicPageHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.total = res.data.total;
          this.tableData = res.data.data;
          // this.themeForm.topic = "";
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
      //   findPageHttp(data).then(data => {
      //     const res = data.data;
      //     if (res.code === 200) {
      //       // this.pageShow = true;
      //       this.total = res.data.total;
      //       this.tableData = res.data.data;
      //       // this.themeForm.topic = "";
      //       return;
      //     }
      //     this.$message({
      //       message: res.message,
      //       type: "warning"
      //     });
      //   });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
      // 将选中的数据获取放到vuex中
      this.THEMELIST(this.selectionList);
      // console.log(this.THEMELIST(this.selectionList),"vuex是佛")
      // console.log(this.selectionList);
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
    handleAdd() {
      this.$router.push({ path: "/maintenance/themeAdd" });
    },
    handleEdit() {
      console.log(this.selectionList);
      this.THEMELIST(this.selectionList);
      this.$router.push({ path: "/maintenance/themeEdit" });
    },
    handleQuery() {
      this.init();
    },
    handleReset() {
      this.themeForm.topic = "";
      this.tableData = [];
    },
    //未选择导出请求数据
    // exportHttp() {
    //   const request = {
    //     currentPage: this.currentPage,
    //     pageSize: 0,
    //     topic: this.themeForm.topic
    //   };
    //   findPageHttp(request).then(data => {
    //     const res = data.data;
    //     if (res.code === 200) {
    //       data = res.data.data;
    //       data.forEach(element => {
    //         element.materialTotal = element.materialList.length;
    //       });
    //       this.exportResult(data);
    //       return;
    //     }
    //     this.$message({
    //       message: res.message,
    //       type: "warning"
    //     });
    //   });
    // },
    //删除
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "请先选择要删除的项",
          type: "warning"
        });
      }
      if (this.selectionList.length > 0) {
        this.deleteDialog=true;
      }
    },
    sureDelete(){
        const data = this.selectionList;
        deleteTopicBatchHttp(data).then(data => {
          const res = data.data;
          if (res.code === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.init();
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
          this.deleteDialog=false;
        });
    }
    //返回结果，提示信息
    // exportResult(data) {
    //   const tipString = exportExcel(tHeader, filterVal, data, this.fileName);
    //   if (tipString === undefined) {
    //     this.$message({
    //       message: "导出成功",
    //       type: "success"
    //     });
    //     return;
    //   } else {
    //     this.$message({
    //       message: tipString,
    //       type: "warning"
    //     });
    //     return;
    //   }
    // }
  }
};
</script>

<style lang="scss">
.topic {
  // padding: 0 30px;
  // .query {
  //   padding: 10px;
  //   .el-form {
  //     .el-form-item {
  //       margin-bottom: 0px;
  //     }
  //   }
  // }
  // .operate {
  //   padding: 10px 5px;
  // }
  // .showInfo {
  //   width: 100%;
  //   // .el-table__header{
  //   //   width: 1000px !important;
  //   // }
  // }
}
</style>