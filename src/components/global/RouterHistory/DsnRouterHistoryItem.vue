<template>
  <div class="dsn-router-history-item">
    <div class="dsn-router-history-box">
      <span class="left_com" @click="toPage(item)">{{ item.title }}</span>
      <span class="right_com"
        ><i class="el-icon-close" @click.self="close"></i
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "dsn-router-history-item",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      // console.log(this.$route.name)
      this.$emit("close", this.item,this.$route.name);
    },
    toPage(item) {
      if (this.$route.name === item.name) {
        return;
      }

      this.$emit("toPage", item);
    }
  }
};
</script>
<style lang="scss">
.dsn-router-history-item {
  height: 32px;
  background: #fff;
  border-radius: 3px;
  margin-right: 6px;
  color: #808695;
  display: inline-block;
  // border: 1px solid #e4e7ed;
  box-sizing: border-box;
  &.active {
    color: #2173dc;
    .left_com {
      color: #2173dc !important;
    }
  }
  .dsn-router-history-box {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    .left_com {
      flex: 1;
      text-align: center;
      font-size: 12px;
      line-height: 1.5;
      margin-right: 5px;
      color: #808695;
    }
    .right_com {
      width: 22px;
      transform: translateZ(0);
      margin-right: -6px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  }
  .dsn-router-history-box i.el-icon-close {
    opacity: 1;
    // position: absolute
  }
  // .dsn-router-history-box:hover {
  //   transition: all 0.3s ease-in-out;
  //   padding-left: 10px;
  //   i {
  //     opacity: 1;
  //   }
  // }
}
</style>
