<template>
  <div class="typeEdit">
    <div class="query">
      <div class="left">
        <el-form
          :model="typeForm"
          :rules="rules"
          ref="typeForm"
          label-width="100px"
          class="typeForm"
        >
          <el-form-item label="设备类型" prop="deviceType">
            <el-input
              v-model="typeForm.deviceType"
              placeholder="请输入设备类型"
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
      <el-form ref="typeGroupForm" :model="typeGroupForm" label-width="80px">
        <el-form-item label="组别描述">
          <el-input
            type="textarea"
            v-model="typeGroupForm.groupDiscribe"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :data="data"
      >
      </el-transfer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = () => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu"
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
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
      typeGroupForm: {
        groupDiscribe: ""
      },
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  },
  methods: {
    handleQuery() {},
    handleReset() {}
  }
};
</script>

<style lang="scss">
.typeEdit {
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
    .el-transfer {
      .el-transfer-panel {
        width: 35%;
      }
    }
  }
}
</style>
