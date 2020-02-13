<template>
    <el-button class="dsn-button" :type="type" :icon="icon" :size="size" :disabled="disabled">
      <slot></slot>
    </el-button>
</template>
<script>
export default {
  name: "dsnButton",
  props: {
    // 尺寸
    // size {mediun,small,mini}
    size: {
      type: String,
      default: "small"
    },
    // 类型
    // type   primary / success / warning / danger / info / text
    type: {
      type: String,
      default: "primary"
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    icon:{
      type:String,
      required:false,
    }
  },
  components: {},
  created() {}
};
</script>

<style lang="scss">
@import url("/@/asserts/css/theme.scss");
.dsn-button {
  display: inline-block;
  margin-bottom: 15px;
}
</style>
