<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
		</div>
		<div class="addForm">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
				<el-row>
					<el-col :span="8">
						<el-form-item label="物料号:" prop="mat">
							<el-input v-model="addForm.mat"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {addData} from '../../../api/base/base.api.js'
	export default {
		name:'',
		data() {
			var qtyRequired = (rule, value, callback) => {
				var reg = /^\d{1,5}(?:\.\d{1,3})?$/
				if (!reg.test(value)) {
					return callback(new Error('小数点前5位后3位数字;正数'));
				}
				callback()
			};
			return {
				formLabelWidth:'120px',
				rules: {
					qtyRequired1: [
						{ validator: qtyRequired, trigger: 'blur' }
					],
					qtyRequired2: [
						{ validator: qtyRequired, trigger: 'blur' }
					],
					qtyRequired3: [
						{ validator: qtyRequired, trigger: 'blur' }
					]
				},
				addForm: {
					mat:'',
				},
			}
		},
		methods: {
			goBack() {
				this.$router.push({path:'/base/base'})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = this.addForm
						addData(params).then(data => {
							if(data.data.message == 'success'){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/base/base'})
								},1000)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
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
</style>
