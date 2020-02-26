<template>
  <div class="tag-print-page">
    <div class="top">
      <dsnPanel class="topLeft">
        <div slot="header" class="title clearfix">
          <span>搜索信息</span>
        </div>
        <el-form ref="form" :model="form" label-width="100px" :inline="true">
          <el-form-item label="标签应用类型">
            <el-select size="small" v-model="form.labelUseType" placeholder="请选择标签应用类型">
              <el-option label="LOT" value="10"></el-option>
              <el-option label="容器" value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接收值">
            <dsn-input size="small" v-model="form.name"></dsn-input>
          </el-form-item>
          <el-form-item>
            <dsn-button
              icon="el-icon-search"
              size="small"
              type="primary"
              @click="handleSearchByLotNo"
            >检索</dsn-button>
            <el-button
              icon="el-icon-printer"
              size="small"
              type="primary"
              class="mr-10"
              @click="print"
            >打印</el-button>
            <el-checkbox v-model="autoPrint">自动打印</el-checkbox>
          </el-form-item>
        </el-form>
      </dsnPanel>
      <div class="topRight">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="基础信息" name="baseInfo">
            <div class="showData">
              <div class="item">
                <span class="name">物料号：</span>
                <span class="val">{{ info.mat }}</span>
              </div>
              <div class="item">
                <span class="name">工单号:</span>
                <span class="val">{{ info.shopOrder }}</span>
              </div>
              <div class="item">
                <span class="name">包装层级:</span>
                <span class="val">{{ info.packingClass }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <dsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
       
        height="350px"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="接收值" width="100"></el-table-column>
        <el-table-column prop="label" label="标签ID" width="100"></el-table-column>
        <el-table-column prop="labelUseType" label="标签应用类型" width="100"></el-table-column>
        <el-table-column prop="matGroup" label="物料组" width="100"></el-table-column>
        <el-table-column prop="mat" label="物料号" width="100"></el-table-column>
        <el-table-column prop="shopOrder" label="工单号" width="100"></el-table-column>
        <el-table-column prop="groupDes" label="包装层级" width="100"></el-table-column>
        <el-table-column prop="containerType" label="容器类型" width="100"></el-table-column>
        <el-table-column prop="printCopies" label="打印份数" width="100"></el-table-column>
        <el-table-column prop="printDevice" label="打印设备" width="100"></el-table-column>
        <el-table-column prop="modifyUserName" label="打印人员" width="100"></el-table-column>
        <el-table-column prop="modifyTime" label="打印时间" show-overflow-tooltip></el-table-column>
      </el-table>
    </dsnPanel>

    <el-dialog title="标签配置" :visible.sync="showConfig" width="400">
      <tag-print-config :labelList="labelList" v-model="configArr" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showConfig = false">取 消</el-button>
        <el-button type="primary" @click="handleTagConfigConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <DsnFooter>
      <dsn-button :disabled="this.info.mat===''" @click="handlePrintConfig">打印配置</dsn-button>
      <!-- <dsn-button @click="handlePrintConfig">打印配置</dsn-button> -->
    </DsnFooter>
  </div>
</template>

<script>
import {
  searchByLotNo,
  getPrintDevicesAvailable,
  searchLabelIdListByMat,
  printLabel
} from "@/api/tag/tag.print.api.js";
import TagPrintConfig from "./tag-print-config";
import DsnFooter from "@/views/layout/dsn-footer";
import moment  from  'moment'
export default {
  data() {
    return {
      form: {
        name: "",
        labelUseType: ""
      },
      list: [], // 可用打印设备数组
      autoPrint: false,
      activeName: "baseInfo",
      
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      showConfig: false,
      selectionList: [],
      info: {
        matGroup: "",
        mat: "",
        packingClass: ""
      },
      cloneInfo: {
        matGroup: "",
        mat: "",
        packingClass: "",
        shopOrder:""
      },
      labelList: [],
      configArr: [],
      nextInfo: {
        matGroup: "",
        mat: "",
        packingClass: "",
        shopOrder:''
      }
    };
  },
  components: {
    TagPrintConfig,
    DsnFooter
  },
  created(){
   
  },
  methods: {
    // 打印配置
    handlePrintConfig() {
      this.showConfig = true;
    },
    async printLabelAysnc(configArr) {
      try {
        for (let index = 0; index < configArr.length; index++) {
          const element = configArr[index];
          const data = await printLabel(element);
          const res = data.data;
          if (res.code == 200) {
            this.addPrintLog(element);
            this.$message({
              type: "success",
              message: "打印成功"
            });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 打印标签
    print() {
      this.printLabelAysnc(this.configArr);
    },
    // 添加打野记录
    addPrintLog(config) {
      const { printDevice, label, printCopies } = config;
      const {labelUseType,name} = this.form;
      const { 
        matGroup,mat,packingClass,containerType} = this.info;
      this.tableData.push({
        printDevice,
        label,
        printCopies,
        labelUseType,
        matGroup,
        mat,
        packingClass,
        name ,  // 接受值
        containerType,
        modifyTime:moment().format('YYYY-MM-DD HH:mm:SS')
      })
    },
    // 标签打印配置的
    handleTagConfigConfirm() {
      // 如果勾选了自动打印
      if (this.autoPrint) {
        this.print();
      }
      // 不管有没有勾选弹出框点击确认后都要消失
      this.showConfig = false;
    },
    //  检索
    handleSearchByLotNo() {
      searchByLotNo({
        labelApplyType: this.form.labelUseType,
        inputValue: this.form.name
      }).then(data => {
        const res = data.data;
        console.log("res");
        console.log(res);
        if (res.code == 200) {
          if (res.data) {
            this.nextInfo = this.info; //吧这次的info 给next
            this.info = res.data; // 获取最新的info
            //  判断这次的info 和上次的info 是不是相同的
            this.compareInfo();
            this.handleSearchLabelIdListByMat();
            // this.handleGetPrintDevicesAvailable();
          }
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    compareInfo() {
      const {
        matGroup: nextMatGroup,
        mat: nextMat,
        packingClass: nextPackingClass
      } = this.nextInfo;
      //  这是第一次为空  不用比较
      if (nextMatGroup === "" && nextMat === "" && nextPackingClass === "") {
        return;
      }

      const { matGroup, mat, packingClass } = this.info;
      if (
        nextMatGroup === matGroup &&
        mat === nextMat &&
        nextPackingClass === packingClass
      ) {
        //
        console.log("----");
      } else {
        this.configArr = [];
      }
    },
    //  获取可用的打印设备
    handleGetPrintDevicesAvailable() {
      getPrintDevicesAvailable().then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.list = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    //  搜索可用的标签id
    handleSearchLabelIdListByMat() {
      searchLabelIdListByMat({
        mat: this.info.mat
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.labelList = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.tag-print-page{
  .mr-10 {
    margin-right: 10px;
  }
  .top {
    width: 100%;
    display: flex;
    .el-card {
      min-height: 300px;
      .el-form {
        max-width: 400px;
      }
    }
    .topLeft {
      flex: 1;
      height: 100%;
      margin-right: 15px;
      .el-form {
        .el-form-item {
          margin-bottom: 5px;
          .el-select {
            width: 100%;
          }
        }
      }
    }
    .topRight {
      flex: 1;
      height: 100%;
      .el-tabs {
        min-height: 300px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        .el-tabs__nav-wrap {
          margin-bottom: 0;
        }
        .el-tabs__nav {
          border: none;
        }
        .el-tabs__header .el-tabs__item {
          padding: 15px;
          height: auto;
          line-height: 20px;
          font-size: 15px;
        }
      }
      .showData {
        padding: 0 10px;
        .item {
          margin-bottom: 15px;
          .name {
            font-size: 13px;
            color: #666;
          }
        }
      }
    }
  }
  .showInfo {
  }
}
</style>
