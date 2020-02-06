<template>
  <div class="standingMaintenanceEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button
        size="small"
        type="primary"
        @click="checkAdd(['standingFormOne', 'standingFormTwo'])"
      >保存</el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleReset(['standingFormOne', 'standingFormTwo'])"
      >重置</el-button>
    </div>
    <div class="showInfo">
      <div class="left" v-if="operateType === 'edit'">
        <!-- <el-select
          v-model="value"
          clearable
          placeholder="请选择"
          @clear="handleClearSelect"
          @change="handleChangeOption"
          @focus="handleSelectFocus"
          ref="select"
        >
          <el-option
            v-for="item in cloneList"
            :key="item.colorCode"
            :label="item.colorName"
            :value="item.colorCode"
          >
          </el-option>
        </el-select>-->
        <el-table
          ref="editTable"
          :data="cloneList"
          border
          highlight-current-row
          style="width: 100%"
          height="513"
          @row-click="handleStationCurrentChange"
        >
          <el-table-column prop="station" label="站位"></el-table-column>
          <el-table-column prop="stationDes" label="站位描述"></el-table-column>
        </el-table>
      </div>
      <div class="right">
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
            <el-input v-model.trim="standingForm.stationDes" placeholder="请输入站位描述"></el-input>
          </el-form-item>
        </el-form>

        <el-tabs type="border-card">
          <el-tab-pane class="baseInfo">
            <span slot="label">基础信息</span>
            <el-form
              :model="standingForm"
              ref="standingFormTwo"
              label-width="120px"
              :rules="standingFormRules"
            >
              <el-form-item label="IP地址:" prop="padIp">
                <el-input v-model.trim="standingForm.padIp" placeholder="请输入IP地址"></el-input>
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
                <el-select v-model="standingForm.workCenterRelation" filterable placeholder="请选择产线">
                  <el-option
                    v-for="(item, index) in workCenterRelations"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备:" prop="resource">
                <el-input v-model.trim="standingForm.resource" placeholder="请输入设备" class="resource"></el-input>
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
              <el-form-item label="满站数量:" prop="fullQty">
                <el-input v-model.trim="standingForm.fullQty" placeholder="请输入满站数量"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-dialog title="设备" :visible.sync="resourceDialog" width="30%">
          <span>
            <el-table
              ref="multipleTable"
              :data="resourceData"
              highlight-current-row
              style="width: 100%"
              height="200px"
              @current-change="handleCurrentChange"
            >
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="resource" label="设备编号" width="100"></el-table-column>
              <el-table-column prop="resourceDes" label="设备描述" show-overflow-tooltip></el-table-column>
            </el-table>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resourceDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleSelectionResource">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="保存" :visible.sync="saveDialog" width="30%">
          <span>是否确认保存该条数据？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="saveDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllList } from "@/api/work.center.api.js";
import { getInactiveResourceHttp } from "@/api/device/maintenance.api.js";
import { saveHttp } from "@/api/maintenance/standing.api.js";
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    const valiIP = (rule, value, callback) => {
      // debugger;
      if (value === "") {
        callback("IP地址不能为空");
      }
      //
      let reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
      if (!reg.test(value)) {
        callback("IP地址格式错误");
      }
      callback();
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
        stationType: "",
        fullQty: ""
      },
      standingFormRules: {
        station: [{ required: true, message: "请输入站位", trigger: "change" }],
        padIp: [
          { required: true, message: "请输入IP地址", trigger: "change" },
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
      resourceData: [],
      workCenters: [],
      workCenterRelations: [],
      resourceDialog: false,
      currentRow: {},
      saveDialog: false
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
        getAllList(data).then(data => {
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
    // 点击某一行选中后操作的状态你
    handleStationCurrentChange(currentRow) {
      this.standingForm = JSON.parse(JSON.stringify(currentRow));
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
    //查询所有待使用设备
    handleSeleteResource() {
      getInactiveResourceHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.resourceData = res.data;
          this.resourceDialog = true;
          console.log(this.resourceData);
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //返回
    handleBack() {
      this.$router.push({ name: "standingMaintenance" });
    },
    //添加前验证表单
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
      console.log(count);
      if (count >= 2) {
        this.saveDialog = true;
        return;
      }
    },
    //保存
    handleSave() {
      const tempArr = [];
      tempArr.push(this.standingForm);
      let data =
        this.operateType === "add"
          ? { createList: tempArr }
          : { updateList: tempArr };
      saveHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "warning"
          });
          this.saveDialog = false;
          this.handleBack();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.saveDialog = false;
      });
    },
    //重置
    handleReset(formName) {
      formName.forEach(element => {
        this.$refs[element].resetFields();
      });
      // if (this.operateType === "add") {
      //   formName.forEach(element => {
      //     this.$refs[element].resetFields();
      //   });
      //   return;
      // }

      // if (this.operateType === "edit") {
      //   formName.forEach(element => {
      //     this.$refs[element].resetFields();
      //   });
      //   return;
      // }
    },
    //选择设备
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //弹出框确认
    handleSelectionResource() {
      this.standingForm.resource = this.currentRow.resource;
      this.resourceDialog = false;
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
    display: flex;
    .left {
      width: 200px;
      height: 100px;
      background-color: red;
    }
    .right {
      flex: 1;
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
}
</style>
