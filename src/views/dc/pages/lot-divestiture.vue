<template>
  <div class="lotDivestiture">
    <div class="query">
      <div class="left">
        <el-form
          :model="lotDivestitureForm"
          :inline="true"
          ref="lotDivestitureForm"
          label-width="100px"
          class="lotDivestitureForm"
        >
          <el-form-item label="LOT" prop="lot">
            <el-input
              class="lot"
              v-model.trim="lotDivestitureForm.lot"
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
        <el-button size="small" type="primary">
          拆分
        </el-button>
      </div>
    </div>
    <div class="showInfo">
      <div class="left">
        <el-form :model="showInfo" label-width="140px" class="demo-form-inline">
          <el-form-item label="状态：">
            <el-input v-model.trim="showInfo.aaa" size="small"></el-input>
          </el-form-item>
          <el-form-item label="操作：">
            <el-input v-model.trim="showInfo.aaa" size="small"></el-input>
          </el-form-item>
          <el-form-item label="资源：">
            <el-input v-model.trim="showInfo.aaa" size="small"></el-input>
          </el-form-item>
          <el-form-item label="可拆分数量：">
            <el-input v-model.trim="showInfo.aaa" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-form :model="showInfo" label-width="140px" class="demo-form-inline">
          <el-form-item label="工单：">
            <el-input v-model.trim="showInfo.aaa" size="small"></el-input>
          </el-form-item>
          <el-form-item label="物料（版本）：">
            <el-input v-model.trim="showInfo.aaa" size="small"></el-input>
          </el-form-item>
          <el-form-item label="工艺路线（版本）：">
            <el-input v-model.trim="showInfo.aaa" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-form
      :model="lotDivestitureForm"
      ref="lotDivestitureForm"
      label-width="100px"
      class="newLot"
    >
      <el-form-item label="新LOT数量" prop="lot">
        <el-input
          class="lot"
          v-model.trim="lotDivestitureForm.lot"
          placeholder="请输入新LOT数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="新LOT" prop="lot">
        <el-input
          class="lot"
          v-model.trim="lotDivestitureForm.lot"
          placeholder="请输入新LOT"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lotDivestitureForm: {
        lot: ""
      },
      showInfo: {
        aaa: ""
      }
    };
  },
  methods: {
    //查询LOT状态信息
    handleQuery() {},
    //重置
    handleReset() {},
    //查询LOT
    goQuery() {}
  }
};
</script>

<style lang="scss">
.lotDivestiture {
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
  .newLot {
    width: 30%;
  }
}
</style>
