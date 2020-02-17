<template>
<!-- 资料源属性(日期) -->
  <div class="tabs-wrap">
    <div class="header">资料源属性(日期)</div>
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
        <td>日期显示格式:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>固定值:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>单位:</td>
        <td>
          <dsn-select size="mini" v-model="value" placeholder="请选择">
            <el-option label="分钟" value="1"></el-option>
            <el-option label="小时" value="2"></el-option>
            <el-option label="日" value="3"></el-option>
            <el-option label="月" value="4"></el-option>
          </dsn-select>
        </td>
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

<style lang="scss" scoped>
</style>