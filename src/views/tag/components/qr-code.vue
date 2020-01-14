<template>
<!-- 条形码 -->
  <div class="qr-code">
    <img :src="url"/>
  </div>
</template>
<script>
export default {
    name:'qrCode',
    props:{

        width:{
            type:Number,
            default:100
        },
        height:{
            type:Number,
            default:100

        },
        url:{
            type:String,
            default:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578720021782&di=b4a4daef1a03ef6315141752ffe6345f&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20161219%2Fa995d33bd30542529920537ac5df1afa_th.jpg"
        }
    }
}
</script>
<style lang="scss" scoped>
.qr-code {
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
