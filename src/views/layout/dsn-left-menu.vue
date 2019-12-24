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
      <el-submenu index="material">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">操作</span>
        </template>
        <el-menu-item index="/material/material-info">物料维护</el-menu-item>
        <el-menu-item index="/material/operation-maintain"
          >工序维护</el-menu-item
        >
        <el-menu-item index="/material/operation-station"
          >工序与站位关系维护</el-menu-item
        >
        <el-menu-item index="/material/work-center">工作中心</el-menu-item>
        <el-menu-item index="/material/next-number">编码规则</el-menu-item>
      </el-submenu>
      <el-submenu index="device">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">设备管理</span>
        </template>
        <el-menu-item index="/device/deviceType">设备类型</el-menu-item>
        <el-menu-item index="/device/deviceMaintenance">设备维修</el-menu-item>
        <el-menu-item index="/device/deviceUpkeep">设备保养</el-menu-item>
      </el-submenu>
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
  overflow-y: auto;
  &.active {
    width: 200px;
  }
  .header {
    display: flex;
    justify-content: center;
    .el-input {
      padding: 3px 8px;
      .el-input__inner {
        width: 100%;
        border-radius: 0px;
      }
    }
    .el-icon-s-fold {
      font-size: 40px;
    }
  }
  .el-menu {
    border-right: 0px;
  }
  .el-menu--collapse {
    width: 60px;
  }
  i {
    color: #fff;
  }
}
</style>
