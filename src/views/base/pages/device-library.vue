<template>
  <!-- huyoujuan 2019年12月16日11:34:05 -->
  <div>
    <div class="top-info">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备名称：">
          <el-input
            v-model="formInline.user"
            placeholder="请输入设备名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="addDialog = true"
        >新增</el-button
      >
      <el-button size="small" type="primary" @click="modifyDialog = true"
        >修改</el-button
      >
      <el-button size="small" type="warning" @click="deleteDialog = true"
        >删除</el-button
      >
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
      <el-table-column prop="code" label="设备代码">
        <!-- <template slot-scope="scope">{{ scope.row.code }}</template> -->
      </el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="rotateSpeed" label="转速"></el-table-column>
      <el-table-column prop="stitch" label="针距"></el-table-column>
      <el-table-column prop="deviceFloat" label="设备浮余"></el-table-column>
      <el-table-column prop="artificalFloat" label="人工浮余"></el-table-column>
      <el-table-column prop="creater" label="创建人"></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="150px"
      ></el-table-column>
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
        <el-form-item label="设备代码" :label-width="formLabelWidth">
          <el-input v-model="addForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="转速" :label-width="formLabelWidth">
          <el-input v-model="addForm.rotateSpeed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="针距" :label-width="formLabelWidth">
          <el-input v-model="addForm.stitch" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备浮余" :label-width="formLabelWidth">
          <el-input v-model="addForm.deviceFloat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人工浮余" :label-width="formLabelWidth">
          <el-input
            v-model="addForm.artificalFloat"
            autocomplete="off"
          ></el-input>
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
        <el-form-item label="设备代码" :label-width="formLabelWidth">
          <el-input
            v-model="modifyForm.code"
            autocomplete="off"
            disabled="false"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input
            v-model="modifyForm.name"
            autocomplete="off"
            disabled="false"
          ></el-input>
        </el-form-item>
        <el-form-item label="转速" :label-width="formLabelWidth">
          <el-input
            v-model="modifyForm.rotateSpeed"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="针距" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.stitch" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备浮余" :label-width="formLabelWidth">
          <el-input
            v-model="modifyForm.deviceFloat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="人工浮余" :label-width="formLabelWidth">
          <el-input
            v-model="modifyForm.artificalFloat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(modifyForm)">重 置</el-button>
        <el-button type="primary" @click="modifyDialog = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 删除模态框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteDialog"
      width="30%"
      :before-close="handleClose"
    >
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
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#FFB6C1",
    name: "紫红",
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#FFB6C1",
    name: "紫红",
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#FFB6C1",
    name: "紫红",
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
    creater: "yehuiyuan",
    createTime: "2019/11/21 14:07"
  },
  {
    code: "#800080",
    name: "红",
    rotateSpeed: "12",
    stitch: "12",
    deviceFloat: "12",
    artificalFloat: "12",
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
        rotateSpeed: "",
        stitch: "",
        deviceFloat: "",
        artificalFloat: ""
      },
      // 修改模态框
      modifyDialog: false,
      modifyForm: {
        code: "",
        name: "",
        rotateSpeed: "",
        stitch: "",
        deviceFloat: "",
        artificalFloat: ""
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
      form.rotateSpeed = "";
      form.stitch = "";
      form.deviceFloat = "";
      form.artificalFloat = "";
    }
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
