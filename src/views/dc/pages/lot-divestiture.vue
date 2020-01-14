<template>
  <div class="lotDivestiture">
    <div class="query">
      <div class="left">
        <el-form
          :model="lotForm"
          :inline="true"
          ref="lotForm"
          label-width="100px"
          class="lotForm"
          :rules="lotFormRules"
        >
          <el-form-item label="LOT" prop="lot">
            <el-input
              class="lot"
              v-model.trim="lotForm.lot"
              placeholder="请输入LOT"
            ></el-input>
            <i class="el-icon-document" @click="goQuery"></i>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="primary" @click="checkForm('lotForm')">
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
            <el-input
              v-model.trim="showInfo.status"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="操作：">
            <el-input
              v-model.trim="showInfo.operationList"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源：">
            <el-input
              v-model.trim="showInfo.resourceList"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="可拆分数量：">
            <el-input
              v-model.trim="showInfo.quantity"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-form :model="showInfo" label-width="140px" class="demo-form-inline">
          <el-form-item label="工单：">
            <el-input
              v-model.trim="showInfo.shopOrder"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="物料（版本）：">
            <el-input
              v-model.trim="showInfo.materialRev"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="工艺路线（版本）：">
            <el-input
              v-model.trim="showInfo.routerRev"
              size="small"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-form
      :model="lotDivestitureForm"
      ref="lotDivestitureForm"
      label-width="100px"
      class="newLot"
      :rules="lotDivestitureFormRules"
    >
      <el-form-item label="新LOT数量" prop="quantity">
        <el-input
          class="lot"
          v-model.trim="lotDivestitureForm.quantity"
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
    <el-dialog title="lot" :visible.sync="lotDialog" width="30%">
      <span>
        <allLotModel :lot="tableData" @selectLot="selectLot"></allLotModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lotDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectLot">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findLotAtOperationHttp,
  listLotHttp
} from "@/api/dc/lot.divestiture.api.js";
import allLotModel from "../components/all-lots-model.vue";

export default {
  name: "lotDivestiture",
  components: {
    allLotModel
  },
  data() {
    return {
      lotForm: {
        lot: ""
      },
      lotFormRules: {
        lot: [{ required: true, message: "请输入lot", trigger: "change" }]
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
      lotDialog: false,
      lotDivestitureForm: {
        lot: "",
        quantity: 0
      },
      lotDivestitureFormRules: {
        lot: [{ required: true, message: "请输入lot", trigger: "change" }],
        quantity: [
          { required: true, message: "请输入lot数量", trigger: "change" }
        ]
      },
      tableData: [],
      currentLot: {}
    };
  },
  methods: {
    //验证表单信息
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleQuery();
        } else {
          return false;
        }
      });
    },
    //查询LOT状态信息
    handleQuery() {
      const data = { lot: this.lotForm.lot };
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
    handleReset() {
      this.$refs["lotForm"].resetFields();
      this.$refs["lotDivestitureForm"].resetFields();
      this.showInfo = {};
    },
    //查询LOT
    goQuery() {
      const data = { lot: this.lotForm.lot };
      listLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data;
          this.lotDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //获取弹出框选择的数据
    selectLot(val) {
      this.currentLot = val;
      console.log(this.currentLot);
    },
    //弹出框确认选择lot
    handleSelectLot() {
      this.lotForm.lot = this.currentLot.lot;
      this.lotDialog = false;
    }
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
