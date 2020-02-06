<template>
  <div id="dsnHeader" :class="isOpen ? '' : 'close'">
    <div class="center">
      <i class="el-icon-s-fold" @click="handleCloseOrOpen"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/base' }">基础库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <div class="right-item">
        <el-badge :value="9" :max="99">
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>

      <div class="right-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <span class="user-name">
              张三
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <i class="el-icon-setting"></i> 设置</el-dropdown-item>
            <el-dropdown-item divided><i class="el-icon-setting"></i>  退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="right-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-picture-outline-round"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>简体中文</el-dropdown-item>
            <el-dropdown-item divided>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dsnHeader",
  data() {
    return {
      isOpen: true
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    handleCloseOrOpen() {
      this.isOpen = !this.isOpen;
      this.$emit("handleCloseOrOpen");
    }
  }
};
</script>
<style lang="scss">
#dsnHeader {
  position: fixed;
  height: 64px;
  left: 0;
  top: 0;
  width: 100%;
  padding-left: 256px;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  &.close {
    padding-left: 61px;
  }
  .center {
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    .el-icon-s-fold {
      font-weight: normal;
      padding: 12px;
      font-size: 18px;
      color: #515a6e;
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
   
    & i {
      font-size: 18px;
      color: #515a6e;
      font-weight: normal;
    }
    .el-badge {
      margin: 0 12px;
      padding: 0 !important;
      .el-badge__content{
        top: 20px;
      }
    }
    .el-dropdown-link {
      display: inline-flex;
      align-items: center;
    }
    .right-item {
      padding: 0 12px;
      height: 100%;
      line-height: 64px;
      &:hover {
        background: #eee;
      }
      .user-name {
        margin-left: 12px;
        font-size: 12px;
      }
      .el-avatar--small {
        width: 24px;
        height: 24px;
      }
    }
  }

  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a {
    font-weight: normal;
    color: #999;
  }
  .el-breadcrumb__inner {
    color: #999;
}
  
}

 .el-dropdown-menu{
     padding:5px 0;
   }
</style>
