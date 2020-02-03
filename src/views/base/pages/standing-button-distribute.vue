<template>
  <div class="standingBtnDistribute">
    <div class="query">
      <div class="left">
        <el-form
          :model="standingBtnDistributeForm"
          ref="standingBtnDistributeForm"
          label-width="100px"
          :inline="true"
          class="standingBtnDistributeForm"
        >
          <el-form-item label="产线:">
            <el-input
              v-model="standingBtnDistributeForm.workCenter"
              placeholder="请输入产线"
            ></el-input>
          </el-form-item>
          <el-form-item label="站位:">
            <el-input
              v-model="standingBtnDistributeForm.station"
              placeholder="请输入站位"
            ></el-input>
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
    <div class="operate">
      <el-button
        size="small"
        type="primary"
        :disabled="this.selectionList.length !== 1"
        @click="handleEdit"
      >
        编辑
      </el-button>
      <el-button size="small" type="primary">
        保存
      </el-button>
      <el-form
        :model="showInfo"
        ref="showInfo"
        label-width="100px"
        :inline="true"
        class="showInfo"
      >
        <el-form-item label="产线描述:">
          <el-input
            v-model="showInfo.station"
            :readonly="true"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="站位描述:">
          <el-input
            v-model="showInfo.station"
            :readonly="true"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column width="55">
          <template slot="header">
            <span>{{ header.row.index }}</span>
          </template>
        </el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="70" label="序号">
        </el-table-column>
        <el-table-column prop="workCenter" label="产线"> </el-table-column>
        <el-table-column prop="workCenterDes" label="产线描述">
        </el-table-column>
        <el-table-column prop="station" label="站位"> </el-table-column>
        <el-table-column prop="stationDes" label="站位描述"> </el-table-column>
        <el-table-column
          prop="stationButton"
          label="所分配按钮"
          show-overfslow-tooltip
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
import { findPageHttp } from "@/api/base/standing.btn.distribute.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      tableData: [],
      selectionList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      standingBtnDistributeForm: {
        station: "",
        workCenter: ""
      },
      showInfo: {
        station: ""
      }
    };
  },
  methods: {
    ...mapMutations(["STANDINGBTNDISTRIBUTEEDIT"]),
    init() {},
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   console.log(row, column, rowIndex, columnIndex);
    //   if (columnIndex === 0) {
    //     if (rowIndex % 2 === 0) {
    //       return {
    //         rowspan: 2,
    //         colspan: 1
    //       };
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       };
    //     }
    //   }
    // },
    handleQuery() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        station: this.standingBtnDistributeForm.station,
        workCenter: this.standingBtnDistributeForm.workCenter
      };
      findPageHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.total = res.data.total;
          this.tableData = res.data.data;
          return;
        }
        this.$message({
          type: "warning",
          message: res.message
        });
      });
    },
    handleReset() {
      this.$refs["standingBtnDistributeForm"].resetFields();
      this.$refs["showInfo"].resetFields();
      this.tableData = [];
      this.selectionList = [];
    },
    handleEdit() {
      this.STANDINGBTNDISTRIBUTEEDIT(this.selectionList[0]);
      this.$router.push({ name: "standingButtonDistributeEdit" });
    },
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.init();
    }
  }
};
</script>

<style lang="scss">
.standingBtnDistribute {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
    display: flex;
    .el-form {
      .el-form-item {
        margin-bottom: 0px;
        .el-input__inner {
          border: 0px;
        }
      }
    }
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    .left {
      // width: 300px;
    }
    .right {
      // width: 680px;
      padding: 5px 30px;
    }
  }
}
</style>
