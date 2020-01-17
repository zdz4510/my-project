<template>
  <!-- 标签配置打印 -->
  <div class="tag-print-config">
      <div>
        <dsn-button @click.native="addRow">添加</dsn-button>
        <dsn-button @click.native="deleteRow">删除</dsn-button>
      </div>
      <el-table
      :data="tableData"
      border
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
       <el-table-column
        type="index"
        label="序号"
        
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="打印设备"
       >
       <template slot-scope="scope">
         <el-input  v-model="scope.row.print"/>
       </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="标签id"
        >
      <template slot-scope="scope">
         <el-input  v-model="scope.row.label"/>
       </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="打印数量">
        <template slot-scope="scope">
         <el-input  v-model="scope.row.num"/>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "tagPrintConfig",
  data() {
      return {
          tableData:[
            {
              print:'',
              label:'',
              num:''
            },
          ] ,
          current:null,
  }
  },
  created() {},

  methods: {
    // 获取打印设置
    hanldeGetPrintDevicesAvailable() {},
    //根据物料号筛选符合条件标签Id
    handleSearchLabelIdListByMat() {},
    //添加行
    addRow(){
      this.tableData.push({
        print:'',
        label:'',
        num:''
      })
    },
    //删除行
    deleteRow(){
      //删除index
      if(!this.current){
        return ;
      }
      let index = this.tableData.findIndex(item=>{
         return item ==this.current;
      })
      console.log('tag', index)
      this.tableData.splice(index,1);
      this.current =null
    },
    handleCurrentChange(current){
      this.current =current;
    }
  }
};
</script>