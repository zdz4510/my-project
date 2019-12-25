<template>
  <div class="deviceType">
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
      <el-button
        size="small"
        type="success"
        @click="checkSelectionLength(handleAdd)"
      >
        新增
      </el-button>
      <el-button size="small" type="primary">保存</el-button>
      <el-button
        size="small"
        type="success"
        @click="checkSelectionLength(handleEdit)"
      >
        修改
      </el-button>
      <el-button size="small" type="danger" @click="handleDelete">
        删除
      </el-button>
      <el-button size="small" type="primary">导出</el-button>
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
      typeForm: {
        deviceType: ""
      },
      rules: {
        deviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" }
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
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
      ],
      selectionList: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
    },
    //点击新增和编辑前验证所选项的长度
    checkSelectionLength(handle) {
      console.log(handle);
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      if (this.selectionList.length === 1) {
        handle();
        return;
      }
      if (this.selectionList.length > 1) {
        this.$message({
          message: "只能选择一项哦",
          type: "warning"
        });
        return;
      }
    },
    handleAdd() {
      this.$router.push({ path: "/device/deviceTypeEdit" });
    },
    handleEdit() {
      this.$router.push({ path: "/device/deviceTypeEdit" });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      console.log("删除了" + this.selectionList.length + "项");
    },
    handleQuery() {},
    handleReset() {}
  }
};
</script>

<style lang="scss">
.deviceType {
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
}
</style>
