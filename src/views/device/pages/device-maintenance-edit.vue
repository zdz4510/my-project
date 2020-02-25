<template>
  <div class="maintenanceEdit">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="handleBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="checkTabCurrentStatus">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="handleReset(resetFormInfo)">重置</dsn-button>
    </div>
    <div class="operate" style="padding-bottom: 14px;">
      <div class="right">
        <div class="resource">
          <el-form
            :inline="true"
            :model="maintenanceForm"
            ref="maintenanceFormOne"
            :rules="rules"
            class="demo-maintenanceForm"
          >
            <el-form-item label="设备编号" prop="resource">
              <dsn-input
                v-model.trim="maintenanceForm.resource"
                placeholder="请输入设备编号"
                :disabled="isEditResource"
              ></dsn-input>
            </el-form-item>
          </el-form>
        </div>

        <el-tabs type="border-card" @tab-click="handleTabClick">
          <el-tab-pane class="baseInfo">
            <span slot="label">设备基础信息</span>
            <el-form
              :model="maintenanceForm"
              :rules="rules"
              ref="maintenanceFormTwo"
              label-width="120px"
              class="demo-maintenanceForm"
            >
              <!-- <el-form-item label="设备描述:" prop="resourceDes">
                <dsn-input
                  style="width: 200px"
                  type="textarea"
                  v-model.trim="maintenanceForm.resourceDes"
                ></dsn-input>
              </el-form-item>-->
              <el-form-item label="设备描述:" prop="resourceDes">
                <dsn-input style="width: 200px" v-model.trim="maintenanceForm.resourceDes"></dsn-input>
              </el-form-item>

              <el-form-item label="状态:" prop="resourceStatus">
                <el-radio-group v-model="maintenanceForm.resourceStatus" @change="selectStatus">
                  <el-radio :label="10" :value="10">待用</el-radio>
                  <el-radio :label="20" :value="20">作业中</el-radio>
                  <el-radio :label="30" :value="30">待修</el-radio>
                  <el-radio :label="40" :value="40">报废</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="所在工作中心:" prop="workCenter">
                <dsn-input
                  style="width: 200px;vertical-align:baseline;"
                  v-model.trim="maintenanceForm.workCenter"
                  class="workCenter"
                >
                  <i class="el-icon-document" slot="append" @click="queryWorkCenter"></i>
                </dsn-input>
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
              <el-form-item label="保养条件名称" prop="conditionName" inline-message="true">
                <dsn-input
                  v-model.trim="upkeepConfigForm.conditionName"
                  :disabled="upkeepConfigOperateType === 'edit'"
                  placeholder="请输入保养条件名称"
                  size="small"
                ></dsn-input>
              </el-form-item>
              <el-form-item label="保养起始时间" prop="startTime">
                <el-date-picker
                  v-model="upkeepConfigForm.startTime"
                  type="datetime"
                  placeholder="选择日期"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="保养条件描述" prop="conditionDes">
                <dsn-input
                  v-model.trim="upkeepConfigForm.conditionDes"
                  placeholder="请输入保养条件描述"
                  size="small"
                ></dsn-input>
              </el-form-item>
              <el-form-item label="保养人员" prop="maintenanceUserId">
                <!-- <dsn-input
                  v-model.trim="upkeepConfigForm.maintenanceUserId"
                  placeholder="请输入保养人员"
                  size="small"
                ></dsn-input>-->
                <el-select
                  v-model="upkeepConfigForm.maintenanceUserId"
                  filterable
                  placeholder="请选择保养人员"
                  size="small"
                >
                  <el-option
                    v-for="(item,index) in userList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >{{item.name}}:{{item.commonName}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预警事件" prop="alarm">
                <el-autocomplete
                  style="width: 220px;"
                  v-model.trim="upkeepConfigForm.alarm"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入预警事件"
                  @select="handleSelectAlarm"
                  size="small"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="保养周期" prop="maintenancePeriod">
                <dsn-input
                  v-model.number="upkeepConfigForm.maintenancePeriod"
                  style="width:215px;vertical-align:baseline;"
                  placeholder="保养周期"
                >
                  <template slot="append">
                    <dsn-select
                      style="width:80px"
                      placeholder="单位"
                      v-model="upkeepConfigForm.periodUnit"
                    >
                      <el-option label="天数" :value="1">天数</el-option>
                      <el-option label="月份" :value="30">月份</el-option>
                      <el-option label="季度" :value="90">季度</el-option>
                      <el-option label="半年" :value="180">半年</el-option>
                      <el-option label="年" :value="365">年</el-option>
                    </dsn-select>
                  </template>
                </dsn-input>
              </el-form-item>
              <el-form-item label="启用预警功能" prop="warningFunction">
                <el-radio-group v-model="upkeepConfigForm.warningFunction" @change="selectWarnFunc">
                  <el-radio :label="true" :value="true">启用</el-radio>
                  <el-radio :label="false" :value="false">不启用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="保养地址" prop="maintenanceLocation">
                <el-radio-group v-model="upkeepConfigForm.maintenanceLocation">
                  <el-radio label="在线" value="在线">在线</el-radio>
                  <el-radio label="任意" value="任意">任意</el-radio>
                  <el-radio label="设备店" value="设备店">设备店</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div class="upkeep">
              <dsn-button size="small" type="primary" @click="handleLocalAdd(refArrUpkeepConfig)">新增</dsn-button>
              <dsn-button size="small" type="primary" @click="handleLocalSave">提交</dsn-button>
              <dsn-button size="small" type="primary" @click="handleLocalDelete">删除</dsn-button>
            </div>
            <dsn-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="{ 'background-color': '#F5F7FA' }"
              @selection-change="handleSelectionChange"
            >
              <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column>
              <el-table-column prop="conditionName" label="保养条件名称" width="120"></el-table-column>
              <el-table-column prop="maintenancePeriod" label="保养周期" width="120"></el-table-column>
              <el-table-column prop="periodUnit" label="保养周期单位" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.periodUnit |periodUnitFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="startTime" label="保养起始时间" width="180"></el-table-column>
              <el-table-column prop="maintenanceLocation" label="保养地址" width="120"></el-table-column>
              <el-table-column prop="maintenanceUserName" label="保养人员" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.maintenanceUserName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="conditionDes" label="保养条件描述" show-overflow-tooltip></el-table-column>
            </dsn-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="工作中心" :visible.sync="workCenterDialog" width="50%">
      <span>
        <workCenterModel :workCenterData="workCenterData" @selectWorkCenter="selectWorkCenter"></workCenterModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="workCenterDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSelectWorkCenter">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  insertResourceHttp,
  updateResourceHttp,
  listAlarmHttp,
  findResourceMaintenanceListHttp
} from "@/api/device/maintenance.api.js";
import { getAllLevel1Http, findAllUserHttp } from "@/api/work.center.api.js";
import workCenterModel from "../components/work-center-model.vue";
import _ from "lodash";

export default {
  name: "device-maintenance-edit",
  components: {
    workCenterModel
  },
  data() {
    //设备编号
    let validateResource = (rule, value, callback) => {
      if (value === "") {
        callback("请输入设备编号");
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("设备编号只包含（[A-Z,0-9,_,-,/]）");
      }
      this.maintenanceForm.resource = value.toUpperCase();
      callback();
    };
    //周期
    let validateMaintenancePeriod = (rule, value, callback) => {
      let reg = /^([0-9]+)$/g;
      if (!reg.test(value)) {
        return callback(new Error("只能输入数字"));
      }
      if (parseInt(value) <= 0) {
        return callback(new Error("只能输入大于0的数"));
      }
      callback();
    };
    //工作中心
    let validateWorkCenter = (rule, value, callback) => {
      if (value === "" && !this.isWorkCenter) {
        callback();
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("工作中心格式（[A-Z,0-9,_,-,/]）");
      }
      this.maintenanceForm.workCenter = value.toUpperCase();
      callback();
    };
    //条件名称
    let validateConditionName = (rule, value, callback) => {
      if (value === "") {
        callback("请输入条件名称");
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("条件名称格式（[A-Z,0-9,_,-,/]）");
      }
      this.upkeepConfigForm.conditionName = value.toUpperCase();
      callback();
    };
    //保养人员
    let validateMaintenanceUserId = (rule, value, callback) => {
      if (value === "") {
        callback("请输入保养人员");
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("保养人员格式（[A-Z,0-9,_,-,/]）");
      }
      this.upkeepConfigForm.maintenanceUserId = value.toUpperCase();
      callback();
    };
    //预警事件
    let validateAlarm = (rule, value, callback) => {
      if (this.isRequired) {
        if (value === "") {
          callback("请选择预警事件");
        }
      } else {
        if (value === "") {
          callback();
        }
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("预警事件格式（[A-Z,0-9,_,-,/]）");
      }
      this.upkeepConfigForm.alarm = value.toUpperCase();
      callback();
    };
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
      validateMaintenancePeriod,
      validateResource,
      validateWorkCenter,
      validateConditionName,
      validateMaintenanceUserId,
      validateAlarm,
      // rules: this.rules,
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
        periodUnit: 1,
        maintenanceLocation: ""
      },
      upkeepConfigRules: this.upkeepConfigRule,
      upkeepStartDate: "",
      tableData: [],
      cloneTableData: [],
      cloneList: [],
      selectionList: [],
      operateType: "",
      saveType: "baseInfo",
      isEditResource: false,
      //预警
      alarmList: [],
      fn: null,
      isRequired: false,
      isWorkCenter: false,
      currentRow: {},
      workCenterDialog: false,
      currentWorkCenter: {},
      workCenterData: [],
      userList: [],
      upkeepConfigOperateType: "add"
    };
  },
  filters: {
    periodUnitFilter: value => {
      switch (value) {
        case 1:
          return "天";
        case 30:
          return "月";
        case 90:
          return "季";
        case 180:
          return "半年";
        case 365:
          return "年";
        default:
          break;
      }
    }
  },
  computed: {
    ...mapGetters(["maintenanceList"]),
    rules() {
      return {
        resource: [
          { required: true, validator: this.validateResource, trigger: "blur" }
        ],
        resourceDes: [
          { required: false, message: "请输入设备编号", trigger: "blur" }
        ],
        resourceStatus: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ],
        workCenter: [
          {
            required: this.isWorkCenter,
            validator: this.validateWorkCenter,
            trigger: "blur"
          }
        ]
      };
    },
    upkeepConfigRule() {
      return {
        conditionName: [
          {
            required: true,
            validator: this.validateConditionName,
            trigger: "blur"
          }
        ],
        startTime: [
          {
            required: true,
            message: "请输入保养起始时间",
            trigger: "change"
          }
        ],
        conditionDes: [
          { required: true, message: "请输入保养条件描述", trigger: "change" }
        ],
        maintenanceUserId: [
          {
            required: true,
            validator: this.validateMaintenanceUserId,
            trigger: "change"
          }
        ],
        alarm: [
          {
            required: this.isRequired,
            validator: this.validateAlarm,
            trigger: "change"
          }
        ],
        warningFunction: [
          { required: true, message: "请输入预警功能", trigger: "change" }
        ],
        maintenancePeriod: [
          { type: "number", message: "保养周期必须为数字值" },
          {
            required: true,
            validator: this.validateMaintenancePeriod,
            trigger: "blur"
          }
        ],
        periodUnit: [
          { required: true, message: "请输入周期单位", trigger: "change" }
        ],
        maintenanceLocation: [
          { required: true, message: "请输入保养地址", trigger: "blur" }
        ]
      };
    },
    selectionListNew() {
      return JSON.parse(JSON.stringify(this.selectionList));
    }
  },
  watch: {
    selectionListNew: {
      handler: function(val) {
        if (val.length === 0) {
          this.upkeepConfigOperateType = "add";
        }
        if (val.length > 0) {
          this.upkeepConfigOperateType = "edit";
        }
      },
      deep: true
    }
  },
  created() {
    this.deBounceSearch();
    this.operateType = this.$route.query.operateType;
    if (this.maintenanceList.length > 0) {
      this.cloneList = JSON.parse(JSON.stringify(this.maintenanceList));
      this.maintenanceForm = JSON.parse(JSON.stringify(this.cloneList[0]));
    }
    if (this.operateType === "edit") {
      this.isEditResource = true;
    }
    this.upkeepConfigForm.startTime = this.formate(new Date().getTime());
    this.queryUserGroup();
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
          this.cloneTableData = JSON.parse(JSON.stringify(this.tableData));
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
      this.isRequired = val ? true : false;
    },
    //是否必填工作中心
    selectStatus(val) {
      this.isWorkCenter = val === 20 ? true : false;
    },
    handleSelectionChange(val) {
      this.selectionList = val;
      if (this.selectionList.length > 0) {
        this.upkeepConfigForm = _.cloneDeep(this.selectionList[0]);
      } else {
        const { upkeepConfigForm } = this;
        Object.keys(upkeepConfigForm).map(
          item => (upkeepConfigForm[item] = "")
        );
      }
    },
    selectable(row) {
      const { selectionList } = this;
      if (!selectionList.length) return true;
      const { conditionName } = selectionList[0];
      const { conditionName: rowConditionName } = row;
      return conditionName === rowConditionName;
    },
    handleChangeRadio(val) {
      this.maintenanceForm.resourceStatus = val;
    },
    handleTabClick() {
      if (this.saveType === "baseInfo") {
        this.saveType = "upkeepConfig";
      } else {
        this.saveType = "baseInfo";
      }
    },
    handleReset(formName) {
      if (this.operateType === "add") {
        this.maintenanceForm.resourceDes = "";
        formName.forEach(element => {
          this.$refs[element].resetFields();
        });
        return;
      }
      if (this.operateType === "edit") {
        this.maintenanceForm = JSON.parse(JSON.stringify(this.cloneList[0]));
        this.tableData = JSON.parse(JSON.stringify(this.cloneTableData));
      }
    },
    //验证form表单
    checkFormInfo(formArr) {
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
      if (count >= 2 && this.saveType === "upkeepConfig") {
        let count = 0;
        this.tableData.forEach(element => {
          if (this.upkeepConfigForm.conditionName === element.conditionName) {
            count++;
          }
        });
        if (this.upkeepConfigOperateType === "add") {
          if (count > 0) {
            this.$message({
              message: "该保养条件名称已存在，请重新输入",
              type: "warning"
            });
            return;
          }
        }
        const copyObj = JSON.parse(JSON.stringify(this.upkeepConfigForm));
        copyObj.resource = this.maintenanceForm.resource;
        copyObj.tenantSiteCode = "test";
        this.userList.forEach(element => {
          if (element.id === copyObj.maintenanceUserId) {
            copyObj.maintenanceUserName =
              element.name + ":" + element.commonName;
          }
        });
        if (this.upkeepConfigOperateType === "edit") {
          this.tableData = this.tableData.filter(
            item => item.conditionName !== copyObj.conditionName
          );
          this.tableData.push(copyObj);
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }
        if (this.upkeepConfigOperateType === "add") {
          this.tableData.push(copyObj);
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
        this.handleLocalAdd(this.refArrUpkeepConfig);
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
        ...this.maintenanceForm,
        resourceMaintenanceList: this.tableData
      };
      insertResourceHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.handleReset(this.resetFormInfo);
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
        ...this.maintenanceForm,
        resourceMaintenanceList: this.tableData
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
      let count = 0;
      this.refArrBaseInfo.forEach(element => {
        this.$refs[element].validate(valid => {
          if (valid) {
            count++;
          } else {
            return false;
          }
        });
      });
      if (count >= 2) {
        this.handleSaveBaseInfo();
        return;
      }
    },
    handleBack() {
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
          this.$refs.multipleTable.clearSelection();
        }
      });
      this.upkeepConfigForm.startTime = this.formate(new Date().getTime());
    },
    handleLocalSave() {
      this.checkFormInfo(this.refArrUpkeepConfig);
    },
    handleLocalDelete() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择项哦",
          type: "warning"
        });
        return;
      }

      this.tableData = this.tableData.filter(item => {
        return this.selectionList.includes(item) == false;
      });
    },
    //查询工作中心
    queryWorkCenter() {
      getAllLevel1Http().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.workCenterData = res.data;
          this.workCenterDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        return;
      });
    },
    //弹出框选择工作中心
    selectWorkCenter(row) {
      this.currentWorkCenter = row;
    },
    //弹出框确认选择工作中心
    handleSelectWorkCenter() {
      this.maintenanceForm.workCenter = this.currentWorkCenter.workCenter;
      this.workCenterDialog = false;
    },
    //搜索建议调用方法
    createFilter(queryString) {
      return item => {
        return (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //查询保养人员信息start
    queryUserGroup() {
      findAllUserHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.userList = res.data;
          return;
        }
        this.$message({ type: "warning", message: res.message });
      });
    },
    periodUnit(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
.maintenanceEdit {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
    border-radius: 4px;
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
      }
    }
  }
}
</style>
