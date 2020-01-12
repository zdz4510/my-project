<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" @submit.native.prevent>
				<el-form-item label="工作中心:" prop="workCenter">
					<el-input v-model="searchForm.workCenter" placeholder="请输入内容" @keyup.enter.native="onEnterSearch"></el-input>
				</el-form-item>
				<el-form-item label="" prop="">
					<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="search">查询</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="add" :disabled="this.checkedList.length>0">新增</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="edit" :disabled="this.checkedList.length === 0">编辑</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning"  @click="del" :disabled="this.checkedList.length === 0">删除</el-button>
		</div>

		<div class="">
			<el-table
			ref="multipleTable"
			:data="this.tableData.data"
			tooltip-effect="dark"
			row-key="workCenter"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="workCenter" label="工作中心"></el-table-column>
				<el-table-column prop="workCenterDes" label="工作中心描述"></el-table-column>
				<el-table-column label="类型">
					<template slot-scope="scope">{{ scope.row.workCenterType == 1 ? '车间' : '产线' }}</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">{{ scope.row.status == 1 ? '已启用' : (scope.row.status == 2 ? '未启用' : '--') }}</template>
				</el-table-column>
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
import {getWorkCenterList, deleteWorkCenter} from '../../../api/work.center.api.js'
import { mapMutations } from "vuex";
	export default {
		name:'work-center',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'120px',
				dialog:false,
				activeName:'first',
				searchForm: {
					workCenter: '',
					tenantSiteCode: 'test',
					deleteFlag: false,
				},
				rules: {
					// process: [
					// 	{ required: true, message: '请输入工序名称', trigger: 'blur' },
					// ],
				},
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
			...mapMutations(["SETWORKCENTEREDITLIST"]),
			onEnterSearch(){
				return false
			},
			search(){
				let params= {
					deleteFlag: false,
					tenantSiteCode: this.searchForm.tenantSiteCode,
					workCenter: this.searchForm.workCenter,
					pageSize: this.tableData.page.pageSize,
					currentPage: this.tableData.page.currentPage,
				}
				getWorkCenterList(params).then(data => {
					this.tableData.data = data.data.data.data
					this.tableData.page.total = data.data.data.total
				})
			},
			handleSizeChange(pageSize){
				let _this = this
				this.tableData.page.pageSize = pageSize
				_this.search()
			},
			handleCurrentChange(currentPage){
				let _this = this
				this.tableData.page.currentPage = currentPage
				_this.search()
			},
			handleSelectionChange(val) {
				this.checkedList = val;
			},
			add(){
				this.$router.push({path:'/workCenter/addWorkCenter'})
			},
			edit(){
				this.SETWORKCENTEREDITLIST(this.checkedList);
				this.$router.push({path:'/workCenter/editWorkCenter'})
			},
			del(){
				let _this = this
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let params = this.checkedList
					deleteWorkCenter(params).then(data=>{
						if(data.data.code == 200){
							this.$message.success('删除成功')
							_this.search()
							this.$refs.multipleTable.clearSelection()
						}
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.search()
			},
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
</style>
