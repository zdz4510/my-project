<template>
  <div class="typeEdit">
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="handleBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="checkAdd('typeForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="handleReset">重置</dsn-button>
    </div>

    <div class="operate" style="padding-bottom: 14px">
      <div class="right">
        <el-form
          :inline="true"
          :model="typeForm"
          :rules="rules"
          ref="typeForm"
          class="typeForm"
        >
          <el-form-item label="设备类型" prop="resourceGroup">
            <dsn-input
              v-model.trim="typeForm.resourceGroup"
              placeholder="请输入设备类型"
              :disabled="isEditResource"
            ></dsn-input>
          </el-form-item>
          <el-form-item label="组别描述">
            <dsn-input type="textarea" rows="2" v-model.trim="typeForm.groupDes"></dsn-input>
          </el-form-item>
        </el-form>
        <el-transfer
          style="width: 100%"
          ref="transfer"
          filterable
          filter-placeholder="请输入设备编号"
          v-model="value"
          :data="transferData"
          :titles="titles"
          :props="{
            key: 'resource',
            label: 'resource',
            resourceDes: 'resourceDes'
          }"
        >
          <span slot-scope="{ option }">{{ option.resource }} - {{ option.resourceDes }}</span>
        </el-transfer>
      </div>
    </div>
    <el-dialog title="保存" :visible.sync="saveDialog" width="30%">
      <span>是否确认保存该条数据？</span>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click.native="saveDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click.native="handleSave">确 定</dsn-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import { getInformationHttp } from "../../../api/device/type.api";
import {
  getInformationHttp,
  updateResourceGroupHttp,
  insertResourceGroupHttp
} from "@/api/device/type.api.js";

export default {
  data() {
    return {
      operateType: "",
      typeForm: {
        //设备类型
        resourceGroup: "",
        //组别描述
        groupDes: ""
      },
      rules: {
        resourceGroup: [
          { required: true, message: "请输入设备类型", trigger: "change" }
        ]
      },
      //穿梭框
      titles: ["已绑定设备编号", "未绑定设备编号"],
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
    ...mapGetters(["typeList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    console.log(this.operateType);
    this.cloneList = JSON.parse(JSON.stringify(this.typeList));
    this.typeForm = this.cloneList[0];
    this.init();
    if (this.operateType === "edit") {
      this.isEditResource = true;
    }
  },
  methods: {
    ...mapMutations(["SETTYPELIST"]),
    init() {
      const data = {
        resourceGroup: this.typeForm.resourceGroup
      };
      console.log(this.operateType);
      if (this.operateType === "add") {
        getInformationHttp().then(data => {
          const res = data.data;
          console.log(res);
          if (res.code === 200) {
            const list = res.data;
            this.allocated = list.allocated;
            this.undistributed = list.undistributed;
            //合并数组
            this.transferData = [...this.allocated, ...this.undistributed];
            this.undistributed.forEach(element => {
              this.value.push(element.resource);
            });
            console.log(this.transferData);
            return;
          }
          this.$message({
            message: res.message,
            type: "warning"
          });
        });
        return;
      }
      if (this.operateType === "edit") {
        getInformationHttp(data).then(data => {
          const res = data.data;
          console.log(res);
          if (res.code === 200) {
            const list = res.data;
            this.allocated = list.allocated;
            this.undistributed = list.undistributed;
            //合并数组
            this.transferData = [...this.allocated, ...this.undistributed];
            this.undistributed.forEach(element => {
              this.value.push(element.resource);
            });
            console.log(this.transferData);
            return;
          }
          this.$message({
            message: res.message,
            type: "warning"
          });
        });
        return;
      }
    },
    //返回
    handleBack() {
      this.selectionList = [];
      this.SETTYPELIST(this.selectionList);
      this.$router.push({
        path: "/device/deviceType"
      });
    },
    //重置
    handleReset() {
      this.saveDialog = false;
      this.value = [];
      this.undistributed.forEach(element => {
        this.value.push(element.resource);
      });
      if (this.operateType === "add") {
        this.typeForm.resourceGroup = "";
        this.typeForm.groupDes = "";
      }
      if (this.operateType === "edit") {
        const tempList = JSON.parse(JSON.stringify(this.typeList));
        this.typeForm = tempList[0];
      }
    },
    //保存前验证表单
    checkAdd(formName) {
      console.log(this.typeForm.resourceGroup === "");
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
        resourceList.push(element.resource);
      });
      console.log(this.typeForm.resourceGroup);
      //工资级别代码未输入
      if (this.typeForm.resourceGroup === "") {
        this.$message({
          message: "设备类型不能为空",
          type: "warning"
        });
        return;
      }
      const data = {
        groupDes: this.typeForm.groupDes,
        resourceGroup: this.typeForm.resourceGroup,
        resourceList: resourceList
      };
      if (this.operateType === "edit") {
        updateResourceGroupHttp(data).then(data => {
          const res = data.data;
          console.log(res);
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.SETTYPELIST([]);
            this.$router.push({ path: "/device/deviceType" });
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
        insertResourceGroupHttp(data).then(data => {
          const res = data.data;
          console.log(res);
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.SETTYPELIST([]);
            this.$router.push({ path: "/device/deviceType" });
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
.typeEdit {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
		border-radius: 4px;
    .el-transfer {
      .el-transfer-panel {
        width: 40%;
      }
    }
  }
/*   .showInfo {
    .right {
      flex: 1;
      .el-form {
        width: 40%;
      }
      .el-transfer {
        .el-transfer-panel {
          width: 25%;
        }
      }
    }
  } */
}
</style>
