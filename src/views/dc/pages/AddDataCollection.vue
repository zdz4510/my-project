<template>
  <div class="add-data-collection">
    <div class="operate">
      <el-button size="small" type="primary" @click="goBack">返回</el-button>
      <el-button size="small" type="primary" @click="save('addForm')">保存</el-button>
      <el-button size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
    </div>
    <div class="addForm">
      <el-form
        :inline="true"
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="form-style"
        label-position="right"
        :label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="数据收集组名称" prop="dcGroup" required>
              <el-input v-model="addForm.dcGroup"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据收集组类型:" prop="collectionType" required>
              <el-select v-model="addForm.collectionType">
                <el-option
                  v-for="item in collectionType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据收集组描述:" prop="dcGroupDes">
              <el-input
                class="dec"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6}"
                v-model="addForm.dcGroupDes"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="参数配置" name="first">
                <div class>
                  <div class="operate ml30 mtb10">
                    <el-button class="mr25 pad1025" size="small" type="primary" @click="add">新增</el-button>
                    <el-button
                      class="mr25 pad1025"
                      size="small"
                      type="primary"
                      @click="edit"
                      :disabled="this.pCheckedList.length != 1"
                    >编辑</el-button>
                    <el-button
                      class="mr25 pad1025"
                      size="small"
                      type="warning"
                      @click="del"
                      :disabled="this.pCheckedList.length === 0"
                    >删除</el-button>
                  </div>
                  <el-table
                    ref="pTable"
                    :data="this.MeasureInfoList"
                    tooltip-effect="dark"
                    row-key="dcGroup"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="parameter" label="参数名称"></el-table-column>
                    <el-table-column label="软检查">
                      <template slot-scope="scope">{{ scope.row.softCheck ? '启用' : '不启用' }}</template>
                    </el-table-column>
                    <el-table-column prop="valueType" label="值类型"></el-table-column>
                    <el-table-column prop="targetValue" label="标准值"></el-table-column>
                    <el-table-column prop="upperSpecLimit" label="标准值上限"></el-table-column>
                    <el-table-column prop="lowerSpecLimit" label="标准值下限"></el-table-column>
                    <el-table-column prop="upperWarnLimit" label="警告发生上限"></el-table-column>
                    <el-table-column prop="lowerWarnLimit" label="警告发生下限"></el-table-column>
                    <el-table-column label="参数状态">
                      <template slot-scope="scope">{{ scope.row.parameterStatus ? '启用' : '不启用' }}</template>
                    </el-table-column>
                    <el-table-column prop="alarm" label="预警事件"></el-table-column>
                    <el-table-column prop="createTime" label="创建人"></el-table-column>
                    <el-table-column prop="createUserId" label="创建时间"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="数据收集配置" name="second">
                <div class="operate ml30 mtb10">
                  <el-button class="mr25 pad1025" size="small" type="primary" @click="addSet">新增</el-button>
                  <el-button
                    class="mr25 pad1025"
                    size="small"
                    type="primary"
                    @click="editSet"
                    :disabled="this.sCheckedList.length != 1"
                  >编辑</el-button>
                  <el-button
                    class="mr25 pad1025"
                    size="small"
                    type="warning"
                    @click="delSet"
                    :disabled="this.sCheckedList.length === 0"
                  >删除</el-button>
                </div>
                <el-table
                  ref="sTable"
                  :data="this.SetupInfoList"
                  tooltip-effect="dark"
                  row-key="dcGroup"
                  @selection-change="handleSelectionChange2"
                >
                  <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                  <el-table-column type="index" label="序号"></el-table-column>
                  <el-table-column label="条件明细">
                    <template
                      slot-scope="scope"
                    >{{ scope.row.mat+','+scope.row.matGroup+','+scope.row.shopOrder+','+scope.row.workCenter+','+scope.row.resourceGroup+','+scope.row.shopOrder }}</template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog title="参数配置" :visible.sync="paramsDialogVisible">
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
              <el-input
                v-model="addParamForm.parameter"
                :disabled="this.currentOperation == 'edit'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType != '布尔'">
            <el-form-item label="标准值:" prop="targetValue" required>
              <el-input v-model="addParamForm.targetValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType == '布尔'">
            <el-form-item label="标准值:" prop="targetValue" required>
              <el-select v-model="addParamForm.targetValue">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.valueType"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数描述:" prop="parameterDes">
              <el-input v-model="addParamForm.parameterDes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准值上限:" prop="upperSpecLimit">
              <el-input
                v-model="addParamForm.upperSpecLimit"
                :disabled="addParamForm.valueType != '数值'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数状态:" prop="parameterStatus" required>
              <el-select v-model="addParamForm.parameterStatus">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准值下限:" prop="lowerSpecLimit">
              <el-input
                v-model="addParamForm.lowerSpecLimit"
                :disabled="addParamForm.valueType != '数值'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="值类型:" prop="valueType" required>
              <el-select v-model="addParamForm.valueType" @change="onChange">
                <el-option
                  v-for="item in valueType"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警发生上限值:" prop="upperWarnLimit">
              <el-input
                v-model="addParamForm.upperWarnLimit"
                :disabled="addParamForm.valueType != '数值'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="必须值:" prop="required" required>
              <el-select v-model="addParamForm.required">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.bool"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警发生下限值:" prop="lowerWarnLimit">
              <el-input
                v-model="addParamForm.lowerWarnLimit"
                :disabled="addParamForm.valueType != '数值'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="软检查:" prop="softCheck" required>
              <el-select v-model="addParamForm.softCheck">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警事件编号:" prop="alarm">
              <el-select v-model="addParamForm.alarm">
                <el-option
                  v-for="item in alarmList"
                  :key="item.alarm"
                  :label="item.alarm"
                  :value="item.alarm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paramsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveParams('addParamForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="数据收集配置" :visible.sync="setUpDialogVisible">
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
              <el-input v-model="addSetUpForm.matGroup"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工序:" prop="operation">
              <el-input v-model="addSetUpForm.operation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料号:" prop="mat">
              <el-input v-model="addSetUpForm.mat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作中心:" prop="workCenter">
              <el-input v-model="addSetUpForm.workCenter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工单:" prop="shopOrder">
              <el-input v-model="addSetUpForm.shopOrder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型:" prop="resourceGroup">
              <el-input v-model="addSetUpForm.resourceGroup"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setUpDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSetUp('addSetUpForm')">确 定</el-button>
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
      if (this.addParamForm.valueType == "数值") {
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
      var reg = /^[0-9]*$/;
      if (!reg.test(value) && !!value) {
        return callback(new Error("只能输入数字"));
      }
      callback();
    };
    return {
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
          value: "数值"
        },
        {
          value: "文本"
        },
        {
          value: "布尔"
        }
      ],
      alarmList: [],
      pCheckedList: [],
      sCheckedList: [],
      currentOperation: ""
    };
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
    background: #ffffff;
    padding: 10px;
  }
  .addForm {
    background: #ffffff;
    padding: 10px;
    .dec {
      width: 200px !important;
    }
  }
}
</style>
