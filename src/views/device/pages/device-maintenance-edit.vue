<template>
  <div class="maintenanceEdit">
    <div class="query">
      <div class="left">
        <el-form
          :model="maintenanceForm"
          ref="maintenanceFormOne"
          :rules="rules"
          label-width="100px"
          class="demo-maintenanceForm"
        >
          <el-form-item label="设备编号" prop="resource">
            <el-input
              v-model.trim="maintenanceForm.resource"
              placeholder="请输入设备编号"
              :disabled="isEditResource"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="warning" @click="handleQuery" disabled>
          查询
        </el-button>
        <el-button
          size="small"
          type="info"
          @click="handleReset(refArr)"
          :disabled="isReset"
        >
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="success" disabled>
        新增
      </el-button>
      <el-button
        v-if="saveType == 'baseInfo'"
        size="small"
        type="primary"
        @click="checkFormInfo(refArr)"
        >保存1</el-button
      >
      <el-button
        v-if="saveType == 'upkeepConfig'"
        size="small"
        type="primary"
        @click="handleSaveUpkeepConfig"
        >保存2</el-button
      >
      <el-button size="small" type="success" disabled>
        修改
      </el-button>
      <el-button size="small" type="danger" disabled>
        删除
      </el-button>
      <el-button size="small" type="primary" disabled>导出</el-button>
    </div>
    <div class="showInfo">
      <el-tabs type="border-card" @tab-click="handleTabClick">
        <el-tab-pane>
          <span slot="label"> 设备基础信息</span>
          <el-form
            :model="maintenanceForm"
            :rules="rules"
            ref="maintenanceFormTwo"
            label-width="120px"
            class="demo-maintenanceForm"
          >
            <el-form-item label="设备描述:">
              <el-input
                type="textarea"
                v-model.trim="maintenanceForm.resourceDes"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="resourceStatus">
              <el-radio-group v-model="maintenanceForm.resourceStatus">
                <el-radio :label="10">待用</el-radio>
                <el-radio :label="20">作业中</el-radio>
                <el-radio :label="30">待修</el-radio>
                <el-radio :label="40">报废</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="所在工作中心:" prop="workCenter">
              <el-input v-model.trim="maintenanceForm.workCenter"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="设备保养配置" class="deviceUpkeepSetting">
          <el-form
            :inline="true"
            :model="upkeepConfigForm"
            class="demo-form-inline"
            label-width="130px"
          >
            <el-form-item label="保养条件名称">
              <el-input
                v-model.trim="upkeepConfigForm.conditionName"
                placeholder="请输入保养条件名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养起始时间">
              <el-date-picker
                v-model="upkeepConfigForm.startTime"
                type="datetime"
                placeholder="选择日期"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="保养条件描述">
              <el-input
                v-model.trim="upkeepConfigForm.conditionDes"
                placeholder="请输入保养条件描述"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养人员">
              <el-input
                v-model.trim="upkeepConfigForm.maintenanceUserId"
                placeholder="请输入保养人员"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="预警事件">
              <el-input
                v-model.trim="upkeepConfigForm.warningEvent"
                placeholder="请输入预警事件"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养周期">
              <el-input
                v-model.trim="upkeepConfigForm.maintenancePeriod"
                placeholder="保养周期"
                class="upkeepCycle"
                size="small"
              ></el-input>
              <el-select
                v-model="upkeepConfigForm.periodUnit"
                label="upkeepConfigForm.periodUnit"
                class="upkeepCycle"
                size="small"
              >
                <el-option label="天数" :value="1">天数</el-option>
                <el-option label="月份" :value="30">月份</el-option>
                <el-option label="季度" :value="90">季度</el-option>
                <el-option label="年" :value="365">年</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用预警功能">
              <el-radio-group v-model="upkeepConfigForm.warningFunction">
                <el-radio label="true">启用</el-radio>
                <el-radio label="false">不启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="保养地址">
              <el-radio-group v-model="upkeepConfigForm.maintenanceLocation">
                <el-radio label="online">在线</el-radio>
                <el-radio label="any">任意</el-radio>
                <el-radio label="deviceStore">设备店</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div class="upkeep">
            <el-button size="small" type="success">
              新增
            </el-button>
            <el-button size="small" type="primary" @click="handleLocalSave">
              提交
            </el-button>
            <el-button size="small" type="danger">
              删除
            </el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            :header-cell-style="{ 'background-color': '#F5F7FA' }"
            height="200px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="conditionName"
              label="保养条件名称"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="maintenancePeriod"
              label="保养周期"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="periodUnit" label="保养周期单位" width="120">
            </el-table-column>
            <el-table-column prop="startTime" label="保养起始时间" width="140">
            </el-table-column>
            <el-table-column
              prop="maintenanceLocation"
              label="保养地址"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="maintenanceUserId"
              label="保养人员"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="warningFuction" label="预警功能" width="120">
            </el-table-column>
            <el-table-column
              prop="conditionDes"
              label="保养条件描述"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  insertResourceHttp,
  updateResourceHttp
} from "@/api/device/maintenance.api.js";

export default {
  data() {
    return {
      maintenanceForm: {
        //设备编号
        resource: "",
        //设备名称
        resourceDes: "",
        //设备状态
        resourceStatus: "",
        //工作中心
        workCenter: ""
      },
      rules: {
        resource: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ],
        resourceDes: [
          { required: false, message: "请输入设备编号", trigger: "blur" }
        ],
        resourceStatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        workCenter: [
          { required: true, message: "请输入工作中心", trigger: "blur" }
        ]
      },
      refArr: ["maintenanceFormOne", "maintenanceFormTwo"],
      upkeepConfigForm: {
        conditionName: "",
        startTime: new Date(),
        conditionDes: "",
        maintenanceUserId: "",
        warningEvent: "",
        warningFunction: "",
        maintenancePeriod: "",
        periodUnit: "",
        maintenanceLocation: ""
      },
      upkeepConfigRules: {
        conditionName: [
          { required: true, message: "请输入保养条件名称", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请输入保养起始时间", trigger: "change" }
        ],
        conditionDes: [
          { required: true, message: "请输入保养条件描述", trigger: "blur" }
        ],
        maintenanceUserId: [
          { required: true, message: "请输入保养人员", trigger: "blur" }
        ],
        warningFunction: [
          { required: true, message: "请输入保养人员", trigger: "change" }
        ],
        maintenancePeriod: [
          { required: true, message: "请输入保养周期", trigger: "blur" }
        ],
        periodUnit: [
          { required: true, message: "请输入周期单位", trigger: "change" }
        ],
        maintenanceLocation: [
          { required: true, message: "请输入保养地址", trigger: "change" }
        ]
      },
      upkeepStartDate: "",
      tableData: [],
      selectionList: [],
      isReset: false,
      operateType: "",
      saveType: "baseInfo",
      isEditResource: false
    };
  },
  computed: {
    ...mapGetters(["maintenanceList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.cloneList = JSON.parse(JSON.stringify(this.maintenanceList));
    this.maintenanceForm = this.cloneList[0];
    // console.log(this.maintenanceForm);
    // this.init();
    if (this.operateType === "edit") {
      this.isReset = false;
      this.isEditResource = false;
    }
  },
  methods: {
    init() {},
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    handleChangeRadio(val) {
      this.maintenanceForm.resourceStatus = val;
      console.log(val);
    },
    handleTabClick(val) {
      console.log(val);
      if (this.saveType === "baseInfo") {
        this.saveType = "upkeepConfig";
      } else {
        this.saveType = "baseInfo";
      }
      console.log(this.saveType);
    },
    handleQuery() {},
    handleReset(formName) {
      this.maintenanceForm.resourceDes = "";
      if (this.operateType === "add") {
        formName.forEach(element => {
          this.$refs[element].resetFields();
        });
        return;
      }
      if (this.operateType === "edit") {
        this.$refs[formName[1]].resetFields();
      }
    },
    checkFormInfo(formArr) {
      let count = 0;
      formArr.forEach(element => {
        this.$refs[element].validate(valid => {
          console.log(valid);
          if (valid) {
            count++;
          } else {
            return false;
          }
        });
      });
      if (count >= 2) {
        this.handleSaveBaseInfo();
      }
    },
    handleSaveBaseInfo() {
      if (this.operateType === "add") {
        this.addResourceHttp();
        return;
      }
      if (this.operateType === "edit") {
        this.updateResourceHttp();
        return;
      }
    },
    addResourceHttp() {
      const data = {
        resource: this.maintenanceForm.resource,
        resourceDes: this.maintenanceForm.resourceDes,
        resourceStatus: this.maintenanceForm.resourceStatus,
        workCenter: this.maintenanceForm.workCenter
      };
      insertResourceHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.handleReset(this.refArr);
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    updateResourceHttp() {
      const data = {
        resource: this.maintenanceForm.resource,
        resourceDes: this.maintenanceForm.resourceDes,
        resourceStatus: this.maintenanceForm.resourceStatus,
        workCenter: this.maintenanceForm.workCenter
      };
      updateResourceHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleLocalSave() {
      console.log(this.upkeepConfigForm);
      console.log("提交");
    },
    handleSaveUpkeepConfig() {
      const copyObj = JSON.parse(JSON.stringify(this.upkeepConfigForm));
      this.tableData.push(copyObj);
      console.log(this.tableData);
    }
  }
};
</script>

<style lang="scss">
.maintenanceEdit {
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
  .showInfo {
    .deviceUpkeepSetting {
      .el-form {
        // text-align: center;
        .el-form-item {
          width: 45%;
          margin-bottom: 0px;
          .upkeepCycle {
            width: 100px;
          }
        }
      }
      .upkeep {
        text-align: center;
      }
    }
  }
}
</style>
