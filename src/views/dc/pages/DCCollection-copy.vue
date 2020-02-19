<template>
  <div class="dc-collection">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        :rules="rules"
        class="form-style"
        :label-width="formLabelWidth"
      >
        <el-form-item label="物料号:" prop="material">
          <dsn-input v-model="searchForm.material"></dsn-input>
        </el-form-item>
        <el-form-item label="设备ID:" prop="resource">
          <dsn-input v-model="searchForm.resource"></dsn-input>
        </el-form-item>
        <el-form-item label="工单号:" prop="shopOrder">
          <dsn-input v-model="searchForm.shopOrder"></dsn-input>
        </el-form-item>
        <el-form-item label="工序:" prop="operation">
          <dsn-input v-model="searchForm.operation"></dsn-input>
        </el-form-item>
        <el-form-item label="收集类型:" prop="collectionType" required>
          <dsn-select v-model="searchForm.collectionType" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in collectionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </dsn-select>
        </el-form-item>
        <el-form-item>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search('searchForm')"
          >查询</dsn-button>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-refresh"
            @click="resetForm('searchForm')"
          >重置</dsn-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件end -->
    </DsnPanel>

    <el-divider></el-divider>
    <div class="content">
      <el-row>
        <el-col :span="2" class="tr">
          <dsn-button type="primary">基础信息</dsn-button>
        </el-col>
        <el-col :span="6">
          <el-form :model="baseInfoForm" ref="baseInfoForm" :label-width="formLabelWidth">
            <el-form-item label="设备类型:" prop="resourceGroup">
              <dsn-input v-model="baseInfoForm.resourceGroup" disabled></dsn-input>
            </el-form-item>
            <el-form-item label="工作中心:" prop="workCenter">
              <dsn-input v-model="baseInfoForm.workCenter" disabled></dsn-input>
            </el-form-item>
            <el-form-item label="物料组:" prop="materialGroup">
              <dsn-input v-model="baseInfoForm.materialGroup" disabled></dsn-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="content">
      <el-row>
        <el-col :span="2" class="tr">
          <dsn-button type="primary">参数输入</dsn-button>
        </el-col>
        <el-col :span="22">
          <el-table :data="paramsTableData" class="parm-table" border>
            <el-table-column label="参数名" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.parameter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="参数描述" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.parameterDes }}</span>
              </template>
            </el-table-column>
            <el-table-column label="参数值" width="180">
              <template slot-scope="scope">
                <dsn-input v-model="scope.row.parameterValue"></dsn-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="btn">
            <dsn-button class="mr25 pad1025" size="small" type="primary" @click="save">提交</dsn-button>
            <dsn-button class="mr25 pad1025" size="small" type="primary" @click="reset">重置</dsn-button>
            <dsn-button class="mr25 pad1025" size="small" type="primary" @click="check">校验</dsn-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="content">
      <el-row>
        <el-col :span="2" class="tr">
          <dsn-button type="primary">日志记录</dsn-button>
        </el-col>
        <el-col :span="22">
          <div class="log">
            <div v-for="(item, index) in this.logList" :key="index">{{item}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title :visible.sync="dialog">
      <el-table :data="tableData" class="dialog-table" @select="selectedList">
        <el-table-column label="涉及数据收集组">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="dcGroup" label="数据收集组名称"></el-table-column>
          <el-table-column prop="dcGroupDes" label="数据收集组描述"></el-table-column>
          <el-table-column prop="paramNum" label="参数数量"></el-table-column>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="handleCancle">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSave">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCollectionData,
  checkParamData,
  getParamsList,
  saveCollectionData,
  getMaterialList
} from "../../../api/dc.data.collection.api";
export default {
  name: "dc-collection",
  data() {
    return {
      formLabelWidth: "85px",
      dialog: false,
      searchForm: {
        material: "",
        resource: "",
        shopOrder: "",
        operation: "",
        collectionType: "",
        tenantSiteCode: "test"
      },
      baseInfoForm: {
        resourceGroup: "",
        workCenter: "",
        materialGroup: ""
      },
      tableData: [],
      paramsTableData: [],
      logList: [],
      checkedList: [],
      rules: {
        collectionType: [
          { required: true, message: "请选择收集类型", trigger: "change" }
        ]
      },
      collectionType: [
        {
          value: "10",
          label: "工单"
        },
        {
          value: "20",
          label: "物料"
        },
        {
          value: "30",
          label: "资源"
        },
        {
          value: "40",
          label: "工序"
        }
      ]
    };
  },
  created() {
    let params = {
      material: "",
      materialRev: "",
      currentPage: 1,
      pageSize: 0,
      tenantSiteCode: "test",
      deleteFlag: false
    };
    getMaterialList(params).then(data => {
      console.log(data, "d");
    });
  },
  methods: {
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.searchForm;
          getCollectionData(params).then(data => {
            this.baseInfoForm = data.data.data;
            if (data.data.data.dcParameterMeasureList) {
              this.paramsTableData = data.data.data.dcParameterMeasureList;
            } else {
              this.tableData = data.data.data.dcGroupList;
              this.dialog = true;
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
    check() {
      console.log(this.paramsTableData, "tabledata");
      let params = this.paramsTableData;
      checkParamData(params).then(data => {
        console.log(data.data.data, "ddddd");
        this.logList.push(data.data.data.msg);
      });
    },
    reset() {
      let arr = this.paramsTableData;
      arr.forEach(function(value) {
        value.parameterValue = "";
        console.log(value);
      });
      this.paramsTableData = JSON.parse(JSON.stringify(arr));
      this.$forceUpdate();
    },
    handleCancle() {
      this.dialog = false;
    },
    handleSave() {
      if (this.checkedList.length == 1) {
        this.dialog = false;
        let params = this.checkedList[0];
        getParamsList(params).then(data => {
          this.paramsTableData = data.data.data;
        });
      } else {
        this.$message.error("请选择一条数据");
      }
    },
    selectedList(val) {
      this.checkedList = val;
    },
    save() {
      let params = this.checkedList[0];
      params.dcParameterMeasureInfoList = this.paramsTableData;
      params.collectionType = this.searchForm.collectionType;
      params.dcGroup = this.checkedList[0].dcGroup;
      params.material = this.searchForm.material;
      params.operation = this.searchForm.operation;
      params.resource = this.searchForm.resource;
      params.tenantSiteCode = this.searchForm.tenantSiteCode;
      params.shopOrder = this.searchForm.shopOrder;
      params.materialGroup = this.baseInfoForm.material;
      params.resourceGroup = this.baseInfoForm.resourceGroup;
      params.workCenter = this.baseInfoForm.workCenter;
      saveCollectionData(params).then(data => {
        this.logList.push(data.data.data.msg);
        if (data.data.message == "success") {
          this.$message.success("操作成功");
        } else {
          this.$message.error(data.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.dc-collection {
  // .search-bar {
  //   background: #ffffff;
  //   .form-style {
  //     margin: 0 !important;
  //     padding: 0 0 0 30px !important;
  //     height: 146px !important;
  //     position: relative;
  //     top: 20px;
  //     // transform: translateY(-50%);
  //   }
  // }
  // .content {
  //   background: #ffffff;
  //   padding-top: 20px;
  // }
  // .tr {
  //   text-align: right;
  // }

  // .btn {
  //   margin: 20px 0 20px 100px;
  // }
  // .log {
  //   height: 160px;
  //   border: 1px solid #dcdfe6;
  //   margin-left: 50px;
  //   overflow: scroll;
  // }
  // .dialog-table,
  // .el-table {
  //   margin-left: 0px;
  // }
  // .parm-table {
  //   margin-left: 50px;
  // }
}
</style>
