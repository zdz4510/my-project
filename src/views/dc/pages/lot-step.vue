<template>
  <div class="lotStep">
    <div class="query">
      <div class="left">
        <el-form
          :model="lotStepForm"
          :inline="true"
          ref="lotStepForm"
          :rules="lotStepFormRules"
          label-width="100px"
          class="lotStepForm"
        >
          <el-form-item label="LOT" prop="lot">
            <el-input
              class="lot"
              v-model.trim="lotStepForm.lot"
              placeholder="请输入LOT"
            ></el-input>
            <i class="el-icon-document" @click="goQuery"></i>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model.trim="lotStepForm.remark"
              placeholder="请输入备注"
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
      <el-button size="small" type="primary">
        LOT状态置为完成
      </el-button>
      <el-dropdown @command="handleCommand">
        <el-button type="primary" size="small">
          步骤操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="clear">清除步骤</el-dropdown-item>
          <el-dropdown-item command="byPass">绕过步骤</el-dropdown-item>
          <el-dropdown-item command="stepDone">
            将整个数量置于队列中
          </el-dropdown-item>
          <el-dropdown-item command="lotDone">
            将步骤标记为已完成
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button size="small" type="primary">
        保存
      </el-button>
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
        @selection-change="handleSelectionChange"
        @cell-dblclick="cellDblClick"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="stepId" label="步骤" width="120">
        </el-table-column>
        <el-table-column prop="operation" label="工序" width="120">
        </el-table-column>
        <el-table-column prop="operationDes" label="描述" width="170">
        </el-table-column>

        <el-table-column prop="stepStatus" label="步骤状态" width="120">
        </el-table-column>
        <el-table-column prop="qtyInQueue" label="排队中数量" width="170">
        </el-table-column>
        <el-table-column
          prop="qtyInWork"
          label="在制数量"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination">
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
    </div> -->
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
import { findLotStepStatusHttp } from "@/api/dc/lot.step.api.js";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      lotStepForm: {
        lot: "",
        remark: ""
      },
      lotStepFormRules: {
        lot: [{ required: true, message: "请输入lot", trigger: "blur" }]
      },
      tableData: [],
      selectionList: [],
      //分页
      // currentPage: 1,
      // pagesize: 10,
      // total: 0,
      deleteDialog: false,
      queryLots: [
        "FIXED2020/01/1300000116MAT1",
        "FIXED2020/01/1300000118MAT1",
        "FIXED2020/01/1300000120MAT1"
      ]
    };
  },
  created() {
    if (this.lotQueryList.length === 1) {
      this.lotStepForm.lot = this.lotQueryList[0];
    }
    if (this.lotQueryList.length > 1) {
      this.lotStepForm.lot = "已选择" + this.lotQueryList.length + "个";
    }
  },
  computed: {
    ...mapGetters(["lotQueryList"])
  },
  methods: {
    ...mapMutations(["LOTSTEPDETAILLIST"]),
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
    //双击单元格
    cellDblClick(row) {
      this.LOTSTEPDETAILLIST(row);
      this.$router.push({ name: "lotStepDetail" });
    },
    //点击步骤操作菜单栏
    handleCommand(command) {
      console.log(command);
    },
    // //更改当前页码,再次请求数据
    // handleCurrentChange(currentChange) {
    //   this.currentPage = currentChange;
    //   this.init();
    // },
    // //更改页码大小
    // handlePagesize(pagesize) {
    //   this.pagesize = pagesize;
    //   this.currentPage = 1;
    // },
    //跳转到查询LOT界面
    goQuery() {
      this.$router.push({ name: "lotQuery" });
    },
    handleDelete() {},
    handleQuery() {
      const data = this.queryLots;
      findLotStepStatusHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleReset() {
      this.lotStepForm.lot = "";
      this.tableData = [];
    }
  }
};
</script>

<style lang="scss">
.lotStep {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
    .el-dropdown {
      margin: 0 10px;
    }
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    .left {
      .lot {
        width: 90%;
      }
    }
    .right {
      // width: 680px;
      padding: 5px 30px;
    }
  }
}
</style>
