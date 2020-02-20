<template>
  <div id="footer">
    <slot></slot>
  </div>
</template>

<style lang="scss">
#footer {
  width: 100%;
  background: #eeeeee;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row-reverse;
  padding: 8px 0px;
  z-index: 2;
  background: #fff;
  border-top: 1px solid #e8eaec;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  .el-button {
      margin-right: 10px;
      margin-bottom: 0;
  }
}
</style>