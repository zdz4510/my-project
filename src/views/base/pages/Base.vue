<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
				<el-form-item label="物料号:" prop="mat">
					<el-input v-model="searchForm.mat"></el-input>
				</el-form-item>
				<el-form-item label="版本号:" prop="matRev">
					<el-input v-model="searchForm.matRev"></el-input>
				</el-form-item>
				<el-form-item label="" prop="">
					<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="search">查询</el-button>
					<el-button class="pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
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
			row-key="mat"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="mat" label="物料料号"></el-table-column>
				<el-table-column label="产品状态">
					<template slot-scope="scope">{{ scope.row.matStatus == 1 ? '已启用' : (scope.row.status == 2 ? '未启用' : '--') }}</template>
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
import {getData, deleteData} from '../../../api/base/base.api.js'
import { mapMutations } from "vuex";
	export default {
		name:'',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'120px',
				searchForm: {
					mat:'',
					matRev:'',
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
			...mapMutations(["SETEDITLIST"]),
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.search()
			},
			search(){
				let params= {
					pageSize: this.tableData.page.pageSize,
					currentPage: this.tableData.page.currentPage,
					mat:this.searchForm.mat,
					matRev:this.searchForm.matRev,
				}
				getData(params).then(data => {
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
			del(){
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let params = {
						mat: this.checkedList[0].mat,
						matRev: this.checkedList[0].matRev,
					}
					deleteData(params).then(data=>{
						if(data.data.message == 'success'){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.search()
						}
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
				});
			},
			add(){
				this.$router.push({path:'/base/add-base'})
			},
			edit(){
				this.SETEDITLIST(this.checkedList);
				this.$router.push({path:'/base/edit-base'})
			},
		}
	}
</script>

<style scoped lang="scss">
	.search-bar {
		// height: 80px;
		background: #FFFFFF;
		padding-bottom: 20px;
		.form-style {
			margin: 0 !important;
			padding: 0 0 0 30px !important;
			// height: 42px !important;
			position: relative;
			top: 20px;
			// transform: translateY(-50%);
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
