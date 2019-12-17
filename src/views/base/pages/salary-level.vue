<template>
  <!-- huyoujuan 2019年12月17日14:04:34 -->
  <div>
    <div class="top-info">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工具名称：">
          <el-input
            v-model="formInline.user"
            placeholder="请输入工具名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="addDialog = true">
        新增
      </el-button>
      <el-button size="small" type="primary" @click="modifyDialog = true">
        修改
      </el-button>
      <el-button size="small" type="warning" @click="deleteDialog = true">
        删除
      </el-button>
      <el-button size="small" type="primary">导入</el-button>
      <el-button size="small" type="primary">导出</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="selectCheckBox"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="code" label="工资级别代码"></el-table-column>
      <el-table-column prop="name" label="工资级别名称"></el-table-column>
      <el-table-column prop="salary" label="小时工资"></el-table-column>
      <el-table-column prop="creater" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="->,total,prev,pager,next"
      :total="total"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="工资级别代码" :label-width="formLabelWidth">
          <el-input v-model="addForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工资级别名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小时工资" :label-width="formLabelWidth">
          <el-input v-model="addForm.salary" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(addForm)">重 置</el-button>
        <el-button type="primary" @click="addDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改模态框 -->
    <el-dialog title="修改" :visible.sync="modifyDialog">
      <el-form :model="modifyForm">
        <el-form-item label="工资级别代码" :label-width="formLabelWidth">
          <el-input
            v-model="modifyForm.code"
            autocomplete="off"
            disabled="false"
          ></el-input>
        </el-form-item>
        <el-form-item label="工资级别名称" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小时工资" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.salary" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(modifyForm)">重 置</el-button>
        <el-button type="primary" @click="modifyDialog = false">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const tableData = [
  {
    code: "#FFB6C1",
    name: "紫红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#FFB6C1",
    name: "紫红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#FFB6C1",
    name: "紫红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#FFB6C1",
    name: "紫红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    salary: "男",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  }
];
export default {
  data() {
    return {
      input1: "",
      input2: "",
      formInline: {
        user: "",
        region: ""
      },
      tableData,
      formLabelWidth: "120px",
      //分页
      currentPage: 1,
      pagesize: 5,
      total: tableData.length,
      // 新增模态框
      addDialog: false,
      addForm: {
        code: "",
        name: "",
        salary: ""
      },
      // 修改模态框
      modifyDialog: false,
      modifyForm: {
        code: "",
        name: "",
        salary: ""
      },
      //删除模态框
      deleteDialog: false
    };
  },
  methods: {
    onSubmit() {},
    handleSelectionChange() {},
    handleClose() {
      //   this.$confirm("确认关闭？");
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleReset(form) {
      form.code = "";
      form.name = "";
      form.salary = "";
    },
    selectCheckBox(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  }
};
</script>
<style lang="scss">
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
