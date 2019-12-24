<template>
  <div class="maintenanceEdit">
    <div class="query">
      <div class="left">
        <el-form
          :model="typeForm"
          :rules="rules"
          ref="typeForm"
          label-width="100px"
          class="typeForm"
        >
          <el-form-item label="设备编号" prop="deviceType">
            <el-input
              v-model="typeForm.deviceType"
              placeholder="请输入设备编号"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="warning" @click="handleQuery">
          查询
        </el-button>
        <el-button size="small" type="info" @click="handleReset">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="success">
        新增
      </el-button>
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" type="success">
        修改
      </el-button>
      <el-button size="small" type="danger">
        删除
      </el-button>
      <el-button size="small" type="primary">导出</el-button>
    </div>
    <div class="showInfo">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"> 设备基础信息</span>
          <el-form
            ref="maintenanceGroupForm"
            :model="maintenanceGroupForm"
            label-width="110px"
          >
            <el-form-item label="组别描述:">
              <el-input
                type="textarea"
                v-model="maintenanceGroupForm.groupDiscribe"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="maintenanceGroupForm.status">
                <el-radio label="待用" value="10"></el-radio>
                <el-radio label="作业中" value="20"></el-radio>
                <el-radio label="待修" value="30"></el-radio>
                <el-radio label="报废" value="40"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="所在工作中心:">
              <el-input v-model="maintenanceGroupForm.workCenter"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="设备保养配置" class="deviceUpkeepSetting">
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="130px"
          >
            <el-form-item label="保养条件名称">
              <el-input
                v-model="formInline.user"
                placeholder="请输入保养条件名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养起始时间">
              <el-date-picker
                v-model="upkeepStartDate"
                type="date"
                placeholder="选择日期"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="保养条件描述">
              <el-input
                v-model="formInline.user"
                placeholder="请输入保养条件描述"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养人员">
              <el-input
                v-model="formInline.user"
                placeholder="请输入保养人员"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="预警事件">
              <el-input
                v-model="formInline.user"
                placeholder="请输入预警事件"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="保养周期">
              <el-input
                v-model="formInline.user"
                placeholder="保养周期"
                class="upkeepCycle"
                size="small"
              ></el-input>
              <el-select
                v-model="formInline.region"
                class="upkeepCycle"
                size="small"
              >
                <el-option label="月份" value="month"></el-option>
                <el-option label="季度" value="quarter"></el-option>
                <el-option label="天数" value="day"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用预警功能">
              <el-radio-group v-model="formInline.isWarning">
                <el-radio label="启用" value="true"></el-radio>
                <el-radio label="不启用" value="false"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="保养周期">
              <el-radio-group v-model="formInline.isWarning">
                <el-radio label="在线" value="online"></el-radio>
                <el-radio label="任意" value="any"></el-radio>
                <el-radio label="设备店" value="deviceStore"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            :header-cell-style="{ 'background-color': '#F5F7FA' }"
            height="200px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeForm: {
        deviceType: ""
      },
      rules: {
        deviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" }
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      //组别描述
      maintenanceGroupForm: {
        groupDiscribe: "",
        status: "",
        workCenter: ""
      },
      formInline: {
        user: "",
        region: "",
        isWarning: false
      },
      upkeepStartDate: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      selectionList: []
    };
  },
  methods: {
    handleQuery() {},
    handleReset() {},
    handleSelectionChange(val) {
      this.selectionList = val;
    }
  }
};
</script>

<style lang="scss">
.maintenanceEdit {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .right {
      width: 680px;
      padding: 5px 30px;
    }
  }
  .showInfo {
    .deviceUpkeepSetting {
      .el-form {
        // text-align: center;
        .el-form-item {
          width: 45%;
          margin-bottom: 0px;
          .upkeepCycle {
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
