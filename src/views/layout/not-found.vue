<template>
  <div class="not-found">
    <div class="img">
      <i class="icon-404"></i>
    </div>
    <div class="content">
      <h1>404</h1>
      <div class="content-desc">抱歉，你访问的页面不存在</div>
      <el-button type="primary">返回首页</el-button>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'not-found'
  }
</script>

<style lang="scss">
.not-found {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 500px;
  .img {
    flex: 0 0 50%;
    padding-right: 150px;
    width: 50%;
    text-align: right;
    zoom: 1;
  }
  .icon-404 {
    display: inline-block;
    background-image: url(./../../assets/icon-404-color.svg);
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  .content {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      margin-bottom: 24px;
      color: #515a6e;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    .content-desc {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
    }
    /deep/ .el-button {
      width: 100px;
    }
  }
}
</style>