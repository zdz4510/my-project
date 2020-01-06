<template>
  <div class="genericCodeDefine">
    <div class="query">
      <el-form
        :inline="true"
        :model="genericCodeDefineForm"
        :rules="genericCodeDefineRules"
        ref="genericCodeDefineForm"
        label-width="80px"
      >
        <el-form-item label="代码类型" prop="generalCodeGroup">
          <el-select
            v-model="genericCodeDefineForm.generalCodeGroup"
            filterable
            placeholder="请选择代码类型"
          >
            <el-option label="系统" value="S">系统</el-option>
            <el-option label="用户" value="I">用户</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码名" prop="generalCode">
          <el-input
            v-model="genericCodeDefineForm.generalCode"
            placeholder="请输入代码名"
            class="generalCode"
          ></el-input>
          <i
            class="el-icon-document"
            @click="
              handleQueryGeneralCode(
                genericCodeDefineForm.genericCode,
                'genericCodeDefineForm'
              )
            "
          ></i>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="genericCodeDefineForm.generalCodeDes"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            @click="handleQuery('genericCodeDefineForm')"
          >
            查询
          </el-button>
          <el-button size="small" type="primary" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-button
        size="small"
        type="primary"
        :disabled="!editable"
        @click="handleAddInit"
      >
        新增
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length !== 1 || !editable"
        @click="handleEdit"
      >
        修改
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="!editable"
        @click="handleSave"
      >
        保存
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="!editable"
        @click="deleteCodeDialog = true"
      >
        删除通用代码
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length <= 0 || !editable"
        @click="deleteFieldDialog = true"
      >
        删除字段名
      </el-button>
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="fieldName" label="字段名" width="130">
        </el-table-column>
        <el-table-column prop="fieldLabel" label="标签" width="130">
        </el-table-column>
        <el-table-column prop="fieldType" label="格式" width="130">
          <template slot-scope="scope">
            {{ scope.row.fieldType | filterFieldType }}
          </template>
        </el-table-column>
        <el-table-column prop="fieldSize" label="长度" width="130">
        </el-table-column>
        <el-table-column prop="limitGeneralCode" label="代码名" width="130">
        </el-table-column>
        <el-table-column
          prop="limitGeneralField"
          label="字段"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增/修改"
      :visible.sync="addDialog"
      width="35%"
      @close="closeAddDialog"
    >
      <span>
        <el-form
          ref="addForm"
          :model="addForm"
          label-width="80px"
          :rules="addFormRules"
        >
          <el-form-item label="字段名">
            <el-select v-model="addForm.fieldName" placeholder="请选择字段名">
              <el-option
                v-for="(item, index) in fieldNames"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="addForm.fieldLabel"></el-input>
          </el-form-item>
          <el-form-item label="格式">
            <el-select
              v-model="addForm.fieldType"
              placeholder="请选择字段名"
              @change="changeFieldType"
            >
              <el-option label="本文" value="A"></el-option>
              <el-option label="数字" value="N"></el-option>
              <el-option label="引用" value="C"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="长度"
            v-if="addForm.fieldType === 'A' || addForm.fieldType === 'N'"
          >
            <el-input v-model="addForm.fieldSize"></el-input>
          </el-form-item>
          <el-form-item label="代码名" v-if="addForm.fieldType === 'C'">
            <el-input v-model="addForm.limitGeneralCode"></el-input>
            <i
              class="el-icon-document"
              @click="handleQueryGeneralCode(addForm.generalCode, 'addForm')"
            ></i>
          </el-form-item>
          <el-form-item label="字段" v-if="addForm.fieldType === 'C'">
            <el-input v-model="addForm.limitGeneralField"></el-input>
            <i class="el-icon-document" @click="handleQueryField"></i>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="checkAddForm('addForm')">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="代码名" :visible.sync="generalCodeDialog" width="30%">
      <span>
        <el-table
          ref="multipleTable"
          :data="generalCodeData"
          highlight-current-row
          style="width: 100%"
          height="200px"
          @current-change="handleCurrentChange"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="generalCode" label="代码名" width="155">
          </el-table-column>
          <el-table-column
            prop="generalCodeDes"
            label="代码名描述"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="generalCodeDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectionGeneralCode">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="字段名" :visible.sync="fieldDialog" width="30%">
      <span>
        <el-table
          ref="multipleTable"
          :data="fieldData"
          highlight-current-row
          style="width: 100%"
          height="200px"
          @current-change="handleCurrentFieldChange"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="fieldName" label="字段名" width="155">
          </el-table-column>
          <el-table-column prop="fieldLabel" label="标签" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fieldDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectionGeneralCode">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="通用代码删除"
      :visible.sync="deleteCodeDialog"
      width="30%"
    >
      <span>是否确认{{ genericCodeDefineForm.genericCode }}代码名？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCodeDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleCodeDelete">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="字段名删除" :visible.sync="deleteFieldDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteFieldDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleFieldDelete">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findRecordHttp,
  findGeneralCodeHttp,
  findFieldHttp,
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
        callback("代码名格式错误");
      }
      callback();
    };
    //代码描述验证规则
    const valiGeneralCodeDes = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5\w]{1,50}$/;
      if (!reg.test(value)) {
        callback("描述字数超出50字");
      }
      callback();
    };
    //字段长度验证规则
    const valiFieldSize = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5\w]{1,30}$/;
      if (!reg.test(value)) {
        callback("描述字数超出50字");
      }
      callback();
    };
    return {
      //所有字段名
      fieldNames,
      //剩余字段名
      excessFieldNames: [],
      //已使用的字段名
      usedFieldNames: [],
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
          { validator: valiGeneralCode, trigger: "blur" }
        ],
        generalCodeDes: [{ validator: valiGeneralCodeDes, trigger: "blur" }]
      },
      addForm: {
        fieldName: "",
        fieldLabel: "",
        fieldType: "A",
        fieldSize: "",
        limitGeneralCode: "",
        limitGeneralField: ""
      },
      addFormRules: null,
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
      //验证字段长度
      valiFieldSize,
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
      operateType: ""
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
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //根据代码类型查询代码名
    handleQueryGeneralCode(generalCode, string) {
      if (string === "genericCodeDefineForm") {
        this.flag = true;
      }
      if (string === "addForm") {
        this.flag = false;
      }
      const data = {
        generalCode: generalCode,
        generalCodeGroup: this.genericCodeDefineForm.generalCodeGroup
      };
      findRecordHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          console.log(res.data);
          this.generalCodeData = res.data;
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
        generalCode: this.addForm.generalCode,
        fieldName: this.addForm.fieldName
      };
      findFieldHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          console.log(res.data);
          this.fieldDialog = true;
          this.fieldData = res.data;
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
        this.genericCodeDefineForm.generalCode = this.currentGeneralCode.generalCode;
      } else {
        this.addForm.generalCode = this.currentGeneralCode.generalCode;
      }
      this.generalCodeDialog = false;
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
      this.addForm.fieldName = this.excessFieldNames[0];
    },
    //关闭弹框
    closeAddDialog() {
      this.addDialog = false;
      this.handleResetAddDialog();
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
            { required: true, message: "请输入长度", trigger: "blur" },
            { validator: this.valiFieldSize, trigger: "blur" }
          ]
        };
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
        return;
      }
    },
    //重置查询
    handleReset() {
      this.genericCodeDefineForm.generalCode = "";
      this.genericCodeDefineForm.generalCodeGroup = "S";
      this.genericCodeDefineForm.generalCodeDes = "";
      this.tableData = [];
      this.editable = false;
    },
    checkAddForm(formName){
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
      this.tableData.filter(item => {
        return item.fieldName !== this.addForm.fieldName;
      });
      this.tableData.push(this.addForm);
    },
    //编辑
    handleEdit() {
      this.operateType = "edit";
      this.addDialog = true;
      this.addForm = this.selectionList[0];
    },
    handleSave() {
      const data = {
        definedData: [
          {
            field01: "string",
            field02: "string",
            field03: "string",
            field04: "string",
            field05: "string",
            field06: "string",
            field07: "string",
            field08: "string",
            field09: "string",
            field10: "string",
            field11: "string",
            field12: "string",
            field13: "string",
            field14: "string",
            field15: "string",
            field16: "string",
            field17: "string",
            field18: "string",
            field19: "string",
            field20: "string"
          }
        ],
        editable: true,
        fields: [
          {
            fieldLabel: "string",
            fieldName: "string",
            fieldSize: "string",
            fieldType: "string",
            limitGeneralCode: "string",
            limitGeneralField: "string"
          }
        ],
        generalCode: this.genericCodeDefineForm.generalCode,
        generalCodeDes: this.genericCodeDefineForm.generalCodeDes,
        generalCodeGroup: this.genericCodeDefineForm.generalCodeGroup
      };
      saveGeneralCodeHttp(data).then(data => {
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
    }
  }
};
</script>

<style lang="scss">
.genericCodeDefine {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    .el-form {
      .el-form-item {
        .generalCode {
          width: 92%;
        }
      }
    }
  }
  .el-dialog {
    .el-form {
      .el-form-item {
        .el-input {
          width: 300px;
        }
      }
    }
  }
}
</style>
