<template>
  <div class="customize">
    <div class="operate">
      <el-button size="small" type="primary" @click="search">查询</el-button>
      <el-button size="small" type="primary" @click="add('addForm')">保存</el-button>
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
            <!-- <el-form-item label="自定义项目:" prop="customizedItem" required>
							<el-input v-model="addForm.customizedItem"></el-input>
            </el-form-item>-->
            <el-form-item label="自定义项目:" prop="customizedItem" required>
              <el-select v-model="addForm.customizedItem" filterable placeholder="请选择">
                <el-option
                  v-for="item in customizedItem"
                  :key="item.FIELD_01"
                  :label="item.FIELD_01"
                  :value="item.FIELD_01"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象表" prop="dcGroup">
              <el-input v-model="addForm.dcGroup" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述:" prop="dcGroup">
              <el-input v-model="addForm.dcGroup" disabled></el-input>
            </el-form-item>
            <el-form-item label prop>
              <el-input v-model="addForm.dcGroup" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class>
              <div class="operate">
                <el-button size="small" type="primary" @click="addSet">新增</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="editSet"
                  :disabled="this.sCheckedList.length != 1"
                >编辑</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="delSet"
                  :disabled="this.sCheckedList.length === 0"
                >删除</el-button>
              </div>
              <el-table
                ref="sTable"
                :data="this.SetupInfoList"
                tooltip-effect="dark"
                row-key="fieldName"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                <!-- <el-table-column type="index" label="序号"></el-table-column> -->
                <el-table-column prop="sequence" label="序号"></el-table-column>
                <el-table-column prop="fieldName" label="字段名"></el-table-column>
                <el-table-column prop="fieldLabel" label="标签"></el-table-column>
                <el-table-column prop="fieldType" label="格式"></el-table-column>
                <el-table-column prop="fieldSize" label="长度"></el-table-column>
                <el-table-column prop="limitGeneralCode" label="代码名"></el-table-column>
                <el-table-column prop="limitGeneralField" label="字段"></el-table-column>
                <el-table-column label="是否必须">
                  <template slot-scope="scope">{{ scope.row.required ? '是' : '否' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog title="添加/编辑" :visible.sync="dialogVisible">
      <el-form
        :inline="true"
        :model="addSetForm"
        ref="addSetForm"
        :rules="srules"
        class="form-style"
        label-position="right"
        :label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="字段名:" prop="fieldName" required>
              <el-input v-model="addSetForm.fieldName"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
						<el-form-item label="序号:" prop="sequence" required>
							<el-input v-model="addSetForm.sequence"></el-input>
						</el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标签:" prop="fieldLabel" required>
              <el-input v-model="addSetForm.fieldLabel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="格式:" prop="fieldType">
              <el-select v-model="addSetForm.fieldType">
                <el-option
                  v-for="item in fieldType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addSetForm.fieldType != 'C'">
          <el-col :span="24">
            <el-form-item label="长度:" prop="fieldSize" required>
              <el-input v-model="addSetForm.fieldSize"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addSetForm.fieldType == 'C'">
          <el-col :span="12">
            <el-form-item label="代码名:" prop="limitGeneralCode" required>
              <el-select v-model="addSetForm.limitGeneralCode">
                <el-option
                  v-for="item in code"
                  :key="item.generalCode"
                  :label="item.generalCode"
                  :value="item.generalCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段:" prop="limitGeneralField" required>
              <el-select v-model="addSetForm.limitGeneralField">
                <el-option
                  v-for="item in field"
                  :key="item.fieldName"
                  :label="item.fieldName"
                  :value="item.fieldName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否必须:" prop="required">
              <el-checkbox v-model="addSetForm.required"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSetUp('addSetForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  saveData,
  getCustomizeInfo,
  getField,
  getCode,
  getNames
} from "../../../api/customize.api.js";
export default {
  name: "add-data-collection",
  data() {
    return {
      formLabelWidth: "130px",
      activeName: "first",
      paramsDialogVisible: false,
      dialogVisible: false,
      rules: {
        customizedItem: [
          { required: true, message: "请填写自定义项目名称", trigger: "change" }
        ]
      },
      srules: {
        fieldName: [
          { required: true, message: "请填写字段名", trigger: "blur" }
        ],
        sequence: [{ required: true, message: "请填写序号", trigger: "blur" }],
        fieldLabel: [
          { required: true, message: "请填写标签", trigger: "blur" }
        ],
        fieldType: [
          { required: true, message: "请选择格式", trigger: "change" }
        ],
        fieldSize: [{ required: true, message: "请填写长度", trigger: "blur" }],
        limitGeneralCode: [
          { required: true, message: "请填写代码名", trigger: "blur" }
        ],
        limitGeneralField: [
          { required: true, message: "请填写字段", trigger: "blur" }
        ]
      },
      SetupInfoList: [],
      addForm: {
        customizedItem: "",
        customizedFieldDefInfoList: [],
        tenantSiteCode: "test",
        type: ""
      },
      addSetForm: {
        fieldName: "",
        sequence: "",
        fieldLabel: "",
        fieldType: "",
        fieldSize: "",
        limitGeneralCode: "",
        limitGeneralField: "",
        required: false
      },
      fieldType: [
        {
          value: "S",
          label: "文本"
        },
        {
          value: "N",
          label: "数值"
        },
        {
          value: "C",
          label: "引用"
        }
      ],
      alarmList: [],
      sCheckedList: [],
      currentOperation: "",
      code: [],
      field: [],
      customizedItem: []
    };
  },
  created() {
    let p1 = {
      fieldName: "",
      generalCode: "CUSTOMIZED_FIELD"
    };
    let p2 = {
      generalCode: "",
      generalCodeGroup: "S"
    };
    getField(p1).then(data => {
      if (data.data.code == 200) {
        this.field = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
    getCode(p2).then(data => {
      if (data.data.code == 200) {
        this.code = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
    let p3 = {
      generalCode: "CUSTOMIZED_FIELD"
    };
    getNames(p3).then(data => {
      if (data.data.code == 200) {
        this.customizedItem = data.data.data.definedData;
      } else {
        this.$message.error(data.data.message);
      }
    });
  },
  methods: {
    search() {
      let params = {};
      params.customizedItem = this.addForm.customizedItem;
      params.tenantSiteCode = "test";
      getCustomizeInfo(params).then(data => {
        if (data.data.code == 200) {
          this.SetupInfoList = data.data.data.customizedFieldDefInfoList;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.addForm;
          params.tenantSiteCode = "test";
          params.type = "add";
          params.dcSetupInfoList = this.SetupInfoList;
          saveData(params).then(data => {
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              setTimeout(() => {
                this.$router.push({ path: "/dc/dataCollection" });
              }, 1000);
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
    saveSetUp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.addSetForm.dcGroup = this.addForm.dcGroup
          let form = JSON.parse(JSON.stringify(this.addSetForm));
          if (this.currentOperation == "add") {
            if (
              this.SetupInfoList.findIndex(
                item =>
                  JSON.parse(JSON.stringify(item.fieldName)) ==
                  JSON.parse(JSON.stringify(form.fieldName))
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
          this.SetupInfoList.map((item, index) => {
            item.sequence = index + 1;
          });
          console.log(this.SetupInfoList);
          this.$refs.sTable.clearSelection();
          this.$refs[formName].resetFields();
          this.dialogVisible = false;
          this.addSetForm.required = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      this.sCheckedList = val;
    },
    handleSelectionChange2(val) {
      this.sCheckedList = val;
      console.log(val, "va");
    },
    onChange() {
      this.addSetForm.targetValue = "";
    },
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.addForm;
          params.type = "add";
          params.customizedFieldDefInfoList = this.SetupInfoList;
          if (this.SetupInfoList.length > 0) {
            saveData(params).then(data => {
              if (data.data.code == 200) {
                this.$message.success("保存成功");
                this.resetForm("addForm");
                this.SetupInfoList = [];
              } else {
                this.$message.error(data.data.message);
              }
            });
          } else {
            this.$message.error("自定义字段数据为空，请先添加数据");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    edit() {},
    addSet() {
      this.dialogVisible = true;
      this.currentOperation = "add";
    },
    editSet() {
      this.dialogVisible = true;
      this.currentOperation = "edit";
      console.log(this.sCheckedList, "pc");
      this.addSetForm = JSON.parse(JSON.stringify(this.sCheckedList[0]));
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
                item => item.parameter === val.parameter
              ),
              1
            );
          });
          this.$refs.sTable.clearSelection();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
    // delSet(){
    //   this.$confirm('是否删除所选数据?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.sCheckedList.map((val=>{
    //       this.SetupInfoList.splice(this.SetupInfoList.findIndex(item=>JSON.parse(JSON.stringify(item)) == JSON.parse(JSON.stringify(val))), 1)
    //     }))
    //     this.$refs.pTable.clearSelection()
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
  }
};
</script>

<style lang="scss">
.customize {
  .operate {
    background: #ffffff;
    padding: 10px;
  }
  .addForm {
    background: #ffffff;
    padding: 10px;
  }
}
</style>
