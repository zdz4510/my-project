<template>
  <!-- liaojunjie 2019年12月14日11:53:14 -->
  <div>
    <div class="top-info">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="颜色名称：">
          <el-input
            v-model="formInline.user"
            placeholder="请输入颜色名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning">导出</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
    </div>
    <div class="operation">
      <el-button size="small" type="primary">新增</el-button>
      <el-button size="small" type="primary">修改</el-button>
      <el-button size="small" type="warning">删除</el-button>
      <el-button size="small" type="primary">导入</el-button>
      <el-button size="small" type="primary">导出</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="颜色代码">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="颜色名称"></el-table-column>
      <el-table-column prop="address" label="示例"></el-table-column>
      <el-table-column prop="phone" label="最后创建人"></el-table-column>
      <el-table-column prop="report" label="最后创建时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "#FFB6C1",
          name: "紫红",
          address: "男",
          phone: "yehuiyuan",
          report: "2019/11/21 14:07"
        },
        {
          date: "#800080",
          name: "红",
          address: "男",
          phone: "yehuiyuan",
          report: "2019/11/21 14:07"
        }
      ]
    };
  },
  methods: {
    onSubmit() {},
    handleSelectionChange() {}
  }
};
</script>
<style>
.el-input {
  display: inline;
}
.el-input .el-input__inner {
  width: 75%;
  height: 36px;
}

.el-tag {
  margin-right: 10px;
}

.top-info {
  width: 100%;
  height: 80px;
  background-color: #fff;
  line-height: 80px;
  padding: 0 30px;
  box-sizing: border-box;
}
.top-info .el-form-item__label {
  padding-right: 10px;
}
.top-info .el-form-item__content {
  line-height: 80px;
}
.top-info .el-button {
  padding: 10px 40px;
}
.top-info .el-form {
  height: 100%;
}
.operation {
  margin: 10px 0;
  padding: 0 20px;
}
</style>
