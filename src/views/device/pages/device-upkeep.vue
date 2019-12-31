<template>
  <div class="deviceUpkeep">
    <div class="query">
      <!-- <div class="left"> -->
      <el-form
        :inline="true"
        :model="upkeepForm"
        ref="upkeepForm"
        label-width="100px"
        class="upkeepForm"
      >
        <el-form-item label="设备编号" prop="resource">
          <el-input
            v-model="upkeepForm.resource"
            placeholder="请输入设备设备编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="保养状态">
          <el-select
            v-model="upkeepForm.maintenanceStatus"
            placeholder="保养状态"
          >
            <el-option label="需要保养" value="需要保养"></el-option>
            <el-option label="已保养" value="已保养"></el-option>
            <el-option label="暂无需保养" value="暂无需保养"></el-option>
            <el-option label="无" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="warning" @click="handleQuery">
            查询
          </el-button>
          <el-button size="small" type="info" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-button
        size="small"
        type="success"
        @click="handleAffirmUpkeep('additionalDesRules')"
      >
        确认保养
      </el-button>
      <el-button size="small" type="primary" @click="handleExport"
        >导出</el-button
      >
      <el-form
        :model="upkeepForm"
        :rules="additionalDesRules"
        ref="additionalDesRules"
        label-width="180px"
        class="upkeepForm"
      >
        <el-form-item label="本次保养附加描述:" prop="additionalDes">
          <el-input
            v-model="upkeepForm.additionalDes"
            placeholder="请输入本次保养附加描述"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
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
        <el-table-column prop="resource" label="设备编号" width="100">
        </el-table-column>
        <el-table-column prop="conditionName" label="条件名称·" width="100">
        </el-table-column>
        <el-table-column prop="workCenterRelation" label="线体" width="100">
        </el-table-column>
        <el-table-column prop="station" label="工站" width="100">
        </el-table-column>
        <el-table-column prop="workCenter" label="工作中心" width="100">
        </el-table-column>
        <el-table-column prop="maintenanceStatus" label="保养状态" width="100">
        </el-table-column>
        <el-table-column
          prop="maintenanceEndTime"
          label="最后保养时间"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="maintenanceUserId"
          label="最后保养人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="additionalDes"
          label="附加描述"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pageSize"
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
import {
  listResourceMaintenanceLogHttp,
  deleteResourceGroupHttp,
  exportExcelHttp
} from "@/api/device/upkeep.api.js";

export default {
  data() {
    return {
      upkeepForm: {
        resource: "",
        maintenanceStatus: "",
        additionalDes: ""
      },
      // resourceRules: {
      //   resource: [
      //     { required: true, message: "请输入设备编号", trigger: "blur" }
      //   ]
      //   // describe: [
      //   //   { required: true, message: "请输入本次保养附加描述", trigger: "blur" }
      //   // ]
      // },
      additionalDesRules: {
        additionalDes: [
          { required: true, message: "请输入本次保养附加描述", trigger: "blur" }
        ]
      },
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      selectionList: []
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
        resource: this.upkeepForm.resource
      };
      listResourceMaintenanceLogHttp(data).then(data => {
        const res = data.data;
        const list = res.data.data;
        console.log(res.data.total);
        if (res.code === 200) {
          this.tableData = list;
          this.total = res.data.total;
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
      this.pageSize = pagesize;
      this.currentPage = 1;
      this.init();
    },
    handleQuery() {
      this.init();
    },
    handleReset() {
      this.upkeepForm.resource = "";
      this.upkeepForm.maintenanceStatus = "";
      this.upkeepForm.additionalDes = "";
    },
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //确认保养
    handleAffirmUpkeep(formName) {
      console.log(111);
      if (this.selectionList.length === 0) {
        this.$message({
          message: "你还未选择项哦",
          type: "warning"
        });
        return;
      }
      this.selectionList.forEach(element => {
        if (element.maintenanceStatus === "已保养") {
          this.$message({
            message: "不能保养已保养的设备",
            type: "warning"
          });
          //满足情况则抛出错误结束
          throw Error();
        }
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = [];
          const copyList = JSON.parse(JSON.stringify(this.selectionList));
          copyList.forEach(element => {
            const obj = {
              conditionName: element.conditionName,
              resource: element.resource
            };
            data.push(obj);
          });
          deleteResourceGroupHttp({
            data: data,
            maintenanceDescription: this.upkeepForm.additionalDes
          }).then(data => {
            const res = data.data;
            console.log(res);
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.handleReset();
              this.init();
              return;
            }
            this.$message({
              message: res.message,
              type: "warning"
            });
          });
        } else {
          return false;
        }
      });
    },
    handleExport() {
      const data = {
        maintenanceStatus: this.upkeepForm.maintenanceStatus,
        resource: this.upkeepForm.resource
      };
      exportExcelHttp(data);
    }
  }
};
</script>

<style lang="scss">
.deviceUpkeep {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
    display: flex;
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .middle {
      padding: 0 20px;
    }
    .right {
      width: 480px;
      padding: 5px 30px;
    }
  }
}
</style>
