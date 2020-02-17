<template>
<!-- 标签设置 -->
  <div class="tabs-wrap">
    <div class="header">标签设置</div>
    <table>
      <tr>
        <td>左部页边空:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>顶部页边空:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>自动尺寸:</td>
        <td><el-switch size="mini" v-model="value1"></el-switch></td>
      </tr>
      <tr>
        <td>自定义宽度:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>自定义高度:</td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>打印方向:</td>
        <td>
          <dsn-select size="mini" v-model="value" placeholder="请选择">
            <el-option label="横向" value="1"></el-option>
            <el-option label="纵向" value="2"></el-option>
          </dsn-select>
        </td>
      </tr>
      <tr>
        <td>预览视图旋转:</td>
        <td><input type="text" value="0"></td>
      </tr>
      <tr>
        <td>预览视图缩放:</td>
        <td><input type="text" value="100%"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '1',
        value1: false
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>