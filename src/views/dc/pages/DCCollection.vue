<template>
  <div class="dc-collection">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>收集值</span>
      </div>
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
            placeholder="请选择收集类型"
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
          <dsn-input v-model="searchForm.acceptValue" placeholder="请输入接收值"></dsn-input>
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
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-tabs
            type="border-card"
            style="height:180px"
            v-model="activeNameLeft"
            @tab-click="handleClickLeft"
          >
            <el-tab-pane label="基础关系信息" name="baseRelation">
              <el-form
                :model="baseInfoForm"
                ref="baseInfoForm"
                :label-width="formLabelWidth"
                class="baseInfoForm"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="工单号:" prop="shopOrder">
                      <el-input v-model="baseInfoForm.shopOrder" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="物料:" prop="material">
                      <el-input v-model="baseInfoForm.material" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="物料组:" prop="materialGroup">
                      <el-input v-model="baseInfoForm.materialGroup" size="small" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备类型:" prop="resourceGroup">
                      <el-input v-model="baseInfoForm.resourceGroup" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工序:" prop="operation">
                      <el-input v-model="baseInfoForm.operation" size="small" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工作中心:" prop="workCenter">
                      <el-input v-model="baseInfoForm.workCenter" size="small" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="查看多个关系明细" name="lookDetail">222</el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="数据收集组" style="height:200px">
              <h3 style="text-align:center">涉及数据收集组</h3>
              <el-table :data="tableData" @select="selectedList">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="dcGroup" label="数据收集组"></el-table-column>
                <el-table-column prop="dcGroupDes" label="数据收集组描述" width="110"></el-table-column>
                <el-table-column prop="paramNum" label="参数数量"></el-table-column>
                <el-table-column prop="conditionNum" label="收集条件"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          <el-tabs
            type="border-card"
            style="height:300px"
            v-model="activeNameRight"
            @tab-click="handleClickRight"
          >
            <el-tab-pane label="参数输入" name="paramsInput">
              <div class="btn">
                <dsn-button icon="el-icon-folder-add" size="small" type="success" @click="save">提交</dsn-button>
                <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="reset">重置</dsn-button>
                <dsn-button size="small" type="primary" @click="check">校验</dsn-button>
              </div>
              <el-table :data="paramsTableData">
                <el-table-column label="参数名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.parameter }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="参数描述">
                  <template slot-scope="scope">
                    <span>{{ scope.row.parameterDes }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="参数值">
                  <template slot-scope="scope">
                    <dsn-input v-model="scope.row.parameterValue"></dsn-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="查看参数明细" name="paramsDetail">111</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </DsnPanel>
    <div class="bottom">
      <el-tabs type="border-card">
        <el-tab-pane label="日志记录">
          <div class="content">
            <div v-for="(item,index) in logList" :key="index">{{item}}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 查看参数明细start -->
    <el-dialog title="查看参数明细" :visible.sync="paramsDialog" @close="closeParams">
      <h3 style="text-align:center">涉及数据收集组</h3>
      <dsn-table :data="tableData" @select="selectedList">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="parameter" label="参数名称"></el-table-column>
        <el-table-column prop="parameterDes" label="参数描述"></el-table-column>
        <el-table-column prop="softCheck" label="软检查"></el-table-column>
        <el-table-column prop="parameterStatus" label="参数状态"></el-table-column>
        <el-table-column prop="valueType" label="值类型"></el-table-column>
        <el-table-column prop="required" label="必须值"></el-table-column>
        <el-table-column prop="targetValue" label="标准值"></el-table-column>
        <el-table-column prop="trueValue" label="布尔值TRUE绑定" width="120"></el-table-column>
        <el-table-column prop="falseValue" label="布尔值FALSE绑定" width="120"></el-table-column>
        <el-table-column prop="upperSpecLimit" label="标准值上限"></el-table-column>
        <el-table-column prop="lowerSpecLimit" label="标准值下限"></el-table-column>
        <el-table-column prop="upperWarnLimit" label="预警发生上限值" width="110"></el-table-column>
        <el-table-column prop="lowerWarnLimit" label="预警发生下限值" width="110"></el-table-column>
        <el-table-column prop="alarm" label="预警事件编号" width="110"></el-table-column>
      </dsn-table>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="handleCancle">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSave">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 查看参数明细end -->
    <!-- 查看多个关系明细start -->
    <el-dialog title="查看多个关系明细" :visible.sync="detailDialog" width="500px" @close="closeDetail">
      <el-tabs type="border-card">
        <el-tab-pane label="物料组">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="tableData">
            <el-table-column prop="parameter" label="物料组"></el-table-column>
            <el-table-column prop="parameterDes" label="物料组描述"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设备类型">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="tableData">
            <el-table-column prop="parameter" label="设备类型"></el-table-column>
            <el-table-column prop="parameterDes" label="设备类型描述"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工作中心">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="tableData">
            <el-table-column prop="parameter" label="工作中心"></el-table-column>
            <el-table-column prop="parameterDes" label="工作中心描述"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工序">
          <h3 style="text-align:center">涉及关系明细</h3>
          <el-table :data="tableData">
            <el-table-column prop="parameter" label="工序"></el-table-column>
            <el-table-column prop="parameterDes" label="工序描述"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="handleCancle">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSave">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 查看多个关系明细end -->
  </div>
</template>

<script>
import {
  findDcGroupDataHttp,
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
      paramsDialog: false,
      detailDialog: false,
      searchForm: {
        acceptValue: "",
        collectionType: ""
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
        acceptValue: [
          { required: true, message: "请输入接收值", trigger: "blur" }
        ],
        collectionType: [
          { required: true, message: "请选择收集类型", trigger: "change" }
        ]
      },
      dcParameterMeasureInfoList: [],
      collectionTypes: [
        {
          value: 10,
          label: "LOT"
        },
        {
          value: 20,
          label: "资源"
        }
      ],
      activeNameLeft: "baseRelation",
      activeNameRight: "paramsInput"
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
          const data = {
            acceptValue: this.searchForm.acceptValue,
            collectionType: this.searchForm.collectionType
          };
          findDcGroupDataHttp(data).then(data => {
            this.baseInfoForm = data.data.data;
            if (data.data.data.dcParameterMeasureList) {
              this.paramsTableData = data.data.data.dcParameterMeasureList;
            } else {
              this.tableData = data.data.data.dcGroupList;
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
      this.paramsDialog = false;
    },
    handleSave() {
      if (this.checkedList.length == 1) {
        this.paramsDialog = false;
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
      console.log(params);
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
      params.acceptValue = this.searchForm.acceptValue;
      saveCollectionData(params).then(data => {
        this.logList.push(data.data.data.msg);
        if (data.data.message == "success") {
          this.$message.success("操作成功");
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    //复选框选择
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //左边页签选择
    handleClickLeft(tab) {
      if (tab.name === "baseRelation") {
        this.detailDialog = false;
      }
      if (tab.name === "lookDetail") {
        this.detailDialog = true;
      }
    },
    //右边页签选择
    handleClickRight(tab) {
      if (tab.name === "paramsInput") {
        this.paramsDialog = false;
      }
      if (tab.name === "paramsDetail") {
        this.paramsDialog = true;
      }
    },
    //关闭左边弹框
    closeParams() {
      this.activeNameLeft = "baseRelation";
      console.log(this.activeNameLeft);
    },
    //关闭右边弹框
    closeDetail() {
      this.activeNameRight = "paramsInput";
    }
  }
};
</script>

<style lang="scss">
.dc-collection {
  .el-tabs {
    margin: 10px;
  }
  .baseInfoForm {
    .el-form-item {
      margin-bottom: 0px;
      .el-input__inner {
        background: #fff;
        border: 0;
      }
    }
  }
}
</style>
