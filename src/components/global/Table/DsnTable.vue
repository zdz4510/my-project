<template>
  <el-table
    class="dsn-table"
    :height="height"
    :data="data"
    :stripe="stripe"
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
    :row-class-name="rowClassName"
    ref="table"
  >
    <el-table-column v-if="highlightCurrentRow" label="" width="40"> </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
import tableMixin from "./table.mixin";
export default {
  name: "dsnTable",
  mixins: [tableMixin],
  props: {
    // 数据源
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    "highlight-current-row": {
      type: Boolean,
      default: false
    },
    //  key
    rowKey: {
      type: String,
      required: false
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
      default: true
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
    },
    rowClassName: {
      type: Function,
      required: false
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    showCurrent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 用于多选表格，清空用户的选择
  }
};
</script>

<style lang="scss">
.dsn-table {
  .el-table__row.current-row {
    & > td:nth-child(1) {
      background: #eee;
      &::after {
        content: "";

        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        border: 6px solid red;
        left: 6px;
        /* height: 10px; */
        background: transparent;
        border-color: transparent #409eff transparent transparent;
      }
      &::before {
        content: "";
        width: 10px;
        height: 6px;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        left: 16px;
        background: #409eff;
      }
    }
  }
}
</style>
