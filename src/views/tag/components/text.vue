<template>
  <div class="text">
    <p :style="`font-size:${fontSize}px;color:${color};transform:rotate(${rotate}deg);`" >{{value}}</p>
  </div>
</template>
<script>
export default {
  name: "DText",
  props: {
    value: {
      type: String,
      default: "这是文字啊"
    },
    fontSize:{
        type:Number,
        default:12,
    },
    color:{
        type:String,
        default:"#000",
    },
     rotate: {
      type: Number,
      default: 0
    },
  }
};
</script>
<style lang='scss' scoped>
.text{

}
</style>
