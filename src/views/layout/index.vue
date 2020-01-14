<template>
  <div id="layout">
    <DsnHeader />
    <DsnLeftMenu @handleCollapse="handleCollapse" />
    <div class="content" :class="isCollapse?'active':''">
      <div class="routerHistory"></div>
      <div class="pageContent">
        <router-view></router-view>
      </div>
    </div>
    <DsnFooter v-if="false" />
  </div>
</template>

<script>
import DsnFooter from "./dsn-footer";
import DsnHeader from "./dsn-header";
import DsnLeftMenu from "./dsn-left-menu";
import { mapGetters, mapMutations } from "vuex";
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
  data() {
    return {
      isCollapse: true
    };
  },
  created() {},
  methods: {
    ...mapMutations(["PUSH", "POP"]),
    handleCollapse(status) {
      this.isCollapse = status == 1 ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
#layout {
  height: 100%;
  overflow: hidden;
  .content {
    padding: 70px 0 0px 60px;
    background: yellowgreen;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    &.active {
      padding-left: 200px;
    }
    .routerHistory {
      height: 46px;
      width: 100%;
      background: #006600;
    }

    .pageContent {
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
      background: #f7f7f7;
    }
  }
}
</style>
