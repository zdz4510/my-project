<template>
  <div>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <!-- 卡片内容 -->
      <div class="search-bar">
        <el-form
          :inline="true"
          :model="searchForm"
          ref="searchForm"
          :rules="rules"
          class="form-style"
          @submit.native.prevent
        >
          <el-form-item label="Lot:" prop="lot" required>
            <dsn-select v-model="searchForm.lot" placeholder="请输入或选择" filterable>
              <el-option v-for="item in lot" :key="item.lot" :label="item.lot" :value="item.lot"></el-option>
            </dsn-select>
          </el-form-item>
          <el-form-item label="工序:" prop="operation">
            <dsn-select v-model="searchForm.operation" placeholder="请输入或选择" filterable clearable>
              <el-option
                v-for="item in operation"
                :key="item.operation"
                :label="item.operation"
                :value="item.operation"
              ></el-option>
            </dsn-select>
          </el-form-item>
          <el-form-item label="设备:" prop="resource">
            <dsn-select v-model="searchForm.resource" placeholder="请输入或选择" filterable clearable>
              <el-option
                v-for="item in resource"
                :key="item.resource"
                :label="item.resource"
                :value="item.resource"
              ></el-option>
            </dsn-select>
          </el-form-item>

          <el-form-item label prop>
            <dsn-button
              icon="el-icon-search"
              size="small"
              type="primary"
              @click="search('searchForm')"
            >查询</dsn-button>
            <dsn-button
              icon="el-icon-refresh"
              size="small"
              type="primary"
              @click="resetForm('searchForm')"
            >重置</dsn-button>
          </el-form-item>
        </el-form>
      </div>
    </DsnPanel>
 <DsnPanel>
    <!-- 卡片内容 -->
    <!-- 卡片内容 -->

    <div slot="header" class="title clearfix">
      <span>搜索结果</span>
    </div>

    <div >
    

      <dsn-table
        border
        ref="multipleTable"
        :data="this.tableData.data"
        tooltip-effect="dark"
        row-key="ncCodeRecord+ncCodeStatus"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop label="不合格记录">
          <el-table-column prop="ncCodeRecord" label="不合格代码"></el-table-column>
          <el-table-column label="不合格状态">
            <template slot-scope="scope">{{ scope.row.ncCodeStatus ? '关闭' : '打开' }}</template>
          </el-table-column>
          <el-table-column prop="ncOperation" label="工序"></el-table-column>
          <el-table-column prop="ncResource" label="设备"></el-table-column>
          <el-table-column prop="material" label="物料"></el-table-column>
          <el-table-column prop="modifyUserName" label="不合格记录人"></el-table-column>
          <el-table-column prop="modifyTime" label="不合格记录时间"></el-table-column>
          <el-table-column fixed="right" label="是否关闭" width="100">
            <template slot-scope="scope">
              <dsn-button
                v-if="!scope.row.ncCodeStatus"
                @click="handleClick(scope.row)"
                type="warning"
                size="small"
              >关闭</dsn-button>
            </template>
          </el-table-column>
        </el-table-column>
      </dsn-table>
    </div>
 </DsnPanel>
    <div class="add">
        <dsn-button class="mr25 pad1025" size="small" type="primary" @click="save">保存</dsn-button>
      <el-row>
        <el-col :span="24" class="title">新增不合格</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">
          <dsn-table
             highlight-current-row
            border
            ref="ncGroup"
            :data="this.ncGroupData"
            tooltip-effect="dark"
            row-key="ncGroup"
            @row-click="handleClickGroup"
			
          >
            <el-table-column prop="ncGroup" label="不合格代码组"></el-table-column>
            <el-table-column prop="ncGroupDes" label="不合格代码组描述"></el-table-column>
          </dsn-table>
        </el-col>
        <el-col :span="8" class="title">
          <dsn-table
           highlight-current-row
            border
            ref="ncCode"
            :data="this.ncCodeData"
            tooltip-effect="dark"
            row-key="ncCode"
            @row-click="handleClickCode"
          >
            <el-table-column prop="ncCode" label="可用的不合格代码"></el-table-column>
            <el-table-column prop="ncCodeDes" label="可用的不合格代码描述"></el-table-column>
          </dsn-table>
        </el-col>
        <el-col :span="8" class="title">
          <dsn-table
           highlight-current-row
            border
            ref="ncCodeAdd"
            :data="this.ncCodeDataAdd"
            tooltip-effect="dark"
            row-key="ncCode"
          >
            <el-table-column prop="ncCode" label="不合格数据条目"></el-table-column>
            <el-table-column prop="ncCodeDes" label="不合格数据条目描述"></el-table-column>
          </dsn-table>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="10">
          <dsn-button icon="el-icon-folder-add" type="success" @click="addData">添加</dsn-button>
        </el-col>
        <el-col :span="2">
          <dsn-button icon="el-icon-delete" type="danger" @click="cancle">取消</dsn-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getDataList,
  getLotList,
  getAllOperation,
  getAllResource,
  getNcGroup,
  getNcCode,
  saveData,
  closeData
} from "../../../api/nc.log.api";
import _ from "lodash";
export default {
  name: "nc-code",
  data() {
    return {
      checkedList: [],
      formLabelWidth: "120px",
      activeName: "first",
      searchForm: {
        lot: "",
        operation: "",
        resource: ""
      },
      rules: {
        lot: [{ required: true, message: "请选择LOT值", trigger: "change" }]
      },
      tableData: {
        data: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      },
      lot: [],
      operation: [],
      resource: [],
      ncGroupData: [],
      ncCodeData: [],
      ncCodeDataAdd: [],
      currentItem: {}
    };
  },
  created() {
    // this.search()
    let params = {
      lot: ""
    };
    getLotList(params).then(data => {
      if (data.data.code == 200) {
        this.lot = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
    getAllOperation().then(data => {
      if (data.data.code == 200) {
        this.operation = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
    getAllResource().then(data => {
      if (data.data.code == 200) {
        this.resource = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
  },
  methods: {
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.searchForm;
          getDataList(params).then(data => {
            if (data.data.code == 200) {
              this.tableData.data = data.data.data;
            } else {
              this.$message.error(data.data.message);
            }
          });
          if (this.searchForm.operation && this.searchForm.resource) {
            let params = {
              operation: this.searchForm.operation
            };
            getNcGroup(params).then(data => {
              if (data.data.code == 200) {
                this.ncGroupData = data.data.data;
              } else {
                this.$message.error(data.data.message);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.tableData.page.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.tableData.page.currentPage = currentPage;
      this.search();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
      console.log(val);
    },
    save() {
      let ncCodeRecordList = [];
      this.ncCodeDataAdd.map(item => {
        ncCodeRecordList.push(item.ncCode);
      });
      let params = {};
      params.createList = [
        {
          lot: this.searchForm.lot,
          ncOperation: this.searchForm.operation,
          ncResource: this.searchForm.resource,
          ncCodeRecordList: ncCodeRecordList
        }
      ];
      params.updateList = [];

      saveData(params).then(data => {
        if (data.data.code == 200) {
          this.$message.success("保存成功");
          this.search("searchForm");
          this.ncCodeDataAdd = [];
          this.ncGroupData = [];
          this.ncCodeData = [];
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ncCodeDataAdd = [];
      this.ncGroupData = [];
      this.ncCodeData = [];
      this.tableData.data =[];
    },
    handleClick(row) {
      let params = {
        lot: this.searchForm.lot,
        ncOperation: this.searchForm.operation,
        ncResource: this.searchForm.resource,
        ncCodeRecordList: [row.ncCodeRecord]
      };
      closeData(params).then(data => {
        if (data.data.code == 200) {
          this.$message.success("操作成功");
          this.search("searchForm");
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleClickGroup(row) {
      console.log(row, "r");
      let params = {
        ncGroup: row.ncGroup
      };
      getNcCode(params).then(data => {
        if (data.data.code == 200) {
          this.ncCodeData = data.data.data;
          this.ncCodeDataAdd = [];
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleClickCode(row) {
      this.currentItem = row;
    },
    cancle() {
      this.ncCodeDataAdd = [];
    },
    addData() {
      this.ncCodeDataAdd.push(this.currentItem);
      this.ncCodeDataAdd = _.uniq(this.ncCodeDataAdd);
    }
  }
};
</script>

<style scoped lang="scss">
.search-bar {
  background: #ffffff;
  padding-bottom: 20px;
  .form-style {
    margin: 0 !important;
    padding: 0 0 0 30px !important;
    position: relative;
    top: 20px;
  }
}
.content {
  background: #ffffff;
}
.add-form {
  padding-left: 25px;
}
.dec {
  width: 400px !important;
}
.add {
	
  margin-top: 10x;
  .title {
    background: #f5f7fa;
    color: #909399;
    font-weight: bolder;
    padding: 12px 10px;
    border: 1px solid #ebeef5;
  }
}
</style>
