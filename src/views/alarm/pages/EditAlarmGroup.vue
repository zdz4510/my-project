<template>
  <div class="edit-alarm-group">
    <div class="operate">
      <dsn-button size="small" type="primary" @click="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click="handleSave('editForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click="handleReset">重置</dsn-button>
    </div>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="editList">
          <dsn-select
            style="margin-bottom: 30px"
            v-model="value"
            clearable
            placeholder="请选择"
            @change="(value) => {handleCurrentChange(value, 'select')}"
            ref="select"
          >
            <el-option
              v-for="item in cloneList"
              :key="item.alarmGroup"
              :label="item.alarmGroup"
              :value="item.alarmGroup"
            ></el-option>
          </dsn-select>
          <dsn-table
            ref="editTable"
            :data="cloneList"
            border
            highlight-current-row
            style="width: 100%"
            @row-click="(value) => {handleCurrentChange(value, 'table')}"
          >
            <el-table-column label="事件分组名称" prop="alarmGroup"></el-table-column>
          </dsn-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="workList">
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
                <el-form-item label="事件分组名称:" prop="alarmGroup" required>
                  <dsn-input v-model="editForm.alarmGroup" disabled></dsn-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分组描述:" prop="groupDes" required>
                  <dsn-input v-model="editForm.groupDes"></dsn-input>
                </el-form-item>
              </el-col>
            </el-row>
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
  getDataByAlarm
} from "../../../api/alarm.group.api";
import _ from "lodash";
export default {
  name: "edit-alarm-group",
  computed: {
    ...mapGetters(["alarmGroupEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth: "150px",
      alarm1: "",
      alarm2: "",
      cloneModify: {}, //  克隆的表单的一份副本
      rules: {
        groupDes: [
          { required: true, message: "请填写事件分组描述", trigger: "blur" }
        ]
      },
      editForm: {
        alarmGroup: "",
        groupDes: "",
        alarmList: [],
        tenantSiteCode: "test"
      },
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      selectIsDisabled: false,
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
    this.$nextTick(() => {
      this.init();
    });

    const { alarmGroup } = this.alarmGroupEditList[0]
    const params = "";
    this.value = alarmGroup;
    Promise.all([
      getWorkerInfo({alarmGroup}).then(data => {
        this.allocateData = data.data.data.data;
        this.cloneAllocateData = _.cloneDeep(data.data.data.data);
      }),
      getDataByAlarm(params).then(data => {
        // this.unallocateData = _.differenceBy(data.data.data, this.allocateData, 'alarm');
        this.unallocateData = data.data.data;
      })]).then(()=>{
      this.unallocateData = _.differenceBy(this.unallocateData, this.allocateData, 'alarm');
    })
    
  },
  methods: {
    ...mapMutations(["SETALARMGROUPEDITLIST"]),
    //初始化的操作
    init() {
      if (this.alarmGroupEditList.length > 0) {
        this.cloneList = _.cloneDeep(this.alarmGroupEditList); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = _.cloneDeep(this.editForm); // modify 的副本
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
      const tempList = this.cloneList.filter(item => item["alarmGroup"] == row);
      // this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = _.cloneDeep(this.editForm);
      this.setCurrent(tempList[0]);
      const { alarmGroup } = this.editForm;
      Promise.all([
        getWorkerInfo({alarmGroup}).then(data => {
          this.allocateData = data.data.data.data;
          this.cloneAllocateData = _.cloneDeep(data.data.data.data);
        }),
        getDataByAlarm("").then(data => {
          this.unallocateData = data.data.data;
        })
      ]).then(()=>{
        this.unallocateData = _.differenceBy(this.unallocateData, this.allocateData, 'alarm');
      });
    },
    //下拉列表获取到焦点时触发
    handleSelectFocus() {
      // this.oldRow = oldRow;
      //  当前编辑的和之前的数据不一样就显示弹窗
    /*   if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        this.saveDialog = true; // 保存弹出框出现
        this.selectIsDisabled = true; // 禁用下拉框
        this.$refs["select"].blur();
      } else {
        this.saveDialog = false;

        this.selectIsDisabled = false;
      } */
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
    handleCurrentChange(currentRow, type) {
      const { cloneAllocateData, allocateData, alarmGroupEditList, editForm } = this;
      const defaultForm = alarmGroupEditList.find(item => item.alarmGroup === this.currentRow.alarmGroup);
      console.log('difference',allocateData, cloneAllocateData, _.differenceBy(allocateData, cloneAllocateData, 'alarm'))
      if (allocateData.length !== cloneAllocateData.length
        || _.differenceBy(allocateData, cloneAllocateData, 'alarm').length > 0
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
      const { alarmGroupEditList } = this;
      this.editForm = type === 'table' ? _.cloneDeep(alarmGroupEditList.find(item => item.alarmGroup === currentRow.alarmGroup)) : _.cloneDeep(alarmGroupEditList.find(item => item.alarmGroup === currentRow));
      const { alarmGroup } = this.editForm;
      this.currentRow = type === 'table' ? _.cloneDeep(currentRow) : _.cloneDeep(alarmGroupEditList.find(item => item.alarmGroup === currentRow));
      this.alarm = alarmGroup;
      this.input2 = '';
      this.select2 = '';
      this.value = alarmGroup;
      if (type === 'select') {
        const tempList = this.cloneList.filter(item => item["alarmGroup"] == currentRow);
        this.setCurrent(tempList[0]);
      }
      Promise.all([
        getWorkerInfo({alarmGroup}).then(data => {
          this.allocateData = data.data.data.data;
          this.cloneAllocateData = _.cloneDeep(data.data.data.data);
        }),
        getDataByAlarm("").then(data => {
          // this.unallocateData = _.differenceBy(data.data.data, this.allocateData, 'alarm');
          this.unallocateData = data.data.data;
        })]).then(()=>{
        this.unallocateData = _.differenceBy(this.unallocateData, this.allocateData, 'alarm');
      })
    },


    //选中某一行
    //返回操作
    goBack() {
      this.$router.push({ path: "/alarm/alarmGroup" });
    },
    /**
     *  通过mat
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["alarmGroup"] == v);
    },

    //保存操作
    handleSave(formName, callback) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editForm.alarmList = this.allocateData.map(item => item.alarm);
          let params = this.editForm;
          updateData(params).then(data => {
            const res = data.data;

            // 直接成功
            if (res.code === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              const { editForm, alarmGroupEditList } = this;
              const savedIndex = alarmGroupEditList.findIndex(item => item.alarmGroup === editForm.alarmGroup);
              console.log('save', editForm, savedIndex);
              this.SETALARMGROUPEDITLIST(_.fill(alarmGroupEditList, editForm, savedIndex, savedIndex + 1));
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
      const { editForm, alarmGroupEditList } = this;
      this.editForm = _.cloneDeep(alarmGroupEditList.find(item => item.alarmGroup === editForm.alarmGroup));
      const { alarmGroup } = this.editForm;
      Promise.all([
        getWorkerInfo({alarmGroup}).then(data => {
          this.allocateData = data.data.data.data;
          this.cloneAllocateData = _.cloneDeep(data.data.data.data);
        }),
        getDataByAlarm("").then(data => {
          this.unallocateData = data.data.data;
        })
      ]).then(()=>{
        this.unallocateData = _.differenceBy(this.unallocateData, this.allocateData, 'alarm');
      });
    },
    check1(val) {
      this.selectedList = val;
    },
    check2(val) {
      this.selectedList2 = val;
    },
    right() {
      this.unallocateData = _.uniq(_.concat(this.unallocateData, this.selectedList));
      this.allocateData = _.difference(this.allocateData, this.selectedList);
    },
    left() {
      this.allocateData = _.uniq(_.concat(this.allocateData, this.selectedList2));
      this.unallocateData = _.difference(
        this.unallocateData,
        this.selectedList2
      );
    }
  }
};
</script>

<style scoped lang="scss">
.edit-alarm-group {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
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
  .editList, .workList {
    background: #fff;
    min-height: 450px;
    padding: 10px;
    border-radius: 4px;
  }
}
</style>
