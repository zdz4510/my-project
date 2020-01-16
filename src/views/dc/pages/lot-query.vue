<template>
  <div class="lotQuery">
    <el-page-header @back="goBack" content="查询"> </el-page-header>
    <div class="detail">
      <div class="top">
        <div class="condition">
          <div class="left">
            <el-form
              :model="lotConditionForm"
              label-width="110px"
              class="lotConditionForm"
            >
              <el-form-item label="LOT">
                <el-input
                  v-model.trim="lotConditionForm.lot"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="LOT状态">
                <el-select
                  v-model="lotConditionForm.lotStatus"
                  placeholder="LOT状态"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="新建" value="NEW"></el-option>
                  <el-option label="排队中" value="IN_QUEUE"></el-option>
                  <el-option label="工作中" value="IN_WORK"></el-option>
                  <el-option label="报废" value="SCRAP"></el-option>
                  <el-option label="已删除" value="DELETE"></el-option>
                  <el-option label="无效" value="INVALID"></el-option>
                  <el-option label="已完成" value="DONE"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物料">
                <el-input
                  v-model.trim="lotConditionForm.material"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
                <div class="version">
                  <span>版本：</span
                  ><span>{{ lotConditionForm.materialRev }}</span>
                </div>
              </el-form-item>
              <el-form-item label="工艺路线">
                <el-input
                  v-model.trim="lotConditionForm.router"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
                <div class="version">
                  <span>版本：</span
                  ><span>{{ lotConditionForm.routerRev }}</span>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-form
              :model="lotConditionForm"
              label-width="110px"
              class="demo-form-inline"
            >
              <el-form-item label="工单">
                <el-input
                  v-model.trim="lotConditionForm.shopOrder"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
              </el-form-item>
              <el-form-item label="工序">
                <el-input
                  v-model.trim="lotConditionForm.operation"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
              </el-form-item>
              <el-form-item label="资源">
                <el-input
                  v-model.trim="lotConditionForm.resource"
                  size="small"
                ></el-input>
                <i class="el-icon-document"></i>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="operate">
          <el-button size="small" type="primary" @click="handleQueryCheck">
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
import { searchLotDetailHttp } from "@/api/dc/lot.step.api.js";

export default {
  data() {
    return {
      tableData: [],
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
      }
    };
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({ name: "lotStep" });
    },
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
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
          console.log(res.data);
        }
      });
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
