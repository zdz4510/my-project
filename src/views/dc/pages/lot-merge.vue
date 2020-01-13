<template>
  <div class="lotMerge">
    <div class="query">
      <div class="left">
        <el-form
          :model="lotMergeForm"
          :inline="true"
          ref="lotMergeForm"
          label-width="100px"
          class="lotMergeForm"
        >
          <el-form-item label="LOT" prop="lot">
            <el-input
              class="lot"
              v-model.trim="lotMergeForm.lot"
              placeholder="请输入LOT"
            ></el-input>
            <i class="el-icon-document" @click="goQuery"></i>
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
    <div class="showInfo">
      <div class="left">
        <el-form :model="showInfo" label-width="140px" class="demo-form-inline">
          <el-form-item label="状态：">
            <el-input v-model.trim="showInfo.status" size="small"></el-input>
          </el-form-item>
          <el-form-item label="操作：">
            <el-input
              v-model.trim="showInfo.operationList"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源：">
            <el-input
              v-model.trim="showInfo.resourceList"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="数量：">
            <el-input v-model.trim="showInfo.quantity" size="small"></el-input>
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
            ></el-input>
          </el-form-item>
          <el-form-item label="工艺路线（版本）：">
            <el-input v-model.trim="showInfo.routerRev" size="small"></el-input>
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
        >
          <el-form-item label="合并的LOT" prop="lot">
            <el-input
              class="mergeLot"
              v-model.trim="lotMergeForm.lot"
              placeholder="请输入LOT"
            ></el-input>
            <i class="el-icon-document" @click="goQuery"></i>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="primary">
          添加
        </el-button>
        <el-button size="small" type="primary">
          合并
        </el-button>
        <el-button size="small" type="primary">
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
        @cell-dblclick="cellDblClick"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="lot" label="LOT" width="120"> </el-table-column>
        <el-table-column prop="resourceCount" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="groupDes" label="数量" width="120">
        </el-table-column>
        <el-table-column prop="createUserName" label="工序" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="资源" width="120">
        </el-table-column>
        <el-table-column prop="groupDes" label="工单" width="120">
        </el-table-column>
        <el-table-column prop="createUserName" label="物料" width="120">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="工艺路线"
          show-overflow-tooltip
        >
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
  </div>
</template>

<script>
import { findLotAtOperationHttp } from "@/api/dc/lot.divestiture.api.js";
export default {
  data() {
    return {
      lotMergeForm: {
        lot: ""
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
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: []
    };
  },
  methods: {
    //查询LOT状态信息
    handleQuery() {
      const data = { lot: this.lotMergeForm.lot };
      findLotAtOperationHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.showInfo = res.data;
          const operations = res.data.operationList.join(",");
          this.showInfo.operationList = operations;
          const resources = res.data.resourceList.join(",");
          this.showInfo.resourceList = resources;
        }
      });
    },
    //重置
    handleReset() {},
    //查询LOT
    goQuery() {},
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
    //双击单元格
    cellDblClick(row, column) {
      if (column.property === "lot") {
        this.$router.push({ name: "lotStepDetail" });
      }
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
