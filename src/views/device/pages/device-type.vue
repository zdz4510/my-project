<template>
  <div class="deviceType">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <div class="query">
        <el-form
          :model="typeForm"
          ref="typeForm"
          class="typeForm"
          :inline="true"
          :rules="typeFormRules"
        >
          <el-form-item label="设备类型" prop="resourceGroup">
            <dsn-input
              style="width: 200px"
              v-model.trim="typeForm.resourceGroup"
              placeholder="请输入设备类型"
            ></dsn-input>
          </el-form-item>
          <el-form-item label prop>
            <dsn-button size="small" type="primary" @click.native="handleQuery">查询</dsn-button>
            <dsn-button size="small" type="primary" @click.native="handleReset">重置</dsn-button>
          </el-form-item>
        </el-form>
      </div>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <dsn-button
          size="small"
          icon="el-icon-folder-add"
          type="success"
          @click.native="handleAdd"
          :disabled="selectionList.length > 0"
        >新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          :disabled="selectionList.length !== 1"
          @click.native="handleEdit"
        >修改</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          :disabled="selectionList.length <= 0"
          @click.native="deleteDialog = true"
        >删除</dsn-button>
        <dsn-button
          icon="el-icon-upload2"
          size="small"
          type="primary"
          @click.native="handleExport"
        >导出</dsn-button>
      </div>
      <div class="showInfo">
        <dsn-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="resourceGroup" label="设备类型"></el-table-column>
          <el-table-column prop="resourceCount" label="设备数量"></el-table-column>
          <el-table-column prop="groupDes" label="设备类型描述" width="170"></el-table-column>

          <el-table-column prop="createUserName" label="创建人"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
          <el-table-column prop="modifyUserName" label="修改人"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" show-overflow-tooltip></el-table-column>
        </dsn-table>
      </div>
      <div class="pagination">
        <dsn-pagination
          background
          layout="->,total,prev,pager,next,sizes"
          :total="total"
          :page-size="pagesize"
          :current-page="currentPage"
          @size-change="handlePagesize"
          @current-change="handleCurrentChange"
        ></dsn-pagination>
      </div>
    </DsnPanel>
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="deleteDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleDelete">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findResourceGroupListHttp,
  deleteResourceGroupHttp
} from "@/api/device/type.api.js";
import { mapMutations } from "vuex";
import { exportExcel } from "@/until/excel.js";

const tHeader = [
  "设备类型",
  "设备数量",
  "设备类型描述",
  "创建人",
  "创建时间",
  "修改人",
  "修改时间"
];
const filterVal = [
  "resourceGroup",
  "resourceCount",
  "groupDes",
  "createUserName",
  "createTime",
  "modifyUserName",
  "modifyTime"
];
const fileName = "设备类型表";
export default {
  data() {
    let validateResource = (rule, value, callback) => {
      if (value === "") {
        callback();
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("设备编号只包含（[A-Z,0-9,_,-,/]）");
      }
      this.typeForm.resourceGroup = value.toUpperCase();
      callback();
    };
    return {
      tHeader,
      filterVal,
      fileName,
      typeForm: {
        resourceGroup: ""
      },
      typeFormRules: {
        resourceGroup: [
          {
            validator: validateResource,
            trigger: "blur"
          }
        ]
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
    this.init();
  },
  methods: {
    ...mapMutations(["SETTYPELIST"]),
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        resourceGroup: this.typeForm.resourceGroup
      };
      findResourceGroupListHttp(data).then(data => {
        const res = data.data;
        console.log(res);
        const list = res.data.data;
        if (res.code === 200) {
          this.total = res.data.total;
          this.tableData = list;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
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
      console.log(this.selectionList.length);
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
      this.selectionList = [];
      const emptyObj = { resourceGroup: "", groupDes: "" };
      this.selectionList.push(emptyObj);
      this.SETTYPELIST(this.selectionList);
      this.$router.push({
        path: "/device/deviceTypeEdit",
        // name: "deviceTypeEdit",
        query: { operateType: "add" }
      });
    },
    handleEdit() {
      this.SETTYPELIST(this.selectionList);
      this.$router.push({
        path: "/device/deviceTypeEdit",
        // name: "deviceTypeEdit",
        query: { operateType: "edit" }
      });
    },
    handleDelete() {
      const data = [];
      this.selectionList.forEach(element => {
        const obj = {
          resourceGroup: element.resourceGroup
        };
        data.push(obj);
      });
      deleteResourceGroupHttp(data).then(data => {
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
      this.typeForm.resourceGroup = "";
      this.init();
    },
    //未选择导出请求数据
    exportHttp() {
      const request = {
        currentPage: this.currentPage,
        pageSize: 0,
        resourceGroup: this.typeForm.resourceGroup
      };
      findResourceGroupListHttp(request).then(data => {
        const res = data.data;
        if (res.code === 200) {
          data = res.data.data;
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
/* .deviceType {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    .right {
      padding: 5px 30px;
    }
  }
} */
</style>
