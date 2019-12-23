<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" @submit.native.prevent>
				<el-form-item label="工作中心:" prop="workCenter">
					<el-input v-model="searchForm.workCenter" placeholder="请输入内容" @keyup.enter.native="onEnterSearch"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="success" @click="search">查询</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="dialog = true" :disabled="this.checkedList.length>0">新增</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="dialog = true" :disabled="this.checkedList.length != 1">编辑</el-button>
			<el-button class="mr25 pad1025" size="small" type="danger"  @click="del" :disabled="this.checkedList.length === 0">删除</el-button>
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
		<!-- 模态框 -->
		<el-dialog title="新增" :visible.sync="dialog">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="add-form" :label-width="formLabelWidth">
				<el-form-item label="工作中心:" prop="workCenter">
					<el-input v-model="addForm.workCenter" ></el-input>
				</el-form-item>
				<el-form-item label="描述:" prop="workCenter">
					<el-input v-model="addForm.workCenterDes" ></el-input>
				</el-form-item>
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="基础信息" name="first">
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
						<el-row>
							<el-col :span="24">
								<el-form-item label="类别:" prop="type" required>
									<el-select v-model="addForm.type" filterable placeholder="请选择">
										<el-option
											v-for="item in type"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="工作中心维护" name="second">
						<el-transfer
							filterable
							:filter-method="filterMethod"
							:titles="['未分配工作中心', '已分配工作中心']"
							v-model="value"
							:data="data">
						</el-transfer>
					</el-tab-pane>
					<el-tab-pane label="用户" name="third">
						<el-transfer
							filterable
							:filter-method="filterMethod"
							:titles="['未分配用户', '已分配用户']"
							v-model="value"
							:data="data">
						</el-transfer>
					</el-tab-pane>
				</el-tabs>
				<div slot="footer" class="dialog-footer">
					<!-- <el-button @click="handleReset(workCenterForm)">重 置</el-button> -->
					<el-button >重 置</el-button>
					<el-button type="primary" @click="dialog = false">确 定</el-button>
				</div>
			</el-form>
    </el-dialog>
	</div>
</template>

<script>
import {getWorkCenterList, deleteWorkCenter} from '../../../api/material/work.center.api'
	export default {
		name:'work-center',
		data() {
			const generateData = () => {
				const data = [];
				const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
				const pinyin = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
				cities.forEach((city, index) => {
					data.push({
						label: city,
						key: index,
						pinyin: pinyin[index]
					});
				});
				return data;
			};
			return {
				checkedList:[],
				formLabelWidth:'120px',
				dialog:false,
				data: generateData(),
				value: [],
				filterMethod(query, item) {
					return item.pinyin.indexOf(query) > -1;
				},
				activeName:'first',
				searchForm: {
					workCenter: '',
					tenantSiteCode: '',
					deleteFlag: false,
				},
				addForm: {
					workCenter: '',
					workCenterDes: '',
				},
				workCenterForm: {
					code: '',
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
				status: [{
					value: '1',
					label: '已启用'
				}, {
					value: '2',
					label: '未启用'
				}],
				type: [{
					value: '1',
					label: '车间'
				}, {
					value: '2',
					label: '产线'
				}],
			}
		},
		created(){
			this.search()
		},
		methods: {
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
					// modifyUserId: "string",
					// modifyUserName: "string",
					// operation: this.searchForm.operation,
					// operationDes: this.addForm.operationDes,
					// status: this.addForm.status,
					// tenantSiteCode: this.searchForm.tenantSiteCode
				}
				deleteWorkCenter(params).then(data=>{
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
