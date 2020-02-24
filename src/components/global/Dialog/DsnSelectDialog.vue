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
      <DsnHelpFooter>
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
      selectArr: []
    };
  },
  created() {},
  methods: {
    handleSelectChanege(arr) {
      this.selectArr = arr;
      this.$emit("change", this.selectArr);
    },
    clearSelect() {
      this.$refs["table"].clearSelection();
      this.$refs["table"].setCurrentRow();
      this.selectArr = [];
      this.$emit("change", this.selectArr);
    },
    cancle() {
      this.clearSelect();
      this.$emit("cancle");
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$emit("confirm");
      this.$emit("update:visible", false);
    },
    close(deleteItem){
        console.log('close==')
        if(this.isSingle){
            this.clearSelect();
            return
        }

        this.selectArr = this.selectArr.filter(item=>{
            return item!=deleteItem;
        })
         this.$refs["table"].toggleRowSelection(deleteItem);
          //this.$emit("change", this.selectArr);
    },
    RowClick(row) {
      if (this.isSingle) {
        this.selectArr = [row];
      }
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
