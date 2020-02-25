<template>
  <div class="edit-next-number">
		<el-row :gutter="20">
			<el-col :span="6">
				<div class="editList">
					<dsn-select
						style="margin-bottom: 30px"
						v-model="value"
						clearable
						placeholder="请选择"
						:disabled="selectIsDisabled"
						@clear="handleClearSelect"
						@change="handleChangeOption"
						ref="select"
					>
						<el-option
							v-for="item in cloneList"
							:key="item.sequence"
							:label="item.sequence"
							:value="item.sequence" >
						</el-option>
					</dsn-select>
					<dsn-table ref="editTable" :data="cloneList" row-key="sequence"  border highlight-current-row style="width: 100%" @row-click="handleCurrentChange" >
						<el-table-column label="序号" prop="sequence"> </el-table-column>
						<el-table-column label="类型" prop="sequenceType"> </el-table-column>
					</dsn-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="workList">
					<el-form
						:rules="rules"
						:model="editForm"
						:inline="true"
						ref="editForm"
						:label-width="formLabelWidth"
					>
						<el-form-item label="规则类型:" prop="sequenceType">
							<dsn-select v-model="editForm.sequenceType" placeholder="请选择" @change="onChange">
								<el-option
									v-for="item in ruleTypes"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</dsn-select>
						</el-form-item>
						<el-row v-if="editForm.sequenceType == 'F'">
							<el-col :span="24">
								<el-form-item label="固定字符串:" prop="fixedString" >
									<dsn-input v-model="editForm.fixedString"></dsn-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'V'">
							<el-col :span="24">
								<el-form-item label="可替换参数:" prop="varType" >
									<dsn-select v-model="editForm.varType" placeholder="请选择">
										<el-option
											v-for="item in replaceable"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</dsn-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="时间格式化:" prop="dateTimeFormat" v-if="editForm.sequenceType == 'D'" >
									<dsn-input
										v-model="editForm.dateTimeFormat"
										placeholder="请输入日期格式(YYYY-MM-DD)"
									>
              </dsn-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="长度:" prop="length" >
									<dsn-input v-model="editForm.length"></dsn-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="进制:" prop="numBase" >
									<dsn-input v-model="editForm.numBase" label=""></dsn-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="增量:" prop="numIncrease" >
									<dsn-input v-model="editForm.numIncrease"></dsn-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="初始值:" prop="initValue" >
									<dsn-input v-model="editForm.initValue"></dsn-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="当前值:" prop="currentValue" >
									<dsn-input v-model="editForm.currentValue"></dsn-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="终值:" prop="finalValue" >
									<dsn-input v-model="editForm.finalValue"></dsn-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="顺序:" prop="orders" >
									<el-radio-group v-model="editForm.orders">
										<el-radio  label="ASC">顺序</el-radio>
										<el-radio  label="DESC">反序</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="循环:" prop="reset" >
									<dsn-select v-model="editForm.reset" placeholder="请选择">
										<el-option
											v-for="item in circle"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</dsn-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-col>
		</el-row>
		<div class="operate">
      <dsn-button size="small" type="primary" @click.native="close">取消</dsn-button>
      <dsn-button size="small" type="primary" @click.native="save('editForm')">保存</dsn-button>
      <dsn-button size="small" type="primary" @click.native="resetForm('editForm')">重置</dsn-button>
    </div>
	</div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapMutations } from "vuex";
export default {
  name:'edit-next-number',
  computed: {
    ...mapGetters(["nextNumberEditList"])
  },
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
      const { length, numBase } = this.editForm;
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
      const { length, numBase } = this.editForm;
      const ration = this.numration.slice(0, numBase);

			if (!value) return callback();
			
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
      const { length, numBase } = this.editForm;
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
			numration: [
        '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
      ],
      formLabelWidth: "100px",
      cloneModify: {}, //  克隆的表单的一份副本
      editForm: {
				
			},
			
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
			circle: [{
					value: 'NEVER',
					label: '从不'
				},{
					value: 'DAY',
					label: '每天'
				},{
					value: 'WEEK',
					label: '每周'
				},{
					value: 'MONTH',
					label: '每月'
				},{
					value: 'YEAR',
					label: '每年'
				}],
				ruleTypes: [{
					value: 'F',
					label: '固定字符串'
				},{
					value: 'V',
					label: '可替换参数'
				},{
					value: 'D',
					label: '时间'
				},{
					value: 'S',
					label: '自增长序列'
				}],
				replaceable: [{
					value: 'MAT',
					label: '物料'
				},{
					value: 'MAT_REV',
					label: '物料版本'
				},{
					value: 'MAT_GROUP',
					label: '物料组'
				},{
					value: 'SHOP_ORDER',
					label: '工单'
				},{
					value: 'SITE',
					label: '工厂'
				},{
					value: 'OP_USER',
					label: '操作执行人员ID'
				}],
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
			selectIsDisabled: false,
			
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
		});
	},
	watch: {
		'$store.state.nextNumberEdit.nextNumberEditList'() {
			console.log("watch")
			this.init()
		}
	},
  methods: {
    ...mapMutations(["SETNEXTNUMBEREDITLIST"]),
    //初始化的操作
    init() {
      if (this.nextNumberEditList.length > 0) {
        this.cloneList = _.cloneDeep(this.nextNumberEditList); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = _.cloneDeep(this.editForm); // modify 的副本
        this.setCurrent(this.editForm); // 设置选中第一行
        this.currentRow = this.editForm; // 设置初始currentRow 为第一行
      }
		},
		close() {
      this.$emit('handleClose');
    },
    //清除下拉列表时触发
    handleClearSelect() {
      this.init();
    },
    //选中下拉列表时触发
    handleChangeOption(row) {
      if(row==''){
        return ;
      }
      //过滤数组
      const tempList = this.cloneList.filter(item => item["sequence"] == row);
      // this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = _.cloneDeep(this.editForm);
      this.setCurrent(tempList[0]);
    },
    //设置某一行被选中
    setCurrent(row) {
      this.$refs.editTable.setCurrentRow(row);
    },

    findItemByKey(arr, keyV, kerStr) {
      let temp = arr.filter(item => item[kerStr] == keyV);
      if (temp.length > 0) {
        return temp[0];
      }
      return null;
    },
    // 点击某一行选中后操作的状态你
    handleCurrentChange(currentRow) {
      this.oldRow = this.currentRow;
      this.currentRow = currentRow;
      this.editForm = currentRow;
      this.cloneModify = _.cloneDeep(this.editForm);
    },
    //选中某一行
    //返回操作
		goBack() {
			this.$router.push({path:'/nextNumber/nextNumber'})
		},
    /**
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["sequence"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.selectIsDisabled = false;
      //数据还原
      if(this.cloneList.length<this.nextNumberEditList.length && this.value!=''){
          this.cloneList = _.cloneDeep([this.cloneModify]);
          this.editForm = this.cloneList[0];
          return ;
      }
      this.cloneList = _.cloneDeep(this.nextNumberEditList);  //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.sequence;
        let item = this.findItemByKey(this.cloneList, code, "sequence");
        if (item) {
          this.setCurrent(item);
        }
        this.editForm = item;
      }
    },
    //保存操作
    save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log('clones', this.cloneList)
          this.$emit('handleSave', 'edit', this.cloneList);
				}
			});
		},
		resetForm() {
			this.init()
		},
    onChange(val){
			// this.editForm = {}
			this.editForm.sequenceType = val
		}
	},
};
</script>

<style scoped lang="scss">
.edit-next-number{
	.operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
		border-radius: 4px;
  }
	.editList, .workList {
    background: #fff;
    min-height: 450px;
    padding: 10px;
		border-radius: 4px;
  }
}
</style>
