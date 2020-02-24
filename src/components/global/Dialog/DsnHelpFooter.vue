<template>
    <div class="help-footer">
       <div class="left">
            <slot></slot>
       </div>
        <div class="right" v-if="len>0"  @click="handleClear">
             <i  class="el-icon-circle-close"></i>
        </div>
    </div>
</template>

<script>
export default {
    name:"DsnHelpFooter",
    props:{
        len:{
            type:Number,
            default:0
        }
    },
    data(){
        return {

        }
    },
    methods:{
        handleClear(){
            
            this.$emit('clear')
        }
    }
}
</script>
<style lang="scss">
.help-footer{
    padding: 10px;
    border: 1px solid #eee;
    position: relative;
    height: 150px;
    overflow-y: scroll;
    padding-right: 30px;
    .help-item{
        margin-bottom: 8px;
    }
    .right{
        right: 0;
        top: 0;
        position: absolute;
        width: 30px;
        display: flex;
        justify-content:center;
        align-items: center;
        height: 100%;
    }
}
</style>