<template>
  <div class="circle" :style="`width:${width}px;height:${height}px;background:${bgColor};border-color:${borderColor};`">
  </div>
</template>
<script>

export default {
  name: "barCode",
  props: {

      // 半径
    width:{
      type:Number,
      default:60
    },
      height:{
      type:Number,
      default:60
    },
    r: {
      type: Number,
      default: 30
    },
    // x 的坐标
    x: {
      type: Number,
      default:100
    },
     // y 的坐标
    y: {
      type: Number,
      default:100
    },
    bgColor:{
        type:String,
        default:'#eee'
    },
    rotate: {
      type: Number,
      default: 0
    },
    borderColor:{
        type:String,
        default:"#eee"
    },
  }
};
</script>
<style scoped>
.circle {
  box-sizing: border-box;
  border-radius: 100%;
}
</style>
