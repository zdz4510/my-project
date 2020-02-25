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
    <DsnSelectDialog
      width="800px"
      title="LOT单选"
      :isSingle="true"
      :helpText="helpText"
      :tableData="lotTableData"
      v-model="selectedLotList"
      :visible.sync="lotDialog"
      @confirm="handleConfirmSelectLot"
      @cancle="handleCancleSelectLot"
      keyValue="lot"
      ref="lotSingleDialog"
    >
      <template slot="header">
        <!-- <el-input v-model="search" placeholder></el-input>
        <el-button @click="query">search</el-button>-->
        <el-form
          :model="lotConditionForm"
          label-width="90px"
          class="lotConditionForm"
          ref="lotConditionForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="LOT" prop="lot">
                <dsn-input v-model.trim="lotConditionForm.lot" size="small" placeholder="请输入Lot"></dsn-input>
              </el-form-item>
              <el-form-item label="LOT状态" prop="lotStatus">
                <dsn-select
                  v-model="lotConditionForm.lotStatus"
                  placeholder="请选择LOT状态"
                  style="width:100%"
                >
                  <el-option label="全部" value></el-option>
                  <el-option label="新建" value="NEW"></el-option>
                  <el-option label="排队中" value="IN_QUEUE"></el-option>
                  <el-option label="工作中" value="IN_WORK"></el-option>
                  <el-option label="报废" value="SCRAP"></el-option>
                  <el-option label="已删除" value="DELETE"></el-option>
                  <el-option label="无效" value="INVALID"></el-option>
                  <el-option label="已完成" value="DONE"></el-option>
                </dsn-select>
              </el-form-item>
              <el-form-item label="物料" prop="material">
                <el-row>
                  <el-col :span="16">
                    <dsn-input
                      v-model.trim="lotConditionForm.material"
                      size="small"
                      style="width:180px;vertical-align:baseline;"
                      placeholder="请输入物料"
                    >
                      <template slot="append">
                        <i class="el-icon-document" @click="queryMaterial"></i>
                      </template>
                    </dsn-input>
                  </el-col>
                  <el-col :span="8">
                    <el-row>
                      <el-col :span="12">
                        <span>版本：</span>
                      </el-col>
                      <el-col :span="12">
                        <span>{{ lotConditionForm.materialRev }}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="工艺路线" prop="router">
                <el-row>
                  <el-col :span="16">
                    <dsn-input
                      v-model.trim="lotConditionForm.router"
                      size="small"
                      style="width:180px;vertical-align:baseline;"
                      placeholder="请输入工艺路线"
                    >
                      <template slot="append">
                        <i class="el-icon-document" @click="queryRouter"></i>
                      </template>
                    </dsn-input>
                  </el-col>
                  <el-col :span="8">
                    <el-row>
                      <el-col :span="12">
                        <span>版本：</span>
                      </el-col>
                      <el-col :span="12">
                        <span>{{ lotConditionForm.routerRev }}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工单" prop="shopOrder">
                <dsn-input
                  v-model.trim="lotConditionForm.shopOrder"
                  size="small"
                  style="vertical-align:baseline;"
                  placeholder="请输入工单"
                >
                  <template slot="append">
                    <i class="el-icon-document" @click="queryShopOrder"></i>
                  </template>
                </dsn-input>
              </el-form-item>
              <el-form-item label="工序" prop="operation">
                <dsn-input
                  v-model.trim="lotConditionForm.operation"
                  size="small"
                  style="vertical-align:baseline;"
                  placeholder="请输入工序"
                >
                  <template slot="append">
                    <i class="el-icon-document" @click="queryOperation"></i>
                  </template>
                </dsn-input>
              </el-form-item>
              <el-form-item label="资源" prop="resource">
                <dsn-input
                  v-model.trim="lotConditionForm.resource"
                  style="vertical-align:baseline;"
                  size="small"
                  placeholder="请输入资源"
                >
                  <template slot="append">
                    <i class="el-icon-document" @click="queryResource"></i>
                  </template>
                </dsn-input>
              </el-form-item>
              <el-form-item style="margin-left:-50px">
                <el-row>
                  <el-col :span="6">
                    <dsn-button
                      size="small"
                      type="primary"
                      icon="el-icon-search"
                      @click="handleQueryCheck"
                    >查询</dsn-button>
                  </el-col>
                  <el-col :span="6">
                    <dsn-button
                      size="small"
                      type="primary"
                      icon="el-icon-refresh"
                      @click="handleResetCondition"
                    >重置</dsn-button>
                  </el-col>
                  <el-col :span="12">
                    <span style="color:red">*请至少输入一个查询条件</span>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template slot="body">
        <el-table-column type="index" width="55" label="序号"></el-table-column>
        <el-table-column prop="lot" label="LOT" width="200"></el-table-column>
        <el-table-column prop="shopOrder" label="工单"></el-table-column>
        <el-table-column prop="lotStatus" label="状态"></el-table-column>
        <el-table-column prop="operation" label="工序">
          <template slot-scope="scope">
            <span>{{ scope.row.operationList?scope.row.operationList.join(","):scope.row.operationList }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物料/版本">
          <template slot-scope="scope">
            <span>{{ scope.row.material }}/{{ scope.row.materialRev }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="modifyTime" label="工艺路线/版本" width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.router }}/{{ scope.row.routerRev }}</span>
          </template>
        </el-table-column>
      </template>
    </DsnSelectDialog>
    <!-- 物料弹框start -->
    <el-dialog title="物料" :visible.sync="materialDialog" width="400px">
      <materialModel :material="materialList" @selectMaterial="selectMaterial"></materialModel>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="materialDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleMaterialComfire">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 物料弹框end -->
    <!-- 工艺路线弹框start -->
    <el-dialog title="工艺路线" :visible.sync="routerDialog" width="400px">
      <routerModel :router="routerList" @selectRouter="selectRouter"></routerModel>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="routerDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleRouterComfire">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 工艺路线弹框end -->
    <!-- 工单弹框start -->
    <el-dialog title="工单" :visible.sync="shopOrderDialog" width="400px">
      <shopOrderModel :shopOrder="shopOrderList" @selectShopOrder="selectShopOrder"></shopOrderModel>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="shopOrderDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleShopOrderComfire">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 工单弹框end -->
    <!-- 工序弹框start -->
    <el-dialog title="工序" :visible.sync="operationDialog" width="400px">
      <operationModel :operation="operationList" @selectOperation="selectOperation"></operationModel>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="operationDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleOperationComfire">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 工序弹框end -->
    <!-- 资源弹框start -->
    <el-dialog title="资源" :visible.sync="resourceDialog" width="400px">
      <resourceModel :resource="resourceList" @selectResource="selectResource"></resourceModel>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="resourceDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleResourceComfire">确 定</dsn-button>
      </span>
    </el-dialog>
    <!-- 资源弹框end -->
  </div>
</template>

<script>
import { listLotHttp } from "@/api/dc/lot.divestiture.api.js";
import {
  addLotAtOperationHttp,
  mergeLotHttp,
  findLotAtOperationHttp
} from "@/api/dc/lot.merge.api.js";
import { searchLotDetailHttp } from "@/api/dc/lot.step.api.js";
import materialModel from "../components/material-model.vue";
import { listAllMaterialHttp } from "@/api/material.info.api.js";
import routerModel from "../components/router-model.vue";
import { listRouterPage } from "@/api/material/route.maintenance.api.js";
import shopOrderModel from "../components/shop-order-model.vue";
import { findShopOrderListRequest } from "@/api/work-order/work-order.api.js";
import operationModel from "../components/operation-model.vue";
import { findPageHttp } from "@/api/operation.maintain.api.js";
import resourceModel from "../components/resource-model.vue";
import { listAllResourceHttp } from "@/api/device/maintenance.api.js";

export default {
  name: "mergeLot",
  inject: ["defaltDialogWidth"],
  components: {
    materialModel,
    routerModel,
    shopOrderModel,
    operationModel,
    resourceModel
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
      lotDialog: false,
      currentLot: {},
      //弹出框选择类型
      selectType: "",
      selectionList: [],
      splitLot: {},
      selectedLotList: [],
      lotConditionForm: {
        lot: "",
        lotStatus: "",
        material: "",
        materialRev: "",
        operation: "",
        resource: "",
        router: "",
        routerRev: "",
        shopOrder: ""
      },
      lotTableData: [],
      //物料
      materialDialog: false,
      materialList: [],
      currentRow: {},
      //工艺路线
      routerDialog: false,
      routerList: [],
      //工单
      shopOrderDialog: false,
      shopOrderList: [],
      //工序
      operationDialog: false,
      operationList: [],
      //资源
      resourceDialog: false,
      resourceList: [],
      queryLotType: ""
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
          this.lotMergeForm.lot = "";
          this.tableData = [];
          this.selectionList = [];
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
      this.handleResetCondition();
    },
    //查询LOT
    goQuery(type) {
      this.selectType = type;
      let data = {};
      if (type === "queryLot") {
        this.queryLotType = "queryLot";
        data = { lot: this.lotForm.lot };
      }
      if (type === "addMergeLot") {
        this.queryLotType = "addMergeLot";
        data = { lot: this.lotMergeForm.lot };
      }
      listLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.lotTableData = res.data;
          this.lotDialog = true;
          if (type === "addMergeLot") {
            this.lotTableData = res.data.filter(item => {
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
          this.$message({
            message: `LOT成功合并，数量从${this.showInfo.quantity}调整到${res.data.quantity}`,
            type: "warning"
          });
          this.handleQuery();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //查询前验证查询条件
    handleQueryCheck() {
      // const tempObj = JSON.parse(JSON.stringify(this.lotConditionForm));
      // //删除属性
      // delete tempObj.materialRev;
      // delete tempObj.routerRev;
      // let count = 0;
      // for (const key in tempObj) {
      //   if (tempObj.hasOwnProperty(key)) {
      //     if (tempObj[key] === "") {
      //       count++;
      //     }
      //   }
      // }
      // if (count >= 7) {
      //   this.$message({
      //     message: "请至少输入一个查询条件",
      //     type: "warning"
      //   });
      //   return;
      // }
      this.queryHttp();
    },
    queryHttp() {
      const data = {
        lot: this.lotConditionForm.lot,
        lotStatus: this.lotConditionForm.lotStatus,
        material: this.lotConditionForm.material,
        materialRev: this.lotConditionForm.materialRev,
        operation: this.lotConditionForm.operation,
        resource: this.lotConditionForm.resource,
        router: this.lotConditionForm.router,
        routerRev: this.lotConditionForm.routerRev,
        shopOrder: this.lotConditionForm.shopOrder
      };
      searchLotDetailHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.lotTableData = res.data;
          this.total = this.lotTableData.length;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //重置查询条件
    handleResetCondition() {
      this.$refs["lotConditionForm"].resetFields();
      this.lotConditionForm.lot = "";
      this.lotTableData = [];
      this.selectedLotList = [];
      this.$refs["lotSingleDialog"].handleClear();
    },
    //确认选择lot
    handleConfirmSelectLot(val) {
      this.selectedLotList = val;
      if (this.selectedLotList.length === 1) {
        if (this.queryLotType === "queryLot") {
          this.lotForm.lot = this.selectedLotList[0].lot;
        }
        if (this.queryLotType === "addMergeLot") {
          this.lotMergeForm.lot = this.selectedLotList[0].lot;
        }
      }
      this.lotDialog = false;
    },
    handleCancleSelectLot() {
      this.lotDialog = false;
    },
    //物料查询start
    queryMaterial() {
      listAllMaterialHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.materialList = res.data;
          this.materialDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    selectMaterial(row) {
      this.currentRow = row;
    },
    handleMaterialComfire() {
      this.lotConditionForm.materialRev = this.currentRow.materialRev;
      this.lotConditionForm.material = this.currentRow.material;
      this.materialDialog = false;
    },
    //物料查询end
    //工艺路线查询start
    queryRouter() {
      const data = { pageSize: 0 };
      listRouterPage(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.routerList = res.data.data;
          this.routerDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    selectRouter(row) {
      this.currentRow = row;
    },
    handleRouterComfire() {
      this.lotConditionForm.routerRev = this.currentRow.revision;
      this.lotConditionForm.router = this.currentRow.router;
      this.routerDialog = false;
    },
    //工艺路线查询end
    //工单查询start
    queryShopOrder() {
      const data = { shopOrder: "" };
      findShopOrderListRequest(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.shopOrderList = res.data;
          this.shopOrderDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    selectShopOrder(row) {
      this.currentRow = row;
    },
    handleShopOrderComfire() {
      this.lotConditionForm.shopOrder = this.currentRow.shopOrder;
      this.shopOrderDialog = false;
    },
    //工单查询end
    //工序查询start
    queryOperation() {
      const data = { pageSize: 0 };
      findPageHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.operationList = res.data.data;
          this.operationDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    selectOperation(row) {
      this.currentRow = row;
    },
    handleOperationComfire() {
      this.lotConditionForm.operation = this.currentRow.operation;
      this.operationDialog = false;
    },
    //工序查询end
    //资源查询start resource
    queryResource() {
      listAllResourceHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.resourceList = res.data;
          this.resourceDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    selectResource(row) {
      this.currentRow = row;
    },
    handleResourceComfire() {
      this.lotConditionForm.resource = this.currentRow.resource;
      this.resourceDialog = false;
    },
    //资源查询end
    //表格start
    helpText(item) {
      return item["lot"];
    }
    //表格end
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
