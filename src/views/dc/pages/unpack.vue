<template>
  <div class="unpack">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :model="payload" :rules="payloadRules" :inline="true">
        <el-form-item label="物料号:" prop="mat">
          <dsn-input placeholder="请输入物料号" v-model="payload.mat"></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="getList">查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="handleReset">重置</dsn-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件end -->
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <!-- 表格操作start -->
      <div class="operation">
        <dsn-button type="success" icon="el-icon-folder-add" size="small" @click="goEdit">新增</dsn-button>
        <dsn-button type="primary" icon="el-icon-edit" size="small" @click="handleModify">修改</dsn-button>
        <dsn-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete">删除</dsn-button>
      </div>
      <dsn-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectCheck"
        @row-click="selectCheckBox"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="dataIndex" label="序号" width="50"></el-table-column>
        <el-table-column prop="mat" label="物料号" width="120"></el-table-column>
        <el-table-column prop="containerType" label="容器类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="packingClass" label="包装层级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mainNumberType" label="容器编号规则" show-overflow-tooltip>
          <span slot-scope="scope">{{scope.row.mainNumberType?'是':"否"}}</span>
        </el-table-column>
        <el-table-column prop="mainNumberRev" label="容器编号版本" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accommodateNumber" label="容器容纳数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="labelPrinting" label="容器标签打印" show-overflow-tooltip>
          <span slot-scope="scope">{{scope.row.labelPrinting?'是':"否"}}</span>
        </el-table-column>
      </dsn-table>
      <dsn-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="payload.pagesize"
        :current-page="payload.currentPage"
        @current-change="handleCurrentChange"
        @size-change="handlePagesize"
      ></dsn-pagination>
    </DsnPanel>
    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%" :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="deleteDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureDelete">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import {
  deletePackagingConfigurationBatch,
  getPagData
} from "@/api/dc/unpack.api";
export default {
  data() {
    let validateMat = (rule, value, callback) => {
      let reg = /^([A-Za-z0-9]{1,30})$/g;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("只能输入字母或者数字，最长30位"));
      }
      this.payload.mat = this.payload.mat.toUpperCase();
      callback();
    };
    return {
      payload: {
        currentPage: 1,
        pageSize: 10,
        mat: ""
      },
      payloadRules: {
        mat: [{ required: false, validator: validateMat, trigger: "change" }]
      },
      total: 0,
      deleteDialog: false,
      tableData: [],
      selectList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapMutations(["UNPACKEDIT"]),
    handleReset() {
      this.payload.mat = "";
      this.getList();
    },
    handleClose() {
      this.deleteDialog = false;
    },
    handleModify() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      this.UNPACKEDIT(JSON.parse(JSON.stringify(this.selectList)));
      this.$router.push({
        name: "unpackEdit",
        query: { operateType: "edit" }
      });
    },
    sureDelete() {
      deletePackagingConfigurationBatch(this.selectList).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteDialog = false;
          this.getList();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.deleteDialog = false;
      });
    },
    handleDelete() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      this.deleteDialog = true;
    },
    handleCurrentChange(currentChange) {
      this.payload.currentPage = currentChange;
      this.getList();
    },
    // pagesize 改变之后的回调
    handlePagesize(pagesize) {
      this.pagesize = pagesize; //设置pagesize
      this.payload.currentPage = 1; // 从第一页开始请求
      this.getList(); //从新渲染分页
    },
    //当用户勾选数据行的 Checkbox 时触发的事件
    selectCheck(selection) {
      this.selectList = selection;
    },
    selectCheckBox(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getList() {
      getPagData(this.payload).then(res => {
        const {
          data: {
            data: { data }
          }
        } = res;
        console.log(res.data.data, "res");
        this.total = res.data.data.total;
        const resData = data.map((item, i) => {
          return {
            ...item,
            dataIndex: i + 1
          };
        });
        this.tableData = resData;
      });
    },
    goEdit() {
      this.$router.push({ name: "unpackEdit", query: { operateType: "add" } });
    }
  }
};
</script>
<style lang="scss">
</style>
