<template>
  <div class="dc-search">
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="接收值:" prop="resource">
              <dsn-input v-model="searchForm.resource" placeholder="请输入接收值"></dsn-input>
            </el-form-item>
            <el-form-item label="数据收集组名称:" prop="dcGroup">
              <dsn-input v-model="searchForm.dcGroup" placeholder="请输入数据收集组名称"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
                v-show="searchForm.dcGroup===''"
                size="small"
                type="primary"
                icon="el-icon-search"
                @click="search"
              >查询</dsn-button>
              <dsn-button
                v-show="searchForm.dcGroup!==''"
                size="small"
                type="primary"
                icon="el-icon-search"
                @click="searchRight"
              >查询</dsn-button>
              <dsn-button
                size="small"
                type="primary"
                icon="el-icon-refresh"
                @click="resetForm('searchForm')"
              >重置</dsn-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 查询条件end -->
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <!-- 表格操作start -->
      <div class="operate">
        <dsn-button size="small" type="primary" icon="el-icon-upload2" @click="handleExport">导出</dsn-button>
      </div>
      <!-- 表格操作end -->
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="已收集数据收集组清单" name="清单">
          <!-- 已收集数据收集组清单表格数据start -->
          <dsn-table
            ref="multipleTable"
            :data="this.tableData.data"
            tooltip-effect="dark"
            row-key="mat"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="dcGroup" label="数据收集组"></el-table-column>
            <el-table-column prop="collectionType" label="收集类型">
              <template slot-scope="scope">{{ parseInt(scope.row.collectionType)===10?"LOT":"资源"}}</template>
            </el-table-column>
            <el-table-column prop="resourceGroup" label="设备组"></el-table-column>
            <el-table-column prop="resource" label="设备编号"></el-table-column>
            <el-table-column prop="material" label="物料号"></el-table-column>
            <el-table-column prop="materialGroup" label="物料组"></el-table-column>
            <el-table-column prop="shopOrder" label="工单号"></el-table-column>
            <el-table-column prop="workCenter" label="工作中心"></el-table-column>
            <el-table-column prop="operation" label="工序"></el-table-column>
            <el-table-column prop="testPass" label="校验结果"></el-table-column>
            <el-table-column prop="createUserName" label="创建人"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
          </dsn-table>
          <dsn-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.page.currentPage"
            :page-sizes="[1, 10, 15, 20, 30, 50]"
            :page-size="this.page.pageSize"
            layout="->, total, prev, pager, next, sizes"
            :total="this.page.total"
          ></dsn-pagination>
          <!-- 已收集数据收集组清单表格数据end -->
        </el-tab-pane>
        <el-tab-pane label="已收集数据收集组参数清单" :disabled="searchForm.dcGroup===''" name="参数清单">
          <!-- 已收集数据收集组参数清单表格数据start -->
          <dsn-table
            border
            :data="tableParamsData.data"
            @selection-change="handleSelectionChange2"
            row-key="mat"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <template v-for="(item,index) in tableParamsData.tableHead">
              <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index"></el-table-column>
            </template>
          </dsn-table>
          <!-- 已收集数据收集组参数清单表格数据end -->
          <!-- 分页start -->
          <dsn-pagination
            class="mtb20"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.page.currentPage"
            :page-sizes="[1, 10, 15, 20, 30, 50]"
            :page-size="this.page.pageSize"
            layout="->, total, prev, pager, next, sizes"
            :total="this.page.total"
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
import { exportExcel } from "@/until/excel.js";
let tableHead = [
  {
    column_name: "resource",
    column_comment: "接收值"
  },
  {
    column_name: "collectionType",
    column_comment: "收集类型"
  },
  {
    column_name: "dcGroup",
    column_comment: "数据收集组"
  }
];
export default {
  name: "dc-search",
  data() {
    return {
      tHeader: [
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
      ],
      filterVal: [
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
      ],
      fileName: "独立数据查询报表维护表",
      show: true,
      checkedList: [],
      formLabelWidth: "200px",
      searchForm: {
        resource: "",
        dcGroup: "",
        collectionType: "10",
        tenantSiteCode: "test"
      },
      rules: {
        collectionType: [
          { required: true, message: "请选择收集类型", trigger: "blur" }
        ]
      },
      collectionType: [
        {
          value: "10",
          label: "LOT"
        },
        {
          value: "20",
          label: "资源"
        }
      ],
      tableData: {
        data: []
      },
      tableParamsData: {
        data: [],
        tableHead
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      const params = {
        tenantSiteCode: this.searchForm.tenantSiteCode,
        resource: this.searchForm.resource,
        dcGroup: this.searchForm.dcGroup,
        collectionType: this.searchForm.collectionType,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage
      };
      this.searchLeft(params);
      this.searchRight(params);
    },
    searchLeft(params) {
      findDcDataPageHttp(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.tableData.data = res.data.dcDataPage.data;
          this.page.total = res.data.dcParamPage.total;
          return;
        }
        this.$message({ message: res.message, type: "error" });
      });
    },
    searchRight(params) {
      findDcParamPageHttp(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          res.data.dcParamColumnHead.forEach(element => {
            this.tableParamsData.tableHead.push({
              column_name: element,
              column_comment: element
            });
          });
          this.page.total = res.data.dcParamPage.total;
          return;
        }
        this.$message({ message: res.message, type: "error" });
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.page.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.search();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
      console.log(val);
    },
    handleSelectionChange2(val) {
      this.checkedList = val;
      console.log(val);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    // exportExcel(){
    // 	let data = this.searchForm
    // 	// exportExcelData(params).then(data => {
    // 	// 	console.log(data)
    // 	// })
    // 	// console.log(`${window.VUE_APP_URL}/mes/dcDataReport/exportExcel?collectionType=${data.collectionType}&dcGroup=${data.dcGroup}&resource=${data.resource}&tenantSiteCode=${data.tenantSiteCode}`)
    // 	window.location.href=`${window.VUE_APP_URL}/mes/dcDataReport/exportExcel?collectionType=${data.collectionType}&dcGroup=${data.dcGroup}&resource=${data.resource}&tenantSiteCode=${data.tenantSiteCode}`
    // }
    //导出开始
    handleExport() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.checkedList.map(item => {
          item.status = item.status ? "已启用" : "未启用";
        });
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = {
        tenantSiteCode: this.searchForm.tenantSiteCode,
        resource: this.searchForm.resource,
        dcGroup: this.searchForm.dcGroup,
        collectionType: this.searchForm.collectionType,
        pageSize: 0,
        currentPage: this.page.currentPage
      };
      findDcDataPageHttp(params).then(data => {
        if (data.data.code == 200) {
          // this.show = data.data.data.isShowParamPage;
          if (this.show) {
            let tableHead = [
              {
                column_name: "resource",
                column_comment: "接收值"
              },
              {
                column_name: "collectionType",
                column_comment: "收集类型"
              },
              {
                column_name: "dcGroup",
                column_comment: "数据收集组"
              }
            ];

            data.data.data.dcParamColumnHead.forEach(function(val) {
              let obj = {};
              obj.column_name = val;
              obj.column_comment = val;
              tableHead.push(obj);
            });
            // this.tableParamsData.data = data.data.data.dcParamPage.data
            // this.tableParamsData.tableHead = tableHead
            // this.page.total = data.data.data.dcParamPage.total
            this.exportResult(data.data.data.dcParamPage.data);
          } else {
            // this.tableData.data = data.data.data.dcDataPage.data
            // this.page.total = data.data.data.dcDataPage.total
            this.exportResult(data.data.data.dcDataPage.data);
          }
        } else {
          this.$message.error(data.data.message);
        }
      });

      // let params= {
      // 	pageSize: 0,
      // 	currentPage: this.tableData.page.currentPage,
      // 	operation:this.searchForm.operation,
      // }
      // getOperationList(params).then(data => {
      // 	if(data.data.code == 200){
      // 		let res = data.data.data.data
      // 		res.map(item=>{
      // 			item.status = item.status ? '已启用' : '未启用'
      // 		})
      // 		this.exportResult(res);
      // 	}else{
      // 		this.$message.error(data.data.message)
      // 	}
      // })
    },
    exportResult(data) {
      const tipString = exportExcel(
        this.tHeader,
        this.filterVal,
        data,
        this.fileName
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
    //导出结束
  }
};
</script>

<style lang="scss">
.dc-search {
}
</style>
