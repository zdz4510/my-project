<template>
  <div class="customize">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <div class="operation">
        <dsn-button size="small" type="primary" @click.native="search">查询</dsn-button>
        <dsn-button size="small" type="primary" @click.native="add('addForm')">保存</dsn-button>
        <dsn-button size="small" type="primary" @click.native="resetForm('addForm')">重置</dsn-button>
      </div>
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
          <el-col :span="12">
            <!-- <el-form-item label="自定义项目:" prop="FIELD_01" required>
              <dsn-input v-model="addForm.FIELD_01"></dsn-input>
            </el-form-item>-->
            <el-form-item label="自定义项目：" prop="FIELD_01" required class="FIELD_01">
              <dsn-input style="width: 90%" v-model="addForm.FIELD_01"></dsn-input>
              <i class="el-icon-document" @click="selectCustomize"></i>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象表：" prop="FIELD_02" class="FIELD_02">
              <dsn-input v-model="addForm.FIELD_02" :readonly="true"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述：" prop="FIELD_03">
              <dsn-input v-model="addForm.FIELD_03" :readonly="true"></dsn-input>
            </el-form-item>
            <el-form-item label prop="FIELD_04">
              <dsn-input v-model="addForm.FIELD_04" :readonly="true"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="addForm">
       
        <el-row>
          <el-col :span="24">
            <div class>
              <div class="operate">
                <dsn-button icon="el-icon-folder-add" size="small" type="success" @click.native="addSet">新增</dsn-button>
                <dsn-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  @click.native="editSet"
                  :disabled="this.sCheckedList.length != 1"
                >编辑</dsn-button>
                <dsn-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  @click.native="delSet"
                  :disabled="this.sCheckedList.length === 0"
                >删除</dsn-button>
              </div>
              <dsn-table
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
              </dsn-table>
            </div>
          </el-col>
        </el-row>
        
      </div>
    </DsnPanel>
    
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
          <el-col :span="18">
            <el-form-item label="字段名:" prop="fieldName" required>
              <dsn-input v-model="addSetForm.fieldName"></dsn-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
						<el-form-item label="序号:" prop="sequence" required>
							<dsn-input v-model="addSetForm.sequence"></dsn-input>
						</el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="标签:" prop="fieldLabel" required>
              <dsn-input v-model="addSetForm.fieldLabel"></dsn-input>
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
              <dsn-input v-model="addSetForm.fieldSize"></dsn-input>
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
        <dsn-button @click.native="dialogVisible = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="saveSetUp('addSetForm')">确 定</dsn-button>
      </span>
    </el-dialog>
    <el-dialog
      title="自定义项目"
      :visible.sync="defineProgramDialog"
      width="50%"
      :before-close="handleCloseDefineProgramDialog"
    >
      <span>
        <defineProgramModel
          :customizedItems="customItems"
          @selectDefineProgram="selectDefineProgram"
        ></defineProgramModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="defineProgramDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="confireSelectDefineProgram">确 定</dsn-button>
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
  findGeneralCodeDataByCustomItemHttp
  // getNames
} from "../../../api/customize.api.js";
import defineProgramModel from "../components/define-program-model.vue";

export default {
  name: "add-data-collection",
  components: {
    defineProgramModel
  },
  data() {
    return {
      formLabelWidth: "130px",
      activeName: "first",
      paramsDialogVisible: false,
      dialogVisible: false,
      rules: {
        
        FIELD_01: [
          { required: true, message: "请填写自定义项目名称", trigger: "blur" }
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
        FIELD_01: "",
        FIELD_02: "",
        FIELD_03: "",
        FIELD_04: "",
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
      customItems: [],
      defineProgramDialog: false,
      currentDefineProgram: {}
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
    // let p3 = {
    //   generalCode: "CUSTOMIZED_FIELD"
    // };
    // getNames(p3).then(data => {
    //   if (data.data.code == 200) {
    //     this.FIELD_01 = data.data.data.definedData;
    //   } else {
    //     this.$message.error(data.data.message);
    //   }
    // });
  },
  methods: {
    search() {
      let params = {};
      params.FIELD_01 = this.addForm.FIELD_01;
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
      this.SetupInfoList = [];
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
          const data = {
            customizedFieldDefInfoList: this.SetupInfoList,
            customizedItem: this.addForm.FIELD_01,
            tenantSiteCode: "test",
            type: "add"
          };
          if (this.SetupInfoList.length > 0) {
            saveData(data).then(data => {
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
    },
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
    //选择自定义项目
    selectCustomize() {
      let p3 = {
        generalCode: "CUSTOMIZED_FIELD",
        FIELD_01: this.addForm.FIELD_01
      };
      findGeneralCodeDataByCustomItemHttp(p3).then(data => {
        if (data.data.code == 200) {
          this.customItems = data.data.data;
          this.defineProgramDialog = true;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    //关闭自定义项目弹框
    handleCloseDefineProgramDialog() {
      this.defineProgramDialog = false;
    },
    //弹框选择自定义项目
    selectDefineProgram(val) {
      this.currentDefineProgram = val;
    },
    //弹框确认选择自定义项目
    confireSelectDefineProgram() {
      this.defineProgramDialog = false;
      this.addForm = this.currentDefineProgram;
    }
  }
};
</script>

<style lang="scss">
/* .customize {
 
  .operate {
    background: #ffffff;
    padding: 10px;
  }
  .addForm {
    background: #ffffff;
    padding: 10px;
    .el-form {
      .FIELD_01 {
        .dsn-input {
          width: 90%;
        }
      }
      .FIELD_02 {
        margin-right: 0px;
      }
    }
  }
} */
</style>
