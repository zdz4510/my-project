<template>
  <div class="topic">
    <div class="query">
      <div class="left">
        <el-form
          :model="themeForm"
          ref="themeForm"
          label-width="100px"
          class="themeForm"
        >
          <el-form-item label="主题" prop="topic">
            <el-input
              v-model.trim="themeForm.topic"
              placeholder="请输入主题"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="primary" @click="handleQuery">
          查询
        </el-button>
        <el-button size="small" type="primary" @click="handleReset">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="handleAdd">
        新增
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length <= 0"
        @click="handleEdit"
      >
        编辑
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="true"
      >
        保存
      </el-button>
      <el-button size="small"
        type="danger"
        :disabled="selectionList.length <= 0" 
        @click="handleExport"
      >删除
      </el-button>
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="topic" label="主题">
        </el-table-column>
        <el-table-column prop="topicDes" label="主题描述">
        </el-table-column>
        <el-table-column prop="catenation" label="地址连接">
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

import { findTopicPageHttp,deleteTopicBatchHttp } from "@/api/theme/theme.api.js";
import { mapMutations } from "vuex";
// import { exportExcel } from "@/until/excel.js";

const tHeader = [
  "主题",
  "主题描述",
  "地址连接",
];
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
    };
  },
  created() {
    // this.init();
  },
  methods: {
    ...mapMutations(["themeList"]),
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
      this.themeList(this.selectionList);
      // console.log(this.themeList(this.selectionList),"vuex是佛")
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
      this.$router.push({path:'/maintenance/themeAdd'});
    },
    handleEdit() {
      console.log(this.selectionList);
      // this.topicLIST(this.selectionList);
      this.$router.push({path:'/maintenance/themeEdit'});
    },
    handleQuery() {
      this.init();
    },
    handleReset() {
      this.themeForm.topic = "";
      this.tableData=[];
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
    handleExport() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "请先选择要删除的项",
          type: "warning"
        });
      }
      if (this.selectionList.length > 0) {
        const data = this.selectionList;
        deleteTopicBatchHttp(data).then(data=>{
          const res =data.data;
          if(res.code === 200){
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }else{
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        })
      }
    },
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
  padding: 0 30px;
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .right {
      width: 380px;
      padding: 5px 30px;
    }
  }
  .operate {
    padding: 10px 5px;
  }
  .showInfo{
    width:100%;
    // .el-table__header{
    //   width: 1000px !important;
    // }
  }
}
</style>
