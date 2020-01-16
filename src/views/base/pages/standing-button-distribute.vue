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
              v-model="standingBtnDistributeForm.chanxian"
              placeholder="请输入产线"
            ></el-input>
          </el-form-item>
          <el-form-item label="站位:">
            <el-input
              v-model="standingBtnDistributeForm.chanxian"
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
      <el-button size="small" type="primary" @click="handleEdit">
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
            v-model="showInfo.chanxian"
            :readonly="true"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="站位描述:">
          <el-input
            v-model="showInfo.chanxian"
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="70" label="序号">
        </el-table-column>
        <el-table-column prop="resource" label="产线"> </el-table-column>
        <el-table-column prop="resourceDes" label="产线描述"> </el-table-column>
        <el-table-column prop="workCenter" label="站位"> </el-table-column>
        <el-table-column prop="workCenter" label="站位描述"> </el-table-column>
        <el-table-column
          prop="workCenter"
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
export default {
  data() {
    return {
      tableData: [],
      selectionList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      standingBtnDistributeForm: {
        chanxian: ""
      },
      showInfo: {
        chanxian: ""
      }
    };
  },

  methods: {
    init() {},
    handleQuery() {},
    handleReset() {},
    handleEdit() {
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
