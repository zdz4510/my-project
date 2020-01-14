<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" @submit.native.prevent>
				<el-form-item label="Lot" prop="lot" required>
					<el-select v-model="searchForm.lot" placeholder="请选择" filterable>
						<el-option
							v-for="item in lot"
							:key="item.lot"
							:label="item.lot"
							:value="item.lot">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工序" prop="operation">
					<el-select v-model="searchForm.operation" placeholder="请选择" filterable clearable>
						<el-option
							v-for="item in operation"
							:key="item.operation"
							:label="item.operation"
							:value="item.operation">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="设备" prop="resource">
					<el-select v-model="searchForm.resource" placeholder="请选择" filterable clearable>
						<el-option
							v-for="item in resource"
							:key="item.resource"
							:label="item.resource"
							:value="item.resource">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="" prop="">
					<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="search('searchForm')">查询</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save">保存</el-button>
		</div>
		
		<div class="">
			<el-table
			border
			height="500"
			ref="multipleTable"
			:data="this.tableData.data"
			tooltip-effect="dark"
			row-key="ncCodeRecord+ncCodeStatus"
			@selection-change="handleSelectionChange"
			>
				<el-table-column prop="" label="不合格记录">
					<el-table-column prop="ncCodeRecord" label="不合格代码"></el-table-column>
					<el-table-column label="不合格状态">
						<template slot-scope="scope">{{ scope.row.ncCodeStatus ? '关闭' : '打开' }}</template>
					</el-table-column>
					<el-table-column prop="ncOperation" label="工序"></el-table-column>
					<el-table-column prop="ncResource" label="设备"></el-table-column>
					<el-table-column prop="material" label="物料"></el-table-column>
					<el-table-column prop="modifyUserName" label="不合格记录人"></el-table-column>
					<el-table-column prop="modifyTime" label="不合格记录时间"></el-table-column>
					<el-table-column fixed="right" label="是否关闭" width="100">
						<template slot-scope="scope">
							<el-button v-if="!scope.row.ncCodeStatus" @click="handleClick(scope.row)" type="warning" size="small">关闭</el-button>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>
		<div class="add">
			<el-row>
				<el-col :span='24' class="title">新增不合格</el-col>
			</el-row>
			<el-row>
				<el-col :span='8' class="title">
					<el-table
					border
					ref="ncGroup"
					:data="this.ncGroupData"
					tooltip-effect="dark"
					row-key="ncGroup"
					@row-click="handleClickGroup"
					>
						<el-table-column prop="ncGroup" label="不合格代码组"></el-table-column>
						<el-table-column prop="ncGroupDes" label="不合格代码组描述"></el-table-column>
					</el-table>
				</el-col>
				<el-col :span='8' class="title">
					<el-table
					border
					ref="ncCode"
					:data="this.ncCodeData"
					tooltip-effect="dark"
					row-key="ncCode"
					@row-click="handleClickCode"
					>
						<el-table-column prop="ncCode" label="可用的不合格代码"></el-table-column>
						<el-table-column prop="ncCodeDes" label="可用的不合格代码描述"></el-table-column>
					</el-table>
				</el-col>
				<el-col :span='8' class="title">
					<el-table
					border
					ref="ncCodeAdd"
					:data="this.ncCodeDataAdd"
					tooltip-effect="dark"
					row-key="ncCode"
					>
						<el-table-column prop="ncCode" label="不合格数据条目"></el-table-column>
						<el-table-column prop="ncCodeDes" label="不合格数据条目描述"></el-table-column>
					</el-table>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2" :offset="10"><el-button type="primary" @click="addData">添加</el-button></el-col>
				<el-col :span="2" ><el-button type="primary" @click="cancle">取消</el-button></el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import {getDataList, getLotList, getAllOperation, getAllResource, getNcGroup, getNcCode, saveData, closeData} from '../../../api/nc.log.api'
import _ from 'lodash';
	export default {
		name:'nc-code',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'120px',
				activeName:'first',
				searchForm: {
					lot: '',
					operation: '',
					resource: '',
				},
				rules: {
					lot:[
						{ required:true,message:'请选择LOT值', trigger: 'change' }
					],
				},
				tableData: {
					data:[],
					page:{
						currentPage:1,
						pageSize:10,
						total:0
					}
				},
				lot:[],
				operation:[],
				resource:[],
				ncGroupData:[],
				ncCodeData:[],
				ncCodeDataAdd:[],
				currentItem:{},
			}
		},
		created(){
			// this.search()
			let params = {
				lot:''
			}
			getLotList(params).then(data=>{
				if(data.data.code == 200){
					this.lot = data.data.data
				}else{
					this.$message.error(data.data.message)
				}
			})
			getAllOperation().then(data=>{
				if(data.data.code == 200){
					this.operation = data.data.data
				}else{
					this.$message.error(data.data.message)
				}
			})
			getAllResource().then(data=>{
				if(data.data.code == 200){
					this.resource = data.data.data
				}else{
					this.$message.error(data.data.message)
				}
			})
		},
		methods: {
			search(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = this.searchForm
						getDataList(params).then(data => {
							if(data.data.code == 200){
								this.tableData.data = data.data.data
							}else{
								this.$message.error(data.data.message)
							}
						})
						if(this.searchForm.operation && this.searchForm.resource){
							let params = {
								operation: this.searchForm.operation
							}
							getNcGroup(params).then(data=>{
								if(data.data.code == 200){
									this.ncGroupData = data.data.data
								}else{
									this.$message.error(data.data.message)
								}
							})
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleSizeChange(pageSize){
				console.log(pageSize)
				this.tableData.page.pageSize = pageSize
				this.search()
			},
			handleCurrentChange(currentPage){
				this.tableData.page.currentPage = currentPage
				this.search()
			},
			handleSelectionChange(val) {
				this.checkedList = val;
				console.log(val)
			},
			save(){
				let ncCodeRecordList = []
				this.ncCodeDataAdd.map(item=>{
					ncCodeRecordList.push(item.ncCode)
				})
				let params = {}
				params.createList = [{
					lot:this.searchForm.lot,
					ncOperation:this.searchForm.operation,
					ncResource:this.searchForm.resource,
					ncCodeRecordList:ncCodeRecordList
				}]
				params.updateList = []

				saveData(params).then(data=>{
					if(data.data.code == 200){
						this.$message.success('保存成功')
						this.search('searchForm')
						this.ncCodeDataAdd = []
						this.ncGroupData = []
						this.ncCodeData = []
					}else{
						this.$message.error(data.data.message)
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ncCodeDataAdd = []
				this.ncGroupData = []
				this.ncCodeData = []
			},
			handleClick(row){
				let params = {
					lot:this.searchForm.lot,
					ncOperation:this.searchForm.operation,
					ncResource:this.searchForm.resource,
					ncCodeRecordList:[row.ncCodeRecord]
				}
				closeData(params).then(data=>{
					if(data.data.code == 200){
						this.$message.success('操作成功')
						this.search('searchForm')
					}else{
						this.$message.error(data.data.message)
					}
				})
			},
			handleClickGroup(row){
				console.log(row,'r')
				let params = {
					ncGroup: row.ncGroup
				}
				getNcCode(params).then(data=>{
					if(data.data.code == 200){
						this.ncCodeData = data.data.data
						this.ncCodeDataAdd = []
					}else{
						this.$message.error(data.data.message)
					}
				})
			},
			handleClickCode(row){
				this.currentItem = row
			},
			cancle(){
				this.ncCodeDataAdd = []
			},
			addData(){
				this.ncCodeDataAdd.push(this.currentItem)
				this.ncCodeDataAdd = _.uniq(this.ncCodeDataAdd)
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-bar {
		background: #FFFFFF;
		padding-bottom: 20px;
		.form-style {
			margin: 0 !important;
			padding: 0 0 0 30px !important;
			position: relative;
			top: 20px;
		}
	}
	.content {
		background: #FFFFFF;
	}
	.add-form {
		padding-left: 25px;
	}
	.dec {
		width: 400px !important;
	}
	.add {
		margin-top: 60px;
		.title{
			background: #F5F7FA;
			color:#909399;
			font-weight: bolder;
			padding:12px 10px;
			border:1px solid #EBEEF5;
		}
	}
</style>
