<template>
  <div class="custom-data">
    <el-form :inline="true" :model="data">
      <el-form-item
        :label="item.label + ':'"
        :prop="item.label"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
         
        ]"
        v-for="item in form"
        :key="item.lable"
      >
        <dsn-input v-model="item.value"></dsn-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "DsnData",
  data() {
    return {
      form: [
        {
          label: "filed",
          value: 1
        }
      ],
      data:{

      }
    };
  }
};
</script>
