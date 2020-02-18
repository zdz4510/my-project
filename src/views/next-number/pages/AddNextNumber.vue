<template>
  <div class="add-next-number">
    
    <div class="addForm">
      <el-form
        :model="addForm"
        :inline="true"
        ref="addForm"
        :label-width="formLabelWidth"
        :rules="rules"
      >
        <el-form-item label="规则类型:" prop="sequenceType" required>
          <dsn-select v-model="addForm.sequenceType" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in ruleTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </dsn-select>
        </el-form-item>
        <el-row v-if="addForm.sequenceType == 'F'">
          <el-col :span="24">
            <el-form-item label="固定字符串:" prop="fixedString" required>
              <dsn-input v-model="addForm.fixedString"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'V'">
          <el-col :span="24">
            <el-form-item label="可替换参数:" prop="varType" required>
              <dsn-select v-model="addForm.varType" placeholder="请选择">
                <el-option
                  v-for="item in replaceable"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="时间格式化:"
              prop="dateTimeFormat"
              v-if="addForm.sequenceType == 'D'"
              required
            >
              <el-date-picker
                v-model="addForm.dateTimeFormat"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="长度:" prop="length" required>
              <dsn-input v-model="addForm.length"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进制:" prop="numBase" required>
              <el-input-number v-model="addForm.numBase" :min="2" :max="36" label></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="增量:" prop="numIncr" required>
              <dsn-input v-model="addForm.numIncr"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="初始值:" prop="initValue" required>
              <dsn-input v-model="addForm.initValue"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="终值:" prop="finalValue" required>
              <dsn-input v-model="addForm.finalValue"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="循环:" prop="reset" required>
              <dsn-select v-model="addForm.reset" placeholder="请选择">
                <el-option
                  v-for="item in circle"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="顺序:" prop="order">
              <el-radio-group v-model="addForm.order">
                <el-radio-button label="顺序"></el-radio-button>
                <el-radio-button label="反序"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operate">
      <dsn-button size="small" type="primary" @click.native="close">取消</dsn-button>
      <dsn-button size="small" type="primary" @click.native="save('addForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="resetForm('addForm')">重置</dsn-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-next-number",
  data() {
    var fiexedStringRequired = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z_/-]{1,}$/;
      if (!value || value.length > 30) {
        return callback(new Error("只能填写数字，字母，-，_,/;30个字符以内"));
      }
      if (!reg.test(value)) {
        return callback(new Error("只能填写数字，字母，-，_,/;30个字符以内"));
      }
      callback();
    };
    return {
      formLabelWidth: "120px",
      rules: {
        fixedString: [
          { required: true, validator: fiexedStringRequired, trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        resourceGroup: [
          { required: true, message: "请选择设备组", trigger: "change" }
        ]
      },
      addForm: {
        sequenceType: "",
        fixedString: "",
        varType: "",
        dateTimeFormat: "",
        length: "",
        initValue: "",
        finalValue: "",
        numIncr: "",
        numBase: "",
        reset: "",
        order: ""
      },
      status: [
        {
          label: "已启用",
          value: true
        },
        {
          label: "未启用",
          value: false
        }
      ],
      resourceGroup: [],
      certOperation: [],

      circle: [
        {
          value: "NEVER",
          label: "从不"
        },
        {
          value: "DAY",
          label: "每天"
        },
        {
          value: "WEEK",
          label: "每周"
        },
        {
          value: "MONTH",
          label: "每月"
        },
        {
          value: "YEAR",
          label: "每年"
        }
      ],
      ruleTypes: [
        {
          value: "F",
          label: "固定字符串"
        },
        {
          value: "V",
          label: "可替换参数"
        },
        {
          value: "D",
          label: "时间"
        },
        {
          value: "S",
          label: "自增长序列"
        }
      ],
      replaceable: [
        {
          value: "MAT",
          label: "物料"
        },
        {
          value: "MAT_REV",
          label: "物料版本"
        },
        {
          value: "MAT_GROUP",
          label: "物料组"
        },
        {
          value: "SHOP_ORDER",
          label: "工单"
        },
        {
          value: "SITE",
          label: "工厂"
        },
        {
          value: "OP_USER",
          label: "操作执行人员ID"
        }
      ]
    };
  },
  created() {},
  methods: {
    close() {
      this.$emit('handleClose');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const searchForm = JSON.parse(sessionStorage.getItem("searchForm"));
          const obj = { ...this.addForm, ...searchForm };
          this.$emit('handleSave', 'add', obj);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onChange(val) {
      this.addForm = {};
      this.addForm.sequenceType = val;
      console.log(this.addForm, "sea");
    }
  },
  computed: {
    fixedString: {
      get: function() {
        return this.addForm.fixedString;
      },
      set: function(val) {
        this.addForm.fixedString = val.toUpperCase();
      }
    }
  }
};
</script>

<style lang="scss">
.add-next-number {
  .operate {
    background: #ffffff;
    padding: 10px;
  }
  .addForm {
    background: #ffffff;
    padding: 10px;
  }
}
</style>
