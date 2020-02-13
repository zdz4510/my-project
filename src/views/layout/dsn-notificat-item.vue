<template>
    <div class="notificat-item">
        <el-avatar size="medium" :src="avatar" v-if="visibleAvatar"></el-avatar>
        <div class="notificat_item-right">
            <slot name="content"><h4>{{content}}</h4></slot>
            <slot name="date"><span class="date">{{date}}</span></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: {
            visibleAvatar :{
                type: Boolean,
                default: true,
            },
            avatar: {
                type: String,
                default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
            content: String,
            date: String
        },
    }
</script>

<style lang="scss" scoped>
.notificat-item {
    display: flex;
    padding: 12px 5px;
    border-bottom: 1px solid #e8eaec;
    cursor: pointer;
    -webkit-transition: background-color .2s ease-in-out;
    transition: background-color .2s ease-in-out;
    text-align: left;
    &:hover {
      background-color: #f0faff;
    }
    .el-avatar {
        margin-right: 15px;
    }
    .notificat_item-right {
        flex: 1;
      h4 {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        height: 22px;
        color: #515a6e;
      }
      .date {
        font-size: 12px;
        color: #808695;
      }
    }
  }
</style>