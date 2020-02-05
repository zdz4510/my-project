<template>
  <div class="add-operation-maintain">
    <div class="operate">
      <el-button size="small" type="primary" @click="goBack">返回</el-button>
      <el-button size="small" type="primary" @click="save('addForm')">保存</el-button>
      <el-button size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
    </div>
    <div class="addForm">
      <el-form
        :inline="true"
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="form-style"
        label-position="right"
        :label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="工序:" prop="operation" required>
              <el-input v-model="addForm.operation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述:" prop="operationDes">
              <el-input
                maxlength="80"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="addForm.operationDes"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="基础信息" name="first">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态:" prop="status" required>
                      <el-select v-model="addForm.status">
                        <el-option
                          v-for="item in status"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="报告步骤:" prop="reportingStep">
                      <el-input v-model="addForm.reportingStep"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="设备组:" prop="resourceGroup" required>
                      <el-select v-model="addForm.resourceGroup">
                        <el-option
                          v-for="item in resourceGroup"
                          :key="item.resourceGroup"
                          :label="item.resourceGroup"
                          :value="item.resourceGroup"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="上岗证:" prop="certOperation" required>
                      <el-select v-model="addForm.certOperation">
                        <el-option
                          v-for="item in certList"
                          :key="item.cert"
                          :label="item.cert"
                          :value="item.cert"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="自定义数据" name="second">数据字段，数据属性</el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  saveOperation,
  getAllResourceGroup,
  getAllCert
} from "../../../api/operation.maintain.api.js";
export default {
  name: "add-operation-maintain",
  data() {
    return {
      activeName: "first",
      formLabelWidth: "120px",
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
    getAllCert().then(data => {
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
    padding: 10px;
  }
  .addForm {
    .el-textarea /deep/ .el-textarea__inner {
      width: 300px;
    }
  }
}
</style>
