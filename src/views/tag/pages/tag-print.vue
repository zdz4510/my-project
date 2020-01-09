<template>
  <div class="tagPrint">
    <div class="top">
      <div class="topLeft">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="标签应用类型">
            <el-col :span="16">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="输入栏">
            <el-col :span="16">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="16">
              <el-button size="small" type="primary">检索</el-button>
              <el-button size="small" type="primary">打印</el-button>
              <el-checkbox v-model="autoPrint">自动打印</el-checkbox>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div class="topRight">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="基础信息" name="baseInfo">
            <div class="showData">
              <div><span class="name">物料号：</span><span>{{}}</span></div>
              <div><span class="name">物料组:</span><span>{{}}</span></div>
              <div><span class="name">容器层级:</span><span>{{}}</span></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
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
        <el-table-column prop="resourceGroup" label="接收值" width="100">
        </el-table-column>
        <el-table-column prop="resourceCount" label="标签ID" width="100">
        </el-table-column>
        <el-table-column prop="groupDes" label="标签应用类型" width="100">
        </el-table-column>
        <el-table-column prop="createUserName" label="物料组" width="100">
        </el-table-column>
        <el-table-column prop="createTime" label="物料号" width="100">
        </el-table-column>
        <el-table-column prop="modifyUserName" label="工单号" width="100">
        </el-table-column>
        <el-table-column prop="groupDes" label="包装层级" width="100">
        </el-table-column>
        <el-table-column prop="createUserName" label="容器类型" width="100">
        </el-table-column>
        <el-table-column prop="createTime" label="打印份数" width="100">
        </el-table-column>
        <el-table-column prop="modifyUserName" label="打印设备" width="100">
        </el-table-column>
        <el-table-column prop="modifyUserName" label="打印人员" width="100">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="打印时间"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
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
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ""
      },
      autoPrint: false,
      activeName: "baseInfo",
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      deleteDialog: false,
      selectionList: []
    };
  },
  methods: {
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pageSise) {
      this.pageSise = pageSise;
      this.currentPage = 1;
      this.init();
    },
    handleDelete() {}
  }
};
</script>

<style lang="scss">
.tagPrint {
  padding: 0 30px;
  .top {
    width: 100%;
    height: 150px;
    display: flex;
    .topLeft {
      flex: 1;
      height: 100%;
      padding: 10px 30px;
      .el-form {
        .el-form-item {
          margin-bottom: 5px;
        }
      }
    }
    .topRight {
      flex: 1;
      height: 100%;
      padding: 10px 30px;
      .showData {
        padding: 0 10px;
        div {
          height: 25px;
          line-height: 25px;
          span {
            font-size: 14px;
            .name {
              display: inline-block;
              width: 80px;
            }
          }
        }
      }
    }
  }
  .showInfo {
    margin-top: 10px;
  }
}
</style>
