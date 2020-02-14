<template>
  <el-col
    :span="span"
    :offset="offset"
    :push="push"
    :pull="pull"
    :xs="xs"
    :sm="sm"
    :md="md"
    :lg="lg"
    :xl="xl"
    :tag="tag"
  >
    <slot></slot>
  </el-col>
</template>

<script>
export default {
  name: "DsnCol",
  props: {
    span: {
      type: Number,
      default: 12
    },
    offset: {
      type: Number,
      default: 0
    },
    push: {
      type: Number,
      default: 0
    },
     pull: {
      type: Number,
      default: 0
    },
   
    xs: {
      type: [Number,Object],
      default: 6
    },
    sm: {
      type: [Number,Object],
      required:false
    },
    md: {
      type: [Number,Object],
      required:false
    },
    lg: {
      type: [Number,Object],
      required:false,
    },
    xl: {
      type: [Number,Object],
      required:false,
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
