<template>
  <div class="tagConfig">
    <dsnPanel class="query">
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form
        :inline="true" 
        :model="tagConfigForm"
        ref="tagConfigForm"
        label-width="100px"
        class="tagConfigForm"
      >
        <el-form-item label="标签ID" prop="label">
          <dsn-input
            v-model.trim="tagConfigForm.label"
            placeholder="请输入标签ID"
          ></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button icon="el-icon-search" size="small" type="primary" @click="handleQuery"> 查询 </dsn-button>
          <dsn-button icon="el-icon-refresh" size="small" type="primary" @click="handleReset"> 重置 </dsn-button>
        </el-form-item>
      </el-form>        
    </dsnPanel>
    <dsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <el-button size="small" type="success" icon="el-icon-folder-add" @click="handleAdd"> 新增 </el-button>
        <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit" :disabled="selectionList.length != 1"> 修改</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete" :disabled="selectionList.length <= 0" @click="deleteDialog = true">删除</el-button>
        <el-button size="small" type="primary" icon="el-icon-upload2" @click="handleExport">导出</el-button>
      </div>
      <div class="showInfo">
        <dsn-advance-table
          ref="multipleTable"
          :paramData="params"
          tooltip-effect="dark"
          style="width: 100%"
          :httpFn="httpFn"
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
    </dsnPanel>
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
import { exportExcelHttp } from "@/api/device/type.api.js";
import { deleteTagConfig, getTagConfigList } from "@/api/tag/tag.config.api";
import { mapMutations } from "vuex";

export default {
  computed: {
    params: function() {
      return this.tagConfigForm;
    }
  },
  data() {
    return {
      httpFn: getTagConfigList,
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
      console.log(this.$refs["multipleTable"]);
      this.$refs["multipleTable"].search();
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
    handleAdd() {
      this.selectionList = [];
      const emptyObj = {
        labelUseType: "", //标签应用类型
        useTemplateType: "", //使用命令行设定
        printFileSize: "", //标签内存大小，单位KB
        labelDes: "", //标签描述
        label: "", //label
        labelStorageList: [],
        labelLinkList: [],
        url: ""
      };
      this.TAGCONFIGLIST(emptyObj);
      this.$router.push({
        name: "tagConfigEdit",
        query: { operateType: "add" }
      });
    },
    // 编辑
    handleEdit() {
      if (this.selectionList.length != 1) {
        this.$message({
          type: "warning",
          message: "最多只能编辑一条"
        });
        return;
      }
      this.TAGCONFIGLIST(this.selectionList[0]);
      this.$router.push({
        name: "tagConfigEdit",
        query: { operateType: "edit" }
      });
    },
    handleDelete() {
      // const data = [];
      // this.selectionList.forEach(element => {
      //   const obj = {
      //     label: element.label
      //   };
      //   data.push(obj);
      // });
      deleteTagConfig(this.selectionList).then(data => {
        const res = data.data;
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteDialog = false;
          this.init(); // 重新请求
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
  .operate {
    padding: 10px 5px;
  }
  .query {
  }
}
</style>
