<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 ml30 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
		</div>
		<div class="addForm">
			<el-form :model="addForm" :inline="true" ref="addForm" :label-width="formLabelWidth" :rules="rules">
				<el-form-item label="规则类型:" prop="sequenceType" required>
					<el-select v-model="addForm.sequenceType" placeholder="请选择" @change=onChange>
						<el-option
							v-for="item in ruleTypes"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-row v-if="addForm.sequenceType == 'F'">
					<el-col :span="24">
						<el-form-item label="固定字符串:" prop="fixedString" required>
							<el-input v-model="addForm.fixedString"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.sequenceType == 'V'">
					<el-col :span="24">
						<el-form-item label="可替换参数:" prop="varType" required>
							<el-select v-model="addForm.varType" placeholder="请选择">
								<el-option
									v-for="item in replaceable"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="时间格式化:" prop="dateTimeFormat" v-if="addForm.sequenceType == 'D'" required>
							<el-date-picker
								v-model="addForm.dateTimeFormat"
								type="datetime"
								value-format="yyyy-MM-dd HH:mm:ss"
								placeholder="选择日期时间">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.sequenceType == 'S'">
					<el-col :span="12">
						<el-form-item label="长度:" prop="length" required>
							<el-input v-model="addForm.length"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="进制:" prop="numBase" required>
							<el-input-number v-model="addForm.numBase" :min="2" :max="36" label=""></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.sequenceType == 'S'">
					<el-col :span="12">
						<el-form-item label="增量:" prop="numIncr" required>
							<el-input v-model="addForm.numIncr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="初始值:" prop="initValue" required>
							<el-input v-model="addForm.initValue"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.sequenceType == 'S'">
					<el-col :span="12">
						<el-form-item label="终值:" prop="finalValue" required>
							<el-input v-model="addForm.finalValue"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="循环:" prop="reset" required>
							<el-select v-model="addForm.reset" placeholder="请选择">
								<el-option
									v-for="item in circle"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.sequenceType == 'S'">
					<el-col :span="12">
						<el-form-item label="顺序:" prop="order" >
							<el-radio-group v-model="addForm.order">
								<el-radio-button label="顺序"></el-radio-button>
								<el-radio-button label="反序"></el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {saveNextNumber} from '../../../api/next.number.api'
	export default {
		name:'add-next-number',
		data() {
			var fiexedStringRequired = (rule, value, callback) => {
				var reg = /^[0-9a-zA-Z_/-]{1,}$/
				if(!value || value.length > 30){
					return callback(new Error('只能填写数字，字母，-，_,/;30个字符以内'));
				}
				if (!reg.test(value)) {
					return callback(new Error('只能填写数字，字母，-，_,/;30个字符以内'));
				}
				callback()
			};
			return {
				formLabelWidth:'120px',
				rules: {
					fixedString:[
						{ required:true,validator: fiexedStringRequired, trigger: 'change' }
					],
					status:[
						{ required:true,message:'请选择状态', trigger: 'change' }
					],
					resourceGroup:[
						{ required:true,message:'请选择设备组', trigger: 'change' }
					]
				},
				addForm: {
					sequenceType:'',
					fixedString:'',
					varType:'',
					dateTimeFormat:'',
					length:'',
					initValue:'',
					finalValue:'',
					numIncr:'',
					numBase:'',
					reset:'',
					order:'',
				},
				status:[{
					label:'已启用',
					value:true
				},{
					label:'未启用',
					value:false
				}],
				resourceGroup:[],
				certOperation:[],


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

			}
		},
		created() {

		},
		methods: {
			goBack() {
				this.$router.push({path:'/nextNumber/nextNumber'})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let searchForm = JSON.parse(sessionStorage.getItem('searchForm'))
						let obj = {...this.addForm,...searchForm}
						let params = {
							createList:[obj],
							updateList:[],
							deleteList:[]
						}
						saveNextNumber(params).then(data => {
							if(data.data.code == 200){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/nextNumber/nextNumber'})
								},1000)
							}else{
								this.$message.error(data.data.message)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			onChange(val){
				this.addForm = {}
				this.addForm.sequenceType = val
				console.log(this.addForm,'sea')
			}
		},
		computed : {
			fixedString:{
				get: function(){
					return this.addForm.fixedString;
				},
				set : function(val){
					this.addForm.fixedString = val.toUpperCase();
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.operate {
		background: #FFFFFF;
		padding: 10px;
	}
	.addForm {
		background: #FFFFFF;
		padding: 10px;
		.dec {
			width: 756px !important;
		}
	}
	.el-textarea /deep/ .el-textarea__inner{
		width: 300px;
	}
</style>
