<template>
  <div class="working-certificate-maintenance">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :inline="true" :model="workCertificateForm" ref="workCertificateForm">
        <el-form-item label="上岗证">
          <dsn-input v-model="workCertificateForm.cert" placeholder="请输入上岗证"></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="handleQuery">查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="handleReset">重置</dsn-button>
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
        <dsn-button size="small" type="success" icon="el-icon-folder-add" @click="handleAdd">新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          :disabled="selectionList.length !== 1"
          @click="handleEdit"
        >修改</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          :disabled="selectionList.length <= 0"
          @click="deleteInfo"
        >删除</dsn-button>
        <!-- <dsn-button size="small" type="primary" @click="handleExport"
        >导出</dsn-button
        >-->
        <dsn-button size="small" type="primary" icon="el-icon-upload2" @click="handleExport">导出</dsn-button>
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
        <el-table-column type="index" label="序号" width="45"></el-table-column>
        <el-table-column prop="cert" label="上岗证" width="140"></el-table-column>
        <el-table-column prop="certDes" label="上岗证描述" width="140"></el-table-column>
        <el-table-column prop="status" label="状态" width="140">
          <template slot-scope="scope">
            {{ scope.row.status ? "已启用" : "未启用" }}
            <!-- {{ scope.row.status | filterStatus }} -->
          </template>
        </el-table-column>
        <el-table-column prop="certType" label="持续时间类型" width="150">
          <template slot-scope="scope">
            <!-- {{ scope.row.certType | filterCertType }} -->
            {{ scope.row.certType ? "永久" : "临时" }}
          </template>
        </el-table-column>
        <el-table-column prop="certTime" label="上岗证持续截止时间" show-overflow-tooltip></el-table-column>
      </dsn-table>
      <dsn-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="currentPage"
        @size-change="handlePagesize"
        @current-change="handleCurrentChange"
      ></dsn-pagination>
      <!-- 表格数据end -->
    </DsnPanel>
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="deleteDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleDelete">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  listCertHttp,
  deleteHttp
} from "@/api/maintenance/working.certificate.api.js";
import { mapMutations } from "vuex";
import { exportExcel } from "@/until/excel.js";

const tHeader = [
  "上岗证",
  "上岗证描述",
  "状态",
  "持续时间类型",
  "上岗证持续截止时间"
];
const filterVal = ["cert", "certDes", "status", "certType", "certTime"];
const fileName = "上岗证维护表";
export default {
  data() {
    return {
      tHeader,
      filterVal,
      fileName,
      workCertificateForm: {
        //上岗证
        cert: ""
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      selectionList: [],
      stations: [],
      deleteDialog: false
    };
  },
  filters: {
    // filterStatus(value) {
    //   if (value) {
    //     return "已启用";
    //   }
    //   return "未启用";
    // },
    // filterCertType(value) {
    //   if (value) {
    //     return "永久";
    //   }
    //   return "临时";
    // }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["WORKINGCERTIFICATELIST"]),
    //初始化数据
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        cert: this.workCertificateForm.cert
      };
      listCertHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.total = res.data.total;
          this.tableData = res.data.data;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.init();
    },
    //模糊查询建议
    querySearch() {},
    //模糊查询后选择
    handleSelect() {},
    //复选框选择
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //查询
    handleQuery() {
      this.init();
    },
    //重置
    handleReset() {
      this.workCertificateForm.cert = "";
      this.init();
    },
    //新增
    handleAdd() {
      this.WORKINGCERTIFICATELIST([]);
      this.$router.push({
        name: "workingCertificateMaintenanceEdit",
        query: { operateType: "add" }
      });
    },
    //编辑
    handleEdit() {
      const tempArr = JSON.parse(JSON.stringify(this.selectionList));
      this.WORKINGCERTIFICATELIST(tempArr);
      this.$router.push({
        name: "workingCertificateMaintenanceEdit",
        query: { operateType: "edit" }
      });
    },
    deleteInfo() {
      if (this.selectionList.length == 0) {
        this.$message({
          message: "请先选中需要删除的行",
          type: "warning"
        });
        return;
      }
      this.$confirm("是否删除所选数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete() {
      const data = [];
      this.selectionList.forEach(element => {
        data.push(element.cert);
      });
      deleteHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteDialog = false;
          this.init();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.deleteDialog = false;
      });
    },
    //未选择导出请求数据
    exportHttp() {
      const request = {
        currentPage: this.currentPage,
        pageSize: 0,
        cert: this.workCertificateForm.cert
      };
      listCertHttp(request).then(data => {
        const res = data.data;
        if (res.code === 200) {
          data = res.data.data;
          //"status", "certType"
          data.forEach(element => {
            element.status = element.status ? "已启用" : "未启用";
            element.certType = element.certType ? "永久" : "临时";
          });
          this.exportResult(data);
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //导出
    handleExport() {
      if (this.selectionList.length === 0) {
        this.exportHttp();
      }
      if (this.selectionList.length > 0) {
        const data = this.selectionList;
        this.exportResult(data);
      }
    },
    //返回结果，提示信息
    exportResult(data) {
      const tipString = exportExcel(tHeader, filterVal, data, this.fileName);
      if (tipString === undefined) {
        this.$message({
          message: "导出成功",
          type: "success"
        });
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    }
  }
};
</script>

<style lang="scss">
.working-certificate-maintenance {
}
</style>
