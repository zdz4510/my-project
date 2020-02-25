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
          <dsn-input
            class="lot"
            v-model.trim="lotStepForm.lot"
            placeholder="请输入LOT"
            style="width:225px;vertical-align:baseline;"
            @clear="clearLot"
          >
            <template slot="append">
              <i class="el-icon-document" @click="goQuery"></i>
            </template>
          </dsn-input>
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
    <!-- <el-dialog title="查询" :visible.sync="lotQueryDialog" width="400px">
      <lotQueryModel :lot="lotStepForm.lot"></lotQueryModel>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="lotQueryDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="lotQueryDialog = false">确 定</dsn-button>
      </span>
    </el-dialog>-->
    <DsnSelectDialog
      width="800px"
      title="LOT多选"
      :isSingle="false"
      :helpText="helpText"
      :tableData="lotTableData"
      v-model="selectedLotList"
      :visible.sync="lotQueryDialog"
      @confirm="handleConfirmSelectLot"
      @cancle="handleCancleSelectLot"
      keyValue="lot"
      ref="lotMultiDialog"
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
  findLotStepStatusHttp,
  setLotsStatusDoneHttp,
  saveLotStepStatusHttp,
  getLotStepChangRuleHttp
} from "@/api/dc/lot.step.api.js";
import { mapMutations, mapGetters } from "vuex";
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
// import _ from "lodash";

export default {
  components: {
    materialModel,
    routerModel,
    shopOrderModel,
    operationModel,
    resourceModel
  },
  data() {
    return {
      lotStepForm: {
        lot: "",
        comment: ""
      },
      lotStepFormRules: {
        lot: [{ required: true, message: "请输入lot", trigger: "blur" }]
      },
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
      cloneLotQueryList: [],
      lotQueryDialog: false,
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
      selectedLotList: [],
      lotTableData: []
    };
  },
  created() {
    //详情页面返回信息获取
    if (this.lotStepAllInfo.length > 0) {
      this.lotStepForm = this.lotStepAllInfo[0].lotStepForm;
      this.queryLots = this.lotStepAllInfo[0].queryLots;
      this.stepStatusList = this.lotStepAllInfo[0].stepStatusList;
      this.stepIdList = this.lotStepAllInfo[0].stepIdList;
      this.tableData = this.lotStepAllInfo[0].tableData;
    }
    //查询页面返回带的数据
    if (this.lotQueryList.length === 1) {
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
      this.lotQueryDialog = true;
    },
    handleQuery() {
      this.queryLots = [];
      if (this.selectedLotList.length > 0) {
        this.selectedLotList.forEach(element => {
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
      this.handleResetCondition();
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
          // this.selectedLotList.forEach(item => {
          //   if (!this.lotTableData.find(item2 => item2.lot === item.lot)) {
          //     this.lotTableData.push(item);
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
      this.lotTableData = [];
      this.selectedLotList = [];
      this.$refs["lotMultiDialog"].handleClear();
    },
    //确认选择lot
    handleConfirmSelectLot(val) {
      this.selectedLotList = val;
      console.log(this.selectedLotList);
      this.lotQueryDialog = false;
    },
    handleCancleSelectLot() {
      this.lotQueryDialog = false;
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
  .lotConditionForm {
    .el-form-item {
      margin-bottom: 5px;
    }
  }
}
</style>
