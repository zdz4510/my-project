<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('editForm')">保存</el-button>
		</div>
		<el-row :gutter="20">
			<el-col :span="6">
				<div>
					<el-select v-model="search" clearable class="mtb20" >
						<el-option
							v-for="item in this.editList"
							:key="item.mat"
							:label="item.mat"
							:value="item.mat">
						</el-option>
					</el-select>
					<el-table @row-click="handleClick" :row-class-name="tableRowClassName" border :data="this.editList.filter(data => !search || data.mat.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
						<el-table-column label="mat" prop="mat"> </el-table-column>
						<el-table-column label="matRev" prop="matRev"> </el-table-column>
						<!-- <el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column> -->
					</el-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="editForm">
					<el-form :inline="true" :model="editForm" ref="editForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
						<el-row>
							<el-col :span="8">
								<el-form-item label="物料号:" prop="mat" >
									<el-input v-model="editForm.mat" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="版本号:" prop="matRev" >
									<el-input v-model="editForm.matRev" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="" prop="currentRev">
									<el-checkbox v-model="editForm.currentRev">当前版本</el-checkbox>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="物料描述:" prop="matDes">
									<el-input class="dec" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="editForm.matDes"></el-input>
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
													<el-select v-model="editForm.unit1">
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
													<el-select v-model="editForm.unit2">
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
													<el-select v-model="editForm.unit3">
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
													<el-input v-model="editForm.qtyRequired1"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="投放数量2:" prop="qtyRequired2" required>
													<el-input v-model="editForm.qtyRequired2"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="投放数量3:" prop="qtyRequired3" required>
													<el-input v-model="editForm.qtyRequired3"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="材料分类:" prop="matType" required>
													<el-select v-model="editForm.matType">
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
												<el-form-item label="客户:" prop="client" v-if="editForm.matType==3 || editForm.matType==4">
													<el-input v-model="editForm.client"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="客户产品代码:" prop="clientMat" v-if="editForm.matType==3 || editForm.matType==4">
													<el-input v-model="editForm.clientMat"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="供应商:" prop="vebdor" v-if="editForm.matType==1 || editForm.matType==2">
													<el-input v-model="editForm.vebdor"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="供应商物料号:" prop="vebdorMat" v-if="editForm.matType==1 || editForm.matType==2">
													<el-input v-model="editForm.vebdorMat"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="物料状态:" prop="matStatus" required>
													<el-select v-model="editForm.matStatus">
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
													<el-input v-model="editForm.modified_user_id" disabled></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</el-tab-pane>
									<el-tab-pane label="基础属性配置" name="second">
										<el-row>
											<el-col :span="8">
												<el-form-item label="长度:" prop="length">
													<el-input v-model="editForm.length"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="长度误差:" prop="lengthErrorRange">
													<el-input v-model="editForm.lengthErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="长度单位:" prop="lengthUnit">
													<el-select v-model="editForm.lengthUnit">
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
													<el-input v-model="editForm.width"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="宽度误差:" prop="widthErrorRange">
													<el-input v-model="editForm.widthErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="宽度单位:" prop="widthUnit">
													<el-select v-model="editForm.widthUnit" placeholder="请选择">
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
													<el-input v-model="editForm.thickness"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="高度误差:" prop="thicknessErrorRange">
													<el-input v-model="editForm.thicknessErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="高度单位:" prop="thicknessUnit">
													<el-select v-model="editForm.thicknessUnit" placeholder="请选择">
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
													<el-input v-model="editForm.weight"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="重量误差:" prop="weightErrorRange">
													<el-input v-model="editForm.weightErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="重量单位:" prop="weightUnit">
													<el-select v-model="editForm.weightUnit" placeholder="请选择">
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
			</el-col>
		</el-row>
		
		
	</div>
</template>

<script>
	import {modifyMaterial} from '../../../api/material/material.info.api.js'
	import { mapGetters } from "vuex";
	export default {
		name:'edit-material',
		computed: {
			...mapGetters(["editList"])
		},
		data() {
			var qtyRequired = (rule, value, callback) => {
				var reg = /^\d{1,5}(?:\.\d{1,3})?$/
				if (!reg.test(value)) {
					return callback(new Error('小数点前5位后3位数字;正数'));
				}
				callback()
			};
			return {
				search:'',
				currentEditMat:{},
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
				editForm: {
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
		created() {
			console.log(this.editList,'editlist')
			this.currentEditMat = this.editList[0]
			this.editForm = this.editList[0]
			this.editForm.currentRev = this.editList[0].currentRev == 20 ? true : false
			this.cloneObj = JSON.parse(JSON.stringify(this.editForm));
		},
		methods: {
			change(value){
				console.log(value)
			},
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.editForm);
						
						// let params={
						// 	material: this.editForm
						// }
						let params = this.editForm
						params.currentRev = this.editForm.currentRev ? 20 : 10
						params.tenantSiteCode = 'test'
						console.log(params,'p')
						// material: JSON.stringify(this.editForm)
						
						modifyMaterial([params]).then(data => {
							if(data.data.message == 'success'){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
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
			tableRowClassName({row}) {
				if (row.mat == this.currentEditMat.mat && row.matRev == this.currentEditMat.matRev) {
					return 'success-row';
				} else {
					return '';
				}
			},
			handleClick(row){
				console.log(this.isObjectValueEqual(this.cloneObj, this.editForm))
				this.currentEditMat = row
				this.editForm = row
				this.editForm.currentRev = row.currentRev == 20 ? true : false
			},
			isObjectValueEqual(a, b) {
				var aProps = Object.getOwnPropertyNames(a);
				var bProps = Object.getOwnPropertyNames(b);
				if (aProps.length != bProps.length) {
					return false;
				}
				for (var i = 0; i < aProps.length; i++) {
					var propName = aProps[i]
					var propA = a[propName]
					var propB = b[propName]
					if ((typeof (propA) === 'object')) {
						if (this.isObjectValueEqual(propA, propB)) {
								return true
							} else {
								return false
							}
					} else if (propA !== propB) {
						return false
					}
				}
				return true
			}
		}
	}
</script>

<style scoped lang="scss">
	.operate {
		background: #FFFFFF;
		padding: 10px;
	}
	.editForm {
		background: #FFFFFF;
		padding: 10px;
		.dec {
			width: 756px !important;
		}
	}
	.el-table /deep/ .success-row {
		background: #f0f9eb ;
	}
</style>
