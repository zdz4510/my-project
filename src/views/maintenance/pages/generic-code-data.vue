<template>
  <div class="genericCodeData">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <el-form
        :inline="true"
        :model="genericCodeDataForm"
        :rules="genericCodeDataRules"
        ref="genericCodeDataForm"
        label-width="80px"
      >
        <el-form-item label="代码类型" prop="generalCodeGroup">
          <dsn-select
            v-model.trim="genericCodeDataForm.generalCodeGroup"
            filterable
            placeholder="请选择代码类型"
          >
            <el-option label="系统" value="S">系统</el-option>
            <el-option label="用户" value="I">用户</el-option>
          </dsn-select>
        </el-form-item>
        <el-form-item label="代码名" prop="generalCode">
          <el-row>
            <el-col :span="22">
              <dsn-input
                v-model.trim="genericCodeDataForm.generalCode"
                placeholder="请输入代码名"
                class="generalCode"
              ></dsn-input>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-document" @click="handleQueryGeneralCode"></i>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述">
          <dsn-input v-model.trim="genericCodeDataForm.generalCodeDes" :readonly="true"></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click.native="handleQuery('genericCodeDataForm')"
          >查询</dsn-button>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-refresh"
            @click.native="handleReset"
          >重置</dsn-button>
        </el-form-item>
      </el-form>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <dsn-button
          size="small"
          type="success"
          icon="el-icon-folder-add"
          @click.native="handleAddInit"
          :disabled="!editable"
        >新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          :disabled="selectionList.length !== 1 || !editable"
          @click.native="handleEdit"
        >修改</dsn-button>
        <dsn-button size="small" type="primary" :disabled="!editable" @click.native="handleSave">保存</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          :disabled="!editable"
          @click.native="deleteCodeDialog = true"
        >删除通用代码</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          :disabled="selectionList.length <= 0 || !editable"
          @click.native="deleteDataDialog = true"
        >删除数据</dsn-button>
      </div>
      <dsn-table
        v-show="showTable"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          v-for="(field, index) in usedFieldNames"
          :key="index"
          :prop="field"
          :label="field"
        ></el-table-column>
      </dsn-table>
    </DsnPanel>
    <el-dialog title="新增/修改" :visible.sync="addDialog" :width="dialogWidth" @close="closeAddDialog">
      <span>
        <el-form ref="addForm" :model="addForm" label-width="90px" :rules="addFormRules">
          <el-form-item
            v-for="(field, index) in usedFieldNames"
            :key="index"
            :label="field"
            :prop="field"
          >
            <dsn-input v-model.trim="addForm[`${field}`]" placeholder="请输入字段数据"></dsn-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="resetAddForm">重 置</dsn-button>
        <dsn-button type="primary" @click.native="checkAddForm('addForm')">确 定</dsn-button>
      </span>
    </el-dialog>
    <el-dialog title="代码名" :visible.sync="generalCodeDialog" :width="dialogWidth">
      <span>
        <dsn-table
          ref="multipleTable"
          :data="generalCodeData"
          highlight-current-row
          style="width: 100%"
          height="200px"
          @current-change="handleCurrentChange"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="generalCode" label="代码名" width="155"></el-table-column>
          <el-table-column prop="generalCodeDes" label="代码名描述" show-overflow-tooltip></el-table-column>
        </dsn-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="generalCodeDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleSelectionGeneralCode">确 定</dsn-button>
      </span>
    </el-dialog>
    <el-dialog title="字段名" :visible.sync="fieldDialog" :width="dialogWidth">
      <span>
        <dsn-table
          ref="multipleTable"
          :data="fieldData"
          highlight-current-row
          style="width: 100%"
          height="200px"
          @current-change="handleCurrentFieldChange"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="fieldName" label="字段名" width="155"></el-table-column>
          <el-table-column prop="fieldLabel" label="标签" show-overflow-tooltip></el-table-column>
        </dsn-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="fieldDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleSelectionField">确 定</dsn-button>
      </span>
    </el-dialog>
    <el-dialog title="通用代码删除" :visible.sync="deleteCodeDialog" :width="dialogWidth">
      <span>是否确认{{ genericCodeDataForm.genericCode }}代码名？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="deleteCodeDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleCodeDataDelete">确 定</dsn-button>
      </span>
    </el-dialog>
    <el-dialog title="数据删除" :visible.sync="deleteDataDialog" :width="dialogWidth">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="deleteDataDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleFieldDelete">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findRecordHttp } from "@/api/maintenance/code.definition.api.js";
import {
  findGeneralCodeHttp,
  saveGeneralCodeDataHttp,
  deleteGeneralCodeDataHttp
} from "@/api/maintenance/code.data.api.js";
import { mapMutations } from "vuex";
export default {
  data() {
    //代码描述验证规则
    const valiGeneralCodeDes = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5\w]{1,50}$/;
      if (!reg.test(value)) {
        callback("描述字数超出50字");
      }
      callback();
    };
    //代码名验证规则
    const valiGeneralCode = (rule, value, callback) => {
      if (value === "") {
        callback("代码名不能为空");
      }
      //
      let reg = /^([A-Z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("代码名格式应只包含（[A-Z,0-9,_,-,/]）");
      }
      callback();
    };
    return {
      //已使用的字段名
      usedFieldNames: [],
      //查询表单
      genericCodeDataForm: {
        //代码类型·
        generalCodeGroup: "S",
        //代码名
        generalCode: "",
        //代码描述
        generalCodeDes: ""
      },
      genericCodeDataRules: {
        generalCodeGroup: [
          { required: true, message: "请选择代码类型", trigger: "change" }
        ],
        generalCode: [
          { required: true, message: "请输入代码名", trigger: "change" },
          { validator: valiGeneralCode, trigger: "change" }
        ],
        generalCodeDes: [{ validator: valiGeneralCodeDes, trigger: "change" }]
      },
      addForm: {},
      addFormRules: {},
      addDialog: false,
      tableData: [],
      //表格复选框数据
      selectionList: [],
      //数据删除
      deleteDataDialog: false,
      //代码名弹出框
      generalCodeDialog: false,
      //弹出框代码名数据
      generalCodeData: [],
      //是否可编辑字段
      editable: false,
      //判断获取字段名的标志
      flag: true,
      //字段名弹出框
      fieldDialog: false,
      //代码名当前选中行
      currentGeneralCode: {},
      //字段名当前行
      currentField: {},
      //弹出框字段名
      fieldData: [],
      //通用代码删除
      deleteCodeDialog: false,
      //操作类型
      operateType: "",
      //是否显示表格
      showTable: false,
      //弹框宽度
      dialogWidth: "400px",
      //修改时保存初始数据
      cloneEditForm: {}
    };
  },
  computed: {},
  filters: {
    filterFieldType(value) {
      if (value === "A") {
        return "文本";
      }
      if (value === "N") {
        return "数字";
      }
      if (value === "C") {
        return "引用";
      }
    }
  },
  created() {},
  methods: {
    ...mapMutations(["STANDINGLIST"]),
    //初始化数据
    init() {
      const data = {
        generalCode: this.genericCodeDataForm.generalCode
      };
      findGeneralCodeHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data.definedData;
          this.showTable = true;
          this.genericCodeDataForm.generalCodeDes = res.data.generalCodeDes;
          //获取出所有已使用的字段名
          res.data.fields.forEach(element => {
            this.usedFieldNames.push(element.fieldName);
          });
          this.editable = res.data.editable;
          //给对象添加属性
          this.usedFieldNames.forEach(element => {
            this.$set(this.addForm, element, "");
          });
          this.setAddFormRules();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //动态设置弹出框验证规则
    setAddFormRules() {
      this.usedFieldNames.forEach(element => {
        this.$set(this.addFormRules, element, [
          { required: true, message: "请输入字段数据", trigger: "blur" }
        ]);
      });
    },
    //根据代码类型查询代码名
    handleQueryGeneralCode() {
      this.flag = true;
      this.usedFieldNames = [];
      const data = {
        generalCode: this.genericCodeDataForm.generalCode,
        generalCodeGroup: this.genericCodeDataForm.generalCodeGroup
      };
      findRecordHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.generalCodeData = res.data;
          if (!this.flag) {
            this.generalCodeData = this.generalCodeData.filter(item => {
              return item.generalCode !== this.genericCodeDataForm.generalCode;
            });
          }
          this.generalCodeDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //表格选择
    handleSelectionChange(selection) {
      this.selectionList = selection;
    },
    //代码名弹出框选择
    handleCurrentChange(val) {
      this.currentGeneralCode = val;
    },
    handleCurrentFieldChange(val) {
      this.currentField = val;
    },
    //代码名弹出框确认选择
    handleSelectionGeneralCode() {
      if (this.flag) {
        this.genericCodeDataForm.generalCode = this.currentGeneralCode.generalCode;
      } else {
        this.addForm.limitGeneralCode = this.currentGeneralCode.generalCode;
      }
      this.generalCodeDialog = false;
    },
    //字段名弹出框确认选择
    handleSelectionField() {
      this.fieldDialog = false;
      this.addForm.limitGeneralField = this.currentField.fieldName;
    },
    //查询
    handleQuery(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.init();
        } else {
          return false;
        }
      });
    },
    //新增字段时初始数据
    handleAddInit() {
      this.operateType = "add";
      this.addDialog = true;
      this.handleResetAddDialog();
    },
    //关闭弹框
    closeAddDialog() {
      // this.handleResetAddDialog();
      this.addDialog = false;
    },
    //重置新增或修改表单
    resetAddForm() {
      if (this.operateType === "add") {
        this.handleResetAddDialog();
        return;
      }
      if (this.operateType === "edit") {
        this.addForm = JSON.parse(JSON.stringify(this.cloneEditForm));
        return;
      }
    },
    //重置弹出框
    handleResetAddDialog() {
      for (const key in this.addForm) {
        if (this.addForm.hasOwnProperty(key)) {
          this.addForm[key] = "";
        }
      }
    },
    //重置查询
    handleReset() {
      this.genericCodeDataForm.generalCode = "";
      this.genericCodeDataForm.generalCodeGroup = "S";
      this.genericCodeDataForm.generalCodeDes = "";
      this.usedFieldNames = [];
      this.tableData = [];
      this.addForm = {};
      this.addFormRules = {};
      this.editable = false;
      this.showTable = false;
    },
    checkAddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleAdd();
        } else {
          return false;
        }
      });
    },
    //新增修改弹出框确认
    handleAdd() {
      this.addDialog = false;
      //过滤掉编辑确认前表格的原数据
      if (this.operateType === "edit") {
        //过滤修改之前的数据
        this.tableData = this.tableData.filter(item => {
          return JSON.stringify(item) !== JSON.stringify(this.cloneEditForm);
        });
      }
      this.tableData.push(this.addForm);
    },
    //编辑
    handleEdit() {
      this.operateType = "edit";
      this.addDialog = true;
      this.addForm = JSON.parse(JSON.stringify(this.selectionList[0]));
      this.cloneEditForm = JSON.parse(JSON.stringify(this.selectionList[0]));
    },
    //保存
    handleSave() {
      const tempArr = [];
      this.tableData.forEach(element => {
        const tempObj = {};
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            const temp = key.toLowerCase().replace("_", "");
            tempObj[temp] = element[key];
          }
        }
        tempArr.push(tempObj);
      });
      const data = {
        definedData: tempArr,
        generalCode: this.genericCodeDataForm.generalCode,
        generalCodeGroup: this.genericCodeDataForm.generalCodeGroup
      };
      saveGeneralCodeDataHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "保存成功",
            type: "warning"
          });
          this.handleReset();
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleCodeDataDelete() {
      const data = {
        generalCode: this.genericCodeDataForm.generalCode
      };
      deleteGeneralCodeDataHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.deleteCodeDialog = false;
          this.handleReset();
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleFieldDelete() {
      //计算出删除之后的字段数据
      const tempArr = this.tableData.filter(item => {
        return this.selectionList.indexOf(item) === -1;
      });
      this.tableData = tempArr;
      this.deleteDataDialog = false;
    }
  }
};
</script>

<style lang="scss">
.genericCodeData {
  // padding: 0 30px;
  // .operate {
  //   padding: 10px 5px;
  // }
  // .showInfo {
  //   .el-table {
  //     width: 100%;
  //   }
  // }
  // .query {
  //   height: 40px;
  //   padding: 10px;
  //   .el-form {
  //     .el-form-item {
  //       .generalCode {
  //         width: 92%;
  //       }
  //     }
  //   }
  // }
  // .el-dialog {
  //   .el-form {
  //     .el-form-item {
  //       .dsn-input {
  //         width: 300px;
  //       }
  //     }
  //   }
  // }
  // .el-dialog {
  //   input::-webkit-outer-spin-button,
  //   input::-webkit-inner-spin-button {
  //     -webkit-appearance: none;
  //   }
  //   input[type="number"] {
  //     -moz-appearance: textfield;
  //   }
  // }
}
</style>
