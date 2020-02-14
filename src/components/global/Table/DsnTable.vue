<template>
  <el-table
    :height="height"
    :data="data"
    stripe
    :border="border"
    :emptyText="emptyText"
    :row-key="rowKey"
    style="width:100%"
    @select="tableSelect"
    @row-click="tableRowClick"
    @row-dblclick="tableRowDblclick"
    @cell-click="tableCellClick"
    @select-all="tableSelectAll"
    @selection-change="tableSelectionChange"
    @current-change="currentChange"
    :highlight-current-row="highlightCurrentRow"
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
    "highlight-current-row":{
          type:Boolean,
          default:false
    },
    //  key
    "rowKey":{
        type:String,
        required:false
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
    emptyText: {
      type: String,
      default: "没有数据啊"
    }
  },
  methods: {
  
    // 用于多选表格，清空用户的选择
   
  }
};
</script>
