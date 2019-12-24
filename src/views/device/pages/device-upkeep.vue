<template>
  <div class="deviceUpkeep">
    <div class="query">
      <div class="left">
        <el-form
          :model="upkeepForm"
          :rules="rules"
          ref="upkeepForm"
          label-width="100px"
          class="upkeepForm"
        >
          <el-form-item label="设备编号" prop="deviceType">
            <el-input
              v-model="upkeepForm.deviceType"
              placeholder="请输入设备设备编号"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="middle">
        <el-select v-model="upkeepForm.deviceType" class="upkeepCycle">
          <el-option label="月份" value="month"></el-option>
          <el-option label="季度" value="quarter"></el-option>
          <el-option label="天数" value="day"></el-option>
        </el-select>
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
        确认保养
      </el-button>
      <el-button size="small" type="primary">导出</el-button>
      <el-form
        :model="upkeepForm"
        :rules="rules"
        ref="upkeepForm"
        label-width="180px"
        class="upkeepForm"
      >
        <el-form-item label="本次保养附加描述:" prop="describe">
          <el-input
            v-model="upkeepForm.describe"
            placeholder="请输入本次保养附加描述"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="showInfo">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      upkeepForm: {
        deviceNumber: "",
        describe: ""
      },
      rules: {
        deviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ]
        // describe: [
        //   { required: true, message: "请输入本次保养附加描述", trigger: "blur" }
        // ]
      },
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
      ]
    };
  },
  methods: {
    handleQuery() {},
    handleReset() {},
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
    }
  }
};
</script>

<style lang="scss">
.deviceUpkeep {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
    display: flex;
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .middle {
      padding: 0 20px;
    }
    .right {
      width: 480px;
      padding: 5px 30px;
    }
  }
}
</style>
