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
      <el-button
        size="small"
        type="success"
        @click="checkSelectionLength(handleAdd)"
      >
        新增
      </el-button>
      <el-button size="small" type="primary">保存</el-button>
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
        <el-table-column prop="resource" label="设备编号" width="140">
        </el-table-column>
        <el-table-column prop="resourceDes" label="设备名称" width="140">
        </el-table-column>
        <el-table-column prop="workCenterRelation" label="线体" width="140">
        </el-table-column>
        <el-table-column prop="station" label="工站" width="140">
        </el-table-column>
        <el-table-column prop="workCenter" label="工作中心" width="140">
        </el-table-column>
        <el-table-column
          prop="resourceStatus"
          label="状态"
          width="140"
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
  </div>
</template>

<script>
import { findResourceGroupListHttp } from "@/api/device/maintenance.api.js";

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
      total: 0
    };
  },
  created() {
    this.init();
  },
  methods: {
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
          this.total = res.total;
          this.tableData = list;
        }
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
      console.log(handle);
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
      this.$router.push({ path: "/device/deviceMaintenanceEdit" });
    },
    handleEdit() {
      this.$router.push({ path: "/device/deviceMaintenanceEdit" });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      console.log("删除了" + this.selectionList.length + "项");
    },
    handleQuery() {},
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
