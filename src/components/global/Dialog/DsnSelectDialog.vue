<template>
  <el-dialog
    :width="width"
    class="help-dialog"
    :title="title"
    :visible.sync="visible"
  >
    <slot name="header"></slot>
    <div class="body">
      <!-- 这里插入的是table -->
      <dsn-table
        ref="table"
        :highlight-current-row="isSingle"
        :data="tableData"
        @selection-change="handleSelectChanege"
        @row-click="RowClick"
        @row-dblclick="RowDoubleClickRowClick"
        height="400px"
      >
        <el-table-column
          type="selection"
          v-if="!isSingle"
          width="55px"
        ></el-table-column>
        <!-- 这里插入的是table 的行 -->
        <slot name="body"></slot>
      </dsn-table>

      <DsnHelpFooter :len="totalSelectArr.length" @clear="handleClear">
        <DsnHelpItem
          :key="index"
          :item="item"
          v-for="(item, index) in selectArr"
          @close="close"
          >{{ helpText(item) }}</DsnHelpItem
        >
      </DsnHelpFooter>
    </div>
    <span slot="footer" class="dialog-footer">
      <dsn-button @click="cancle">取消</dsn-button>
      <dsn-button type="primary" @click="confirm">确定</dsn-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DsnSelectDialog",
  model: {
    prop: "data",
    event: "change"
  },
  watch: {
    tableData: {
      handler: function() {
        this.clearSelect();
      },
      deep: true
    }
  },
  props: {
    title: {
      type: [String],
      default: "筛选"
    },
    width: {
      type: [String, Number],
      default: "500px"
    },
    data: {
      type: Array,
      default: () => {
        return {};
      }
    },
    visible: {
      type: Boolean,
      required: true
    },
    isSingle: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    helpText: {
      type: [Function],
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      // 被选中的值
      selectArr: [],
      totalSelectArr: []
    };
  },
  created() {},
  methods: {
    handleSelectChanege(arr) {
      this.selectArr = arr;
      // 选中的数据添加在后面 删除重复的
      // this.totalSelectArr = [...new Set(this.totalSelectArr),...this.selectArr];
      // 同步选中的结果
      // this.$emit("change", this.totalSelectArr);
    },

    // 清空选中状态的方法
    clearSelect() {
      this.$refs["table"].clearSelection();
      this.$refs["table"].setCurrentRow();
      this.selectArr = []; //table 选中的清空
      // 同步选中的结果
      // this.$emit("change", this.totalSelectArr);
    },
    cancle() {
      this.clearSelect();
      this.$emit("cancle");
      this.$emit("update:visible", false);
    },
    confirm() {
      if (this.isSingle) {
        this.totalSelectArr = [...this.selectArr];
      } else {
        this.totalSelectArr = [
          ...new Set([...this.totalSelectArr, ...this.selectArr])
        ];
      }
      this.$emit("confirm");
      //this.$emit("update:visible", false);
    },
    // setSelected(){
    //   if(this.setCurrentRow){

    //   }
    //    this.$refs['table'].setCurrentRow();
    // },
    close(deleteItem) {
      if (this.isSingle) {
        this.clearSelect();
        return;
      }
      //  从选中的里面删除数据
      this.totalSelectArr = this.totalSelectArr.filter(item => {
        return item != deleteItem;
      });
     // this.$refs["table"].toggleRowSelection(deleteItem);
      this.$emit("change", this.totalSelectArr);
    },
    RowClickRowClick(row) {
      if (this.isSingle) {
        this.selectArr = [row];
        // this.totalSelectArr = this.selectArr;
      }
    },
    // 双击选中
    RowDoubleClickRowClick(row) {
      // 选中状态
      if(!this.isSingle){
        this.$refs["table"].toggleRowSelection(row);
      }
      
    },
    handleClear() {
      this.totalSelectArr = [];
      this.clearSelect(); //
      this.$emit("change", this.totalSelectArr);
      this.$emit("clearAll");
    }
  }
};
</script>

<style lang="scss">
.help-dialog {
  .body {
  }
}
</style>
