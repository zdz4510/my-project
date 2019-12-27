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
        <el-button size="small" type="info" @click="handleReset(resetFormInfo)">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="success" disabled>
        新增
      </el-button>
      <el-button size="small" type="primary" @click="checkTabCurrentStatus"
        >保存</el-button
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
            :rules="upkeepConfigRules"
            ref="upkeepConfigForm"
            class="demo-form-inline"
            label-width="140px"
          >
            <el-form-item
              label="保养条件名称"
              prop="conditionName"
              inline-message="true"
            >
              <el-input
                v-model.trim="upkeepConfigForm.conditionName"
                placeholder="请输入保养条件名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养起始时间" prop="startTime">
              <el-date-picker
                v-model="upkeepConfigForm.startTime"
                type="datetime"
                placeholder="选择日期"
                size="small"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="保养条件描述" prop="conditionDes">
              <el-input
                v-model.trim="upkeepConfigForm.conditionDes"
                placeholder="请输入保养条件描述"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养人员" prop="maintenanceUserId">
              <el-input
                v-model.trim="upkeepConfigForm.maintenanceUserId"
                placeholder="请输入保养人员"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="预警事件" prop="alarm">
              <el-autocomplete
                v-model.trim="upkeepConfigForm.alarm"
                :fetch-suggestions="querySearch"
                placeholder="请输入预警事件"
                @select="handleSelectAlarm"
                size="small"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="保养周期" prop="maintenancePeriod">
              <el-input
                v-model.number="upkeepConfigForm.maintenancePeriod"
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
            <el-form-item label="是否启用预警功能" prop="warningFunction">
              <el-radio-group v-model="upkeepConfigForm.warningFunction">
                <el-radio :label="true" :value="true">启用</el-radio>
                <el-radio :label="false" :value="false">不启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="保养地址" prop="maintenanceLocation">
              <el-radio-group v-model="upkeepConfigForm.maintenanceLocation">
                <el-radio label="在线">在线</el-radio>
                <el-radio label="任意">任意</el-radio>
                <el-radio label="设备店">设备店</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div class="upkeep">
            <el-button
              size="small"
              type="success"
              @click="handleLocalAdd(refArrUpkeepConfig)"
            >
              新增
            </el-button>
            <el-button size="small" type="primary" @click="handleLocalSave">
              提交
            </el-button>
            <el-button size="small" type="danger" @click="handleLocalDelete">
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
            <el-table-column prop="startTime" label="保养起始时间" width="180">
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
  updateResourceHttp,
  listAlarmHttp,
  findResourceMaintenanceListHttp,
  saveResourceMaintenanceHttp
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
      //验证基础信息表单ref
      refArrBaseInfo: ["maintenanceFormOne", "maintenanceFormTwo"],
      //验证保养配置表单ref
      refArrUpkeepConfig: ["maintenanceFormOne", "upkeepConfigForm"],
      //重置表单数组
      resetFormInfo: [
        "maintenanceFormOne",
        "maintenanceFormTwo",
        "upkeepConfigForm"
      ],
      upkeepConfigForm: {
        conditionName: "",
        startTime: "",
        conditionDes: "",
        maintenanceUserId: "",
        alarm: "",
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
          {
            type: "date",
            required: true,
            message: "请输入保养起始时间",
            trigger: "change"
          }
        ],
        conditionDes: [
          { required: true, message: "请输入保养条件描述", trigger: "blur" }
        ],
        maintenanceUserId: [
          { required: true, message: "请输入保养人员", trigger: "blur" }
        ],
        alarm: [
          { required: true, message: "请输入预警事件", trigger: "change" }
        ],
        warningFunction: [
          { required: true, message: "请输入预警功能", trigger: "change" }
        ],
        maintenancePeriod: [
          { required: true, message: "请输入保养周期", trigger: "blur" },
          { type: "number", message: "保养周期必须为数字值" }
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
      operateType: "",
      saveType: "baseInfo",
      isEditResource: false,
      //预警
      alarmList: []
    };
  },
  computed: {
    ...mapGetters(["maintenanceList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.cloneList = JSON.parse(JSON.stringify(this.maintenanceList));
    this.maintenanceForm = this.cloneList[0];
    if (this.operateType === "edit") {
      this.isEditResource = true;
    }
    this.upkeepConfigForm.startTime = this.formate(new Date().getTime());
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let data = { alarm: this.upkeepConfigForm.alarm };
      listAlarmHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.alarmList = res.data;
          console.log(res.data);
        } else {
          this.$message({
            message: res.message,
            type: "warning"
          });
        }
      });
      data = { resource: this.maintenanceForm.resource };
      findResourceMaintenanceListHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data;
          console.log(res.data);
        } else {
          this.$message({
            message: res.message,
            type: "warning"
          });
        }
      });
    },
    formate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return `${y}-${MM}-${d} ${h}:${m}:${s}`;
    },
    //预警事件搜索
    querySearch(queryString, cb) {
      var alarmList = this.alarmList;
      var results = queryString
        ? alarmList.filter(this.createFilter(queryString))
        : alarmList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.alarm.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    //预警事件选择
    handleSelectAlarm(item) {
      this.upkeepConfigForm.alarm = item;
      console.log(item);
    },
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
        formName.forEach(element => {
          if (element !== "maintenanceFormOne") {
            this.$refs[element].resetFields();
          }
        });
      }
    },
    //验证form表单
    checkFormInfo(formArr, handleType) {
      let count = 0;
      formArr.forEach(element => {
        this.$refs[element].validate(valid => {
          if (valid) {
            count++;
          } else {
            return false;
          }
        });
      });
      if (count >= 2 && this.saveType === "baseInfo") {
        handleType();
        return;
      }
      if (count >= 2 && this.saveType === "upkeepConfig") {
        const copyObj = JSON.parse(JSON.stringify(this.upkeepConfigForm));
        copyObj.resource = this.maintenanceForm.resource;
        this.tableData.push(copyObj);
        return;
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
          this.handleReset(this.refArrBaseInfo);
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
    checkTabCurrentStatus() {
      if (this.saveType === "baseInfo") {
        this.checkFormInfo(this.refArrBaseInfo, this.handleSaveBaseInfo);
        return;
      }
      if (this.saveType === "upkeepConfig") {
        if (this.tableData.length === 0) {
          this.$message({
            message: "还没有提交数据哦",
            type: "warning"
          });
          return;
        }
        this.handleSaveUpkeepConfig();
        return;
      }
    },
    handleLocalAdd(formName) {
      formName.forEach(element => {
        if (element === "upkeepConfigForm") {
          this.$refs[element].resetFields();
        }
      });
    },
    handleLocalSave() {
      this.checkFormInfo(this.refArrUpkeepConfig, this.handleSaveUpkeepConfig);
    },
    handleLocalDelete() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择项哦",
          type: "warning"
        });
        return;
      }
      this.tableData.forEach((element1, index1) => {
        this.selectionList.forEach(element2 => {
          if (JSON.stringify(element1) === JSON.stringify(element2)) {
            this.tableData.splice(index1, 1);
          }
        });
      });
    },
    handleSaveUpkeepConfig() {
      const data = JSON.parse(JSON.stringify(this.tableData));
      saveResourceMaintenanceHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({ path: "/device/deviceMaintenance" });
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        return;
      });
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
