<template>
  <div class="add-alarm-group">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="save('addForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="resetForm('addForm')">重置</dsn-button>
    </div>
    <div class="operate" style="padding-bottom: 14px;">
      <el-form
        :inline="true"
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="form-style"
        label-position="right"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件分组名称:" prop="alarmGroup" required>
              <dsn-input v-model="addForm.alarmGroup"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分组描述:" prop="groupDes" required>
              <dsn-input v-model="addForm.groupDes"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operate" style="padding-bottom: 14px"> 
      <el-row>
        <el-col :span="11">
          <dsn-table
            :data="allocateData.filter(data => !alarm1 || data.alarm.toLowerCase().includes(alarm1.toLowerCase()))"
            @select="check1"
            @select-all="check1"
          >
            <el-table-column label="事件编号:">
              <el-table-column type="selection" width="100"></el-table-column>
              <el-table-column prop="alarm" label="事件编号"></el-table-column>
            </el-table-column>
            <el-table-column label>
              <template slot="header">
                <dsn-input v-model="alarm1" placeholder="输入事件编号搜索" />
              </template>
              <el-table-column label="事件等级">
                <template
                  slot-scope="scope"
                >{{ scope.row.alarmLevelFlag == 10 ? '提示' : (scope.row.alarmLevelFlag == 20 ? '警告' : '错误') }}</template>
              </el-table-column>
              <el-table-column prop="theme" label="事件主题"></el-table-column>
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
            :data="unallocateData.filter(data => !alarm2 || data.alarm.toLowerCase().includes(alarm2.toLowerCase()))"
            @select="check2"
            @select-all="check2"
          >
            <el-table-column label="事件编号:">
              <el-table-column type="selection" width="100"></el-table-column>
              <el-table-column prop="alarm" label="事件编号"></el-table-column>
            </el-table-column>
            <el-table-column label>
              <template slot="header">
                <dsn-input v-model="alarm2" placeholder="输入事件编号搜索" />
              </template>
              <el-table-column label="事件等级">
                <template
                  slot-scope="scope"
                >{{ scope.row.alarmLevelFlag == 10 ? '提示' : (scope.row.alarmLevelFlag == 20 ? '警告' : '错误') }}</template>
              </el-table-column>
              <el-table-column prop="theme" label="事件主题"></el-table-column>
            </el-table-column>
          </dsn-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getDataByAlarm,
  checkExists,
  saveData
} from "../../../api/alarm.group.api";
import _ from "lodash";
import { mapMutations } from "vuex";
export default {
  name: "add-alarm-group",

  data() {
    return {
      formLabelWidth: "150px",
      alarm1: "",
      alarm2: "",
      rules: {
        alarmGroup: [
          { required: true, message: "请填写事件分组", trigger: "blur" }
        ],
        groupDes: [
          { required: true, message: "请填写事件分组描述", trigger: "blur" }
        ]
      },
      addForm: {
        alarmGroup: "",
        groupDes: "",
        alarmList: [],
        tenantSiteCode: "test"
      },
      selectedList: [],
      selectedList2: [],
      allocateData: [],
      unallocateData: [],
      alarmLevel: [
        {
          value: 10,
          label: "提示"
        },
        {
          value: 20,
          label: "警告"
        },
        {
          value: 30,
          label: "错误"
        }
      ],
      cloneUnallocateData: [],
      cloneAllocateData: []
    };
  },
  created() {
    let params = "";
    console.log('route', this.$route)
    getDataByAlarm(params).then(data => {
      console.log(data);
      this.unallocateData = data.data.data;
      this.cloneUnallocateData = data.data.data;
    });
  },
  methods: {
    ...mapMutations(["POP"]),
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [];
          this.allocateData.map(item => {
            arr.push(item.alarm);
          });
          this.addForm.alarmList = arr;

          let params = this.addForm;
          checkExists(params).then(data => {
            console.log(data.statusText, "ddaaa");
            if (data.statusText == "OK") {
              saveData(params).then(data => {
                if (data.data.message == "success") {
                  this.$message({
                    type: "success",
                    message: "保存成功!"
                  });
                  setTimeout(() => {
                    const { name, path } = this.$route;
                    const parmas = {
                      deleteItem: {
                        name,
                        current: path
                      },
                      current: {
                        name,
                        current: path
                      }
                    }
                    this.POP(parmas)
                    this.$router.push({ path: "/alarm/alarmGroup" });
                  }, 1000);
                } else {
                  this.$message.error(data.data.message);
                }
              });
            } else {
              this.$message.error("该分组名称已存在");
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
      console.log(this.cloneUnallocateData);
      this.unallocateData = this.cloneUnallocateData;
    },
    goBack() {
      this.$router.push({ path: "/alarm/alarmGroup" });
    },
    check1(val) {
      this.selectedList = val;
    },
    check2(val) {
      this.selectedList2 = val;
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
    getUnallocate() {
      console.log("ss");
      if (this.select2) {
        this.unallocateData = this.cloneUnallocateData;
        this.unallocateData = this.unallocateData.filter(item => {
          if (this.input2) {
            return (
              item.userType == this.select2 &&
              item.informUserId.indexOf(this.input2) > -1
            );
          } else {
            return item.userType == this.select2;
          }
        });
      } else {
        this.unallocateData = this.cloneUnallocateData;
        this.unallocateData = this.unallocateData.filter(item => {
          if (this.input2.length > 0) {
            return item.informUserId.indexOf(this.input2) > -1;
          } else {
            return true;
          }
        });
      }
    },
    getAllocate() {
      console.log("ds");
      if (this.select1) {
        this.allocateData = this.cloneAllocateData;
        this.allocateData = this.allocateData.filter(item => {
          if (this.input1) {
            return (
              item.userType == this.select1 &&
              item.informUserId.indexOf(this.input1) > -1
            );
          } else {
            return item.userType == this.select1;
          }
        });
      } else {
        console.log(this.cloneAllocateData, "d");
        this.allocateData = this.cloneAllocateData;
        this.allocateData = this.allocateData.filter(item => {
          if (this.input1.length > 0) {
            return item.informUserId.indexOf(this.input1) > -1;
          } else {
            return true;
          }
        });
      }
    },
    searchUnallocate(val) {
      console.log(val, this.alarm2, "dd");
    }
  }
};
</script>

<style lang="scss">
.add-alarm-group {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
		border-radius: 4px;
    .el-form-item {
      margin-bottom: 0;
    }
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
}
</style>
