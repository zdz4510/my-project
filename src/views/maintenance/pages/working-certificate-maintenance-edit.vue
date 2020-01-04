<template>
  <div class="workingCertificateMaintenanceEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">
        返回
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="checkAdd(['standingFormOne', 'standingFormTwo'])"
      >
        保存
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleReset(['standingFormOne', 'standingFormTwo'])"
      >
        重置
      </el-button>
    </div>
    <div class="showInfo">
      <el-form
        :model="workCertificateForm"
        ref="standingFormOne"
        label-width="120px"
        :rules="workCertFormRules"
      >
        <el-form-item label="上岗证" prop="cert">
          <el-input
            v-model.trim="workCertificateForm.cert"
            placeholder="请输入上岗证"
            :disabled="isEditStation"
          ></el-input>
        </el-form-item>
        <el-form-item label="上岗证描述" prop="certDes">
          <el-input
            v-model.trim="workCertificateForm.certDes"
            placeholder="请输入上岗证描述"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane class="baseInfo">
          <span slot="label"> 基础信息</span>
          <el-form
            :model="workCertificateForm"
            ref="standingFormTwo"
            label-width="150px"
            :rules="workCertFormRules"
          >
            <el-form-item label="状态:" prop="status">
              <el-select
                v-model="workCertificateForm.status"
                filterable
                placeholder="请选择状态"
              >
                <el-option label="已启用" :value="true">已启用</el-option>
                <el-option label="未启用" :value="false">未启用</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="站位类型:" prop="certType">
              <el-select
                v-model="workCertificateForm.certType"
                filterable
                placeholder="请选择持续时间类型"
              >
                <el-option label="永久" :value="true">永久</el-option>
                <el-option label="临时" :value="false">临时</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上岗证持续截止日期" prop="certTime">
              <el-date-picker
                v-model="workCertificateForm.certTime"
                type="datetime"
                placeholder="选择日期"
                size="small"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane class="defineData">
          <span slot="label">自定义数据</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { listAllHttp } from "@/api/work.center.api.js";
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      //是否可编辑站位
      isEditStation: false,
      workCertificateForm: {
        cert: "",
        certDes: "",
        status: "",
        certType: "",
        certTime: ""
      },
      workCertFormRules: {
        cert: [{ required: true, message: "请输入站位", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        certType: [
          { required: true, message: "请选择持续时间类型", trigger: "change" }
        ],
        certTime: [
          {
            required: true,
            message: "请选择上岗证持续截止日期",
            trigger: "change"
          }
        ]
      },
      workCenters: [],
      workCenterRelations: []
    };
  },
  computed: {
    ...mapGetters(["workingCertificateList"])
  },
  created() {
    this.deBounceSearch();
    this.operateType = this.$route.query.operateType;

    this.cloneList = JSON.parse(JSON.stringify(this.workingCertificateList));
    console.log(this.cloneList[0]);
    if (this.operateType === "edit") {
      this.workCertificateForm = this.cloneList[0];
      this.isEditStation = true;
    }
  },
  methods: {
    ...mapMutations(["WORKINGCERTIFICATELIST"]),
    deBounceSearch() {
      this.fn = _.debounce(cb => {
        const data = { workCenter: this.workCertificateForm.workCenter };
        //查询所有工作中心
        listAllHttp(data).then(data => {
          const res = data.data;
          if (res.code === 200) {
            this.workCenters = res.data;
            this.workCenters.forEach(element => {
              element.value = element.workCenter;
            });
            cb(this.workCenters);
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }, 150);
    },
    //搜索
    querySearch(queryString, cb) {
      this.fn(cb);
    },
    //工作中心选择
    handleSelectWorkCenter(item) {
      this.workCertificateForm.workCenter = item.value;
      this.workCenterRelations = item.workCenterRelation;
    },
    //产线选择
    handleSelectWorkCenterRelation(item) {
      this.workCertificateForm.workCenterRelation = item.value;
    },
    handleBack() {
      this.$router.push({ name: "standingMaintenance" });
    },
    checkAdd(formName) {
      let count = 0;
      formName.forEach(element => {
        this.$refs[element].validate(valid => {
          if (valid) {
            count++;
          } else {
            return false;
          }
        });
      });
      if (count >= 2) {
        this.handleSave();
        return;
      }
    },
    //保存
    handleSave() {
      console.log(this.workCertificateForm);
    },
    //重置
    handleReset(formName) {
      //   console.log(formName);
      //   formName.forEach(element => {
      //     console.log(this.$refs[element]);
      //     this.$refs[element].resetFields();
      //   });
      console.log(this.operateType);
      console.log(formName);
      if (this.operateType === "add") {
        formName.forEach(element => {
          this.$refs[element].resetFields();
        });
        return;
      }

      if (this.operateType === "edit") {
        const object = this.workCertificateForm;
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            if (key !== "station") {
              object[key] = "";
            }
          }
        }
        return;
      }
    }
  }
};
</script>

<style lang="scss">
.workingCertificateMaintenanceEdit {
  padding: 10px 30px;
  .operate {
    padding: 10px 0;
  }
  .showInfo {
    .el-form {
      .el-form-item {
        .el-form-item__content {
          width: 250px;
        }
      }
    }
    .el-tabs {
      .el-form {
        .el-form-item {
          .el-form-item__content {
            width: 250px;
            .el-radio-group {
              .el-radio {
                margin-right: 12px;
              }
            }
            .resource {
              width: 90%;
            }
          }
        }
      }
    }
  }
}
</style>
