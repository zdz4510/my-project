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

     <el-submenu  :index="item.id" :key="item.id" v-for="item in list">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.lable}}</span>
        </template>
         <el-menu-item   :route="{
            name:subitem.key
         }"  :key="subitem.id" v-for="subitem in item.children"   index="/base/colorLibrary">{{subitem.lable}}</el-menu-item>
       </el-submenu>
     
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
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
