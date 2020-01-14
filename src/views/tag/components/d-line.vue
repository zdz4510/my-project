<template>
<!-- 线条 -->
    <div class="line" :style="`width:${width}px;height:${height}px;background:${lineColor};transform:rotate(${rotate}deg);`">
    </div>
</template>

<script>
export default {
    name:'DLine',
    props:{
        width:{
            type:Number,
            default:70,
        },
        height:{
            type:Number,
            default:1
        },
        lineColor:{
            type:String,
            default:"#000000"
        },
        rotate:{
            type:Number,
            default:0
        }
    }
}
</script>