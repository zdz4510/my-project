<template>
  <div class="dc-collection">
    <div class="top">
      <el-row :gutter="8">
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="收集值">
              <el-form
                :inline="true"
                :model="searchForm"
                ref="searchForm"
                :rules="rules"
                class="form-style"
                :label-width="formLabelWidth"
              >
                <el-form-item label="收集类型:" prop="collectionType" required>
                  <dsn-select
                    v-model="searchForm.collectionType"
                    filterable
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in collectionTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </dsn-select>
                </el-form-item>
                <el-form-item label="接收值:" prop="acceptValue">
                  <dsn-input v-model="searchForm.acceptValue" ></dsn-input>
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
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="14">
          <el-tabs type="border-card">
            <el-tab-pane label="基础关系信息">
              <el-form :model="baseInfoForm" ref="baseInfoForm" :label-width="formLabelWidth">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="工单号:" prop="shopOrder">
                      <dsn-input v-model="baseInfoForm.shopOrder" disabled></dsn-input>
                    </el-form-item>
                    <el-form-item label="物料:" prop="material">
                      <dsn-input v-model="baseInfoForm.material" disabled></dsn-input>
                    </el-form-item>
                    <el-form-item label="物料组:" prop="materialGroup">
                      <dsn-input v-model="baseInfoForm.materialGroup" disabled></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备类型:" prop="resourceGroup">
                      <dsn-input v-model="baseInfoForm.resourceGroup" disabled></dsn-input>
                    </el-form-item>
                    <el-form-item label="工序:" prop="operation">
                      <dsn-input v-model="baseInfoForm.operation" disabled></dsn-input>
                    </el-form-item>
                    <el-form-item label="工作中心:" prop="workCenter">
                      <dsn-input v-model="baseInfoForm.workCenter" disabled></dsn-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="查看多个关系明细">222</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row :gutter="8">
        <el-col :span="14">
          <el-tabs type="border-card">
            <el-tab-pane label="数据收集组">
          
        <el-table :data="tableData" class="dialog-table" @select="selectedList">
        <el-table-column label="涉及数据收集组">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="dcGroup" label="数据收集组"></el-table-column>
          <el-table-column prop="dcGroupDes" label="数据收集组描述"></el-table-column>
          <el-table-column prop="paramNum" label="参数数量"></el-table-column>
          <el-table-column prop="conditionNum" label="收集条件"></el-table-column>
        </el-table-column>
      </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="参数输入">
              <div class="content">
                <el-row>
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
                      <dsn-button size="small" type="primary" @click="save">提交</dsn-button>
                      <dsn-button size="small" type="primary" @click="reset">重置</dsn-button>
                      <dsn-button size="small" type="primary" @click="check">校验</dsn-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="查看参数明细">111</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-tabs type="border-card">
        <el-tab-pane label="日志记录">
          <div class="content">
            <div v-for="(item,index) in logList" :key="index">{{item}}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
        tenantSiteCode: "test",
        acceptValue:"",
        collectionType:"",
      },
      baseInfoForm: {
        material: "",
       
        shopOrder: "",
        operation: "",
        resourceGroup: "",
        workCenter: "",
        materialGroup: ""
      },
      tableData: [],
      selectionList: [],
      paramsTableData: [],
      logList: [],
      checkedList: [],
      rules: {
        collectionType: [
          { required: true, message: "请选择收集类型", trigger: "change" }
        ]
      },
      dcParameterMeasureInfoList:[],
      collectionTypes: [
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
            console.log("888888",this.baseInfoForm)
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
      console.log(params)
      params.dcParameterMeasureInfoList = this.paramsTableData;
      params.collectionType = this.searchForm.collectionType;
      params.dcGroup = this.checkedList[0].dcGroup;
      params.material = this.baseInfoForm.material;
      params.operation = this.baseInfoForm.operation;
      // params.resource = this.searchForm.resource;
      params.tenantSiteCode = this.searchForm.tenantSiteCode;
      params.shopOrder = this.baseInfoForm.shopOrder;
      params.materialGroup = this.baseInfoForm.materialGroup;
      params.resourceGroup = this.baseInfoForm.resourceGroup;
      params.workCenter = this.baseInfoForm.workCenter;
      params.acceptValue =this.searchForm.acceptValue;
      saveCollectionData(params).then(data => {
        this.logList.push(data.data.data.msg);
        if (data.data.message == "success") {
          this.$message.success("操作成功");
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleSelectionChange(val) {
      this.selectionList = val;
    }
  }
};
</script>

<style lang="scss">
.dc-collection {
  .el-tabs {
    margin: 10px;
  }
}
</style>
