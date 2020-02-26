<template>
  <div class="edit-alarm-maintain">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="handleSave('editForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="handleReset">重置</dsn-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="editList">
          <dsn-select
            v-model="value"
            :clearable="false"
            placeholder="请选择"
            @change="(value) => {handleCurrentChange(value, 'select')}"
            style="margin-bottom: 30px"
            ref="select"
          >
            <el-option
              v-for="item in cloneList"
              :key="item.alarm"
              :label="item.alarm"
              :value="item.alarm"
            ></el-option>
          </dsn-select>
          <dsn-table
            ref="editTable"
            :data="cloneList"
            border
            highlight-current-row
            style="width: 100%"
            @row-click="(row) => {handleCurrentChange(row, 'table')}"
          >
            <el-table-column label="事件编号" prop="alarm"></el-table-column>
          </dsn-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="dataList">
          <el-form
            :inline="true"
            :model="editForm"
            ref="editForm"
            :rules="rules"
            class="form-style"
            label-position="right"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="事件编号:" prop="alarm" required>
                  <dsn-input v-model="editForm.alarm" disabled></dsn-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="事件主题:" prop="theme" required>
                  <dsn-input v-model="editForm.theme"></dsn-input>
                </el-form-item>
              </el-col>
            </el-row>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="预警事件信息维护" name="first">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="预警事件等级:" prop="alarmLevelFlag">
                    <dsn-select v-model="editForm.alarmLevelFlag">
                      <el-option
                        v-for="item in alarmLevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </dsn-select>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="事件通知方式:" prop>
                    <el-checkbox v-model="editForm.actionWeixinFlag">企业微信</el-checkbox>
                    <el-checkbox v-model="editForm.actionMailFlag">邮箱通知</el-checkbox>
                    <el-checkbox v-model="editForm.actionSmsFlag">短信通知</el-checkbox>
                    <el-checkbox v-model="editForm.actionSystemFlag">系统弹窗通知</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="input-form">
                <el-col :span="24">
                  <el-tabs v-model="activeImputName">
                    <el-tab-pane label="企业微信" name="first">
                      <dsn-input
                        type="textarea"
                        v-model="editForm.weixinInformDetails"
                        :autosize="{ minRows: 6, maxRows: 10}"
                        placeholder="请输入事件内容"
                      ></dsn-input>
                    </el-tab-pane>
                    <el-tab-pane label="邮箱" name="second">
                      <dsn-input
                        type="textarea"
                        v-model="editForm.mailInformDetails"
                        :autosize="{ minRows: 6, maxRows: 10}"
                        placeholder="请输入事件内容"
                      ></dsn-input>
                    </el-tab-pane>
                    <el-tab-pane label="短信" name="third">
                      <dsn-input
                        type="textarea"
                        v-model="editForm.smsInformDetails"
                        :autosize="{ minRows: 6, maxRows: 10}"
                        placeholder="请输入事件内容"
                      ></dsn-input>
                    </el-tab-pane>
                    <el-tab-pane label="系统弹窗" name="fourth">
                      <dsn-input
                        type="textarea"
                        v-model="editForm.systemInformDetails"
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
                <el-col :span="11" :offset="13">
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
                <el-col :span="11" :offset="13">
                  <el-form-item label="输入搜索条件:" prop="width">
                    <dsn-select
                      v-model="select2"
                      style="width: 100px"
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
                      :disabled="!select2"
                      style="width: 150px"
                      class="input-with-select"
                      @input="getUnallocate"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  getWorkerInfo,
  updateData,
  getDataByAlarm,
  getUnallocated,
} from "../../../api/alarm.maintain.api";
import _ from "lodash";
export default {
  name: "edit-alarm-maintain",
  computed: {
    ...mapGetters(["alarmMaintainEditList"])
  },
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
      //表单左边宽度
      formLabelWidth: "150px",
      activeName: "first",
      activeImputName: "first",
      cloneModify: {}, //  克隆的表单的一份副本
      alarm: "",
      noticeType: [],
      rules: {
        alarm: [{ required: true, message: "请填写事件编号", trigger: "blur" },{validator: inputRule, trigger: ['blur', 'change']}],
        theme: [{ required: true, message: "请填写事件主题", trigger: "blur" }]
      },
      editForm: {
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
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
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
    this.$nextTick(() => {
      this.init();
    });
    this.alarm = this.alarmMaintainEditList[0].alarm;
    let params = this.alarm;
    getDataByAlarm(params).then(data => {
      this.workers = data.data.data;
    });
    let p = {
      alarm: this.alarm
    };
    getWorkerInfo(p).then(data => {
      this.unallocateData = [];
      this.cloneUnallocateData = _.cloneDeep(data.data.data);
      this.allocateData = data.data.data;
      this.cloneAllocateData = _.cloneDeep(data.data.data);
    });
  },
  methods: {
    ...mapMutations(["SETALARMMAINTAINEDITLIST"]),
    //初始化的操作
    init() {
      if (this.alarmMaintainEditList.length > 0) {
        this.cloneList = _.cloneDeep(this.alarmMaintainEditList); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.value = this.editForm.alarm;
        this.cloneModify = _.cloneDeep(this.editForm); // modify 的副本
        this.setCurrent(this.editForm); // 设置选中第一行
        this.currentRow = _.cloneDeep(this.editForm); // 设置初始currentRow 为第一行
        this.oldRow = _.cloneDeep(this.editForm)
      }
    },
    //清除下拉列表时触发
    handleClearSelect() {
      this.init();
    },
    //选中下拉列表时触发
    handleChangeOption(value) {
      console.log('row', value, this.currentRow.alarm);
      if (value == "") {
        return;
      }
      //过滤数组
      const tempList = this.cloneList.filter(item => item["alarm"] == value);
      // this.cloneList = tempList;
      this.editForm = tempList[0];
      console.log('changoption', this.editForm)
      this.cloneModify = _.cloneDeep(this.editForm);
      this.setCurrent(tempList[0]);
      let params = this.editForm.alarm;
      getDataByAlarm(params).then(data => {
        this.workers = data.data.data;
      });
    },

    //设置某一行被选中
    setCurrent(row) {
      console.log('row', row);
      this.$refs.editTable.setCurrentRow(row);
    },

    findItemByKey(arr, keyV, kerStr) {
      let temp = arr.filter(item => item[kerStr] == keyV);
      if (temp.length > 0) {
        return temp[0];
      }
      return null;
    },
    // 点击某一行选中后操作的状态你
    handleCurrentChange(currentRow, type) {
      const { cloneAllocateData, allocateData, alarmMaintainEditList, editForm } = this;
      const defaultForm = alarmMaintainEditList.find(item => item.alarm === this.currentRow.alarm);
      if (allocateData.length !== cloneAllocateData.length
        || _.differenceBy(allocateData, cloneAllocateData,  'informUserId').length > 0
        || JSON.stringify(editForm) !== JSON.stringify(defaultForm)) {
        this.$confirm('所选数据还未保存，是否保存?', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleSave('editForm', () => {
            this.changeCallBack(currentRow, type);
          });
        }).catch(() => {
          this.changeCallBack(currentRow, type);
        })
      } else {
        this.changeCallBack(currentRow, type);
      }
      
    },

    changeCallBack(currentRow, type) {
      const { alarmMaintainEditList } = this;
      this.editForm = type === 'table' ? _.cloneDeep(alarmMaintainEditList.find(item => item.alarm === currentRow.alarm)) : _.cloneDeep(alarmMaintainEditList.find(item => item.alarm === currentRow));
      const { alarm } = this.editForm;
      this.currentRow = type === 'table' ? _.cloneDeep(currentRow) : _.cloneDeep(alarmMaintainEditList.find(item => item.alarm === currentRow));
      this.alarm = alarm;
      this.input2 = '';
      this.select2 = '';
      this.value = alarm;
      console.log('this.', this.editForm)
      if (type === 'select') {
        const tempList = this.cloneList.filter(item => item["alarm"] == currentRow);
        this.setCurrent(tempList[0]);
      }
      getWorkerInfo({alarm}).then(data => {
        this.unallocateData = [];
        this.cloneUnallocateData = _.cloneDeep(data.data.data);
        this.allocateData = data.data.data;
        this.cloneAllocateData = _.cloneDeep(data.data.data);
      });
    },

    //选中某一行
    //返回操作
    goBack() {
      this.$router.push({ path: "/alarm/alarmMaintain" });
    },
    /**
     *  通过mat
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["alarm"] == v);
    },
    
    //保存操作
    handleSave(formName, callback) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.allocateData = this.allocateData.map(item => ({
            ...item,
            alarm: this.editForm.alarm
          }));
          this.editForm.alarmDefInformList = this.allocateData;
          let params = this.editForm;
          updateData(params).then(data => {
            const res = data.data;

            // 直接成功
            if (res.code === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              const { editForm, alarmMaintainEditList } = this;
              const savedIndex = alarmMaintainEditList.findIndex(item => item.alarmGroup === editForm.alarmGroup);
              this.SETALARMMAINTAINEDITLIST(_.fill(alarmMaintainEditList, editForm, savedIndex, savedIndex + 1));
              callback && callback();
            } else {
              this.$message({
                message: res.data,
                type: "error"
              });
              this.setCurrent(this.oldRow);
            }
          });
        }
      });
    },

    handleReset() {
      const { editForm, alarmMaintainEditList } = this;
      this.editForm = _.cloneDeep(alarmMaintainEditList.find(item => item.alarm === editForm.alarm));
      const { alarm } = this.editForm;
      this.select2 = '';
      this.input2 = '';
      this.alarm = alarm;
      getWorkerInfo({alarm}).then(data => {
        this.unallocateData = [];
        this.cloneUnallocateData = _.cloneDeep(data.data.data);
        this.allocateData = data.data.data;
        this.cloneAllocateData = _.cloneDeep(data.data.data);
      });
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
      // this.cloneAllocateData = _.cloneDeep(this.allocateData);
    },
    left() {
      this.allocateData = _.concat(this.allocateData, this.selectedList2);
      this.allocateData = _.uniq(this.allocateData);
      this.unallocateData = _.difference(
        this.unallocateData,
        this.selectedList2
      );
      // this.cloneAllocateData = _.cloneDeep(this.allocateData);
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
    },
    getAllocate() {
      if (this.select1) {
        this.allocateData = _.cloneDeep(this.cloneAllocateData);
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
        this.allocateData = _.cloneDeep(this.cloneAllocateData);
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
.edit-alarm-maintain {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
		border-radius: 4px;
  }
  .editList, .dataList {
    padding: 14px;
    background: #fff;
		border-radius: 4px;

    .mt70 {
      margin-top: 70px;
    }
  }
  .direction {
    color: #409eff;
    font-size: 40px;
    cursor: pointer;
    text-align: center;
  }
}
</style>