<template>
  <div class="bglogin">
    <div></div>
    <div class="loginForm">
      <div class="text-center">
        <img class="logo" src="./../../assets/logo.7b8cc895.png" alt="" />
        <h3 class="login-desc">MES 企业级中台前端/设计解决方案</h3>
      </div>
      <el-form
        :model="loginForm"
        ref="loginForm"
        class="demo-dynamic"
        label-position="left"
        label-width="80px"
      >
        <el-form-item
          prop="userName"
          label="用户名:"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          label="密码:"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="登陆系统:">
          <el-select v-model="loginForm.systemKey" placeholder="请选择">
            <el-option label="SYS" value="SYS"> </el-option>
            <el-option label="MES" value="MES"> </el-option>
            <el-option label="SPS" value="SPS"> </el-option>
          </el-select>
        </el-form-item>
        <el-button
          class="btn-login"
          type="primary"
          @click="submitForm('loginForm')"
          >登陆</el-button
        >
      </el-form>
    </div>

    <!-- 底部版权信息 -->
    <div class="footer">
      Copyright © 2019 科技有限公司
    </div>
  </div>
</template>
<script>
import { login, getResourceList } from "@/api/login.api.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        usbKey: "abc",
        systemKey: "",
        tenantSiteCode: "test"
      },
      list: []
    };
  },
  created() {
    this.handleGetSystemId();
  },
  methods: {
    handleGetSystemId() {
      getResourceList({ type: "SYSTEM" }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.list = res.data.data;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginForm).then(res => {
            const result = res.data;
            const data = result.data;

            this.$cookies.set("mcs.sessionId", data.id, { expires: "8h" });
            this.$router.push("/welcome?systemId=" + this.loginForm.systemKey);
            // this.$store.state.userinfo.userinfo
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style lang="scss">
.bglogin {
  background: url("~@/assets/bg_login.svg");
  background-color: #f7f7f7;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  height: 100%;
  width: 100%;
  background-size: cover;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  .footer {
    padding: 15px;
  }
}
.loginForm {
  width: 350px;
  padding: 15px;
  margin: 0 auto;
  .logo {
    width: 300px;
  }
  .login-desc {
    font-size: 14px;
    font-weight: normal;
    color: #808695;
    margin-bottom: 30px;
  }
  .el-select {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .btn-login {
    width: 100%;
  }
}
</style>
