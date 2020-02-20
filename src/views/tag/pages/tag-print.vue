<template>
  <div class="tagPrint">
    <div class="top">
      <dsnPanel class="topLeft">
        <div slot="header" class="title clearfix">
          <span>搜索信息</span>
        </div>
        <el-form ref="form" :model="form" label-width="100px" :inline="true">
          <el-form-item label="标签应用类型">
              <el-select
                size="small"
                v-model="form.labelUseType"
                placeholder="请选择标签应用类型"
              >
                <el-option label="LOT" value="10"></el-option>
                <el-option label="容器" value="20"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="输入栏">
              <dsn-input size='small' v-model="form.name"></dsn-input>
          </el-form-item>
          <el-form-item>
              <dsn-button
                icon="el-icon-search"
                size="small"
                type="primary"
                @click="handleSearchByLotNo"
                >检索</dsn-button
              >
              <el-button icon="el-icon-printer" size="small" type="primary" class="mr-10">打印</el-button>
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
                <span class="name">物料组:</span>
                <span class="val">{{ info.matGroup }}</span>
              </div>
              <div class="item">
                <span class="name">容器层级:</span>
                <span class="val">{{ info.packingClass }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <dsnPanel class="showInfo">
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <dsn-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
       
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
      </dsn-table>
    </dsnPanel>
   
    <el-dialog title="删除" :visible.sync="showConfig" width="400">
      <tag-print-config />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showConfig = false">取 消</el-button>
        <el-button type="primary">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <DsnFooter ><dsn-button @click="handlePrintConfig">打印配置</dsn-button></DsnFooter>
  </div>
</template>

<script>
import {
  searchByLotNo,
  getPrintDevicesAvailable,
  searchLabelIdListByMat
} from "@/api/tag/tag.print.api.js";
import TagPrintConfig from "./tag-print-config";
import DsnFooter from "@/views/layout/dsn-footer";
export default {
  comments:{
    DsnFooter
  },
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
      labelList: []
    };
  },
  components: {
    TagPrintConfig
  },
  methods: {
    // 打印配置
    handlePrintConfig(){

    },
    //  检索
    handleSearchByLotNo() {
      searchByLotNo({
        labelApplyType: this.form.labelUseType,
        inputValue: this.form.name
      }).then(data => {
        const res = data.data;
        console.log('res')
        console.log(res)
        if (res.code == 200) {
          if(res.data) {
            this.info = res.data;
            this.handleSearchLabelIdListByMat();
            this.handleGetPrintDevicesAvailable()
          }
          
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
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
        mat:this.info.mat
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
.tagPrint {
  .mr-10 {
    margin-right: 10px;
  }
  .top {
    width: 100%;
    display: flex;
    .el-card {
      min-height: 300px;
      .el-form {
        max-width: 400px;;
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
        border: 1px solid #EBEEF5;
        .el-tabs__nav-wrap {
          margin-bottom: 0;
        }
        .el-tabs__nav {
          border:none;
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
