export default {
  methods: {
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    tableSelect(selection, row) {
      //console.log('当用户手动勾选全选 Checkbox 时触发的事件')
      this.$emit("select", selection, row);
    },
    //当用户手动勾选全选 Checkbox 时触发的事件
    tableSelectAll(selection) {
      // console.log('当用户手动勾选全选 Checkbox 时触发的事件')
      this.$emit("select-all", selection);
    },
    //表格 当选择项发生变化时会触发该事件
    tableSelectionChange(selection) {
      // console.log('当选择项发生变化时会触发该事件')
      this.$emit("selection-change", selection);
    },
    //当某个单元格被双击击时会触发该事件
    tableCellClick(row, column, cell, event) {
      // console.log('当某个单元格被双击击时会触发该事件')
      this.$emit("cell-click", row, column, cell, event);
    },
    // 表格某一行被点击后
    tableRowClick(row, column, event) {
      // console.log('表格某一行被点击后')
      this.$emit("row-click", row, column, event);
    },
    //  表格选择行发生变化后
    tableCurrentChange(currentRow, oldCurrentRow) {
      // console.log('表格选择行发生变化后')
      this.$emit("current-change", currentRow, oldCurrentRow);
    },
    // 用于多选表格，清空用户的选择
    clearSelection() {
      // console.log('表格选择行发生变化后')
      this.$refs["table"].clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs["table"].toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs["table"].toggleAllSelection();
    },
    toggleRowExpansion(row, selected) {
      this.$refs["table"].toggleAllSelection(row, selected);
    },
    //  设置当前选择行
    setCurrentRow(row) {
      this.$refs["table"].setCurrentRow(row);
    },
  }
};
