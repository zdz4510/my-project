<template>
  <div class="dc-search">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules">
        <el-form-item label="接收值:" prop="resource">
          <dsn-input v-model="searchForm.resource" placeholder="请输入接收值"></dsn-input>
        </el-form-item>
        <el-form-item label="数据收集组名称:" prop="dcGroup">
          <dsn-input v-model="searchForm.dcGroup" placeholder="请输入数据收集组名称"></dsn-input>
        </el-form-item>
        <el-form-item label="收集类型:" prop="collectionType" required label-width="90px">
          <dsn-select v-model="searchForm.collectionType" filterable placeholder="请选择收集类型">
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
            v-if="searchForm.dcGroup===''"
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="searchLeft(false)"
          >查询</dsn-button>
          <dsn-button
            v-else-if="searchForm.dcGroup!==''"
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="searchRight(false)"
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
      <!-- 表格操作start -->
      <div class="operate">
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-upload2"
          v-if="activeName === '清单'"
          @click="handleExportLeft"
        >导出</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-upload2"
          v-else-if="activeName === '参数清单'"
          @click="handleExportRight"
        >导出</dsn-button>
      </div>
      <!-- 表格操作end -->
      <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="已收集数据收集组清单" name="清单">
          <!-- 已收集数据收集组清单表格数据start -->
          <dsn-table
            ref="multipleTable"
            :data="this.tableData.data"
            tooltip-effect="dark"
            row-key="mat"
            @selection-change="handleSelectionChangeLeft"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="dcGroup" label="数据收集组" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="接收值" width="100" show-overflow-tooltip>
              <template
                slot-scope="scope"
              >{{ parseInt(scope.row.collectionType)===10?scope.row.lot:scope.row.resource}}</template>
            </el-table-column>
            <el-table-column prop="collectionType" label="收集类型" width="100" show-overflow-tooltip>
              <template slot-scope="scope">{{ parseInt(scope.row.collectionType)===10?"LOT":"资源"}}</template>
            </el-table-column>
            <el-table-column prop="resourceGroup" label="设备组" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="resource" label="设备编号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="material" label="物料号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="materialGroup" label="物料组" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shopOrder" label="工单号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workCenter" label="工作中心" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="operation" label="工序" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="testPass" label="校验结果" width="100" show-overflow-tooltip>
              <template slot-scope="scope">{{ parseInt(scope.row.testPass)===1?"通过":"不通过"}}</template>
            </el-table-column>
            <el-table-column prop="createUserName" label="创建人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="140" show-overflow-tooltip></el-table-column>
          </dsn-table>
          <dsn-pagination
            background
            @size-change="handleSizeChangeLeft"
            @current-change="handleCurrentChangeLeft"
            :current-page="this.leftPage.currentPage"
            :page-sizes="[1, 10, 15, 20, 30, 50]"
            :page-size="this.leftPage.pageSize"
            layout="->, total, prev, pager, next, sizes, jumper"
            :total="this.leftPage.total"
            v-if="pageShowLeft"
          ></dsn-pagination>
          <!-- 已收集数据收集组清单表格数据end -->
        </el-tab-pane>
        <el-tab-pane
          label="已收集数据收集组参数清单"
          :disabled="searchForm.dcGroup==='' || tableParamsData.tableData.length === 0"
          name="参数清单"
        >
          <!-- 已收集数据收集组参数清单表格数据start -->
          <dsn-table
            v-if="tableParamsData.tableData.length !== 0"
            :data="tableParamsData.tableData"
            @selection-change="handleSelectionChangeRight"
            row-key="mat"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号" fixed></el-table-column>
            <el-table-column prop="dcGroup" label="数据收集组" width="100" fixed></el-table-column>
            <el-table-column label="接收值" width="100" fixed>
              <template
                slot-scope="scope"
              >{{ parseInt(scope.row.collectionType)===10?scope.row.lot:scope.row.resource}}</template>
            </el-table-column>
            <el-table-column prop="collectionType" label="收集类型" width="100" fixed>
              <template slot-scope="scope">{{ parseInt(scope.row.collectionType)===10?"LOT":"资源"}}</template>
            </el-table-column>
            <template
              v-for="(item,index) in tableParamsData.tableHead"
              width="100"
              show-overflow-tooltip
            >
              <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index"></el-table-column>
            </template>
          </dsn-table>
          <!-- 已收集数据收集组参数清单表格数据end -->
          <!-- 分页start -->
          <dsn-pagination
            background
            @size-change="handleSizeChangeRight"
            @current-change="handleCurrentChangeRight"
            :current-page="this.rightPage.currentPage"
            :page-sizes="[1, 10, 15, 20, 30, 50]"
            :page-size="this.rightPage.pageSize"
            layout="->, total, prev, pager, next, sizes, jumper"
            :total="this.rightPage.total"
            v-if="pageShowRight"
          ></dsn-pagination>
          <!-- 分页end -->
        </el-tab-pane>
      </el-tabs>
    </DsnPanel>
  </div>
</template>

<script>
import {
  findDcDataPageHttp,
  findDcParamPageHttp
} from "../../../api/dc.search.api";
import _ from "lodash";
import { exportExcel } from "@/until/excel.js";
let tableHead = [
  // {
  //   column_name: "resource",
  //   column_comment: "接收值"
  // },
  // {
  //   column_name: "collectionType",
  //   column_comment: "收集类型"
  // },
  // {
  //   column_name: "dcGroup",
  //   column_comment: "数据收集组"
  // }
];
const tHeaderLeft = [
  "数据收集组",
  "收集类型",
  "设备组",
  "设备编号",
  "物料号",
  "物料组",
  "工单号",
  "工作中心",
  "工序",
  "校验结果",
  "创建人",
  "创建时间"
];
const filterValLeft = [
  "dcGroup",
  "collectionType",
  "resourceGroup",
  "resource",
  "material",
  "materialGroup",
  "shopOrder",
  "workCenter",
  "operation",
  "testPass",
  "createUserName",
  "createTime"
];
const fileNameLeft = "已收集数据收集组清单";
const tHeaderRight = ["数据收集组", "接收值", "收集类型"];
const filterValRight = ["dcGroup", "resource", "collectionType"];
const fileNameRight = "已收集数据收集组参数清单表格数据";
export default {
  name: "dc-search",
  data() {
    return {
      tHeaderLeft,
      filterValLeft,
      fileNameLeft,
      tHeaderRight,
      filterValRight,
      fileNameRight,
      clonetHeaderRight: [],
      clonefilterValRight: [],
      tableHead,
      checkedListLeft: [],
      checkedListRight: [],
      formLabelWidth: "200px",
      searchForm: {
        resource: "",
        dcGroup: "",
        collectionType: 10,
        tenantSiteCode: "test"
      },
      rules: {
        collectionType: [
          { required: true, message: "请选择收集类型", trigger: "blur" }
        ]
      },
      collectionType: [
        {
          value: 10,
          label: "LOT"
        },
        {
          value: 20,
          label: "资源"
        }
      ],
      tableData: {
        data: []
      },
      tableParamsData: {
        tableData: [],
        tableHead: []
      },
      leftPage: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      rightPage: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      activeName: "清单",
      pageShowLeft: false,
      pageShowRight: false
    };
  },
  created() {
    this.searchLeft(false);
  },
  methods: {
    searchLeft(pageShowLeft = true) {
      if (!pageShowLeft) {
        this.leftPage.currentPage = 1;
      }
      const params = {
        ...this.searchForm,
        pageSize: this.leftPage.pageSize,
        currentPage: this.leftPage.currentPage
      };
      this.search(params, pageShowLeft);
    },
    searchRight(pageShowRight = true) {
      if (!pageShowRight) {
        this.leftPage.currentPage = 1;
        this.rightPage.currentPage = 1;
      }
      this.search({
        ...this.searchForm,
        pageSize: this.leftPage.pageSize,
        currentPage: this.leftPage.currentPage
      });
      this.searchParams({
        ...this.searchForm,
        pageSize: this.rightPage.pageSize,
        currentPage: this.rightPage.currentPage
      });
    },
    search(params, pageShowLeft = true) {
      this.pageShowLeft = pageShowLeft;
      findDcDataPageHttp(params).then(data => {
        this.pageShowLeft = true;
        const res = data.data;
        if (res.code == 200) {
          this.tableData.data = res.data.dcDataPage.data;
          this.leftPage.total = res.data.dcDataPage.total;
          this.leftPage.currentPage = res.data.dcDataPage.currentPage;
          this.pageShowLeft = true;
          return;
        }
        this.$message({ message: res.message, type: "error" });
      });
    },
    searchParams(params, pageShowRight = true) {
      this.pageShowRight = pageShowRight;
      findDcParamPageHttp(params).then(data => {
        this.pageShowRight = true;
        const res = data.data;
        if (res.code == 200) {
          this.tableParamsData.tableHead = JSON.parse(
            JSON.stringify(this.tableHead)
          );
          res.data.dcParamColumnHead.forEach(element => {
            this.tableParamsData.tableHead.push({
              column_name: element,
              column_comment: element
            });
          });
          this.tableParamsData.tableData = res.data.dcParamPage.data;
          this.rightPage.total = res.data.dcParamPage.total;
          this.pageShowLeft = true;
          return;
        }

        this.$message({ message: res.message, type: "error" });
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChangeLeft(pageSize) {
      this.leftPage.pageSize = pageSize;
      this.leftPage.currentPage = 1;
      this.searchLeft();
    },
    handleCurrentChangeLeft(currentPage) {
      this.leftPage.currentPage = currentPage;
      this.searchLeft();
    },
    handleSizeChangeRight(pageSize) {
      this.rightPage.pageSize = pageSize;
      this.rightPage.currentPage = 1;
      this.searchRight();
    },
    handleCurrentChangeRight(currentPage) {
      this.rightPage.currentPage = currentPage;
      this.searchRight();
    },
    handleSelectionChangeLeft(val) {
      this.checkedListLeft = val;
      console.log(val);
    },
    handleSelectionChangeRight(val) {
      this.checkedListRight = val;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.leftPage.currentPage = 1;
      this.rightPage.currentPage = 1;
      this.tableParamsData.tableData = [];
      this.searchLeft(false);
      this.rightPage.total = 0;
      this.pageShowRight = false;
    },
    //左边导出开始
    handleExportLeft() {
      if (this.checkedListLeft.length === 0) {
        this.exportHttpLeft();
      }
      if (this.checkedListLeft.length > 0) {
        this.checkedListLeft.map(item => {
          item.collectionType = item.collectionType === 10 ? "LOT" : "资源";
        });
        this.exportResultLeft(this.checkedListLeft);
      }
    },
    exportHttpLeft() {
      let params = {
        ...this.searchForm,
        pageSize: 0,
        currentPage: this.leftPage.currentPage
      };
      findDcDataPageHttp(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.exportResultLeft(res.data.dcDataPage.data);
          return;
        }
        this.$message({ message: res.message, type: "error" });
      });
    },
    exportResultLeft(data) {
      const tipString = exportExcel(
        this.tHeaderLeft,
        this.filterValLeft,
        data,
        this.fileNameLeft
      );
      if (tipString === undefined) {
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    },
    //左边导出结束
    // 右边导出开始
    handleExportRight() {
      this.clonetHeaderRight = _.cloneDeep(this.tHeaderRight);
      this.clonefilterValRight = _.cloneDeep(this.filterValRight);
      if (this.checkedListRight.length === 0) {
        this.exportHttpRight();
      }
      if (this.checkedListRight.length > 0) {
        if (parseInt(this.tableParamsData.tableData[0].collectionType) === 10) {
          this.clonetHeaderRight.push("LOT");
          this.clonefilterValRight.push("lot");
        }
        if (parseInt(this.tableParamsData.tableData[0].collectionType) === 20) {
          this.clonetHeaderRight.push("资源");
          this.clonefilterValRight.push("resource");
        }
        this.tableParamsData.tableHead.forEach(element => {
          this.clonetHeaderRight.push(element.column_name);
          this.clonefilterValRight.push(element.column_name);
        });
        this.exportResultRight(this.checkedListRight);
      }
    },
    exportHttpRight() {
      let params = {
        ...this.searchForm,
        pageSize: 0,
        currentPage: this.rightPage.currentPage
      };
      findDcParamPageHttp(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          if (parseInt(res.data.dcParamPage.data[0].collectionType) === 10) {
            this.clonetHeaderRight.push("LOT");
            this.clonefilterValRight.push("lot");
          }
          if (parseInt(res.data.dcParamPage.data[0].collectionType) === 20) {
            this.clonetHeaderRight.push("资源");
            this.clonefilterValRight.push("resource");
          }
          res.data.dcParamColumnHead.forEach(element => {
            this.clonetHeaderRight.push(element);
            this.clonefilterValRight.push(element);
          });
          this.exportResultRight(res.data.dcParamPage.data);
          return;
        }
        this.$message({ message: res.message, type: "error" });
      });
    },
    exportResultRight(data) {
      const tipString = exportExcel(
        this.clonetHeaderRight,
        this.clonefilterValRight,
        data,
        this.fileNameRight
      );
      if (tipString === undefined) {
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    }
    // 右边导出结束
  }
};
</script>

<style lang="scss">
.dc-search {
}
</style>
