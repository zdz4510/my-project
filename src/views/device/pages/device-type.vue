<template>
  <div class="deviceType">
    <div class="query">
      <div class="left">
        <el-form
          :model="typeForm"
          ref="typeForm"
          label-width="100px"
          class="typeForm"
        >
          <el-form-item label="设备类型" prop="resourceGroup">
            <el-input
              v-model.trim="typeForm.resourceGroup"
              placeholder="请输入设备类型"
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
        修改
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length <= 0"
        @click="deleteDialog = true"
      >
        删除
      </el-button>
      <el-button size="small" type="primary" @click="handleExport"
        >导出</el-button
      >
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="resourceGroup" label="设备类型" width="120">
        </el-table-column>
        <el-table-column prop="resourceCount" label="设备数量" width="120">
        </el-table-column>
        <el-table-column prop="groupDes" label="设备类型描述" width="170">
        </el-table-column>

        <el-table-column prop="createUserName" label="创建人" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170">
        </el-table-column>
        <el-table-column prop="modifyUserName" label="修改人" width="120">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          show-overflow-tooltip
        >
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
    return {
      tHeader,
      filterVal,
      fileName,
      typeForm: {
        resourceGroup: ""
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
      console.log(this.selectionList);
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
      console.log(this.selectionList);
      const data = [];
      this.selectionList.forEach(element => {
        const obj = {
          resourceGroup: element.resourceGroup
        };
        data.push(obj);
      });
      console.log(data);
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
.deviceType {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .right {
      width: 680px;
      padding: 5px 30px;
    }
  }
}
</style>
