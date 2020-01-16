<template>
  <el-table
    ref="filterTable"
    :data="tableData"
    @filter-change="fnFilterChangeInit"
    style="width: 100%"
  >
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址" :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[
        { text: '家', value: '家' },
        { text: '公司', value: '公司' }
      ]"
      :filter-method="filterTag"
      column-key="tag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions
          >{{ scope.row.tag }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      options: {
        tag: undefined
      }
    };
  },
  methods: {
    // 这里使用一个init的方法来模拟异步获取数据懂这个意思就好
    // 假装接受options作为筛选条件
    init(options) {
      console.log(options);
      this.tableData = [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        }
      ];
    },
    // table column 的方法，改写这个方法
    filterTag(value, row, column) {
      console.log(value, row, column);
      return true;
    },
    // table 的方法
    // filter 的格式  obj { column-key: Array }
    // Array[0] 筛选的值
    fnFilterChangeInit(filter) {
      // do something
      // example 这里最好用if，没有if可以试试也许有奇迹
      if (filter.tag) {
        // 为什么这么处理 怕有些同学把undefined当一个字符串传给后台
        this.options.tag = filter.tag[0] == undefined ? "" : filter.tag[0];
      }
      this.init(this.options);
    }
  }
};
</script>
