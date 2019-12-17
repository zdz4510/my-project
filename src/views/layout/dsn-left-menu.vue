<template>
  <div id="leftMenu" :class="isCollapse ? 'active' : ''">
    <div class="header">
      <el-input
        v-model="search"
        v-show="isCollapse"
        prefix-icon="el-icon-search"
        placeholder="请输入内容"
      ></el-input>
      <i class="el-icon-s-fold" @click="handleMenuCollapse"></i>
    </div>
    <el-menu
      :collapse-transition="false"
      :router="true"
      background-color="rgb(39, 106, 179)"
      active-text-color="rgb(255, 208, 75)"
      text-color="#fff"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="!isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="/b/1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      search: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      this.$emit("handleCollapse", this.isCollapse);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("handleCollapse", this.isCollapse);
    }
  }
};
</script>
<style lang="scss">
#leftMenu {
  position: fixed;
  width: 60px;
  height: 100%;
  background: rgb(39, 106, 179);
  left: 0;
  top: 0;
  padding: 70px 0px 10px 0px;
  &.active {
    width: 200px;
  }
  .header {
    display: flex;
    justify-content: center;
    .el-input__inner {
      border-radius: 0px;
    }
    .el-icon-s-fold {
      font-size: 40px;
    }
  }

  .el-menu--collapse {
    width: 60px;
  }
  i{
      color: #fff;
  }
}
</style>
