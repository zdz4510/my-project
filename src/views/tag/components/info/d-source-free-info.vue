<template>
<!-- 资料源属性(任意/公式)	 -->
  <div class="tabs-wrap">
    <div class="header">资料源属性(任意/公式)	</div>
    <table>
      <tr>
        <td>变量名称:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>变量类型:</td>
        <td><input type="text" value="日期" disabled></td>
      </tr>
      <tr>
        <td>变量输出前缀:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>变量输出后缀:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>变量填充位数:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>变量填充值:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>公式:</td>
        <td><input type="text" placeholder="公式类型输入"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        key: 'value'
      }
    },
  }
</script>

<style lang="scss">
</style>