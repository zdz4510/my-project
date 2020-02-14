<template>
  <div class="standingMaintenance">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :inline="true" :model="standingForm" ref="standingForm" label-width="70px">
        <el-form-item label="产线">
          <dsn-input v-model="standingForm.workCenterRelation" placeholder="请输入产线"></dsn-input>
        </el-form-item>
        <el-form-item label="站位">
          <dsn-input v-model="standingForm.station" placeholder="请输入站位"></dsn-input>
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
          :disabled="selectionList.length < 1"
          @click="handleEdit"
        >修改</dsn-button>
        <dsn-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          :disabled="selectionList.length < 1"
          @click="handleDelete"
        >删除</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-download"
          @click="importDialog = true"
        >导入</dsn-button>
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
        <el-table-column prop="station" label="站位" width="60"></el-table-column>
        <el-table-column prop="stationDes" label="站位描述" width="100"></el-table-column>
        <el-table-column prop="padIp" label="IP地址" width="120"></el-table-column>
        <el-table-column prop="resource" label="设备" width="100"></el-table-column>
        <el-table-column prop="workCenter" label="工作中心" width="100"></el-table-column>
        <el-table-column prop="workCenterRelation" label="产线" width="80"></el-table-column>
        <el-table-column prop="status" label="状态" width="60"></el-table-column>
        <el-table-column prop="stationType" label="站位类型" width="100"></el-table-column>
        <el-table-column prop="fullQty" label="满站数量" width="100"></el-table-column>
        <el-table-column prop="name" label="总在制" width="100"></el-table-column>
        <el-table-column prop="address" label="站内在制" show-overflow-tooltip></el-table-column>
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
    <!-- 导入模态框start -->
    <el-dialog title="导入" :visible.sync="importDialog" width="30%">
      <span>
        <div class="import">
          <dsn-button size="small" type="primary" @click="downLoad">下载导入模板</dsn-button>
        </div>
        <div class="import">
          <!-- <dsn-button size="small" type="primary" @click="upLoad">上传导入文件</dsn-button> -->
          <el-upload
            ref="upload"
            :action="`${host}/mes/station/station/import`"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="importDialog = false">取消上传</dsn-button>
        <dsn-button type="primary" @click="handleImport">确定上传</dsn-button>
      </span>
    </el-dialog>
    <!-- 导入模态框end -->
    <!-- 删除模态框start -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="deleteDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleDelete">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 删除模态框end -->
  </div>
</template>

<script>
import {
  findPageHttp,
  deleteStationBatchHttp,
  findResourceGroupListHttp
  // importHttp
} from "@/api/maintenance/standing.api.js";
import { mapMutations } from "vuex";
import { exportExcel } from "@/until/excel.js";

const tHeader = [
  "站位",
  "站位描述",
  "IP地址",
  "设备",
  "工作中心",
  "产线",
  "状态",
  "站位类型",
  "满站数量",
  "总在制",
  "站内在制"
];
const filterVal = [
  "station",
  "stationDes",
  "padIp",
  "resource",
  "workCenter",
  "workCenterRelation",
  "status",
  "stationType",
  "fullQty",
  //总在制 站内在制暂时没有
  "name",
  "address"
];
const fileName = "站位维护表";
export default {
  data() {
    return {
      tHeader,
      filterVal,
      fileName,
      standingForm: {
        //产线
        workCenterRelation: "",
        //站位
        station: ""
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      selectionList: [],
      stations: [],
      deleteDialog: false,
      importDialog: false,
      host: `${window.VUE_APP_URL}`,
      fileList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["STANDINGLIST"]),
    //初始化数据
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        station: this.standingForm.station,
        workCenterRelation: this.standingForm.workCenterRelation
      };
      findPageHttp(data).then(data => {
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
      console.log(11);
      this.init();
    },
    //重置
    handleReset() {
      this.standingForm.station = "";
      this.standingForm.workCenterRelation = "";
      this.init();
    },
    //新增
    handleAdd() {
      this.STANDINGLIST([]);
      this.$router.push({
        name: "standingMaintenanceEdit",
        query: { operateType: "add" }
      });
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
      const data = this.selectionList;
      deleteStationBatchHttp(data).then(data => {
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
    //确认上传
    handleImport() {
      this.$refs.upload.submit();
    },
    //下载模板
    downLoad() {
      findResourceGroupListHttp();
      this.importDialog = false;
    },
    //上传文件
    upLoad() {},
    //未选择导出请求数据
    exportHttp() {
      const request = {
        currentPage: this.currentPage,
        pageSize: 0,
        station: this.standingForm.station,
        workCenterRelation: this.standingForm.workCenterRelation
      };
      findPageHttp(request).then(data => {
        const res = data.data;
        if (res.code === 200) {
          data = res.data.data;
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
    },
    //上传文件start
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //上传成功的返回值
    handleSuccess(response) {
      if (response.code === 200) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.importDialog = false;
        this.init();
        return;
      }
      this.$message({
        message: response.message,
        type: "warning"
      });
      console.log(response);
    },
    //上传失败
    handleError(err) {
      console.log(err);
    }
    //上传文件end
  }
};
</script>

<style lang="scss">
.standingMaintenance {
  .el-dialog {
    text-align: center;
    .import {
    }
  }
}
</style>
