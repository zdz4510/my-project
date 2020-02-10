<template>
  <div id="leftMenu" :class="[isCollapse ? 'active' : '', theme]">
    <div class="header-wrap">
      <div class="header" :class="isCollapse ? 'fixed' : ''">
        <div class="logo" v-show="theme == 'dark'">
          <img src="@/assets/logo.7b8cc895.dark.png"  v-show="isCollapse"/>
          <img src="@/assets/logo.mini.png" v-show="!isCollapse" />
        </div>
        <div class="logo" v-show="theme == 'light'">
          <img src="@/assets/logo.7b8cc895.png"  v-show="isCollapse"/>
          <img src="@/assets/logo.mini.png" v-show="!isCollapse" />
        </div>
      </div>
    </div>
    <el-menu
      :collapse-transition="false"
      :router="true"
      :background-color="backgroundColor"
      active-text-color="hsla(0,0%,100%,1)"
      text-color="hsla(0,0%,100%,0.7)"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      unique-opened
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
import {mapState} from 'vuex';

export default {
  data() {
    return {
      isCollapse: true,
      search: "",
      backgroundColor: '#191a23'
    };
  },
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
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
@import './Theme.scss';
$bg: #515a6e;
#leftMenu {
  &.active {
    .logo {
      img {
        width: auto;
        height: 50px;
      }
    }
  }
  .header-wrap {
    height: 64px;
    .header{
      z-index: 1;
    }
  }
  .logo {
    width: 255px;
    height: 63px;
    line-height: 63px;
    color: white;
    text-align: center;
    img {
      width: auto;
      height: 50px;

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
  width: 256px;
  height: 100%;
  background: $bg;
  left: 0;
  top: 0;
  padding: 0px 0px 10px 0px;
  overflow-y: auto;
  z-index: 3;
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