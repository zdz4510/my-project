<template>
  <div class="proCon">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-form :inline="true">
        <el-form-item label="生产操作界面:">
          <dsn-input v-model="ruleForm.podConfigName"></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="handlePodConfig">查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click="handleReset">重置</dsn-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件end -->
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <!-- 表格操作start -->
      <div class="operation">
        <!-- <dsn-button size="small" type="primary" @click="handlePodConfig">查询</dsn-button> -->
        <dsn-button size="small" type="danger" icon="el-icon-delete" @click="deleteDialog = true">删除</dsn-button>
        <dsn-button size="small" type="primary" @click="handleSave">保存</dsn-button>
        <!-- <dsn-button size="small" type="danger" @click="handleReset">重置</dsn-button> -->
        <!-- <dsn-button size="small" type="primary" @click="handleAdd">添加</dsn-button>
        <dsn-button size="small" type="primary" @click="handleEdit">编辑</dsn-button>
        <dsn-button size="small" type="danger" @click="handleMove">移除</dsn-button>-->
      </div>
      <!--tab切换-->
      <el-tabs type="border-card" class="ruleFormStyle">
        <el-tab-pane label="基础维护">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="base"
            :label-width="labelWidth"
          >
            <el-form-item label="描述：" prop="podConfigDesc">
              <dsn-input v-model="ruleForm.podConfigDesc"></dsn-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
              <dsn-select v-model="ruleForm.status" placeholder="已启用" style="width:100%">
                <el-option label="已启用" :value="true"></el-option>
                <el-option label="已禁用" :value="false"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="默认操作:" prop="defaultOperationRef">
              <el-col :span="22">
                <dsn-input v-model="ruleForm.defaultOperationRef"></dsn-input>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-document-copy"></i>
              </el-col>
              <el-checkbox v-model="ruleForm.canChangeOperation">操作是否允许修改</el-checkbox>
            </el-form-item>
            <el-form-item label="默认资源:">
              <el-col :span="22">
                <dsn-input v-model="ruleForm.defaultResourceRef"></dsn-input>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-document-copy"></i>
              </el-col>
              <el-checkbox v-model="ruleForm.canChangeResource">资源是否允许修改</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="ruleForm.showQty">是否显示数量</el-checkbox>
              <el-checkbox v-model="ruleForm.canChangeQty">数量是否允许修改</el-checkbox>
            </el-form-item>
            <el-form-item label="LOT排队中自动触发按钮标识:">
              <!-- <div class="title">LOT排队中自动触发按钮标识:</div> -->
              <dsn-input type="text" v-model="ruleForm.lotQueueButtonId"></dsn-input>
            </el-form-item>
            <el-form-item label="LOT工作中自动触发按钮标识:">
              <!-- <div class="title">LOT工作中自动触发按钮标识:</div> -->
              <dsn-input type="text" v-model="ruleForm.lotInWorkButtonId"></dsn-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="按钮">
          <div>
            <dsn-button size="small" type="success" icon="el-icon-folder-add" @click="handleAdd">添加</dsn-button>
            <dsn-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit">编辑</dsn-button>
            <dsn-button size="small" type="danger" icon="el-icon-delete" @click="handleMove">移除</dsn-button>
          </div>
          <dsn-table
            ref="multipleTable"
            :data="ruleForm.podButtons"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" label="序号"></el-table-column>
            <el-table-column label="按钮名称" width="120" prop="buttonId"></el-table-column>
            <el-table-column prop="buttionDesc" label="按钮描述" width="200"></el-table-column>
            <el-table-column prop="groupFlag" label="按钮类型" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.groupFlag?'组':'普通' }}</template>
            </el-table-column>
            <el-table-column>
              <template slot="header">
                <p>操作</p>
              </template>
              <template slot-scope="scope">
                <!-- <i class="el-icon-top"  @click="handleOptions(scope.$index, scope.row,'top')"></i> -->
                <div
                  class="iconBox"
                  @click="handleOptions(scope.$index, scope.row,'top')"
                  v-show="scope.$index!==0"
                >
                  <i class="el-icon-top"></i>
                </div>
                <div
                  class="iconBox"
                  @click="handleOptions(scope.$index, scope.row,'down')"
                  v-show="scope.$index!==ruleForm.podButtons.length-1"
                >
                  <i class="el-icon-bottom"></i>
                </div>
              </template>
            </el-table-column>
          </dsn-table>
        </el-tab-pane>
      </el-tabs>
    </DsnPanel>
    <!--删除弹窗-->
    <el-dialog title="提示" :visible.sync="deleteDialog" width="30%">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="deleteDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="handleDelete">确 定</dsn-button>
      </span>
    </el-dialog>
    <!--生产操作弹框-->
    <!-- <el-dialog
            title="请选择生产操作名称"
            :visible.sync="dialogVisible"
            width="30%">
            <p v-for="(item,index) in proNames" :key='index'>{{item}}</p>
    </el-dialog>-->
  </div>
</template>
<script>
import {
  listPodConfigNameRequest,
  podConfigRequest,
  deleteRequest,
  addOrModiaRequest
} from "@/api/pro-configuration/pro-configuration.api.js";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "pro-configuration",
  computed: {
    ...mapGetters(["proRow"])
  },
  data() {
    return {
      dialogVisible: false, //生产操作界面名称弹窗
      labelWidth: "120px",
      shopOrder: "", //工单
      proNames: [], //所有生产操作界面名称
      //通过名称查询一条生产界面信息
      selectedList: [], //勾选的项
      deleteDialog: false, //删除弹窗
      rules: {
        description: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择类型", trigger: "blur" }]
      },
      //所有数据
      ruleForm: {
        canChangeOperation: "",
        canChangeQty: "",
        canChangeResource: "",
        createTime: "",
        createUserId: "",
        createUserName: "",
        defaultOperationRef: "",
        defaultResourceRef: "",
        deleteFlag: "",
        lotInWorkButtonId: "",
        lotQueueButtonId: "",
        modifyTime: "",
        modifyUserId: "",
        modifyUserName: "",
        podButtons: [
          {
            buttionDesc: "",
            buttonId: "",
            groupFlag: true,
            imageIcon: "",
            location: "",
            podActivities: [
              {
                activity: "",
                activityDes: "",
                activityType: "",
                clearsLot: true,
                podButtonRef: "",
                reference: "",
                sequence: "",
                tenantSiteCode: ""
              }
            ],
            podButtonRef: "",
            podButtons: [null],
            podConfigRef: "",
            reference: "",
            sequence: "",
            tenantSiteCode: ""
          }
        ],
        podConfigDesc: "",
        podConfigName: "",
        reference: "",
        showQty: "",
        status: "",
        tenantSiteCode: ""
      },
      //空数据，用来清空用的
      emptyData: {
        canChangeOperation: "",
        canChangeQty: "",
        canChangeResource: "",
        createTime: "",
        createUserId: "",
        createUserName: "",
        defaultOperationRef: "",
        defaultResourceRef: "",
        deleteFlag: "",
        lotInWorkButtonId: "",
        lotQueueButtonId: "",
        modifyTime: "",
        modifyUserId: "",
        modifyUserName: "",
        podButtons: [
          {
            buttionDesc: "",
            buttonId: "",
            groupFlag: true,
            imageIcon: "",
            location: "",
            podActivities: [
              {
                activity: "",
                activityDes: "",
                activityType: "",
                clearsLot: true,
                podButtonRef: "",
                reference: "",
                sequence: "",
                tenantSiteCode: ""
              }
            ],
            podButtonRef: "",
            podButtons: [null],
            podConfigRef: "",
            reference: "",
            sequence: "",
            tenantSiteCode: ""
          }
        ],
        podConfigDesc: "",
        podConfigName: "",
        reference: "",
        showQty: "",
        status: "",
        tenantSiteCode: ""
      }
    };
  },
  methods: {
    ...mapMutations(["PROROW","ALLMESSAGE"]),
    handleIconClick() {},
    handleSelectionChange(rows) {
      console.log(rows,"数据333")
      this.selectedList = rows;
      this.PROROW(this.selectedList[0]);
      // console.log('勾选',this.selectedList[0].groupFlag);
    },
    //查询生产面板名称下拉列表
    getProConfigName() {
      listPodConfigNameRequest().then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.proNames = res.data;
        }
      });
    },
    //通过名称查询一条生产界面信息
    handlePodConfig() {
      const params = this.ruleForm.podConfigName;
      podConfigRequest(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.ruleForm = res.data;
          // console.log("显示数据",res.data)
          // 当前获取的数据放到vuex中，以便更改
          this.ALLMESSAGE(res.data);
        } else {
          this.$message({
            message: `${res.message}`,
            type: "warning"
          });
        }
      });
    },
    // 点击方向按钮
    handleOptions(index, row, option) {
      // let newobj = {}
      if (option == "top") {
        if (index == "0") {
          return;
        } else {
          this.ruleForm.podButtons[index] = this.ruleForm.podButtons.splice(
            index - 1,
            1,
            this.ruleForm.podButtons[index]
          )[0];
          return;
        }
      } else {
        if (index == this.ruleForm.podButtons - 1) {
          return;
        } else {
          this.ruleForm.podButtons[index] = this.ruleForm.podButtons.splice(
            index + 1,
            1,
            this.ruleForm.podButtons[index]
          )[0];
          return;
        }
      }
    },
    //移除操作
    handleMove() {
      if (this.selectedList.length == 0) {
        this.$message({
          message: "请选择移除项",
          type: "warning"
        });
        return;
      } else {
        for (let i = 0; i < this.selectedList.length; i++) {
          let val = this.ruleForm.podButtons.indexOf(this.selectedList[i]);
          if (val > -1) {
            this.ruleForm.podButtons.splice(val, 1);
            // alert("移除成功");
          }
        }
        return this.ruleForm.podButtons;
      }
    },
    //删除操作
    handleDelete() {
      const params = this.ruleForm.podConfigName;
      deleteRequest(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            message: `${res.message}`,
            type: "success"
          });
        } else {
          this.$message({
            message: `${res.message}`,
            type: "warning"
          });
        }
        this.deleteDialog = false;
      });
    },
    //清除（重置）
    handleReset() {
      this.ruleForm = this.emptyData;
      this.ruleForm.podConfigName = "";
    },
    // 跳转新增界面
    handleAdd() {
        this.$router.push({ path: "/material/newAddGroCon" });// 默认添加按钮
    },
    //保存操作
    handleSave() {
      if (this.ruleForm.podButtons[0].buttionDesc == "") {
        this.ruleForm.podButtons = null;
      }
      const params = this.ruleForm;
      addOrModiaRequest(params).then(data => {
        console.log("保存操作" + JSON.stringify(data));
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: `${res.message}`,
            type: "warning"
          });
        }
      });
    },
    //编辑
    handleEdit() {
      if (this.selectedList.length === 1) {
        // this.$router.push({ path: "/material/addGroupProCon" });
        const index=this.ruleForm.podButtons.indexOf(this.selectedList[0]);
        // this.ALLMESSAGE(this.ruleForm)
        this.$router.push({
          name: "newAddGroCon",
          params:{messageList:this.selectedList,num:index}
        });
      }else{
        this.$message({
            message: `只能选中一行进行编辑`,
            type: "warning"
          });
      }
    }
  },
  created() {
    // 新增后
    if(this.$route.params.message){
      this.ruleForm=this.$route.params.message;
      // console.log(this.$route.params.message,"数据阿是")
    }
    // 修改后
    if(this.$route.params.change){
      console.log("this.$route.params.change",this.$route.params.change)
      this.ruleForm=this.$route.params.change;
    }
    // this.ruleForm=this.allMessage;
    this.getProConfigName();
  }
};
</script>
<style lang="scss">
.proCon {
  .el-tabs {
    .base {
      width: 500px;
    }
  }
}
</style>