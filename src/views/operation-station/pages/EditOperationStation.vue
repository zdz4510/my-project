<template>
  <div class="edit-operation-station">
    <div class="operate">
      <el-button size="small" type="primary" @click="goBack">返回</el-button>
      <el-button size="small" type="primary" @click="handleSave('editForm')">保存</el-button>
    </div>
    <el-row :gutter="20" class="bgw">
      <el-col :span="6">
        <div>
          <el-select
            v-model="value"
            clearable
            placeholder="请选择"
            :disabled="selectIsDisabled"
            @clear="handleClearSelect"
            @change="handleChangeOption"
            @focus="handleSelectFocus"
            ref="select"
          >
            <el-option
              v-for="item in cloneList"
              :key="item.operation+item.workCenterRelation+item.station"
              :label="item.operation"
              :value="item.operation+'&'+item.workCenterRelation+'&'+item.station"
            >
              <span style="float: left">{{ item.operation }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.station }}</span>
              <span
                style="float: right; color: #8492a6; font-size: 13px; margin-right:16px"
              >{{ item.workCenterRelation }}</span>
            </el-option>
          </el-select>
          <el-table
            ref="editTable"
            :data="cloneList"
            border
            highlight-current-row
            style="width: 100%"
            @row-click="handleCurrentChange"
          >
            <el-table-column label="工序" prop="operation"></el-table-column>
            <el-table-column label="产线" prop="workCenterRelation"></el-table-column>
            <el-table-column label="站位" prop="station"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div>
          <el-form
            :inline="true"
            :model="editForm"
            ref="editForm"
            :rules="rules"
            class="form-style"
            :label-width="formLabelWidth"
          >
            <el-form-item label="工序:" prop="operation">
              <el-select v-model="editForm.operation" disabled>
                <el-option
                  v-for="item in operation"
                  :key="item.operation"
                  :label="item.operation"
                  :value="item.operation"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述:" prop="operationDes">
              <el-input v-model="editForm.operationDes"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="10">
                    <el-table
                      :data="allocateData.filter(data => (!workCenterRelation1 || data.workCenterRelation.toLowerCase().includes(workCenterRelation1.toLowerCase())) &&
											(!station1 || data.station.toLowerCase().includes(station1.toLowerCase())) &&
											(!stationDes1 || data.stationDes.toLowerCase().includes(stationDes1.toLowerCase())) )"
                      @select="check1"
                      @select-all="check1"
                    >
                      <el-table-column label="已分配站位">
                        <el-table-column label="选择">
                          <el-table-column type="selection" width="55"></el-table-column>
                        </el-table-column>
                        <el-table-column label>
                          <template slot="header">
                            <el-input v-model="workCenterRelation1" placeholder="输入产线搜索" />
                          </template>
                          <el-table-column prop="workCenterRelation" label="产线"></el-table-column>
                        </el-table-column>
                        <el-table-column label>
                          <template slot="header">
                            <el-input v-model="station1" placeholder="输入站位搜索" />
                          </template>
                          <el-table-column prop="station" label="站位"></el-table-column>
                        </el-table-column>
                        <el-table-column label>
                          <template slot="header">
                            <el-input v-model="stationDes1" placeholder="输入站位描述搜索" />
                          </template>
                          <el-table-column prop="stationDes" label="站位描述"></el-table-column>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-col>
                  <el-col :span="2">
                    <div class="direction mt70">
                      <i class="el-icon-caret-right" @click="right"></i>
                    </div>
                    <div class="direction">
                      <i class="el-icon-caret-left" @click="left"></i>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <el-table
                      :data="unallocateData.filter(data => (!workCenterRelation2 || data.workCenterRelation.toLowerCase().includes(workCenterRelation2.toLowerCase())) &&
											(!station2 || data.station.toLowerCase().includes(station2.toLowerCase())) &&
											(!stationDes2 || data.stationDes.toLowerCase().includes(stationDes2.toLowerCase())) )"
                      @select="check2"
                      @select-all="check2"
                    >
                      <el-table-column label="未分配站位">
                        <el-table-column label="选择">
                          <el-table-column type="selection" width="55"></el-table-column>
                        </el-table-column>
                        <el-table-column label>
                          <template slot="header">
                            <el-input v-model="workCenterRelation2" placeholder="输入产线搜索" />
                          </template>
                          <el-table-column prop="workCenterRelation" label="产线"></el-table-column>
                        </el-table-column>
                        <el-table-column label>
                          <template slot="header">
                            <el-input v-model="station2" placeholder="输入站位搜索" />
                          </template>
                          <el-table-column prop="station" label="站位"></el-table-column>
                        </el-table-column>
                        <el-table-column label>
                          <template slot="header">
                            <el-input v-model="stationDes2" placeholder="输入站位描述搜索" />
                          </template>
                          <el-table-column prop="stationDes" label="站位描述"></el-table-column>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
  addStation,
  getOperationInfo
} from "../../../api/operation.station.api.js";
import _ from "lodash";
export default {
  name: "edit-operation-station",
  computed: {
    ...mapGetters(["stationEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth: "120px",
      activeName: "first",
      cloneModify: {}, //  克隆的表单的一份副本
      transferData: [],
      allocate: [],
      editForm: {
        operation: "",
        operationDes: "",
        status: "",
        certOperation: "",
        reportingStep: "",
        resourceGroup: ""
      },
      rules: {},
      status: [
        {
          label: "已启用",
          value: true
        },
        {
          label: "未启用",
          value: false
        }
      ],
      operation: [],
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      selectIsDisabled: false,
      unallocateData: [],
      allocateData: [],
      workCenterRelation1: "",
      workCenterRelation2: "",
      station1: "",
      station2: "",
      stationDes1: "",
      stationDes2: "",
      selectedList: [],
      selectedList2: [],
      cloneUnallocateData: [],
      cloneAllocateData: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapMutations(["SETSTATIONEDITLIST"]),
    //初始化的操作
    init() {
      if (this.stationEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.stationEditList)); //复制一份副本,保证副本和初始列表数据一致性
        console.log(this.cloneList, "cloneList");
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = JSON.parse(JSON.stringify(this.editForm)); // modify 的副本
        this.setCurrent(this.editForm); // 设置选中第一行
        this.currentRow = this.editForm; // 设置初始currentRow 为第一行
        let params = {
          operation: this.editForm.operation
        };
        getOperationInfo(params).then(data => {
          if (data.data.code == 200) {
            this.unallocateData = data.data.data.undistributed;
            this.cloneUnallocateData = data.data.data.undistributed;
            this.allocateData = data.data.data.allocated;
            this.cloneAllocateData = data.data.data.allocated;
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
      const tempList = this.cloneList.filter(
        item =>
          item["operation"] == row.split("&")[0] &&
          item["workCenterRelation"] == row.split("&")[1] &&
          item["station"] == row.split("&")[2]
      );
      console.log(tempList);
      // this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      this.setCurrent(tempList[0]);
      let params = {
        operation: this.editForm.operation
      };
      getOperationInfo(params).then(data => {
        if (data.data.code == 200) {
          this.unallocateData = data.data.data.undistributed;
          this.cloneUnallocateData = data.data.data.undistributed;
          this.allocateData = data.data.data.allocated;
          this.cloneAllocateData = data.data.data.allocated;
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
      let temp = arr.filter(item => item[kerStr] == keyV);
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
      let params = {
        operation: this.editForm.operation
      };
      getOperationInfo(params).then(data => {
        if (data.data.code == 200) {
          this.unallocateData = data.data.data.undistributed;
          this.cloneUnallocateData = data.data.data.undistributed;
          this.allocateData = data.data.data.allocated;
          this.cloneAllocateData = data.data.data.allocated;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },

    //选中某一行
    //返回操作
    goBack() {
      this.$router.push({ path: "/operationStation/operationStation" });
    },
    /**
     *  通过operation
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["operation"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if (
        this.cloneList.length < this.stationEditList.length &&
        this.value != ""
      ) {
        this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
        this.editForm = this.cloneList[0];
        return;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.stationEditList)); //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.operation;
        let item = this.findItemByKey(this.cloneList, code, "operation");
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
            let obj = {};
            obj.operation = this.editForm.operation;
            obj.station = item.station;
            obj.workCenterRelation = item.workCenterRelation;
            arr.push(obj);
          });
          addStation(arr).then(data => {
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
              if (this.cloneList.length == this.stationEditList.length) {
                //直接覆盖
                //重新更改初始的副本
                //设置左边的选中状态
                this.SETSTATIONEDITLIST(
                  JSON.parse(JSON.stringify(this.cloneList))
                );
                this.editForm = this.currentRow;
                this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
              }

              if (this.cloneList.length == 1) {
                let index = this.findIndexByItem(
                  this.stationEditList,
                  this.editForm.material
                );
                if (index > -1) {
                  this.stationEditList.splice(index, 1, this.editForm); // 替换
                  this.SETSTATIONEDITLIST(
                    JSON.parse(JSON.stringify(this.stationEditList))
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
    }
  }
};
</script>

<style scoped lang="scss">
.edit-operation-station {
  .operate {
    padding: 10px;
  }
  .el-row {
    padding: 10px;
    background: #ffffff;
    .editForm {
      background: #ffffff;
      padding: 10px;
      .dec {
        width: 756px !important;
      }
    }
    .el-table /deep/ .success-row {
      background: #f0f9eb;
    }
    .el-transfer /deep/ .el-transfer-panel {
      width: 300px !important;
      height: 400px !important;
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
}
</style>