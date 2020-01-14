<template>
  <div class="dsn-router-history-item">
    <div class="dsn-router-history-box">
      <span class="left_com" @click="toPage(item)">{{item.title}}</span> <span class="right_com"><i class="el-icon-close" @click.self="close"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "dsn-router-history-item",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close",this.item);
    },
    toPage(item){
        if(this.$route.name===item.name){
            return ;
        }
       
        this.$emit('toPage',item)
    }
  }
};
</script>
<style lang="scss"  >
.dsn-router-history-item {
  width: 150px;
  height: 40px;
  display: inline-block;
 //background: green;
  border: 1px solid #e4e7ed;
  box-sizing: border-box;
  .dsn-router-history-box {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    .left_com{
        flex: 1;
        text-align: center;
        padding-left: 15px;
    }
    .right_com{
        width: 20px;
    }
  }
  .dsn-router-history-box  i.el-icon-close {
    opacity: 0;
   // position: absolute
  }
  .dsn-router-history-box:hover {
    transition: all 0.3s ease-in-out;
    padding-left: 10px;
    i {
      opacity: 1;
    }
  }
}
</style>
