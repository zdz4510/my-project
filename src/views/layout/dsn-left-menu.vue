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
      unique-opened
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
      <el-submenu index="base">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">基础库</span>
        </template>
        <el-menu-item index="/base/base">基础</el-menu-item>
      </el-submenu>
      <el-submenu index="material">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">产品配置</span>
        </template>
        <el-menu-item index="/material/material-info">物料维护</el-menu-item>
      </el-submenu>
      <el-submenu index="factory-model">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">工厂建模</span>
        </template>
        <el-menu-item index="/operation-maintain/operation-maintain"
          >工序维护</el-menu-item
        >
        <el-menu-item index="/operation-station/operation-station"
          >工序与站位关系维护</el-menu-item
        >
        <el-menu-item index="/work-center/work-center">工作中心</el-menu-item>
      </el-submenu>
      <el-submenu index="system-config">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统配置</span>
        </template>
        <el-menu-item index="/next-number/next-number">编码规则</el-menu-item>
      </el-submenu>
      <el-submenu index="produce">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">生产</span>
        </template>
        <el-menu-item index="/dc/dc-search">独立数据收集查询报表</el-menu-item>
      </el-submenu>
      <el-submenu index="device">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">设备管理</span>
        </template>
        <el-menu-item index="/device/deviceType">设备类型</el-menu-item>
        <el-menu-item index="/device/deviceMaintenance">设备维修</el-menu-item>
        <el-menu-item index="/device/deviceUpkeep">设备保养</el-menu-item>
        <el-menu-item index="/device/test">测试页面</el-menu-item>
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
