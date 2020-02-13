<template>
  <div class="material-info">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        :rules="rules"
        class="form-style"
        :label-width="formLabelWidth"
      >
        <el-form-item label="物料号:" :label-width="formLabelWidth" prop="material">
          <dsn-input v-model="searchForm.material"></dsn-input>
        </el-form-item>
        <el-form-item label="版本号:" :label-width="formLabelWidth" prop="materialRev">
          <dsn-input v-model="searchForm.materialRev"></dsn-input>
        </el-form-item>
        <el-form-item label prop>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click.native="search">查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click.native="resetForm('searchForm')">重置</dsn-button>
        </el-form-item>
      </el-form>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
    <div class="operation">
      <dsn-button size="small" type="success" @click.native="add" icon="el-icon-folder-add" :disabled="this.checkedList.length>0">新增</dsn-button>
      <dsn-button
        size="small"
        type="primary"
        @click.native="edit"
        icon="el-icon-edit"
        :disabled="this.checkedList.length === 0"
      >编辑</dsn-button>
      <dsn-button
        size="small"
        type="danger"
        @click.native="del"
        icon="el-icon-delete"
        :disabled="this.checkedList.length === 0"
      >删除</dsn-button>
      <dsn-button size="small" type="primary" icon="el-icon-upload2" @click.native="handleExport">导出</dsn-button>
    </div>
      <dsn-table
        ref="multipleTable"
        :data="this.tableData.data"
        tooltip-effect="dark"
        row-key="material+materialRev"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="materialType" label="物料分类"></el-table-column>
        <el-table-column prop="material" label="物料号"></el-table-column>
        <el-table-column prop="materialRev" label="版本"></el-table-column>
        <el-table-column prop="currentRev" label="当前版本">
          <template slot-scope="scope">{{ scope.row.currentRev ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="产品状态">
          <template
            slot-scope="scope"
          >{{ scope.row.materialStatus === 'true' ? '已启用' : (scope.row.materialStatus === 'false' ? '未启用' : '--') }}</template>
        </el-table-column>
        <el-table-column prop="client" label="客户"></el-table-column>
        <el-table-column prop="vebdor" label="供应商"></el-table-column>
        <el-table-column prop="materialDes" label="物料描述"></el-table-column>
      </dsn-table>
      <dsn-pagination
        class="mtb20"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.tableData.page.currentPage"
        :page-sizes="[5, 10, 15, 20, 25,30]"
        :page-size="this.tableData.page.pageSize"
        layout="->, total, prev, pager, next, sizes, jumper"
        :total="this.tableData.page.total"
      ></dsn-pagination>
    </DsnPanel>
  </div>
</template>

<script>
import {
  getMaterialList,
  deleteMaterial
} from "../../../api/material.info.api";
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
export default {
  name: "material-info",
  data() {
    return {
      tHeader: [
        "物料分类",
        "物料号",
        "版本",
        "当前版本",
        "产品状态",
        "客户",
        "供应商",
        "物料描述"
      ],
      filterVal: [
        "materialType",
        "material",
        "materialRev",
        "currentRev",
        "materialStatus",
        "client",
        "vebdor",
        "materialDes"
      ],
      fileName: "物料维护表",
      checkedList: [],
      formLabelWidth: "100px",
      searchForm: {
        material: "",
        materialRev: "",
        tenantSiteCode: "",
        deleteFlag: false
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
      }
    };
  },
  created() {
    this.search();
  },
  methods: {
    ...mapMutations(["SETMATEDITLIST"]),
    search() {
      let params = {
        material: this.searchForm.material,
        materialRev: this.searchForm.materialRev,
        pageSize: this.tableData.page.pageSize,
        currentPage: this.tableData.page.currentPage
      };
      getMaterialList(params).then(data => {
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
    del() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMaterial(this.checkedList).then(data => {
            if (data.data.code == 200) {
              this.$message.success("删除成功");
              this.search();
              this.$refs.multipleTable.clearSelection();
            } else {
              this.$message.error(data.data.message);
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
    add() {
      this.$router.push({ path: "/material/addMaterial" });
    },
    edit() {
      this.SETMATEDITLIST(this.checkedList);
      this.$router.push({ path: "/material/editMaterial" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    //导出开始
    handleExport() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.checkedList.map(item => {
          item.materialStatus = item.materialStatus ? "已启用" : "未启用";
        });
        this.exportResult(this.checkedList);
      }
    },
    exportHttp() {
      let params = {
        material: this.searchForm.material,
        materialRev: this.searchForm.materialRev,
        pageSize: 0,
        currentPage: this.tableData.page.currentPage
      };
      getMaterialList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          res.map(item => {
            item.materialStatus = item.materialStatus ? "已启用" : "未启用";
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
// .material-info {
//   padding: 0 30px;
//   .search-bar {
//     padding: 10px;
//     .el-form {
//       .el-form-item {
//         margin-bottom: 0px;
//       }
//     }
//   }
//   .operate {
//     padding: 10px 5px;
//   }
// }
</style>
