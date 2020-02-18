<template>
  <div class="add-operation-maintain">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="save('addForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="resetForm('addForm')">重置</dsn-button>
    </div>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>添加数据</span>
      </div>
      <el-form
        :inline="true"
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="form-style"
        label-position="right"
        :label-width="formLabelWidth"
      >
        <el-form-item label="工序:" prop="operation" required>
          <dsn-input v-model="addForm.operation"></dsn-input>
        </el-form-item>
        <el-form-item label="描述:" prop="operationDes">
          <dsn-input
            maxlength="80"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="addForm.operationDes"
          ></dsn-input>
        </el-form-item>
        <dsn-tabs v-model="activeName" type="border-card">
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
                <el-form-item label="报告步骤:" prop="reportingStep">
                  <dsn-input v-model="addForm.reportingStep"></dsn-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="设备组:" prop="resourceGroup" required>
                  <dsn-select v-model="addForm.resourceGroup">
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
                <el-form-item label="上岗证:" prop="certOperation">
                  <dsn-select v-model="addForm.certOperation">
                    <el-option
                      v-for="item in certList"
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
        </dsn-tabs>
      </el-form>
    </DsnPanel>
  </div>
</template>

<script>
import {
  saveOperation,
  getAllResourceGroup,
  getUnassignedCert
} from "../../../api/operation.maintain.api.js";
export default {
  name: "add-operation-maintain",
  data() {
    return {
      activeName: "first",
      formLabelWidth: "80px",
      rules: {
        operation: [
          { required: true, message: "请填写工序名称", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        resourceGroup: [
          { required: true, message: "请选择设备组", trigger: "change" }
        ],
      },
      addForm: {
        operation: "",
        operationDes: "",
        status: "",
        certOperation: "",
        reportingStep: "",
        resourceGroup: ""
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
      certList: []
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
    getUnassignedCert({cert: ''}).then(data => {
      if (data.data.code == 200) {
        this.certList = data.data.data;
      } else {
        this.$message.error(data.data.message);
      }
    });
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/operationMaintain/operationMaintain" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let params = this.addForm
          let params = {
            createList: [this.addForm]
          };
          saveOperation(params).then(data => {
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/operationMaintain/operationMaintain"
                });
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
    }
  }
};
</script>

<style scoped lang="scss">
.add-operation-maintain {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
  }
  .addForm {
    .el-textarea /deep/ .el-textarea__inner {
      width: 300px;
    }
  }
}
</style>
