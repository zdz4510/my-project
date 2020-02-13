<template>
  <div class="add-work-center">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="save('addForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="resetForm('addForm')">重置</dsn-button>
    </div>
    <div class="addForm">
      <el-form
        :inline="true"
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="form-style"
        label-position="right"
      >
        <el-form-item label="工作中心:" prop="workCenter" required>
          <dsn-input v-model="addForm.workCenter"></dsn-input>
        </el-form-item>
        <el-form-item label="描述:" prop="workCenterDes">
          <dsn-input v-model="addForm.workCenterDes"></dsn-input>
        </el-form-item>
        <dsn-tabs style="padding: 0" v-model="activeName" type="border-card">
          <el-tab-pane label="基础信息" name="first">
            <el-row>
              <el-col :span="24">
                <el-form-item label="状态:" prop="status" required>
                  <dsn-select v-model="addForm.status">
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
                <el-form-item label="类别:" prop="workCenterType" required>
                  <dsn-select v-model="addForm.workCenterType">
                    <el-option
                      v-for="item in workCenterType"
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
        </dsn-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getAllList,
  saveWorkCenter,
  getUserList
} from "../../../api/work.center.api";
import _ from "lodash";
export default {
  name: "add-work-center",
  data() {
    return {
      activeName: "first",
      formLabelWidth: "150px",
      workCenter1: "",
      workCenter2: "",
      name1: "",
      name2: "",
      rules: {
        workCenter: [
          { required: true, message: "请填写工作中心名称", trigger: "blur" }
        ],
        workCenterDes: [
          { required: true, message: "请填写工作中心描述", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        workCenterType: [
          { required: true, message: "请选择类别", trigger: "change" }
        ]
      },
      addForm: {
        workCenter: "",
        workCenterDes: "",
        workCenterRelation: [],
        tenantSiteCode: "test",
        workCenterType: "",
        status: ""
      },
      selectedList: [],
      selectedList2: [],
      selectedListUser: [],
      selectedListUser2: [],
      allocateData: [],
      unallocateData: [],
      allocateUser: [],
      unallocateUser: [],
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
      cloneUnallocateData: [],
      cloneAllocateData: [],
      cloneUnallocateUser: [],
      cloneAllocateUser: []
    };
  },
  created() {
    getAllList({ workCenter: "" }).then(data => {
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
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [];
          this.allocateData.map(item => {
            arr.push(item.workCenter);
          });
          this.addForm.workCenterRelation = arr;
          let params = {
            createList: [
              {
                status: this.addForm.status,
                workCenterType: this.addForm.workCenterType,
                workCenterDes: this.addForm.workCenterDes,
                workCenter: this.addForm.workCenter,
                workCenterRelation: arr,
                userList: this.allocateUser
              }
            ]
          };
          console.log(params, "ppp");
          saveWorkCenter(params).then(data => {
            if (data.data.code == 200) {
              this.$message.success("保存成功");
              this.$router.push({ path: "/workCenter/workCenter" });
            } else {
              this.$message.error(data.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.allocateData = [];
      this.allocateUser = [];
    },
    goBack() {
      this.$router.push({ path: "/workCenter/workCenter" });
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
      console.log(this.unallocateData, "all");
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
      console.log(this.unallocateUser, "unuser");
      this.cloneAllocateData = _.cloneDeep(this.allocateUser);
    },
    leftUser() {
      this.allocateUser = _.concat(this.allocateUser, this.selectedListUser2);
      this.allocateUser = _.uniq(this.allocateUser);
      this.unallocateUser = _.difference(
        this.unallocateUser,
        this.selectedListUser2
      );
      console.log(this.unallocateUser, "allUser");
      this.cloneAllocateData = _.cloneDeep(this.allocateUser);
    }
  }
};
</script>

<style scoped lang="scss">
.add-work-center {
  .operate {
    background: #ffffff;
    padding: 14px 14px 0;
    margin-bottom: 14px;
  }
  .addForm {
    background: #ffffff;
    padding: 10px;
    .direction {
      color: #409eff;
      font-size: 40px;
      cursor: pointer;
      text-align: center;
    }
    .mt70 {
      margin-top: 70px;
    }
  }
}
</style>
