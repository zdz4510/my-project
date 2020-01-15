<template>
  <div class="unpackEdtit">
    <div class="operation">
      <el-button type="primary" size="small" @click="goback">返回</el-button>
      <el-button type="primary" size="small" @click="saveForm">保存</el-button>
    </div>
    <div class="content">
      <div class="left" v-if="operateType === 'edit'">
        <el-table
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
          :header-cell-style="{ background: '#eef1f6', height: '30px' }"
        >
          <el-table-column prop="mat" label="物料号" width="120"></el-table-column>
          <el-table-column prop="packingClass" label="包装层级" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="tableCon">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <div class="contentWl">
            <el-form-item label="物料号:">
              <el-autocomplete
                class="inline-input"
                v-model="ruleForm.mat"
                :fetch-suggestions="this.querySearch"
                placeholder="请输入物料号"
              ></el-autocomplete>
            </el-form-item>
          </div>
          <div class="formcon">
            <el-form-item label="容器编号规则：" prop="mainNumberType">
              <el-select
                v-model="ruleForm.mainNumberType"
                placeholder="手动/调取编号规则"
                @change="changemainNumberType"
              >
                <el-option
                  v-for="item in this.optionMainNumberType"
                  :label="item.name"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="容器编号规则版本：">
              <el-select v-model="ruleForm.mainNumberRev" v-bind:disabled="this.mainNumberRev">
                <el-option label="v1.0" value="v1.0"></el-option>
                <el-option label="v1.1" value="v1.1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="容器容纳数：" prop="accommodateNumber">
              <el-input v-model="ruleForm.accommodateNumber"></el-input>
            </el-form-item>
            <el-form-item label="容器标签打印：" prop="labelPrinting">
              <el-select v-model="ruleForm.labelPrinting">
                <el-option label="是" value="true" key="1"></el-option>
                <el-option label="否" value="false" key="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formcon">
            <el-form-item label="容器类型：" prop="containerType">
              <el-input v-model="ruleForm.containerType"></el-input>
            </el-form-item>
            <el-form-item label="包装层级：" prop="packingClass">
              <el-input v-model="ruleForm.packingClass" v-bind:disabled="this.packingClassAble"></el-input>
            </el-form-item>
            <el-form-item label="被容器编号规则：" prop="subordinationNumberType">
              <el-select v-model="ruleForm.region" @change="changesubordinationNumberType">
                <el-option label="LOT" value="30"></el-option>
                <el-option label="手动" value="20"></el-option>
                <el-option label="调取编号规则" value="10"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="被容器编号规则版本：" prop="name">
              <el-select
                v-model="ruleForm.subordinationNumberRev"
                v-bind:disabled="this.subordinationNumberRev"
              >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMaterialList,
  addPackagingConfiguration
} from "@/api/dc/unpack.api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      queryList: [],
      params: {
        mat: "",
        deleteFlag: "",
        currentPage: 1,
        pageSize: 10,
        tenantSiteCode: "",
        matRev: ""
      },
      mainNumberRev: false,
      packingClassAble: false,
      subordinationNumberRev: false,
      ruleForm: {
        mat: "",
        labelPrinting: "false"
      },
      optionMainNumberType: [
        { name: "手动", value: true },
        { name: "调取编号规则", value: false }
      ],
      rules: {
        mainNumberType: [
          { required: true, message: "输入框不允许为空", trigger: "blur" }
        ],
        accommodateNumber: [
          { required: true, message: "输入框不允许为空", trigger: "blur" }
        ],
        labelPrinting: [
          { required: true, message: "输入框不允许为空", trigger: "blur" }
        ],
        containerType: [
          { required: true, message: "输入框不允许为空", trigger: "blur" }
        ],
        packingClass: [
          { required: true, message: "输入框不允许为空", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: "只允许输入正整数"
          }
        ] //只能是数字
      }
    };
  },
  created() {
    this.operateType = this.$route.query.operateType;
    console.log(this.operateType, "123132");
    this.init();
  },
  computed: {
    ...mapGetters(["unpackEditList"])
  },
  methods: {
    init() {
      this.fetchInfo();
      if (this.operateType === "edit") {
        this.cloneList = JSON.parse(JSON.stringify(this.unpackEditList));
        console.log(this.cloneList, "cloneList");
        this.tableData = this.cloneList;
        this.roleForm = this.cloneList[0];
      }
    },
    saveForm() {
      console.log(this.ruleForm);
      const payload = {
        ...this.ruleForm
      };
      //   if (this.operateType === "add") {
      addPackagingConfiguration(payload).then(data => {
        const res = data.data;
        this.$message({
          message: res.code === 200 ? "操作成功" : res.message,
          type: res.code === 200 ? "success" : "error"
        });
        this.saveDialog = false;
        if (res.code === 200) {
          this.goback();
        }
        return;
      });
      //   } else {
      // const newPayload = { ...payload, id: this.roleForm.id };
      // updateRoleHttp(newPayload).then(data => {
      //   const res = data.data;
      //   this.$message({
      //     message: res.code === 200 ? "操作成功" : res.message,
      //     type: res.code === 200 ? "success" : "error"
      //   });
      //   this.saveDialog = false;
      //   if (res.code === 200) {
      //     this.$router.push({
      //       path: "/base/role"
      //     });
      //   }
      //   return;
      // });
    },
    goback() {
      this.$router.push({ name: "unpack" });
    },
    fetchInfo(par) {
      const payload = par || this.params;
      getMaterialList(payload).then(res => {
        const {
          data: { data }
        } = res;
        this.queryList = data.data.map(item => {
          return {
            ...item,
            value: item.material
          };
        });
      });
    },
    querySearch(queryString, cb) {
      const payload = {
        ...this.params,
        mat: queryString
      };
      this.fetchInfo(payload);
      var results = queryString
        ? this.queryList.filter(this.createFilter(queryString))
        : this.queryList;
      //   // 调用 callback 返回建议列表的数据
      console.log(results, "resultsss");
      cb(results);
    },
    changemainNumberType(val) {
      if (val) {
        this.mainNumberRev = true;
        this.ruleForm.mainNumberRev = "";
      } else {
        this.mainNumberRev = false;
      }
    },
    createFilter(queryString) {
      return item => {
        console.log(item.material, queryString, "itemmm");
        return (
          item.material.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    changesubordinationNumberType(val) {
      if (val === "30") {
        this.ruleForm.packingClass = 1;
        this.packingClassAble = true;
      } else if (val === "20") {
        this.ruleForm.packingClass = "";
        this.packingClassAble = false;
        this.subordinationNumberRev = true;
        this.ruleForm.labelPrintingsubordinationNumberRev = "";
      } else {
        this.ruleForm.packingClass = "";
        this.subordinationNumberRev = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: 10px 30px;
  display: flex;
  .tableCon {
    margin-right: 30px;
    display: flex;
    .left {
      width: "30%";
    }
  }
}
.contentWl {
  width: 100%;
}
.demo-ruleForm {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .formcon {
    width: 50%;
  }
}
.operation {
  padding: 10px 30px;
}
</style>