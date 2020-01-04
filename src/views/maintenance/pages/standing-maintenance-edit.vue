<template>
  <div class="standingMaintenanceEdit">
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
        :model="standingForm"
        ref="standingFormOne"
        label-width="100px"
        :rules="standingFormRules"
      >
        <el-form-item label="站位" prop="station">
          <el-input
            v-model.trim="standingForm.station"
            placeholder="请输入站位"
            :disabled="isEditStation"
          ></el-input>
        </el-form-item>
        <el-form-item label="站位描述" prop="stationDes">
          <el-input
            v-model.trim="standingForm.stationDes"
            placeholder="请输入站位描述"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane class="baseInfo">
          <span slot="label"> 基础信息</span>
          <el-form
            :model="standingForm"
            ref="standingFormTwo"
            label-width="120px"
            :rules="standingFormRules"
          >
            <el-form-item label="IP地址:" prop="padIp">
              <el-input
                v-model.trim="standingForm.padIp"
                placeholder="请输入IP地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="工作中心:" prop="workCenter">
              <el-autocomplete
                v-model="standingForm.workCenter"
                :fetch-suggestions="querySearch"
                placeholder="请输入工作中心"
                @select="handleSelectWorkCenter"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="产线:" prop="workCenterRelation">
              <el-select
                v-model="standingForm.workCenterRelation"
                filterable
                placeholder="请选择产线"
              >
                <el-option
                  v-for="(item, index) in workCenterRelations"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备:" prop="resource">
              <el-input
                v-model.trim="standingForm.resource"
                placeholder="请输入设备"
                class="resource"
              ></el-input>
              <i class="el-icon-document" @click="handleSeleteResource"></i>
            </el-form-item>

            <el-form-item label="状态:" prop="status">
              <el-radio-group v-model="standingForm.status">
                <el-radio label="正常" value="正常">正常</el-radio>
                <el-radio label="满站" value="满站">满站</el-radio>
                <el-radio label="故障" value="故障">故障</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="站位类型:" prop="stationType">
              <el-radio-group v-model="standingForm.stationType">
                <el-radio label="普通站" value="普通站">普通站</el-radio>
                <el-radio label="质监站" value="质监站">质监站</el-radio>
                <el-radio label="多功能站" value="多功能站">多功能站</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-dialog title="设备" :visible.sync="resourceDialog" width="30%">
        <span>是否确认删除{{ selectionList.length }}条数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resourceDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleDelete">
            确 定
          </el-button>
        </span>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import { listAllHttp } from "@/api/work.center.api.js";
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    const valiIP = (rule, value, callback) => {
      if (value == "") {
        callback("IP地址不能为空");
      } else {
        let reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
        if (!reg.test(value)) {
          callback("IP地址格式错误");
        }
      }
    };
    return {
      //是否可编辑站位
      isEditStation: false,
      standingForm: {
        station: "",
        stationDes: "",
        padIp: "",
        workCenter: "",
        workCenterRelation: "",
        resource: "",
        status: "",
        stationType: ""
      },
      standingFormRules: {
        station: [{ required: true, message: "请输入站位", trigger: "blur" }],
        padIp: [
          { required: true, message: "请输入IP地址", trigger: "blur" },
          { validator: valiIP, trigger: "blur" }
        ],
        workCenter: [
          { required: true, message: "工作中心", trigger: "change" }
        ],
        workCenterRelation: [
          { required: true, message: "请输入产线", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请输入设备", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        stationType: [
          { required: true, message: "请选择站位类型", trigger: "change" }
        ]
      },
      workCenters: [],
      workCenterRelations: []
    };
  },
  computed: {
    ...mapGetters(["standingList"])
  },
  created() {
    this.deBounceSearch();
    this.operateType = this.$route.query.operateType;

    this.cloneList = JSON.parse(JSON.stringify(this.standingList));
    console.log(this.cloneList[0]);
    if (this.operateType === "edit") {
      this.standingForm = this.cloneList[0];
      this.isEditStation = true;
    }
  },
  methods: {
    ...mapMutations(["STANDINGLIST"]),
    deBounceSearch() {
      this.fn = _.debounce(cb => {
        const data = { workCenter: this.standingForm.workCenter };
        //查询所有工作中心
        listAllHttp(data).then(data => {
          const res = data.data;
          if (res.code === 200) {
            this.workCenters = res.data;
            console.log(this.workCenters);
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
      this.standingForm.workCenter = item.value;
      this.workCenterRelations = item.workCenterRelation;
    },
    //产线选择
    handleSelectWorkCenterRelation(item) {
      this.standingForm.workCenterRelation = item.value;
    },
    handleSeleteResource() {
      console.log(11);
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
      console.log(this.standingForm);
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
        const object = this.standingForm;
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
.standingMaintenanceEdit {
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
