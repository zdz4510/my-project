<template>
  <div class="rectangle" :style="`width:${width}px;height:${height}px;background:${bgColor};transform:rotate(${rotate}deg);`" >
  </div>
</template>

<script>
export default {
  name: "rectangle",
  props: {
    width: {
      type: Number,
      default: 70
    },
    height: {
      type: Number,
      default: 30
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: "#eee"
    },
    rotate:{
      type:Number,
      default:0
    }
  },
  data() {
    return {

    }
  }
};
</script>

<style lang='scss' scoped >
.rectangle{

}
</style>
