<template>
  <el-input
    :placeholder="placeholder"
    :size="size"
    :value="value"
    @input="input"
    @change="change"
    @blur="blur"
    @clear="clear"
    :disabled="disabled"
    clearable
  >
    <slot></slot>
  </el-input>
</template>
<script>
export default {
  name: "dsnInput",
  props: {
    //medium / small / mini
    size: {
      type: String,
      default: "small"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String,Number],
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {};
  },
  methods: {
    input(str) {
      this.$emit("input", str);
    },
    change() {
      console.log(this.value);
      this.$emit("change", this.value);
    },
    blur($event) {
      this.$emit("blur", $event);
    },
    focus($event) {
      this.$emit("focus", $event);
    },
    clear() {
      this.$emit("clear");
    }
  }
};
</script>
