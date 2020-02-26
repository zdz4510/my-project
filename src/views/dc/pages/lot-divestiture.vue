<template>
  <div class="lotDivestiture">
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
              <i class="el-icon-document" @click="goQuery"></i>
            </template>
          </dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="checkForm('lotForm')"
          >查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="handleReset">重置</dsn-button>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-scissors"
            :disabled="lotForm.lot === ''"
            @click="handleDivestiture"
          >拆分</dsn-button>
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
        <el-form :model="showInfo" label-width="140px" class="showInfo">
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
              <el-form-item label="可拆分数量：">
                <el-input v-model.trim="showInfo.quantity" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="工单：">
                <el-input v-model.trim="showInfo.shopOrder" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="物料（版本）：">
                <el-input v-model.trim="showInfo.materialInfo" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="工艺路线（版本）：">
                <el-input v-model.trim="showInfo.routerInfo" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 查询结果end -->
      <div style="margin-top:50px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form
              :model="lotDivestitureForm"
              ref="lotDivestitureForm"
              label-width="140px"
              class="newLot"
              :rules="lotDivestitureFormRules"
            >
              <el-form-item label="新LOT数量" prop="quantity">
                <dsn-input
                  class="lot"
                  v-model.number="lotDivestitureForm.quantity"
                  placeholder="请输入新LOT数量"
                ></dsn-input>
              </el-form-item>
              <el-form-item label="新LOT" prop="lot">
                <dsn-input class="lot" v-model.trim="lotDivestitureForm.lot" placeholder="请输入新LOT"></dsn-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </DsnPanel>

    <!-- <el-dialog title="lot" :visible.sync="lotDialog" :width="defaltDialogWidth">
      <span>
        <allLotModel :lot="tableData" @selectLot="selectLot"></allLotModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="lotDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSelectLot">确 定</dsn-button>
      </span>
    </el-dialog>-->
    <DsnSelectDialog
      width="800px"
      title="LOT单选"
      :isSingle="true"
      :helpText="helpText"
      :tableData="tableData"
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
import {
  findLotAtOperationHttp,
  listLotHttp,
  splitLotHttp
} from "@/api/dc/lot.divestiture.api.js";
// import allLotModel from "../components/all-lots-model.vue";
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
  name: "lotDivestiture",
  inject: ["defaltDialogWidth"],
  components: {
    // allLotModel,
    materialModel,
    routerModel,
    shopOrderModel,
    operationModel,
    resourceModel
  },
  data() {
    const validatorLot = (rule, value, callback) => {
      // debugger;
      if (value === "") {
        callback("lot不能为空");
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("lot格式应只包含（字母,数字,_,-,/）");
      }
      this.lotForm.lot = value.toUpperCase();
      callback();
    };
    const validatorNewLot = (rule, value, callback) => {
      if (value === "") {
        callback("lot不能为空");
      }
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("lot格式应只包含（[A-Z,0-9,_,-,/]）");
      }
      this.lotDivestitureForm.lot = value.toUpperCase();
      callback();
    };
    return {
      lotForm: {
        lot: ""
      },
      lotFormRules: {
        lot: [{ required: true, validator: validatorLot, trigger: "blur" }]
      },
      showInfo: {
        status: "",
        operationList: "",
        resourceList: "",
        quantity: "",
        shopOrder: "",
        materialRev: "",
        routerRev: "",
        materialInfo: "",
        routerInfo: ""
      },
      lotDialog: false,
      lotDivestitureForm: {
        lot: "",
        quantity: 0
      },
      lotDivestitureFormRules: {
        lot: [{ required: true, validator: validatorNewLot, trigger: "blur" }],
        quantity: [
          { required: true, message: "请输入lot数量", trigger: "blur" },
          { type: "number", message: "lot必须为数字值", trigger: "blur" }
        ]
      },
      tableData: [],
      selectedLotList: [],
      // currentLot: {}
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
      resourceList: []
    };
  },
  methods: {
    //验证表单信息
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleQuery();
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
          this.showInfo.materialInfo = `${res.data.material}(${res.data.materialRev})`;
          this.showInfo.routerInfo = `${res.data.router}(${res.data.routerRev})`;
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
      this.$refs["lotDivestitureForm"].resetFields();
      this.showInfo = {};
      this.handleResetCondition();
    },
    //查询LOT
    goQuery() {
      const data = { lot: this.lotForm.lot };
      listLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data;
          this.lotDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    // //获取弹出框选择的数据
    // selectLot(val) {
    //   this.currentLot = val;
    // },
    // //弹出框确认选择lot
    // handleSelectLot() {
    //   if (this.currentLot.lot === "") {
    //     this.$message({
    //       message: "请选择一个lot",
    //       type: "warning"
    //     });
    //     return;
    //   }
    //   this.lotForm.lot = this.currentLot.lot;
    //   this.lotDialog = false;
    // },
    //拆分
    handleDivestiture() {
      const data = {
        lot: this.lotForm.lot,
        splitList: [this.lotDivestitureForm]
      };
      splitLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          // this.$refs["lotDivestitureForm"].resetFields();
          this.handleQuery();
          this.$message({
            message: res.message,
            type: "success"
          });
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
          this.tableData = res.data;
          this.total = this.tableData.length;
          // this.selectedLotList.forEach(item => {
          //   if (!this.tableData.find(item2 => item2.lot === item.lot)) {
          //     this.tableData.push(item);
          //   }
          // });
          // this.selectedLotList.forEach(element => {
          //   this.$refs.multipleTable.toggleRowSelection(element);
          // });
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
      this.tableData = [];
      this.selectedLotList = [];
      this.$refs["lotSingleDialog"].handleClear();
    },
    //确认选择lot
    handleConfirmSelectLot(val) {
      this.selectedLotList = val;
      if (this.selectedLotList.length === 1) {
        this.lotForm.lot = this.selectedLotList[0].lot;
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
.lotDivestiture {
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
}
</style>
