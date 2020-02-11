<template>
  <div class="dsn-tabs-box">
    <el-tabs
      :value="value"
      :type="type"
      :closable="closable"
      :addable="addable"
      :editable="editable"
      :tabPosition="tabPosition"
      :stretch="stretch"
      :beforeLeave="beforeLeave"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      @tab-add="tabAdd"
      @edit="edit"
    >
    <slot></slot>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'dsnTabs',
  props: {
    value: {
      type:[Number,String,Boolean],
      required:true,   
    },
    type: {
      type: String,
    },
    closable: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    tabPosition: {
      type: String,
      default: 'top'
    },
    stretch: {
      type: Boolean,
      default: false
    },
    beforeLeave: {
      type: Function
    }
  },
  methods: {
    tabClick() {
      console.log('click', arguments)
      this.$emit('tab-click')
    },
    tabRemove(name) {
      console.log('remove', name)
      this.$emit('tab-remove', name)
    },
    tabAdd() {
      this.$emit('tab-add')
    },
    edit(targetName, action) {
      console.log('edit', targetName, action),
      this.$emit('edit', targetName, action)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dsn-tabs-box {
    background: #fff;
    padding: 14px;
  }
</style>