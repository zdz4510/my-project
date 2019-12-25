<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="save('editForm')">保存</el-button>
		</div>
		<el-row :gutter="20">
			<el-col :span="6">
				<div>
					<el-select v-model="search" clearable class="mtb20" >
						<el-option
							v-for="item in this.editList"
							:key="item.operation"
							:label="item.operation"
							:value="item.operation">
						</el-option>
					</el-select>
					<el-table @row-click="handleClick" :row-class-name="tableRowClassName" border :data="this.editList.filter(data => !search || data.operation.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
						<el-table-column label="operation" prop="operation"> </el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="editForm">
					<el-form :inline="true" :model="editForm" ref="editForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
						<el-row>
							<el-col :span="8">
								<el-form-item label="工序:" prop="operation">
									<el-input v-model="editForm.operation"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="描述:" prop="operationDes">
									<el-input maxlength="80" show-word-limit type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editForm.operationDes"> </el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
									<el-tab-pane label="基础信息" name="first">
										<el-row>
											<el-col :span="24">
												<el-form-item label="状态:" prop="status">
													<el-select v-model="editForm.status">
														<el-option
															v-for="item in status"
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
												<el-form-item label="报告步骤:" prop="reportingStep">
													<el-input v-model="editForm.reportingStep"> </el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="24">
												<el-form-item label="设备组:" prop="resourceGroup" >
													<el-select v-model="editForm.resourceGroup">
														<el-option
															v-for="item in resourceGroup"
															:key="item.resourceGroup"
															:label="item.resourceGroup"
															:value="item.resourceGroup">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="24">
												<el-form-item label="上岗证:" prop="certOperation" >
													<el-select v-model="editForm.certOperation" >
														<el-option
															v-for="item in certOperation"
															:key="item.value"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
									</el-tab-pane>
									<el-tab-pane label="自定义数据" name="second">
										数据字段，数据属性
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
	import {updateData} from '../../../api/base/base.api.js'
	import { mapGetters } from "vuex";
	export default {
		name:'',
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
				activeName:'first',
				search:'',
				currentEditItem:{},
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
				editForm: {
					// mat:'',
				},
			}
		},
		created() {
			this.currentEditItem = this.editList[0]
			this.editForm = this.editList[0]
		},
		methods: {
			goBack() {
				this.$router.push({path:'/operation-maintain/operation-maintain'})
			},
			tableRowClassName({row}) {
				if (row.operation == this.currentEditItem.operation ) {
					return 'success-row';
				} else {
					return '';
				}
			},
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = this.editForm
						updateData(params).then(data => {
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
			handleClick(row){
				this.currentEditItem = row
				this.editForm = row
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
