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
        <el-menu-item index="/material/materialInfo">物料维护</el-menu-item>
        <el-menu-item index="/material/materialGroup">物料组维护</el-menu-item>
        <el-menu-item index="/material/workOrder">工单维护</el-menu-item>
        <el-menu-item index="/material/issued">工单下达</el-menu-item>
        <el-menu-item index="/material/routeMaintenance"
          >工艺路线维护</el-menu-item
        >
      </el-submenu>
      <el-submenu index="factory-model">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">工厂建模</span>
        </template>
        <el-menu-item index="/operationMaintain/operationMaintain"
          >工序维护</el-menu-item
        >
        <el-menu-item index="/operationStation/operationStation"
          >工序与站位关系维护</el-menu-item
        >
        <el-menu-item index="/workCenter/workCenter">工作中心</el-menu-item>
      </el-submenu>
      <el-submenu index="system-config">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统配置</span>
        </template>
        <el-menu-item index="/nextNumber/nextNumber">编码规则</el-menu-item>
        <el-menu-item index="/certUser/certUser">用户证明分配</el-menu-item>
        <el-menu-item index="/customize/customize">自定义字段维护</el-menu-item>
      </el-submenu>
      <el-submenu index="produce">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">生产</span>
        </template>
        <el-menu-item index="/dc/dcSearch">独立数据收集查询报表</el-menu-item>
        <el-menu-item index="/dc/dataCollection">数据收集</el-menu-item>
        <el-menu-item index="/dc/dcCollection">独立数据收集</el-menu-item>
        <el-menu-item index="/dc/unpack">包装解包配置</el-menu-item>
        <el-menu-item index="/dc/lotStep">LOT步骤状态变更*</el-menu-item>
        <el-menu-item index="/dc/lotDivestiture">LOT拆分*</el-menu-item>
        <el-menu-item index="/dc/lotMerge">LOT合并*</el-menu-item>
        <el-menu-item index="/dc/productionOperate">生产操作*</el-menu-item>
      </el-submenu>
      <el-submenu index="alarm">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">预警管理</span>
        </template>
        <el-menu-item index="/alarm/alarmMaintain">预警事件维护</el-menu-item>
        <el-menu-item index="/alarm/alarmGroup">预警事件分组</el-menu-item>
        <el-menu-item index="/alarm/alarmDeal">预警事件处理</el-menu-item>
      </el-submenu>
      <el-submenu index="nc">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">不合格管理</span>
        </template>
        <el-menu-item index="/nc/ncGroup">不合格代码组</el-menu-item>
        <el-menu-item index="/nc/ncCode">不合格代码</el-menu-item>
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
      <el-submenu index="maintenance">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">维护管理</span>
        </template>
        <el-menu-item index="/maintenance/standingMaintenance">
          站位维护
        </el-menu-item>
        <el-menu-item index="/maintenance/workingCertificateMaintenance">
          上岗证维护
        </el-menu-item>
        <el-menu-item index="/maintenance/genericCodeDefinition">
          通用代码定义维护
        </el-menu-item>
        <el-menu-item index="/maintenance/genericCodeData">
          通用代码数据维护
        </el-menu-item>
        <el-menu-item index="/device/test">测试页面</el-menu-item>
      </el-submenu>
      <el-submenu index="tag">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">标签管理</span>
        </template>
        <el-menu-item index="/tag/tagConfig">标签配置</el-menu-item>
        <el-menu-item index="/tag/tagPrint">标签打印</el-menu-item>
        <el-menu-item index="/tag/tagEdit">标签编辑</el-menu-item>
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
  box-sizing: border-box;
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
