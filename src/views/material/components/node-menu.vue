<template>
  <div  class="node-menu" style="background-color: #66a6e0;" ref="tool">
    <el-menu :default-openeds="defaultOpeneds">
      <el-submenu :index="menu.id" v-for="(menu,index) in menuList" :key="menu.id">
        <!--一级菜单名称、不可拖拽 -->
        <draggable
          slot="title"
          @end="addAllNode"
          @choose="moveAllNode"
          @start="start(index)"
          :options="draggableOptions"
        >
           <i :class="`${menu.ico}`"></i>
          <span>{{ menu.name }} </span>
        </draggable>

        <!--一级菜单子菜单、可拖拽菜单-->
        <el-menu-item-group>
          <draggable
            @end="addNode"
            @choose="move"
            v-model="menu.children"
            :options="draggableOptions"
          >
            <el-menu-item
              v-for="son in menu.children"
              :key="son.id"
              :index="son.id"
              :type="son.id"
              v-show="!son.hide"
            >
              <i :class="son.ico"></i>{{ son.operationDes }}
            </el-menu-item>
          </draggable>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import draggable from "vuedraggable";

var mousePosition = {
  left: -1,
  top: -1
};

export default {
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      draggableOptions: {
        preventOnFilter: false
      },
      // 默认打开的左侧菜单的id
      defaultOpeneds: ["1"],
      index:0,
    };
  },
  components: {
    draggable
  },
  created() {
    // this.menuList = menuList;
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function(event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        mousePosition.left = event.layerX;
        mousePosition.top = event.clientY - 50;
        event.preventDefault();
        event.stopPropagation();
      };
    }
  },
  methods: {
    start(index){
        this.index =index;
    },
    addAllNode(evt){
        this.$emit("addAllNode", evt, mousePosition,this.index);
    },
    moveAllNode(evt){

        console.log(evt.item.attributes)

    },
    // 根据类型获取左侧菜单对象
    getMenu(type) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children;
        for (let j = 0; j < children.length; j++) {
          console.log(children[j])
          if (children[j].type === type) {
            return children[j];
          }
        }
      }
    },
    // 拖拽开始时触发
    move(evt) {
      var type = evt.item.attributes.type.nodeValue;
      this.nodeMenu = this.getMenu(type);
    },
    // 拖拽结束时触发
    addNode(evt) {
     
      this.$emit("addNode", evt, this.nodeMenu, mousePosition);
    },
    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") > -1) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu-item.is-active {
  color: #fff !important;
}
.flow-tool-menu {
  background-color: #eeeeee;
  cursor: pointer;
  padding-left: 5px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #979797;
}

.flow-tool-submenu {
  background-color: white;
  padding-left: 20px;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  border-bottom: 1px solid #d3d3d3;
}
.node-menu {
  box-shadow: 0 5px 5px #eee;
  /deep/ .el-menu-item-group__title{
    padding: 0
  }
  /deep/ .el-submenu__title {
    padding-left: 5px !important;
    height: auto;
    line-height: 40px;
    font-size: 13px;
    color: #666;
    &:hover {
      i{
        color: #2d8cf0 !important;
      }
      color: #2d8cf0 !important;
      background: #f0faff !important;
    }  
  }
  /deep/ .el-menu-item{
    color: #aaa;
    &:hover {
      i{
        color: #2d8cf0 !important;
      }
      color: #2d8cf0 !important;
      background: #f0faff !important;
    }
  }
  /deep/ .el-menu {
    border: none;
    i{
      font-size: 14px;
    }
    li {
      margin-bottom: 5px;
    }
  }
  /deep/ .el-menu-item {
    padding:0 10px !important;
    height: auto;
    line-height: 40px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 100px;;
    }
}
</style>
