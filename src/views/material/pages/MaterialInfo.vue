<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
				<el-form-item label="物料号:" prop="material">
					<el-input v-model="searchForm.material"></el-input>
				</el-form-item>
				<el-form-item label="版本号:" prop="materialRev">
					<el-input v-model="searchForm.materialRev"></el-input>
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
			row-key="material+materialRev"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="materialType" label="物料分类"></el-table-column>
				<el-table-column prop="material" label="物料料号"></el-table-column>
				<el-table-column prop="materialRev" label="版本"></el-table-column>
				<el-table-column prop="currentRev" label="当前版本"></el-table-column>
				<el-table-column label="产品状态">
					<template slot-scope="scope">{{ scope.row.materialStatus === 'true' ? '已启用' : (scope.row.materialStatus === 'false' ? '未启用' : '--') }}</template>
				</el-table-column>
				<el-table-column prop="client" label="客户"></el-table-column>
				<el-table-column prop="vebdor" label="供应商"></el-table-column>
				<el-table-column prop="materialDes" label="物料描述"></el-table-column>
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
import {getMaterialList, deleteMaterial} from '../../../api/material.info.api'
import { mapMutations } from "vuex";
	export default {
		name:'material-info',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'120px',
				searchForm: {
					material: '',
					materialRev: '',
					tenantSiteCode: '',
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
			...mapMutations(["SETMATEDITLIST"]),
			search(){
				let params= {
					// deleteFlag: false,
					// tenantSiteCode: this.searchForm.tenantSiteCode,
					material: this.searchForm.material,
					materialRev: this.searchForm.materialRev,
					pageSize: this.tableData.page.pageSize,
					currentPage: this.tableData.page.currentPage,
				}
				getMaterialList(params).then(data => {
					console.log(data)
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
			del(){
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
				deleteMaterial(this.checkedList).then(data=>{
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
			add(){
				this.$router.push({path:'/material/addMaterial'})
			},
			edit(){
				this.SETMATEDITLIST(this.checkedList);
				this.$router.push({path:'/material/editMaterial'})
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
