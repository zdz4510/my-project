<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" @submit.native.prevent>
				<el-form-item label="不合格代码组:" prop="ncGroup">
					<el-input v-model="searchForm.ncGroup" placeholder="请输入内容" @keyup.enter.native="onEnterSearch"></el-input>
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
			<el-button class="mr25 pad1025" size="small" type="warning"  @click="handleExport" >导出</el-button>
		</div>

		<div class="">
			<el-table
			ref="multipleTable"
			:data="this.tableData.data"
			tooltip-effect="dark"
			row-key="ncGroup"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="ncGroup" label="不合格代码组名称"></el-table-column>
				<el-table-column prop="ncGroupDes" label="不合格代码组描述"></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">{{ scope.row.status == 1 ? '已启用' : '未启用' }}</template>
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
import {getNcGroupList, deleteNcGroup} from '../../../api/nc.group.api'
import { exportExcel } from "@/until/excel.js";
import { mapMutations } from "vuex";
	export default {
		name:'nc-group',
		data() {
			return {
				tHeader:['不合格代码组名称','不合格代码组描述','状态'],
				filterVal:['ncGroup','ncGroupDes','status'],
				fileName:'不合格代码组维护表',
				checkedList:[],
				formLabelWidth:'120px',
				activeName:'first',
				searchForm: {
					ncGroup: '',
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
			...mapMutations(["SETNCGROUPEDITLIST"]),
			onEnterSearch(){
				return false
			},
			search(){
				let params = this.searchForm
				params.pageSize = this.tableData.page.pageSize
				params.currentPage = this.tableData.page.currentPage
				getNcGroupList(params).then(data => {
					this.tableData.data = data.data.data.data
					this.tableData.page.total = data.data.data.total
				})
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
			add(){
				this.$router.push({path:'/nc/addNcGroup'})
			},
			edit(){
				this.SETNCGROUPEDITLIST(this.checkedList);
				this.$router.push({path:'/nc/editNcGroup'})
			},
			del(){
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let arr = []
					this.checkedList.map(item=>{
						arr.push(item.ncGroup)
					})
					deleteNcGroup(arr).then(data=>{
						if(data.data.code == 200){
							this.$message.success('删除成功')
							this.search()
							this.$refs.multipleTable.clearSelection()
						}else{
							this.$message.error(data.data.message)
						}
					})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.search()
			},
			//导出开始
			handleExport() {
				if (this.checkedList.length === 0) {
					this.exportHttp();
				}
				if (this.checkedList.length > 0) {
					this.checkedList.map(item=>{
						item.status = item.status == 1 ? '已启用' : '未启用'
					})
					this.exportResult(this.checkedList);
				}
			},
			exportHttp() {
				let params = this.searchForm
				params.pageSize = 0
				params.currentPage = this.tableData.page.currentPage
				getNcGroupList(params).then(data => {
					if(data.data.code == 200){
						let res = data.data.data.data
						res.map(item=>{
							item.status = item.status == 1 ? '已启用' : '未启用'
						})
						this.exportResult(res);
					}else{
						this.$message.error(data.data.message)
					}
				})
			},
			exportResult(data) {
				const tipString = exportExcel(this.tHeader, this.filterVal, data, this.fileName);
				if (tipString === undefined) {
					return;
				} else {
					this.$message({
						message: tipString,
						type: "warning"
					});
					return;
				}
			},
			//导出结束
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
