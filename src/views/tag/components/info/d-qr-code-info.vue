<template>
<!-- 二维码 -->
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
            <td>文本显示定位:</td>
            <td>
                <dsn-select size="mini" v-model="value" placeholder="请选择">
                  <el-option label="无" value="无"></el-option>
                  <el-option label="左上" value="左上"></el-option>
                  <el-option label="上" value="上"></el-option>
                  <el-option label="右上" value="右上"></el-option>
                  <el-option label="左" value="左"></el-option>
                  <el-option label="右" value="右"></el-option>
                  <el-option label="左下" value="左下"></el-option>
                  <el-option label="右下" value="右下"></el-option>
                  <el-option label="下" value="下"></el-option>
                </dsn-select>
            </td>
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
            <td>条码种类:</td>
            <td><input type="text"></td>
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
            <td>元件宽度:</td>
            <td><input type="text"></td>
        </tr>
        <tr>
            <td>ECC:</td>
            <td><input type="text"></td>
        </tr>
        <tr>
            <td>型号:</td>
            <td><input type="text"></td>
        </tr>
        <tr>
            <td>起始状态:</td>
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
            <td><el-switch size="mini" v-model="value1"></el-switch></td>
        </tr>
        <tr>
            <td>斜体:</td>
            <td><el-switch size="mini" v-model="value2"></el-switch></td>
        </tr>
        <tr>
            <td>文本左右对其:</td>
            <td>
                <el-select size="mini" v-model="value" placeholder="请选择">
                  <el-option label="居左" value="1"></el-option>
                  <el-option label="居中" value="2"></el-option>
                  <el-option label="居右" value="3"></el-option>
                </el-select>
            </td>
        </tr>
        <tr>
            <td>文本上下对其:</td>
            <td>
                <el-select size="mini" v-model="value" placeholder="请选择">
                  <el-option label="居上" value="1"></el-option>
                  <el-option label="居中" value="2"></el-option>
                  <el-option label="居下" value="3"></el-option>
                </el-select>
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
  </el-tabs>
</template>
<script>
  export default{
    data() {
      return {
        currentTabs: 'location',
        value: '1',
        value1: false,
        value2: false
      }
    },
  }
</script>
<style lang="scss">

</style>