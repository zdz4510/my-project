<template>
  <div class="materialGroupEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click.native="handleBack">返回</el-button>
      <el-button size="small" type="primary" @click.native="checkAdd('materialGroupForm')">保存</el-button>
      <el-button size="small" type="primary" icon="el-icon-refresh" @click.native="handleReset">重置</el-button>
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
            <dsn-input
              v-model.trim="materialGroupForm.materialGroup"
              placeholder="请输入物料组"
              :disabled="isEditResource"
            ></dsn-input>
          </el-form-item>
          <el-form-item label="组别描述">
            <el-input type="textarea" rows="4" v-model.trim="materialGroupForm.groupDes"></el-input>
          </el-form-item>
        </el-form>
        <!-- <el-transfer
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
        </el-transfer> -->
          <div class="operate" style="padding-bottom: 14px"> 
          <el-row>
            <el-col :span="11">
              <dsn-table
                :data="transferData.filter(data => !material1 || data.material.toLowerCase().includes(material1.toLowerCase()))"
                @select="check1"
                @select-all="check1"
              >
                <el-table-column label="关联物料:">
                  <el-table-column type="selection" width="100"></el-table-column>
                  <el-table-column prop="material" label="物料"></el-table-column>
                </el-table-column>
                <el-table-column label>
                  <template slot="header">
                    <dsn-input v-model="material1" placeholder="输入物料搜索" />
                  </template>
                  <!-- <el-table-column label="分类">
                    <template
                      slot-scope="scope"
                    >{{ scope.row.materialLevelFlag == 10 ? '提示' : (scope.row.materialLevelFlag == 20 ? '警告' : '错误') }}</template>
                  </el-table-column> -->
                  <el-table-column prop="materialType" label="物料分类"></el-table-column>
                  <el-table-column prop="materialDes" label="物料描述"></el-table-column>
                  <el-table-column prop="materialRev" label="物料状态"></el-table-column>
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
                :data="untransferData.filter(data => !material2 || data.material.toLowerCase().includes(material2.toLowerCase()))"
                @select="check2"
                @select-all="check2"
              >
                <el-table-column label="待关联物料:">
                  <el-table-column type="selection" width="100"></el-table-column>
                  <el-table-column prop="material" label="物料"></el-table-column>
                </el-table-column>
                <el-table-column label>
                  <template slot="header">
                    <dsn-input v-model="material2" placeholder="输入物料搜索" />
                  </template>
                  <!-- <el-table-column label="分类">
                    <template
                      slot-scope="scope"
                    >{{ scope.row.materialLevelFlag == 10 ? '提示' : (scope.row.materialLevelFlag == 20 ? '警告' : '错误') }}</template>
                  </el-table-column> -->
                  <el-table-column prop="materialType" label="物料分类"></el-table-column>
                  <el-table-column prop="materialDes" label="物料描述"></el-table-column>
                  <el-table-column prop="materialRev" label="物料状态"></el-table-column>
                </el-table-column>
              </dsn-table>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog title="保存" :visible.sync="saveDialog" :width="defaltDialogWidth">
      <span>是否确认保存该条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="handleReset">取 消</el-button>
        <el-button type="primary" @click.native="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import {
  getAllDistinctHttp,
  saveHttp
} from "@/api/material/material.group.api.js";

export default {
  inject: ["defaltDialogWidth"],
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
      // titles: ["未关联物料", "已关联物料"],
      transferData: [],
      untransferData:[],
      value: [],
      cloneForm: [],
      relatived: [],
      unrelatived: [],
      saveDialog: false,
      isEditResource: false,
      selectedList:[],
      selectedList2:[],
      material1:"",
      material2:"",
      cloneUntransferData: [],
      cloneAllocateData: []

    };
  },
  computed: {
    ...mapGetters(["materialGroupList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.cloneList = JSON.parse(JSON.stringify(this.materialGroupList));
    this.materialGroupForm = this.cloneList[0];
    if (this.operateType === "edit") {
      this.isEditResource = true;
      // console.log(JSON.parse(JSON.stringify(this.materialGroupList)),"数据是？")
      this.transferData=this.materialGroupForm.materialList;
      this.untransferData=this.materialGroupForm.outerMaterialList;
      // .forEach(element => {
      //   this.value.push(element.material);
      // });
    }else{
      this.init();
    }
  },
  methods: {
    ...mapMutations(["MATERIALGROUPLIST"]),
    check1(val) {
      this.selectedList = val;
    },
    check2(val) {
      this.selectedList2 = val;
    },
    right() {
      this.untransferData = _.concat(this.untransferData, this.selectedList);
      this.untransferData = _.uniq(this.untransferData);
      this.transferData = _.difference(this.transferData, this.selectedList);
      console.log(this.untransferData, "un");
      this.cloneAllocateData = _.cloneDeep(this.transferData);
    },
    left() {
      this.transferData = _.concat(this.transferData, this.selectedList2);
      this.transferData = _.uniq(this.transferData);
      this.untransferData = _.difference(
        this.untransferData,
        this.selectedList2
      );
      console.log(this.untransferData, "all");
      this.cloneAllocateData = _.cloneDeep(this.transferData);
    },
    init() {
      getAllDistinctHttp().then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.untransferData = res.data;
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
      this.saveDialog=false;
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
      const relatived = this.untransferData;
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
  .showInfo {
    display: flex;
    .right {
      flex: 1;
      .el-form {
        width: 30%;
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
