<template>
  <div class="lotQuery">
    <el-page-header @back="goBack" content="查询"></el-page-header>
    <div class="detail">
      <DsnPanel>
        <div slot="header" class="title clearfix">
          <span>搜索条件</span>
        </div>
        <!-- 查询条件start -->
        <el-form
          :model="lotConditionForm"
          label-width="110px"
          class="lotConditionForm"
          ref="lotConditionForm"
        >
          <el-row :gutter="20">
            <el-col :span="11">
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
                      style="width:225px;vertical-align:baseline;"
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
                      style="width:225px;vertical-align:baseline;"
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
            <el-col :span="11">
              <el-form-item label="工单" prop="shopOrder">
                <dsn-input
                  v-model.trim="lotConditionForm.shopOrder"
                  size="small"
                  style="width:350px;vertical-align:baseline;"
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
                  style="width:350px;vertical-align:baseline;"
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
                  style="width:350px;vertical-align:baseline;"
                  size="small"
                  placeholder="请输入资源"
                >
                  <template slot="append">
                    <i class="el-icon-document" @click="queryResource"></i>
                  </template>
                </dsn-input>
              </el-form-item>
              <el-form-item>
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
                      @click="handleReset"
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
      </DsnPanel>
      <DsnPanel>
        <div slot="header" class="title clearfix">
          <span>搜索结果</span>
        </div>
        <!-- 查询结果start -->
        <dsn-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @select="onTableSelect"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="55"></el-table-column>
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
          <el-table-column prop="modifyTime" label="工艺路线/版本">
            <template slot-scope="scope">
              <span>{{ scope.row.router }}/{{ scope.row.routerRev }}</span>
            </template>
          </el-table-column>
        </dsn-table>
        <dsn-pagination
          background
          layout="->,total,prev,pager,next,sizes"
          :total="total"
          :page-size="pagesize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handlePagesize"
        ></dsn-pagination>
        <div class="confirm">
          <dsn-button size="small" type="primary" @click="handleConfirm">确认</dsn-button>
          <dsn-button size="small" type="primary">取消</dsn-button>
        </div>
      </DsnPanel>
    </div>
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
import { searchLotDetailHttp } from "@/api/dc/lot.step.api.js";
import { mapGetters, mapMutations } from "vuex";
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
  components: {
    materialModel,
    routerModel,
    shopOrderModel,
    operationModel,
    resourceModel
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
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
      selectionList: [],
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
      selectedData: []
    };
  },
  created() {
    this.lotConditionForm.lot = this.$route.query.lot;
    this.tableData = JSON.parse(JSON.stringify(this.lotQueryList));
    this.selectedData = JSON.parse(JSON.stringify(this.lotQueryList));
    this.total = this.tableData.length;
  },
  mounted() {
    setTimeout(() => {
      this.tableData.forEach(element => {
        this.$refs.multipleTable.toggleRowSelection(element);
      });
    }, 0);
  },
  computed: {
    ...mapGetters(["lotQueryList"])
  },
  methods: {
    ...mapMutations(["LOTQUERYLIST"]),
    //返回
    goBack() {
      this.$router.push({ name: "lotStep" });
    },
    onTableSelect(selection, row) {
      console.log(11111);
      let selected = selection.length && selection.indexOf(row) !== -1;
      if (selected) {
        if (!this.selectedData.find(item => item.lot === row.lot)) {
          this.selectedData.push(row);
        }
      } else {
        this.selectedData = this.selectedData.filter(
          item => item.lot !== row.lot
        );
      }
      console.log(this.selectedData);
    },
    //当前选中行
    handleSelectionChange(val) {
      console.log(2222);
      this.selectionList = val;
    },
    //改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.tableData);
      console.log(this.selectedData);
      this.tableData.forEach(element1 => {
        this.selectedData.forEach(element2 => {
          console.log(
            element1.lot === element2.lot,
            element1.lot,
            element2.lot
          );
          if (element1.lot === element2.lot) {
            this.$refs.multipleTable.toggleRowSelection(element1);
          }
        });
      });
    },
    // 修改页码大小
    handlePagesize(pagesize) {
      this.pagesize = pagesize;
      this.currentPage = 1;
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
    //查询请求数据
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
          this.selectedData.forEach(item => {
            if (!this.tableData.find(item2 => item2.lot === item.lot)) {
              this.tableData.push(item);
            }
          });
          this.selectedData.forEach(element => {
            this.$refs.multipleTable.toggleRowSelection(element);
          });
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleReset() {
      this.$refs["lotConditionForm"].resetFields();
      this.lotConditionForm.lot = "";
      this.tableData = [];
    },
    //确认选择Lot
    handleConfirm() {
      if (this.selectedData.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      // this.selectionList.forEach(element => {
      //   console.log(element);
      //   console.log(this.lotQueryList.indexOf(element));
      //   if (this.lotQueryList.indexOf(element) === -1) {
      //     this.lotQueryList.push(JSON.parse(JSON.stringify(element)));
      //   }
      // });
      // this.selectionList.forEach(item => {
      //   if (!this.lotQueryList.find(item2 => item2.lot === item.lot)) {
      //     this.lotQueryList.push(item);
      //   }
      // });
      console.log(this.selectedData);
      this.LOTQUERYLIST(JSON.parse(JSON.stringify(this.selectedData)));
      this.goBack();
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
    }
    //资源查询end
  }
};
</script>

<style lang="scss">
.lotQuery {
  .el-page-header {
    padding: 10px 10px;
  }
  .detail {
    .lotConditionForm {
      .el-form-item {
        margin-bottom: 5px;
      }
    }
    .confirm {
      width: 100%;
      padding: 10px;
      text-align: center;
    }
  }
}
</style>
