<template>
  <div class="genericCodeDefine">
    <div class="query">
      <el-form
        :inline="true"
        :model="genericCodeDefineForm"
        ref="genericCodeDefineForm"
        label-width="70px"
      >
        <el-form-item label="代码类型">
          <el-select
            v-model="genericCodeDefineForm.generalCodeGroup"
            filterable
            placeholder="请选择代码类型"
          >
            <el-option label="系统" value="S">系统</el-option>
            <el-option label="用户" value="I">用户</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码名">
          <el-input
            v-model="genericCodeDefineForm.generalCode"
            placeholder="请输入代码名"
            class="generalCode"
          ></el-input>
          <i class="el-icon-document" @click="handleQueryGeneralCode"></i>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="genericCodeDefineForm.generalCodeDes"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleQuery">
            查询
          </el-button>
          <el-button size="small" type="primary" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="addDialog = true">
        新增
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length !== 1"
        @click="handleEdit"
      >
        修改
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length <= 0"
        @click="deleteDialog = true"
      >
        删除
      </el-button>
      <!-- <el-button size="small" type="primary" @click="handleExport"
        >导出</el-button
      > -->
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="60"> </el-table-column>
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
    <el-dialog title="新增/修改" :visible.sync="addDialog" width="35%">
      <span>
        <el-form ref="addForm" :model="addForm" label-width="80px">
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
            <el-select v-model="addForm.fieldType" placeholder="请选择字段名">
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
          </el-form-item>
          <el-form-item label="字段" v-if="addForm.fieldType === 'C'">
            <el-input v-model="addForm.limitGeneralField"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">
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
        <el-button type="primary" @click="handleSelectiongeneralCode">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findRecordHttp,
  findGeneralCodeHttp
} from "@/api/maintenance/code.definition.api.js";
import { mapMutations } from "vuex";
const fieldNames = [
  "FILED_01",
  "FILED_02",
  "FILED_03",
  "FILED_04",
  "FILED_05",
  "FILED_06",
  "FILED_07",
  "FILED_08",
  "FILED_09",
  "FILED_10",
  "FILED_11",
  "FILED_12",
  "FILED_13",
  "FILED_14",
  "FILED_15",
  "FILED_16",
  "FILED_17",
  "FILED_18",
  "FILED_19",
  "FILED_20"
];
export default {
  data() {
    const valiGeneralCodeDes = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5\w]{1,50}$/;
      if (!reg.test(value)) {
        callback("描述字数超出50字");
      }
      callback();
    };
    return {
      fieldNames:fieldNames,
      index:0,
      genericCodeDefineForm: {
        //产线
        generalCodeGroup: "S",
        //站位
        generalCode: "",
        generalCodeDes: ""
      },
      genericCodeDefineRules: {
        generalCodeDes: [{ validator: valiGeneralCodeDes, trigger: "blur" }]
      },
      addForm: {
        fieldName: fieldNames[0],
        fieldLabel: "",
        fieldType: "A",
        fieldSize: "",
        limitGeneralCode: "",
        limitGeneralField: ""
      },
      addDialog: false,
      // currentPage: 1,
      // pageSize: 10,
      // total: 0,
      tableData: [],
      //表格复选框数据
      selectionList: [],
      //删除弹出框
      deleteDialog: false,
      //代码名弹出框
      generalCodeDialog: false,
      //弹出框代码名数据
      generalCodeData: []
      //所有字段名
    };
  },
  computed:{
    
  },
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
        console.log(res);
        if (res.code === 200) {
          this.tableData = res.data.fields;
          this.genericCodeDefineForm.generalCodeDes = res.data.generalCodeDes;
          console.log(res.data);
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
      const data = {
        generalCode: this.genericCodeDefineForm.generalCode,
        generalCodeGroup: this.genericCodeDefineForm.generalCodeGroup
      };
      findRecordHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          console.log(res.data);
          this.generalCodeData = res.data;
          this.generalCodeDialog = true;
        }
      });
    },
    //表格选择
    handleSelectionChange(selection) {
      this.selectionList = selection;
    },
    //弹出框选择
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //弹出框确认选择
    handleSelectiongeneralCode() {
      // this.standingForm.resource = this.currentRow.resource;
      this.genericCodeDefineForm.generalCode = this.currentRow.generalCode;
      this.generalCodeDialog = false;
    },
    //查询
    handleQuery() {
      this.init();
    },
    //重置
    handleReset() {
      this.genericCodeDefineForm.generalCode = "";
      this.genericCodeDefineForm.generalCodeGroup = "S";
      this.genericCodeDefineForm.generalCodeDes = "";
      this.tableData = [];
    },
    //新增
    handleAdd() {
      console.log(this.addForm);
      this.addDialog = false;
    },
    //编辑
    handleEdit() {
      const tempArr = JSON.parse(JSON.stringify(this.selectionList));
      this.STANDINGLIST(tempArr);
      this.$router.push({
        name: "standingMaintenanceEdit",
        query: { operateType: "edit" }
      });
    },
    handleDelete() {
      // this.tableData = JSON.parse(JSON.stringify(this.selectionList));
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
