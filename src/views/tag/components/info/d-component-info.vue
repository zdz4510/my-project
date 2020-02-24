<template>
  <div class="tabs-wrap">
    <table>
      <tr class="tr-title"><td colspan="2"><el-button type="text" @click="addDate">+日期</el-button></td></tr>
      <tr v-for="item in date" :key="'date'+item.date">
        <td><input type="text" :value="item.key"></td>
        <td><input type="text" :value="item.val"></td>
      </tr>
      <tr class="tr-title"><td colspan="2"><el-button type="text" @click="addInfo1">+公式</el-button></td></tr>
      <tr v-for="item in info1" :key="'info1'+item.date">
        <td><input type="text" :value="item.key"></td>
        <td><input type="text" :value="item.val"></td>
      </tr>
      <tr class="tr-title"><td colspan="2"><el-button type="text" @click="addInfo2">+任意</el-button></td></tr>
      <tr v-for="item in info2" :key="'info2'+item.date">
        <td><input type="text" :value="item.key"></td>
        <td><input type="text" :value="item.val"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        date: [
          {key: '日期', val: '',date: +new Date}
        ], 
        info1: [
          {key: '公式', val: '',date: +new Date}
        ],
        info2: [
          {key: '任意', val: '',date: +new Date}
        ]}
    },
    methods: {
      addDate() {
        this.date.push({key:`日期${this.date.length}`,val:'',date: +new Date})
      },
      addInfo1() {
        this.info1.push({key:`公式${this.info1.length}`,val:'',date: +new Date})
      },
      addInfo2() {
        this.info2.push({key:`任意${this.info2.length}`,val:'',date: +new Date})
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>