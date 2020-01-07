<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
				<el-form-item label="用户:" prop="user">
					<el-input v-model="searchForm.user"></el-input>
				</el-form-item>
				<el-form-item label="姓名:" prop="name">
					<el-input v-model="searchForm.name"></el-input>
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
				<el-table-column prop="certUser" label="上岗证"></el-table-column>
				<el-table-column prop="mat" label="上岗证描述"></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">{{ scope.row.matStatus == 1 ? '已启用' : (scope.row.status == 2 ? '未启用' : '--') }}</template>
				</el-table-column>
				<el-table-column prop="mat" label="持续时间类型"></el-table-column>
				<el-table-column prop="mat" label="上岗证截止日期"></el-table-column>
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
import {getCertUserList, deleteData} from '../../../api/cert.user.api'
import { mapMutations } from "vuex";
	export default {
		name:'',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'120px',
				searchForm: {
					user:'',
					name:'',
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
			...mapMutations(["SETCERTUSEREDITLIST"]),
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.search()
			},
			search(){
				let params = this.searchForm
				params.pageSize = this.tableData.page.pageSize
				params.currentPage = this.tableData.page.currentPage
				getCertUserList(params).then(data => {
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
					deleteData(this.checkedList).then(data=>{
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
				this.$router.push({path:'/cert-user/add-cert-user'})
			},
			edit(){
				this.SETCERTUSEREDITLIST(this.checkedList);
				this.$router.push({path:'/cert-user/edit-cert-user'})
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
