<template>
  <el-tabs
      class="tabs-wrap"
      v-model="currentTabs"
      type="card"
    >
    <el-tab-pane label="定位" name="location">
      <table>
        <!-- <tr>
          <td>定位</td>
          <td>输出</td>
        </tr> -->
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
          <td>来源路径:</td>
          <td> <input type="text"> </td>
        </tr>
        <tr>
          <td>垂直镜像:</td>
          <td> <input type="text"> </td>
        </tr>
        <tr>
          <td>水平镜像:</td>
          <td> <input type="text"> </td>
        </tr>
        <tr>
          <td>亮度:</td>
          <td> <input type="text"> </td>
        </tr>
        <tr>
          <td>对比:</td>
          <td> <input type="text"> </td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="资料源" name="infoSource">
      <DInfo></DInfo>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default{
    data() {
      return {
        currentTabs: 'location'
      }
    },
    components: {
      DInfo: ()=> import('./d-component-info'),
    },
  }
</script>