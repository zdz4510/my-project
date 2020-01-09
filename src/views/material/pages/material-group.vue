<template>
  <div class="materialGroup">
    <div class="query">
      <div class="left">
        <el-form
          :model="materialGroupForm"
          ref="materialGroupForm"
          label-width="100px"
          class="materialGroupForm"
        >
          <el-form-item label="物料组" prop="materialGroup">
            <el-input
              v-model.trim="materialGroupForm.materialGroup"
              placeholder="请输入物料组"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="primary" @click="handleQuery">
          查询
        </el-button>
        <el-button size="small" type="primary" @click="handleReset">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="handleAdd">
        新增
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length <= 0"
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
      <el-button size="small" type="primary" @click="handleExport"
        >导出</el-button
      >
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="materialGroup" label="物料组" width="120">
        </el-table-column>
        <el-table-column
          prop="materialList.length"
          label="总物料数"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="groupDes" label="物料组描述" width="170">
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170">
        </el-table-column>
        <el-table-column prop="modifyUserName" label="修改人" width="120">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pagesize"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="currentPage"
        @size-change="handlePagesize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
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
// import {
//   findResourceGroupListHttp,
//   deleteResourceGroupHttp,
//   exportExcelHttp
// } from "@/api/device/type.api.js";
import { findPageHttp, deleteHttp } from "@/api/material/material.group.api.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      materialGroupForm: {
        materialGroup: ""
      },
      tableData: [],
      selectionList: [],
      //分页
      currentPage: 1,
      pagesize: 10,
      total: 0,
      deleteDialog: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["MATERIALGROUPLIST"]),
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        materialGroup: this.materialGroupForm.materialGroup
      };
      findPageHttp(data).then(data => {
        const res = data.data;
        console.log(res);
        const list = res.data.data;
        if (res.code === 200) {
          // this.pageShow = true;
          this.total = res.data.total;
          this.tableData = list;
          // this.materialGroupForm.materialGroup = "";
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pagesize) {
      this.pagesize = pagesize;
      this.currentPage = 1;
      this.init();
    },
    handleAdd() {
      this.selectionList = [];
      const emptyObj = { materialGroup: "", groupDes: "" };
      this.selectionList.push(emptyObj);
      this.MATERIALGROUPLIST(this.selectionList);
      this.$router.push({
        // path: "/device/materialGroupEdit",
        name: "materialGroupEdit",
        query: { operateType: "add" }
      });
    },
    handleEdit() {
      console.log(this.selectionList);
      this.MATERIALGROUPLIST(this.selectionList);
      this.$router.push({
        // path: "/device/materialGroupEdit",
        name: "materialGroupEdit",
        query: { operateType: "edit" }
      });
    },
    handleDelete() {
      deleteHttp(this.selectionList).then(data => {
        const res = data.data;
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.deleteDialog = false;
          this.init();
          return;
        }
        this.deleteDialog = false;
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleQuery() {
      this.init();
    },
    handleReset() {
      this.materialGroupForm.materialGroup = "";
      this.init();
    },
    handleExport() {
      //   const data = {
      //     materialGroup: this.materialGroupForm.materialGroup,
      //     groupDes: this.materialGroupForm.groupDes
      //   };
      //   exportExcelHttp(data);
    }
  }
};
</script>

<style lang="scss">
.materialGroup {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .right {
      width: 680px;
      padding: 5px 30px;
    }
  }
}
</style>
