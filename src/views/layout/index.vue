<template>
  <div id="layout">
    <DsnHeader
      @handleCloseOrOpen="handleCloseOrOpen"
      @themeLeftMenu="HandlthemeLeftMenu($event)"
    />
    <DsnLeftMenu
      ref="leftMenu"
      @handleCollapse="handleCollapse"
      :theme="themeLeftMenu"
    />
    <div class="content" :class="isCollapse ? 'active' : ''">
      <div class="pageContent">
        <div class="routerHistory">
          <dsn-router-history :isCollapse="isCollapse">
            <dsn-router-history-item
              :class="item.name === $route.name ? 'active' : ''"
              @close="close"
              v-for="item in historyList"
              :key="item.name"
              :item="item"
              @toPage="toPage"
            >
            </dsn-router-history-item>
          </dsn-router-history>
        </div>
        <div class="well">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <DsnFooter v-if="false" />
  </div>
</template>

<script>
import DsnFooter from "./dsn-footer";
import DsnHeader from "./dsn-header";
import DsnLeftMenu from "./dsn-left-menu";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getSystemList } from "@/api/login.api.js";
export default {
  name: "Layout",
  components: {
    DsnFooter,
    DsnHeader,
    DsnLeftMenu
  },
  computed: {
    ...mapGetters(["historyList"])
  },
  created() {
    this.getSystwmId("MES");
  },
  data() {
    return {
      isCollapse: true,
      themeLeftMenu: "dark"
    };
  },
  methods: {
    ...mapMutations(["PUSH", "POP"]),
    ...mapActions(["getUserInfo"]),
    handleCollapse(status) {
      this.isCollapse = status == 1 ? true : false;
    },
    handleCloseOrOpen() {
      this.isCollapse = !this.isCollapse;
      this.$refs["leftMenu"].toggle();
    },
    /**
     *  deleteItem 删除的路由对象 ，current 当前的路由对象
     */
    close(item,current) {
      
      this.POP({deleteItem:item,current});
    },
    toPage(item) {
      this.$router.push({ path: item.fullPath });
    },
    getSystwmId(type) {
      getSystemList().then(data => {
        const res = data.data;
        if (res.code == 200) {
          const arr = res.data;
          const item = arr.find(item => {
            return item.key == type;
          });

          this.getUserInfo(item.id);
        }
      });
    },
    // 设置左侧主题
    HandlthemeLeftMenu(theme) {
      this.themeLeftMenu = theme;
    }
  }
};
</script>

<style lang="scss" scoped>
#layout {
  position: relative;
  height: 100%;
  background: #f5f7f9;
  .well {
    min-height: calc(100% - 44px);
    width: 100%;
    box-sizing: border-box;
    // background: #fff;
    // padding: 15px;
    border-radius: 4px;

    position: relative;
  }
  .content {
    padding: 64px 0px 10px 60px;
    background: #f5f7f9;
    display: flex;
    height: 100%;
    box-sizing: border-box;
    flex-direction: column;
    &.active {
      padding-left: 256px;
    }
    .routerHistory {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      height: 44px;
      position: relative;
      // &::-webkit-scrollbar-thumb {
      //   //滚动条里面小方块/
      //   border-radius: 1px;
      //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   background: rgb(26, 153, 111);
      //   //滚动条颜色/
      //  }
      // &::-webkit-scrollbar-track {
      //   //滚动条里面轨道/
      //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   border-radius: 1px;
      //   background: yellow;
      // }
    }

    .pageContent {
      height: 100%;
      // padding:15px;
      // flex: 1;
      // overflow: hidden;
      // overflow-y: scroll;
    }
  }
}
</style>
