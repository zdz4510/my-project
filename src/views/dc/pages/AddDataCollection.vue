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
          </div>
          <dsn-table
            ref="pTable"
            :data="this.MeasureInfoList"
            tooltip-effect="dark"
            row-key="dcGroup"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="parameter" label="参数名称" sortable></el-table-column>
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
          <div class="operate">
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
            <el-table-column label="条件明细" width="200">
              <template
                slot-scope="scope"
              >{{ scope.row.mat+','+scope.row.matGroup+','+scope.row.shopOrder+','+scope.row.workCenter+','+scope.row.resourceGroup+','+scope.row.shopOrder }}</template>
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
            <el-form-item label="参数名称:" prop="parameter" required>
              <dsn-input
                v-model="addParamForm.parameter"
                :disabled="this.currentOperation == 'edit'"
              ></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType != 30">
            <el-form-item label="标准值:" prop="targetValue" required>
              <dsn-input v-model="addParamForm.targetValue"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType == 30">
            <el-form-item label="标准值:" prop="targetValue" required>
              <!-- <dsn-select v-model="addParamForm.targetValue">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.valueType"
                  :value="item.value"
                ></el-option>
              </dsn-select>-->
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple"></div>
                </el-col>
              </el-row>
            </el-form-item>
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
            <el-form-item label="参数状态:" prop="parameterStatus" required>
              <dsn-select v-model="addParamForm.parameterStatus">
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
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="值类型:" prop="valueType" required>
              <dsn-select v-model="addParamForm.valueType" @change="onChange">
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
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="必须值:" prop="required" required>
              <dsn-select v-model="addParamForm.required">
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
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="软检查:" prop="softCheck" required>
              <dsn-select v-model="addParamForm.softCheck">
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
              <dsn-select v-model="addParamForm.alarm">
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
            <el-form-item label="物料组:" prop="matGroup">
              <dsn-input v-model="addSetUpForm.matGroup"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工序:" prop="operation">
              <dsn-input v-model="addSetUpForm.operation"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料号:" prop="mat">
              <dsn-input v-model="addSetUpForm.mat"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作中心:" prop="workCenter">
              <dsn-input v-model="addSetUpForm.workCenter"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工单:" prop="shopOrder">
              <dsn-input v-model="addSetUpForm.shopOrder"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型:" prop="resourceGroup">
              <dsn-input v-model="addSetUpForm.resourceGroup"></dsn-input>
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
export default {
  name: "add-data-collection",
  data() {
    var targetValueRequired = (rule, value, callback) => {
      if (this.addParamForm.valueType == 10) {
        var reg = /^[0-9]*$/;
        if (!reg.test(value)) {
          return callback(new Error("只能输入数字"));
        }
      } else {
        if (!value) {
          return callback(new Error("请填写标准值"));
        }
      }
      callback();
    };
    var numberRequired = (rule, value, callback) => {
      var reg = /^((\d{1,5}\.\d{0,3})||(\d{1,5}))$/g;
      if (!reg.test(value) && !!value) {
        return callback(new Error("只能输入整数5位以内，小数3位以内"));
      }
      callback();
    };
    return {
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
      prules: {
        parameter: [
          { required: true, message: "请填写参数名称", trigger: "blur" }
        ],
        targetValue: [{ validator: targetValueRequired, trigger: "blur" }],
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
        ],
        upperSpecLimit: [
          { required: false, validator: numberRequired, trigger: "blur" }
        ],
        lowerSpecLimit: [
          { required: false, validator: numberRequired, trigger: "blur" }
        ],
        upperWarnLimit: [
          { required: false, validator: numberRequired, trigger: "blur" }
        ],
        lowerWarnLimit: [
          { required: false, validator: numberRequired, trigger: "blur" }
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
        tenantSiteCode: "test"
      },
      addSetUpForm: {
        matGroup: "",
        operation: "",
        mat: "",
        workCenter: "",
        shopOrder: "",
        resourceGroup: "",
        dcGroup: "",
        tenantSiteCode: "test"
      },
      collectionType: [
        {
          value: "10",
          label: "物料"
        },
        {
          value: "20",
          label: "资源"
        },
        {
          value: "30",
          label: "工序"
        },
        {
          value: "40",
          label: "工单"
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
      currentOperation: ""
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
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.addForm;
          params.tenantSiteCode = "test";
          params.type = "add";
          params.dcParameterMeasureInfoList = this.MeasureInfoList;
          params.dcSetupInfoList = this.SetupInfoList;
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
          console.log("error submit!!");
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
        } else {
          console.log("error submit!!");
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
    }
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
