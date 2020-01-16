<template>
  <div class="lotMerge">
    <div class="query">
      <div class="left">
        <el-form
          :model="lotForm"
          :inline="true"
          ref="lotForm"
          label-width="100px"
          class="lotForm"
          :rules="lotFormRules"
        >
          <el-form-item label="LOT" prop="lot">
            <el-input
              class="lot"
              v-model.trim="lotForm.lot"
              placeholder="请输入LOT"
            ></el-input>
            <i class="el-icon-document" @click="goQuery('queryLot')"></i>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button
          size="small"
          type="primary"
          @click="checkForm('lotForm', handleQuery)"
        >
          查询
        </el-button>
        <el-button size="small" type="primary" @click="handleReset">
          重置
        </el-button>
      </div>
    </div>
    <div class="showInfo">
      <div class="left">
        <el-form :model="showInfo" label-width="140px" class="demo-form-inline">
          <el-form-item label="状态：">
            <el-input
              v-model.trim="showInfo.status"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="操作：">
            <el-input
              v-model.trim="showInfo.operationList"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源：">
            <el-input
              v-model.trim="showInfo.resourceList"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="数量：">
            <el-input
              v-model.trim="showInfo.quantity"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-form :model="showInfo" label-width="140px" class="demo-form-inline">
          <el-form-item label="工单：">
            <el-input v-model.trim="showInfo.shopOrder" size="small"></el-input>
          </el-form-item>
          <el-form-item label="物料（版本）：">
            <el-input
              v-model.trim="showInfo.materialRev"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="工艺路线（版本）：">
            <el-input
              v-model.trim="showInfo.routerRev"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="merge">
      <div class="left">
        <el-form
          :model="lotMergeForm"
          :inline="true"
          ref="lotMergeForm"
          label-width="100px"
          class="lotMergeForm"
          :rules="lotMergeFormRule"
        >
          <el-form-item label="合并的LOT" prop="lot">
            <el-input
              class="mergeLot"
              v-model.trim="lotMergeForm.lot"
              placeholder="请输入LOT"
            ></el-input>
            <i class="el-icon-document" @click="goQuery('addMergeLot')"></i>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button
          size="small"
          type="primary"
          @click="checkForm('lotMergeForm', handleAddLot)"
        >
          添加
        </el-button>
        <el-button size="small" type="primary">
          合并
        </el-button>
        <el-button size="small" type="primary" @click="handleDelete">
          移除
        </el-button>
      </div>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="lot" label="LOT" width="200"> </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="80">
        </el-table-column>
        <el-table-column prop="createUserName" label="工序" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{ scope.row.operationList | operationFilter }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="资源" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.resourceList | resourceFilter
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shopOrder" label="工单" width="120">
        </el-table-column>
        <el-table-column prop="material" label="物料" width="120">
        </el-table-column>
        <el-table-column prop="router" label="工艺路线" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="currentPage"
        @size-change="handlePagesize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="lot" :visible.sync="lotDialog" width="30%">
      <span>
        <allLotModel :lot="lotDatas" @selectLot="selectLot"></allLotModel>
        <!-- <mergeLotModel
          v-if="selectType === 'addMergeLot'"
          :lot="lotDatas"
          @selectLot="selectLots"
        ></mergeLotModel> -->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lotDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectLot">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findLotAtOperationHttp,
  listLotHttp
} from "@/api/dc/lot.divestiture.api.js";
import { findLotAtOperationHttpMerge } from "@/api/dc/lot.merge.api.js";
import allLotModel from "../components/all-lots-model.vue";

export default {
  name: "mergeLot",
  components: {
    // mergeLotModel,
    allLotModel
  },
  data() {
    return {
      lotForm: {
        lot: ""
      },
      lotFormRules: {
        lot: [{ required: true, message: "请输入lot", trigger: "change" }]
      },
      showInfo: {
        status: "",
        operationList: "",
        resourceList: "",
        quantity: "",
        shopOrder: "",
        materialRev: "",
        routerRev: ""
      },
      lotMergeForm: {
        lot: ""
      },
      lotMergeFormRule: {
        lot: [{ required: true, message: "请输入lot", trigger: "change" }]
      },
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      lotDatas: [],
      lotDialog: false,
      currentLot: {},
      //弹出框选择类型
      selectType: "",
      selectionList: []
    };
  },
  filters: {
    operationFilter(operationList) {
      return operationList.join(",");
    },
    resourceFilter(resourceList) {
      return resourceList.join(",");
    }
  },
  methods: {
    //
    checkForm(formName, operation) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          operation();
        } else {
          return false;
        }
      });
    },
    //查询LOT状态信息
    handleQuery() {
      const data = { lot: this.lotForm.lot };
      findLotAtOperationHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.showInfo = res.data;
          const operations = res.data.operationList.join(",");
          this.showInfo.operationList = operations;
          const resources = res.data.resourceList.join(",");
          this.showInfo.resourceList = resources;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //重置
    handleReset() {
      this.$refs["lotForm"].resetFields();
      this.$refs["lotMergeForm"].resetFields();
      this.showInfo = {};
      this.tableData = [];
    },
    //查询LOT
    goQuery(type) {
      this.selectType = type;
      let data = {};
      if (type === "queryLot") {
        data = { lot: this.lotForm.lot };
      }
      if (type === "addMergeLot") {
        data = { lot: this.lotMergeForm.lot };
      }
      listLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.lotDatas = res.data;
          this.lotDialog = true;
          if (type === "addMergeLot") {
            this.lotDatas = res.data.filter(item => {
              return item.lot !== this.lotForm.lot;
            });
          }
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //将制定lot添加到本地表格
    handleAddLot() {
      const data = { lot: this.lotMergeForm.lot };
      findLotAtOperationHttpMerge(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          console.log(res.data);
          this.tableData.push(res.data);
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
    handlePagesize(pagesize) {
      this.pagesize = pagesize;
      this.currentPage = 1;
      this.init();
    },
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
    },
    //获取弹出框单个选择的数据
    selectLot(row) {
      this.currentLot = row;
      console.log(this.currentLot);
    },
    //弹出框确认选择lot
    handleSelectLot() {
      if (this.selectType === "queryLot") {
        this.lotForm.lot = this.currentLot.lot;
      }
      if (this.selectType === "addMergeLot") {
        this.lotMergeForm.lot = this.currentLot.lot;
      }
      this.lotDialog = false;
    },
    //移除选中数据
    handleDelete() {
      this.tableData = this.tableData.filter(item => {
        return this.selectionList.indexOf(item) == -1;
      });
      this.selectionList = [];
    }
  }
};
</script>

<style lang="scss">
.lotMerge {
  padding: 10px 30px;
  .query {
    display: flex;
    .left {
      .lot {
        width: 90%;
      }
    }
  }
  .showInfo {
    display: flex;
    width: 100%;
    height: 85%;
    padding: 10px 10px;
    background: white;
    .left {
      flex: 1;
      .el-form {
        width: 350px;
        .el-form-item {
          margin-bottom: 0px;
          .el-input__inner {
            border: 0px;
          }
        }
      }
    }
    .right {
      flex: 1;
      .el-form {
        width: 350px;
        .el-form-item {
          margin-bottom: 0px;
          .el-input__inner {
            border: 0px;
          }
        }
      }
    }
  }
  .merge {
    padding: 10px 10px;
    display: flex;
    .left {
      .mergeLot {
        width: 90%;
      }
    }
  }
}
</style>
