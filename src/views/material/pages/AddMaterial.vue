<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="resetForm('addForm')">重置</el-button>
		</div>
		<div class="addForm">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
				<el-row>
					<el-col :span="8">
						<el-form-item label="物料号:" prop="mat">
							<el-input v-model="addForm.mat"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="版本号:" prop="matRev">
							<el-input v-model="addForm.matRev"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="" prop="currentRev">
							<el-checkbox v-model="addForm.currentRev">当前版本</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="物料描述:" prop="matDes">
							<el-input class="dec" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="addForm.matDes"></el-input>
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
											<el-select v-model="addForm.unit1">
												<el-option
													v-for="item in units"
													:key="item.value"
													:label="item.value"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="单位2:" prop="unit2">
											<el-select v-model="addForm.unit2">
												<el-option
													v-for="item in units"
													:key="item.value"
													:label="item.value"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="单位3:" prop="unit3">
											<el-select v-model="addForm.unit3">
												<el-option
													v-for="item in units"
													:key="item.value"
													:label="item.value"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="投放数量1:" prop="qtyRequired1" required>
											<el-input v-model="addForm.qtyRequired1"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="投放数量2:" prop="qtyRequired2" required>
											<el-input v-model="addForm.qtyRequired2"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="投放数量3:" prop="qtyRequired3" required>
											<el-input v-model="addForm.qtyRequired3"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="材料分类:" prop="matType" required>
											<el-select v-model="addForm.matType">
												<el-option
													v-for="item in options"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="客户:" prop="client" v-if="addForm.matType==3 || addForm.matType==4">
											<el-input v-model="addForm.client"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="客户产品代码:" prop="clientMat" v-if="addForm.matType==3 || addForm.matType==4">
											<el-input v-model="addForm.clientMat"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="供应商:" prop="vebdor" v-if="addForm.matType==1 || addForm.matType==2">
											<el-input v-model="addForm.vebdor"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="供应商物料号:" prop="vebdorMat" v-if="addForm.matType==1 || addForm.matType==2">
											<el-input v-model="addForm.vebdorMat"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="物料状态:" prop="matStatus" required>
											<el-select v-model="addForm.matStatus">
												<el-option
													v-for="item in status"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="创建人/修改人:" prop="modified_user_id">
											<el-input v-model="addForm.modified_user_id" disabled></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="基础属性配置" name="second">
								<el-row>
									<el-col :span="8">
										<el-form-item label="长度:" prop="length">
											<el-input v-model="addForm.length"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="长度误差:" prop="lengthErrorRange">
											<el-input v-model="addForm.lengthErrorRange"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="长度单位:" prop="lengthUnit">
											<el-select v-model="addForm.lengthUnit">
												<el-option
													v-for="item in lengthUnit"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="宽度:" prop="width">
											<el-input v-model="addForm.width"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="宽度误差:" prop="widthErrorRange">
											<el-input v-model="addForm.widthErrorRange"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="宽度单位:" prop="widthUnit">
											<el-select v-model="addForm.widthUnit" placeholder="请选择">
												<el-option
													v-for="item in lengthUnit"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="高度:" prop="thickness">
											<el-input v-model="addForm.thickness"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="高度误差:" prop="thicknessErrorRange">
											<el-input v-model="addForm.thicknessErrorRange"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="高度单位:" prop="thicknessUnit">
											<el-select v-model="addForm.thicknessUnit" placeholder="请选择">
												<el-option
													v-for="item in lengthUnit"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="重量:" prop="weight">
											<el-input v-model="addForm.weight"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="重量误差:" prop="weightErrorRange">
											<el-input v-model="addForm.weightErrorRange"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="重量单位:" prop="weightUnit">
											<el-select v-model="addForm.weightUnit" placeholder="请选择">
												<el-option
													v-for="item in weightUnit"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
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
	import {insertMaterial} from '../../../api/material/material.info.api.js'
	export default {
		name:'add-work-center',
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
				activeName:'first',
				units:[{
					value: 'CELL',
				},{
					value: 'DIE',
				},{
					value: 'GLASS',
				},{
					value: 'PCS',
				},{
					value: 'WAFER',
				}],
				status: [{
					value: true,
					label: '已启用'
				}, {
					value: false,
					label: '未启用'
				}],
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
					matRev:'',
					currentRev:'',
					matDes:'',
					unit1:'',
					unit2:'',
					unit3:'',
					qtyRequired1:'',
					qtyRequired2:'',
					qtyRequired3:'',
					matType:'1',
					client:'',
					clientMat:'',
					vebdor:'',
					vebdorMat:'',
					matStatus:'',
					modified_user_id:'',
					length:'1',
					lengthErrorRange:'1',
					lengthUnit:'1',
					width:'1',
					widthErrorRange:'1',
					widthUnit:'1',
					thickness:'1',
					thicknessErrorRange:'1',
					thicknessUnit:'1',
					weight:'1',
					weightErrorRange:'1',
					weightUnit:'1',
				},
				options: [{
					value: '1',
					label: '辅料'
				}, {
					value: '2',
					label: '原材料'
				}, {
					value: '3',
					label: '半成品'
				}, {
					value: '4',
					label: '成品'
				}],
				lengthUnit: [{
					value: '1',
					label: 'MM'
				},{
					value: '10',
					label: 'CM'
				}],
				weightUnit: [{
					value: '1',
					label: 'g'
				},{
					value: '1000',
					label: 'Kg'
				}],
			}
		},
		methods: {
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.addForm);
						
						// let params={
						// 	material: this.addForm
						// }
						let params = this.addForm
						params.currentRev = this.addForm.currentRev ? 20 : 10
						params.tenantSiteCode = 'test'
						console.log(params,'p')
						// material: JSON.stringify(this.addForm)
						insertMaterial(params).then(data => {
							if(data.data.message == 'success'){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/material/material-info'})
								},1000)
								
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			goBack() {
				this.$router.push({path:'/material/material-info'})
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
