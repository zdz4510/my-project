<template>
<!-- 形状 -->
  <el-tabs
      class="tabs-wrap"
      v-model="currentTabs"
      type="card"
    >
    <el-tab-pane label="定位" name="location">
      <table>
        <tr>
          <td>X轴:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>Y轴:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>长度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>宽度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>旋转:</td>
          <td><input type="text"></td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="输出" name="export">
      <table>
        <tr>
          <td>形状:</td>
          <td>
            <dsn-select size="mini" v-model="value" placeholder="请选择">
              <el-option label="线条" value="1"></el-option>
              <el-option label="圆形" value="2"></el-option>
              <el-option label="矩形" value="3"></el-option>
            </dsn-select>
          </td>
        </tr>
        <tr>
          <td>线条厚度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>填充色:</td>
          <td>
            <dsn-select size="mini" v-model="value" placeholder="请选择">
              <el-option label="透明" value="1"></el-option>
              <el-option label="黑色" value="2"></el-option>
            </dsn-select>
          </td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="资料源" name="infoSource">
      <DInfo></DInfo>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        currentTabs: 'location',
        value: '1'
      }
    },
    components: {
      DInfo: ()=> import('./d-component-info'),
    },
  }
</script>

<style lang="scss" scoped>

</style>