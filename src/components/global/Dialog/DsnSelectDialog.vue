<template>
  <el-dialog
    :width="width"
    class="help-dialog"
    :title="title"
    :visible.sync="visible"
    :before-close="handleCancle"
  >
    <slot name="header"></slot>
    <div class="body">
      <!-- 这里插入的是table -->
      <dsn-table
        ref="table"
        :highlight-current-row="isSingle"
        :data="tableData"
        @row-click="RowClick"
        @select="handleSelect"
        height="400px"
      >
        <!-- @row-dblclick="RowDoubleClick" -->
        <el-table-column type="selection" v-if="!isSingle" width="55px"></el-table-column>
        <!-- 这里插入的是table 的行 -->
        <slot name="body"></slot>
      </dsn-table>

      <DsnHelpFooter :len="totalSelectArr.length" @clear="handleClear">
        <DsnHelpItem
          :key="index"
          :item="item"
          v-for="(item, index) in totalSelectArr"
          @close="close"
        >{{ helpText(item) }}</DsnHelpItem>
      </DsnHelpFooter>
    </div>
    <span slot="footer" class="dialog-footer">
      <dsn-button @click="handleCancle">取消</dsn-button>
      <dsn-button type="primary" @click="confirm">确定</dsn-button>
    </span>
  </el-dialog>
</template>

<script>
import _ from "lodash";
export default {
  name: "DsnSelectDialog",
  model: {
    prop: "data",
    event: "change"
  },
  watch: {
    // 监听表格的数据变化
    tableData: {
      handler: function(newArr) {
         this.$nextTick(()=>{
             this.tableData = newArr;
        this.clearSelect();
        this.setSelected();
         })
      },
      deep: true
    },
    totalSelectArr: {
      // 选中的数据发生变化后，要同步选中的值
      handler: function() {
        this.setSelected();
      },
      deep: true
    },
    visible: {
      handler: function(newv) {
        this.totalSelectArr = _.cloneDeep(this.data);
        if (newv) {
          this.$nextTick(() => {
            this.clearSelect();
            this.setSelected();
          });
        }
      },
      deep: true
    }
  },
  computed: {
    selectedKeyArr() {
      return this.totalSelectArr.map(item => {
        return item[this.keyValue];
      });
    }
  },
  props: {
    keyValue: {
      type: String,
      required: true
    },
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
    },
    handleSelect(_, row) {
      const isContain = this.selectedKeyArr.includes(row[this.keyValue]);
      console.log(isContain);
      if (!isContain) {
        this.totalSelectArr.push(row);
        return;
      }
      // 存在的话就删除
      this.totalSelectArr = this.totalSelectArr.filter(item => {
        return item[this.keyValue] != row[this.keyValue];
      });
      //  this.RowClick(row);
    },
    // 清空选中状态的方法
    clearSelect() {
      this.$refs["table"].clearSelection();
      this.$refs["table"].setCurrentRow();
      this.selectArr = []; //table 选中的清空
    },
    handleCancle() {
      this.totalSelectArr = _.cloneDeep(this.data);
      this.clearSelect();
      this.$emit("cancle");
      // this.$emit("update:visible", false);
    },
    confirm() {
      //  this.$emit("change", this.totalSelectArr);
      this.$emit("confirm", this.totalSelectArr);

      //this.$emit("update:visible", false);
    },
    close(deleteItem) {
      this.clearSelect();
      //  从选中的里面删除数据
      this.totalSelectArr = this.totalSelectArr.filter(item => {
        return item != deleteItem;
      });
      // this.$refs["table"].toggleRowSelection(deleteItem);
      // this.$emit("change", this.totalSelectArr);
    },
    // 设置选中状态
    setSelected() {
      this.$nextTick(() => {
        //如果是单选框

        this.tableData.forEach(item => {
          const isContain = this.selectedKeyArr.includes(item[this.keyValue]);
          //  this.$refs["table"].toggleRowSelection(item,true);
          if (isContain) {
            // 存在就设置选中
            this.$refs["table"].setCurrentRow(item);
            this.$refs["table"].toggleRowSelection(item, true);
          }
        });
      });
    },
    RowClick(row) {
      // 设置选中的状态

      if (this.isSingle) {
        this.selectArr = [row];
        this.totalSelectArr = this.selectArr;
        return;
      }
      this.$refs["table"].toggleRowSelection(row);
      const arr = this.totalSelectArr.map(item => item[this.keyValue]);
      const isContain = arr.includes(row[this.keyValue]);
      if (isContain) {
        //有值就删除
        this.totalSelectArr = this.totalSelectArr.filter(tempItem => {
          return tempItem != row;
        });
      } else {
        //没有值就添加
        this.totalSelectArr.push(row);
      }
    },
    // 双击选中
    RowDoubleClick(row) {
      // 选中状态
      if (!this.isSingle) {
        this.$refs["table"].toggleRowSelection(row);
      }
    },
    handleClear() {
      this.totalSelectArr = [];
      this.clearSelect(); //
      // this.$emit("change", this.totalSelectArr);
      this.$emit("clearAll");
    },
    resert(){
      this.totalSelectArr = [];
      this.clearSelect(); //
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
