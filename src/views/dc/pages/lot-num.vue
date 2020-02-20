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
              <dsn-input class="lot" v-model.trim="lotForm.lot" :disabled="unShowInput" placeholder="请输入LOT"></dsn-input>
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
                <el-input v-model.trim="showInfo.materialRev" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="工艺路线（版本）：">
                <el-input v-model.trim="showInfo.routerRev" size="small" :disabled="true"></el-input>
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
              <el-form-item label="排队数量" prop="quantity">
                <el-input
                  class="lot"
                  v-model.trim="lotDivestitureForm.quantity"
                  :disabled="showInput"
                  placeholder="排队数量"
                ></el-input>
              </el-form-item>
              <el-form-item label="新排队数量" prop="num">
                <dsn-input class="quantity" v-model.trim="lotDivestitureForm.num" placeholder="请输入新排队数量"></dsn-input>
              </el-form-item>
              <el-form-item>
                <dsn-button size="small" @click.native="changeNum">调整</dsn-button>
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
  listLotHttp
} from "@/api/dc/lot.divestiture.api.js";
import {
  adjustLotQuantityHttp
} from "@/api/dc/lot.num.api.js";
import allLotModel from "../components/all-lots-model.vue";

export default {
  name: "lotDivestiture",
  inject: ["defaltDialogWidth"],
  components: {
    allLotModel
  },
  data() {
    return {
        lotForm: {
            lot: ""
        },
        lotFormRules: {
            lot: [{ required: true, message: "请输入lot", trigger: "blur" }]
        },
        showInfo: {
            status: "",
            operationList: "",
            resourceList: "",
            quantity: "",
            shopOrder: "",
            materialRev: "",
            routerRev: "",
        },
        lotDialog: false,
        lotDivestitureForm: {
            quantity: "",
            num:"",// 新排队数量
        },
        lotDivestitureFormRules: {
            // lot: [{ required: true, message: "请输入lot", trigger: "change" }],
            quantity: [
            { required: true, message: "请输入排队数量", trigger: "blur" }
            ],
            num:[
            { required: true, message: "请输入新排队数量", trigger: "blur" }
            ],
        },
        tableData: [],
        currentLot: {},
        showInput:true,
        unShowInput:false
        };
    },
    // watch: {
    //     quantity: {
    //     handler() {
    //         console.log("watch");
    //     },
    //     immediate: true,
    //     deep: true
    //     }
    // },  
  methods: {
      changeNum(){
          if(this.lotForm.lot===""){
              this.$message({
                message: "请先执行查询操作",
                type: "warning"
                });
          }else{
            const data={
                lot:this.lotForm.lot,
                newQuantity:this.lotDivestitureForm.num
            }
            adjustLotQuantityHttp(data).then(data => {
                const res = data.data;
                if (res.code === 200) {
                    console.log(res,"数据");
                }else{
                    this.$message({
                    message: res.message,
                    type: "warning"
                    });
                }
            });
          }
      },
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
          console.log(res.data,"数据")
          this.showInfo = res.data;
          this.lotDivestitureFormRules.quantity=res.data.wipSteps[0].stepQuantity;
          const operations = res.data.operationList.join(",");
          this.showInfo.operationList = operations;
          const resources = res.data.resourceList.join(",");
          this.showInfo.resourceList = resources;
          this.unShowInput=true;
        }
      });
    },
    //重置
    handleReset() {
      this.$refs["lotForm"].resetFields();
      this.$refs["lotDivestitureForm"].resetFields();
      this.unShowInput=false;
      this.showInfo = {
        status: "",
        operationList: "",
        resourceList: "",
        quantity: "",
        shopOrder: "",
        materialRev: "",
        routerRev: ""
      };
    },
    //查询LOT
    goQuery() {
      const data = { lot: this.lotForm.lot };
      console.log(data,"数据集")
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
  // padding: 10px 30px;
  // .query {
  //   display: flex;
  //   .left {
  //     .lot {
  //       width: 90%;
  //     }
  //   }
  // }
  // .showInfo {
  //   display: flex;
  //   width: 100%;
  //   height: 85%;
  //   padding: 10px 10px;
  //   background: white;
  //   .left {
  //     flex: 1;
  //     .el-form {
  //       width: 350px;
  //       .el-form-item {
  //         margin-bottom: 0px;
  //         .el-input__inner {
  //           border: 0px;
  //         }
  //       }
  //     }
  //   }
  //   .right {
  //     flex: 1;
  //     .el-form {
  //       width: 350px;
  //       .el-form-item {
  //         margin-bottom: 0px;
  //         .el-input__inner {
  //           border: 0px;
  //         }
  //       }
  //     }
  //   }
  // }
  // .newLot {
  //   width: 30%;
  // }
}
</style>