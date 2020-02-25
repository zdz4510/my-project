<template>
  <div class="dc-collection">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>收集值</span>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        :rules="rules"
        class="form-style"
        :label-width="formLabelWidth"
      >
        <el-form-item label="收集类型:" prop="collectionType" required>
          <dsn-select
            v-model="searchForm.collectionType"
            filterable
            clearable
            placeholder="请选择收集类型"
          >
            <el-option
              v-for="item in collectionTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </dsn-select>
        </el-form-item>
        <el-form-item label="接收值:" prop="acceptValue">
          <dsn-input v-model="searchForm.acceptValue" placeholder="请输入接收值"></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search('searchForm')"
          >查询</dsn-button>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-refresh"
            @click="resetForm('searchForm')"
          >重置</dsn-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件end -->
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-tabs
            type="border-card"
            style="height:180px"
            v-model="activeNameLeft"
            @tab-click="handleClickLeft"
          >
            <el-tab-pane label="基础关系信息" name="baseRelation">
              <el-form
                :model="baseInfoForm"
                ref="baseInfoForm"
                :label-width="formLabelWidth"
                class="baseInfoForm"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="工单号:" prop="shopOrder">
                      <el-input v-model="baseInfoForm.shopOrder" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="物料:" prop="material">
                      <el-input v-model="baseInfoForm.material" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="物料组:" prop="materialGroup">
                      <el-input v-model="baseInfoForm.materialGroup" size="small" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备类型:" prop="resourceGroup">
                      <el-input v-model="baseInfoForm.resourceGroup" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工序:" prop="operation">
                      <el-input v-model="baseInfoForm.operation" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工作中心:" prop="workCenter">
                      <el-input v-model="baseInfoForm.workCenter" size="small" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="查看多个关系明细" name="lookDetail"></el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="数据收集组" style="height:200px">
              <h3 style="text-align:center">涉及数据收集组</h3>
              <el-table :data="dcGroupList" @select="selectedDcGroup">
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column prop="dcGroup" label="数据收集组"></el-table-column>
                <el-table-column prop="dcGroupDes" label="数据收集组描述" width="110"></el-table-column>
                <el-table-column prop="paramNum" label="参数数量"></el-table-column>
                <el-table-column prop="conditionNum" label="收集条件"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          <el-tabs
            type="border-card"
            style="height:460px"
            v-model="activeNameRight"
            @tab-click="handleClickRight"
          >
            <el-tab-pane label="参数输入" name="paramsInput">
              <div class="btn">
                <dsn-button
                  icon="el-icon-folder-add"
                  size="small"
                  type="success"
                  @click="checkParamsValue(saveParamsValue)"
                >提交</dsn-button>
                <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="reset">重置</dsn-button>
                <dsn-button size="small" type="primary" @click="checkParamsValue(null)">校验</dsn-button>
              </div>
              <el-table :data="paramsInputList" height="350px">
                <el-table-column label="参数名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.parameter }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="参数描述">
                  <template slot-scope="scope">
                    <span>{{ scope.row.parameterDes }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="参数值">
                  <template slot-scope="scope">
                    <dsn-input v-model="scope.row.parameterValue"></dsn-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="查看参数明细" name="paramsDetail"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </DsnPanel>
    <div class="bottom">
      <div class="switchBtn">
        <dsn-button size="small" type="primary" @click="switchBtn">查看日志</dsn-button>
      </div>
      <el-tabs type="border-card" v-show="isViewLog">
        <el-tab-pane label="日志记录">
          <div class="content">
            <div v-for="(item,index) in logList" :key="index">{{index+1}}、{{item}}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 查看参数明细start -->
    <el-dialog title="查看参数明细" :visible.sync="paramsDialog" @close="closeParams">
      <h3 style="text-align:center">涉及数据收集组</h3>
      <dsn-table :data="dcParameterMeasureList" @select="selectedDcGroup">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="parameter" label="参数名称"></el-table-column>
        <el-table-column prop="parameterDes" label="参数描述"></el-table-column>
        <el-table-column prop="softCheck" label="软检查">
          <template slot-scope="scope">
            <span>{{ scope.row.softCheck?"true":"false" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parameterStatus" label="参数状态">
          <template slot-scope="scope">
            <span>{{ scope.row.parameterStatus?"true":"false" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="valueType" label="值类型"></el-table-column>
        <el-table-column prop="required" label="必须值"></el-table-column>
        <el-table-column prop="targetValue" label="标准值"></el-table-column>
        <el-table-column prop="trueValue" label="布尔值TRUE绑定" width="120"></el-table-column>
        <el-table-column prop="falseValue" label="布尔值FALSE绑定" width="120"></el-table-column>
        <el-table-column prop="upperSpecLimit" label="标准值上限"></el-table-column>
        <el-table-column prop="lowerSpecLimit" label="标准值下限"></el-table-column>
        <el-table-column prop="upperWarnLimit" label="预警发生上限值" width="110"></el-table-column>
        <el-table-column prop="lowerWarnLimit" label="预警发生下限值" width="110"></el-table-column>
        <el-table-column prop="alarm" label="预警事件编号" width="110"></el-table-column>
      </dsn-table>
      <span slot="footer" class="dialog-footer">
        <dsn-button type="primary" @click="paramsDialog=false">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 查看参数明细end -->
    <!-- 查看多个关系明细start -->
    <el-dialog title="查看多个关系明细" :visible.sync="detailDialog" width="500px" @close="closeDetail">
      <el-tabs type="border-card">
        <el-tab-pane label="物料组">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="relationDetail.materialGroup" height="200px">
            <el-table-column prop="materialGroup" label="物料组"></el-table-column>
            <el-table-column prop="groupDes" label="物料组描述"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设备类型">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="relationDetail.resourceGroup" height="200px">
            <el-table-column prop="resourceGroup" label="设备类型"></el-table-column>
            <el-table-column prop="groupDes" label="设备类型描述"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工作中心">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="relationDetail.workCenter" height="200px">
            <el-table-column prop="workCenter" label="工作中心"></el-table-column>
            <el-table-column prop="workCenterDes" label="工作中心描述"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工序">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="relationDetail.operation" height="200px">
            <el-table-column prop="operation" label="工序"></el-table-column>
            <el-table-column prop="operationDes" label="工序描述"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <dsn-button type="primary" @click="detailDialog = false">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 查看多个关系明细end -->
  </div>
</template>

<script>
import {
  findDcGroupDataHttp,
  checkParamData,
  saveDataCollectResult
} from "../../../api/dc.data.collection.api";
import { findActiveDcParameterMeasureListHttp } from "@/api/data.collection.api.js";
import _ from "lodash";

export default {
  name: "dc-collection",
  data() {
    return {
      formLabelWidth: "85px",
      paramsDialog: false,
      detailDialog: false,
      searchForm: {
        acceptValue: "",
        collectionType: ""
      },
      paramsInputForm: {},
      baseInfoForm: {
        material: "",
        shopOrder: "",
        operation: "",
        resourceGroup: "",
        workCenter: "",
        materialGroup: ""
      },
      dcGroupList: [],
      dcParameterMeasureList: [],
      paramsInputList: [],
      isViewLog: false,
      logList: [],
      checkedList: [],
      rules: {
        acceptValue: [
          { required: true, message: "请输入接收值", trigger: "blur" }
        ],
        collectionType: [
          { required: true, message: "请选择收集类型", trigger: "change" }
        ]
      },
      dcParameterMeasureInfoList: [],
      collectionTypes: [
        {
          value: 10,
          label: "LOT"
        },
        {
          value: 20,
          label: "资源"
        }
      ],
      activeNameLeft: "baseRelation",
      activeNameRight: "paramsInput",
      relationDetail: [],
      currentRow: {}
    };
  },
  created() {},
  methods: {
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            acceptValue: this.searchForm.acceptValue,
            collectionType: this.searchForm.collectionType
          };
          findDcGroupDataHttp(data).then(data => {
            const res = data.data;
            if (res.code === 200) {
              this.baseInfoForm = res.data;
              this.dcGroupList = res.data.dcGroupList;
              this.relationDetail = res.data.relationDetail;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs["baseInfoForm"].resetFields();
      this.dcGroupList = [];
      this.dcParameterMeasureList = [];
      this.paramsInputList = [];
      this.relationDetail = [];
    },
    checkParamsValue(operate) {
      const isFind = this.paramsInputList.find(element => {
        let reg = /^((\d{1,5}\.(\d){1,3})||(\d{1,5}))$/g;
        if (element.required && element.parameterValue === "") {
          this.$message({
            message: `参数${element.parameter}的值必填`,
            type: "warning"
          });
          return true;
        }
        if (
          parseInt(element.valueType) === 10 &&
          !reg.test(element.parameterValue)
        ) {
          this.$message({
            message: `参数${element.parameter}的值应为数值，整数5位以内，小数3位以内`,
            type: "warning"
          });
          return true;
        }
        return false;
      });
      if (!isFind) {
        let params = _.cloneDeep(this.paramsInputList);
        checkParamData(params).then(data => {
          const res = data.data;
          if (res.code === 200) {
            if (res.data.success) {
              this.$message({
                message: "参数值校验成功",
                type: "success"
              });
              if (operate !== null) {
                operate();
              }
            } else {
              this.$message({
                message: "参数值校验失败",
                type: "warning"
              });
            }
            this.logList.push(res.data.msg);
            return;
          }
          this.$message({
            message: res.message,
            type: "error"
          });
        });
      }
    },
    reset() {
      this.dcParameterMeasureList.forEach(value => {
        value.parameterValue = "";
      });
    },
    handleCancle() {
      this.paramsDialog = false;
    },
    selectedDcGroup(selection, row) {
      if (
        this.dcParameterMeasureList.length !== 0 &&
        this.dcParameterMeasureList[0].dcGroup === row.dcGroup
      ) {
        return;
      }
      this.currentRow = row;
      const data = { dcGroup: row.dcGroup };
      findActiveDcParameterMeasureListHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.dcParameterMeasureList = res.data;
          this.dcParameterMeasureList.forEach(element => {
            if (element.parameterStatus) {
              this.paramsInputList.push(element);
            }
          });
          this.paramsInputList.forEach(element => {
            this.$set(element, "parameterValue", "");
          });
          return;
        }
        this.$message({
          message: res.message,
          type: "error"
        });
      });
    },
    saveParamsValue() {
      let params = _.cloneDeep(this.baseInfoForm);
      params.dcGroup = this.currentRow.dcGroup;
      params.dcParameterMeasureInfoList = _.cloneDeep(this.paramsInputList);
      saveDataCollectResult(params).then(data => {
        const res = data.data;
        if (res.code === 200) {
          if (res.data.success) {
            this.$message({
              message: "参数值提交成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "参数值提交失败",
              type: "warning"
            });
          }
          this.logList.push(res.data.msg);
          return;
        }
        this.$message({
          message: res.message,
          type: "error"
        });
      });
    },
    //左边页签选择
    handleClickLeft(tab) {
      if (tab.name === "baseRelation") {
        this.detailDialog = false;
      }
      if (tab.name === "lookDetail") {
        this.detailDialog = true;
      }
    },
    //右边页签选择
    handleClickRight(tab) {
      if (tab.name === "paramsInput") {
        this.paramsDialog = false;
      }
      if (tab.name === "paramsDetail") {
        this.paramsDialog = true;
      }
    },
    //关闭左边弹框
    closeParams() {
      this.activeNameLeft = "baseRelation";
      console.log(this.activeNameLeft);
    },
    //关闭右边弹框
    closeDetail() {
      this.activeNameRight = "paramsInput";
    },
    switchBtn() {
      this.isViewLog = !this.isViewLog;
    },
    input(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
.dc-collection {
  .el-tabs {
    margin: 10px;
  }
  .baseInfoForm {
    .el-form-item {
      margin-bottom: 0px;
      .el-input__inner {
        background: #fff;
        border: 0;
      }
    }
  }
  .bottom {
    .switchBtn {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
