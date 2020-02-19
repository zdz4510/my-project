<template>
  <div class="edit-data-collection">
    <div class="operate">
      <dsn-button size="small" type="primary" @click="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click="handleSave('editForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click="resetForm">重置</dsn-button>
    </div>
    <!-- <div>
          <dsn-select
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
              :key="item.dcGroup"
              :label="item.dcGroup"
              :value="item.dcGroup"
            ></el-option>
          </dsn-select>
          <el-table
            ref="editTable"
            :data="cloneList"
            border
            highlight-current-row
            style="width: 100%"
            height="513"
            @row-click="handleCurrentChange"
          >
            <el-table-column label="数据收集组名称" prop="dcGroup"></el-table-column>
            <el-table-column label="数据收集组类型">
              <template slot-scope="scope">{{ getFormat(scope.row.collectionType) }}</template>
            </el-table-column>
          </el-table>
    </div>-->
    <div class="operate">
      <el-row>
        <el-col :span="12">
          <el-form
            :model="editForm"
            ref="editForm"
            :rules="rules"
            class="dataCollectionFormTop"
            :label-width="formLabelWidth"
          >
            <el-form-item label="数据收集组名称" prop="dcGroup" required>
              <dsn-input v-model="editForm.dcGroup" disabled></dsn-input>
            </el-form-item>
            <el-form-item label="数据收集组类型:" prop="collectionType" required>
              <dsn-select v-model="editForm.collectionType" disabled style="width:100%">
                <el-option
                  v-for="item in collectionType"
                  :key="item.value"
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
                v-model="editForm.dcGroupDes"
                style="width:100%"
              ></dsn-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="parameter" label="参数名称"></el-table-column>
            <el-table-column label="软检查">
              <template slot-scope="scope">{{ scope.row.softCheck ? '启用' : '不启用' }}</template>
            </el-table-column>
            <el-table-column prop="valueType" label="值类型">
              <template slot-scope="scope">{{ scope.row.valueType | filtersValueType}}</template>
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
            <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
            <el-table-column prop="createUserId" label="创建人"></el-table-column>
          </dsn-table>
        </el-tab-pane>
        <el-tab-pane label="数据收集配置" name="second">
          <div>
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
          </div>
          <el-table
            ref="sTable"
            :data="this.SetupInfoList"
            tooltip-effect="dark"
            row-key="index"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="条件明细">
              <template
                slot-scope="scope"
              >{{ scope.row.material+','+scope.row.materialGroup+','+scope.row.shopOrder+','+scope.row.workCenter+','+scope.row.resourceGroup+','+scope.row.shopOrder }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 确认模态框 -->
    <el-dialog title="保存" :visible.sync="saveDialog" width="30%">
      <span>是否保存数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="handleCancle">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSave('editForm')">确 定</dsn-button>
      </span>
    </el-dialog>
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
                placeholder="请输入参数名称"
              ></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType !==30">
            <el-form-item label="标准值:" prop="targetValue">
              <dsn-input v-model="addParamForm.targetValue" placeholder="请输入参数名称"></dsn-input>
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
              <dsn-input v-model="addParamForm.parameterDes" placeholder="请输入参数名称"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准值上限:" prop="upperSpecLimit">
              <dsn-input
                v-model="addParamForm.upperSpecLimit"
                :disabled="addParamForm.valueType !== 10 || !addParamForm.targetValue"
                placeholder="请输入输入比标准值大的数字（整数5位以内，小数3位以内）"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数状态:" prop="parameterStatus">
              <dsn-select v-model="addParamForm.parameterStatus" placeholder="请输入参数名称">
                <el-option
                  v-for="item in status"
                  :key="item.value"
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
                placeholder="请输入输入比标准值小的数字（整数5位以内，小数3位以内）"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="值类型:" prop="valueType">
              <dsn-select v-model="addParamForm.valueType" @change="onChange" placeholder="请输入参数名称">
                <el-option
                  v-for="item in valueType"
                  :key="item.value"
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
                placeholder="请输入输入比标准值大的数字（整数5位以内，小数3位以内）"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="必须值:" prop="required">
              <dsn-select v-model="addParamForm.required" placeholder="请输入参数名称">
                <el-option
                  v-for="item in status"
                  :key="item.value"
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
                placeholder="请输入输入比标准值小的数字（整数5位以内，小数3位以内）"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="软检查:" prop="softCheck">
              <dsn-select v-model="addParamForm.softCheck" placeholder="请输入参数名称">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警事件编号:" prop="alarm">
              <dsn-select v-model="addParamForm.alarm" placeholder="请输入参数名称">
                <el-option
                  v-for="item in alarmList"
                  :key="item.alarm"
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
import { mapGetters, mapMutations } from "vuex";
import {
  saveDataCollection,
  getAlarmList,
  getMeasureList,
  getSetupList
} from "../../../api/data.collection.api";
import { listALLMaterialGroupHttp } from "@/api/material/material.group.api.js";
import { listAllMaterialHttp } from "@/api/material.info.api.js";
import { findShopOrderListRequest } from "@/api/work-order/work-order.api.js";
import { getOperationList } from "@/api/operation.maintain.api.js";
import { findPageHttp } from "@/api/work.center.api.js";
import { listAllResourceGroupHttp } from "@/api/device/type.api.js";
export default {
  name: "edit-data-collection",
  computed: {
    ...mapGetters(["dataCollectionEditList"]),
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
            {
              required: true,
              validator: this.validateBoolean,
              message: "请输入真值名称",
              trigger: "blur"
            }
          ],
          falseValue: [
            {
              required: true,
              validator: this.validateBoolean,
              message: "请输入假值名称",
              trigger: "blur"
            }
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
    },
    valueTypeText() {
      return this.addParamForm.valueType;
    }
  },
  watch: {
    valueTypeText(val) {
      if (val === 30) {
        this.addParamForm.upperSpecLimit = "";
        this.addParamForm.lowerSpecLimit = "";
        this.addParamForm.upperWarnLimit = "";
        this.addParamForm.lowerWarnLimit = "";
      }
      if (val === 20) {
        this.addParamForm.falseValue = "true";
        this.addParamForm.trueValue = "false";
        this.addParamForm.upperSpecLimit = "";
        this.addParamForm.lowerSpecLimit = "";
        this.addParamForm.upperWarnLimit = "";
        this.addParamForm.lowerWarnLimit = "";
      }
      if (val === 10) {
        this.addParamForm.falseValue = "true";
        this.addParamForm.trueValue = "false";
      }
    }
  },
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
        if (!value) {
          callback();
        }
        let reg = /^((\d{1,5}\.\d{0,3})||(\d{1,5}))$/g;
        if (!reg.test(value)) {
          return callback(new Error("只能输入整数5位以内，小数3位以内"));
        }
        if (value <= this.addParamForm.targetValue) {
          return callback(new Error("只能输入比标准值大的数字"));
        }
        // this.addParamForm.upperSpecLimit = Number(
        //   this.addParamForm.upperSpecLimit
        // ).toFixed(3);
        // this.addParamForm.upperWarnLimit = Number(
        //   this.addParamForm.upperWarnLimit
        // ).toFixed(3);
        callback();
      }
      callback();
    };
    let validatorLower = (rule, value, callback) => {
      if (this.addParamForm.valueType == 10) {
        if (!value) {
          callback();
        }
        let reg = /^((\d{1,5}\.\d{0,3})||(\d{1,5}))$/g;
        if (!reg.test(value)) {
          return callback(new Error("只能输入整数5位以内，小数3位以内"));
        }
        if (value >= this.addParamForm.targetValue) {
          return callback(new Error("只能输入比标准值小的数字"));
        }
        // this.addParamForm.lowerSpecLimit = Number(
        //   this.addParamForm.lowerSpecLimit
        // ).toFixed(3);
        // this.addParamForm.lowerWarnLimit = Number(
        //   this.addParamForm.lowerWarnLimit
        // ).toFixed(3);
        callback();
      }
      callback();
    };
    let validateResource = (rule, value, callback) => {
      let reg = /^([A-Za-z0-9]{1,30})$/g;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("只能输入字母或者数字，最长30位"));
      }
      this.addSetUpForm.resourceGroup = this.addSetUpForm.resourceGroup.toUpperCase();
      callback();
    };
    let validateBoolean = (rule, value, callback) => {
      if (this.addParamForm.valueType == 30) {
        if (!value) {
          return callback(new Error("请填写标准值"));
        }
        if ((value + "").length > 5) {
          return callback(new Error("只能输入5位以内"));
        }
        callback();
      }
      callback();
    };
    return {
      targetValueRequired,
      validatorUpper,
      validatorLower,
      validateBoolean,
      //克隆一份初始数据
      cloneDataCollectionEditList: [],
      formLabelWidth: "130px",
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
      srules: {
        resourceGroup: [
          { required: false, validator: validateResource, trigger: "change" }
        ]
      },
      MeasureInfoList: [],
      SetupInfoList: [],
      cloneMeasureInfoList: [],
      cloneSetupInfoList: [],
      editForm: {
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
        falseValue: "false",
        trueValue: "true",
        upperWarnLimit: "",
        required: "",
        lowerWarnLimit: "",
        softCheck: "",
        alarm: "",
        dcGroup: "",
        tenantSiteCode: "test"
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
          value: 10,
          label: "LOT"
        },
        {
          value: 20,
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
      selectIsDisabled: false,
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      materialGroupList: [],
      materialList: [],
      shopOrderList: [],
      operationList: [],
      workCenterList: [],
      resourceGroupList: []
    };
  },
  filters: {
    filtersValueType(value) {
      const numberValue = parseInt(value);
      if (numberValue === 10) {
        return "数值";
      }
      if (numberValue === 20) {
        return "文本";
      }
      if (numberValue === 30) {
        return "布尔";
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
    this.cloneDataCollectionEditList = JSON.parse(
      JSON.stringify(this.dataCollectionEditList)
    );
    let params = {
      alarm: ""
    };
    getAlarmList(params).then(data => {
      this.alarmList = data.data.data;
    });

    console.log(this.currentRow, "dataCollectionEditList");
    let p = {
      dcGroup: this.dataCollectionEditList[0].dcGroup,
      tenantSiteCode: "test"
    };
    this.getListData(p);
  },
  methods: {
    ...mapMutations(["SETDATACOLLECTIONEDITLIST"]),
    //初始化的操作
    init() {
      if (this.dataCollectionEditList.length > 0) {
        this.cloneList = JSON.parse(
          JSON.stringify(this.dataCollectionEditList)
        ); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = JSON.parse(JSON.stringify(this.editForm)); // modify 的副本
        // this.setCurrent(this.editForm); // 设置选中第一行
        this.currentRow = this.editForm; // 设置初始currentRow 为第一行
      }
    },
    //清除下拉列表时触发
    handleClearSelect() {
      this.init();
    },
    //选中下拉列表时触发
    handleChangeOption(row) {
      if (row == "") {
        return;
      }
      //过滤数组
      const tempList = this.cloneList.filter(item => item["mat"] == row);
      console.log(tempList);
      this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      // this.setCurrent(tempList[0]);
      let p = {
        dcGroup: this.editForm.dcGroup,
        tenantSiteCode: "test"
      };
      this.getListData(p);
    },
    //下拉列表获取到焦点时触发
    handleSelectFocus() {
      // this.oldRow = oldRow;
      //  当前编辑的和之前的数据不一样就显示弹窗
      if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        // console.log('数据不一样禁用下拉框还有弹出保存')
        this.saveDialog = true; // 保存弹出框出现
        this.selectIsDisabled = true; // 禁用下拉框
        this.$refs["select"].blur();
      } else {
        //  console.log('数据一样不禁用下拉框还有不弹出保存')
        this.saveDialog = false;
        this.selectIsDisabled = false;
      }
    },
    // //设置某一行被选中
    // setCurrent(row) {
    //   this.$refs.editTable.setCurrentRow(row);
    // },

    findItemByKey(arr, keyV, kerStr) {
      let temp = arr.filter(item => item[kerStr] == keyV);
      if (temp.length > 0) {
        return temp[0];
      }
      return null;
    },
    // 点击某一行选中后操作的状态你
    handleCurrentChange(currentRow) {
      this.oldRow = this.currentRow;
      this.currentRow = currentRow;
      if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        this.saveDialog = true; // 弹出保存的提示框
        return;
      }
      this.editForm = currentRow;
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      let p = {
        dcGroup: this.editForm.dcGroup,
        tenantSiteCode: "test"
      };
      this.getListData(p);
    },
    //选中某一行
    //返回操作
    goBack() {
      this.$router.push({ path: "/dc/dataCollection" });
    },
    /**
     *  通过mat
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["dcGroup"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if (
        this.cloneList.length < this.dataCollectionEditList.length &&
        this.value != ""
      ) {
        this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
        this.editForm = this.cloneList[0];
        return;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.dataCollectionEditList)); //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.dcGroup;
        let item = this.findItemByKey(this.cloneList, code, "dcGroup");
        if (item) {
          // this.setCurrent(item);
        }
        this.editForm = item;
      }
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
      // 无法上移动
      if (index <= 0) {
        return;
      }
      const topOne = this.MeasureInfoList[index - 1];
      this.MeasureInfoList.splice(index, 1, topOne);
      this.MeasureInfoList.splice(index - 1, 1, selectOne);
      console.log(this.MeasureInfoList);
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

    //保存操作
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // const tempDcSetupInfoList = this.SetupInfoList;
          // tempDcSetupInfoList.forEach(element => {
          //   element.material = element.mat;
          //   element.materialGroup = element.matGroup;
          // });
          // let params = this.editForm;
          // params.tenantSiteCode = "test";
          // params.type = "edit";
          // params.dcParameterMeasureInfoList = this.MeasureInfoList;
          // params.dcSetupInfoList = tempDcSetupInfoList;

          const tempDcSetupInfoList = this.SetupInfoList;
          // tempDcSetupInfoList.forEach(element => {
          //   element.material = element.material;
          //   element.materialGroup = element.materialGroup;
          // });
          const tempMeasureInfoList = this.MeasureInfoList;
          tempMeasureInfoList.forEach((element, index) => {
            element.lowerSpecLimit = parseFloat(element.lowerSpecLimit);
            element.lowerWarnLimit = parseFloat(element.lowerWarnLimit);
            element.upperSpecLimit = parseFloat(element.upperSpecLimit);
            element.upperWarnLimit = parseFloat(element.upperWarnLimit);
            element.parameterOrder = index + 1;
          });
          const params = {
            collectionType: this.editForm.collectionType,
            dcGroup: this.editForm.dcGroup,
            dcGroupDes: this.editForm.dcGroupDes,
            tenantSiteCode: "test",
            type: "edit",
            dcParameterMeasureInfoList: this.MeasureInfoList,
            dcSetupInfoList: tempDcSetupInfoList
          };

          saveDataCollection(params).then(data => {
            const res = data.data;
            this.saveDialog = false; // 保存的提示框消失
            this.selectIsDisabled = false;

            // 直接成功
            if (res.code === 200) {
              this.saveDialog = false;
              this.selectIsDisabled = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              // 直接覆盖
              if (this.cloneList.length == this.dataCollectionEditList.length) {
                //直接覆盖
                //重新更改初始的副本
                //设置左边的选中状态
                this.SETDATACOLLECTIONEDITLIST(
                  JSON.parse(JSON.stringify(this.cloneList))
                );
                this.editForm = this.currentRow;
                this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
              }

              if (this.cloneList.length == 1) {
                let index = this.findIndexByItem(
                  this.dataCollectionEditList,
                  this.editForm.mat
                );
                if (index > -1) {
                  this.dataCollectionEditList.splice(index, 1, this.editForm); // 替换
                  this.SETDATACOLLECTIONEDITLIST(
                    JSON.parse(JSON.stringify(this.dataCollectionEditList))
                  );
                  this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
                }
              }
              this.goBack();
              return;
            }
            this.$message({
              message: res.message,
              type: "error"
            });
            this.saveDialog = false;
            // this.setCurrent(this.oldRow);
          });
        }
      });
    },
    getFormat(collectionType) {
      if (collectionType == "10") {
        return "物料";
      } else if (collectionType == "20") {
        return "资源";
      } else if (collectionType == "30") {
        return "工序";
      } else if (collectionType == "40") {
        return "工单";
      } else {
        return "--";
      }
    },
    saveParams(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addParamForm.dcGroup = this.editForm.dcGroup;
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
          console.log(this.MeasureInfoList);
          this.$refs.pTable.clearSelection();
          this.paramsDialogVisible = false;
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveSetUp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addSetUpForm.dcGroup = this.editForm.dcGroup;
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
          this.$refs.sTable.clearSelection();
          this.setUpDialogVisible = false;
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      this.pCheckedList = val;
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
      this.queryData();
    },
    edit() {
      this.paramsDialogVisible = true;
      this.currentOperation = "edit";
      console.log(this.pCheckedList, "pc");
      this.addParamForm = JSON.parse(JSON.stringify(this.pCheckedList[0]));
    },
    queryData() {
      this.queryMaterialGroup();
      this.queryMaterial();
      this.queryShopOrder();
      this.queryOperation();
      this.queryWorkCenter();
      this.queryResourceGroup();
    },
    editSet() {
      this.setUpDialogVisible = true;
      this.currentOperation = "edit";
      console.log(this.sCheckedList, "pc");
      this.addSetUpForm = JSON.parse(JSON.stringify(this.sCheckedList[0]));
      this.queryData();
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
    getListData(params) {
      getMeasureList(params).then(data => {
        if (data.data.code === 200) {
          this.cloneMeasureInfoList = JSON.parse(
            JSON.stringify(data.data.data)
          );
          this.MeasureInfoList = data.data.data;
          this.MeasureInfoList.forEach(element => {
            element.valueType = parseInt(element.valueType);
          });
          return;
        }
        this.$message({
          type: "error",
          message: data.data.message
        });
      });
      getSetupList(params).then(data => {
        if (data.data.code === 200) {
          this.cloneSetupInfoList = JSON.parse(JSON.stringify(data.data.data));
          this.SetupInfoList = data.data.data;
          return;
        }
        this.$message({
          type: "error",
          message: data.data.message
        });
      });
    },
    resetForm() {
      this.editForm = JSON.parse(
        JSON.stringify(this.cloneDataCollectionEditList[0])
      );
      this.SetupInfoList = JSON.parse(JSON.stringify(this.cloneSetupInfoList));
      this.MeasureInfoList = JSON.parse(
        JSON.stringify(this.cloneMeasureInfoList)
      );
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

<style lang="scss">
.edit-data-collection {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    padding-bottom: 10px;
    margin-bottom: 14px;
    // padding-bottom: 14px;
    border-radius: 4px;
  }
}
</style>