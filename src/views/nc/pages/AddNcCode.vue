<template>
	<div>
		<div class="operate mtb10">
			<dsn-button  size="small" type="primary" @click.native="goBack">返回</dsn-button>
			<dsn-button  size="small" type="primary" @click.native="save('addForm')">保存</dsn-button>
			<dsn-button  size="small" type="primary" @click.native="resetForm('addForm')">重置</dsn-button>
		</div>
		<div class="addForm">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="add-form" :label-width="formLabelWidth">
				<el-form-item label="不合格代码:" prop="ncCode" required>
					<dsn-input v-model="addForm.ncCode" ></dsn-input>
				</el-form-item>
				<el-tabs v-model="activeName" type="card">
					<el-tab-pane label="不合格代码维护" name="first">
						<el-row>
							<el-col :span="24">
								<el-form-item label="描述:" prop="ncCodeDes">
									<dsn-input v-model="addForm.ncCodeDes" ></dsn-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="状态:" prop="status" required>
									<dsn-select v-model="addForm.status" filterable placeholder="请选择">
										<el-option
											v-for="item in status"
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
								<el-form-item label="是否需要关闭:" prop="needClose" >
									<el-checkbox v-model="addForm.needClose"></el-checkbox>
								</el-form-item>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="不合格组" name="second">
						<el-row>
							<el-col :span="24">
								<el-row>
									<el-col :span="8">
										<dsn-table :data="allocated.filter(data => !ncGroup1 || data.ncGroup.toLowerCase().includes(ncGroup1.toLowerCase()))" @select="check1" @select-all="check1">
											<el-table-column label="已分配不合格组">
												<el-table-column label="">
													<template slot="header">
														<dsn-input v-model="ncGroup1" placeholder="输入不合格组搜索"/>
													</template>
													<el-table-column type="selection" width="100"></el-table-column>
													<el-table-column prop="ncGroup" label="不合格组"></el-table-column>
													<el-table-column prop="ncGroupDes" label="不合格组描述"></el-table-column>
													</el-table-column>
											</el-table-column>
										</dsn-table>
									</el-col>
									<el-col :span="2">
										<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
										<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
									</el-col>
									<el-col :span="8">
										<dsn-table :data="undistributed.filter(data => !ncGroup2 || data.ncGroup.toLowerCase().includes(ncGroup2.toLowerCase()))" @select="check2" @select-all="check2">
											<el-table-column label="未分配不合格组">
												<el-table-column label="">
													<template slot="header">
														<dsn-input v-model="ncGroup2" placeholder="输入不合格组搜索"/>
													</template>
													<el-table-column type="selection" width="100"></el-table-column>
													<el-table-column prop="ncGroup" label="不合格组"></el-table-column>
													<el-table-column prop="ncGroupDes" label="不合格组描述"></el-table-column>
													</el-table-column>
											</el-table-column>
										</dsn-table>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
				<div slot="footer" class="dialog-footer">
					<!-- <dsn-button @click.native="handleReset(workCenterForm)">重 置</dsn-button> -->
					<dsn-button >重 置</dsn-button>
					<dsn-button type="primary" @click.native="dialog = false">确 定</dsn-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {saveNcCode, getEnableNcGroup} from '../../../api/nc.code.api'
	import _ from 'lodash';
	export default {
		name:'add-nc-code',
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
					ncCode: [
            { required: true, message: '请填写不合格代码名称', trigger: 'blur' }
					],
					status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
				},
				addForm: {
					ncCode:'',
					ncCodeDes:'',
					status:'',
					ncGroupList:[],
				},
				undistributed:[],
				allocated:[],
				selectedList:[],
				selectedList2:[],
				ncGroup1:'',
				ncGroup2:'',
				cloneUnallocateData:[],
				cloneAllocateData:[],
			}
		},
		created(){
			getEnableNcGroup().then(data=>{
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
							arr.push(item.ncGroup)
						})
						this.addForm.ncGroupList = arr
						params.createList = [this.addForm]
						saveNcCode(params).then(data => {
							if(data.data.code == 200){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/nc/ncCode'})
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
				this.addForm.needClose = false
			},
			goBack() {
				this.$router.push({path:'/nc/ncCode'})
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
