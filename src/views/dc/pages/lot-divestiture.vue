<template>
  <div class="lotDivestiture">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :model="lotForm" :inline="true" ref="lotForm" class="lotForm" :rules="lotFormRules">
        <el-form-item label="LOT" prop="lot">
          <el-row>
            <el-col :span="22">
              <dsn-input class="lot" v-model.trim="lotForm.lot" placeholder="请输入LOT"></dsn-input>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-document" @click="goQuery"></i>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="checkForm('lotForm')"
          >查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="handleReset">重置</dsn-button>
          <dsn-button
            size="small"
            type="primary"
            icon="el-icon-scissors"
            :disabled="lotForm.lot === ''"
            @click="handleDivestiture"
          >拆分</dsn-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件end -->
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <!-- 查询结果start -->
      <div>
        <el-form :model="showInfo" label-width="140px" class="showInfo">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="状态：">
                <el-input v-model.trim="showInfo.status" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="操作：">
                <el-input v-model.trim="showInfo.operationList" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="资源：">
                <el-input v-model.trim="showInfo.resourceList" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="可拆分数量：">
                <el-input v-model.trim="showInfo.quantity" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="工单：">
                <el-input v-model.trim="showInfo.shopOrder" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="物料（版本）：">
                <el-input v-model.trim="showInfo.materialInfo" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="工艺路线（版本）：">
                <el-input v-model.trim="showInfo.routerInfo" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 查询结果end -->
      <div style="margin-top:50px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form
              :model="lotDivestitureForm"
              ref="lotDivestitureForm"
              label-width="140px"
              class="newLot"
              :rules="lotDivestitureFormRules"
            >
              <el-form-item label="新LOT数量" prop="quantity">
                <dsn-input
                  class="lot"
                  v-model.number="lotDivestitureForm.quantity"
                  placeholder="请输入新LOT数量"
                ></dsn-input>
              </el-form-item>
              <el-form-item label="新LOT" prop="lot">
                <dsn-input class="lot" v-model.trim="lotDivestitureForm.lot" placeholder="请输入新LOT"></dsn-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </DsnPanel>

    <el-dialog title="lot" :visible.sync="lotDialog" :width="defaltDialogWidth">
      <span>
        <allLotModel :lot="tableData" @selectLot="selectLot"></allLotModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="lotDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSelectLot">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findLotAtOperationHttp,
  listLotHttp,
  splitLotHttp
} from "@/api/dc/lot.divestiture.api.js";
import allLotModel from "../components/all-lots-model.vue";

export default {
  name: "lotDivestiture",
  inject: ["defaltDialogWidth"],
  components: {
    allLotModel
  },
  data() {
    const validatorLot = (rule, value, callback) => {
      // debugger;
      if (value === "") {
        callback("lot不能为空");
      }
      let reg = /^([A-Z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("lot格式应只包含（[A-Z,0-9,_,-,/]）");
      }
      callback();
    };
    const validatorNewLot = (rule, value, callback) => {
      // debugger;
      if (value === "") {
        callback("lot不能为空");
      }
      let reg = /^([A-Z]|[0-9]|_|-|\/)+$/;
      if (!reg.test(value)) {
        callback("lot格式应只包含（[A-Z,0-9,_,-,/]）");
      }
      callback();
    };
    return {
      lotForm: {
        lot: ""
      },
      lotFormRules: {
        lot: [{ required: true, validator: validatorLot, trigger: "blur" }]
      },
      showInfo: {
        status: "",
        operationList: "",
        resourceList: "",
        quantity: "",
        shopOrder: "",
        materialRev: "",
        routerRev: "",
        materialInfo: "",
        routerInfo: ""
      },
      lotDialog: false,
      lotDivestitureForm: {
        lot: "",
        quantity: 0
      },
      lotDivestitureFormRules: {
        lot: [{ required: true, validator: validatorNewLot, trigger: "blur" }],
        quantity: [
          { required: true, message: "请输入lot数量", trigger: "blur" },
          { type: "number", message: "lot必须为数字值", trigger: "blur" }
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
          this.showInfo.materialInfo = `${res.data.material}(${res.data.materialRev})`;
          this.showInfo.routerInfo = `${res.data.router}(${res.data.routerRev})`;
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
    },
    //弹出框确认选择lot
    handleSelectLot() {
      if (this.currentLot.lot === "") {
        this.$message({
          message: "请选择一个lot",
          type: "warning"
        });
        return;
      }
      this.lotForm.lot = this.currentLot.lot;
      this.lotDialog = false;
    },
    //拆分
    handleDivestiture() {
      const data = {
        lot: this.lotForm.lot,
        splitList: [this.lotDivestitureForm]
      };
      splitLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$refs["lotDivestitureForm"].resetFields();
          this.$message({
            message: res.message,
            type: "success"
          });
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    }
  }
};
</script>

<style lang="scss">
.lotDivestiture {
  .showInfo {
    background: #eee9e9;
    padding: 10px;
    background-color: rgba(245, 244, 244, 0.5);
    .el-form-item {
      margin-bottom: 0px;
      .el-input__inner {
        border: 0px;
        opacity: 1;
        background-color: #fff;
      }
    }
  }
}
</style>
