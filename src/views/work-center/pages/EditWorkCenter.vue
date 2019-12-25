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
							:key="item.workCenter"
							:label="item.workCenter"
							:value="item.workCenter">
						</el-option>
					</el-select>
					<el-table @row-click="handleClick" :row-class-name="tableRowClassName" border :data="this.editList.filter(data => !search || data.workCenter.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
						<el-table-column label="工作中心" prop="workCenter"> </el-table-column>
						<el-table-column label="描述" prop="workCenterDes"> </el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="editForm">
					<el-form :inline="true" :model="editForm" ref="editForm" :rules="rules" class="add-form" :label-width="formLabelWidth">
						<el-form-item label="工作中心:" prop="workCenter">
							<el-input v-model="editForm.workCenter" ></el-input>
						</el-form-item>
						<el-form-item label="描述:" prop="workCenter">
							<el-input v-model="editForm.workCenterDes" ></el-input>
						</el-form-item>
						<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
							<el-tab-pane label="基础信息" name="first">
								<el-row>
									<el-col :span="24">
										<el-form-item label="状态:" prop="status" required>
											<el-select v-model="editForm.status" filterable placeholder="请选择">
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
											<el-select v-model="editForm.type" filterable placeholder="请选择">
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
					mat:'',
				},
			}
		},
		created() {
			this.currentEditItem = this.editList[0]
			this.editForm = this.editList[0]
		},
		methods: {
			goBack() {
				this.$router.push({path:'/work-center/work-center'})
			},
			tableRowClassName({row}) {
				if (row.workCenter == this.currentEditItem.workCenter && row.workCenterDes == this.currentEditItem.workCenterDes) {
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
