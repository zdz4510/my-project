<template>
  <div class="container">
    <div class="formlabel">
      <el-form label-width="100px" class="typeForm">
        <el-form-item label="物料号:" prop="mat">
          <el-col style="margin-right:20px">
            <dsn-input
              placeholder="请输入物料号"
              @click.native="$event.target.select()"
              @keyup.native.enter="KeyUpEnterMat"
              v-model="formlabel.mat"
              ref="matInput"
            ></dsn-input>
          </el-col>
        </el-form-item>

        <el-form-item label="包装层级:" prop="packingClass">
          <dsn-select v-model="formlabel.packingClass" @change="changePack">
            <el-option
              v-for="item in this.packingClassOption"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </dsn-select>
        </el-form-item>

        <el-form-item label="作业方式:" prop="subordinateStatus">
          <dsn-select v-model="formlabel.subordinateStatus">
            <el-option label="包装" value="true"></el-option>
            <el-option label="解包" value="false"></el-option>
          </dsn-select>
        </el-form-item>

        <el-form-item label="输入容器:" prop="mainNumber">
          <el-col style="margin-right:20px">
            <dsn-input
              placeholder="输入容器"
              v-model="formlabel.mainNumber"
              @keyup.native.enter="KeyUpInfo"
              @change="changeMainNumber"
            ></dsn-input>
          </el-col>
        </el-form-item>

        <el-form-item label="被容器:" prop="subordinationNumber">
          <el-col style="margin-right:20px">
            <dsn-input
              placeholder="请输入被容器"
              v-model="formlabel.subordinationNumber"
              @keyup.native.enter="KeyUpSubordinationNumber"
            ></dsn-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div>
        <div class="operation">
          <dsn-button type="primary" size="small" @click="handleSave">完成装入</dsn-button>
          <dsn-button type="primary" size="small">包装打印</dsn-button>
          <dsn-button type="danger" size="small" @click="reset">装入重置</dsn-button>
          <el-checkbox v-model="dycheck" style="margin-left:10px">自动打印</el-checkbox>
        </div>
      </div>
    </div>
      <el-tabs type="border-card">
          <el-tab-pane label="数据收集组" style="height:200px; width:500px">
    <div class="baseForm">
      <el-form label-width="100px" class="typeForm" :model="baseForm">
        <el-form-item label="容器类型:">
          <el-col style="margin-right:20px">
            <dsn-input readonly v-model="baseForm.containerType" :disabled="true"></dsn-input>
          </el-col>
        </el-form-item>

        <el-form-item label="工单:" prop="shopOrder">
          <dsn-input readonly v-model="baseForm.shopOrder" :disabled="true"></dsn-input>
        </el-form-item>

        <el-form-item label="物料号:" prop="mat">
          <dsn-input readonly v-model="baseForm.mat" :disabled="true"></dsn-input>
        </el-form-item>

        <el-form-item label="编号规则:" prop="mainNumberType">
          <dsn-input readonly v-model="baseForm.mainNumberType" :disabled="true"></dsn-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="容器容纳数:" prop="accommodateNumber">
              <dsn-input v-model="baseForm.accommodateNumber" readonly :disabled="true"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前数量:" prop="currentNum">
              <dsn-input readonly v-model="baseForm.currentNum" :disabled="true"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="是否打印标签">
              <dsn-input v-model="baseForm.labelPrinting" :disabled="true"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
          </el-tab-pane>
   </el-tabs>
    <div class="list">
    <h3>包装清单</h3>
      <dsn-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="200"
      >
        <el-table-column prop="dataIndex" label="序号"></el-table-column>
        <el-table-column prop="subordinationNumber" label="被容器/LOT"></el-table-column>
        <el-table-column prop="createTime" label="包装时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createUserName" label="包装员" show-overflow-tooltip></el-table-column>
      </dsn-table>
    </div>

    <div class="log">
      <h3>日志记录</h3>
      <div style="background:#fff;width:100%;height:200px" v-html="logMsg">{{logMsg}}}</div>
    </div>
  </div>
</template>
<script>
import { getPagData } from "@/api/dc/unpack.api";
import {
  findContainerList,
  saveContainerInfo,
  resetContainerRelationship
} from "@/api/dc/packWork.api";
import _ from "lodash";
export default {
  data() {
    return {
      tableData: [],
      packingClassOption: [],
      dycheck: "false",
      logMsg: "",
      formlabel: {
        mat: "",
        mainNumber: "",
        subordinationNumber: "",
        subordinateStatus: "true",
        shopOrder:"",
        packingClass:""
      },
      baseForm: {
        containerType:"",
        labelPrinting:"",
        currentNum:"",
        accommodateNumber:"",
        mainNumberType:"",
        mat:"",
        shopOrder:"",
      }
    };
  },
  methods: {
    //完成装入按钮方法
    handleSave() {
      const payload = {
        container: this.baseForm,
        containerRelationshipList: this.tableData
      };
      saveContainerInfo(payload).then(res => {
        console.log(res, "resss");
        this.$message({
          message: "没有包装清单",
          type: "success"
        });
      });
    },
 //监听回车事件
    KeyUpEnterMat() {
     
      const payload = {
        currentPage: 1,
        pageSize: 0,
        mat: this.formlabel.mat
      };
      getPagData(payload).then(res => {
        const {
          data: {
            data: { data }
          }
        } = res;
        if (data.length) {
          const list = data.map(item => {
            return {
              name: item.packingClass,
              value: item.packingClass
            };
          });
          this.packingClassOption = _.uniqWith(list, _.isEqual);
        } else {
          this.$message({
            message: "没有该物料",
            type: "error"
          });
          this.baseForm = "";
          console.log(this.$refs.matInput);
          this.$refs.matInput.focus();
        }
      });
    },
    changeMainNumber(val) {
      this.baseForm.mainNumber = val;
    },
    reset() {
      resetContainerRelationship(this.baseForm.mainNumber).then;
    },
    getInfo(callback) {
      const payload = {
        ...this.formlabel,
        material: this.formlabel.mat
      };
      findContainerList(payload).then(res => {
        const {
          data: {
            data: { packagingConfiguration, containerRelationshipList, logMsg }
          }
        } = res;
        if (res.data.data.success) {
          if (packagingConfiguration) {
            this.baseForm = {
              ...this.baseForm,
              ...packagingConfiguration
            };
          } else {
            this.baseForm = {};
          }
          if (containerRelationshipList) {
            const tableData = containerRelationshipList.map((item, i) => {
              return {
                ...item,
                dataIndex: i + 1
              };
            });
            if (tableData.length) {
              console.log("aa");
            } else {
              this.tableData = tableData;
            }
          } else {
            this.tableData = [];
          }
        } else {
          this.baseForm = "";
          this.$message({
            message: "操作有误,请查看日志记录",
            type: "error"
          });
          this.logMsg += `<div>$${logMsg}<div/>`;
          console.log(logMsg, "LOGMSGGGG");
        }
        callback && callback(res);
      });
    },
   
    changePack() {
      this.getInfo();
    },
    KeyUpInfo() {
      this.getInfo();
    },
    KeyUpSubordinationNumber() {
      this.getInfo(res => {
        const {
          data: { data }
        } = res;
        if (data.success) {
          const list = {
            mainNumber: this.formlabel.mainNumber,
            subordinationNumber: this.formlabel.subordinationNumber,
            createTime: "2019-12-20 09:00:00",
            createUserName: "test",
            dataIndex: this.tableData.length + 1
          };
          console.log(list, "listtttt");
          const arr = this.tableData;
          arr.push(list);
          this.tableData = arr;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .formlabel {
    width: 50%;
    .operation {
      width: 100%;
      text-align: center;
    }
  }
  .baseForm {
    width: 50%;
  }
  .list {
    width: 50%;
  }
  .log {
    width: calc(50% - 20px);
    padding: 0 10px;
  }
}
</style>