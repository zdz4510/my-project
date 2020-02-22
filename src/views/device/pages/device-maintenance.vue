<template>
  <div class="deviceMaintenance">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <div class="query">
        <div class="left">
          <el-form
            :inline="true"
            :model="maintenanceForm"
            ref="maintenanceForm"
            class="maintenanceForm"
            :rules="maintenanceFormRules"
          >
            <el-form-item label="设备编号" prop="resource">
              <dsn-input v-model="maintenanceForm.resource" placeholder="请输入设备编号"></dsn-input>
            </el-form-item>
            <el-form-item>
              <dsn-button size="small" type="primary" @click.native="handleQuery">查询</dsn-button>
              <dsn-button size="small" type="primary" @click.native="handleReset">重置</dsn-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <dsn-button
          icon="el-icon-folder-add"
          size="small"
          type="success"
          @click.native="handleAdd"
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
          @click.native="handleDelete"
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
          <el-table-column prop="resource" label="设备编号"></el-table-column>
          <el-table-column prop="resourceDes" label="设备名称"></el-table-column>
          <!-- <el-table-column prop="workCenterRelation" label="线体" width="160">
          </el-table-column>
          <el-table-column prop="station" label="工站" width="160">
          </el-table-column>-->
          <el-table-column prop="workCenter" label="工作中心"></el-table-column>
          <el-table-column label="状态" show-overfslow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.resourceStatus | filterStatus }}</span>
            </template>
          </el-table-column>
        </dsn-table>
        <dsn-pagination
          background
          layout="->,total,prev,pager,next,sizes"
          :total="total"
          :page-size="pageSize"
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
  deleteResourceBatchHttp
} from "@/api/device/maintenance.api.js";
import { mapMutations } from "vuex";
import { exportExcel } from "@/until/excel.js";

const tHeader = ["设备编号", "设备名称", "工作中心", "状态"];
const filterVal = ["resource", "resourceDes", "workCenter", "resourceStatus"];
const fileName = "设备维护表";
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
      this.maintenanceForm.resource = value.toUpperCase();
      callback();
    };
    return {
      tHeader,
      filterVal,
      fileName,
      maintenanceForm: {
        resource: ""
      },
      maintenanceFormRules: {
        resource: [
          {
            validator: validateResource,
            trigger: "blur"
          }
        ]
      },
      tableData: [],
      selectionList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      deleteDialog: false
    };
  },
  filters: {
    filterStatus(status) {
      if (status === 10) {
        return "待用";
      }
      if (status === 20) {
        return "作业中";
      }
      if (status === 30) {
        return "待修";
      }

      if (status === 40) {
        return "报废";
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["MAINTENANCEPELIST"]),
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        resource: this.maintenanceForm.resource
      };
      findResourceGroupListHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          const list = res.data.data;
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
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.init();
    },
    //点击新增和编辑前验证所选项的长度
    checkSelectionLength(handle) {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      if (this.selectionList.length === 1) {
        handle();
        return;
      }
      if (this.selectionList.length > 1) {
        this.$message({
          message: "只能选择一项哦",
          type: "warning"
        });
        return;
      }
    },
    handleAdd() {
      this.selectionList = [];
      const emptyObj = {
        resource: "",
        resourceDes: "",
        resourceStatus: "",
        workCenter: ""
      };
      this.selectionList.push(emptyObj);
      this.MAINTENANCEPELIST(this.selectionList);
      this.$router.push({
        path: "/device/deviceMaintenanceEdit",
        // name: "deviceTypeEdit",
        query: { operateType: "add" }
      });
    },
    handleEdit() {
      this.MAINTENANCEPELIST(this.selectionList);
      this.$router.push({
        path: "/device/deviceMaintenanceEdit",
        // name: "deviceTypeEdit",
        query: { operateType: "edit" }
      });
    },
    checkDelete() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      this.selectionList.forEach(element => {
        if (element.resourceStatus === 20) {
          this.$message({
            message: element.resource + "已被使用，不能删除",
            type: "warning"
          });
          return;
        }
      });
      this.deleteDialog = true;
    },
    handleDelete() {
      const data = [];
      this.selectionList.forEach(element => {
        const obj = {
          resource: element.resource,
          resourceStatus: element.resourceStatus
        };
        data.push(obj);
      });
      deleteResourceBatchHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.init();
          return;
        }
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
      this.maintenanceForm.resource = "";
      this.init();
    },
    //未选择导出请求数据
    exportHttp() {
      const request = {
        currentPage: this.currentPage,
        pageSize: 0,
        resource: this.maintenanceForm.resource
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
      const tipString = exportExcel(
        this.tHeader,
        this.filterVal,
        data,
        this.fileName
      );
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
/* .deviceMaintenance {
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
