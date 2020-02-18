<template>
  <div class="deviceUpkeep">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <div class="query">
        <!-- <div class="left"> -->
        <el-form
          :inline="true"
          :model="upkeepForm"
          ref="upkeepForm"
          class="upkeepForm"
        >
          <el-form-item label="设备编号" prop="resource">
            <dsn-input
              v-model="upkeepForm.resource"
              placeholder="请输入设备设备编号"
            ></dsn-input>
          </el-form-item>
          <el-form-item label="保养状态">
            <dsn-select
              v-model="upkeepForm.maintenanceStatus"
              placeholder="保养状态"
            >
              <el-option label="需要保养" value="需要保养"></el-option>
              <el-option label="已保养" value="已保养"></el-option>
              <el-option label="暂无需保养" value="暂无需保养"></el-option>
              <el-option label="无" value=""></el-option>
            </dsn-select>
          </el-form-item>
          <el-form-item>
            <dsn-button size="small" type="primary" @click.native="handleQuery">
              查询
            </dsn-button>
            <dsn-button size="small" type="primary" @click.native="handleReset">
              重置
            </dsn-button>
          </el-form-item>
        </el-form>
      </div>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <el-form
          :model="upkeepForm"
          :inline="true"
          :rules="additionalDesRules"
          ref="additionalDesRules"
          class="upkeepForm"
        >
          <el-form-item>
            <dsn-button
              size="small"
              type="success"
              icon="el-icon-folder-add"
              @click.native="handleAffirmUpkeep('additionalDesRules')"
            >
              确认保养
            </dsn-button>
            <dsn-button icon="el-icon-upload2" size="small" type="primary" @click.native="handleExport"
              >导出</dsn-button
            >
          </el-form-item>
          <el-form-item label="本次保养附加描述:" prop="additionalDes">
            <dsn-input
              v-model="upkeepForm.additionalDes"
              placeholder="请输入本次保养附加描述"
              size="small"
            ></dsn-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 28px">
        <dsn-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
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
        </dsn-table>
        <dsn-pagination
          background
          layout="->,total,prev,pager,next,sizes"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @size-change="handlePagesize"
          @current-change="handleCurrentChange"
        >
        </dsn-pagination>
      </div>
    </DsnPanel>
  </div>
</template>

<script>
import {
  listResourceMaintenanceLogHttp,
  deleteResourceGroupHttp
} from "@/api/device/upkeep.api.js";
import { exportExcel } from "@/until/excel.js";

const tHeader = [
  "设备编号",
  "条件名称·",
  "线体",
  "工站",
  "工作中心",
  "保养状态",
  "最后保养时间",
  "最后保养人",
  "附加描述"
];
const filterVal = [
  "resource",
  "conditionName",
  "workCenterRelation",
  "station",
  "workCenter",
  "maintenanceStatus",
  "maintenanceEndTime",
  "maintenanceUserId",
  "additionalDes"
];
const fileName = "设备保养表";
export default {
  data() {
    return {
      tHeader,
      filterVal,
      fileName,
      upkeepForm: {
        resource: "",
        maintenanceStatus: "",
        additionalDes: ""
      },
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
        resource: this.upkeepForm.resource,
        maintenanceStatus: this.upkeepForm.maintenanceStatus
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
      this.selectionList.find(element => {
        if (element.maintenanceStatus === "已保养") {
          this.$message({
            message: "不能保养已保养的设备",
            type: "warning"
          });
          //满足情况则结束循环，返回
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
    //未选择导出请求数据
    exportHttp() {
      const request = {
        currentPage: this.currentPage,
        pageSize: 0,
        resource: this.upkeepForm.resource,
        maintenanceStatus: this.upkeepForm.maintenanceStatus
      };
      listResourceMaintenanceLogHttp(request).then(data => {
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
/* .deviceUpkeep {
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
} */
</style>
