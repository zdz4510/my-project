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
            clearable
            placeholder="请选择"
            :disabled="selectIsDisabled"
            @clear="handleClearSelect"
            @change="handleChangeOption"
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
            height="513"
            @row-click="handleCurrentChange"
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
                  <dsn-table :data="allocateData" @select="check1" @select-all="check1">
                    <el-table-column label="接收信息用户">
                      <el-table-column type="selection" width="55"></el-table-column>
                      <el-table-column prop="informUserId" label="名称"></el-table-column>
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
                  <dsn-table :data="unallocateData" @select="check2" @select-all="check2">
                    <el-table-column label="未接收信息用户">
                      <el-table-column type="selection" width="55"></el-table-column>
                      <el-table-column prop="informUserId" label="名称"></el-table-column>
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
          <!-- 确认模态框 -->
          <el-dialog title="保存" :visible.sync="saveDialog" width="30%">
            <span>是否保存数据？</span>
            <span slot="footer" class="dialog-footer">
              <dsn-button @click.native="handleCancle">取 消</dsn-button>
              <dsn-button type="primary" @click.native="handleSave('editForm')">确 定</dsn-button>
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
    return {
      //表单左边宽度
      formLabelWidth: "150px",
      activeName: "first",
      activeImputName: "first",
      cloneModify: {}, //  克隆的表单的一份副本
      alarm: "",
      noticeType: [],
      rules: {
        alarm: [{ required: true, message: "请填写事件编号", trigger: "blur" }],
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
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      selectIsDisabled: false,
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
      this.cloneUnallocateData = data.data.data;
      this.allocateData = data.data.data;
      this.cloneAllocateData = data.data.data;
    });
  },
  methods: {
    ...mapMutations(["SETALARMMAINTAINEDITLIST"]),
    //初始化的操作
    init() {
      if (this.alarmMaintainEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.alarmMaintainEditList)); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = JSON.parse(JSON.stringify(this.editForm)); // modify 的副本
        this.setCurrent(this.editForm); // 设置选中第一行
        this.currentRow = this.editForm; // 设置初始currentRow 为第一行
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
      const tempList = this.cloneList.filter(item => item["alarm"] == row);
      this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      this.setCurrent(tempList[0]);
      let params = this.editForm.alarm;
      getDataByAlarm(params).then(data => {
        this.workers = data.data.data;
      });
    },

    //设置某一行被选中
    setCurrent(row) {
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
    handleCurrentChange(currentRow) {
      const { alarmMaintainEditList } = this;
      this.editForm = _.cloneDeep(alarmMaintainEditList.find(item => item.alarm === currentRow.alarm));
      const { alarm } = this.editForm;
      this.alarm = alarm;
      this.input2 = '';
      this.select2 = '';
      getWorkerInfo({alarm}).then(data => {
        this.unallocateData = [];
        this.cloneUnallocateData = data.data.data;
        this.allocateData = data.data.data;
        this.cloneAllocateData = data.data.data;
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
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if (
        this.cloneList.length < this.alarmMaintainEditList.length &&
        this.value != ""
      ) {
        this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
        this.editForm = this.cloneList[0];
        return;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.alarmMaintainEditList)); //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.alarm;
        let item = this.findItemByKey(this.cloneList, code, "alarm");
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
          this.allocateData = this.allocateData.map(item => ({
            ...item,
            alarm: this.editForm.alarm
          }));
          this.editForm.alarmDefInformList = this.allocateData;
          let params = this.editForm;
          updateData(params).then(data => {
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
              if (this.cloneList.length == this.alarmMaintainEditList.length) {
                //直接覆盖
                //重新更改初始的副本
                //设置左边的选中状态
                this.SETALARMMAINTAINEDITLIST(
                  JSON.parse(JSON.stringify(this.cloneList))
                );
                this.editForm = this.currentRow;
                this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
              }

              if (this.cloneList.length == 1) {
                let index = this.findIndexByItem(
                  this.alarmMaintainEditList,
                  this.editForm.alarm
                );
                if (index > -1) {
                  this.alarmMaintainEditList.splice(index, 1, this.editForm); // 替换
                  this.SETALARMMAINTAINEDITLIST(
                    JSON.parse(JSON.stringify(this.alarmMaintainEditList))
                  );
                  this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
                }
              }
            } else {
              this.$message({
                message: res.data,
                type: "error"
              });
              this.saveDialog = false;
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
        this.cloneUnallocateData = data.data.data;
        this.allocateData = data.data.data;
        this.cloneAllocateData = data.data.data;
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