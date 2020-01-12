<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 ml30 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
		</div>
		<div class="addForm">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="add-form" :label-width="formLabelWidth">
				<el-form-item label="不合格代码组:" prop="ncGroup" required>
					<el-input v-model="addForm.ncGroup" ></el-input>
				</el-form-item>
				<el-tabs v-model="activeName" type="card">
					<el-tab-pane label="不合格代码组维护" name="first">
						<el-row>
							<el-col :span="24">
								<el-form-item label="描述:" prop="ncGroupDes">
									<el-input v-model="addForm.ncGroupDes" ></el-input>
								</el-form-item>
							</el-col>
						</el-row>
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
					</el-tab-pane>
					<el-tab-pane label="工序" name="second">
						<el-row>
							<el-col :span="24">
								<el-row>
									<el-col :span="8">
										<el-table :data="allocated.filter(data => !operation1 || data.operation.toLowerCase().includes(operation1.toLowerCase()))" @select="check1" @select-all="check1">
											<el-table-column label="已分配工序">
												<el-table-column label="">
													<template slot="header">
														<el-input v-model="operation1" placeholder="输入工序搜索"/>
													</template>
													<el-table-column type="selection" width="100"></el-table-column>
													<el-table-column prop="operation" label="工序"></el-table-column>
													<el-table-column prop="operationDes" label="工序描述"></el-table-column>
													</el-table-column>
											</el-table-column>
										</el-table>
									</el-col>
									<el-col :span="2">
										<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
										<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
									</el-col>
									<el-col :span="8">
										<el-table :data="undistributed.filter(data => !operation2 || data.operation.toLowerCase().includes(operation2.toLowerCase()))" @select="check2" @select-all="check2">
											<el-table-column label="未分配工序">
												<el-table-column label="">
													<template slot="header">
														<el-input v-model="operation2" placeholder="输入工序搜索"/>
													</template>
													<el-table-column type="selection" width="100"></el-table-column>
													<el-table-column prop="operation" label="工序"></el-table-column>
													<el-table-column prop="operationDes" label="工序描述"></el-table-column>
													</el-table-column>
											</el-table-column>
										</el-table>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
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
	import {saveNcGroup, getAllOperation} from '../../../api/nc.group.api'
	import _ from 'lodash';
	export default {
		name:'add-nc-group',
		data() {
			return {
				formLabelWidth:'120px',
				activeName:'first',
				status: [{
					value: true,
					label: '已启用'
				}, {
					value: false,
					label: '未启用'
				}],

				rules: {
					ncGroup: [
            { required: true, message: '请填写不合格代码组名称', trigger: 'blur' }
          ],
					status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
				},
				addForm: {
					ncGroup:'',
					ncGroupDes:'',
					status:'',
					operationList:[],
				},
				undistributed:[],
				allocated:[],
				selectedList:[],
				selectedList2:[],
				operation1:'',
				operation2:'',
				cloneUnallocateData:[],
				cloneAllocateData:[],
			}
		},
		created(){
			getAllOperation().then(data=>{
				console.log(data.data.data)
				this.undistributed = data.data.data
			})
		},
		methods: {
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = {}
						let arr = []
						this.allocated.map(item=>{
							arr.push(item.operation)
						})
						this.addForm.operationList = arr
						params.createList = [this.addForm]
						saveNcGroup(params).then(data => {
							if(data.data.code == 200){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/nc/ncGroup'})
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.allocated = []
			},
			goBack() {
				this.$router.push({path:'/nc/ncGroup'})
			},
			check1(val){
				this.selectedList = val
			},
			check2(val){
				this.selectedList2 = val
			},
			right(){
				this.undistributed = _.concat(this.undistributed,this.selectedList)
				this.undistributed = _.uniq(this.undistributed)
				this.allocated = _.difference(this.allocated,this.selectedList)
				console.log(this.undistributed,'un')
				this.cloneAllocateData = _.cloneDeep(this.allocated)
			},
			left(){
				this.allocated = _.concat(this.allocated,this.selectedList2)
				this.allocated = _.uniq(this.allocated)
				this.undistributed = _.difference(this.undistributed,this.selectedList2)
				console.log(this.undistributed,'all')
				this.cloneAllocateData = _.cloneDeep(this.allocated)
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
	.direction {
		color: #409eff;
		font-size: 40px;
		cursor: pointer;
		text-align: center;
	}
	.mt70 {
		margin-top: 70px;
	}
</style>
