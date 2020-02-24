<template>
  <el-tabs
      class="tabs-wrap"
      v-model="currentTabs"
      type="card"
    >
    <el-tab-pane label="定位" name="location">
      暂无
    </el-tab-pane>
    <el-tab-pane label="输出" name="export">
      <table>
        <tr>
          <td>条码种类:</td>
          <td><input type="text" value="FDF417" disabled></td>
        </tr>
        <tr>
          <td>固定值:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>变量名称:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>ECC:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>调整高度间隔:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>调整宽度间隔:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>缩短模式:</td>
          <td><el-switch size="mini" v-model="value1"></el-switch></td>
        </tr>
        <tr>
          <td>建立模式:</td>
          <td>
            <dsn-select size="mini" v-model="value" placeholder="请选择">
              <el-option label="自动尺寸" value="1"></el-option>
              <el-option label="设定大小" value="2"></el-option>
              <el-option label="自动密度" value="3"></el-option>
            </dsn-select>
          </td>
        </tr>
        <tr>
          <td>栏:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>行:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>元件高度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>元件宽度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>外观比例:</td>
          <td>
            <dsn-select size="mini" v-model="value" placeholder="请选择">
              <el-option label="1比1" value="1"></el-option>
              <el-option label="1比2" value="2"></el-option>
              <el-option label="1比3" value="3"></el-option>
            </dsn-select>
          </td>
        </tr>
        <tr>
          <td>宽度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>高度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>字体:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>字体大小:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>字体宽度:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>粗体:</td>
          <td><el-switch size="mini" v-model="value2"></el-switch></td>
        </tr>
        <tr>
          <td>斜体:</td>
          <td><el-switch size="mini" v-model="value3"></el-switch></td>
        </tr>
        <tr>
            <td>文本左右对其:</td>
            <td>
                <dsn-select size="mini" v-model="value" placeholder="请选择">
                  <el-option label="居左" value="1"></el-option>
                  <el-option label="居中" value="2"></el-option>
                  <el-option label="居右" value="3"></el-option>
                </dsn-select>
            </td>
        </tr>
        <tr>
            <td>文本上下对其:</td>
            <td>
                <dsn-select size="mini" v-model="value" placeholder="请选择">
                  <el-option label="居上" value="1"></el-option>
                  <el-option label="居中" value="2"></el-option>
                  <el-option label="居下" value="3"></el-option>
                </dsn-select>
            </td>
        </tr>
        <tr>
          <td>文本条码间隔:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>文本输出前缀:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>文本输出后缀:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>文本填充位数:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>文本填充值:</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>自动换行:</td>
          <td><input type="text"></td>
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
        value:'1',
        value1:false,
        value2:false,
        value3:false
      }
    },
    components: {
      DInfo: ()=> import('./d-component-info'),
    },
  }
</script>

<style lang="scss" scoped>

</style>