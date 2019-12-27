<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
				<el-form-item label="工序:" prop="operation">
					<el-input v-model="searchForm.operation"></el-input>
				</el-form-item>
				<el-form-item label="" prop="">
					<el-button class="ml15 mr25 pad1025" size="small" type="success" @click="search">查询</el-button>
					<el-button class="pad1025" size="small" type="warning" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="add" :disabled="this.checkedList.length>0">新增</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="edit" :disabled="this.checkedList.length === 0">编辑</el-button>
		</div>
		
		<div class="">
			<el-table
			ref="multipleTable"
			:data="this.tableData.data"
			tooltip-effect="dark"
			row-key="mat"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="operation" label="工序"></el-table-column>
				<el-table-column prop="station" label="站位"></el-table-column>
				<el-table-column prop="workCenterRelation" label="产线"></el-table-column>
			</el-table>
			<el-pagination class="mtb20"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="this.tableData.page.currentPage"
				:page-sizes="[1, 10, 15, 20, 30, 50]"
				:page-size="this.tableData.page.pageSize"
				layout="->, total, prev, pager, next, sizes, jumper"
				:total="this.tableData.page.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { getStationList} from '../../../api/operation.station.api.js'
import { mapMutations } from "vuex";
	export default {
		name:'operation-station',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'120px',
				searchForm: {
					operation:'',
				},
				rules: {},
				tableData: {
					data:[],
					page:{
						currentPage:1,
						pageSize:10,
						total:0
					}
				},
			}
		},
		created(){
			this.search()
		},
		methods: {
			...mapMutations(["SETSTATIONEDITLIST"]),
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.search()
			},
			search(){
				let params= {
					pageSize: this.tableData.page.pageSize,
					currentPage: this.tableData.page.currentPage,
					operation:this.searchForm.operation,
				}
				getStationList(params).then(data => {
					this.tableData.data = data.data.data.data
					this.tableData.page.total = data.data.data.total
				})
			},
			handleSizeChange(pageSize){
				this.tableData.page.pageSize = pageSize
				this.search()
			},
			handleCurrentChange(currentPage){
				this.tableData.page.currentPage = currentPage
				this.search()
			},
			handleSelectionChange(val) {
				this.checkedList = val;
			},
			add(){
				this.$router.push({path:'/operation-station/add-operation-station'})
			},
			edit(){
				this.SETSTATIONEDITLIST(this.checkedList);
				this.$router.push({path:'/operation-station/edit-operation-station'})
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
	}
	.add-form {
		padding-left: 25px;
	}
	.dec {
		width: 400px !important;
	}
</style>
