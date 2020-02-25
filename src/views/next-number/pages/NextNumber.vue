<template>
  <div class="next-number">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <div class="search-bar">
        <el-form
          :inline="true"
          :model="searchForm"
          ref="searchForm"
          :rules="rules"
          label-width="100px"
          class="form-style"
        >
          <dsn-row>
            <dsn-col :span="24">
              <el-form-item label="编号类型:" prop="nextNumberType">
                <dsn-select v-model="searchForm.nextNumberType" placeholder="请选择物料">
                  <el-option
                    v-for="item in type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </dsn-select>
              </el-form-item>
            </dsn-col>
          </dsn-row>
          <dsn-row>
            <dsn-col :span="24">
              <el-form-item label="定义目标:" prop="definedBy">
                <dsn-select v-model="searchForm.definedBy" placeholder="请选择" @change="definedChange">
                  <el-option
                    v-for="item in target"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </dsn-select>
              </el-form-item>
              <el-form-item label prop="value" v-if="searchForm.definedBy !== 'MATERIAL_GROUP'">
                <dsn-select
                  v-model="searchForm.value"
                  placeholder="请选择"
                  @change="onChange"
                  filterable
                  v-loadMore="loadMore"
                  :remote-method="searchMaterialList"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.material+'&'+item.materialRev"
                    :label="item.material"
                    :value="item.material+'&'+item.materialRev"
                  >
                    <span style="float: left">{{ item.material }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.materialRev }}</span>
                  </el-option>
                </dsn-select>
              </el-form-item>
              <el-form-item label prop="value" v-if="searchForm.definedBy == 'MATERIAL_GROUP'">
                <dsn-select
                  v-model="searchForm.value"
                  placeholder="请选择"
                  @change="onChange"
                  filterable
                  v-loadMore="loadMore"
                  :remote-method="searchMaterialList"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.materialGroup"
                    :label="item.materialGroup"
                    :value="item.materialGroup"
                  >
                    <!-- <span style="float: left">{{ item.materialGroup }}</span> -->
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.materialRev }}</span> -->
                  </el-option>
                </dsn-select>
              </el-form-item>
              <el-form-item
                label="版本:"
                prop="materialRev"
                v-if="searchForm.definedBy !== 'MATERIAL_GROUP'"
              >
                <dsn-input v-model="searchForm.materialRev" disabled></dsn-input>
              </el-form-item>
            </dsn-col>
          </dsn-row>
        </el-form>
        <div style="margin-top: 20px">
          <dsn-button size="small" type="primary" @click.native="search('searchForm')">查询</dsn-button>
          <dsn-button size="small" type="primary" @click.native="resetForm('searchForm')">重置</dsn-button>
          <dsn-button size="small" type="success" icon="el-icon-folder-add" @click.native="handleSaveData">保存</dsn-button>
          <dsn-button icon="el-icon-delete" size="small" type="danger" :disabled="!deleteFlag" @click.native="del">删除</dsn-button>
        </div>
      </div>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <div style="margin-bottom: 20px">
          提交规则：
          <dsn-select v-model="searchForm.commitType" placeholder="请选择">
            <el-option
              v-for="item in commitRule"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </dsn-select>
        </div>
        <dsn-button
          size="small"
          type="success"
          icon="el-icon-folder-add"
          @click.native="add('searchForm')"
          :disabled="this.checkedList.length>0"
        >新增</dsn-button>
        <dsn-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          @click.native="edit('searchForm')"
          :disabled="this.checkedList.length===0"
        >编辑</dsn-button>
        
      </div>
      <div>
        <dsn-table
          border
          ref="multipleTable"
          :data="tableData.data"
          tooltip-effect="dark"
          row-key="sequence"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column prop="sequence" width="55" label="序号"></el-table-column>
          <el-table-column prop="sequenceType" label="类型"></el-table-column>
          <el-table-column prop="fixedString" label="固定字符串值"></el-table-column>
          <el-table-column prop="varType" label="可替换参数值"></el-table-column>
          <el-table-column prop="dateTimeFormat" label="时间"></el-table-column>
          <el-table-column prop="length" width="70" label="长度"></el-table-column>
          <el-table-column prop="numBase" width="70" label="进制"></el-table-column>
          <el-table-column prop="numIncrease" width="70" label="增量"></el-table-column>
          <el-table-column prop="initValue" width="70" label="初始值"></el-table-column>
          <el-table-column prop="finalValue" width="70" label="最终值"></el-table-column>
          <el-table-column prop="reset" label="循环"></el-table-column>
          <el-table-column prop="orders" label="顺序"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <dsn-button size="mini" type="primary" @click.native="handleClickUp(scope.row)">↑</dsn-button>
              <dsn-button size="mini" type="primary" @click.native="handleClickDown(scope.row)">↓</dsn-button>
              <dsn-button size="mini" type="warning" @click.native="handleClickDelete(scope.row)">删除</dsn-button>
            </template>
          </el-table-column>
        </dsn-table>
      </div>
    </DsnPanel>
    <el-dialog title="保存" :visible.sync="dialogFlag">
      <add-next-number
       @handleClose="handleClose"
       @handleSave="handleSave"
       v-if="dialogType === 'add'"
       :params="dialogFlag"
      ></add-next-number>
      <edit-next-number
       @handleClose="handleClose"
       @handleSave="handleSave"
       v-if="dialogType === 'edit'"
      ></edit-next-number>
    </el-dialog>
    
  </div>
</template>

<script>
import {
  getNextNumberList,
  searchMat,
  searchMatGroup,
  deleteNextNumber,
  saveNextNumber
} from "../../../api/next.number.api.js";
import { mapMutations } from "vuex";
import addNextNumber from './AddNextNumber.vue';
import editNextNumber from './EditNextNumber.vue';
export default {
  name: "next-number",
  inject: ['defaltDialogWidth'],
  data() {
    return {
      formLabelWidth: "120px",
      loading: false,
      searchForm: {
        definedBy: "MATERIAL",
        nextNumberType: "S",
        value: "",
        materialRev: "",
        commitType: ""
      },
      dialogFlag: false,
      dialogType: '',
      deleteFlag: false,
      addForm: {
        type: "",
        str: ""
      },
      checkedList: [],
      options: [],
      listPageSize: 20,
      listCurrentPage: 1,
      rules: {
        nextNumberType: [
          { required: true, message: "请选择编号类型", trigger: "change" }
        ],
        definedBy: [
          { required: true, message: "请选择定义目标", trigger: "change" }
        ],
        materialRev: [
          { required: true, message: "请填写版本号", trigger: "blur" }
        ],
        value: [
          {
            required: true,
            message: "请选择物料或物料组名称",
            trigger: "change"
          }
        ]
      },
      listTotal: 0,
      searchText: '',
      tableData: {
        data: [],
        page: {
          currentPage: 1,
          pageSize: 0,
          total: 0
        }
      },
      type: [
        {
          value: "S",
          label: "工单下达"
        },
        {
          value: "I",
          label: "车间库存接收"
        }
      ],
      target: [
        {
          value: "MATERIAL",
          label: "物料"
        },
        {
          value: "MATERIAL_GROUP",
          label: "物料组"
        }
      ],
      commitRule: [
        {
          value: "transaction",
          label: "事务"
        },
        {
          value: "immediately",
          label: "即时"
        }
      ]
    };
  },
  created() {
    // this.search()
    const params = {
      pageSize: this.listPageSize,
      currentPage: this.listCurrentPage
    }
    if (sessionStorage.getItem("searchForm")) {
      this.searchForm = JSON.parse(sessionStorage.getItem("searchForm"));
    }
    if (this.searchForm.definedBy == "MATERIAL") {
      params.material = '';
      searchMat(params).then(data => {
        this.options = data.data.data.data;
        this.listTotal = data.data.data.total;
      });
    } else if (this.searchForm.definedBy == "MATERIAL_GROUP") {
      params.materialGroup = '';
      searchMatGroup(params).then(data => {
        this.options = data.data.data.data;
        this.listTotal = data.data.data.total;
      });
    }
  },
  methods: {
    ...mapMutations(["SETNEXTNUMBEREDITLIST"]),
    definedChange(val) {
      (this.searchForm.value = ""), (this.searchForm.materialRev = "");
      this.listPageSize = 20;
      this.listCurrentPage = 1;
      this.searchText = '';
      const params = {
        currentPage: this.listCurrentPage,
        pageSize: this.listPageSize,
      }
      if (val == "MATERIAL") {
        params.material = '';
        searchMat(params).then(data => {
          this.options = data.data.data.data;
          this.listTotal = data.data.data.total;
        });
      } else if (val == "MATERIAL_GROUP") {
        params.materialGroup = '';
        searchMatGroup(params).then(data => {
          this.options = data.data.data.data;
          this.listTotal = data.data.data.total;
        });
      }
    },
    searchMaterialList(value) {
      this.loading = true;
      this.searchText = value;
      const params = {
        currentPage: this.listCurrentPage,
        pageSize: this.listPageSize
      };
      if (this.searchForm.definedBy == "MATERIAL") {
        params.material = value;
        searchMat(params).then(res => {
          this.loading = false;
          this.options = res.data.data.data;
          this.listTotal = res.data.data.total;
        })
      } else {
        params.materialGroup = value;
        searchMatGroup(params).then(res => {
          this.loading = false;
          this.options = res.data.data.data;
          this.listTotal = res.data.data.total;
        })
      }
    },
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleQuery();
          this.deleteFlag = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleQuery() {
      let params = this.searchForm;
      params.pageSize = this.tableData.page.pageSize;
      params.currentPage = this.tableData.page.currentPage;
      if (this.searchForm.definedBy == "MATERIAL_GROUP") {
        params.material = "";
        params.materialGroup = this.searchForm.value.split("&")[0];
      } else if (this.searchForm.definedBy == "MATERIAL") {
        params.materialGroup = "";
        params.material = this.searchForm.value.split("&")[0];
      }
      if (params.sequences) delete params.sequences;

      this.$refs.multipleTable.clearSelection();
      
      getNextNumberList(params).then(data => {
        if (data.data.code == 200) {
          if (!data.data.data) {
            this.$message({
              type: "warning",
              message: "暂无数据"
            });
          }
          this.tableData.data = data.data.data && data.data.data.sequences || [];
          this.searchForm.commitType = data.data.data.commitType;
        } else {
          this.$message.error(data.data.message);
         
        }
      });
    },
    resetForm(formName) {
      sessionStorage.removeItem('searchForm');
      this.$refs[formName].resetFields();
       this.$refs.multipleTable.clearSelection();
      this.deleteFlag = false;
      Object.keys(this.searchForm).map(item => this.searchForm[item] = '');
      this.checkedList = [];
      this.tableData.data = [];
    },
    handleSelectionChange(val) {
      val.map(item => {
        item.nextNumberType = this.searchForm.nextNumberType;
        item.definedBy = this.searchForm.definedBy;
        item.materialRev = this.searchForm.materialRev;
        item.commitType = this.searchForm.commitType;
        item.material = this.searchForm.value.split("&")[0];
      });
      this.checkedList = val;
    },
    handleSizeChange(pageSize) {
      this.tableData.page.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.tableData.page.currentPage = currentPage;
      this.search();
    },
    onChange(val) {
      console.log(val);
      this.searchForm.materialRev = val.split("&")[1];
    },
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.searchForm.definedBy == "MATERIAL") {
            this.searchForm.value = this.searchForm.material;
          } else {
            this.searchForm.value = this.searchForm.materialGroup;
          }
          sessionStorage.setItem("searchForm", JSON.stringify(this.searchForm));
          this.dialogFlag = true;
          this.dialogType = 'add';
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.searchForm.definedBy == "MATERIAL") {
            this.searchForm.value = this.searchForm.material;
          } else {
            this.searchForm.value = this.searchForm.materialGroup;
          }
          sessionStorage.setItem("searchForm", JSON.stringify(this.searchForm));
          this.SETNEXTNUMBEREDITLIST(this.checkedList);
          this.dialogFlag = true;
          this.dialogType = 'edit';
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    del() {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs['searchForm'].validate(valid => {
            if (valid) {
              console.log('delete', this.searchForm)
              const params = Object.assign({...this.searchForm}, { sequences: [] }, { materialRev: this.searchForm.materialRev || ''});
              deleteNextNumber(params).then(data => {
                if (data.data.code == 200) {
                  this.$message.success("删除成功");
                  // this.search('searchForm')
                  this.$refs.multipleTable.clearSelection();
                  this.tableData.data = [];
                } else {
                  this.$message.error(data.data.message);
                }
              });
            }
          });
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    swap(arr, first, second) {
      let tmp = arr[second];
      arr[second] = arr[first];
      arr[first] = tmp;
      return arr;
    },
    handleClickUp(row) {
      if (row.sequence == 1) {
        return;
      } else {
        let arr = this.swap(
          this.tableData.data,
          row.sequence - 2,
          row.sequence - 1
        );
        arr.map((item, index) => {
          item.sequence = index + 1;
        });
        //调用保存方法
        let params = {};
        params.createList = [];
        params.deleteList = [];
        params.updateList = [
          {
            nextNumberType: this.searchForm.nextNumberType,
            definedBy: this.searchForm.definedBy,
            material: this.searchForm.material,
            materialRev: this.searchForm.materialRev,
            commitType: this.searchForm.commitType,
            sequences: arr
          }
        ];
       /*  saveNextNumber(params).then(data => {
          if (data.data.code == 200) {
            this.$message.success("操作成功");
            this.search("searchForm");
          } else {
            this.$message.error(data.data.message);
          }
        }); */
      }
    },
    handleClickDown(row) {
      let length = this.tableData.data.length;
      if (row.sequence == length) {
        return;
      } else {
        let arr = this.swap(
          this.tableData.data,
          row.sequence - 1,
          row.sequence
        );
        arr.map((item, index) => {
          item.sequence = index + 1;
        });
        //调用保存方法
        let params = {};
        params.createList = [];
        params.deleteList = [];
        params.updateList = [
          {
            nextNumberType: this.searchForm.nextNumberType,
            definedBy: this.searchForm.definedBy,
            material: this.searchForm.material,
            materialRev: this.searchForm.materialRev,
            commitType: this.searchForm.commitType,
            sequences: arr
          }
        ];
      /*   saveNextNumber(params).then(data => {
          if (data.data.code == 200) {
            this.$message.success("操作成功");
            this.search("searchForm");
          } else {
            this.$message.error(data.data.message);
          }
        }); */
      }
    },
    handleClickDelete(row) {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          /* let arr = this.tableData.data.splice(row.sequence, 1);
          arr.map((item, index) => {
            item.sequence = index + 1;
          }); */
          const { data } = this.tableData;
          const arr = data.filter(item => item.sequence !== row.sequence)
                          .map((item,index) => Object.assign(item, { sequence:index + 1 }))
          this.tableData.data = arr;
          //调用保存方法
          let params = {};
          params.createList = [];
          params.deleteList = [];
          params.updateList = [
            {
              nextNumberType: this.searchForm.nextNumberType,
              definedBy: this.searchForm.definedBy,
              material: this.searchForm.material,
              materialRev: this.searchForm.materialRev,
              commitType: this.searchForm.commitType,
              sequences: arr
            }
          ];
          saveNextNumber(params).then(data => {
            if (data.data.code == 200) {
              this.$message.success("操作成功");
              this.search("searchForm");
            } else {
              this.$message.error(data.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose() {
      this.dialogFlag = false;
    },
    handleSave(type, item) {
      this.dialogFlag = false;
      const { data } = this.tableData;
      if (type === 'add') {  
        item.sequence = data.length + 1;
        data.push(item);
      }
      if (type === 'edit') {
        const newData = data.map(obj => {
          const modifyData = item.find(child => child.sequence === obj.sequence);
          return modifyData || obj;
        })
        this.tableData.data = newData;
      }
    },
    handleSaveData() {
      this.$refs['searchForm'].validate(valid => {
        if (valid) {
          const { searchForm, tableData: { data } } = this;
          if (!searchForm.commitType) {
            this.$message.error('请选择提交规则');
            return;
          }
          const params = Object.assign(searchForm, { sequences: data } );
          saveNextNumber({updateList: [{...params}]}).then(data => {
            if (data.data.code == 200) {
              this.$message.success("操作成功");
              this.search("searchForm");
            } else {
              this.$message.error(data.data.message);
            }
          })
        }
      });
    },
    loadMore() {
      
      const { listTotal, options, searchText } = this;

      if (options.length === listTotal) return;
      this.loading = true
      const params = {
        currentPage: this.listCurrentPage + 1,
        pageSize: this.listPageSize
      }
      if (this.searchForm.definedBy == "MATERIAL") {
        params.material = searchText;
        searchMat(params).then(res => {
          this.loading = false
           this.options = this.options.concat(res.data.data.data);
          this.listTotal = res.data.data.total;
        })
      } else {
        params.materialGroup = searchText;
        searchMatGroup(params).then(res => {
          this.loading = false
          this.options = this.options.concat(res.data.data.data);
          this.listTotal = res.data.data.total;
        })
      }
    }
  },
  beforeDestroy() {
    // sessionStorage.removeItem('searchForm')
  },
  components: {
    addNextNumber,
    editNextNumber
  }
};
</script>

<style scoped lang="scss">
/* .next-number {
  padding: 0 30px;
  .search-bar {
    background: #ffffff;
    padding-top: 10px;
  }
} */
</style>
