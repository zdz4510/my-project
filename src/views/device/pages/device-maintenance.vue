<template>
  <div class="deviceMaintenance">
    <div class="query">
      <div class="left">
        <el-form
          :model="maintenanceForm"
          :rules="rules"
          ref="maintenanceForm"
          label-width="100px"
          class="maintenanceForm"
        >
          <el-form-item label="设备编号" prop="resource">
            <el-input
              v-model="maintenanceForm.resource"
              placeholder="请输入设备设备编号"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="warning" @click="handleQuery">
          查询
        </el-button>
        <el-button size="small" type="info" @click="handleReset">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="success" @click="handleAdd">
        新增
      </el-button>
      <el-button size="small" type="primary" disabled>保存</el-button>
      <el-button
        size="small"
        type="success"
        @click="checkSelectionLength(handleEdit)"
      >
        修改
      </el-button>
      <el-button size="small" type="danger" @click="handleDelete">
        删除
      </el-button>
      <el-button size="small" type="primary">导出</el-button>
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
        <el-table-column prop="resource" label="设备编号" width="160">
        </el-table-column>
        <el-table-column prop="resourceDes" label="设备名称" width="160">
        </el-table-column>
        <el-table-column prop="workCenterRelation" label="线体" width="160">
        </el-table-column>
        <el-table-column prop="station" label="工站" width="160">
        </el-table-column>
        <el-table-column prop="workCenter" label="工作中心" width="160">
        </el-table-column>
        <el-table-column
          prop="resourceStatus"
          label="状态"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pageSize"
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
  deleteResourceBatchHttp
} from "@/api/device/maintenance.api.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      maintenanceForm: {
        resource: ""
      },
      rules: {
        resource: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
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
        const list = res.data.data;
        console.log(list);
        if (res.code === 200) {
          this.total = res.data.total;
          this.tableData = list;
          this.maintenanceForm.resource = "";
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
    handlePagesize(pagesize) {
      this.pagesize = pagesize;
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
        groupDes: "",
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
    handleReset() {}
  }
};
</script>

<style lang="scss">
.deviceMaintenance {
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
