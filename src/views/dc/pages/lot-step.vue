<template>
  <div class="lotStep">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form
        :model="lotStepForm"
        :inline="true"
        ref="lotStepForm"
        :rules="lotStepFormRules"
        class="lotStepForm"
      >
        <el-form-item label="LOT" prop="lot">
          <el-row>
            <el-col :span="22">
              <dsn-input
                class="lot"
                v-model.trim="lotStepForm.lot"
                placeholder="请输入LOT"
                @clear="clearLot"
              ></dsn-input>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-document" @click="goQuery"></i>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="备注" prop="comment ">
          <dsn-input v-model.trim="lotStepForm.comment" placeholder="请输入备注"></dsn-input>
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
      <!-- 查询结果start -->
      <div class="operate">
        <dsn-button size="small" type="primary" @click="handleSetFinish">LOT状态置为完成</dsn-button>
        <el-dropdown @command="handleCommand">
          <dsn-button type="primary" size="small">
            步骤操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </dsn-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="clear">清除步骤</el-dropdown-item>
            <el-dropdown-item command="byPass">绕过步骤</el-dropdown-item>
            <el-dropdown-item command="inQueue">将整个数量置于队列中</el-dropdown-item>
            <el-dropdown-item command="stepDone">将步骤标记为已完成</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <dsn-button size="small" type="primary" @click="checkSaveRule">保存</dsn-button>
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
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="stepId" label="步骤" width="120"></el-table-column>
          <el-table-column prop="operation" label="工序" width="120"></el-table-column>
          <el-table-column prop="operationDes" label="描述" width="170"></el-table-column>

          <el-table-column prop="stepStatus" label="步骤状态" width="120"></el-table-column>
          <el-table-column prop="qtyInQueue" label="排队中数量" width="170"></el-table-column>
          <el-table-column prop="qtyInWork" label="在制数量" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </DsnPanel>
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
    </div>-->
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
  findLotStepStatusHttp,
  setLotsStatusDoneHttp,
  saveLotStepStatusHttp,
  getLotStepChangRuleHttp
} from "@/api/dc/lot.step.api.js";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      lotStepForm: {
        lot: "",
        comment: ""
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
        // "FIXED2020/01/1300000116MAT1",
        // "FIXED2020/01/1300000118MAT1",
        // "FIXED2020/01/1300000120MAT1"
      ],
      stepStatusList: [],
      stepIdList: [],
      cloneLotQueryList: []
    };
  },
  created() {
    if (this.lotStepAllInfo.length > 0) {
      this.lotStepForm = this.lotStepAllInfo[0].lotStepForm;
      this.queryLots = this.lotStepAllInfo[0].queryLots;
      this.stepStatusList = this.lotStepAllInfo[0].stepStatusList;
      this.stepIdList = this.lotStepAllInfo[0].stepIdList;
      this.tableData = this.lotStepAllInfo[0].tableData;
    }
    console.log(this.lotStepAllInfo);
    if (this.lotQueryList.length === 1) {
      console.log(this.lotQueryList.length);
      this.lotStepForm.lot = this.lotQueryList[0].lot;
    }
    if (this.lotQueryList.length > 1) {
      this.lotStepForm.lot = "已选择" + this.lotQueryList.length + "个";
    }
    this.cloneLotQueryList = JSON.parse(JSON.stringify(this.lotQueryList));
  },
  computed: {
    ...mapGetters(["lotQueryList", "lotStepDetailList", "lotStepAllInfo"])
  },
  methods: {
    ...mapMutations(["LOTSTEPDETAILLIST", "LOTQUERYLIST", "LOTSTEPALLINFO"]),
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
      this.stepIdList = [];
      this.selectionList.forEach(element => {
        this.stepIdList.push(element.stepId);
      });
    },
    //双击单元格
    cellDblClick(row) {
      this.LOTSTEPDETAILLIST(row);
      const tempData = [
        {
          lotStepForm: this.lotStepForm,
          tableData: this.tableData,
          queryLots: this.queryLots,
          stepStatusList: this.stepStatusList,
          stepIdList: this.stepIdList
        }
      ];
      console.log(tempData);
      this.LOTSTEPALLINFO(tempData);
      this.$router.push({ name: "lotStepDetail" });
    },
    //点击步骤操作菜单栏
    handleCommand(command) {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "请至少选择一行数据进行操作！",
          type: "warning"
        });
        return;
      }

      //清除步骤
      if (command === "clear") {
        this.stepOperate("", "CLEAR");
      }
      //步骤绕过
      if (command === "byPass") {
        this.stepOperate("已绕过", "BYPASS");
      }
      //步骤已完成
      if (command === "stepDone") {
        this.stepOperate("已完成", "STEPDONE");
      }
      //整个数量置于队列中
      if (command === "inQueue") {
        this.inQueue();
      }
    },
    //步骤操作
    stepOperate(stepStatus, changeType) {
      this.stepIdList.forEach(stepId => {
        this.tableData.find(item => {
          if (item.stepId === stepId) {
            item.stepStatus = stepStatus;
            item.qtyInQueue = 0;
            item.qtyInWork = 0;
          }
        });
      });
      this.selectionList.forEach(element => {
        this.stepStatusList.push({
          changeType,
          stepId: element.stepId
        });
      });
    },
    //整个数量置于队列中
    inQueue() {
      let stepSequence = 0;
      this.selectionList.forEach(element => {
        if (element.stepSequence > stepSequence) {
          stepSequence = element.stepSequence;
        }
      });
      console.log(stepSequence);
      let count = 1;
      this.tableData.forEach(element => {
        if (element.stepSequence === stepSequence) {
          element.stepStatus = "排队中";
          element.qtyInQueue = count++; //待修改
          element.qtyInWork = 0;
        }
        if (element.stepSequence > stepSequence) {
          element.stepStatus = "";
          element.qtyInQueue = 0;
          element.qtyInWork = 0;
        }
        if (
          element.stepSequence < stepSequence &&
          element.stepStatus !== "已完成"
        ) {
          element.stepStatus = "已绕过";
          element.qtyInQueue = 0;
          element.qtyInWork = 0;
        }
      });
      this.selectionList.forEach(element => {
        this.stepStatusList.push({
          changeType: "INQUEUE",
          stepId: element.stepId
        });
      });
    },
    //跳转到查询LOT界面
    goQuery() {
      if (this.queryLots.length > 1) {
        this.LOTQUERYLIST(this.cloneLotQueryList);
        this.$router.push({
          name: "lotQuery",
          query: { lot: "" }
        });
      } else {
        this.$router.push({
          name: "lotQuery",
          query: { lot: this.lotStepForm.lot }
        });
      }
    },
    handleDelete() {},
    handleQuery() {
      this.queryLots = [];
      if (this.cloneLotQueryList.length > 0) {
        this.cloneLotQueryList.forEach(element => {
          this.queryLots.push(element.lot);
        });
      } else {
        this.queryLots.push(this.lotStepForm.lot);
      }
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
      this.lotStepForm.comment = "";
      this.lotStepForm.lot = "";
      this.tableData = [];
      this.queryLots = [];
      this.stepStatusList = [];
      this.cloneLotQueryList = [];
      this.stepIdList = [];
    },
    handleSetFinish() {
      if (this.tableData.length === 0) {
        this.$message({
          message: "请先执行查询后再进行操作！",
          type: "warning"
        });
        return;
      }
      getLotStepChangRuleHttp({ ruler: "COMMENT_REQUIRED" }).then(data => {
        const res = data.data;
        if (res.code === 200) {
          if (res.data === "yes") {
            if (this.lotStepForm.comment === "") {
              this.$message({
                type: "warning",
                message: "请填写备注！"
              });
              return;
            }
            this.confirmStatusIdFinish();
          } else {
            this.confirmStatusIdFinish();
          }
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //是否确认将LOT的状态置为完成弹框
    confirmStatusIdFinish() {
      this.$confirm("是否确认将LOT的状态置为完成？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setFinishHttp();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //请求LOT的状态置为完成
    setFinishHttp() {
      const lots = [];
      this.selectionList.forEach(element => {
        lots.push(element.lot);
      });
      const data = {
        comment: this.lotStepForm.comment,
        lots
      };
      setLotsStatusDoneHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.handleQuery();
          this.$message({
            type: "success",
            message: res.message
          });
          return;
        }
        this.$message({
          type: "warning",
          message: res.message
        });
      });
    },
    checkSaveRule() {
      getLotStepChangRuleHttp({ ruler: "COMMENT_REQUIRED" }).then(data => {
        const res = data.data;
        if (res.code === 200) {
          if (res.data === "yes") {
            if (this.lotStepForm.comment === "") {
              this.$message({
                type: "warning",
                message: "请填写备注！"
              });
              return;
            }
            this.handleSave();
          } else {
            this.handleSave();
          }
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleSave() {
      if (this.tableData.length === 0) {
        this.$message({
          type: "warning",
          message: "请先执行查询后再进行操作"
        });
        return;
      }
      if (this.stepStatusList.length === 0) {
        this.$message({
          type: "warning",
          message: "请先执行“步骤操作”后再进行操作！"
        });
        return;
      }
      const tempList = this.tableData.filter(item => {
        return item.stepStatus === "排队中" || item.stepStatus === "工作中";
      });
      if (tempList.length === 0) {
        this.$message({
          type: "warning",
          message:
            "LOT必须在某一步骤为”排队中“或”工作中“的状态，才允许执行”保存“操作"
        });
        return;
      }
      const data = {
        comment: this.lotStepForm.comment,
        lots: this.queryLots,
        stepStatus: this.stepStatusList
      };
      saveLotStepStatusHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
          //保存成功清空步骤记录数组
          this.stepStatusList = [];
          return;
        }
        this.$message({
          type: "error",
          message: res.message
        });
      });
    },
    //lot输入框清空
    clearLot() {
      this.queryLots = [];
      this.stepStatusList = [];
      this.cloneLotQueryList = [];
    }
  }
};
</script>

<style lang="scss">
.lotStep {
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
