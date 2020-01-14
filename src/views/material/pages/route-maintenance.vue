<template>
  <div class="workOrder">
    <div class="query">
      <div class="left">
        <el-form label-width="80px" :inline="true" class="typeForm">
          <el-form-item label="工艺路线:">
            <el-input placeholder="请输入工艺路线" v-model="shopOrder">
              <i slot="append" class="el-icon-document-copy"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="版本:">
            <el-input placeholder="请输入版本" v-model="shopOrder"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="right">
        <el-button size="small" type="primary">查询</el-button>
        <el-button size="small" type="primary" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="handleSave"
        >保存</el-button
      >
      <el-button size="small" type="danger">清除</el-button>
    </div>

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
            <el-form-item label="状态" prop="state">
              <el-select v-model="value" placeholder="请选择">
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
import { createRouter } from "@/api/material/route.maintenance.api";
import Pannel from "../components/pannel";
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
        status: ""
      },
      options: [
        {
          value: "1",
          label: "生产"
        },
        {
          value: "2",
          label: "处置"
        },
        {
          value: "3",
          label: "工艺路线"
        }
      ],
      options2: [
        {
          value: "1",
          label: "可下达"
        },
        {
          value: "2",
          label: "新建"
        },
        {
          value: "3",
          label: "作废"
        },
        {
          value: "4",
          label: "保留"
        },
        {
          value: "5",
          label: "冻结"
        }
      ],
      value: "",
      //工单表信息
      ruleForm: {
        shopOrderType: "", //类型
        status: "", //状态
        plannedMaterial: "", //计划物料
        plannedMaterialRev: "", //计划物料版本
        plannedRouter: "", //计划工艺路线
        plannedRouterRev: "", //计划工艺路线版本
        productQty: "", //生产数量
        releasedQuantity: "", //已下达数量
        kay_1: "",
        kay_2: "",
        kay_3: ""
      },
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
        this.$nextTick(()=>{
          this.$refs["panel"].init();
        })
    },
    //重置
    reset() {},

    //保存
    handleSave() {},
    // 创建路线
    handleCreateRouter() {
      const data = {};
      createRouter(data).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message("常见成功");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.workOrder {
  padding: 0 30px;
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      flex: 1;
      margin-right: 7px;
    }

    .right {
      width: 200px;
      padding: 5px 30px;
    }
  }
  .operate {
    padding: 10px 5px;
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
