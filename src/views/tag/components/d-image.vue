<template>
  <div class="image">
    <img :src="url" />
  </div>
</template>
<script>
export default {
  name: "DImage",
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 1
    },
    rotate: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      default:
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2229864841,4232235061&fm=26&gp=0.jpg"
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.image {
  img {
    width: 100%;
    height: auto;
  }
}
</style>
