export default {
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
