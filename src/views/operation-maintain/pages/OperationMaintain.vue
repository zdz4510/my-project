<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style">
				<el-form-item label="工序:" prop="operation" required>
					<!-- <el-select v-model="searchForm.operation" filterable placeholder="请选择" @change="pickTenantSiteCode ">
						<el-option
							v-for="item in options"
							:key="item.operation"
							:label="item.operation"
							:value="item.operation">
						</el-option>
					</el-select> -->
					<el-autocomplete
						class="inline-input"
						v-model="searchForm.operation"
						:fetch-suggestions="querySearch"
						placeholder="请输入内容"
						@select="pickTenantSiteCode"
					></el-autocomplete>
				</el-form-item>
				<el-form-item label="" prop="">
					<el-button class="ml15 mr25 pad1025" size="small" type="success" @click="search">查询</el-button>
					<el-button class="pad1025" size="small" type="warning" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save('addForm')">新增</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="save('addForm')">编辑</el-button>
			<el-button class="mr25 pad1025" size="small" type="danger" @click="del('addForm')">删除</el-button>
		</div>
		<div class="content">
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
			<!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="工序维护" name="first">
					<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="add-form">
						<el-row>
							<el-col :span="24">
								<el-form-item label="物料描述" prop="operationDes">
									<el-input class="dec" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入内容" v-model="addForm.operationDes"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="状态:" prop="status" required>
									<el-select v-model="addForm.status" filterable placeholder="请选择">
										<el-option
											v-for="item in status"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="自定义数据" name="second">数据字段、数据属性</el-tab-pane>
			</el-tabs> -->
		</div>
	</div>
</template>

<script>
import {getAllOperation, getOperationList, getOperationByName, getDataByOperation, deleteOperation} from '../../../api/material/operation.maintain.api'
	export default {
		name:'operation-maintain',
		data() {
			return {
				activeName:'first',
				searchForm: {
					operation: '',
					tenantSiteCode:'test',
				},
				addForm: {
					operationDes: '',
					status: '',
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
				options: [],
				status: [{
					value: true,
					label: '已启用'
				}, {
					value: false,
					label: '未启用'
				}],
			}
		},
		created(){
			//获取所有工序
			getAllOperation()
			getOperationByName()
			deleteOperation()
			getOperationList().then(data => {
				let res = data.data.data
				res.forEach(item => {
					item.value = item.operation;
				})
				this.options = res
			})
		},
		methods: {
			querySearch(queryString, cb) {
				var options = this.options;
        var results = queryString ? options.filter(this.createFilter(queryString)) : options;
        // 调用 callback 返回建议列表的数据
        cb(results);
			},
			createFilter(queryString) {
        return (options) => {
          return (options.operation.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
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
			add() {
				this.$router.push({path:'/addMaterial'})
			},
			
			pickTenantSiteCode(operation){
				let obj = {}; 
				console.log(this.options)
				obj = this.options.find((item)=>{
					return item.operation === operation.operation;
				}); 
				console.log(obj,'obj')
				this.searchForm.tenantSiteCode = obj.tenantSiteCode;
			},
			search(){
				getDataByOperation(this.searchForm).then(data=>{
					this.addForm = data.data.data
				})
			},
			save(){
				
			},
			del(formName){
				this.$confirm('是否删除该条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let params = {
					modifyUserId: "string",
					modifyUserName: "string",
					operation: this.searchForm.operation,
					operationDes: this.addForm.operationDes,
					status: this.addForm.status,
					tenantSiteCode: this.searchForm.tenantSiteCode
				}
				deleteOperation(params).then(data=>{
					console.log(data,'adddata')
					if(data.data.message == 'success'){
						this.$refs[formName].resetFields();
						this.searchForm.operation = ''
						this.$message({
            type: 'success',
            message: '删除成功!'
          });
					}
				})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
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
	}
	.add-form {
		padding-left: 25px;
	}
	.dec {
		width: 400px !important;
	}
</style>
