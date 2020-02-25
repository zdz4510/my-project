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
        <el-form-item label="规则类型:" prop="sequenceType">
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
            <el-form-item label="固定字符串:" prop="fixedString">
              <dsn-input v-model="addForm.fixedString"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'V'">
          <el-col :span="24">
            <el-form-item label="可替换参数:" prop="varType">
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
            >
              <dsn-input
                v-model="addForm.dateTimeFormat"
                placeholder="请输入日期格式(YYYY-MM-DD)"
              >
              </dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="长度:" prop="length">
              <dsn-input v-model="addForm.length"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进制:" prop="numBase">
              <dsn-input v-model="addForm.numBase" ></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="增量:" prop="numIncrease">
              <dsn-input v-model="addForm.numIncrease"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="初始值:" prop="initValue">
              <dsn-input class="uppercaseInput" v-model="addForm.initValue"></dsn-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="当前值:" prop="currentValue">
              <dsn-input class="uppercaseInput"  v-model="addForm.currentValue"></dsn-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终值:" prop="finalValue">
              <dsn-input class="uppercaseInput"  v-model="addForm.finalValue"></dsn-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row v-if="addForm.sequenceType == 'S'">
          <el-col :span="12">
            <el-form-item label="顺序:" prop="orders">
              <el-radio-group v-model="addForm.orders">
                <el-radio  label="ASC">顺序</el-radio>
                <el-radio  label="DESC">反序</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="循环:" prop="reset">
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
    const fiexedStringRule = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z_/-]{1,}$/;
      if (value.length > 30) {
        return callback(new Error("只能填写数字，字母，-，_,/;30个字符以内"));
      }
      if (!reg.test(value)) {
        return callback(new Error("只能填写数字，字母，-，_,/;30个字符以内"));
      }
      callback();
    };
    const numBaseRule = (rule, value, callback) => {
      const reg = /^[0-9]{1,}$/;
      if (!reg.test(value) || value > 36 || value < 2) {
        return callback(new Error("进制只能填写2-36之间的数字"));
      }
      callback();
    };
    const lengthRule = (rule, value, callback) => {
      const reg = /(^[1-9]([0-9]*)$|^[0-9]$)/;
      if (!reg.test(value) || !value) {
        return callback(new Error("长度只能填写数字"));
      }
      callback();
    };
    const initValueRule = (rule, value, callback) => {
      const { length, numBase } = this.addForm;
      const ration = this.numration.slice(0, numBase);
      
      const numBaseFlag = value.split('').every(item => {
        return ration.includes(item)
      })

      if (value.length > parseInt(length)) {
        return callback(new Error(`初始值${value}和长度不匹配`))
      }
      
      if (!numBaseFlag) {
        return callback(new Error(`初始值${value}和进制不匹配`))
      }

      callback()
    };
    const currentValueRule = (rule, value, callback) => {
      const { length, numBase } = this.addForm;
      const ration = this.numration.slice(0, numBase);
      
      if (!value) return callback()

      const numBaseFlag = value.split('').every(item => {
        return ration.includes(item)
      })

      if (value.length > parseInt(length)) {
        return callback(new Error(`当前值${value}和长度不匹配`))
      }
      
      if (!numBaseFlag) {
        return callback(new Error(`当前值${value}和进制不匹配`))
      }

      callback()
    };
    const finalValueRule = (rule, value, callback) => {
      const { length, numBase } = this.addForm;
      const ration = this.numration.slice(0, numBase);
      
      const numBaseFlag = value.split('').every(item => {
        return ration.includes(item)
      })

      if (value.length > parseInt(length)) {
        return callback(new Error(`终值${value}和长度不匹配`))
      }
      
      if (!numBaseFlag) {
        return callback(new Error(`终值${value}和进制不匹配`))
      }

      callback()
    };
    const dateTimeFormatRule = (rule, value, callback) => {
      const reg = /^[yMmDdHhSs:-]{1,}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的日期格式"));
      }
      callback();
    }
    return {
      formLabelWidth: "120px",
      numration: [
        '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
      ],
      rules: {
        sequenceType: [
          {
            required:true,
            message: '请选择规则类型',
            trigger: ['change', 'blur']
          }
        ],
        fixedString: [
          { required: true, message:'请输入固定字符串', trigger: "change" },
          { validator: fiexedStringRule, trigger: "change"}
        ],
        dateTimeFormat: [
          {
            required: true,
            message: '请输入时间格式',
            trigger: ['blur', 'change']
          }, {
            validator: dateTimeFormatRule,
            trigger: ['blur', 'change']
          }
        ],
        varType: [
          {
            required: true, message: '请选择可替换参数', trigger: ['blur', 'change']
          }
        ],
        length: [
          {
            required: true,
            message: '请输入长度',
            trigger: ['change', 'blur']
          }, {
            validator: lengthRule,
            trigger: ['change', 'blur']
          }
        ],
        numBase: [
          {
            required: true,
            message: '请选择进制',
            trigger: ['change', 'blur']
          }, {
            validator: numBaseRule,
            trigger: ['change', 'blur']
          }
        ],
        numIncrease: [
          {
            required: true,
            message: '请输入增量',
            trigger: ['change', 'blur']
          }
        ],
        initValue: [
          {
            required: true,
            message: '请输入初始值',
            trigger: ['change', 'blur']
          }, {
            validator: initValueRule,
            trigger: ['change', 'blur']
          }
        ],
        currentValue: [
          {
            validator: currentValueRule,
            trigger: ['change', 'blur']
          }
        ],
        finalValue: [
          {
            required: true,
            message: '请输入终值',
            trigger: ['change', 'blur']
          }, {
            validator: finalValueRule,
            trigger: ['change', 'blur']
          }
        ],
        reset: [
          {
            required: true,
            message: '请选择循环',
            trigger: ['change', 'blur']
          }
        ],
      },
      addForm: {
        sequenceType: "",
        fixedString: "",
        varType: "",
        dateTimeFormat: "",
        length: "",
        initValue: "",
        finalValue: "",
        numIncrease: "1",
        numBase: 10,
        reset: "NEVER",
        orders: "ASC"
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
  created() {
  },
  methods: {
    close() {
      this.$emit('handleClose');
      this.$refs['addForm'].resetFields();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const searchForm = JSON.parse(sessionStorage.getItem("searchForm"));
          const { addForm: {
            sequenceType,
            fixedString,
            varType,
            dateTimeFormat,
            ...SProps
          } } = this;
          const obj = {};
          switch(sequenceType) {
            case 'F': 
              Object.assign(obj, {...searchForm}, {
                sequenceType,
                fixedString
              })
           
              break;
            case 'V':
              Object.assign(obj, {...searchForm}, {
                sequenceType,
                varType
              })
              break;
            case 'D':
             Object.assign(obj, {...searchForm}, {
                sequenceType,
                dateTimeFormat
              })
              break;
            case 'S':
              Object.assign(obj, {...searchForm}, {
                sequenceType,
                ...SProps
              })
              break;
          }
          this.$refs[formName].resetFields();
          this.$emit('handleSave', 'add', obj);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onChange(val) {
      // this.addForm = {};
      this.addForm.sequenceType = val;
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
    .uppercaseInput {
      input {
        text-transform: uppercase;
      }
    }
  }
}
</style>
