<template>
  <div class="add-data-collection">
    <div class="operate">
      <dsn-button size="small" type="primary" @click="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click="save('addForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click="resetForm('addForm')">重置</dsn-button>
    </div>
    <div class="operate">
      <el-form
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="form-style"
        label-position="right"
        label-width="130px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据收集组名称:" prop="dcGroup" required>
              <dsn-input v-model="addForm.dcGroup" placeholder="请输入数据收集组名称"></dsn-input>
            </el-form-item>
            <el-form-item label="数据收集组类型:" prop="collectionType" required>
              <dsn-select
                v-model="addForm.collectionType"
                placeholder="请选择数据收集组类型"
                style="width:100%"
              >
                <el-option
                  v-for="(item,index) in collectionType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="数据收集组描述:" prop="dcGroupDes">
              <dsn-input
                class="dec"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6}"
                v-model="addForm.dcGroupDes"
                placeholder="请输入数据收集组描述"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operate">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="参数配置" name="first">
          <div>
            <dsn-button size="small" type="success" icon="el-icon-folder-add" @click="add">新增</dsn-button>
            <dsn-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="edit"
              :disabled="this.pCheckedList.length != 1"
            >编辑</dsn-button>
            <dsn-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="del"
              :disabled="this.pCheckedList.length === 0"
            >删除</dsn-button>
            <dsn-button @click.native="handleCopy">粘贴行</dsn-button>
            <dsn-button
              size="40"
              type="text"
              icon="el-icon-caret-top"
              @click.native="handleUpCraft"
            >上移</dsn-button>
            <dsn-button
              size="20"
              type="text"
              icon="el-icon-caret-bottom"
              @click.native="handleDownCraft"
            >下移</dsn-button>
          </div>
          <dsn-table
            ref="pTable"
            :data="this.MeasureInfoList"
            tooltip-effect="dark"
            row-key="parameter"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="parameter" label="参数名称" sortable width="100"></el-table-column>
            <el-table-column label="软检查">
              <template slot-scope="scope">{{ scope.row.softCheck ? '启用' : '不启用' }}</template>
            </el-table-column>
            <el-table-column prop="valueType" label="值类型">
              <template slot-scope="scope">{{ scope.row.valueType | filterValueType}}</template>
            </el-table-column>
            <el-table-column prop="targetValue" label="标准值"></el-table-column>
            <el-table-column prop="upperSpecLimit" label="标准值上限"></el-table-column>
            <el-table-column prop="lowerSpecLimit" label="标准值下限"></el-table-column>
            <el-table-column prop="upperWarnLimit" label="警告发生上限" width="100"></el-table-column>
            <el-table-column prop="lowerWarnLimit" label="警告发生下限" width="100"></el-table-column>
            <el-table-column label="参数状态">
              <template slot-scope="scope">{{ scope.row.parameterStatus ? '启用' : '不启用' }}</template>
            </el-table-column>
            <el-table-column prop="alarm" label="预警事件"></el-table-column>
            <el-table-column prop="createTime" label="创建人"></el-table-column>
            <el-table-column prop="createUserId" label="创建时间" width="130"></el-table-column>
          </dsn-table>
        </el-tab-pane>
        <el-tab-pane label="数据收集配置" name="second">
          <dsn-button size="small" type="success" icon="el-icon-folder-add" @click="addSet">新增</dsn-button>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="editSet"
            :disabled="this.sCheckedList.length != 1"
          >编辑</dsn-button>
          <dsn-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="delSet"
            :disabled="this.sCheckedList.length === 0"
          >删除</dsn-button>
          <dsn-table
            ref="sTable"
            :data="this.SetupInfoList"
            tooltip-effect="dark"
            row-key="dcGroup"
            @selection-change="handleSelectionChange2"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column label="条件明细" width="300">
              <template
                slot-scope="scope"
              >{{ scope.row.material+','+scope.row.materialGroup+','+scope.row.shopOrder+','+scope.row.workCenter+','+scope.row.resourceGroup+','+scope.row.shopOrder }}</template>
            </el-table-column>
          </dsn-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="参数配置" :visible.sync="paramsDialogVisible" width="800px">
      <el-form
        :inline="true"
        :model="addParamForm"
        ref="addParamForm"
        :rules="prules"
        class="form-style"
        label-position="right"
        :label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数名称:" prop="parameter">
              <dsn-input
                v-model="addParamForm.parameter"
                :disabled="this.currentOperation == 'edit'"
              ></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType != 30">
            <el-form-item label="标准值:" prop="targetValue">
              <dsn-input v-model="addParamForm.targetValue"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType == 30">
            <el-row>
              <el-col>
                <el-form-item label="标准值:" prop="trueValue">
                  <dsn-input
                    placeholder="true的命名"
                    v-model="addParamForm.trueValue"
                    clearable
                    style="width:100px"
                  ></dsn-input>
                </el-form-item>
                <el-form-item prop="falseValue">
                  <dsn-input
                    placeholder="false的命名"
                    v-model="addParamForm.falseValue"
                    clearable
                    style="width:100px"
                  ></dsn-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数描述:" prop="parameterDes">
              <dsn-input v-model="addParamForm.parameterDes"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准值上限:" prop="upperSpecLimit">
              <dsn-input
                v-model="addParamForm.upperSpecLimit"
                :disabled="addParamForm.valueType !== 10 || !addParamForm.targetValue"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数状态:" prop="parameterStatus">
              <dsn-select v-model="addParamForm.parameterStatus">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准值下限:" prop="lowerSpecLimit">
              <dsn-input
                v-model="addParamForm.lowerSpecLimit"
                :disabled="addParamForm.valueType !== 10 || !addParamForm.targetValue"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="值类型:" prop="valueType">
              <dsn-select v-model="addParamForm.valueType" @change="onChange">
                <el-option
                  v-for="(item,index) in valueType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警发生上限值:" prop="upperWarnLimit">
              <dsn-input
                v-model="addParamForm.upperWarnLimit"
                :disabled="addParamForm.valueType !== 10 || !addParamForm.targetValue"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="必须值:" prop="required">
              <dsn-select v-model="addParamForm.required">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.bool"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警发生下限值:" prop="lowerWarnLimit">
              <dsn-input
                v-model="addParamForm.lowerWarnLimit"
                :disabled="addParamForm.valueType !== 10 || !addParamForm.targetValue"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="软检查:" prop="softCheck">
              <dsn-select v-model="addParamForm.softCheck">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警事件编号:" prop="alarm">
              <dsn-select v-model="addParamForm.alarm">
                <el-option
                  v-for="(item,index) in alarmList"
                  :key="index"
                  :label="item.alarm"
                  :value="item.alarm"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="paramsDialogVisible = false">取 消</dsn-button>
        <dsn-button type="primary" @click="saveParams('addParamForm')">确 定</dsn-button>
      </span>
    </el-dialog>
    <el-dialog title="数据收集配置" :visible.sync="setUpDialogVisible" width="800px">
      <el-form
        :inline="true"
        :model="addSetUpForm"
        ref="addSetUpForm"
        :rules="srules"
        class="form-style"
        label-position="right"
        :label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料组:" prop="materialGroup">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="addSetUpForm.materialGroup"
                :fetch-suggestions="querySearchMaterialGroup"
                placeholder="请输入物料组"
                @select="handleSelectMaterialGroup"
                clearable
                size="small"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.materialGroup }}--{{ item.groupDes }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工序:" prop="operation">
              <!-- <dsn-input v-model="addSetUpForm.operation"></dsn-input> -->
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="addSetUpForm.operation"
                :fetch-suggestions="querySearchOperation"
                placeholder="请输入工序"
                @select="handleSelectOperation"
                clearable
                size="small"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.operation }}--{{ item.operationDes }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料号:" prop="material">
              <!-- <dsn-input v-model="addSetUpForm.material"></dsn-input> -->
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="addSetUpForm.material"
                :fetch-suggestions="querySearchMaterial"
                placeholder="请输入物料号"
                @select="handleSelectMaterial"
                clearable
                size="small"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.material }}--{{ item.materialDes }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作中心:" prop="workCenter">
              <!-- <dsn-input v-model="addSetUpForm.workCenter"></dsn-input> -->
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="addSetUpForm.workCenter"
                :fetch-suggestions="querySearchWorkCenter"
                placeholder="请输入工作中心"
                @select="handleSelectWorkCenter"
                clearable
                size="small"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.workCenter }}--{{ item.workCenterDes }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工单:" prop="shopOrder">
              <!-- <dsn-input v-model="addSetUpForm.shopOrder"></dsn-input> -->
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="addSetUpForm.shopOrder"
                :fetch-suggestions="querySearchShopOrder"
                placeholder="请输入工单"
                @select="handleSelectShopOrder"
                clearable
                size="small"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.shopOrder }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型:" prop="resourceGroup">
              <!-- <dsn-input v-model="addSetUpForm.resourceGroup"></dsn-input> -->
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="addSetUpForm.resourceGroup"
                :fetch-suggestions="querySearchResourceGroup"
                placeholder="请输入设备类型"
                @select="handleSelectResourceGroup"
                clearable
                size="small"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.resourceGroup }}--{{item.groupDes}}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="setUpDialogVisible = false">取 消</dsn-button>
        <dsn-button type="primary" @click="saveSetUp('addSetUpForm')">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  saveDataCollection,
  getAlarmList
} from "../../../api/data.collection.api";
import { listALLMaterialGroupHttp } from "@/api/material/material.group.api.js";
import { listAllMaterialHttp } from "@/api/material.info.api.js";
import { findShopOrderListRequest } from "@/api/work-order/work-order.api.js";
import { getOperationList } from "@/api/operation.maintain.api.js";
import { findPageHttp } from "@/api/work.center.api.js";
import { listAllResourceGroupHttp } from "@/api/device/type.api.js";
import _ from "lodash";
export default {
  name: "add-data-collection",
  data() {
    let targetValueRequired = (rule, value, callback) => {
      if (this.addParamForm.valueType == 10) {
        let reg = /^((\d{1,5}\.\d{0,3})||(\d{1,5}))$/g;
        if (!reg.test(value)) {
          return callback(new Error("只能输入整数5位以内，小数3位以内"));
        }
      } else {
        if (!value) {
          return callback(new Error("请填写标准值"));
        }
      }
      callback();
    };
    let validatorUpper = (rule, value, callback) => {
      if (this.addParamForm.valueType == 10) {
        let reg = /^((\d{1,5}\.\d{0,3})||(\d{1,5}))$/g;
        if (!reg.test(value)) {
          return callback(new Error("只能输入整数5位以内，小数3位以内"));
        }
        if (value <= this.addParamForm.targetValue) {
          return callback(new Error("只能输入比标准值大的数字"));
        }
        this.addParamForm.upperSpecLimit = Number(
          this.addParamForm.upperSpecLimit
        ).toFixed(3);
        this.addParamForm.upperWarnLimit = Number(
          this.addParamForm.upperWarnLimit
        ).toFixed(3);
        callback();
      }
      callback();
    };
    let validatorLower = (rule, value, callback) => {
      if (this.addParamForm.valueType == 10) {
        let reg = /^((\d{1,5}\.\d{0,3})||(\d{1,5}))$/g;
        if (!reg.test(value)) {
          return callback(new Error("只能输入整数5位以内，小数3位以内"));
        }
        if (value >= this.addParamForm.targetValue) {
          return callback(new Error("只能输入比标准值小的数字"));
        }
        this.addParamForm.lowerSpecLimit = Number(
          this.addParamForm.lowerSpecLimit
        ).toFixed(3);
        this.addParamForm.lowerWarnLimit = Number(
          this.addParamForm.lowerWarnLimit
        ).toFixed(3);
        callback();
      }
      callback();
    };
    return {
      targetValueRequired,
      validatorUpper,
      validatorLower,
      formLabelWidth: "120px",
      activeName: "first",
      paramsDialogVisible: false,
      setUpDialogVisible: false,
      rules: {
        dcGroup: [
          { required: true, message: "请填写数据收集组名称", trigger: "blur" }
        ],
        collectionType: [
          { required: true, message: "请选择数据收集类型", trigger: "change" }
        ]
      },
      srules: {},
      MeasureInfoList: [],
      SetupInfoList: [],
      addForm: {
        dcGroup: "",
        collectionType: "",
        dcGroupDes: ""
      },
      addParamForm: {
        parameter: "",
        targetValue: "",
        parameterDes: "",
        upperSpecLimit: "",
        parameterStatus: "",
        lowerSpecLimit: "",
        valueType: "",
        upperWarnLimit: "",
        required: "",
        lowerWarnLimit: "",
        softCheck: "",
        alarm: "",
        dcGroup: "",
        tenantSiteCode: "test",
        falseValue: "",
        trueValue: ""
      },
      addSetUpForm: {
        materialGroup: "",
        operation: "",
        material: "",
        workCenter: "",
        shopOrder: "",
        resourceGroup: "",
        dcGroup: "",
        tenantSiteCode: "test"
      },
      collectionType: [
        {
          value: "10",
          label: "LOT"
        },
        {
          value: "20",
          label: "资源"
        }
      ],
      status: [
        {
          value: true,
          label: "启用",
          bool: "是",
          valueType: "TRUE"
        },
        {
          value: false,
          label: "不启用",
          bool: "否",
          valueType: "FALSE"
        }
      ],
      valueType: [
        {
          label: "数值",
          value: 10
        },
        {
          label: "文本",
          value: 20
        },
        {
          label: "布尔",
          value: 30
        }
      ],
      alarmList: [],
      pCheckedList: [],
      sCheckedList: [],
      currentOperation: "",
      materialGroupList: [],
      materialList: [],
      shopOrderList: [],
      operationList: [],
      workCenterList: [],
      resourceGroupList: []
    };
  },
  filters: {
    filterValueType(value) {
      if (value === 10) {
        return "数值";
      }
      if (value === 20) {
        return "文本";
      }
      if (value === 30) {
        return "布尔";
      }
      return value;
    }
  },
  created() {
    let params = {
      alarm: ""
    };
    getAlarmList(params).then(data => {
      this.alarmList = data.data.data;
    });
  },
  computed: {
    prules: function() {
      const prules = {
        parameter: [
          { required: true, message: "请填写参数名称", trigger: "blur" }
        ],
        parameterStatus: [
          { required: true, message: "请选择参数状态", trigger: "change" }
        ],
        valueType: [
          { required: true, message: "请选择值类型", trigger: "change" }
        ],
        required: [
          { required: true, message: "请选择必须值", trigger: "change" }
        ],
        softCheck: [
          { required: true, message: "请选择软检查", trigger: "change" }
        ]
      };
      if (this.addParamForm.valueType && this.addParamForm.valueType === 30) {
        return {
          ...prules,
          trueValue: [
            { required: true, message: "请输入真值名称", trigger: "blur" }
          ],
          falseValue: [
            { required: true, message: "请输入假值名称", trigger: "blur" }
          ],
          targetValue: [
            {
              required: false,
              trigger: "blur"
            }
          ]
        };
      } else {
        return {
          ...prules,
          targetValue: [
            {
              required: true,
              validator: this.targetValueRequired,
              trigger: "blur"
            }
          ],
          upperSpecLimit: [{ validator: this.validatorUpper, trigger: "blur" }],
          lowerSpecLimit: [{ validator: this.validatorLower, trigger: "blur" }],
          upperWarnLimit: [{ validator: this.validatorUpper, trigger: "blur" }],
          lowerWarnLimit: [{ validator: this.validatorLower, trigger: "blur" }]
        };
      }
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const tempDcSetupInfoList = this.SetupInfoList;
          // tempDcSetupInfoList.forEach(element => {
          //   element.material = element.material;
          //   element.materialGroup = element.materialGroup;
          // });
          const tempMeasureInfoList = this.MeasureInfoList;
          tempMeasureInfoList.forEach(element => {
            element.lowerSpecLimit = parseFloat(element.lowerSpecLimit);
            element.lowerWarnLimit = parseFloat(element.lowerWarnLimit);
            element.upperSpecLimit = parseFloat(element.upperSpecLimit);
            element.upperWarnLimit = parseFloat(element.upperWarnLimit);
          });
          console.log(tempMeasureInfoList);
          const params = {
            collectionType: this.addForm.collectionType,
            dcGroup: this.addForm.dcGroup,
            dcGroupDes: this.addForm.dcGroupDes,
            tenantSiteCode: "test",
            type: "add",
            dcParameterMeasureInfoList: this.MeasureInfoList,
            dcSetupInfoList: tempDcSetupInfoList
          };
          saveDataCollection(params).then(data => {
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              setTimeout(() => {
                this.$router.push({ path: "/dc/dataCollection" });
              }, 1000);
            } else {
              this.$message.error(data.data.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.push({ path: "/dc/dataCollection" });
    },
    rowKeyFn(row) {
      return row.parameter;
    },
    saveParams(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addParamForm.dcGroup = this.addForm.dcGroup;
          let form = JSON.parse(JSON.stringify(this.addParamForm));
          if (this.currentOperation == "add") {
            if (
              this.MeasureInfoList.findIndex(
                item => item.parameter === form.parameter
              ) == -1
            ) {
              this.MeasureInfoList.push(form);
              this.$message.success("操作成功");
            } else {
              this.$message.error("该条数据已存在，添加失败");
            }
          } else if (this.currentOperation == "edit") {
            this.MeasureInfoList.splice(
              this.MeasureInfoList.findIndex(
                item => item.parameter === form.parameter
              ),
              1,
              form
            );
            this.$message.success("操作成功");
          }
          this.$refs.pTable.clearSelection();
          this.paramsDialogVisible = false;
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    saveSetUp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let count = 0;
          let tempObj = JSON.parse(JSON.stringify(this.addSetUpForm));
          let dcGroup = tempObj.dcGroup;
          tempObj.dcGroup = "";
          console.log(tempObj);
          for (const key in tempObj) {
            if (tempObj.hasOwnProperty(key)) {
              if (tempObj[key] === "") {
                count++;
              }
            }
          }
          console.log(count);
          if (count > 6) {
            this.$message({
              message: "请至少输入一个信息",
              type: "warning"
            });
            return;
          }
          tempObj.dcGroup = dcGroup;
          this.handleSaveSetUp(formName);
        } else {
          return false;
        }
      });
    },
    handleSaveSetUp(formName) {
      this.addSetUpForm.dcGroup = this.addForm.dcGroup;
      let form = JSON.parse(JSON.stringify(this.addSetUpForm));
      if (this.currentOperation == "add") {
        if (
          this.SetupInfoList.findIndex(
            item =>
              JSON.parse(JSON.stringify(item)) ==
              JSON.parse(JSON.stringify(form))
          ) == -1
        ) {
          this.SetupInfoList.push(form);
          this.$message.success("操作成功");
        } else {
          this.$message.error("该条数据已存在，添加失败");
        }
      } else if (this.currentOperation == "edit") {
        this.SetupInfoList.splice(
          this.SetupInfoList.findIndex(
            item =>
              JSON.parse(JSON.stringify(item)) ==
              JSON.parse(JSON.stringify(form))
          ),
          1,
          form
        );
        this.$message.success("操作成功");
      }
      console.log(this.SetupInfoList);
      this.$refs.sTable.clearSelection();
      this.setUpDialogVisible = false;
      this.$refs[formName].resetFields();
    },
    handleSelectionChange(val) {
      this.pCheckedList = val;
      this.pCheckedList.forEach(element => {
        console.log(element.index);
      });
    },
    handleSelectionChange2(val) {
      this.sCheckedList = val;
      console.log(val, "va");
    },
    onChange() {
      this.addParamForm.targetValue = "";
    },
    add() {
      this.paramsDialogVisible = true;
      this.currentOperation = "add";
    },
    addSet() {
      this.setUpDialogVisible = true;
      this.currentOperation = "add";
      this.queryMaterialGroup();
      this.queryMaterial();
      this.queryShopOrder();
      this.queryOperation();
      this.queryWorkCenter();
      this.queryResourceGroup();
    },
    edit() {
      this.paramsDialogVisible = true;
      this.currentOperation = "edit";
      console.log(this.pCheckedList, "pc");
      this.addParamForm = JSON.parse(JSON.stringify(this.pCheckedList[0]));
    },
    editSet() {
      this.setUpDialogVisible = true;
      this.currentOperation = "edit";
      console.log(this.sCheckedList, "pc");
      this.addSetUpForm = JSON.parse(JSON.stringify(this.sCheckedList[0]));
    },
    del() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pCheckedList.map(val => {
            this.MeasureInfoList.splice(
              this.MeasureInfoList.findIndex(
                item => item.parameter === val.parameter
              ),
              1
            );
          });
          this.$refs.pTable.clearSelection();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delSet() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.sCheckedList.map(val => {
            this.SetupInfoList.splice(
              this.SetupInfoList.findIndex(
                item =>
                  JSON.parse(JSON.stringify(item)) ==
                  JSON.parse(JSON.stringify(val))
              ),
              1
            );
          });
          this.$refs.pTable.clearSelection();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    sortChange(column, prop, order) {
      console.log(column, prop, order);
    },
    tableRowClassName(row, rowIndex) {
      console.log(row, rowIndex);
    },
    // 复制动作的操作
    handleCopy() {
      if (this.pCheckedList.length != 1) {
        this.$message({
          type: "warning",
          message: "请先选中一行，然后粘贴"
        });
        return;
      }
      const selectItem = this.pCheckedList[0];
      //  复制取当前后面的序号
      const index = this.MeasureInfoList.findIndex(item => {
        return item === selectItem;
      });

      // const len = this.MeasureInfoList.length;
      const copyItem = _.cloneDeep({
        ...selectItem
      });
      this.MeasureInfoList.splice(index + 1, 0, copyItem);
      // this.lockOpeAction = true; //  锁定操作
    },
    // 上排序
    handleUpCraft() {
      if (this.pCheckedList.length != 1) {
        this.$message({
          type: "warning",
          message: "请先选择需要移动的一行"
        });
        return;
      }
      const selectOne = this.pCheckedList[0];
      const index = this.MeasureInfoList.findIndex(item => item === selectOne);
      console.log(index);
      // 无法上移动
      if (index <= 0) {
        return;
      }
      const topOne = this.MeasureInfoList[index - 1];
      this.MeasureInfoList.splice(index, 1, topOne);
      this.MeasureInfoList.splice(index - 1, 1, selectOne);
    },
    //下移
    handleDownCraft() {
      if (this.pCheckedList.length != 1) {
        this.$message({
          type: "warning",
          message: "请先选择需要移动的一行"
        });
        return;
      }
      const selectOne = this.pCheckedList[0];
      const index = this.MeasureInfoList.findIndex(item => item === selectOne);
      console.log(index);
      // 无法下移动
      if (index == this.MeasureInfoList.length - 1) {
        return;
      }
      const bottomOne = this.MeasureInfoList[index + 1];
      this.MeasureInfoList.splice(index, 1, bottomOne);
      this.MeasureInfoList.splice(index + 1, 1, selectOne);
    },

    //搜索建议调用方法
    createFilter(queryString) {
      return item => {
        return (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    // querySearch(queryString, cb, arrayList) {
    //   console.log(arrayList);
    //   let results = queryString
    //     ? arrayList.filter(this.createFilter(queryString))
    //     : arrayList;
    //   // 调用 callback 返回建议列表的数据
    //   cb(results);
    // },
    //查询物料组信息start
    queryMaterialGroup() {
      listALLMaterialGroupHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.materialGroupList = res.data;
          this.materialGroupList.forEach(element => {
            element.value = element.materialGroup;
          });
          return;
        }
        this.$message({ type: "warning", message: res.message });
      });
    },
    querySearchMaterialGroup(queryString, cb) {
      let materialGroupList = this.materialGroupList;
      let results = queryString
        ? materialGroupList.filter(this.createFilter(queryString))
        : materialGroupList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectMaterialGroup(item) {
      this.addSetUpForm.materialGroup = item.materialGroup;
    },
    //查询物料组信息end
    //查询物料信息start
    queryMaterial() {
      listAllMaterialHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.materialList = res.data;
          this.materialList.forEach(element => {
            element.value = element.material;
          });
          return;
        }
        this.$message({ type: "warning", message: res.message });
      });
    },
    querySearchMaterial(queryString, cb) {
      let materialList = this.materialList;
      let results = queryString
        ? materialList.filter(this.createFilter(queryString))
        : materialList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectMaterial(item) {
      this.addSetUpForm.material = item.material;
    },
    //查询物料信息end
    // 查询工单信息start
    queryShopOrder() {
      const data = { shopOrder: "", tenantSiteCode: "" };
      findShopOrderListRequest(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.shopOrderList = res.data;
          this.shopOrderList.forEach(element => {
            element.value = element.shopOrder;
          });
          return;
        }
        this.$message({ type: "warning", message: res.message });
      });
    },
    querySearchShopOrder(queryString, cb) {
      let shopOrderList = this.shopOrderList;
      let results = queryString
        ? shopOrderList.filter(this.createFilter(queryString))
        : shopOrderList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectShopOrder(item) {
      this.addSetUpForm.shopOrder = item.shopOrder;
    },
    // 查询工单信息end
    // 查询工序信息start
    queryOperation() {
      const data = { operation: "", pageSize: 0, currentPage: 1 };
      getOperationList(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.operationList = res.data.data;
          this.operationList.forEach(element => {
            element.value = element.operation;
          });
          return;
        }
        this.$message({ type: "warning", message: res.message });
      });
    },
    querySearchOperation(queryString, cb) {
      let operationList = this.operationList;
      let results = queryString
        ? operationList.filter(this.createFilter(queryString))
        : operationList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectOperation(item) {
      this.addSetUpForm.operation = item.operation;
    },
    // 查询工序信息end
    // 查询工作中心信息start
    queryWorkCenter() {
      const data = { workCenter: "", pageSize: 0, currentPage: 1 };
      findPageHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.workCenterList = res.data.data;
          this.workCenterList.forEach(element => {
            element.value = element.workCenter;
          });
          return;
        }
        this.$message({ type: "warning", message: res.message });
      });
    },
    querySearchWorkCenter(queryString, cb) {
      let workCenterList = this.workCenterList;
      let results = queryString
        ? workCenterList.filter(this.createFilter(queryString))
        : workCenterList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectWorkCenter(item) {
      this.addSetUpForm.workCenter = item.workCenter;
    },
    // 查询工作中心信息end
    // 查询设备类型信息start
    queryResourceGroup() {
      listAllResourceGroupHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.resourceGroupList = res.data;
          this.resourceGroupList.forEach(element => {
            element.value = element.resourceGroup;
          });
          return;
        }
        this.$message({ type: "warning", message: res.message });
      });
    },
    querySearchResourceGroup(queryString, cb) {
      let resourceGroupList = this.resourceGroupList;
      let results = queryString
        ? resourceGroupList.filter(this.createFilter(queryString))
        : resourceGroupList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectResourceGroup(item) {
      this.addSetUpForm.resourceGroup = item.resourceGroup;
    }
    // 查询设备类型信息end
  }
};
</script>

<style  lang="scss">
.add-data-collection {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
    // padding-bottom: 14px;
    border-radius: 4px;
    .workCertificateFormTop {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  // .addForm {
  //   background: #ffffff;
  //   padding: 10px;
  //   .dec {
  //     width: 200px !important;
  //   }
  // }
}
</style>
