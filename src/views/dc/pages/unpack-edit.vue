<template>
  <div class="unpackEdit">
    <div class="operate">
      <el-button type="primary" size="small" @click="goback">返回</el-button>
      <el-button type="primary" size="small" @click="checkBeforeSave">保存</el-button>
      <el-button type="primary" size="small" @click="handleReset">重置</el-button>
    </div>
    <div class="operate">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo-ruleForm"
      >
        <div class="contentWl">
          <el-form-item label="物料号:" prop="mat">
            <el-autocomplete
              class="inline-input"
              size="small"
              v-model="ruleForm.mat"
              :fetch-suggestions="this.querySearch"
              placeholder="请输入物料号"
              :disabled="this.operateType==='edit'"
            ></el-autocomplete>
          </el-form-item>
        </div>
        <div class="formcon">
          <el-row>
            <el-col :span="8">
              <el-form-item label="容器编号规则：" prop="mainNumberType">
                <dsn-select
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
                </dsn-select>
              </el-form-item>
              <el-form-item label="容器编号规则版本：" prop="mainNumberRev">
                <dsn-select
                  v-model="ruleForm.mainNumberRev"
                  :disabled="this.mainNumberRev"
                  placeholder="请选择容器编号规则版本"
                >
                  <el-option label="v1.0" value="v1.0"></el-option>
                  <el-option label="v1.1" value="v1.1"></el-option>
                </dsn-select>
              </el-form-item>
              <el-form-item label="容器容纳数：" prop="accommodateNumber">
                <dsn-input v-model="ruleForm.accommodateNumber" placeholder="请选择容器容纳数"></dsn-input>
              </el-form-item>
              <el-form-item label="容器标签打印：" prop="labelPrinting">
                <dsn-select v-model="ruleForm.labelPrinting" placeholder="请选择容器标签打印">
                  <el-option label="是" :value="true" key="1"></el-option>
                  <el-option label="否" :value="false" key="2"></el-option>
                </dsn-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="容器类型：" prop="containerType">
                <dsn-input v-model="ruleForm.containerType" placeholder="请选择容器类型"></dsn-input>
              </el-form-item>
              <el-form-item label="包装层级：" prop="packingClass">
                <dsn-input
                  v-model="ruleForm.packingClass"
                  :disabled="this.packingClassAble"
                  placeholder="请选择包装层级"
                ></dsn-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="被容器编号规则：" prop="subordinationNumberType">
              <dsn-select
                v-model="ruleForm.subordinationNumberType"
                @change="changesubordinationNumberType"
                placeholder="请选择被容器编号规则"
              >
                <el-option label="LOT" value="30"></el-option>
                <el-option label="手动" value="20"></el-option>
                <el-option label="调取编号规则" value="10"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="被容器编号规则版本：" prop="subordinationNumberRev">
              <dsn-select
                v-model="ruleForm.subordinationNumberRev"
                v-bind:disabled="this.subordinationNumberRev"
                placeholder="请选择被容器编号规则版本"
              >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  getMaterialList,
  addPackagingConfiguration,
  updatePackagingConfiguration
} from "@/api/dc/unpack.api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      queryList: [],
      oldPackClass: "",
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
        mainNumberType: "",
        mainNumberRev: "",
        accommodateNumber: "",
        labelPrinting: false,
        containerType: "",
        packingClass: "",
        subordinationNumberType: "",
        subordinationNumberRev: ""
      },
      optionMainNumberType: [
        { name: "手动", value: true },
        { name: "调取编号规则", value: false }
      ],
      rules: {
        mainNumberType: [
          { required: true, message: "容器编号规则不允许为空", trigger: "blur" }
        ],
        accommodateNumber: [
          { required: true, message: "容器容纳数不允许为空", trigger: "blur" }
        ],
        labelPrinting: [
          { required: true, message: "容器标签打印不允许为空", trigger: "blur" }
        ],
        containerType: [
          { required: true, message: "容器类型不允许为空", trigger: "blur" }
        ],
        packingClass: [
          { required: true, message: "包装层级不允许为空", trigger: "blur" },
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
    this.init();
  },
  computed: {
    ...mapGetters(["unpackEditList"])
  },
  methods: {
    init() {
      this.fetchInfo();
      if (this.operateType === "edit") {
        const tempString = JSON.stringify(this.unpackEditList).replace(
          "null",
          `""`
        );
        this.cloneList = JSON.parse(tempString);
        this.ruleForm = this.cloneList[0];
        this.oldPackClass = this.ruleForm.packingClass;
        this.isEditVal(this.ruleForm.subordinationNumberType);
        this.changemainNumberType(this.ruleForm.mainNumberType);
      }
    },
    checkBeforeSave() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.saveForm();
        } else {
          return false;
        }
      });
    },
    saveForm() {
      const payload = {
        ...this.ruleForm
      };
      if (this.operateType === "add") {
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
      } else {
        const oldClass = this.oldPackClass;
        const params = {
          ...this.ruleForm,
          packingClassNew: this.ruleForm.packingClass,
          packingClass: oldClass
        };
        updatePackagingConfiguration(params).then(data => {
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
      }
    },
    handleCurrentChange(val) {
      this.ruleForm = val;
      this.oldPackClass = this.ruleForm.packingClass;
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
    isEditVal(val) {
      if (val === "30") {
        this.ruleForm.packingClass = 1;
        this.packingClassAble = true;
      } else if (val === "20") {
        this.packingClassAble = false;
        this.subordinationNumberRev = true;
        this.ruleForm.labelPrintingsubordinationNumberRev = "";
      } else {
        this.ruleForm.packingClass = "";
        this.subordinationNumberRev = false;
      }
    },
    changesubordinationNumberType(val) {
      this.isEditVal(val);
    },
    handleReset() {
      if (this.operateType === "add") {
        this.$refs["ruleForm"].resetFields();
      }
      if (this.operateType === "edit") {
        this.cloneList = JSON.parse(this.tempString);
        this.ruleForm = this.cloneList[0];
      }
    }
  }
};
</script>
<style lang="scss" >
.unpackEdit {
  .operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-radius: 4px;
    .workCertificateFormTop {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>