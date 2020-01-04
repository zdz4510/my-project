<template>
  <div class="maintenanceEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">
        返回
      </el-button>
      <el-button size="small" type="primary" @click="checkTabCurrentStatus">
        保存
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleReset(resetFormInfo)"
      >
        重置
      </el-button>
    </div>
    <div class="showInfo">
      <div class="left" v-if="operateType === 'edit'">
        <!-- <el-select
          v-model="value"
          clearable
          placeholder="请选择"
          :disabled="selectIsDisabled"
          @clear="handleClearSelect"
          @change="handleChangeOption"
          @focus="handleSelectFocus"
          ref="select"
        >
          <el-option
            v-for="item in cloneList"
            :key="item.salaryLevelCode"
            :label="item.salaryLevelName"
            :value="item.salaryLevelCode"
          >
          </el-option>
        </el-select> -->
        <el-table
          ref="editTable"
          :data="cloneList"
          border
          highlight-current-row
          style="width: 100%"
          height="513px"
          @row-click="handleCurrentChange"
        >
          <el-table-column prop="resource" label="设备编号"> </el-table-column>
          <el-table-column prop="resourceDes" label="设备描述">
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <div class="resource">
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

        <el-tabs type="border-card" @tab-click="handleTabClick">
          <el-tab-pane class="baseInfo">
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
                <el-input
                  v-model.trim="maintenanceForm.workCenter"
                  class="workCenter"
                ></el-input>
                <i class="el-icon-document"></i>
                <!-- <div slot="error" slot-scope="error">{{error}}</div> -->
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="设备保养配置" class="deviceUpkeepSetting">
            <el-form
              :inline="true"
              :model="upkeepConfigForm"
              :rules="upkeepConfigRule"
              ref="upkeepConfigForm"
              class="demo-form-inline"
              label-width="110px"
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
                  class="maintenanceUserId"
                ></el-input>
                <i class="el-icon-document"></i>
              </el-form-item>
              <el-form-item label="预警事件" prop="alarm">
                <el-autocomplete
                  v-model.trim="upkeepConfigForm.alarm"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入预警事件"
                  @select="handleSelectAlarm"
                  size="small"
                ></el-autocomplete>
                <i class="el-icon-document"></i>
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
              <el-form-item label="启用预警功能" prop="warningFunction">
                <el-radio-group
                  v-model="upkeepConfigForm.warningFunction"
                  @change="selectWarnFunc"
                >
                  <el-radio :label="true" :value="true">启用</el-radio>
                  <el-radio :label="false" :value="false">不启用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="保养地址">
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
                type="primary"
                @click="handleLocalAdd(refArrUpkeepConfig)"
              >
                新增
              </el-button>
              <el-button size="small" type="primary" @click="handleLocalSave">
                提交
              </el-button>
              <el-button size="small" type="primary" @click="handleLocalDelete">
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
              <el-table-column
                prop="periodUnit"
                label="保养周期单位"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="保养起始时间"
                width="180"
              >
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  insertResourceHttp,
  updateResourceHttp,
  listAlarmHttp,
  findResourceMaintenanceListHttp,
  saveResourceMaintenanceHttp
} from "@/api/device/maintenance.api.js";
import _ from "lodash";

export default {
  data() {
    return {
      list: [],
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
        resource: [{ required: true, message: "请输入设备编号" }],
        resourceDes: [{ required: false, message: "请输入设备编号" }],
        resourceStatus: [{ required: true, message: "请选择状态" }],
        workCenter: [{ required: true, message: "请输入工作中心" }]
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
      upkeepConfigRules: this.upkeepConfigRule,
      upkeepStartDate: "",
      tableData: [],
      selectionList: [],
      operateType: "",
      saveType: "baseInfo",
      isEditResource: false,
      //预警
      alarmList: [],
      fn: null,
      isRequired: false,
      currentRow: {}
    };
  },
  computed: {
    ...mapGetters(["maintenanceList"]),
    upkeepConfigRule() {
      return {
        conditionName: [
          { required: true, message: "请输入保养条件名称", trigger: "blur" }
        ],
        startTime: [
          {
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
          {
            required: this.isRequired,
            message: "请输入预警事件",
            trigger: "change"
          }
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
        ]
      };
    }
  },
  created() {
    this.deBounceSearch();
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
    ...mapMutations(["MAINTENANCEPELIST"]),
    init() {
      const data = { resource: this.maintenanceForm.resource };
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
    deBounceSearch() {
      this.fn = _.debounce(cb => {
        let data = { alarm: this.upkeepConfigForm.alarm };
        listAlarmHttp(data).then(data => {
          const res = data.data;
          if (res.code === 200) {
            this.alarmList = res.data;
            this.alarmList.forEach(element => {
              element.value = element.alarm;
            });
            cb(this.alarmList);
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }, 150);
    },
    //预警事件搜索
    querySearch(queryString, cb) {
      this.fn(cb);
    },
    //预警事件选择
    handleSelectAlarm(item) {
      this.upkeepConfigForm.alarm = item.value;
    },
    //选择是否启用预警功能
    selectWarnFunc(val) {
      console.log(val);
      this.isRequired = val ? true : false;
    },
    handleSelectionChange(val) {
      this.selectionList = val;
      this.upkeepConfigForm = this.selectionList[0];
    },
    handleChangeRadio(val) {
      this.maintenanceForm.resourceStatus = val;
      console.log(val);
    },
    handleTabClick() {
      if (this.saveType === "baseInfo") {
        this.saveType = "upkeepConfig";
      } else {
        this.saveType = "baseInfo";
      }
    },
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
    //选择设备
    handleCurrentChange(currentRow) {
      this.maintenanceForm = JSON.parse(JSON.stringify(currentRow));
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
        console.log(this.upkeepConfigForm);
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
          this.MAINTENANCEPELIST([]);
          this.$router.push({ path: "/device/deviceMaintenance" });
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
          this.MAINTENANCEPELIST([]);
          this.$router.push({ path: "/device/deviceMaintenance" });
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
    handleBack() {
      console.log(11);
      this.selectionList = [];
      this.MAINTENANCEPELIST(this.selectionList);
      this.$router.push({
        path: "/device/deviceMaintenance"
      });
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
  .showInfo {
    display: flex;
    .left {
      width: 200px;
    }
    .right {
      flex: 1;
      .resource {
        width: 25%;
      }
      .baseInfo {
        width: 50%;
        .el-form {
          // text-align: center;
          .el-form-item {
            .workCenter {
              width: 94%;
            }
          }
        }
      }
      .deviceUpkeepSetting {
        .el-form {
          // text-align: center;
          .el-form-item {
            width: 32%;
            .el-form-item__content {
              .el-radio-group {
                .el-radio {
                  width: 30px;
                }
              }
            }
            .upkeepCycle {
              width: 100px;
            }
            .el-icon-document {
              font-size: 20px;
            }
            .maintenanceUserId {
              width: 80%;
            }
          }
        }
        .upkeep {
          text-align: center;
        }
      }
    }
  }
}
</style>
