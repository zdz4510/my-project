<template>
  <div class="data-collection">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules">
        <el-form-item label="数据收集组:" prop="dcGroup">
          <dsn-input v-model="searchForm.dcGroup"></dsn-input>
        </el-form-item>
        <el-form-item label="数据收集组类型:" prop="collectionType">
          <dsn-select v-model="searchForm.collectionType">
            <!-- <el-option
              v-for="item in collectionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>-->
            <el-option label="LOT" :value="10"></el-option>
            <el-option label="资源" :value="20"></el-option>
          </dsn-select>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="search">查询</dsn-button>
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
          type="success"
          icon="el-icon-folder-add"
          @click="add"
          :disabled="this.checkedList.length>0"
        >新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          @click="edit"
          :disabled="this.checkedList.length === 0"
        >编辑</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click="del"
          :disabled="this.checkedList.length === 0"
        >删除</dsn-button>
        <dsn-button size="small" type="primary" icon="el-icon-upload2" @click="handleExport">导出</dsn-button>
      </div>
      <!-- 表格操作end -->
      <!-- 表格数据start -->
      <dsn-table
        ref="multipleTable"
        :data="this.tableData.data"
        row-key="dcGroup"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="dcGroup" label="数据收集组"></el-table-column>
        <el-table-column label="数据收集组类型" width="110">
          <template slot-scope="scope">{{ getFormat(scope.row.collectionType) }}</template>
        </el-table-column>
        <el-table-column prop="dcGroupDes" label="数据收集描述" width="100"></el-table-column>
        <el-table-column prop="paramNum" label="参数数量"></el-table-column>
        <el-table-column prop="conditionNum" label="条件数量"></el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="135"></el-table-column>
        <el-table-column prop="modifyUserName" label="修改人"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间" width="135"></el-table-column>
      </dsn-table>
      <!-- 表格数据end -->
      <!-- 分页start -->
      <dsn-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.tableData.page.currentPage"
        :page-sizes="[1, 10, 15, 20, 30, 50]"
        :page-size="this.tableData.page.pageSize"
        layout="->, total, prev, pager, next, sizes"
        :total="this.tableData.page.total"
      ></dsn-pagination>
      <!-- 分页end -->
    </DsnPanel>
  </div>
</template>

<script>
import {
  getDataCollectionList,
  deleteDataCollection
} from "../../../api/data.collection.api";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
export default {
  name: "data-collection",
  data() {
    return {
      tHeader: [
        "数据收集组",
        "数据收集组类型",
        "数据收集描述",
        "创建人",
        "创建时间",
        "修改人",
        "修改时间"
      ],
      filterVal: [
        "dcGroup",
        "collectionType",
        "dcGroupDes",
        "createUserName",
        "createTime",
        "modifyUserName",
        "modifyTime"
      ],
      fileName: "数据收集维护表",
      checkedList: [],
      formLabelWidth: "120px",
      searchForm: {
        dcGroup: "",
        collectionType: "",
        tenantSiteCode: "test"
      },
      rules: {
        // process: [
        // 	{ required: true, message: '请输入工序名称', trigger: 'blur' },
        // ],
      },
      tableData: {
        data: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      },
      collectionType: [
        {
          value: "10",
          label: "物料"
        },
        {
          value: "20",
          label: "资源"
        },
        {
          value: "30",
          label: "工序"
        },
        {
          value: "40",
          label: "工单"
        }
      ]
    };
  },
  created() {
    this.search();
  },
  methods: {
    ...mapMutations(["SETDATACOLLECTIONEDITLIST"]),
    search() {
      let params = {
        dcGroup: this.searchForm.dcGroup,
        collectionType: this.searchForm.collectionType,
        pageSize: this.tableData.page.pageSize,
        currentPage: this.tableData.page.currentPage
      };
      getDataCollectionList(params).then(data => {
        if (data.data.code == 200) {
          this.tableData.data = data.data.data.data;
          this.tableData.page.total = data.data.data.total;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.tableData.page.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.tableData.page.currentPage = currentPage;
      this.search();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
      console.log(val);
    },
    add() {
      this.$router.push({ path: "/dc/addDataCollection" });
    },
    edit() {
      this.SETDATACOLLECTIONEDITLIST(this.checkedList);
      this.$router.push({ path: "/dc/editDataCollection" });
    },
    del() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = this.checkedList;
          deleteDataCollection(params).then(data => {
            if (data.data.code == 200) {
              this.$message.success("删除成功");
              this.$refs.multipleTable.clearSelection();
              this.search();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    getFormat(collectionType) {
      if (collectionType == "10") {
        return "LOT";
      } else if (collectionType == "20") {
        return "资源";
      } else if (collectionType == "30") {
        return "工序";
      } else if (collectionType == "40") {
        return "工单";
      }
    },
    // exportExcel(){
    // 	let data = this.searchForm
    // 	window.location.href=`${window.VUE_APP_URL}/mes/dcGroup/exportExcel?collectionType=${data.collectionType}&dcGroup=${data.dcGroup}&resource=${data.resource}&tenantSiteCode=${data.tenantSiteCode}`
    // },
    //导出开始
    handleExport() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.checkedList.map(item => {
          item.collectionType =
            item.collectionType == 10
              ? "LOT"
              : item.collectionType == 20
              ? "资源"
              : item.collectionType == 30
              ? "工序"
              : "工单";
        });
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = {
        dcGroup: this.searchForm.dcGroup,
        collectionType: this.searchForm.collectionType,
        pageSize: 0,
        currentPage: this.tableData.page.currentPage
      };
      getDataCollectionList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          res.map(item => {
            item.collectionType =
              item.collectionType == 10
                ? "LOT"
                : item.collectionType == 20
                ? "资源"
                : item.collectionType == 30
                ? "工序"
                : "工单";
          });
          this.exportResult(res);
        } else {
          this.$message.error(data.data.message);
        }
      });
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
.data-collection {
}
</style>
