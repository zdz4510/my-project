<template>
  <div class="genericCodeData">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form
        :inline="true"
        :model="genericCodeDataForm"
        :rules="genericCodeDataRules"
        ref="genericCodeDataForm"
        label-width="80px"
      >
        <el-form-item label="代码类型" prop="generalCodeGroup">
          <el-select
            v-model.trim="genericCodeDataForm.generalCodeGroup"
            size="small"
            placeholder="请选择代码类型"
          >
            <el-option label="系统" value="S">系统</el-option>
            <el-option label="用户" value="I">用户</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码名" prop="generalCode">
          <dsn-input
            v-model.trim="genericCodeDataForm.generalCode"
            placeholder="请输入代码名"
            style="width:225px;vertical-align:baseline;"
            @clear="clearGeneralCode"
          >
            <template slot="append">
              <i class="el-icon-document" @click="handleQueryGeneralCode"></i>
            </template>
          </dsn-input>
        </el-form-item>
        <el-form-item label="描述">
          <dsn-input v-model.trim="genericCodeDataForm.generalCodeDes" :disabled="true"></dsn-input>
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
      <!-- 查询条件end -->
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <!-- 表格操作start -->
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
        <!-- <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          :disabled="!editable"
          @click.native="deleteCodeDialog = true"
        >删除通用代码</dsn-button>-->
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          :disabled="selectionList.length <= 0 || !editable"
          @click.native="handleFieldDelete"
        >删除数据</dsn-button>
      </div>
      <!-- 表格操作end -->
      <!-- 表格数据start -->
      <dsn-table
        v-if="fields.length>0"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          v-for="(field, index) in fields"
          :key="index"
          :prop="field.fieldName"
          :label="field.fieldLabel"
        ></el-table-column>
      </dsn-table>
      <!-- 表格数据end -->
    </DsnPanel>
    <!-- 新增或修改弹框start -->
    <el-dialog title="新增/修改" :visible.sync="addDialog" :width="dialogWidth" @close="closeAddDialog">
      <span>
        <el-form ref="addForm" :model="addForm" label-width="90px" :rules="addFormRules">
          <el-form-item
            v-for="(field, index) in fields"
            :key="index"
            :prop="field.fieldName"
            :label="field.fieldLabel"
          >
            <dsn-input v-model="addForm[`${field.fieldName}`]" placeholder="请输入字段数据"></dsn-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="resetAddForm">重 置</dsn-button>
        <dsn-button type="primary" @click.native="checkAddForm('addForm')">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 新增或修改弹框end -->
    <!-- 代码名弹框start -->
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
    <!-- 代码名弹框ebd -->
    <!-- 字段名弹框start -->
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
    <!-- 字段名弹框end -->
    <!-- 通用代码删除弹框start -->
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
    <!-- 通用代码删除弹框end -->
  </div>
</template>

<script>
import { findRecordHttp } from "@/api/maintenance/code.definition.api.js";
import {
  findGeneralCodeHttp,
  saveGeneralCodeDataHttp,
  deleteGeneralCodeDataHttp,
  findReferenceHttp
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
      totalData: {},
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
      //弹框宽度
      dialogWidth: "400px",
      //修改时保存初始数据
      cloneEditForm: {},
      //字段格式
      fields: [],
      tempField: {}
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
          if (JSON.stringify(this.totalData) === JSON.stringify(res.data)) {
            return;
          }
          this.totalData = res.data;
          this.tableData = res.data.definedData;
          this.genericCodeDataForm.generalCodeDes = res.data.generalCodeDes;
          this.fields = res.data.fields;
          //获取出所有已使用的字段名
          res.data.fields.forEach(element => {
            this.usedFieldNames.push(element.fieldName);
          });
          this.editable = res.data.editable;
          //给对象添加属性
          this.fields.forEach(element => {
            this.$set(this.addForm, element.fieldName, "");
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
      this.fields.forEach(element => {
        if (element.fieldName === "FIELD_01") {
          this.$set(this.addFormRules, element.fieldName, [
            {
              required: true,
              message: "字段FIELD_01为必填项",
              trigger: "blur"
            }
          ]);
          //引用型
          if (element.fieldType === "C") {
            this.queryCite(
              element.fieldName,
              element.limitGeneralCode,
              element.limitGeneralField
            );
          }
          this.tempField = element;
          //文本型
          if (element.fieldType === "A") {
            this.addFormRules[`${element.fieldName}`].push({
              validator: this.valiText.bind(element),
              trigger: "blur"
            });
          }
          //数字型
          if (element.fieldType === "N") {
            this.addFormRules[`${element.fieldName}`].push({
              validator: this.valiNumber.bind(element),
              trigger: "blur"
            });
          }
          return;
        }
        //引用型
        if (element.fieldType === "C") {
          this.queryCite(
            element.fieldName,
            element.limitGeneralCode,
            element.limitGeneralField
          );
        }
        this.tempField = element;
        //文本型
        if (element.fieldType === "A") {
          this.$set(this.addFormRules, element.fieldName, [
            {
              validator: this.valiText.bind(element),
              trigger: "blur"
            }
          ]);
        }
        //数字型
        if (element.fieldType === "N") {
          this.$set(this.addFormRules, element.fieldName, [
            { validator: this.valiNumber.bind(element), trigger: "blur" }
          ]);
        }
      });
    },
    //设置文本型的验证规则
    valiText(rule, value, callback) {
      if ((value + "").length > this.tempField.fieldSize) {
        callback(new Error(`该字段总长最多为${this.tempField.fieldSize}`));
      }
      callback();
    },
    //数字型的验证规则
    valiNumber(rule, value, callback) {
      // let reg = new RegExp("^\\d{1," + this.tempField.fieldSize + "}$", "gim"); // re为/^\d+bl$/gim
      let reg = /^(([0-9]+)||([0-9]+\.[0-9]{1,3}))$/g;
      if (!reg.test(value)) {
        callback(new Error(`该字段是数字型且最多三位小数`));
      }
      if ((value + "").length > this.tempField.fieldSize) {
        callback(new Error(`该字段总长最多为${this.tempField.fieldSize}`));
      }
      callback();
    },
    queryCite(fieldName, limitGeneralCode, limitGeneralField) {
      console.log(fieldName, limitGeneralCode, limitGeneralField);
      const data = {
        limitGeneralCode,
        limitGeneralField
      };
      findReferenceHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          const field = res.data;
          if (field.fieldType === "C") {
            this.queryCite(
              field.fieldName,
              field.limitGeneralCode,
              field.limitGeneralField
            );
          }
          this.tempField = field;
          if (fieldName === "FIELD_01") {
            //文本型
            if (field.fieldType === "A") {
              this.addFormRules[`${fieldName}`].push({
                validator: this.valiText.bind(field),
                trigger: "blur"
              });
            }
            //数字型
            if (field.fieldType === "N") {
              this.addFormRules[`${fieldName}`].push({
                validator: this.valiNumber.bind(field),
                trigger: "blur"
              });
            }
          } else {
            //文本型
            if (field.fieldType === "A") {
              this.$set(this.addFormRules, fieldName, [
                {
                  validator: this.valiText.bind(field),
                  trigger: "blur"
                }
              ]);
            }
            //数字型
            if (field.fieldType === "N") {
              this.$set(this.addFormRules, fieldName, [
                { validator: this.valiNumber.bind(field), trigger: "blur" }
              ]);
            }
          }
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
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
      this.$refs["genericCodeDataForm"].resetFields();
      this.usedFieldNames = [];
      this.tableData = [];
      this.addForm = {};
      this.addFormRules = {};
      this.editable = false;
      this.fields = [];
      this.totalData = [];
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
      this.tableData.push(JSON.parse(JSON.stringify(this.addForm)));
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
            type: "success"
          });
          return;
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
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleFieldDelete() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //计算出删除之后的字段数据
          const tempArr = this.tableData.filter(item => {
            return this.selectionList.indexOf(item) === -1;
          });
          this.tableData = tempArr;
          this.$message({
            type: "success",
            message: "数据删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // //代码名输入框值变化
    // inputGeneralCode(val) {
    //   if (val !== "") {
    //     this.editable = true;
    //   } else {
    //     this.editable = false;
    //   }
    // },
    //代码名清除时清空表格数据
    clearGeneralCode() {
      this.tableData = [];
      this.fields = [];
      this.editable = false;
      this.totalData = [];
    }
  }
};
</script>

<style lang="scss">
.genericCodeData {
}
</style>
