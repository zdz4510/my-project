<template>
    <el-select
      :size="size"
      :multiple="multiple"
      :placeholder="placeholder"
      :valueKey="valueKey"
      :disabled="disabled"
      :value="value"
       @input="input"
      :clearable="clearable"
      :collapseTags="collapseTags"
      :multipleLimit="multipleLimit"
      :name="name"
      :autocomplete="autocomplete"
      :filterable="filterable"
      :allowCreate="allowCreate"
      :filterMethod="filterMethod"
      :remote="remote"
      :remoteMethod="remoteMethod"
      :loading="loading"
      :loadingText="loadingText"
      :noMatchText="noMatchText"
      :noDataText="noDataText"
      :reserveKeyword="reserveKeyword"
      @change="change"
      @visible-change="visableChange"
      @remove-tag="removeTag"
      @clear="clear"
      @blur="blur"
      @focus="focus"
      
    >
      <slot></slot>
    </el-select>
</template>
<script>
export default {
  name: "dsnSelect",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value:{
        type:[Number,String,Boolean],
        required:true,
    },  
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    "valueKey": {
      type: String,
      default: "value"
    },
    clearable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small"
    },
    "collapseTags": {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    "multipleLimit": {
      type: Number,
      default: 0
    },
    name: {
      type: String
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    filterable: {
      type: Boolean,
      default: true
    },
    "allowCreate": {
      type: Boolean,
      default: false
    },
    "filterMethod": {
      type: Function
    },
    remote: {
      type: Boolean,
      default: false
    },
    "remoteMethod": {
      type: Function
    },
    loading: {
      type: Boolean,
      default: false
    },
    "loadingText": {
      type: String,
      default: "加载中"
    },
    "noMatchText": {
      type: String,
      default: "无匹配数据"
    },
    "noDataText": {
      type: String,
      default: "无数据"
    },
    "popper-class": {
      type: String
    },
    "reserveKeyword": {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
      input(v){
         this.$emit('input',v);
      },
    change( v) {
     
      this.$emit("change", v);
    },
    visableChange(flag) {
      this.$emit("visible-change", flag);
    },
    removeTag(removeTag) {
      this.$emit("remove-tag", removeTag);
    },
    clear() {
      this.$emit("clear");
    },
    blur($event) {
      this.$emit("blur", $event);
    },
    focus($event) {
      this.$emit("focus", $event);
    }
  }
};
</script>
<style lang="scss"></style>
