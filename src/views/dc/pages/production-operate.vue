<template>
  <div class="jieBao">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        class="form-style"
        :label-width="formLabelWidth"
        :rules="searchFormRules"
        style="display:flex;align-items:center"
      >
        <el-form-item label="工序:" prop="operation">
          <!-- <dsn-input v-model="searchForm.operation"></dsn-input> -->
          <el-autocomplete
            v-model.trim="searchForm.operation"
            :fetch-suggestions="querySearchOperation"
            placeholder="请输入工序"
            @select="handleSelectOperation"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="设备:" prop="resource">
          <el-autocomplete
            v-model.trim="searchForm.resource"
            :fetch-suggestions="querySearchResource"
            placeholder="请输入设备"
            @select="handleSelectResource"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item
          label="LOT:"
          prop="lot"
          style="display:flex;align-items:center;width:300px"
        >
          <div style="display:flex;align-item:center">
            <dsn-input v-model="searchForm.lot" placeholder="请输入LOT"></dsn-input>
            <i class="el-icon-document-copy" @click="goQuery"></i>
          </div>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="checkForm('searchForm')"
            >查询</dsn-button
          >
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="resetForm"
            >重置</dsn-button
          >
        </el-form-item>
      </el-form>
      </DsnPanel>
    <div class="operation">
      <!-- <dsn-button type="primary" size="small" @click="goEdit">开始</dsn-button>
      <dsn-button type="primary" size="small" @click="reset">注销</dsn-button>
      <dsn-button type="primary" size="small">结束</dsn-button>
      <dsn-button type="primary" size="small">1号组</dsn-button>
      <dsn-button type="primary" size="small">2号组</dsn-button> -->
      <dsn-button type="primary" size="small" :key="item.sequence"
          :item="item"
          v-for="(item) in podButtons">
          {{ item.buttonId }}
      </dsn-button>
      <dsn-select :key="item.sequence" v-for="(item) in zuPodButtons" v-model="item.buttonId">
        <el-option
          v-for="data in item.podButtons"
          :key="data.sequence"
          :label="data.buttonId"
          :value="data.buttonId"
        ></el-option>
      </dsn-select>
    </div>
    <!--表单-->
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <dsn-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        height="514"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="120">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column
          prop="lot"
          label="LOT编号"
          width="120"
        >
          <template slot="header">
            <div class="inputChoice">
              <div class="input-left">LOT编号</div>
              <div class="input-right">
                <input
                  v-model="v"
                  class="input"
                  v-on:input="changeWork"
                  placeholder="请输入LOT编号"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="LOT状态"
          show-overflow-tooltip
        >
          <template slot="header">
            <div class="inputChoice">
              <div class="input-left">LOT状态</div>
              <div class="input-right">
                <input
                  v-model="v2"
                  class="input"
                  v-on:input="changeWorkS"
                  placeholder="请输入LOT状态"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="shopOrder"
          label="工单"
          show-overflow-tooltip
        >
          <template slot="header">
            <div class="inputChoice">
              <div class="input-left">工单</div>
              <div class="input-right">
                <input
                  v-model="v3"
                  class="input"
                  v-on:input="changeWorkO"
                  placeholder="请输入工单"
                />
              </div>
            </div>
          </template>
          </el-table-column>
        <el-table-column
          prop="material"
          label="物料"
          show-overflow-tooltip
        >
          <template slot="header">
            <div class="inputChoice">
              <div class="input-left">物料</div>
              <div class="input-right">
                <input
                  v-model="v4"
                  class="input"
                  v-on:input="changeWorkM"
                  placeholder="请输入物料"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="router"
          label="工艺路线"
          show-overflow-tooltip
        >
          <template slot="header">
            <div class="inputChoice">
              <div class="input-left">工艺路线</div>
              <div class="input-right">
                <input
                  v-model="v5"
                  class="input"
                  v-on:input="changeWorkR"
                  placeholder="请输入工艺路线"
                />
              </div>
            </div>
          </template>
        </el-table-column>
      </dsn-table>
    </DsnPanel>

    <!-- LOT模态框 -->
    <el-dialog title="lot" :visible.sync="lotDialog" width="50%">
      <span>
        <dimQueryLotModel
          :lot="lotDatas"
          @selectLot="selectLot"
        ></dimQueryLotModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="lotDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleSelectLot">
          确 定
        </dsn-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { listLotHttp } from "@/api/dc/lot.divestiture.api.js";
import dimQueryLotModel from "../components/dim-query-lots-model.vue";
import {
  listPodLotHttp,
  findPageHttp,
  findResourceListHttp
} from "@/api/dc/production.operate.api.js";
import {
  podConfigRequest,
} from "@/api/pro-configuration/pro-configuration.api.js";
import _ from "lodash";

export default {
  name: "productionOperate",
  components: {
    // mergeLotModel,
    dimQueryLotModel
  },
  data() {
    return {
      lotDialog: false,
      formLabelWidth: "80px",
      searchForm: {
        operation: "",
        lot: "",
        resource: ""
      },
      podButtons:[],
      zuPodButtons:[],
      searchFormRules: {
        operation: [
          { required: true, message: "请输入工序", trigger: "change" }
        ],
        lot: [{ required: true, message: "请输入lot", trigger: "change" }],
        resource: [{ required: true, message: "请输入设备", trigger: "change" }]
      },
      popupData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableData: [],
      list: [],
      lotDatas: [],
      currentLot: {},
      //工序搜索建议
      operationFn: null,
      operationList: [],
      //设备搜索建议
      resourceFn: null,
      resourceList: [],
      v:"",
      v2:"",
      v3:"",
      v4:"",
      v5:""
    };
  },
  created() {
    this.deBounceSearchOperation();
    this.deBounceSearchResource();
    this.handlePodConfig();
  },
  methods: {
    handlePodConfig() {
      const params = "AA";
      podConfigRequest(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          res.data.podButtons.forEach(item=>{
            if(item.groupFlag){
              this.zuPodButtons.push(item)
            }else{
              this.podButtons.push(item);
            }
          })
          console.log(this.zuPodButtons,"组数据")
          // 当前获取的数据放到vuex中，以便更改
        } else {
          this.$message({
            message: `${res.message}`,
            type: "warning"
          });
        }
      });
    },
    changeWork() {
      let arr = this.list.filter(item => {
        if(item.lot.indexOf(this.v)>=0){
          return  item.lot;
        }
      });
      this.list=arr;
    },
    changeWorkS() {
      let arr = this.list.filter(item => {
        if(item.status.indexOf(this.v2)>=0){
          return  item.status;
        }
      });
      this.list=arr;
    },
    changeWorkO() {
      let arr = this.list.filter(item => {
        if(item.shopOrder.indexOf(this.v3)>=0){
          return  item.shopOrder;
        }
      });
      this.list=arr;
    },
    changeWorkM() {
      let arr = this.list.filter(item => {
        if(item.material.indexOf(this.v4)>=0){
          return  item.material;
        }
      });
      this.list=arr;
    },
    changeWorkR() {
      let arr = this.list.filter(item => {
        if(item.router.indexOf(this.v5)>=0){
          return  item.router;
        }
      });
      this.list=arr;
    },
    //工序搜索建议请求
    deBounceSearchOperation() {
      this.operationFn = _.debounce(cb => {
        let data = { operation: this.searchForm.operation, pageSize: 0 };
        findPageHttp(data).then(data => {
          const res = data.data;
          if (res.code === 200) {
            this.operationList = res.data.data;
            this.operationList.forEach(element => {
              element.value = element.operation;
            });
            cb(this.operationList);
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }, 150);
    },
    //工序搜索建议
    querySearchOperation(queryString, cb) {
      this.operationFn(cb);
    },
    //工序搜索后的点击事件
    handleSelectOperation(item) {
      this.searchForm.operation = item.value;
    },
    //设备搜索建议请求
    deBounceSearchResource() {
      this.resourceFn = _.debounce(cb => {
        let data = { resource: this.searchForm.resource, pageSize: 0 };
        findResourceListHttp(data).then(data => {
          const res = data.data;
          if (res.code === 200) {
            this.resourceList = res.data.data;
            this.resourceList.forEach(element => {
              element.value = element.resource;
            });
            cb(this.resourceList);
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }, 150);
    },
    //设备搜索建议
    querySearchResource(queryString, cb) {
      this.resourceFn(cb);
    },
    //设备搜索后的点击事件
    handleSelectResource(item) {
      this.searchForm.resource = item.value;
    },

    //重置
    resetForm() {
      this.$refs["searchForm"].resetFields();
      this.tableData = [];
    },
    //查询lot列表
    goQuery() {
      const data = { lot: this.searchForm.lot };
      listLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.lotDatas = res.data;
          this.lotDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    goEdit() {},
    reset() {
      this.$router.go(0);
    },
    //获取lot弹出框单个选择的数据
    selectLot(row) {
      this.currentLot = row;
    },
    //弹出框确认选择lot
    handleSelectLot() {
      this.searchForm.lot = this.currentLot.lot;
      this.lotDialog = false;
    },
    //查询前验证表单
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleQuery();
        } else {
          return false;
        }
      });
    },
    //查询
    handleQuery() {
      const data = {
        lot: this.searchForm.lot,
        operation: this.searchForm.operation,
        resource: this.searchForm.resource
      };
      listPodLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.list =res.data;
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
<style lang="scss" scoped>
.jieBao {
  padding: 30px 30px;
  .inputChoice{
    .input-left{
      text-align:center;
      line-height:24px;
    }
    .input-right{
      input{
        width:100%;
        text-align:center;
        height:40px;
        border:1px #ededed solid;
      }
    }
  }
}
.operation {
  padding: 10px 5px;
}
.el-icon-document-copy {
  display: flex;
  align-items: center;
  margin: 0 40px 0 7px;
}
.popupBox {
  overflow-x: hidden;
  overflow: auto;
  display: flex;
  //  width: 600px;
  //  height:300px;
  line-height: 100px;
}
.el-dialog__body {
  padding: 10px 20px !important;
}
</style>
