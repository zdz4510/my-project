<template>
  <div class="workingCertificateMaintenance">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form
        :inline="true"
        :model="workCertificateForm"
        ref="workCertificateForm"
        label-width="100px"
      >
        <el-form-item label="物料清单">
          <dsn-input
            v-model="bom"
            placeholder="请输入物料清单"
          ></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="handleQuery">
            查询
          </dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="handleReset">
            重置
          </dsn-button>
        </el-form-item>
      </el-form>
    </DsnPanel>
    
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operation">
      <dsn-button 
        size="small" 
        type="success" 
        icon="el-icon-folder-add"
        :disabled="false"
        @click.native="handleAdd">新增</dsn-button>
      <dsn-button
        size="small"
        type="primary"
        icon="el-icon-edit"
        :disabled="selectionList.length !== 1"
        @click="handleEdit"
      >
        修改
      </dsn-button>
      <dsn-button
        size="small"
        type="danger"
        icon="el-icon-delete"
        :disabled="selectionList.length <= 0"
        @click="deleteDialog = true"
        >
          删除
        </dsn-button>
      </div>
      <dsn-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" />
        
        <el-table-column prop="bom" label="物料清单" />
        <el-table-column prop="bomRev" label="当前版本号" />
        <el-table-column prop="bomDes" label="物料清单描述"/>
        <el-table-column prop="bomType" label="类型" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status ? "已启用" : "未启用" }}
            <!-- {{ scope.row.status | filterStatus }} -->
          </template>
        </el-table-column>
      </dsn-table>
    <div class="pagination">
      <dsn-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="currentPage"
        @size-change="handlePagesize"
        @current-change="handleCurrentChange"
      >
      </dsn-pagination>
    </div>
    </DsnPanel>
    <el-dialog title="删除" :visible.sync="deleteDialog" :width="defaltDialogWidth">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="deleteDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleDelete">
          确 定
        </dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryMaterialList,
  deleteMaterial
} from "@/api/maintenance/materialList.api";
import { mapMutations } from "vuex";
// import { filter } from "minimatch";
export default {
  inject:['defaltDialogWidth'],
  data() {
    return {
      workCertificateForm: {
        //上岗证
        cert: ""
      },
      bom: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      selectionList: [],
      stations: [],
      deleteDialog: false
    };
  },
  filters: {
    // filterStatus(value) {
    //   if (value) {
    //     return "已启用";
    //   }
    //   return "未启用";
    // },
    // filterCertType(value) {
    //   if (value) {
    //     return "永久";
    //   }
    //   return "临时";
    // }
  },
  created() {
    this.getMaterialList();
  },
  methods: {
    ...mapMutations(["MATERIALLIST"]),
    //初始化数据
    getMaterialList() {
      const { 
        currentPage,
        pageSize,
        bom
      } = this;
      const params = {
        currentPage,
        pageSize,
        bom
      };
      queryMaterialList(params).then(res => {
        console.log('res', res)
        const {
          data: {
            data: {
              data,
              total
            },
            code,
            message
          },
        } = res;
        if (code === 200) {
          this.total = total;
          this.tableData = data;
          return;
        }
        this.$message({
          message,
          type: "warning"
        });
      })
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.getMaterialList();
    },
    //更改页码大小
    handlePagesize(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getMaterialList();
    },
    //模糊查询建议
    querySearch() {},
    //模糊查询后选择
    handleSelect() {},
    //复选框选择
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    //查询
    handleQuery() {
      this.getMaterialList();
    },
    //重置
    handleReset() {
      this.bom = "";
      this.getMaterialList();
    },
    //新增
    handleAdd() {
      this.MATERIALLIST([]);
      this.$router.push({
        name: "materialListEdit",
        query: { operateType: "add" }
      });
    },
    //编辑
    handleEdit() {
      const tempArr = JSON.parse(JSON.stringify(this.selectionList));
      this.MATERIALLIST(tempArr);
      localStorage.setItem('materialList', JSON.stringify(this.selectionList))
      this.$router.push({
        name: "materialListEdit",
        query: { operateType: "edit" }
      });
    },
    handleDelete() {
      const { selectionList } = this;
      const params = selectionList.map(item => ({
        bom: item.bom,
        bomRev: item.bomRev
      }))
      deleteMaterial(params).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteDialog = false;
          this.getMaterialList();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.deleteDialog = false;
      });
    },
  
  }
};
</script>

<style lang="scss">
.workingCertificateMaintenance {
  // padding: 0 30px;
  // .operate {
  //   padding: 10px 5px;
  // }
  // .query {
  //   height: 40px;
  //   padding: 10px;
  //   display: flex;
  //   justify-content: space-between;
  //   .left {
  //     width: 300px;
  //   }
  //   .right {
  //     width: 680px;
  //     padding: 5px 30px;
  //   }
  // }
}
</style>
