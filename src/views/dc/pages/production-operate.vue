<template>
  <div class="jieBao">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      class="form-style"
      :label-width="formLabelWidth"
      style="display:flex;align-items:center"
    >
      <el-form-item label="工序:" prop="mat">
        <el-input v-model="searchForm.operation"></el-input>
      </el-form-item>
      <el-form-item label="设备:" prop="mat">
        <el-input v-model="searchForm.operation"></el-input>
      </el-form-item>
      <el-form-item label="LOT:" prop="matRev" style="display:flex;align-items:center;width:380px">
        <div style="display:flex;align-item:center">
          <el-input v-model="searchForm.operation"></el-input>
          <i class="el-icon-document-copy" @click="details"></i>
          <el-button class="pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="operation">
      <el-button type="primary" size="small" @click="goEdit">开始</el-button>
      <el-button type="primary" size="small" @click="reset">注销</el-button>
      <el-button type="primary" size="small">结束</el-button>
      <el-button type="primary" size="small">1号组</el-button>
      <el-button type="primary" size="small">2号组</el-button>
    </div>
    <!--表单-->
    <div class="tableBox">
      <el-table
        ref="multipleTable"
        :data="row"
        tooltip-effect="dark"
        style="width: 100%"
        height="514"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="120">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="name"  label="LOT编号" width="120"></el-table-column>
        <el-table-column prop="address" label="LOT状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address"  label="工单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address"  label="物料" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="工艺路线" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>

    <!-- LOT模态框 -->
    <el-dialog :visible.sync="popup" style="padding:10px 20px" >
      <div class="popupBox">  
        <el-table :data="popupData" width="100%" height="400px" @row-dblclick='handledbClick' ref="multipleTable">
          <el-table-column prop="date" label="LOT编号" width="150px" height="50px"></el-table-column>
          <el-table-column prop="name" label="LOT状态" width="150px" height="50px"></el-table-column>
          <el-table-column prop="date" label="工单" width="150px" height="50px"></el-table-column>
          <el-table-column prop="name" label="物料" width="150px" height="50px"></el-table-column>
          <el-table-column prop="address" label="工艺路线" width="150px" height="50px"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      popup: false,
      formLabelWidth: "50px",
      searchForm: {
        operation: ""
      },
      popupData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableData: [],
      row:[],
    };
  },
  methods: {
    handledbClick(row){
     
      this.row.push(row)
      // this.row = row
      //  this.$refs.multipleTable.toggleRowSelection(row);
       this.popup=false
    },
    resetForm() {},
    details() {
      this.popup = true;
    },
    goEdit() {},
    reset() {
      this.$router.go(0);
    }
  }
};
</script>
<style lang="scss" scoped>
.jieBao {
  padding: 30px 30px;
}
.operation {
  padding: 10px 5px;
}
.el-icon-document-copy {
  display: flex;
  align-items: center;
  margin: 0 40px 0 7px;
}
.popupBox {
  overflow-x: hidden;
  overflow: auto;
  display: flex;
  //  width: 600px;
  //  height:300px;
  line-height: 100px;
}
.el-dialog__body {
  padding: 10px 20px !important;
}
</style>