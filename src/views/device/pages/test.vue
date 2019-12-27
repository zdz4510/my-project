<template>
  <div>
    <el-form
      :model="maintenanceForm"
      :rules="rules"
      ref="maintenanceForm1"
      label-width="200px"
      class="demo-maintenanceForm"
    >
      <el-form-item label="设备编号" prop="resource">
        <el-input
          v-model="maintenanceForm.resource"
          placeholder="请输入设备编号"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      :model="maintenanceForm"
      :rules="rules"
      ref="maintenanceForm"
      label-width="200px"
      class="demo-maintenanceForm"
    >
      <el-form-item label="设备描述:">
        <el-input
          type="textarea"
          v-model="maintenanceForm.resourceDes"
        ></el-input>
      </el-form-item>

      <el-form-item label="状态:" prop="resourceStatus">
        <el-radio-group v-model="maintenanceForm.resourceStatus">
          <el-radio :label="10">待用</el-radio>
          <el-radio :label="20">作业中</el-radio>
          <el-radio :label="30">待修</el-radio>
          <el-radio :label="40">报废</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在工作中心:" prop="workCenter">
        <el-input v-model="maintenanceForm.workCenter"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('maintenanceForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('maintenanceForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maintenanceForm: {
        //设备编号
        resource: "",
        //设备名称
        resourceDes: "",
        //设备状态
        resourceStatus: "",
        //工作中心
        workCenter: ""
      },
      rules: {
        resource: [
          { required: true, message: "请输入设备类型", trigger: "blur" }
        ],
        resourceStatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        workCenter: [
          { required: true, message: "请输入工作中心", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs["maintenanceForm1"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChangeRadio(val) {
      //   this.maintenanceForm.resourceStatus = val;
      console.log(val);
    }
  }
};
</script>

<style></style>
