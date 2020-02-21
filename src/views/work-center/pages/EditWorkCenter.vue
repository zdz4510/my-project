<template>
  <div class="edit-work-center">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="handleSave('editForm')">保存</dsn-button>
    </div>
    <el-row :gutter="24">
      <!-- <el-col :span="6">
        <div class="editList" style="padding-bottom:81px">
          <dsn-select
            v-model="value"
            clearable
            style="margin-bottom: 30px"
            placeholder="请选择"
            :disabled="selectIsDisabled"
            @clear="handleClearSelect"
            @change="handleChangeOption"
            @focus="handleSelectFocus"
            ref="select"
          >
            <el-option
              v-for="item in cloneList"
              :key="item.workCenter"
              :label="item.workCenter"
              :value="item.workCenter"
            ></el-option>
          </dsn-select>
          <dsn-table
            ref="editTable"
            :data="cloneList"
            border
            highlight-current-row
            style="width: 100%"
            @row-click="handleCurrentChange"
          >
            <el-table-column label="工作中心" prop="workCenter"></el-table-column>
            <el-table-column label="描述" prop="workCenterDes"></el-table-column>
          </dsn-table>
        </div>
      </el-col> -->
      <el-col :span="24">
        <div class="workList">
          <el-form
            :inline="true"
            :model="editForm"
            ref="editForm"
            :rules="rules"
            class="add-form"
          >
            <el-form-item label="工作中心:" prop="workCenter">
              <dsn-input v-model="editForm.workCenter" disabled></dsn-input>
            </el-form-item>
            <el-form-item label="描述:" prop="workCenter">
              <dsn-input v-model="editForm.workCenterDes" disabled></dsn-input>
            </el-form-item>
            <el-tabs v-model="activeName" type="border-card">
              <el-tab-pane style="min-height:540px" label="基础信息" name="first">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态:" prop="status">
                      <dsn-select v-model="editForm.status" filterable placeholder="请选择">
                        <el-option
                          v-for="item in status"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="类别:" prop="workCenterType">
                      <dsn-select v-model="editForm.workCenterType " filterable placeholder="请选择">
                        <el-option
                          v-for="item in workCenterType "
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="工作中心关系维护" name="second">
                <el-row>
                  <el-col :span="11">
                    <dsn-table
                      :data="allocateData.filter(data => !workCenter1 || data.workCenter.toLowerCase().includes(workCenter1.toLowerCase()))"
                      @select="check1"
                      @select-all="check1"
                    >
                      <el-table-column label="工作中心:">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="workCenter" label="已分配工作中心"></el-table-column>
                      </el-table-column>
                      <el-table-column label>
                        <template slot="header">
                          <dsn-input v-model="workCenter1" placeholder="输入工作中心搜索" />
                        </template>
                        <el-table-column prop="workCenterDes" label="工作中心描述"></el-table-column>
                      </el-table-column>
                    </dsn-table>
                  </el-col>
                  <el-col :span="2">
                    <div class="direction mt70">
                      <i class="el-icon-caret-right" @click="right"></i>
                    </div>
                    <div class="direction">
                      <i class="el-icon-caret-left" @click="left"></i>
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <dsn-table
                      :data="unallocateData.filter(data => !workCenter2 || data.workCenter.toLowerCase().includes(workCenter2.toLowerCase()))"
                      @select="check2"
                      @select-all="check2"
                    >
                      <el-table-column label="工作中心:">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="workCenter" label="未分配工作中心"></el-table-column>
                      </el-table-column>
                      <el-table-column label>
                        <template slot="header">
                          <dsn-input v-model="workCenter2" placeholder="输入工作中心搜索" />
                        </template>
                        <el-table-column prop="workCenterDes" label="工作中心描述"></el-table-column>
                      </el-table-column>
                    </dsn-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="用户" name="three">
                <el-row>
                  <el-col :span="11">
                    <dsn-table
                      :data="allocateUser.filter(data => !name1 || data.name.toLowerCase().includes(name1.toLowerCase()))"
                      @select="checkUser1"
                      @select-all="checkUser1"
                    >
                      <el-table-column label="用户:">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="已分配用户"></el-table-column>
                      </el-table-column>
                      <el-table-column label>
                        <template slot="header">
                          <dsn-input v-model="name1" placeholder="输入用户搜索" />
                        </template>
                        <el-table-column prop="desc" label="用户描述"></el-table-column>
                      </el-table-column>
                    </dsn-table>
                  </el-col>
                  <el-col :span="2">
                    <div class="direction mt70">
                      <i class="el-icon-caret-right" @click="rightUser"></i>
                    </div>
                    <div class="direction">
                      <i class="el-icon-caret-left" @click="leftUser"></i>
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <dsn-table
                      :data="unallocateUser.filter(data => !name2 || data.name.toLowerCase().includes(name2.toLowerCase()))"
                      @select="checkUser2"
                      @select-all="checkUser2"
                    >
                      <el-table-column label="用户:">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="未分配用户"></el-table-column>
                      </el-table-column>
                      <el-table-column label>
                        <template slot="header">
                          <dsn-input v-model="name2" placeholder="输入用户搜索" />
                        </template>
                        <el-table-column prop="desc" label="用户描述"></el-table-column>
                      </el-table-column>
                    </dsn-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
              <!-- <el-button @click="handleReset(workCenterForm)">重 置</el-button> -->
              <el-button>重 置</el-button>
              <el-button type="primary" @click="dialog = false">确 定</el-button>
            </div>
          </el-form>
          <!-- 确认模态框 -->
          <el-dialog title="保存" :visible.sync="saveDialog" width="30%">
            <span>是否保存数据？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleCancle">取 消</el-button>
              <el-button type="primary" @click="handleSave('editForm')">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  saveWorkCenter,
  getAllList,
  getUserList
} from "../../../api/work.center.api.js";
import _ from "lodash";
export default {
  name: "edit-work-center",
  computed: {
    ...mapGetters(["workCenterEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth: "120px",
      activeName: "first",
      cloneModify: {}, //  克隆的表单的一份副本
      editForm: {
        workCenter: "",
        workCenterDes: "",
        status: "",
        workCenterType: "",
        workCenterRelation: []
      },
      rules: {},
      status: [
        {
          value: "1",
          label: "已启用"
        },
        {
          value: "2",
          label: "未启用"
        }
      ],
      workCenterType: [
        {
          value: "1",
          label: "车间"
        },
        {
          value: "2",
          label: "产线"
        }
      ],
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      selectIsDisabled: false,
      selectedList: [],
      selectedList2: [],
      selectedListUser: [],
      selectedListUser2: [],
      allocateData: [],
      unallocateData: [],
      allocateUser: [],
      unallocateUser: [],
      cloneUnallocateData: [],
      cloneAllocateData: [],
      cloneUnallocateUser: [],
      cloneAllocateUser: [],
      workCenter1: "",
      workCenter2: "",
      name1: "",
      name2: ""
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapMutations(["SETWORKCENTEREDITLIST"]),
    //初始化的操作
    init() {
      if (this.workCenterEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.workCenterEditList)); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = JSON.parse(JSON.stringify(this.editForm)); // modify 的副本
       /*  this.setCurrent(this.editForm); // 设置选中第一行
        this.currentRow = this.editForm; // 设置初始currentRow 为第一行 */
        console.log('wqeqwe', this.workCenterEditList)
        getAllList().then(data => {
          if (data.data.code == 200) {
            this.unallocateData = data.data.data;
            console.log('this.workCenterEditList.workCenterRelation', this.workCenterEditList.workCenterRelation)
            this.allocateData = this.workCenterEditList[0].workCenterRelation || [];
          } else {
            this.$message.error(data.data.message);
          }
        });
        getUserList().then(data => {
          if (data.data.code == 200) {
            this.unallocateUser = data.data.data;
            console.log('this.workCenterEditList.userList', this.workCenterEditList.userList)
            this.allocateUser = this.workCenterEditList[0].userList || []
          } else {
            this.$message.error(data.data.message);
          }
        });
      }
    },
    //清除下拉列表时触发
    handleClearSelect() {
      this.init();
    },
    //选中下拉列表时触发
    handleChangeOption(row) {
      if (row == "") {
        return;
      }
      //过滤数组
      const tempList =
        this.cloneList &&
        this.cloneList.filter(item => {
          item["workCenter"] == row;
        });
      console.log(tempList);
      // this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      this.setCurrent(tempList[0]);
      getAllList().then(data => {
        if (data.data.code == 200) {
          this.unallocateData = data.data.data;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    //下拉列表获取到焦点时触发
    handleSelectFocus() {
      // this.oldRow = oldRow;
      //  当前编辑的和之前的数据不一样就显示弹窗
      if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        console.log("数据不一样禁用下拉框还有弹出保存");
        this.saveDialog = true; // 保存弹出框出现
        this.selectIsDisabled = true; // 禁用下拉框
        this.$refs["select"].blur();
      } else {
        console.log("数据一样不禁用下拉框还有不弹出保存");
        this.saveDialog = false;
        this.selectIsDisabled = false;
      }
    },
    //设置某一行被选中
    setCurrent(row) {
      this.$refs.editTable.setCurrentRow(row);
    },

    findItemByKey(arr, keyV, kerStr) {
      let temp =
        arr &&
        arr.filter(item => {
          item[kerStr] == keyV;
        });
      if (temp.length > 0) {
        return temp[0];
      }
      return null;
    },
    // 点击某一行选中后操作的状态你
    handleCurrentChange(currentRow) {
      this.oldRow = this.currentRow;
      this.currentRow = currentRow;
      if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        this.saveDialog = true; // 弹出保存的提示框
        return;
      }
      this.editForm = currentRow;
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      getAllList().then(data => {
        if (data.data.code == 200) {
          this.unallocateData = data.data.data;
        } else {
          this.$message.error(data.data.message);
        }
      });
      getUserList().then(data => {
        if (data.data.code == 200) {
          this.unallocateUser = data.data.data;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    //选中某一行
    //返回操作
    goBack() {
      this.$router.push({ path: "/workCenter/workCenter" });
    },
    /**
     *  通过workCenter
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["workCenter"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if (
        this.cloneList.length < this.workCenterEditList.length &&
        this.value != ""
      ) {
        this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
        this.editForm = this.cloneList[0];
        return;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.workCenterEditList)); //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.workCenter;
        let item = this.findItemByKey(this.cloneList, code, "workCenter");
        if (item) {
          this.setCurrent(item);
        }
        this.editForm = item;
      }
    },
    //保存操作
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [];
          this.allocateData.map(item => {
            arr.push(item.workCenterRelation);
          });
          this.editForm.workCenterRelation = arr;
          let params = {
            createList: [],
            deleteList: [],
            updateList: [
              {
                status: this.editForm.status,
                workCenterType: this.editForm.workCenterType,
                workCenterDes: this.editForm.workCenterDes,
                workCenter: this.editForm.workCenter,
                workCenterRelation: this.allocateData.length > 0 && this.allocateData.map(item => (
                  {
                    tenantSiteCode: item.tenantSiteCode,
                    workCenter: item.workCenter,
                    workCenterRelation: [],
                    userList: []
                  }
                )) || [],
                userList: this.allocateUser
              }
            ]
          };

          saveWorkCenter(params).then(data => {
            const res = data.data;
            this.saveDialog = false; // 保存的提示框消失
            this.selectIsDisabled = false;

            // 直接成功
            if (res.code === 200) {
              this.saveDialog = false;
              this.selectIsDisabled = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              // 直接覆盖
              if (this.cloneList.length == this.workCenterEditList.length) {
                //直接覆盖
                //重新更改初始的副本
                //设置左边的选中状态
                this.SETWORKCENTEREDITLIST(
                  JSON.parse(JSON.stringify(this.cloneList))
                );
                this.editForm = this.currentRow;
                this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
              }

              if (this.cloneList.length == 1) {
                let index = this.findIndexByItem(
                  this.workCenterEditList,
                  this.editForm.workCenter
                );
                if (index > -1) {
                  this.workCenterEditList.splice(index, 1, this.editForm); // 替换
                  this.SETWORKCENTEREDITLIST(
                    JSON.parse(JSON.stringify(this.workCenterEditList))
                  );
                  this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
                }
              }
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
              this.saveDialog = false;
              this.setCurrent(this.oldRow);
            }
          });
        }
      });
    },
    check1(val) {
      this.selectedList = val;
    },
    check2(val) {
      this.selectedList2 = val;
    },
    checkUser1(val) {
      this.selectedListUser = val;
    },
    checkUser2(val) {
      this.selectedListUser2 = val;
    },
    right() {
      this.unallocateData = _.concat(this.unallocateData, this.selectedList);
      this.unallocateData = _.uniq(this.unallocateData);
      this.allocateData = _.difference(this.allocateData, this.selectedList);
      console.log(this.unallocateData, "un");
      this.cloneAllocateData = _.cloneDeep(this.allocateData);
    },
    left() {
      this.allocateData = _.concat(this.allocateData, this.selectedList2);
      this.allocateData = _.uniq(this.allocateData);
      this.unallocateData = _.difference(
        this.unallocateData,
        this.selectedList2
      );
      this.cloneAllocateData = _.cloneDeep(this.allocateData);
    },
    rightUser() {
      this.unallocateUser = _.concat(
        this.unallocateUser,
        this.selectedListUser
      );
      this.unallocateUser = _.uniq(this.unallocateUser);
      this.allocateUser = _.difference(
        this.allocateUser,
        this.selectedListUser
      );
      this.cloneAllocateData = _.cloneDeep(this.allocateUser);
    },
    leftUser() {
      this.allocateUser = _.concat(this.allocateUser, this.selectedListUser2);
      this.allocateUser = _.uniq(this.allocateUser);
      this.unallocateUser = _.difference(
        this.unallocateUser,
        this.selectedListUser2
      );
      this.cloneAllocateData = _.cloneDeep(this.allocateUser);
    }
  }
};
</script>

<style scoped lang="scss">
.edit-work-center {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
  }
  .direction {
    color: #409eff;
    font-size: 40px;
    cursor: pointer;
    text-align: center;
  }
  .mt70 {
    margin-top: 70px;
  }
  .editList, .workList {
    background: #fff;
    min-height: 450px;
    padding: 10px;
  }
}

</style>
