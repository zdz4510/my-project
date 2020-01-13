<template>
  <div class="tagConfig">
    <div class="query">
      <div class="left">
        <el-form
          :model="tagConfigForm"
          ref="tagConfigForm"
          label-width="100px"
          class="tagConfigForm"
        >
          <el-form-item label="标签ID" prop="label">
            <el-input
              v-model.trim="tagConfigForm.label"
              placeholder="请输入标签ID"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="primary" @click="handleQuery">
          查询
        </el-button>
        <el-button size="small" type="primary" @click="handleReset">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="handleAdd">
        新增
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length <= 0"
        @click="handleEdit"
      >
        修改
      </el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="selectionList.length <= 0"
        @click="deleteDialog = true"
      >
        删除
      </el-button>
      <el-button size="small" type="primary" @click="handleExport"
        >导出</el-button
      >
    </div>
    <div class="showInfo">
      <dsn-advance-table 
        ref="multipleTable"
        :paramData="params"
        tooltip-effect="dark"
        style="width: 100%"
        :httpFn ="httpFn"
        height="350px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="label" label="标签ID" width="120">
        </el-table-column>
        <el-table-column prop="resourceCount" label="标签描述" width="120">
        </el-table-column>
        <el-table-column prop="groupDes" label="标签内存大小" width="170">
        </el-table-column>

        <el-table-column prop="createUserName" label="命令行打印" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建人" width="170">
        </el-table-column>
        <el-table-column prop="modifyUserName" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="修改人" width="170">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          show-overflow-tooltip
        >
        </el-table-column>
      </dsn-advance-table>
    </div>
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  deleteResourceGroupHttp,
  exportExcelHttp
} from "@/api/device/type.api.js";
import { getTagConfigList } from "@/api/tag/tag.config.api";
import { mapMutations } from "vuex";

export default {
  computed:{
    params:function(){
      return this.tagConfigForm;
    }
  },
  data() {
    return {
      httpFn:getTagConfigList,
      tagConfigForm: {
        label: ""
      },
      tableData: [],
      selectionList: [],
      //分页
      currentPage: 1,
      pagesize: 10,
      total: 0,
      deleteDialog: false
    };
  },
  created() {
    //this.init();
  },
  methods: {
    ...mapMutations(["TAGCONFIGLIST"]),
    init() {
      console.log( this.$refs['multipleTable'])
        this.$refs['multipleTable'].search();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //当前选中行
    handleSelectionChange(val) {
      this.selectionList = val;
      console.log(this.selectionList);
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    //更改页码大小
    handlePagesize(pagesize) {
      this.pagesize = pagesize;
      this.currentPage = 1;
      this.init();
    },
    handleAdd() {
      this.selectionList = [];
      const emptyObj = { label: "", groupDes: "" };
      this.selectionList.push(emptyObj);
      this.TAGCONFIGLIST(this.selectionList);
      this.$router.push({
        name: "tagConfigEdit",
        query: { operateType: "add" }
      });
    },
    handleEdit() {
      this.TAGCONFIGLIST(this.selectionList);
      this.$router.push({
        name: "tagConfigEdit",
        query: { operateType: "edit" }
      });
    },
    handleDelete() {
      console.log(this.selectionList);
      const data = [];
      this.selectionList.forEach(element => {
        const obj = {
          label: element.label
        };
        data.push(obj);
      });
      console.log(data);
      deleteResourceGroupHttp(data).then(data => {
        const res = data.data;
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.deleteDialog = false;
          this.init();
          return;
        }
        this.deleteDialog = false;
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    handleQuery() {
      this.init();
    },
    handleReset() {
      this.tagConfigForm.label = "";
    },
    handleExport() {
      const data = {
        label: this.tagConfigForm.label,
        groupDes: this.tagConfigForm.groupDes
      };
      exportExcelHttp(data);
    }
  }
};
</script>

<style lang="scss">
.tagConfig {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .right {
      width: 680px;
      padding: 5px 30px;
    }
  }
}
</style>
