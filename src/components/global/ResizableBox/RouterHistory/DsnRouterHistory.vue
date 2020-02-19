<template>
  <div class="router-history" :style="{ width: 'calc(100% - ' + slide + ')' }">
    <div class="wrap" style="width:calc(100% - 44px)">
      <slot> </slot>
    </div>
    <div class="dsn-router-history-item close-item">
      <el-popover
        :popper-append-to-body="false"
        :visible-arrow="false"
        placement="top-start"
        width="100"
        trigger="click"
        class="popper-class"
      >
        <div class="dsn-router-history-box" slot="reference">
          <i class="el-icon-arrow-down icon-close"></i>
        </div>
        <div>
          <ul class="dropdown-menu">
            <li class="dropdown-item"  @click="closeLeft(currentName)">
              <i class="el-icon-back"></i>
              关闭左侧
            </li>
            <li class="dropdown-item"  @click="closeRight(currentName)" >
              <i class="el-icon-right"></i>
              关闭右侧
            </li>
            <li class="dropdown-item"  @click="closeOther(currentName)">
              <i class="el-icon-close"></i>
              关闭其它
            </li>
            <li class="dropdown-item" @click="closeAll(currentName)">
              <i class="el-icon-error"></i>
              全部关闭
            </li>
          </ul>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "dsnRouterHistory",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      slide: "286px",
      currentName:''
    };
  },
  watch: {
    // 监听左侧栏是否打开，重新获取并计算wrap宽度
    isCollapse() {
      let leftMenu = 286;
      leftMenu = document.getElementById("leftMenu").clientWidth; // 获取左侧栏宽度
      this.slide = leftMenu + 30 + "px";
    },
     $route(){
       console.log(this.$route.name)
        this.currentName = this.$route.name;
     }
  },
  mounted() {
  
  },
  methods: {
    ...mapMutations(["closeAll", "closeRight", "closeLeft", "closeOther"])
  }
};
</script>

<style lang="scss" scoep>
/deep/ .el-popper[x-placement^="bottom"] {
  min-width: 100px;
  padding: 0 !important;
}
.dropdown-menu {
  .dropdown-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #515a6e;
    font-size: 14px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: #f3f3f3;
    }
  }
}
.close-item {
  margin-left: auto;
  margin-right: 15px !important;
  position: absolute;
  right: 0;
}
.icon-close {
  font-weight: bold;
  color: #333;
}
</style>
<style lang="scss">
.router-history {
  position: relative;
  background: #f5f7f9;
  padding: 6px 15px;
  display: flex;
  position: fixed;
  z-index: 2;
  .wrap {
    padding-bottom: 3px;
    // overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 3px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px #999;
      background: #999;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px #999;
      border-radius: 10px;
      background: #ededed;
    }
  }
}
.btn-down {
  padding-left: 16px;
  padding-right: 16px;
  text-align: center;
  background-color: #fff;
  border-radius: 2px;
  cursor: pointer;
  color: #515a6e;
  font-weight: 400;
}
</style>
