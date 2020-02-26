<template>
  <el-input
    :placeholder="placeholder"
    :size="size"
    :value="value"
    :v-model="vModel"
    @input="input"
    @focus="focusEvent"
    @change="change"
    @blur="blurEvent"
    @clear="clear"
    :type="type"
    :disabled="disabled"
    clearable
    :maxlength="maxlength"
    :minlength="minlength"
    :showWordLimit="showWordLimit"
    show-word-limit
    :autocomplete="autocomplete"
    :showPassword="showPassword"
    :prefixIcon="prefixIcon"
    :suffixIcon="suffixIcon"
    :rows="rows"
    :autosize="autosize"
    :readonly="readonly"
    :resize="resize"
    :autofocus="autofocus"
    :validate-event="validateEvent"
    ref="input"
  >
   <template slot="append">
       <slot name="append"></slot>
    </template>
     <template slot="suffix">
       <slot name="suffix"></slot>
    </template>
     <template slot="prepend">
       <slot name="prepend"></slot>
    </template>
     <template slot="prefix">
       <slot name="prefix"></slot>
    </template>
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
      type: [String, Number],
      required: false
    },
    vModel: {
      type: [String, Number],
      required: false
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number,String],
      required: false
    },
    minlength: {
      type: Number,
      required: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      required: false
    },
    prefixIcon: {
      type: String,
      required: false
    },
    suffixIcon: {
      type: String,
      required: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autosize: {
      type: [Boolean,Object],
      default: false
    },
    name: {
      type: String,
      required: false
    },
    readonly: {
      type: Boolean,
      required: false
    },
    max: {
      type: String,
      required: false
    },
    min: {
      type: String,
      required: false
    },
    step: {
      type: String,
      required: false
    },
    resize: {
      type: String,
      required: false
    },
    autofocus: {
      type: Boolean,
      required: false
    },
    form: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    tabindex: {
      type: String,
      required: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    autocomplete:{
      type:String,
      default:'off'
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
    blurEvent($event) {
      this.$emit("blur", $event);
    },
    focusEvent($event) {
      this.$emit("focus", $event);
    },
    clear() {
      this.$emit("clear");
    },

    //methods
    focus() {
      this.$refs["input"].focus();
    },
    blur() {
      this.$refs["input"].blur();
    },
    select() {
      this.$refs["input"].select();
    }
  }
};
</script>
