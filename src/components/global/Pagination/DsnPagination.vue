<template>
  <el-pagination
    class="dsn-pagination"
    
    :layout="layout"
    :total="total"
    @current-change="currentChange"
    @size-change="sizeChange"
  >
  </el-pagination>
</template>
<script>
export default {
  name: "dsnPaginatio",
  props: {
    layout: {
      type: String,
      default: "->,total,prev,pager,next,sizes"
    },
    small: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {};
  },
  methods: {
    // pageSize 改变时会触发
    sizeChange(pageSize) {
      this.$emit("size-change", pageSize);
    },
    //currentPage 改变时会触发
    currentChange(currentPage) {
      this.$emit("current-change", currentPage);
    },
    //用户点击上一页按钮改变当前页后触发
    prevClick(currentPage) {
      this.$emit("prev-click", currentPage);
    },
    nextClick(currentPage) {
      this.$emit("next-click", currentPage);
    }
  }
};
</script>

<style lang="scss" scoped>
.dsn-pagination {
  .el-pagination__sizes {
      
  }
}
</style>
