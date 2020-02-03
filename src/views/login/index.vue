<template>
  <div class="bglogin">
    <div class="loginForm">
      <el-form :model="loginForm" ref="loginForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="userName"
          label="用户名:"
          :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ]"
        >
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          label="密码:"
          :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]"
        >
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="登陆系统:">
          <el-select v-model="loginForm.systemKey" placeholder="请选择" size="small">
          <el-option
                :label="item.key"
                :value="item.id"
                v-for="item in list"
                :key="item.id"
              >
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login,getResourceList } from "@/api/login.api.js";
export default {
  name:'login',
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        usbKey: "abc",
        systemKey: "",
        tenantSiteCode: "test"
      },
      list:[]
    };
  },
  created() {
    this.handleGetSystemId()
  },
  methods: {
    handleGetSystemId(){
          getResourceList({type:'SYSTEM'}).then(data=>{
            const res = data.data;
            if(res.code==200){
                this.list = res.data.data;
            }
          })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginForm).then(res => {
            const result = res.data;
            const data = result.data;
           
          this.$cookies.set("mcs.sessionId",data.id,{ expires: '8h' })
          this.$router.push('/welcome?systemId='+this.loginForm.systemKey);
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
.el-form-item__label {
  color: #fff;
}
.bglogin {
  background: url("~@/assets/timg.jpeg") center center no-repeat;
  height: 100%;
  width: 100%;
  background-size: cover;
  align-items: center;
  justify-content: center;
  display: flex;
}
.loginForm {
  width: 50%;
  height: 250px;
  padding: 2%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
