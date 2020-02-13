<template>
  <el-table
    :height="height"
    :data="data"
    stripe
    :border="border"
    :emptyText="emptyText"
    :rowKey="rowKey"
    :highlight-current-row="highlightCurrentRow"
    @select="tableSelect"
    @row-click="tableRowClick"
    @cell-click="tableCellClick"
    @select-all="tableSelectAll"
    @selection-change="tableSelectionChange"
     @current-change="currentChange"
    ref="table"
   
  >
  <slot></slot>
  </el-table>
</template>

<script>
import tableMixin from './table.mixin'
export default {
  name: "dsnTable",
  mixins:[tableMixin],
  props: {
    // 数据源
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    //高度
    height: {
      type: [Number, String],
      default: "540px"
    },
    select: {
      type: Function,
      required: false
    },
    "row-click": {
      type: Function,
      required: false
    },
    //最大的高度
    "max-height": {
      type: [Number, String],
      required: false
    },
    //是否是斑马纹
    stripe: {
      type: Boolean,
      required: false
    },
    //medium  small mini
    size: {
      type: String,
      default: "medium"
    },
    border: {
      type: Boolean,
      default: false
    },
    "row-class-name": {
      type: Function,
      required: false
    },
    rowKey: {
      type: String,
      required: false
    },
    emptyText: {
      type: String,
      default: "没有数据啊"
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  
    // 用于多选表格，清空用户的选择
   
  }
};
</script>
