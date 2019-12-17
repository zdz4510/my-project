<template>
  <!-- liaojunjie 2019年12月16日09:52:42 -->
  <div>
    <div class="top-info">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称：">
          <el-input v-model="formInline.user" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="addDialog = true">新增</el-button>
      <el-button size="small" type="primary" @click="modifyDialog = true">修改</el-button>
      <el-button size="small" type="warning" @click="deleteDialog = true">删除</el-button>
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
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="code" label="客户代码">
        <!-- <template slot-scope="scope">{{ scope.row.code }}</template> -->
      </el-table-column>
      <el-table-column prop="name" label="客户简称"></el-table-column>
      <el-table-column prop="address" label="客户名称"></el-table-column>
      <el-table-column prop="floating" label="款式浮余度"></el-table-column>
      <el-table-column prop="phone" label="最后创建人"></el-table-column>
      <el-table-column prop="report" label="最后创建时间"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="->,total,prev,pager,next"
      :total="total"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="客户代码" :label-width="formLabelWidth">
          <el-input v-model="addForm.code" autocomplete="off" :placeholder="defaultAddCode"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
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
        <el-form-item label="客户代码" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.code" autocomplete="off" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(modifyForm)">重 置</el-button>
        <el-button type="primary" @click="modifyDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%" :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const tableData = [
  {
    date: "DH",
    name: "紫红",
    address: "男",
    floating: "1",
    phone: "yehuiyuan",
    report: "2019/11/21 14:07"
  },
  {
    date: "DSN",
    name: "红",
    address: "男",
    floating: "0.8",
    phone: "yehuiyuan",
    report: "2019/11/21 14:07"
  },
  {
    date: "FC",
    name: "红",
    address: "男",
    floating: "0.7",
    phone: "yehuiyuan",
    report: "2019/11/21 14:07"
  },
  {
    date: "GLV",
    name: "红",
    address: "男",
    floating: "0.2",
    phone: "yehuiyuan",
    report: "2019/11/21 14:07"
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
        purpose: ""
      },
      defaultAddCode: "T004",
      // 修改模态框
      modifyDialog: false,
      modifyForm: {
        code: "",
        name: "",
        purpose: ""
      },
      //删除模态框
      deleteDialog: false
    };
  },
  methods: {
    onSubmit() {},
    handleSelectionChange() {},
    handleClose() {
      this.$confirm("确认关闭？");
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleReset(form) {
      form.code = "";
      form.name = "";
      form.purpose = "";
    }
  }
};
</script>
<style lang="scss">
.el-input {
  display: inline;
}
.el-input  .el-input__inner {
  width: 75%;
  height: 36px;
}
</style>
