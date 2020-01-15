<template>
	<div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 ml30 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
		</div>
		<div class="search-bar">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="form-style">
				<el-form-item label="工序:" prop="operation" required>
					<el-select v-model="addForm.operation" @change="onChange">
						<el-option
							v-for="item in options"
							:key="item.operation"
							:label="item.operation"
							:value="item.operation">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述:" prop="operationDes" required>
					<el-input v-model="addForm.operationDes"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="24">
						<el-row>
							<el-col :span="8">
								<el-table :data="allocateData.filter(data => (!workCenterRelation1 || data.workCenterRelation.toLowerCase().includes(workCenterRelation1.toLowerCase())) &&
									(!station1 || data.station.toLowerCase().includes(station1.toLowerCase())) &&
									(!stationDes1 || data.stationDes.toLowerCase().includes(stationDes1.toLowerCase())) )" @select="check1" @select-all="check1">
									<el-table-column label="已分配站位">
										<el-table-column label="选择">
											<el-table-column type="selection" width="55"></el-table-column>
										</el-table-column>
										<el-table-column label="">
											<template slot="header">
												<el-input v-model="workCenterRelation1" placeholder="输入产线搜索"/></template>
											<el-table-column prop="workCenterRelation" label="产线"></el-table-column>
										</el-table-column>
										<el-table-column label="">
											<template slot="header">
												<el-input v-model="station1" placeholder="输入站位搜索"/></template>
											<el-table-column prop="station" label="站位"></el-table-column>
										</el-table-column>
										<el-table-column label="">
											<template slot="header">
												<el-input v-model="stationDes1" placeholder="输入站位描述搜索"/></template>
											<el-table-column prop="stationDes" label="站位描述"></el-table-column>
										</el-table-column>
									</el-table-column>
								</el-table>
							</el-col>
							<el-col :span="2">
								<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
								<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
							</el-col>
							<el-col :span="8">
								<el-table :data="unallocateData.filter(data => (!workCenterRelation2 || data.workCenterRelation.toLowerCase().includes(workCenterRelation2.toLowerCase())) &&
									(!station2 || data.station.toLowerCase().includes(station2.toLowerCase())) &&
									(!stationDes2 || data.stationDes.toLowerCase().includes(stationDes2.toLowerCase())) )" @select="check2" @select-all="check2">
									<el-table-column label="未分配站位">
										<el-table-column label="选择">
											<el-table-column type="selection" width="55"></el-table-column>
										</el-table-column>
										<el-table-column label="">
											<template slot="header">
												<el-input v-model="workCenterRelation2" placeholder="输入产线搜索"/></template>
											<el-table-column prop="workCenterRelation" label="产线"></el-table-column>
										</el-table-column>
										<el-table-column label="">
											<template slot="header">
												<el-input v-model="station2" placeholder="输入站位搜索"/></template>
											<el-table-column prop="station" label="站位"></el-table-column>
										</el-table-column>
										<el-table-column label="">
											<template slot="header">
												<el-input v-model="stationDes2" placeholder="输入站位描述搜索"/></template>
											<el-table-column prop="stationDes" label="站位描述"></el-table-column>
										</el-table-column>
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
import { addStation, getAllOperation, getOperationInfo} from '../../../api/operation.station.api.js'
import _ from 'lodash';
	export default {
		name:'operation-station',
		data() {
			return {
				addForm: {
					operation: '',
					operationDes:''
				},
				rules: {
					operation: [
						{ required: true, message: '请选择工序名称', trigger: 'change' },
					],
				},
				options:[],
				unallocateData:[],
				allocateData:[],
				workCenterRelation1:'',
				workCenterRelation2:'',
				station1:'',
				station2:'',
				stationDes1:'',
				stationDes2:'',
				selectedList:[],
				selectedList2:[],
				cloneUnallocateData:[],
				cloneAllocateData:[],
			}
		},
		created(){
			// 获取所有工序
			getAllOperation().then(data => {
				if(data.data.code == 200){
					this.options = data.data.data
				}else{
					this.$message.error(data.data.message)
				}
			})
		},
		methods: {
			onChange(value){
				let params = {
					operation:value
				}
				getOperationInfo(params).then(data=>{
					if(data.data.code == 200){
						this.unallocateData = data.data.data.undistributed
						this.cloneUnallocateData = data.data.data.undistributed
						this.allocateData = data.data.data.allocated
						this.cloneAllocateData = data.data.data.allocated
					}else{
						this.$message.error(data.data.message)
					}
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
			goBack(){
				this.$router.push({path:'/operationStation/operationStation'})
			},
		
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.allocateData = []
				this.unallocateData = []
			},
			save(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let arr = []
						this.allocateData.map(item=>{
							let obj = {}
							obj.operation = this.addForm.operation
							obj.station = item.station
							obj.workCenterRelation = item.workCenterRelation
							arr.push(obj)
						})
						addStation(arr).then(data => {
							if(data.data.code == 200){
								this.$message({
									type: 'success',
									message: '保存成功!'
								});
								setTimeout(()=>{
									this.$router.push({path:'/operationStation/operationStation'})
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
		
			
			
		}
	}
</script>

<style scoped lang="scss">
	.search-bar {
		height: 80px;
		background: #FFFFFF;
		.form-style {
			margin: 0 !important;
			padding: 0 0 0 30px !important;
			height: 42px !important;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.content {
		background: #FFFFFF;
		padding: 10px;
	}
	.el-transfer /deep/ .el-transfer-panel { width: 300px !important; }
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
