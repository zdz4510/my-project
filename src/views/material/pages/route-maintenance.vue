<template>
  <div class="workOrder">
    <dsnPanel class="query">
      <el-form :inline="true" class="typeForm" ref="form">
        <el-form-item label="工艺路线:">
          <dsn-input placeholder="请输入工艺路线" v-model="form.router">
            <i slot="append" class="el-icon-document-copy"></i>
          </dsn-input>
        </el-form-item>
        <el-form-item label="版本:">
          <dsn-input
            placeholder="请输入版本"
            v-model="form.revision"
          ></dsn-input>
        </el-form-item>
        <el-form-item>
        <dsn-button size="small" type="primary" icon='el-icon-search' @click="handleQuery">查询</dsn-button>
        <dsn-button size="small" type="primary" icon='el-icon-refresh' @click.native="reset">重置</dsn-button>
        <dsn-button size="small" type="danger" icon='el-icon-delete'>清除</dsn-button>
        <dsn-button size="small" type="success" icon='el-icon-check' @click="handleSave">保存</dsn-button>
        </el-form-item>
      </el-form>
    </dsnPanel>
    <div class="showInfo">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"> <i class="el-icon-date"></i> 一般 </span>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="描述：" prop="description">
              <el-input
                style="width:194px"
                v-model="form.description"
                placeholder="描述"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="当前版本：" prop="currentRevision">
              <el-checkbox v-model="form.currentRevision"></el-checkbox>
            </el-form-item>
            <el-form-item label="类型" prop="routerType">
              <el-select v-model="form.routerType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="附加工序">
          <pannel ref="panel" :search="searchValue" />
        </el-tab-pane>
        <el-tab-pane label="自定义字段">
          自定义字段
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  createRouter,
  getRouter,
  updateRouter
} from "@/api/material/route.maintenance.api";
import Pannel from "../components/pannel";
import handleData from "../components/handleData.js";
import handleRightData from "../components/handleRightData";
export default {
  components: {
    Pannel
  },
  data() {
    return {
      searchValue: "",
      form: {
        description: "", // 描述
        currentRevision: false, // 当前版本
        routerType: "",
        status: "",
        router: "AAAAAA",
        revision: "BBBBBB"
      },
      options: [
        {
          value: "P",
          label: "生产"
        },
        {
          value: "D",
          label: "处置"
        }
      ],
      options2: [
        {
          value: "Releasable",
          label: "可下达"
        },
        {
          value: "New",
          label: "新建"
        },
        {
          value: "Scrap",
          label: "作废"
        },
        {
          value: "Hold",
          label: "保留"
        }
        // {
        //   value: "5",
        //   label: "冻结"
        // }
      ],
      value: "",
      //工单表信息
      rules: {
        style: [{ required: true, message: "请选择类型", trigger: "blur" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        material: [
          { required: true, message: "请输入计划物料", trigger: "change" }
        ],
        number: [{ required: true, message: "请输入数量", trigger: "change" }],
        custom: [
          { required: true, message: "请输入自定义字段", trigger: "change" }
        ]
      },
      shopOrder: "", //最新工单
      oldShopOrder: "", //旧工单(也就是搜索的工单)
      tenantSiteCode: "",
      allOrders: [], //获取到的所有工单
      getSearchData: "", //查询获取的工单数据
      customizedFieldDefInfoList: [], //自定义字段信息
      dialogVisible: false //删除工单提示框
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.$refs["panel"].init();
      });
    },
    //重置
    reset() {
      console.log('reset')
      this.$refs['form'].resetFields();
    },

    //保存
    handleSave() {
      if(this.form.modifyTime && this.form.reference){
         console.log('save')
         this.handleUpdateRoute();
         return ;
      }
      this.handleCreateRouter();
    },
    handleUpdateRoute() {
      const data = this.$refs["panel"].getDataInfo();
      const { entryRouterStep, routerSteps } = handleData(data);

      const params = {
        currentRevision: this.form.currentRevision, // 当前版本
        customizedData: [], //  自定义的数据
        description: this.form.description, //  描述
        entryRouterStep: entryRouterStep, //  附加工序的根结点
        routerSteps: routerSteps, //  附加工序的数据
        router: this.form.router, //版本
        revision: this.form.revision, //工艺路线名称
        routerType: this.form.routerType,
        status: this.form.status,
        modifyTime: this.form.modifyTime,
        reference: this.form.reference
      };
      updateRouter(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "更新成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    // 创建路线
    handleCreateRouter() {
      //  获取 附加工序的数据
      const data = this.$refs["panel"].getDataInfo();
      const { entryRouterStep, routerSteps } = handleData(data);

      const params = {
        currentRevision: this.form.currentRevision, // 当前版本
        customizedData: [], //  自定义的数据
        description: this.form.description, //  描述
        entryRouterStep: entryRouterStep, //  附加工序的根结点
        routerSteps: routerSteps, //  附加工序的数据
        router: this.form.router, //版本
        revision: this.form.revision, //工艺路线名称
        routerType: this.form.routerType,
        status: this.form.status
      };
      createRouter(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "新增成功"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      });
    },
    handleQuery() {
      getRouter({
        revision: this.form.revision,
        router: this.form.router
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          const {
            description,
            currentRevision,
            routerType,
            status,
            revision,
            router,
            entryRouterStep,
            routerSteps,
            reference,
            modifyTime
          } = res.data;
          this.form = {
            description: description, // 描述
            currentRevision: currentRevision, // 当前版本
            routerType: routerType,
            status: status,
            router: router,
            revision: revision,
            reference,
            modifyTime
          };
          const data = handleRightData({
            entryRouterStep,
            routerSteps
          });
          // 重新渲染 附加工序的图
          this.$refs["panel"].dataReload({
            nodeList: data.nodes,
            lineList: data.lines
          });
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
.workOrder {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  .showInfo {
    flex: 1;
    overflow: hidden;
    .el-tabs {
      height: 100%;
      box-sizing: border-box;
      .el-tabs__content {
        height: 100%;
            box-sizing: border-box;
        .el-tab-pane {
          height: 100%;
              box-sizing: border-box;
        }
      }
    }
  }
  .el-tabs--border-card > .el-tabs__header {
    background: #Fff;
  }
}
//选择弹框
.choiceBox {
  width: 15px;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
}
.version {
  width: 300px;
  display: inline-block;
}
.el-form-item__content {
  display: flex;
}
</style>
