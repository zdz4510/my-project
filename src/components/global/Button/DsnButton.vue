<template>
  <el-button
    @click="click"
    class="dsn-button"
    :type="type"
    :icon="icon"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :plain="plain"
    :round="round"
    :circle="circle"
    :autofocus="autofocus"
    :nativeType="nativeType"
  >
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
    icon: {
      type: String,
      required: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },

    autofocus: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: "button"
    }
  },
  components: {},
  created() {},
  methods: {
    click: function() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
@import url("/@/asserts/css/theme.scss");
.dsn-button {
  display: inline-block;
  margin-bottom: 15px;
}
</style>
