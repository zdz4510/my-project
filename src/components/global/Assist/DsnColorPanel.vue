<template>
    <p class="dsn-color-pannel" :style="`background:${color}`" :title="`${color}`">
    </p>
</template>


<script>
export default {
    name:'DsnColorPanel',
    props:{
      color:{
          type:String,
          required:true
      }
    },
    data(){
        return {

        }
    }
}
</script>

<style lang='scss'>
.dsn-color-pannel{
    width: 35px;
    height:20px;
    display: inline-block;
}
</style>