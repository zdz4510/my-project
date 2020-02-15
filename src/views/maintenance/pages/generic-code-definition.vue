<template>
  <div class="genericCodeDefine">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form
        :inline="true"
        :model="genericCodeDefineForm"
        :rules="genericCodeDefineRules"
        ref="genericCodeDefineForm"
        label-width="80px"
      >
        <el-form-item label="代码类型" prop="generalCodeGroup">
          <dsn-select
            v-model.trim="genericCodeDefineForm.generalCodeGroup"
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
                v-model.trim="genericCodeDefineForm.generalCode"
                placeholder="请输入代码名（[A-Z,0-9,_,-,/]）"
                @input="inputGeneralCode"
                @clear="clearGeneralCode"
              ></dsn-input>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-document" @click="handleQueryGeneralCode"></i>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述">
          <dsn-input
            v-model.trim="genericCodeDefineForm.generalCodeDes"
            :maxlength="50"
            placeholder="请输入描述（不超过50字）"
          ></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button
            size="small"
            icon="el-icon-search"
            type="primary"
            @click.native="handleQuery('genericCodeDefineForm')"
          >查询</dsn-button>
          <dsn-button
            size="small"
            icon="el-icon-refresh"
            type="primary"
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
          :disabled="!editable || genericCodeDefineForm.generalCode === '' "
        >新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          :disabled="selectionList.length !== 1 || !editable"
          @click.native="handleEdit"
        >修改</dsn-button>
        <dsn-button size="small" type="primary" :disabled="!editable" @click.native="checkSave">保存</dsn-button>
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
          @click.native="deleteFieldDialog = true"
        >删除字段名</dsn-button>
      </div>
      <!-- 表格操作end -->
      <!-- 表格数据start -->
      <dsn-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="fieldName" label="字段名" width="130"></el-table-column>
        <el-table-column prop="fieldLabel" label="标签" width="130"></el-table-column>
        <el-table-column prop="fieldType" label="格式" width="130">
          <template slot-scope="scope">{{ scope.row.fieldType | filterFieldType }}</template>
        </el-table-column>
        <el-table-column prop="fieldSize" label="长度" width="130"></el-table-column>
        <el-table-column prop="limitGeneralCode" label="代码名" width="180"></el-table-column>
        <el-table-column prop="limitGeneralField" label="字段" show-overflow-tooltip></el-table-column>
      </dsn-table>
      <!-- 表格数据end -->
    </DsnPanel>
    <!-- 新增模态框start -->
    <el-dialog title="新增/修改" :visible.sync="addDialog" :width="dialogWidth" @close="closeAddDialog">
      <span>
        <el-form ref="addForm" :model="addForm" label-width="70px" :rules="addFormRules">
          <el-form-item label="字段名" prop="fieldName">
            <dsn-select v-model.trim="addForm.fieldName" placeholder="请选择字段名" style="width:100%">
              <el-option
                v-for="(item, index) in fieldNames"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </dsn-select>
          </el-form-item>
          <el-form-item label="标签" prop="fieldLabel">
            <dsn-input v-model.trim="addForm.fieldLabel" placeholder="请输入标签"></dsn-input>
          </el-form-item>
          <el-form-item label="格式" prop="fieldType">
            <el-select
              size="small"
              v-model.trim="addForm.fieldType"
              placeholder="请选择格式"
              @change="changeFieldType"
              style="width:100%"
            >
              <el-option label="文本" value="A"></el-option>
              <el-option label="数字" value="N"></el-option>
              <el-option label="引用" value="C"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="长度"
            v-if="addForm.fieldType === 'A' || addForm.fieldType === 'N'"
            prop="fieldSize"
          >
            <dsn-input v-model.trim="addForm.fieldSize" max="30" placeholder="请输入长度（小于30的数字）"></dsn-input>
          </el-form-item>
          <el-form-item label="代码名" v-if="addForm.fieldType === 'C'" prop="limitGeneralCode">
            <el-row>
              <el-col :span="22">
                <dsn-input v-model.trim="addForm.limitGeneralCode" placeholder="请输入代码名"></dsn-input>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-document" @click="handleQueryDialogGeneralCode"></i>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="字段" v-if="addForm.fieldType === 'C'" prop="limitGeneralField">
            <el-row>
              <el-col :span="22">
                <dsn-input v-model.trim="addForm.limitGeneralField" placeholder="请输入字段"></dsn-input>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-document" @click="handleQueryField"></i>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="resetForm">重 置</dsn-button>
        <dsn-button type="primary" @click.native="checkAddForm('addForm')">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 新增模态框end -->
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
    <!-- 代码名弹框end -->
    <!-- 字段名start -->
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
    <!-- 字段名end -->
    <!-- 通用代码删除start -->
    <el-dialog title="通用代码删除" :visible.sync="deleteCodeDialog" :width="dialogWidth">
      <span>是否确认{{ genericCodeDefineForm.genericCode }}代码名？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="deleteCodeDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleCodeDelete">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 通用代码删除end -->
    <!-- 字段名删除start -->
    <el-dialog title="字段名删除" :visible.sync="deleteFieldDialog" :width="dialogWidth">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="deleteFieldDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleFieldDelete">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 字段名删除end -->
  </div>
</template>

<script>
import {
  findRecordHttp,
  findFieldHttp,
  findGeneralCodeHttp,
  deleteGeneralCodeHttp,
  saveGeneralCodeHttp
} from "@/api/maintenance/code.definition.api.js";

import { mapMutations } from "vuex";
const fieldNames = [
  "FIELD_01",
  "FIELD_02",
  "FIELD_03",
  "FIELD_04",
  "FIELD_05",
  "FIELD_06",
  "FIELD_07",
  "FIELD_08",
  "FIELD_09",
  "FIELD_10",
  "FIELD_11",
  "FIELD_12",
  "FIELD_13",
  "FIELD_14",
  "FIELD_15",
  "FIELD_16",
  "FIELD_17",
  "FIELD_18",
  "FIELD_19",
  "FIELD_20"
];
export default {
  data() {
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
    // //代码描述验证规则
    // const valiGeneralCodeDes = (rule, value, callback) => {
    //   // let reg = /^[\u4e00-\u9fa5\w]{1,50}$/;
    //   // let reg = /^\w{,50}$/;
    //   let reg = /^.{1,50}$/g;
    //   if (!reg.test(value)) {
    //     callback("描述字数超出50字");
    //   }
    //   callback();
    // };
    const valiFieldSize = (rule, value, callback) => {
      if (value === "") {
        callback("长度不能为空");
      }
      let reg = /^([1-9]|[1-2][0-9]|[3][0])$/;
      if (!reg.test(value)) {
        callback("长度的格式错误，只能是数字且最大为30");
      }
      callback();
    };
    return {
      //所有字段名
      fieldNames,
      //剩余字段名
      excessFieldNames: fieldNames,
      //已使用的字段名
      usedFieldNames: [],
      //长度验证规则
      valiFieldSize,
      //查询表单
      genericCodeDefineForm: {
        //代码类型·
        generalCodeGroup: "S",
        //代码名
        generalCode: "",
        //代码描述
        generalCodeDes: ""
      },
      genericCodeDefineRules: {
        generalCodeGroup: [
          { required: true, message: "请选择代码类型", trigger: "change" }
        ],
        generalCode: [
          { required: true, message: "请输入代码名", trigger: "blur" },
          { validator: valiGeneralCode, trigger: "change" }
        ],
        generalCodeDes: [
          // { validator: valiGeneralCodeDes, max: 50, trigger: "blur" },
          { min: 3, max: 5, message: "长度 50 以内", trigger: "blur" }
        ]
      },
      addForm: {
        fieldName: "",
        fieldLabel: "",
        fieldType: "A",
        fieldSize: "",
        limitGeneralCode: "",
        limitGeneralField: ""
      },
      addFormRules: {
        fieldName: [
          { required: true, message: "请选择字段名", trigger: "change" }
        ],
        fieldLabel: [
          { required: true, message: "请输入标签", trigger: "blur" }
        ],
        fieldType: [
          { required: true, message: "请选择格式", trigger: "change" }
        ],
        fieldSize: [
          { required: true, validator: valiFieldSize, trigger: "change" }
        ]
      },
      addDialog: false,
      tableData: [],
      //表格复选框数据
      selectionList: [],
      //字段名删除
      deleteFieldDialog: false,
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
      //弹框宽度
      dialogWidth: "400px"
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
        generalCode: this.genericCodeDefineForm.generalCode
      };
      findGeneralCodeHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data.fields;
          this.genericCodeDefineForm.generalCodeDes = res.data.generalCodeDes;
          //获取出所有已使用的字段名
          this.tableData.forEach(element => {
            this.usedFieldNames.push(element.fieldName);
          });
          //计算出所有未使用的字段名
          this.excessFieldNames = this.fieldNames.filter(item => {
            return this.usedFieldNames.indexOf(item) === -1;
          });
          this.editable = res.data.editable;
          console.log(res.data.editable);
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
      const data = {
        generalCode: this.genericCodeDefineForm.generalCode,
        generalCodeGroup: this.genericCodeDefineForm.generalCodeGroup
      };
      this.GeneralCodeRequest(data);
    },
    //弹出框获取代码名
    handleQueryDialogGeneralCode() {
      this.flag = false;
      const data = {
        generalCode: this.addForm.limitGeneralCode,
        generalCodeGroup: this.genericCodeDefineForm.generalCodeGroup
      };
      this.GeneralCodeRequest(data);
    },
    //获取代码名的请求
    GeneralCodeRequest(data) {
      findRecordHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.generalCodeData = res.data;
          if (!this.flag) {
            this.generalCodeData = this.generalCodeData.filter(item => {
              return (
                item.generalCode !== this.genericCodeDefineForm.generalCode
              );
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
    //通过代码名查询字段名
    handleQueryField() {
      const data = {
        generalCode: this.addForm.limitGeneralCode,
        fieldName: this.addForm.limitGeneralField
      };
      findFieldHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.fieldDialog = true;
          this.fieldData = res.data;
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
    //字段名选择
    handleCurrentFieldChange(val) {
      this.currentField = val;
    },
    //代码名弹出框确认选择
    handleSelectionGeneralCode() {
      // console.log(this.currentGeneralCode.generalCode);
      if (this.flag) {
        this.genericCodeDefineForm.generalCode = this.currentGeneralCode.generalCode;
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
      this.handleResetAddDialog();
    },
    //重置表单
    resetForm() {
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
      this.addForm.fieldName = this.excessFieldNames[0];
      this.addForm.fieldLabel = "";
      this.addForm.fieldType = "A";
      this.addForm.fieldSize = "";
      this.addForm.limitGeneralCode = "";
      this.addForm.limitGeneralField = "";
    },
    //在弹出框选择格式（字段类型）
    changeFieldType(val) {
      if (val === "A" || val === "N") {
        this.addFormRules = {
          fieldName: [
            { required: true, message: "请选择字段名", trigger: "change" }
          ],
          fieldLabel: [
            { required: true, message: "请输入标签", trigger: "blur" }
          ],
          fieldType: [
            { required: true, message: "请选择格式", trigger: "change" }
          ],
          fieldSize: [
            { required: true, validator: this.valiFieldSize, trigger: "blur" }
          ]
        };
        this.addForm.limitGeneralCode = "";
        this.addForm.limitGeneralField = "";
        return;
      }
      if (val === "C") {
        this.addFormRules = {
          fieldName: [
            { required: true, message: "请选择字段名", trigger: "change" }
          ],
          fieldLabel: [
            { required: true, message: "请输入标签", trigger: "blur" }
          ],
          fieldType: [
            { required: true, message: "请选择格式", trigger: "change" }
          ],
          limitGeneralCode: [
            { required: true, message: "请输入代码名", trigger: "blur" }
          ],
          limitGeneralField: [
            { required: true, message: "请输入字段", trigger: "blur" }
          ]
        };
        this.addForm.fieldSize = "";
        return;
      }
    },
    //重置查询
    handleReset() {
      this.genericCodeDefineForm.generalCode = "";
      this.genericCodeDefineForm.generalCodeGroup = "S";
      this.genericCodeDefineForm.generalCodeDes = "";
      this.tableData = [];
      this.usedFieldNames = [];
      this.editable = false;
    },
    //新增前验证表单
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
        this.tableData = this.tableData.filter(item => {
          return item.fieldName !== this.addForm.fieldName;
        });
      }
      if (this.operateType === "add") {
        this.usedFieldNames.push(this.addForm.fieldName);
        this.excessFieldNames = this.excessFieldNames.filter(item => {
          return item !== this.addForm.fieldName;
        });
      }
      this.tableData.push(JSON.parse(JSON.stringify(this.addForm)));

      // this.usedFieldNames.push(this.addForm.fieldName);
    },
    //编辑
    handleEdit() {
      this.operateType = "edit";
      this.addDialog = true;
      this.cloneEditForm = JSON.parse(JSON.stringify(this.selectionList[0]));
      this.addForm = JSON.parse(JSON.stringify(this.cloneEditForm));
    },
    //保存前验证表单
    checkSave() {
      this.$refs["genericCodeDefineForm"].validate(valid => {
        if (valid) {
          this.handleSave();
        } else {
          return false;
        }
      });
    },
    //保存
    handleSave() {
      const data = {
        editable: true,
        fields: this.tableData,
        generalCode: this.genericCodeDefineForm.generalCode,
        generalCodeDes: this.genericCodeDefineForm.generalCodeDes,
        generalCodeGroup: this.genericCodeDefineForm.generalCodeGroup
      };
      saveGeneralCodeHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.editable = false;
          this.handleReset();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //删除通用代码
    handleCodeDelete() {
      const data = {
        generalCode: this.genericCodeDefineForm.generalCode,
        generalCodeGroup: this.genericCodeDefineForm.generalCodeGroup
      };
      deleteGeneralCodeHttp(data).then(data => {
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
        this.deleteCodeDialog = false;
      });
    },
    //删除字段名
    handleFieldDelete() {
      //计算出删除之后的字段数据
      const tempArr = this.tableData.filter(item => {
        return this.selectionList.indexOf(item) === -1;
      });
      this.tableData = tempArr;
      this.deleteFieldDialog = false;
    },
    //代码名输入框值变化
    inputGeneralCode(val) {
      if (val !== "") {
        this.editable = true;
      } else {
        this.editable = false;
      }
    },
    //代码名清除时清空表格数据
    clearGeneralCode() {
      this.tableData = [];
    }
  }
};
</script>

<style lang="scss">
</style>
