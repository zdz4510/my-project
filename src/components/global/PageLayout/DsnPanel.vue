<template>
  <div class="DsnPanel">
    <el-card class="box-card" shadow="never">
      <div slot="header">
        <slot name="header"></slot>
      </div>
      <slot> </slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DsnPanel",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.DsnPanel {
  .el-card {
    margin-bottom: $sectionPaddingBottom;
    .el-card__header {
      padding: 14px 16px;
    }

    .title {
      display: inline-block;
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 15px;
      color: #17233d;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pagination {
      margin-top: 15px;
    }
    .el-form{
      margin-bottom: -22px;
      .dsn-button{
        margin-bottom: 0;
      }
    }
  }
}
</style>
