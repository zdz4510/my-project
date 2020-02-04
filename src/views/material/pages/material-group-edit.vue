<template>
  <div class="materialGroupEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button size="small" type="primary" @click="checkAdd('materialGroupForm')">保存</el-button>
      <el-button size="small" type="primary" @click="handleReset">重置</el-button>
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
      </el-select>-->

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
      </el-table>-->
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
            <el-input type="textarea" rows="2" v-model.trim="materialGroupForm.groupDes"></el-input>
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
          <span slot-scope="{ option }">
            {{ option.material }} - {{ option.materialRev }}-{{
            option.materialDes
            }}-{{ option.materialStatus }}
          </span>
        </el-transfer>
      </div>
    </div>
    <el-dialog title="删除" :visible.sync="saveDialog" width="30%">
      <span>是否确认保存该条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleReset">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  getAllDistinctHttp,
  saveHttp
} from "@/api/material/material.group.api.js";

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
      titles: ["未关联物料", "已关联物料"],
      transferData: [],
      value: [],
      cloneForm: [],
      relatived: [],
      unrelatived: [],
      saveDialog: false,
      isEditResource: false
    };
  },
  computed: {
    ...mapGetters(["materialGroupList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.cloneList = JSON.parse(JSON.stringify(this.materialGroupList));
    this.materialGroupForm = this.cloneList[0];
    this.init();
    if (this.operateType === "edit") {
      this.isEditResource = true;
      this.materialGroupForm.materialList.forEach(element => {
        this.value.push(element.material);
      });
    }
  },
  methods: {
    ...mapMutations(["MATERIALGROUPLIST"]),
    init() {
      getAllDistinctHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.transferData = res.data;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //返回
    handleBack() {
      this.selectionList = [];
      this.MATERIALGROUPLIST(this.selectionList);
      this.$router.push({
        name: "materialGroup"
      });
    },
    //重置
    handleReset() {
      this.saveDialog = false;
      this.value = [];
      this.unrelatived.forEach(element => {
        this.value.push(element.material);
      });
      if (this.operateType === "edit") {
        const tempList = JSON.parse(JSON.stringify(this.materialGroupList));
        this.materialGroupForm = tempList[0];
        this.materialGroupForm.materialList.forEach(element => {
          this.value.push(element.material);
        });
      }
      if (this.operateType === "add") {
        this.materialGroupForm.materialGroup = "";
        this.materialGroupForm.groupDes = "";
      }
    },
    checkAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveDialog = true;
        } else {
          this.$message({
            message: "物料组未填写",
            type: "warning"
          });
          return false;
        }
      });
    },
    handleSave() {
      //穿梭框右侧数据
      const relatived = this.$refs["transfer"].targetData;
      const tempArr = [
        {
          groupDes: this.materialGroupForm.groupDes,
          materialGroup: this.materialGroupForm.materialGroup,
          materialList: relatived
        }
      ];
      const data =
        this.operateType === "add"
          ? { createList: tempArr }
          : { createList: [], updateList: tempArr };
      saveHttp(data).then(data => {
        const res = data.data;
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
        this.saveDialog = false;
      });
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
          width: 30%;
        }
      }
    }
  }
}
</style>
