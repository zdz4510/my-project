<template>
  <div class="lotMerge">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :model="lotForm" :inline="true" ref="lotForm" class="lotForm" :rules="lotFormRules">
        <el-form-item label="LOT" prop="lot">
          <dsn-input
            class="lot"
            v-model.trim="lotForm.lot"
            style="width:225px;vertical-align:baseline;"
            placeholder="请输入LOT"
          >
            <template slot="append">
              <i class="el-icon-document" @click="goQuery('queryLot')"></i>
            </template>
          </dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="checkForm('lotForm', handleQuery)"
          >查询</dsn-button>
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
      <div>
        <el-form :model="showInfo" class="showInfo" label-width="140px">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="状态：">
                <el-input v-model.trim="showInfo.status" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="操作：">
                <el-input v-model.trim="showInfo.operationList" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="资源：">
                <el-input v-model.trim="showInfo.resourceList" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="数量：">
                <el-input v-model.trim="showInfo.quantity" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="工单：">
                <el-input v-model.trim="showInfo.shopOrder" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="物料（版本）：">
                <el-input v-model.trim="showInfo.materialRev" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="工艺路线（版本）：">
                <el-input v-model.trim="showInfo.routerRev" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="merge">
        <el-form
          :model="lotMergeForm"
          :inline="true"
          ref="lotMergeForm"
          label-width="100px"
          class="lotMergeForm"
          :rules="lotMergeFormRule"
        >
          <el-form-item label="合并的LOT" prop="lot">
            <dsn-input
              class="mergeLot"
              v-model.trim="lotMergeForm.lot"
              style="width:225px;vertical-align:baseline;"
              placeholder="请输入LOT"
            >
              <template slot="append">
                <i class="el-icon-document" @click="goQuery('addMergeLot')"></i>
              </template>
            </dsn-input>
          </el-form-item>
          <el-form-item>
            <dsn-button
              size="small"
              type="success"
              icon="el-icon-folder-add"
              :disabled="lotForm.lot===''|| showFlag"
              @click="checkForm('lotMergeForm', handleAddLot)"
            >添加</dsn-button>
            <dsn-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              :disabled="selectionList.length===0"
              @click="handleDelete"
            >移除</dsn-button>
            <dsn-button
              size="small"
              type="primary"
              icon="el-icon-document-copy"
              :disabled="tableData.length === 0"
              @click="handleMerge"
            >合并</dsn-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <dsn-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="lot" label="LOT" width="200"></el-table-column>
          <el-table-column prop="status" label="状态" width="80"></el-table-column>
          <el-table-column prop="quantity" label="数量" width="80"></el-table-column>
          <el-table-column prop="createUserName" label="工序" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.operationList | operationFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="资源" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{
                scope.row.resourceList | resourceFilter
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="shopOrder" label="工单" width="120"></el-table-column>
          <el-table-column prop="material" label="物料" width="120"></el-table-column>
          <el-table-column prop="router" label="工艺路线" show-overflow-tooltip></el-table-column>
        </dsn-table>
        <!-- <dsn-pagination
          background
          layout="->,total,prev,pager,next,sizes"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :current-page="currentPage"
          @size-change="handlePagesize"
          @current-change="handleCurrentChange"
        ></dsn-pagination>-->
      </div>
    </DsnPanel>
    <el-dialog title="lot" :visible.sync="lotDialog" :width="defaltDialogWidth">
      <span>
        <allLotModel :lot="lotDatas" @selectLot="selectLot"></allLotModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="lotDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSelectLot">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listLotHttp } from "@/api/dc/lot.divestiture.api.js";
import {
  addLotAtOperationHttp,
  mergeLotHttp,
  findLotAtOperationHttp
} from "@/api/dc/lot.merge.api.js";
import allLotModel from "../components/all-lots-model.vue";

export default {
  name: "mergeLot",
  inject: ["defaltDialogWidth"],
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
      showFlag: true,
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
      selectionList: [],
      splitLot: {}
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
          this.showFlag = false;
          this.showInfo = res.data;
          this.splitLot = res.data;
          const operations = res.data.operationList.join(",");
          this.showInfo.operationList = operations;
          const resources = res.data.resourceList.join(",");
          this.showInfo.resourceList = resources;
          this.showInfo.materialRev = `${res.data.material}(${res.data.materialRev})`;
          this.showInfo.routerRev = `${res.data.router}(${res.data.routerRev})`;
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
      this.showFlag = true;
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
      const data = { lot: this.lotMergeForm.lot, parentLot: this.splitLot.lot };
      addLotAtOperationHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          if (!this.tableData.find(item => item.lot === res.data.lot)) {
            this.tableData.push(res.data);
          } else {
            this.$message({
              message: "该条数据已存在",
              type: "warning"
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
    },
    //获取弹出框单个选择的数据
    selectLot(row) {
      this.currentLot = row;
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
    },
    //合并lot
    handleMerge() {
      console.log(111);
      let mergeList = [];
      this.tableData.forEach(element => {
        mergeList.push(element.lot);
      });
      const data = {
        lot: this.lotForm.lot,
        mergeList
      };
      mergeLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.tableData = [];
          this.lotMergeForm.lot = "";
          this.handleQuery();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    }
  }
};
</script>

<style lang="scss">
.lotMerge {
  .showInfo {
    background: #eee9e9;
    padding: 10px;
    background-color: rgba(245, 244, 244, 0.5);
    .el-form-item {
      margin-bottom: 0px;
      .el-input__inner {
        border: 0px;
        opacity: 1;
        background-color: #fff;
      }
    }
  }
  .merge {
    margin-top: 50px;
    padding: 10px;
    height: 50px;
  }
}
</style>
