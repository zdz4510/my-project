<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
				<el-form-item label="物料号/工单号/工序设备ID:" prop="mat">
					<el-input v-model="searchForm.mat"></el-input>
				</el-form-item>
				<el-form-item label="收集类型:" prop="collectionType" required>
					<el-select v-model="searchForm.collectionType" filterable placeholder="请选择">
						<el-option
							v-for="item in collectionType"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数据收集组名称:" prop="dcGroup">
					<el-input v-model="searchForm.dcGroup"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="success" @click="search">查询</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="resetForm('searchForm')">重置</el-button>
			<el-button class="mr25 pad1025" size="small" type="danger"  @click="del" :disabled="this.checkedList.length === 0">删除</el-button>
			<el-button class="mr25 pad1025" size="small" type="danger"  @click="exportExcel" >导出</el-button>
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
				<el-table-column prop="matType" label="物料分类"></el-table-column>
				<el-table-column prop="mat" label="物料料号"></el-table-column>
				<el-table-column prop="matRev" label="版本"></el-table-column>
				<el-table-column prop="currentRev" label="当前版本"></el-table-column>
				<el-table-column label="产品状态">
					<template slot-scope="scope">{{ scope.row.matStatus == 1 ? '已启用' : (scope.row.status == 2 ? '未启用' : '--') }}</template>
				</el-table-column>
				<el-table-column prop="client" label="客户"></el-table-column>
				<el-table-column prop="vebdor" label="供应商"></el-table-column>
				<el-table-column prop="matDes" label="物料描述"></el-table-column>
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
	export default {
		name:'dc-search',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'200px',
				searchForm: {
					mat: '',
					dcGroup: '',
					collectionType: '',
				},
				rules: {
					// process: [
					// 	{ required: true, message: '请输入工序名称', trigger: 'blur' },
					// ],
				},
				collectionType:[{
					value: 1,
					label: '工单'
				}, {
					value: 2,
					label: '物料'
				},{
					value: 3,
					label: '资源'
				}, {
					value: 4,
					label: '工序'
				}],
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
			search(){
				let params= {
					deleteFlag: false,
					tenantSiteCode: this.searchForm.tenantSiteCode,
					mat: this.searchForm.mat,
					matRev: this.searchForm.matRev,
					pageSize: this.tableData.page.pageSize,
					currentPage: this.tableData.page.currentPage,
				}
				getMaterialList(params).then(data => {
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
					let params = {
						mat: this.checkedList[0].mat,
						matRev: this.checkedList[0].matRev,
					}
				deleteMaterial(params).then(data=>{
					console.log(data,'adddata')
					this.$message({
            type: 'success',
            message: '删除成功!'
          });
				})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
				});
			},
			add(){
				this.$router.push({path:'/material/add-material'})
			},
			edit(){
				this.$router.push({path:'/material/add-material'})
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
			},
			exportExcel(){
				
			}
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
