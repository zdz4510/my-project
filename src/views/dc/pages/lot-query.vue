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
                  <el-col :span="14">
                    <dsn-input
                      v-model.trim="lotConditionForm.material"
                      size="small"
                      placeholder="请输入物料"
                    ></dsn-input>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-document"></i>
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
                  <el-col :span="14">
                    <dsn-input
                      v-model.trim="lotConditionForm.router"
                      size="small"
                      placeholder="请输入工艺路线"
                    ></dsn-input>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-document"></i>
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
                <el-row>
                  <el-col :span="22">
                    <dsn-input
                      v-model.trim="lotConditionForm.shopOrder"
                      size="small"
                      placeholder="请输入工单"
                    ></dsn-input>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-document"></i>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="工序" prop="operation">
                <el-row>
                  <el-col :span="22">
                    <dsn-input
                      v-model.trim="lotConditionForm.operation"
                      size="small"
                      placeholder="请输入工序"
                    ></dsn-input>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-document"></i>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="资源" prop="resource">
                <el-row>
                  <el-col :span="22">
                    <dsn-input
                      v-model.trim="lotConditionForm.resource"
                      size="small"
                      placeholder="请输入资源"
                    ></dsn-input>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-document"></i>
                  </el-col>
                </el-row>
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
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column prop="lot" label="LOT" width="200"></el-table-column>
          <el-table-column prop="shopOrder" label="工单"></el-table-column>
          <el-table-column prop="lotStatus" label="状态"></el-table-column>
          <el-table-column prop="operation" label="工序">
            <template slot-scope="scope">
              <span>{{ scope.row.operationList.join(",") }}</span>
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
  </div>
</template>

<script>
import { searchLotDetailHttp } from "@/api/dc/lot.step.api.js";
import { mapMutations } from "vuex";

export default {
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
      selectionList: []
    };
  },
  created() {
    this.lotConditionForm.lot = this.$route.query.lot;
  },
  methods: {
    ...mapMutations(["LOTQUERYLIST"]),
    //返回
    goBack() {
      this.$router.push({ name: "lotStep" });
    },
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 修改页码大小
    handlePagesize(pagesize) {
      this.pagesize = pagesize;
      this.currentPage = 1;
    },
    //查询前验证查询条件
    handleQueryCheck() {
      const tempObj = JSON.parse(JSON.stringify(this.lotConditionForm));
      //删除属性
      delete tempObj.materialRev;
      delete tempObj.routerRev;
      let count = 0;
      for (const key in tempObj) {
        if (tempObj.hasOwnProperty(key)) {
          if (tempObj[key] === "") {
            count++;
          }
        }
      }
      if (count >= 7) {
        this.$message({
          message: "请至少输入一个查询条件",
          type: "warning"
        });
        return;
      }
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
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      const tempArr = [];
      this.selectionList.forEach(element => {
        tempArr.push(element.lot);
      });
      this.LOTQUERYLIST(tempArr);
      this.goBack();
    }
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
