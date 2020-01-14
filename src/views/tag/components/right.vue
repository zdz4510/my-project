<template>
  <div class="right">
    <right-top :locationForm="current" class="top"></right-top>
    <right-bottom class="bottom"></right-bottom>
  </div>
</template>

<script>
import RightBottom from "./right-bottom";
import RightTop from "./right-top";
export default {
  name: "right",
  props: {
    current: {
      type: Object,
      required: true
    }
  },
  components: {
    RightBottom,
    RightTop
  }
};
</script>

<style lang="scss" scoped>
.right {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .top {
    flex: 1;
    overflow: hidden;
    // overflow-y: auto;
  }
  .bottom {
    flex: 1;
    overflow: hidden;
  }
}
</style>
