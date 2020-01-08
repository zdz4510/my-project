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
						<el-form-item label="事件编号:" prop="alarm" required>
							<el-input v-model="addForm.alarm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="事件主题:" prop="theme" required>
							<el-input v-model="addForm.theme"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-tabs v-model="activeName" type="card">
							<el-tab-pane label="预警事件信息维护" name="first">
								<el-row>
									<el-col :span="8">
										<el-form-item label="预警事件等级:" prop="alarmLevelFlag">
											<el-select v-model="addForm.alarmLevelFlag">
												<el-option
													v-for="item in alarmLevel"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="10">
										<el-form-item label="事件通知方式:" prop="">
											<el-checkbox v-model="addForm.actionWeixinFlag">企业微信</el-checkbox>
											<el-checkbox v-model="addForm.actionMailFlag">邮箱通知</el-checkbox>
											<el-checkbox v-model="addForm.actionSmsFlag">短信通知</el-checkbox>
											<el-checkbox v-model="addForm.actionSystemFlag">系统弹窗通知</el-checkbox>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row class="input-form">
									<el-col :span="15">
										<el-tabs v-model="activeImputName">
											<el-tab-pane label="企业微信" name="first">
												<el-input type="textarea" v-model="addForm.weixinInformDetails" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入事件内容"></el-input>
											</el-tab-pane>
											<el-tab-pane label="邮箱" name="second">
												<el-input type="textarea" v-model="addForm.mailInformDetails" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入事件内容"></el-input>
											</el-tab-pane>
											<el-tab-pane label="短信" name="third">
												<el-input type="textarea" v-model="addForm.smsInformDetails" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入事件内容"></el-input>
											</el-tab-pane>
											<el-tab-pane label="系统弹窗" name="fourth">
												<el-input type="textarea" v-model="addForm.systemInformDetails" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入事件内容"></el-input>
											</el-tab-pane>
										</el-tabs>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="预警事件通知维护" name="second">
								<el-row>
									<el-col :span="10" :offset="10">
										<el-form-item label="复制事件通知人员:">
											<el-select v-model="alarm" clearable filterable @change="onChange">
												<el-option
													v-for="item in workers"
													:key="item.alarm"
													:label="item.alarm"
													:value="item.alarm">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="10">
										<el-form-item label="输入搜索条件:" prop="width">
											<el-input placeholder="请输入内容" v-model="input1" class="input-with-select" @input="getAllocate">
												<el-select v-model="select1" slot="prepend" placeholder="请选择" clearable @change="getAllocate">
													<el-option label="个人" value="10"></el-option>
													<el-option label="工作中心" value="20"></el-option>
												</el-select>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="10">
										<el-form-item label="输入搜索条件:" prop="width">
											<el-input placeholder="请输入内容" v-model="input2" class="input-with-select" @input="getUnallocate">
												<el-select v-model="select2" slot="prepend" placeholder="请选择" clearable @change="getUnallocate">
													<el-option label="个人" value="10"></el-option>
													<el-option label="工作中心" value="20"></el-option>
												</el-select>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="9">
										<el-table :data="allocateData" @select="check1" @select-all="check1">
											<el-table-column label="接收信息用户">
												<el-table-column type="selection" width="55"></el-table-column>
												<el-table-column prop="informUserId" label="名称"></el-table-column>
												<el-table-column label="类型">
													<template slot-scope="scope">{{ scope.row.userType == 10 ? '个人' : (scope.row.userType == 20 ? '工作中心' : '--') }}</template>
												</el-table-column>
												<el-table-column prop="" label="描述"></el-table-column>
											</el-table-column>
										</el-table>
									</el-col>
									<el-col :span="2">
										<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
										<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
									</el-col>
									<el-col :span="9">
										<el-table :data="unallocateData" @select="check2" @select-all="check2">
											<el-table-column label="未接收信息用户">
												<el-table-column type="selection" width="55"></el-table-column>
												<el-table-column prop="informUserId" label="名称"></el-table-column>
												<el-table-column label="类型">
													<template slot-scope="scope">{{ scope.row.userType == 10 ? '个人' : (scope.row.userType == 20 ? '工作中心' : '--') }}</template>
												</el-table-column>
												<el-table-column prop="" label="描述"></el-table-column>
											</el-table-column>
										</el-table>
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
	import {getDataByAlarm, getWorkerInfo, saveData} from '../../../api/alarm.maintain.api'
	import _ from 'lodash';
	export default {
		name:'add-alarm-maintain',
		data() {
			return {
				formLabelWidth:'150px',
				activeName:'first',
				activeImputName:'first',
				alarm:'',
				noticeType:[],
				rules: {
					alarm: [
						{ required:true,message:'请填写事件编号', trigger: 'blur' }
					],
					theme: [
						{ required:true,message:'请填写事件主题', trigger: 'blur' }
					],
				},
				addForm: {
					alarm:'',
					theme:'',
					alarmLevelFlag:'',
					actionWeixinFlag:false,
					actionMailFlag:false,
					actionSmsFlag:false,
					actionSystemFlag:false,
					weixinInformDetails:'',
					mailInformDetails:'',
					smsInformDetails:'',
					systemInformDetails:'',
					alarmDefInformList:[],
				},
				select1:'',
				input1:'',
				select2:'',
				input2:'',
				selectedList:[],
				selectedList2:[],
				allocateData:[],
				unallocateData:[],
				alarmLevel: [{
					value: 10,
					label: '提示'
				}, {
					value: 20,
					label: '警告'
				}, {
					value: 30,
					label: '错误'
				}],
				workers:[],
				cloneUnallocateData:[],
				cloneAllocateData:[],
			}
		},
		created(){
			let params = ''
			getDataByAlarm(params).then(data=>{
				console.log(data)
				this.workers = data.data.data
			})
		},
		methods: {
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.allocateData = this.allocateData.map(
							item => ({ ...item, alarm: this.addForm.alarm})
						);
						this.addForm.alarmDefInformList = this.allocateData
						console.log(this.addForm);
						let params = this.addForm
						saveData(params).then(data => {
							if(data.data.message == 'success'){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/alarm/alarmMaintain'})
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
				this.$router.push({path:'/alarm/alarmMaintain'})
			},
			onChange(val){
				console.log(val)
				let params = {
					alarm: val
				}
				getWorkerInfo(params).then(data=>{
					this.unallocateData = data.data.data
					this.cloneUnallocateData = data.data.data
				})
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
