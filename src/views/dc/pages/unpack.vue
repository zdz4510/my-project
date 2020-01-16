<template>
  <div class="jieBao">
    <el-form label-width="100px" class="typeForm">
      <el-form-item label="物料号:">
        <el-col :span="6" style="margin-right:20px">
          <el-input placeholder="请输入物料号" v-model="payload.mat"></el-input>
        </el-col>
        <el-button size="small" type="primary" @click="getList">查询</el-button>
        <el-button size="small" type="primary" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operation">
      <el-button type="primary" size="small" @click="goEdit">新增</el-button>
      <el-button type="primary" size="small" @click="handleModify">修改</el-button>
      <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
    </div>
    <!--表单-->
    <div class="tableBox">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectCheck"
        @row-click="selectCheckBox"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="dataIndex" label="序号" width="120"></el-table-column>
        <el-table-column prop="mat" label="物料号" width="120"></el-table-column>
        <el-table-column prop="containerType" label="容器类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="packingClass" label="包装层级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mainNumberType" label="容器编号规则" show-overflow-tooltip>
          <span slot-scope="scope">{{scope.row.mainNumberType?'是':"否"}}</span>
        </el-table-column>
        <el-table-column prop="mainNumberRev" label="容器编号版本" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accommodateNumber" label="容器容纳数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="labelPrinting" label="容器标签打印" show-overflow-tooltip>
          <span slot-scope="scope">{{scope.row.labelPrinting?'是':"否"}}</span>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="->,total,prev,pager,next,sizes"
          :total="total"
          :page-size="payload.pagesize"
          :current-page="payload.currentPage"
          @current-change="handleCurrentChange"
          @size-change="handlePagesize"
        ></el-pagination>
      </div>
    </div>
    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%" :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import {
  deletePackagingConfigurationBatch,
  getPagData
} from "@/api/dc/unpack.api";
export default {
  data() {
    return {
      payload: {
        currentPage: 1,
        pageSize: 10,
        mat: ""
      },
      total: "",
      deleteDialog: false,
      tableData: [],
      selectList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapMutations(["UNPACKEDIT"]),
    handleReset() {
      this.payload.mat = "";
    },
    handleClose() {
      this.deleteDialog = false;
    },
    handleModify() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      this.UNPACKEDIT(JSON.parse(JSON.stringify(this.selectList)));
      this.$router.push({
        name: "unpackEdit",
        query: { operateType: "edit" }
      });
    },
    sureDelete() {
      deletePackagingConfigurationBatch(this.selectList).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteDialog = false;
          this.getList();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.deleteDialog = false;
      });
    },
    handleDelete() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      this.deleteDialog = true;
    },
    handleCurrentChange(currentChange) {
      this.payload.currentPage = currentChange;
      this.getList();
    },
    // pagesize 改变之后的回调
    handlePagesize(pagesize) {
      this.pagesize = pagesize; //设置pagesize
      this.payload.currentPage = 1; // 从第一页开始请求
      this.getList(); //从新渲染分页
    },
    //当用户勾选数据行的 Checkbox 时触发的事件
    selectCheck(selection) {
      this.selectList = selection;
    },
    selectCheckBox(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getList() {
      console.log(this.payload);
      getPagData(this.payload).then(res => {
        const {
          data: {
            data: { data }
          }
        } = res;
        console.log(res.data.data, "res");
        this.total = res.data.data.total;
        const resData = data.map((item, i) => {
          return {
            ...item,
            dataIndex: i + 1
          };
        });
        this.tableData = resData;
      });
    },
    goEdit() {
      this.$router.push({ name: "unpackEdit", query: { operateType: "add" } });
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
</style>
