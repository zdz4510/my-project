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
      default: 24
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
      default: 8
    },
    md: {
      type: [Number,Object],
       default: 8
    },
    lg: {
      type: [Number,Object],
       default: 6
    },
    xl: {
      type: [Number,Object],
       default: 6
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
