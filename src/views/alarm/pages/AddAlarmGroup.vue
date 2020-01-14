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
						<el-form-item label="事件分组名称:" prop="alarmGroup" required>
							<el-input v-model="addForm.alarmGroup"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="分组描述:" prop="groupDes" required>
							<el-input v-model="addForm.groupDes"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-row>
							<el-col :span="8">
								<el-table :data="allocateData.filter(data => !alarm1 || data.alarm.toLowerCase().includes(alarm1.toLowerCase()))" @select="check1" @select-all="check1">
									<el-table-column label="事件编号:">
										<el-table-column type="selection" width="100"></el-table-column>
										<el-table-column prop="alarm" label="事件编号"></el-table-column>
									</el-table-column>
									<el-table-column label="">
										<template slot="header">
											<el-input v-model="alarm1" placeholder="输入事件编号搜索"/></template>
										<el-table-column label="事件等级">
											<template slot-scope="scope">{{ scope.row.alarmLevelFlag == 10 ? '提示' : (scope.row.alarmLevelFlag == 20 ? '警告' : '错误') }}</template>
										</el-table-column>
										<el-table-column prop="theme" label="事件主题"></el-table-column>
									</el-table-column>
								</el-table>
							</el-col>
							<el-col :span="2">
								<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
								<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
							</el-col>
							<el-col :span="8">
								<el-table :data="unallocateData.filter(data => !alarm2 || data.alarm.toLowerCase().includes(alarm2.toLowerCase()))" @select="check2" @select-all="check2">
									<el-table-column label="事件编号:">
										<el-table-column type="selection" width="100"></el-table-column>
										<el-table-column prop="alarm" label="事件编号"></el-table-column>
									</el-table-column>
									<el-table-column label="">
										<template slot="header">
											<el-input v-model="alarm2" placeholder="输入事件编号搜索" />
										</template>
										<el-table-column label="事件等级">
											<template slot-scope="scope">{{ scope.row.alarmLevelFlag == 10 ? '提示' : (scope.row.alarmLevelFlag == 20 ? '警告' : '错误') }}</template>
										</el-table-column>
										<el-table-column prop="theme" label="事件主题"></el-table-column>
									</el-table-column>
								</el-table>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {getDataByAlarm, checkExists, saveData} from '../../../api/alarm.group.api'
	import _ from 'lodash';
	export default {
		name:'add-alarm-group',
		data() {
			return {
				formLabelWidth:'150px',
				alarm1:'',
				alarm2:'',
				rules: {
					alarmGroup: [
						{ required:true,message:'请填写事件分组', trigger: 'blur' }
					],
					groupDes: [
						{ required:true,message:'请填写事件分组描述', trigger: 'blur' }
					],
				},
				addForm: {
					alarmGroup:'',
					groupDes:'',
					alarmList:[],
					tenantSiteCode: "test",
				},
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
				cloneUnallocateData:[],
				cloneAllocateData:[],
			}
		},
		created(){
			let params = ''
			getDataByAlarm(params).then(data=>{
				console.log(data)
				this.unallocateData = data.data.data
				this.cloneUnallocateData = data.data.data
			})
		},
		methods: {
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let arr = []
						this.allocateData.map(item=>{
							arr.push(item.alarm)
						})
						this.addForm.alarmList = arr

						console.log(this.addForm);
						let params = this.addForm
						checkExists(params).then(data => {
							console.log(data.statusText,'ddaaa')
							if(data.statusText == 'OK'){
								saveData(params).then(data => {
									if(data.data.message == 'success'){
										this.$message({
											type: 'success',
											message: '保存成功!'
										});
										setTimeout(()=>{
											this.$router.push({path:'/alarm/alarmGroup'})
										},1000)
									}
								})
							}else{
								this.$message.error('该分组名称已存在')
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
				console.log(this.cloneUnallocateData)
				this.unallocateData = this.cloneUnallocateData
			},
			goBack() {
				this.$router.push({path:'/alarm/alarmGroup'})
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
				console.log(val,this.alarm2,'dd')

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
