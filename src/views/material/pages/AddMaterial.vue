<template>
  <div>
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
      <dsn-button size="small" type="primary" @click.native="save('addForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="resetForm('addForm')">重置</dsn-button>
    </div>
    <div class="addForm">
      <el-form
        :inline="true"
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="form-style"
        label-position="right"
        :label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="物料号:" prop="material" required>
              <dsn-input v-model="addForm.material"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版本号:" prop="materialRev" required>
              <dsn-input v-model="addForm.materialRev"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label prop="currentRev">
              <el-checkbox v-model="addForm.currentRev">当前版本</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="物料描述:" prop="materialDes">
              <dsn-input
                class="dec"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6}"
                v-model="addForm.materialDes"
              ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="基础信息管理" name="first">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="单位1:" prop="unit1">
                      <dsn-select v-model="addForm.unit1">
                        <el-option
                          v-for="item in units"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="单位2:" prop="unit2">
                      <dsn-select v-model="addForm.unit2">
                        <el-option
                          v-for="item in units"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="单位3:" prop="unit3">
                      <dsn-select v-model="addForm.unit3">
                        <el-option
                          v-for="item in units"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="投放数量1:" prop="qtyRequired1" required>
                      <dsn-input v-model="addForm.qtyRequired1"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="投放数量2:" prop="qtyRequired2" required>
                      <dsn-input v-model="addForm.qtyRequired2"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="投放数量3:" prop="qtyRequired3" required>
                      <dsn-input v-model="addForm.qtyRequired3"></dsn-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="材料分类:" prop="materialType" required>
                      <dsn-select v-model="addForm.materialType">
                        <el-option
                          v-for="item in options"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="客户:"
                      prop="client"
                      v-if="addForm.materialType=='成品' || addForm.materialType=='半成品'"
                    >
                      <dsn-input v-model="addForm.client"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="客户产品代码:"
                      prop="clientmaterial"
                      v-if="addForm.materialType=='成品' || addForm.materialType=='半成品'"
                    >
                      <dsn-input v-model="addForm.clientmaterial"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="供应商:"
                      prop="vebdor"
                      v-if="addForm.materialType=='辅料' || addForm.materialType=='原材料'"
                    >
                      <dsn-input v-model="addForm.vebdor"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="供应商物料号:"
                      prop="vendorMaterial"
                      v-if="addForm.materialType=='辅料' || addForm.materialType=='原材料'"
                    >
                      <dsn-input v-model="addForm.vendorMaterial"></dsn-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="物料状态:" prop="materialStatus" required>
                      <dsn-select v-model="addForm.materialStatus">
                        <el-option
                          v-for="item in status"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="8">
										<el-form-item label="创建人/修改人:" prop="modified_user_id">
											<dsn-input v-model="addForm.modified_user_id" disabled></dsn-input>
										</el-form-item>
                  </el-col>-->
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="基础属性配置" name="second">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="长度:" prop="length">
                      <dsn-input v-model="addForm.length"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="长度误差:" prop="lengthErrorRange">
                      <dsn-input v-model="addForm.lengthErrorRange"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="长度单位:" prop="lengthUnit">
                      <dsn-select v-model="addForm.lengthUnit">
                        <el-option
                          v-for="item in lengthUnit"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="宽度:" prop="width">
                      <dsn-input v-model="addForm.width"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="宽度误差:" prop="widthErrorRange">
                      <dsn-input v-model="addForm.widthErrorRange"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="宽度单位:" prop="widthUnit">
                      <dsn-select v-model="addForm.widthUnit" placeholder="请选择">
                        <el-option
                          v-for="item in lengthUnit"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="高度:" prop="thickness">
                      <dsn-input v-model="addForm.thickness"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="高度误差:" prop="thicknessErrorRange">
                      <dsn-input v-model="addForm.thicknessErrorRange"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="高度单位:" prop="thicknessUnit">
                      <dsn-select v-model="addForm.thicknessUnit" placeholder="请选择">
                        <el-option
                          v-for="item in lengthUnit"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="重量:" prop="weight">
                      <dsn-input v-model="addForm.weight"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="重量误差:" prop="weightErrorRange">
                      <dsn-input v-model="addForm.weightErrorRange"></dsn-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="重量单位:" prop="weightUnit">
                      <dsn-select v-model="addForm.weightUnit" placeholder="请选择">
                        <el-option
                          v-for="item in weightUnit"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label"
                        ></el-option>
                      </dsn-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { insertMaterial } from "../../../api/material.info.api.js";
export default {
  name: "add-material",
  data() {
    var qtyRequired = (rule, value, callback) => {
      var reg = /^\d{1,5}(?:\.\d{1,3})?$/;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("小数点前5位后3位正数"));
      }
      callback();
    };
    var materialRule = (rule, value, callback) => {
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("只能为字母、数字、-、_、/组成"));
      }
      if ((value + "").length > 30) {
        return callback(new Error("只能输入30位以内"));
      }
      this.addForm.material = value.toUpperCase();
      callback();
    };
    var materialRevRule = (rule, value, callback) => {
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("只能为字母、数字、-、_、/组成"));
      }
      if ((value + "").length > 30) {
        return callback(new Error("只能输入30位以内"));
      }
      this.addForm.materialRev = value.toUpperCase();
      callback();
    };
    return {
      formLabelWidth: "120px",
      activeName: "first",
      units: [
        {
          value: "CELL"
        },
        {
          value: "DIE"
        },
        {
          value: "GLASS"
        },
        {
          value: "PCS"
        },
        {
          value: "WAFER"
        }
      ],
      status: [
        {
          value: "true",
          label: "已启用"
        },
        {
          value: "false",
          label: "未启用"
        }
      ],
      rules: {
        material: [
          { required: true, validator: materialRule, trigger: "blur" }
        ],
        materialRev: [
          { required: true, validator: materialRevRule, trigger: "blur" }
        ],
        qtyRequired1: [
          { required: true, validator: qtyRequired, trigger: "blur" }
        ],
        qtyRequired2: [
          { required: true, validator: qtyRequired, trigger: "blur" }
        ],
        qtyRequired3: [
          { required: true, validator: qtyRequired, trigger: "blur" }
        ]
      },
      addForm: {
        material: "",
        materialRev: "",
        currentRev: true,
        materialDes: "",
        unit1: "",
        unit2: "",
        unit3: "",
        qtyRequired1: "",
        qtyRequired2: "",
        qtyRequired3: "",
        materialType: "辅料",
        client: "",
        clientmaterial: "",
        clientMaterial: "",
        vebdor: "",
        vendorMaterial: "",
        materialStatus: "",
        modified_user_id: "",
        length: "0",
        lengthErrorRange: "0",
        lengthUnit: "mm",
        width: "0",
        widthErrorRange: "0",
        widthUnit: "mm",
        thickness: "0",
        thicknessErrorRange: "0",
        thicknessUnit: "mm",
        weight: "0",
        weightErrorRange: "0",
        weightUnit: "g"
      },
      options: [
        {
          value: "1",
          label: "辅料"
        },
        {
          value: "2",
          label: "原材料"
        },
        {
          value: "3",
          label: "半成品"
        },
        {
          value: "4",
          label: "成品"
        }
      ],
      lengthUnit: [
        {
          value: "1",
          label: "MM"
        },
        {
          value: "10",
          label: "CM"
        }
      ],
      weightUnit: [
        {
          value: "1",
          label: "g"
        },
        {
          value: "1000",
          label: "kg"
        }
      ]
    };
  },
  created() {
    this.addForm.unit1 = this.addForm.unit2 = this.addForm.unit3 = "PCS";
    this.addForm.materialType = "成品";
    this.addForm.materialStatus = "已启用";
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addForm);
          let params = this.addForm;
          params.tenantSiteCode = "test";
          insertMaterial(params).then(data => {
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.$router.push({ path: "/material/materialInfo" });
            } else {
              this.$message.error(data.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.addForm = {
        material: "",
        materialRev: "",
        currentRev: "",
        materialDes: "",
        unit1: "",
        unit2: "",
        unit3: "",
        qtyRequired1: "",
        qtyRequired2: "",
        qtyRequired3: "",
        materialType: "辅料",
        client: "",
        clientMaterial: "",
        vebdor: "",
        vendorMaterial: "",
        materialStatus: "",
        modified_user_id: "",
        length: "1",
        lengthErrorRange: "1",
        lengthUnit: "MM",
        width: "1",
        widthErrorRange: "1",
        widthUnit: "MM",
        thickness: "1",
        thicknessErrorRange: "1",
        thicknessUnit: "MM",
        weight: "1",
        weightErrorRange: "1",
        weightUnit: "g"
      };
      // this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.push({ path: "/material/materialInfo" });
    }
  }
};
</script>

<style scoped lang="scss">
.operate {
  background: #ffffff;
  padding: 10px;
}
.addForm {
  background: #ffffff;
  padding: 10px;
  .dec {
    width: 756px !important;
  }
}
</style>
