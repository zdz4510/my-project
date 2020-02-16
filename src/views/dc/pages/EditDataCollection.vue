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
            <el-table-column prop="valueType" label="值类型"></el-table-column>
            <el-table-column prop="targetValue" label="标准值"></el-table-column>
            <el-table-column prop="upperSpecLimit" label="标准值上限"></el-table-column>
            <el-table-column prop="lowerSpecLimit" label="标准值下限"></el-table-column>
            <el-table-column prop="upperWarnLimit" label="警告发生上限" width="100"></el-table-column>
            <el-table-column prop="lowerWarnLimit" label="警告发生下限" width="100"></el-table-column>
            <el-table-column label="参数状态">
              <template slot-scope="scope">{{ scope.row.parameterStatus ? '启用' : '不启用' }}</template>
            </el-table-column>
            <el-table-column prop="alarm" label="预警事件"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
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
            <el-form-item label="参数名称:" prop="parameter" required>
              <dsn-input
                v-model="addParamForm.parameter"
                :disabled="this.currentOperation == 'edit'"
              ></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType != '布尔'">
            <el-form-item label="标准值:" prop="targetValue" required>
              <dsn-input v-model="addParamForm.targetValue"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addParamForm.valueType == '布尔'">
            <el-form-item label="标准值:" prop="targetValue" required>
              <dsn-select v-model="addParamForm.targetValue">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.valueType"
                  :value="item.value"
                ></el-option>
              </dsn-select>
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
                  :label="item.value"
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
import { mapGetters, mapMutations } from "vuex";
import {
  saveDataCollection,
  getAlarmList,
  getMeasureList,
  getSetupList
} from "../../../api/data.collection.api";
export default {
  name: "edit-data-collection",
  computed: {
    ...mapGetters(["dataCollectionEditList"])
  },
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
      var reg = /^[0-9]*$/;
      if (!reg.test(value) && !!value) {
        return callback(new Error("只能输入数字"));
      }
      callback();
    };
    return {
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
        upperSpecLimit: [{ validator: numberRequired, trigger: "blur" }],
        lowerSpecLimit: [{ validator: numberRequired, trigger: "blur" }],
        upperWarnLimit: [{ validator: numberRequired, trigger: "blur" }],
        lowerWarnLimit: [{ validator: numberRequired, trigger: "blur" }]
      },
      srules: {},
      MeasureInfoList: [],
      SetupInfoList: [],
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
      currentOperation: "",
      selectIsDisabled: false,
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: ""
    };
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
    //保存操作
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const tempDcSetupInfoList = this.SetupInfoList;
          tempDcSetupInfoList.forEach(element => {
            element.material = element.mat;
            element.materialGroup = element.matGroup;
          });
          let params = this.editForm;
          params.tenantSiteCode = "test";
          params.type = "edit";
          params.dcParameterMeasureInfoList = this.MeasureInfoList;
          params.dcSetupInfoList = tempDcSetupInfoList;
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
    },
    getListData(params) {
      getMeasureList(params).then(data => {
        this.MeasureInfoList = data.data.data;
      });
      getSetupList(params).then(data => {
        this.SetupInfoList = data.data.data;
      });
    },
    resetForm() {
      this.editForm = JSON.parse(
        JSON.stringify(this.cloneDataCollectionEditList[0])
      );
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