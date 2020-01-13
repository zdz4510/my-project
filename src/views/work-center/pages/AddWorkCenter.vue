<template>
	<div>
		<div class="operate mtb10">
			<el-button class="mr25 ml30 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
		</div>
		<div class="addForm">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
				<el-row>
					<el-col :span="8">
						<el-form-item label="工作中心:" prop="workCenter" required>
							<el-input v-model="addForm.workCenter"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="描述:" prop="workCenterDes">
							<el-input v-model="addForm.workCenterDes"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-tabs v-model="activeName" type="card">
							<el-tab-pane label="基础信息" name="first">
								<el-row>
									<el-col :span="24">
										<el-form-item label="状态:" prop="status" required>
											<el-select v-model="addForm.status">
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
										<el-form-item label="类别:" prop="workCenterType" required>
											<el-select v-model="addForm.workCenterType">
												<el-option
													v-for="item in workCenterType"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="工作中心关系维护" name="second">
								<el-row>
									<el-col :span="24">
										<el-row>
											<el-col :span="8">
												<el-table :data="allocateData.filter(data => !workCenter1 || data.workCenter.toLowerCase().includes(workCenter1.toLowerCase()))" @select="check1" @select-all="check1">
													<el-table-column label="工作中心:">
														<el-table-column type="selection" width="55"></el-table-column>
														<el-table-column prop="workCenter" label="已分配工作中心"></el-table-column>
													</el-table-column>
													<el-table-column label="">
														<template slot="header">
															<el-input v-model="workCenter1" placeholder="输入工作中心搜索"/></template>
														<el-table-column prop="workCenterDes" label="工作中心描述"></el-table-column>
													</el-table-column>
												</el-table>
											</el-col>
											<el-col :span="2">
												<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
												<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
											</el-col>
											<el-col :span="8">
												<el-table :data="unallocateData.filter(data => !workCenter2 || data.workCenter.toLowerCase().includes(workCenter2.toLowerCase()))" @select="check2" @select-all="check2">
													<el-table-column label="工作中心:">
														<el-table-column type="selection" width="55"></el-table-column>
														<el-table-column prop="workCenter" label="未分配工作中心"></el-table-column>
													</el-table-column>
													<el-table-column label="">
														<template slot="header">
															<el-input v-model="workCenter2" placeholder="输入工作中心搜索" />
														</template>
														<el-table-column prop="workCenterDes" label="工作中心描述"></el-table-column>
													</el-table-column>
												</el-table>
											</el-col>
										</el-row>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="用户" name="three">
								<el-row>
									<el-col :span="24">
										<el-row>
											<el-col :span="8">
												<el-table :data="allocateUser.filter(data => !workCenter1 || data.workCenter.toLowerCase().includes(workCenter1.toLowerCase()))" @select="check1" @select-all="check1">
													<el-table-column label="用户:">
														<el-table-column type="selection" width="55"></el-table-column>
														<el-table-column prop="workCenterRelation" label="已分配用户"></el-table-column>
													</el-table-column>
													<el-table-column label="">
														<template slot="header">
															<el-input v-model="workCenter1" placeholder="输入用户搜索"/></template>
														<el-table-column prop="workCenterDes" label="用户描述"></el-table-column>
													</el-table-column>
												</el-table>
											</el-col>
											<el-col :span="2">
												<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
												<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
											</el-col>
											<el-col :span="8">
												<el-table :data="unallocateUser.filter(data => !workCenter2 || data.workCenter.toLowerCase().includes(workCenter2.toLowerCase()))" @select="check2" @select-all="check2">
													<el-table-column label="用户:">
														<el-table-column type="selection" width="55"></el-table-column>
														<el-table-column prop="workCenter" label="未分配用户"></el-table-column>
													</el-table-column>
													<el-table-column label="">
														<template slot="header">
															<el-input v-model="workCenter2" placeholder="输入用户搜索" />
														</template>
														<el-table-column prop="workCenterDes" label="用户描述"></el-table-column>
													</el-table-column>
												</el-table>
											</el-col>
										</el-row>
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
	import {getAllList, saveWorkCenter} from '../../../api/work.center.api'
	import _ from 'lodash';
	export default {
		name:'add-work-center',
		data() {
			return {
				activeName:'first',
				formLabelWidth:'150px',
				workCenter1:'',
				workCenter2:'',
				rules: {
					workCenter: [
						{ required:true,message:'请填写工作中心名称', trigger: 'blur' }
					],
					workCenterDes: [
						{ required:true,message:'请填写工作中心描述', trigger: 'blur' }
					],
					status: [
						{ required:true,message:'请选择状态', trigger: 'change' }
					],
					workCenterType: [
						{ required:true,message:'请选择类别', trigger: 'change' }
					],
				},
				addForm: {
					workCenter:'',
					workCenterDes:'',
					workCenterRelation:[],
					tenantSiteCode: "test",
					workCenterType:'',
					status:'',
				},
				selectedList:[],
				selectedList2:[],
				allocateData:[],
				unallocateData:[],
				allocateUser:[],
				unallocateUser:[],
				status: [{
					value: '1',
					label: '已启用'
				}, {
					value: '2',
					label: '未启用'
				}],
				workCenterType: [{
					value: '1',
					label: '车间'
				}, {
					value: '2',
					label: '产线'
				}],
				cloneUnallocateData:[],
				cloneAllocateData:[],
			}
		},
		created(){
			getAllList({workCenter:''}).then(data=>{
				this.unallocateData = data.data.data
			})
		},
		methods: {
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let arr = []
						this.allocateData.map(item=>{
							arr.push(item.workCenter)
						})
						this.addForm.workCenterRelation = arr
						let params = {
							createList:[{
								status: this.addForm.status,
								workCenterType: this.addForm.workCenterType,
								workCenterDes:this.addForm.workCenterDes,
								workCenter:this.addForm.workCenter,
								workCenterRelation: arr
							}]
						}
						console.log(params,'ppp')
						saveWorkCenter(params).then(data=>{
							if(data.data.code == 200){
								this.$message.success('保存成功')
								this.$router.push({path:'/workCenter/workCenter'})
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
				this.allocateData = []
			},
			goBack() {
				this.$router.push({path:'/workCenter/workCenter'})
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
			getUnallocate(){
				console.log('ss')
				if(this.select2){
					this.unallocateData =this.cloneUnallocateData
					this.unallocateData = this.unallocateData.filter(item=>{
						if(this.input2){
							return item.userType == this.select2 && item.informUserId.indexOf(this.input2) > -1
						}else{
							return item.userType == this.select2
						}
					})
				}else{
					this.unallocateData =this.cloneUnallocateData
					this.unallocateData = this.unallocateData.filter(item=>{
						if(this.input2.length>0){
							return item.informUserId.indexOf(this.input2) > -1
						}else{
							return true
						}
					})
				}
			},
			getAllocate(){
				console.log('ds')
				if(this.select1){
					this.allocateData =this.cloneAllocateData
					this.allocateData = this.allocateData.filter(item=>{
						if(this.input1){
							return item.userType == this.select1 && item.informUserId.indexOf(this.input1) > -1
						}else{
							return item.userType == this.select1
						}
					})
				}else{
					console.log(this.cloneAllocateData,'d')
					this.allocateData =this.cloneAllocateData
					this.allocateData = this.allocateData.filter(item=>{
						if(this.input1.length>0){
							return item.informUserId.indexOf(this.input1) > -1
						}else{
							return true
						}
					})
				}
			},
			searchUnallocate(val){
				console.log(val,this.workCenter2,'dd')

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
	.input-form {
		margin-left: 20px;
	}
	.el-select /deep/ .el-input {
    width: 200px;
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
