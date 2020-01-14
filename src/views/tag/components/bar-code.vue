<template>
    <div class="bar-code" >
        <!-- 条形码 -->
        <img :src="url" />
    </div>
</template>


<script>
export default {
    name:'barCode',
    props:{
        width:{
            type:Number,
            default:100,
        },
        height:{
            type:Number,
            default:50
        },
        rotate:{
            type:Number,
            default:0
        },
        url:{
            type:String,
            default:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=851763487,1733020085&fm=111&gp=0.jpg'
        }
    }
}
</script>
<style lang='scss' scoped>
.bar-code{
  img{
      width: 100%;
      height: auto;
  }
}
</style>