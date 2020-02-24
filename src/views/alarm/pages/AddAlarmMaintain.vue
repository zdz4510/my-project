<template>
  <div class="add-alarm-maintain">
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
        <el-form-item label="事件编号:" prop="alarm" required>
          <dsn-input v-model="addForm.alarm"></dsn-input>
        </el-form-item>
        <el-form-item label="事件主题:" prop="theme" required>
          <dsn-input v-model="addForm.theme"></dsn-input>
        </el-form-item>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="预警事件信息维护" name="first">
            <el-row>
              <el-col :span="8">
                <el-form-item label="预警事件等级:" prop="alarmLevelFlag" required>
                  <dsn-select v-model="addForm.alarmLevelFlag">
                    <el-option
                      v-for="item in alarmLevel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </dsn-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="事件通知方式:" prop>
                  <el-checkbox v-model="addForm.actionWeixinFlag">企业微信</el-checkbox>
                  <el-checkbox v-model="addForm.actionMailFlag">邮箱通知</el-checkbox>
                  <el-checkbox v-model="addForm.actionSmsFlag">短信通知</el-checkbox>
                  <el-checkbox v-model="addForm.actionSystemFlag">系统弹窗通知</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="input-form">
              <el-col :span="15">
                <el-tabs v-model="activeImputName">
                  <el-tab-pane label="企业微信" name="first">
                    <dsn-input
                      type="textarea"
                      v-model="addForm.weixinInformDetails"
                      :autosize="{ minRows: 6, maxRows: 10}"
                      placeholder="请输入事件内容"
                    ></dsn-input>
                  </el-tab-pane>
                  <el-tab-pane label="邮箱" name="second">
                    <dsn-input
                      type="textarea"
                      v-model="addForm.mailInformDetails"
                      :autosize="{ minRows: 6, maxRows: 10}"
                      placeholder="请输入事件内容"
                    ></dsn-input>
                  </el-tab-pane>
                  <el-tab-pane label="短信" name="third">
                    <dsn-input
                      type="textarea"
                      v-model="addForm.smsInformDetails"
                      :autosize="{ minRows: 6, maxRows: 10}"
                      placeholder="请输入事件内容"
                    ></dsn-input>
                  </el-tab-pane>
                  <el-tab-pane label="系统弹窗" name="fourth">
                    <dsn-input
                      type="textarea"
                      v-model="addForm.systemInformDetails"
                      :autosize="{ minRows: 6, maxRows: 10}"
                      placeholder="请输入事件内容"
                    ></dsn-input>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="预警事件通知维护" name="second">
            <el-row>
              <el-col :span="10" :offset="13">
                <el-form-item label="复制事件通知人员:">
                  <dsn-select v-model="alarm" clearable filterable @change="onChange">
                    <el-option
                      v-for="item in workers"
                      :key="item.alarm"
                      :label="item.alarm"
                      :value="item.alarm"
                    ></el-option>
                  </dsn-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="11">
                <el-form-item label="输入搜索条件:" prop="width">
                  <dsn-input
                    placeholder="请输入内容"
                    v-model="input1"
                    class="input-with-select"
                    @input="getAllocate"
                  >
                    <dsn-select
                      style="width: 120px"
                      v-model="select1"
                      slot="prepend"
                      placeholder="请选择"
                      clearable
                      @change="getAllocate"
                    >
                      <el-option label="个人" value="10"></el-option>
                      <el-option label="工作中心" value="20"></el-option>
                    </dsn-select>
                  </dsn-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="11" :offset="13">
                <el-form-item label="输入搜索条件:" prop="inputAlarm">
                  <dsn-select
                    style="width: 100px"
                    v-model="select2"
                    placeholder="请选择"
                    :clearable="false"
                    @change="getUnallocate"
                  >
                    <el-option label="个人" value="10"></el-option>
                    <el-option label="工作中心" value="20"></el-option>
                  </dsn-select>
                  <dsn-input
                    placeholder="请输入内容"
                    v-model="input2"
                    class="input-with-select"
                    @input="getUnallocate"
                    :disabled="!select2"
                    style="width: 150px"
                  >
                  </dsn-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <dsn-table :data="allocateData.filter(data => !alarm1 || data.informUserId.toLowerCase().includes(alarm1.toLowerCase()))" @select="check1" @select-all="check1">
                  <el-table-column label="接收信息用户">
                    <el-table-column type="selection" width="100"></el-table-column>
                    <el-table-column prop="informUserId" label="名称"></el-table-column>
                  </el-table-column>
                  <el-table-column>
                    <template slot="header">
                      <dsn-input v-model="alarm1" placeholder="输入搜索条件" />
                    </template>
                     <el-table-column label="类型">
                      <template
                        slot-scope="scope"
                      >{{ scope.row.userType == 10 ? '个人' : (scope.row.userType == 20 ? '工作中心' : '--') }}</template>
                    </el-table-column>
                    <el-table-column prop label="描述"></el-table-column>
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
                <dsn-table :data="unallocateData.filter(data => !alarm2 || data.informUserId.toLowerCase().includes(alarm2.toLowerCase()))" @select="check2" @select-all="check2">
                  <el-table-column label="待收信息用户">
                    <el-table-column type="selection" width="100"></el-table-column>
                    <el-table-column prop="informUserId" label="名称"></el-table-column>
                  </el-table-column>
                  <el-table-column label>
                    <template slot="header">
                      <dsn-input v-model="alarm2" placeholder="输入搜索条件" />
                    </template>
                     <el-table-column label="类型">
                      <template
                        slot-scope="scope"
                      >{{ scope.row.userType == 10 ? '个人' : (scope.row.userType == 20 ? '工作中心' : '--') }}</template>
                    </el-table-column>
                    <el-table-column prop label="描述"></el-table-column>
                  </el-table-column>
                </dsn-table>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getDataByAlarm,
  getWorkerInfo,
  getUnallocated,
  saveData
} from "../../../api/alarm.maintain.api";
import _ from "lodash";
export default {
  name: "add-alarm-maintain",
  data() {
    const inputRule = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z_/-]{1,}$/;
      if (value.length > 30) {
        return callback(new Error("只能填写数字，字母，-，_,/;30个字符以内"));
      }
      if (!reg.test(value)) {
        return callback(new Error("只能填写数字，字母，-，_,/;30个字符以内"));
      }
      callback();
    };
    return {
      activeName: "first",
      activeImputName: "first",
      alarm: "",
      noticeType: [],
      rules: {
        alarm: [{ required: true, message: "请填写事件编号", trigger: "blur" },{validator: inputRule, trigger: ['blur', 'change']}],
        theme: [{ required: true, message: "请填写事件主题", trigger: "blur" }],
        alarmLevelFlag: [{ required: true, message: "请选择事件等级", trigger: 'change'}],
      },
      addForm: {
        alarm: "",
        theme: "",
        alarmLevelFlag: "",
        actionWeixinFlag: false,
        actionMailFlag: false,
        actionSmsFlag: false,
        actionSystemFlag: false,
        weixinInformDetails: "",
        mailInformDetails: "",
        smsInformDetails: "",
        systemInformDetails: "",
        alarmDefInformList: []
      },
      alarm1: '',
      alarm2: '',
      select1: "",
      input1: "",
      select2: "",
      input2: "",
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
      workers: [],
      cloneUnallocateData: [],
      cloneAllocateData: []
    };
  },
  created() {
    let params = "";
    getDataByAlarm(params).then(data => {
      console.log(data);
      this.workers = data.data.data;
    });
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.allocateData = this.allocateData.map(item => ({
            ...item,
            alarm: this.addForm.alarm
          }));
          this.addForm.alarmDefInformList = this.allocateData;
          let params = this.addForm;
          saveData(params).then(data => {
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              setTimeout(() => {
                this.$router.push({ path: "/alarm/alarmMaintain" });
              }, 1000);
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
      this.addForm.actionWeixinFlag = false;
      this.addForm.actionMailFlag = false;
      this.addForm.actionSmsFlag = false;
      this.addForm.actionSystemFlag = false;
      this.addForm.weixinInformDetails = "";
      this.addForm.mailInformDetails = "";
      this.addForm.smsInformDetails = "";
      this.addForm.systemInformDetails = "";
      this.alarm = "";
      this.allocateData = [];
      this.unallocateData = [];
    },
    goBack() {
      this.$router.push({ path: "/alarm/alarmMaintain" });
    },
    onChange(val) {
      this.select2 ='';
      let params = {
        alarm: val
      };
      getWorkerInfo(params).then(res => {
        const { data: {
          data,
          code,
          message
        }} = res;
        if (code === 200) {
          if (this.allocateData.length) {
            // this.unallocateData = data;
           this.unallocateData = _.differenceBy(data, this.allocateData, 'informUserId');
          } else {
            this.unallocateData = data;
          }
        } else {
          this.$message.error(message);
        }
      });
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
      this.alarm = '';
      const params = {
        userType: this.select2,
        informUserId: this.input2
      }
      getUnallocated(params).then(res => {
        const {
          data: {
            data,
            message,
            code
          }
        } = res;
        if (code === 200) {
          if (this.allocateData.length) {
           this.unallocateData = _.differenceBy(data, this.allocateData, 'informUserId');
            // this.unallocateData = data;
          } else {
            this.unallocateData = data;
          }
        } else {
          this.$message.error(message);
        }
      })
      /* if (this.select2) {
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
      } */
    },
    getAllocate() {
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
        this.allocateData = this.cloneAllocateData;
        this.allocateData = this.allocateData.filter(item => {
          if (this.input1.length > 0) {
            return item.informUserId.indexOf(this.input1) > -1;
          } else {
            return true;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.add-alarm-maintain {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
		border-radius: 4px;
  }
  .addForm {
    padding: 14px 14px 0;
    background: #fff;
		border-radius: 4px;
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
