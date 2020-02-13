<template>
  <div class="edit-operation-maintain">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="handleSave('editForm')">保存</dsn-button>
    </div>
    <el-row :gutter="20" class="bgw">
      <el-col :span="6">
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>修改列表</span>
          </div>
          <dsn-select
            v-model="value"
            clearable
            placeholder="请选择"
            style="margin-bottom: 14px"
            :disabled="selectIsDisabled"
            @clear="handleClearSelect"
            @change="handleChangeOption"
            @focus="handleSelectFocus"
            ref="select"
          >
            <el-option
              v-for="item in cloneList"
              :key="item.operation"
              :label="item.operation"
              :value="item.operation"
            ></el-option>
          </dsn-select>
          <el-table
            ref="editTable"
            :data="cloneList"
            border
            highlight-current-row
            style="width: 100%"
            @row-click="handleCurrentChange"
          >
            <el-table-column label="工序" prop="operation"></el-table-column>
            <el-table-column label="描述" prop="operationDes"></el-table-column>
          </el-table>
        </DsnPanel>
      </el-col>
      <el-col :span="18">
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>修改条件</span>
          </div>
          <el-form
            :inline="true"
            :model="editForm"
            ref="editForm"
            :rules="rules"
            class="form-style"
            label-position="right"
            :label-width="formLabelWidth"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item label="工序:" prop="operation">
                  <dsn-input v-model="editForm.operation" disabled></dsn-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述:" prop="operationDes">
                  <dsn-input
                    maxlength="80"
                    show-word-limit
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="editForm.operationDes"
                  ></dsn-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-tabs v-model="activeName" type="border-card">
                  <el-tab-pane label="基础信息" name="first">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="状态:" prop="status">
                          <dsn-select v-model="editForm.status">
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
                        <el-form-item label="报告步骤:" prop="reportingStep">
                          <dsn-input v-model="editForm.reportingStep"></dsn-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="设备组:" prop="resourceGroup">
                          <dsn-select v-model="editForm.resourceGroup">
                            <el-option
                              v-for="item in resourceGroup"
                              :key="item.resourceGroup"
                              :label="item.resourceGroup"
                              :value="item.resourceGroup"
                            ></el-option>
                          </dsn-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="上岗证:" prop="certOperation" required>
                          <dsn-select v-model="editForm.certOperation">
                            <el-option
                              v-for="item in certOperation"
                              :key="item.cert"
                              :label="item.cert"
                              :value="item.cert"
                            ></el-option>
                          </dsn-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="自定义数据" name="second">数据字段，数据属性</el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </el-form>
          <!-- 确认模态框 -->
          <el-dialog title="保存" :visible.sync="saveDialog" width="30%">
            <span>是否保存数据？</span>
            <span slot="footer" class="dialog-footer">
              <dsn-button @click.native="handleCancle">取 消</dsn-button>
              <dsn-button type="primary" @click.native="handleSave('editForm')">确 定</dsn-button>
            </span>
          </el-dialog>
        </DsnPanel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  saveOperation,
  getAllResourceGroup,
  getAllCert
} from "../../../api/operation.maintain.api.js";
export default {
  name: "edit-operation-maintain",
  computed: {
    ...mapGetters(["operationEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth: "80px",
      activeName: "first",
      cloneModify: {}, //  克隆的表单的一份副本
      editForm: {
        operation: "",
        operationDes: "",
        status: "",
        certOperation: "",
        reportingStep: "",
        resourceGroup: ""
      },
      rules: {
        operation: [
          { required: true, message: "请填写工序名称", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        resourceGroup: [
          { required: true, message: "请选择设备组", trigger: "change" }
        ],
        certOperation: [
          { required: true, message: "请选择上岗证", trigger: "change" }
        ]
      },
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
      resourceGroup: [],
      certOperation: [],
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      selectIsDisabled: false
    };
  },
  created() {
    getAllResourceGroup().then(data => {
      if (data.data.code == 200) {
        this.resourceGroup = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
    getAllCert().then(data => {
      if (data.data.code == 200) {
        this.certOperation = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapMutations(["SETOPERATIONEDITLIST"]),
    //初始化的操作
    init() {
      if (this.operationEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.operationEditList)); //复制一份副本,保证副本和初始列表数据一致性
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
      const tempList = this.cloneList.filter(item => item["operation"] == row);
      console.log(tempList);
      // this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      this.setCurrent(tempList[0]);
    },
    //下拉列表获取到焦点时触发
    handleSelectFocus() {
      // this.oldRow = oldRow;
      //  当前编辑的和之前的数据不一样就显示弹窗
      if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        // console.log('数据不一样禁用下拉框还有弹出保存')
        this.saveDialog = true; // 保存弹出框出现
        this.selectIsDisabled = true; // 禁用下拉框
        this.$refs["select"].blur();
      } else {
        //  console.log('数据一样不禁用下拉框还有不弹出保存')
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
    },
    //选中某一行
    //返回操作
    goBack() {
      this.$router.push({ path: "/operationMaintain/operationMaintain" });
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
        this.cloneList.length < this.operationEditList.length &&
        this.value != ""
      ) {
        this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
        this.editForm = this.cloneList[0];
        return;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.operationEditList)); //取消直接复制一份副本
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
          // let params = this.editForm
          let params = {
            updateList: [this.editForm]
          };
          saveOperation(params).then(data => {
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
              if (this.cloneList.length == this.operationEditList.length) {
                //直接覆盖
                //重新更改初始的副本
                //设置左边的选中状态
                this.SETOPERATIONEDITLIST(
                  JSON.parse(JSON.stringify(this.cloneList))
                );
                this.editForm = this.currentRow;
                this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
              }

              if (this.cloneList.length == 1) {
                let index = this.findIndexByItem(
                  this.operationEditList,
                  this.editForm.operation
                );
                if (index > -1) {
                  this.operationEditList.splice(index, 1, this.editForm); // 替换
                  this.SETOPERATIONEDITLIST(
                    JSON.parse(JSON.stringify(this.operationEditList))
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
    }
  }
};
</script>

<style scoped lang="scss">
.edit-operation-maintain {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
  }
}
</style>
