<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
				<el-form-item label="物料号/工单号/工序设备ID:" prop="resource">
					<el-input v-model="searchForm.resource"></el-input>
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
				<el-form-item label="" prop="">
					<el-button class="mr25 pad1025" size="small" type="primary" @click="search">查询</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="warning"  @click="del" :disabled="this.checkedList.length === 0">删除</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning"  @click="handleExport" :disabled="!this.show">导出</el-button>
		</div>

		<div class="" v-if="!this.show">
			<el-table
			ref="multipleTable"
			:data="this.tableData.data"
			tooltip-effect="dark"
			row-key="mat"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="dcGroup" label="数据收集组"></el-table-column>
				<el-table-column prop="collectionType" label="收集类型"></el-table-column>
				<el-table-column prop="resourceGroup" label="设备组"></el-table-column>
				<el-table-column prop="resource" label="设备编号"></el-table-column>
				<el-table-column prop="material" label="物料号"></el-table-column>
				<el-table-column prop="materialGroup" label="物料组"></el-table-column>
				<el-table-column prop="shopOrder" label="工单号"></el-table-column>
				<el-table-column prop="workCenter" label="工作中心"></el-table-column>
				<el-table-column prop="operation" label="工序"></el-table-column>
				<el-table-column prop="testPass" label="校验结果"></el-table-column>
				<el-table-column prop="createUserName" label="创建人"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
			</el-table>
			<el-pagination class="mtb20"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="this.page.currentPage"
				:page-sizes="[1, 10, 15, 20, 30, 50]"
				:page-size="this.page.pageSize"
				layout="->, total, prev, pager, next, sizes, jumper"
				:total="this.page.total">
			</el-pagination>
		</div>
		<div v-if="this.show">
			<el-table border :data="tableParamsData.data" @selection-change="handleSelectionChange2" row-key="mat">
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<template v-for="(item,index) in tableParamsData.tableHead">
					<el-table-column :prop="item.column_name" :label="item.column_comment" :key="index"></el-table-column>
				</template>
			</el-table>
			<el-pagination class="mtb20"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="this.page.currentPage"
				:page-sizes="[1, 10, 15, 20, 30, 50]"
				:page-size="this.page.pageSize"
				layout="->, total, prev, pager, next, sizes, jumper"
				:total="this.page.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import {getDataReportList, deleteDcSearch} from '../../../api/dc.search.api'
import { exportExcel } from "@/until/excel.js";
	export default {
		name:'dc-search',
		data() {
			return {
				tHeader:['数据收集组','收集类型','设备组','设备编号','物料号','物料组','工单号','工作中心','工序','校验结果','创建人','创建时间'],
				filterVal:['dcGroup','collectionType','resourceGroup','resource','material','materialGroup','shopOrder','workCenter','operation','testPass','createUserName','createTime'],
				fileName:'独立数据查询报表维护表',
				show:true,
				checkedList:[],
				formLabelWidth:'200px',
				searchForm: {
					resource: '',
					dcGroup: '',
					collectionType: '10',
					tenantSiteCode:'test'
				},
				rules: {
					// process: [
					// 	{ required: true, message: '请输入工序名称', trigger: 'blur' },
					// ],
				},
				collectionType:[{
					value: '10',
					label: '工单'
				}, {
					value: '20',
					label: '物料'
				},{
					value: '30',
					label: '资源'
				}, {
					value: '40',
					label: '工序'
				}],
				tableData: {
					data:[],
				},
				tableParamsData: {
					data:[],
					tableHead:[],
				},
				page:{
					currentPage:1,
					pageSize:10,
					total:0
				}
			}
		},
		created(){
			this.search()
		},
		methods: {
			search(){
				let params= {
					tenantSiteCode: this.searchForm.tenantSiteCode,
					resource: this.searchForm.resource,
					dcGroup: this.searchForm.dcGroup,
					collectionType: this.searchForm.collectionType,
					pageSize: this.page.pageSize,
					currentPage: this.page.currentPage,
				}
				getDataReportList(params).then(data => {
					if(data.data.code == 200){
						this.show = data.data.data.isShowParamPage
						if(this.show){
							let tableHead = [{
								column_name: "collectionType",column_comment:"收集类型"
							},{
								column_name: "dcGroup",column_comment:"数据收集名称"
							}]

							data.data.data.dcParamColumnHead.forEach(function(val){
								let obj = {}
								obj.column_name = val
								obj.column_comment = val
								tableHead.push(obj)
							});
							console.log(tableHead,'tableHead')
							this.tableParamsData.data = data.data.data.dcParamPage.data
							this.tableParamsData.tableHead = tableHead
							this.page.total = data.data.data.dcParamPage.total
						}else{
							this.tableData.data = data.data.data.dcDataPage.data
							this.page.total = data.data.data.dcDataPage.total
						}
					}else{
						this.$message.error(data.data.message)
					}
					
				})
			},
			handleSizeChange(pageSize){
				console.log(pageSize)
				this.page.pageSize = pageSize
				this.search()
			},
			handleCurrentChange(currentPage){
				this.page.currentPage = currentPage
				this.search()
			},
			handleSelectionChange(val) {
				this.checkedList = val;
				console.log(val)
			},
			handleSelectionChange2(val) {
				this.checkedList = val;
				console.log(val)
			},
			del(){
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

				deleteDcSearch(this.checkedList).then(data=>{
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
			// exportExcel(){
			// 	let data = this.searchForm
			// 	// exportExcelData(params).then(data => {
			// 	// 	console.log(data)
			// 	// })
			// 	// console.log(`${window.VUE_APP_URL}/mes/dcDataReport/exportExcel?collectionType=${data.collectionType}&dcGroup=${data.dcGroup}&resource=${data.resource}&tenantSiteCode=${data.tenantSiteCode}`)
			// 	window.location.href=`${window.VUE_APP_URL}/mes/dcDataReport/exportExcel?collectionType=${data.collectionType}&dcGroup=${data.dcGroup}&resource=${data.resource}&tenantSiteCode=${data.tenantSiteCode}`
			// }
			//导出开始
			handleExport() {
				if (this.checkedList.length === 0) {
					this.exportHttp();
				}
				if (this.checkedList.length > 0) {
					this.checkedList.map(item=>{
						item.status = item.status ? '已启用' : '未启用'
					})
					this.exportResult(this.checkedList);
				}
			},
			exportHttp() {
				let params= {
					tenantSiteCode: this.searchForm.tenantSiteCode,
					resource: this.searchForm.resource,
					dcGroup: this.searchForm.dcGroup,
					collectionType: this.searchForm.collectionType,
					pageSize: 0,
					currentPage: this.page.currentPage,
				}
				getDataReportList(params).then(data => {
					if(data.data.code == 200){
						this.show = data.data.data.isShowParamPage
						if(this.show){
							let tableHead = [{
								column_name: "collectionType",column_comment:"收集类型"
							},{
								column_name: "dcGroup",column_comment:"数据收集名称"
							}]

							data.data.data.dcParamColumnHead.forEach(function(val){
								let obj = {}
								obj.column_name = val
								obj.column_comment = val
								tableHead.push(obj)
							});
							// this.tableParamsData.data = data.data.data.dcParamPage.data
							// this.tableParamsData.tableHead = tableHead
							// this.page.total = data.data.data.dcParamPage.total
							this.exportResult(data.data.data.dcParamPage.data);
						}else{
							// this.tableData.data = data.data.data.dcDataPage.data
							// this.page.total = data.data.data.dcDataPage.total
							this.exportResult(data.data.data.dcDataPage.data);
						}
					}else{
						this.$message.error(data.data.message)
					}
				})

				// let params= {
				// 	pageSize: 0,
				// 	currentPage: this.tableData.page.currentPage,
				// 	operation:this.searchForm.operation,
				// }
				// getOperationList(params).then(data => {
				// 	if(data.data.code == 200){
				// 		let res = data.data.data.data
				// 		res.map(item=>{
				// 			item.status = item.status ? '已启用' : '未启用'
				// 		})
				// 		this.exportResult(res);
				// 	}else{
				// 		this.$message.error(data.data.message)
				// 	}
				// })
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
