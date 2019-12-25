<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="resetForm('addForm')">重置</el-button>
		</div>
		<div class="addForm">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="add-form" :label-width="formLabelWidth">
				<el-form-item label="工作中心:" prop="workCenter">
					<el-input v-model="addForm.workCenter" ></el-input>
				</el-form-item>
				<el-form-item label="描述:" prop="workCenter">
					<el-input v-model="addForm.workCenterDes" ></el-input>
				</el-form-item>
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="基础信息" name="first">
						<el-row>
							<el-col :span="24">
								<el-form-item label="状态:" prop="status" required>
									<el-select v-model="addForm.status" filterable placeholder="请选择">
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
								<el-form-item label="类别:" prop="type" required>
									<el-select v-model="addForm.type" filterable placeholder="请选择">
										<el-option
											v-for="item in type"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="工作中心维护" name="second">
						<el-transfer
							filterable
							:filter-method="filterMethod"
							:titles="['未分配工作中心', '已分配工作中心']"
							v-model="value"
							:data="data">
						</el-transfer>
					</el-tab-pane>
					<el-tab-pane label="用户" name="third">
						<el-transfer
							filterable
							:filter-method="filterMethod"
							:titles="['未分配用户', '已分配用户']"
							v-model="value"
							:data="data">
						</el-transfer>
					</el-tab-pane>
				</el-tabs>
				<div slot="footer" class="dialog-footer">
					<!-- <el-button @click="handleReset(workCenterForm)">重 置</el-button> -->
					<el-button >重 置</el-button>
					<el-button type="primary" @click="dialog = false">确 定</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {saveWorkCenter} from '../../../api/material/work.center.api.js'
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
					value: '1',
					label: '已启用'
				}, {
					value: '2',
					label: '未启用'
				}],
				type: [{
					value: '1',
					label: '车间'
				}, {
					value: '2',
					label: '产线'
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
						let params = this.addForm
						console.log(params,'p')
						// work-center: JSON.stringify(this.addForm)
						saveWorkCenter(params).then(data => {
							if(data.data.message == 'success'){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/work-center/work-center'})
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
				this.$router.push({path:'/work-center/work-center'})
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
