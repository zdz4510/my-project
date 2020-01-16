<template>
  <div class="topic">
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
        :disabled="selectionList.length <= 0"
        @click="deleteDialog = true"
      >
        保存
      </el-button>
      <el-button size="small" type="primary" @click="handleExport"
        >重置</el-button
      >
      <!-- <el-button size="small" type="primary" @click="handleQuery">
          查询
        </el-button>
        <el-button size="small" type="primary" @click="handleReset">
          重置
        </el-button> -->
    </div>
    <div class="showInfo">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.topic"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.topicDec"></el-input>
          </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="first">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="地址链接">
              <el-input v-model="form.catenation"></el-input>
            </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="主题与站位关系维护" name="second">主题与站位关系维护</el-tab-pane>
        </el-tabs>
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
import { findPageHttp, deleteHttp } from "@/api/material/material.group.api.js";
import { mapMutations } from "vuex";
import { exportExcel } from "@/until/excel.js";

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
      // themeForm: {
      //   topic: ""
      // },
      form:{
        topic:'',
        topicDec:'',
        catenation:''
      },
      tableData: [],
      selectionList: [],
      //分页
      currentPage: 1,
      pagesize: 10,
      total: 0,
      deleteDialog: false
    };
  },
  created() {
    // this.init();
  },
  methods: {
    ...mapMutations(["topicLIST"]),
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        topic: this.themeForm.topic
      };
      findPageHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          // this.pageShow = true;
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
      this.topicLIST(this.selectionList);
      this.$router.push({
        // path: "/device/topicEdit",
        name: "topicEdit",
        query: { operateType: "edit" }
      });
    },
    handleDelete() {
      deleteHttp(this.selectionList).then(data => {
        const res = data.data;
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.deleteDialog = false;
          this.init();
          return;
        }
        this.deleteDialog = false;
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleQuery() {
      this.init();
    },
    handleReset() {
      this.themeForm.topic = "";
      this.init();
    },
    //未选择导出请求数据
    exportHttp() {
      const request = {
        currentPage: this.currentPage,
        pageSize: 0,
        topic: this.themeForm.topic
      };
      findPageHttp(request).then(data => {
        const res = data.data;
        if (res.code === 200) {
          data = res.data.data;
          data.forEach(element => {
            element.materialTotal = element.materialList.length;
          });
          this.exportResult(data);
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //导出
    handleExport() {
      if (this.selectionList.length === 0) {
        this.exportHttp();
      }
      if (this.selectionList.length > 0) {
        const data = this.selectionList;
        this.exportResult(data);
      }
    },
    //返回结果，提示信息
    exportResult(data) {
      const tipString = exportExcel(tHeader, filterVal, data, this.fileName);
      if (tipString === undefined) {
        this.$message({
          message: "导出成功",
          type: "success"
        });
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    }
  }
};
</script>

<style lang="scss">
.topic {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
    .el-form-item__content{
      .el-input__inner{
        width:120px !important;
      }
    }
  }
  .showInfo {
    padding: 10px;
    background-color:#ffffff;
  }
}
</style>
