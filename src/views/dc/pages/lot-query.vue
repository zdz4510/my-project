<template>
  <div class="lotQuery">
    <el-page-header @back="goBack" content="查询"> </el-page-header>
    <div class="detail">
      <div class="top">
        <div class="condition">
          <div class="left">
            <el-form
              :model="formInline"
              label-width="110px"
              class="demo-form-inline"
            >
              <el-form-item label="LOT">
                <el-input
                  v-model.trim="formInline.user"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="LOT状态">
                <el-select v-model="formInline.user" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物料">
                <el-input
                  v-model.trim="formInline.user"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
                <div class="version">
                  <span>版本：</span><span>{{ "aaa" }}</span>
                </div>
              </el-form-item>
              <el-form-item label="工艺路线">
                <el-input
                  v-model.trim="formInline.user"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
                <div class="version">
                  <span>版本：</span><span>{{ "aaa" }}</span>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-form
              :model="formInline"
              label-width="110px"
              class="demo-form-inline"
            >
              <el-form-item label="工单">
                <el-input
                  v-model.trim="formInline.user"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
              </el-form-item>
              <el-form-item label="工序">
                <el-input
                  v-model.trim="formInline.user"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
              </el-form-item>
              <el-form-item label="资源">
                <el-input
                  v-model.trim="formInline.user"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="operate">
          <el-button size="small" type="primary">
            查询
          </el-button>
          <el-button size="small" type="primary">
            重置
          </el-button>
          <div class="red"><span>*请至少输入一个查询条件</span></div>
        </div>
      </div>
      <div class="bottom">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="lot" label="LOT" width="120"> </el-table-column
          ><el-table-column prop="createUserName" label="工单" width="120">
          </el-table-column>
          <el-table-column prop="groupDes" label="状态" width="170">
          </el-table-column>
          <el-table-column prop="createUserName" label="工序" width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="物料/版本" width="170">
          </el-table-column>
          <el-table-column
            prop="modifyTime"
            label="工艺路线/版本"
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
        <div class="confirm">
          <el-button size="small" type="primary" @click="handleConfirm">
            确认
          </el-button>
          <el-button size="small" type="primary">
            取消
          </el-button>
        </div>
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
    },
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
    },
    //确认选择Lot
    handleConfirm() {
      this.goBack();
    }
  }
};
</script>

<style lang="scss">
.lotQuery {
  .el-page-header {
    padding: 10px 0px;
  }
  .detail {
    width: 100%;
    height: 400px;
    .top {
      width: 100%;
      height: 250px;
      padding: 10px;
      box-sizing: border-box;
      .condition {
        display: flex;
        width: 100%;
        height: 85%;
        .left {
          flex: 1;
          display: flex;
          .el-form {
            width: 350px;
            .el-form-item {
              margin-bottom: 10px;
              .el-select {
                .el-input {
                  width: 72%;
                }
              }
              .el-input {
                width: 65%;
              }
              .version {
                float: right;
              }
            }
          }
        }
        .right {
          flex: 1;
          .el-form {
            width: 300px;
            .el-form-item {
              margin-bottom: 10px;
              .el-input {
                width: 90%;
              }
            }
          }
        }
      }
      .operate {
        display: flex;
        padding-left: 100px;
        .red {
          line-height: 32px;
          padding: 0px 20px;
          span {
            color: red;
          }
        }
      }
    }
    .bottom {
      padding: 10px;
      .confirm {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
