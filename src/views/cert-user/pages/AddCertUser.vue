<template>
	<div>
		<div class="operate mtb10">
			<dsn-button  size="small" type="primary" @click="goBack">返回</dsn-button>
			<dsn-button  size="small" type="primary" @click="save('addForm')">保存</dsn-button>
			<dsn-button  size="small" type="primary" @click="resetForm('addForm')">重置</dsn-button>
		</div>
		<div class="addForm">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
				<el-row>
					<el-col :span="8">
						<el-form-item label="用户:" prop="user">
							<dsn-input v-model="addForm.user"></dsn-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="姓名:" prop="name">
							<dsn-input v-model="addForm.name"></dsn-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-tabs v-model="activeName" type="card">
							<el-tab-pane label="证明分配" name="first">
								<el-row>
									<el-col :span="24">
										<el-row>
											<el-col :span="8">
												<dsn-table :data="allocateData.filter(data => !cert1 || data.cert.toLowerCase().includes(cert1.toLowerCase()))" @select="check1" @select-all="check1">
													<el-table-column label="上岗证:">
														<el-table-column type="selection" width="100"></el-table-column>
														<el-table-column prop="cert" label="上岗证"></el-table-column>
													</el-table-column>
													<el-table-column label="">
														<template slot="header">
															<dsn-input v-model="cert1" placeholder="输入上岗证搜索"/></template>
														<el-table-column prop="certDes" label="上岗证描述"></el-table-column>
													</el-table-column>
												</dsn-table>
											</el-col>
											<el-col :span="2">
												<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
												<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
											</el-col>
											<el-col :span="8">
												<dsn-table :data="unallocateData.filter(data => !cert2 || data.cert.toLowerCase().includes(cert2.toLowerCase()))" @select="check2" @select-all="check2">
													<el-table-column label="上岗证:">
														<el-table-column type="selection" width="100"></el-table-column>
														<el-table-column prop="cert" label="上岗证"></el-table-column>
													</el-table-column>
													<el-table-column label="">
														<template slot="header">
															<dsn-input v-model="cert2" placeholder="输入上岗证搜索" />
														</template>
														<el-table-column prop="certDes" label="上岗证描述"></el-table-column>
													</el-table-column>
												</dsn-table>
											</el-col>
										</el-row>
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
	</div>
</template>

<script>
	import {saveData, getAllCert} from '../../../api/cert.user.api'
	import _ from 'lodash'
	export default {
		name:'',
		data() {
			return {
				activeName:'first',
				formLabelWidth:'120px',
				rules: {
				},
				addForm: {
					user:'',
					name:'',
					certUserList:[],
				},
				cert1:'',
				cert2:'',
				selectedList:[],
				selectedList2:[],
				allocateData:[],
				unallocateData:[],
				cloneUnallocateData:[],
				cloneAllocateData:[],
			}
		},
		created(){
			getAllCert().then(data=>{
				this.unallocateData = data.data.data
			})
		},
		methods: {
			goBack() {
				this.$router.push({path:'/certUser/certUser'})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.allocateData=[];
			},
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = this.addForm
						let arr = []
						this.allocateData.map(item=>{
							arr.push(item.cert)
						})
						params.certUserList = arr
						saveData({updateList:[params]}).then(data => {
							if(data.data.message == 'success'){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/certUser/certUser'})
								},1000)
							}
							else{
								this.$message({
									type: 'warning',
									message:data.data.message 
								});
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			check1(val){
				this.selectedList = val
			},
			check2(val){
				this.selectedList2 = val
			},
			right(){
				this.unallocateData = _.concat(this.unallocateData,this.selectedList)
				this.unallocateData = _.uniq(this.unallocateData)
				this.allocateData = _.difference(this.allocateData,this.selectedList)
				console.log(this.unallocateData,'un')
				this.cloneAllocateData = _.cloneDeep(this.allocateData)
			},
			left(){
				this.allocateData = _.concat(this.allocateData,this.selectedList2)
				this.allocateData = _.uniq(this.allocateData)
				this.unallocateData = _.difference(this.unallocateData,this.selectedList2)
				console.log(this.unallocateData,'all')
				this.cloneAllocateData = _.cloneDeep(this.allocateData)
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
