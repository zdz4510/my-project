<template>
  <div class="typeEdit">
    <div class="query">
      <div class="left">
        <el-form
          :model="typeForm"
          :rules="rules"
          ref="typeForm"
          label-width="100px"
          class="typeForm"
        >
          <el-form-item label="设备类型" prop="resourceGroup">
            <el-input
              v-model.trim="typeForm.resourceGroup"
              placeholder="请输入设备类型"
              :disabled="isEditResource"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button size="small" type="warning" @click="handleQuery" disabled>
          查询
        </el-button>
        <el-button size="small" type="info" @click="handleReset">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="success" disabled>
        新增
      </el-button>
      <el-button size="small" type="primary" @click="checkAdd('typeForm')"
        >保存</el-button
      >
      <el-button size="small" type="success" disabled>
        修改
      </el-button>
      <el-button size="small" type="danger" disabled>
        删除
      </el-button>
      <el-button size="small" type="primary" disabled>导出</el-button>
    </div>
    <div class="showInfo">
      <el-form :model="typeForm" label-width="80px">
        <el-form-item label="组别描述">
          <el-input type="textarea" v-model.trim="typeForm.groupDes"></el-input>
        </el-form-item>
      </el-form>
      <el-transfer
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
        <span slot-scope="{ option }"
          >{{ option.resource }} - {{ option.resourceDes }}</span
        >
      </el-transfer>
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
          { required: true, message: "请输入设备类型", trigger: "blur" }
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
    },
    handleQuery() {},
    //重置
    handleReset() {
      this.saveDialog = false;
      this.value = [];
      this.undistributed.forEach(element => {
        this.value.push(element.resource);
      });
    },
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
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
    }
    .right {
      width: 680px;
      padding: 5px 30px;
    }
  }
  .showInfo {
    .el-transfer {
      .el-transfer-panel {
        width: 35%;
      }
    }
  }
}
</style>
