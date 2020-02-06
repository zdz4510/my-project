<template>
  <div id="leftMenu" :class="isCollapse ? 'active' : ''">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo.7b8cc895.png" />
      </div>
    </div>
    <el-menu
      :collapse-transition="false"
      :router="true"
      background-color="#515a6e"
      active-text-color="hsla(0,0%,100%,1)"
      text-color="hsla(0,0%,100%,0.7)"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="!isCollapse"
    >

       <el-submenu  :index="item.id" :key="item.id" v-for="item in list">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.lable}}</span>
        </template>
         <el-menu-item   :route="{
            name:subitem.key
         }"  :key="subitem.id"  v-for="subitem in item.children"   :index="subitem.id">{{subitem.lable}}</el-menu-item>
       </el-submenu>
       
     
    </el-menu>
  </div>
</template>


<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      isCollapse: true,
      search: ""
    };
  },
  computed:{
    ...mapState({
      list:state=>{
        
         console.log(state)
         const arr =state['userinfo']['userinfo']['menuPermission'];
         if(arr&&arr.length==1){           
              return  arr[0.]['children'];
         }

         return []
        
      }
    })
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
    },
    toggle() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang="scss">
$bg: #515a6e;
#leftMenu {
  .logo {
    width: 255px;
    color: white;
    img {
      width: 205px;
      display: block;
    }
  }
  .el-submenu__title:hover,
  .el-submenu__title:focus {
    outline: none;
    background: $bg !important;
    opacity: 1;
    .title {
      color: #fff;
    }
  }
  position: fixed;
  width: 60px;
  height: 100%;
  background: $bg;
  left: 0;
  top: 0;
  padding: 0px 0px 10px 0px;
  overflow-y: auto;
  z-index: 999;
  &::-webkit-scrollbar {
    //滚动条整体样式/
    width: 1px;
    height: 1px;
    //高宽分别对应横竖滚动条的尺寸/
    //height: 5px;
  }
  box-sizing: border-box;
  &.active {
    width: 256px;
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

  .el-menu-item:hover,
  .el-menu-item:focus,
  .el-menu-item.is-active {
    background-color: #2d8cf0 !important;
    opacity: 1;
  }
}
</style>
