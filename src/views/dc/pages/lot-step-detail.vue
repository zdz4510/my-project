<template>
  <div class="lotStepDetail">
    <el-page-header @back="goBack" content="详情信息"> </el-page-header>
    <div class="detail">
      <div class="top">
        <el-form
          :inline="true"
          :model="formInline"
          label-width="120px"
          class="demo-form-inline"
        >
          <el-form-item label="工艺路线/版本：">
            <el-input v-model.trim="formInline.user" size="small"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input v-model.trim="formInline.user" size="small"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          :model="formInline"
          label-width="120px"
          class="demo-form-inline"
        >
          <el-form-item label="步骤：">
            <el-input v-model.trim="formInline.user" size="small"></el-input>
          </el-form-item>
          <el-form-item label="工序：">
            <el-input v-model.trim="formInline.user" size="small"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input v-model.trim="formInline.user" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
        >
          <el-table-column prop="lot" label="LOT" width="120">
          </el-table-column>
          <el-table-column prop="resourceCount" label="LOT状态" width="120">
          </el-table-column>
          <el-table-column prop="groupDes" label="步骤状态" width="170">
          </el-table-column>

          <el-table-column prop="createUserName" label="工单" width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="物料/版本" width="170">
          </el-table-column>
          <el-table-column prop="createUserName" label="资源" width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="排队中数量" width="170">
          </el-table-column>
          <el-table-column
            prop="modifyTime"
            label="在制数量"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      formInline: {
        user: "",
        region: ""
      },
      total: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({ name: "lotStep" });
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
    }
  }
};
</script>

<style lang="scss">
.lotStepDetail {
  .el-page-header {
    padding: 10px 0px;
  }
  .detail {
    width: 100%;
    height: 400px;
    .top {
      width: 100%;
      height: 90px;
      padding: 10px;
      .el-form {
        .el-form-item {
          margin-bottom: 0px;
          .el-input__inner {
            border: 0px;
          }
        }
      }
    }
    .bottom {
      padding: 10px;
    }
  }
}
</style>
