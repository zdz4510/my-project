<template>
  <div class="advanceTable">
    <dsn-table 
    :data="list"
    ref="table"
    @select="tableSelect"
    @row-click="tableRowClick"
    @cell-click="tableCellClick"
    @select-all="tableSelectAll"
    @selection-change="tableSelectionChange"
    >
      <slot />
    </dsn-table>
    <dsn-pagination
      v-if="!reloadPagination && showPagination"
      @current-change="currentChange"
      @size-change="sizeChange"
      :total="total"
    />
  </div>
</template>

<script>
/**
 * 带分页带table
 */
 import tableMixin from "../Table/table.mixin";

// import paginationMixin from '../Pagination/pagination.mixin.js'
export default {
  name: "dsnAdvanceTable",
  mixins: [tableMixin],
  props: {
    // 值
    // data: {
    //   type: Array,
    //   required: true
    // },
    // total: {
    //   type: Number,
    //   required: true
    // }
    //  请求封装的函数
    httpFn: {
      type: Function,
      required: false
    },
    // 参数
    paramData: {
      type: Object,
      required: true
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      reloadPagination: false
    };
  },
  created() {
    this.handleQuery();
  },
  methods: {
    //currentChange  当前分页发生变化的时候
    currentChange(currentPage) {
      console.log(currentPage);
      this.currentPage = currentPage;
      this.handleQuery();
    },
    // 分页数量发生变化的时候
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.reloadPagination =true;
      this.handleQuery(true);
    },

    // reloadPagination 不重新渲染分页
    handleQuery(reloadPagination = false) {
      if (reloadPagination) {
        this.currentPage = 1;
      }
      this.httpFn({
        ...this.paramData,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(data => {
        const res = data.data;
        this.reloadPagination =false;
        if (res.code == 200) {
          this.$emit("http-result", true, res);
          this.list = res.data.data;
          this.total = res.data.total;
        } else {
          console.log("error");
          this.$emit("http-result", false, res);
        }
      });
    },
    search() {
      // 重新渲染分页
      this.reloadPagination =true;
      this.handleQuery(true);
    },
    clearSelection(){
      console.log('advance')
     
      this.$refs['table'].clearSelection();
    }
  }
};
</script>
