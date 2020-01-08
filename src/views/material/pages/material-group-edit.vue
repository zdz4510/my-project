<template>
  <div class="materialGroupEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">
        返回
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="checkAdd('materialGroupForm')"
      >
        保存
      </el-button>
      <el-button size="small" type="primary" @click="handleReset">
        重置
      </el-button>
    </div>

    <div class="showInfo">
      <!-- <div class="left"> -->
      <!-- <el-select
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
            :key="item.salaryLevelCode"
            :label="item.salaryLevelName"
            :value="item.salaryLevelCode"
          >
          </el-option>
        </el-select> -->

      <!-- <el-table
          ref="editTable"
          :data="cloneList"
          border
          highlight-current-row
          style="width: 100%"
          height="513px"
          @row-click="handleCurrentChange"
        >
          <el-table-column prop="materialGroup" label="物料组">
          </el-table-column>
          <el-table-column prop="groupDes" label="组别描述"> </el-table-column>
        </el-table> -->
      <!-- </div> -->
      <div class="right">
        <el-form
          :model="materialGroupForm"
          :rules="rules"
          ref="materialGroupForm"
          label-width="100px"
          class="materialGroupForm"
        >
          <el-form-item label="物料组" prop="materialGroup">
            <el-input
              v-model.trim="materialGroupForm.materialGroup"
              placeholder="请输入物料组"
              :disabled="isEditResource"
            ></el-input>
          </el-form-item>
          <el-form-item label="组别描述">
            <el-input
              type="textarea"
              rows="2"
              v-model.trim="materialGroupForm.groupDes"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-transfer
          ref="transfer"
          filterable
          filter-placeholder="请输入物料号"
          v-model="value"
          :data="transferData"
          :titles="titles"
          :props="{
            key: 'material',
            label: 'material',
            materialRev: 'materialRev',
            materialDes: 'materialDes',
            materialStatus: 'materialStatus'
          }"
        >
          <span slot-scope="{ option }"
            >{{ option.material }} - {{ option.materialRev }}-{{
              option.materialDes
            }}-{{ option.materialStatus }}</span
          >
        </el-transfer>
      </div>
    </div>
    <el-dialog title="删除" :visible.sync="saveDialog" width="30%">
      <span>是否确认保存该条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleReset">取 消</el-button>
        <el-button type="primary" @click="handleSave">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { saveHttp } from "@/api/material/material.group.api.js";

export default {
  data() {
    return {
      operateType: "",
      materialGroupForm: {
        //物料组
        materialGroup: "",
        //组别描述
        groupDes: ""
      },
      rules: {
        materialGroup: [
          { required: true, message: "请输入物料组", trigger: "blur" }
        ]
      },
      //穿梭框
      titles: ["已关联物料", "未关联物料"],
      transferData: [],
      value: [],
      cloneForm: [],
      allocated: [],
      undistributed: [],
      saveDialog: false,
      isEditResource: false
    };
  },
  computed: {
    ...mapGetters(["materialGroupList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    console.log(this.operateType);
    this.cloneList = JSON.parse(JSON.stringify(this.materialGroupList));
    this.materialGroupForm = this.cloneList[0];
    this.init();
    if (this.operateType === "edit") {
      this.isEditResource = true;
    }
  },
  methods: {
    ...mapMutations(["MATERIALGROUPLIST"]),
    init() {
      //   const data = {
      //     materialGroup: this.materialGroupForm.materialGroup
      //   };
      //   console.log(this.operateType);
      //   if (this.operateType === "add") {
      //     getInformationHttp().then(data => {
      //       const res = data.data;
      //       console.log(res);
      //       if (res.code === 200) {
      //         const list = res.data;
      //         this.allocated = list.allocated;
      //         this.undistributed = list.undistributed;
      //         //合并数组
      //         this.transferData = [...this.allocated, ...this.undistributed];
      //         this.undistributed.forEach(element => {
      //           this.value.push(element.material);
      //         });
      //         console.log(this.transferData);
      //         return;
      //       }
      //       this.$message({
      //         message: res.message,
      //         type: "warning"
      //       });
      //     });
      //     return;
      //   }
      //   if (this.operateType === "edit") {
      //     getInformationHttp(data).then(data => {
      //       const res = data.data;
      //       console.log(res);
      //       if (res.code === 200) {
      //         const list = res.data;
      //         this.allocated = list.allocated;
      //         this.undistributed = list.undistributed;
      //         //合并数组
      //         this.transferData = [...this.allocated, ...this.undistributed];
      //         this.undistributed.forEach(element => {
      //           this.value.push(element.material);
      //         });
      //         console.log(this.transferData);
      //         return;
      //       }
      //       this.$message({
      //         message: res.message,
      //         type: "warning"
      //       });
      //     });
      //     return;
      //   }
    },
    //返回
    handleBack() {
      this.selectionList = [];
      // const emptyObj = { materialGroup: "", groupDes: "" };
      // this.selectionList.push(emptyObj);
      this.MATERIALGROUPLIST(this.selectionList);
      this.$router.push({
        name: "materialGroup"
      });
    },
    //重置
    handleReset() {
      this.saveDialog = false;
      this.value = [];
      this.undistributed.forEach(element => {
        this.value.push(element.material);
      });
      if (this.operateType === "add") {
        this.materialGroupForm.materialGroup = "";
        this.materialGroupForm.groupDes = "";
      }
    },
    // //选择设备
    // handleCurrentChange(currentRow) {
    //   this.materialGroupForm = JSON.parse(JSON.stringify(currentRow));
    // },
    //保存前验证表单
    checkAdd(formName) {
      console.log(this.materialGroupForm.materialGroup === "");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveDialog = true;
        } else {
          this.$message({
            message: "设备类型未填写",
            type: "warning"
          });
          return false;
        }
      });
    },
    handleSave() {
      //穿梭框左侧数据
      const allocated = this.$refs["transfer"].sourceData;
      const resourceList = [];
      allocated.forEach(element => {
        resourceList.push(element.material);
      });
      console.log(this.materialGroupForm.materialGroup);
      //工资级别代码未输入
      if (this.materialGroupForm.materialGroup === "") {
        this.$message({
          message: "设备类型不能为空",
          type: "warning"
        });
        return;
      }
      const data = {
        groupDes: this.materialGroupForm.groupDes,
        materialGroup: this.materialGroupForm.materialGroup,
        resourceList: resourceList
      };
      if (this.operateType === "edit") {
        saveHttp(data).then(data => {
          const res = data.data;
          console.log(res);
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.MATERIALGROUPLIST([]);
            this.$router.push({ name: "materialGroup" });
            return;
          }
          this.$message({
            message: res.message,
            type: "warning"
          });
        });
        return;
      }
      if (this.operateType === "add") {
        saveHttp(data).then(data => {
          const res = data.data;
          console.log(res);
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.MATERIALGROUPLIST([]);
            this.$router.push({ name: "materialGroup" });
            return;
          }
          this.$message({
            message: res.message,
            type: "warning"
          });
        });
        return;
      }
    }
  }
};
</script>

<style lang="scss">
.materialGroupEdit {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .showInfo {
    display: flex;
    .right {
      flex: 1;
      .el-form {
        width: 40%;
      }
      .el-transfer {
        .el-transfer-panel {
          width: 35%;
        }
      }
    }
  }
}
</style>
