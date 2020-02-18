<template>
  <div class="lotStepDetail">
    <el-page-header @back="goBack" content="详情信息"></el-page-header>
    <div class="detail">
      <DsnPanel>
        <div slot="header" class="title clearfix">
          <span>基础信息</span>
        </div>
        <!-- 查询条件start -->
        <el-form
          :inline="true"
          :model="lotStepDetailForm"
          label-width="120px"
          class="demo-form-inline"
        >
          <el-form-item label="工艺路线/版本：">
            <el-input v-model.trim="lotStepDetailForm.routerRev" size="small" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input v-model.trim="lotStepDetailForm.routerDes" size="small" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          :model="lotStepDetailForm"
          label-width="120px"
          class="demo-form-inline"
        >
          <el-form-item label="步骤：">
            <el-input v-model.trim="lotStepDetailForm.stepId" size="small" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="工序：">
            <el-input v-model.trim="lotStepDetailForm.operation" size="small" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input v-model.trim="lotStepDetailForm.operationDes" size="small" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </DsnPanel>
      <DsnPanel>
        <div slot="header" class="title clearfix">
          <span>LOT信息</span>
        </div>
        <!-- 查询结果start -->
        <dsn-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
        >
          <el-table-column prop="lot" label="LOT" width="200"></el-table-column>
          <el-table-column prop="lotStatus" label="LOT状态" width="120"></el-table-column>
          <el-table-column prop="stepStatus" label="步骤状态" width="170"></el-table-column>
          <el-table-column prop="shopOrder" label="工单" width="120"></el-table-column>
          <el-table-column label="物料/版本" width="140">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.material }}/{{ scope.row.materialRev }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="resource" label="资源" width="90"></el-table-column>
          <el-table-column prop="qtyInQueue" label="排队中数量" width="90"></el-table-column>
          <el-table-column prop="qtyInWork" label="在制数量" show-overflow-tooltip></el-table-column>
        </dsn-table>
        <!-- <el-pagination
          background
          layout="->,total,prev,pager,next,sizes"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :current-page="currentPage"
          @size-change="handlePagesize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>-->
      </DsnPanel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { findLotStepDetailHttp } from "@/api/dc/lot.step.api.js";

export default {
  data() {
    return {
      tableData: [],
      lotStepDetailForm: {
        stepId: "",
        operation: "",
        operationDes: "",
        routerDes: "",
        routerRev: ""
      }
      // total: 0,
      // pageSize: 10,
      // currentPage: 1
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["lotStepDetailList"])
  },
  methods: {
    //初始化
    init() {
      // const data = { lots: this.lotStepDetailList.lots };
      findLotStepDetailHttp(this.lotStepDetailList).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.lotStepDetailForm.routerRev = `${res.data.router}(${res.data.routerRev})`;
          this.lotStepDetailForm.routerDes = res.data.routerDes;
          this.lotStepDetailForm.stepId = res.data.stepId;
          this.lotStepDetailForm.operation = this.lotStepDetailList.operation;
          this.lotStepDetailForm.operationDes = this.lotStepDetailList.operationDes;
          this.tableData = res.data.lotStepDetails;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //返回
    goBack() {
      this.$router.back({ name: "lotStep" });
    }
  }
};
</script>

<style lang="scss">
.lotStepDetail {
  .el-page-header {
    padding: 10px 10px;
  }
  .detail {
    width: 100%;
    height: 400px;
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-input__inner {
          border: 0px;
          background-color: #fff;
        }
      }
    }
    .bottom {
      padding: 10px;
    }
  }
}
</style>
