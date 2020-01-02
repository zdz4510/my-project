<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
				<el-form-item label="物料号:" prop="mat">
					<el-input v-model="searchForm.mat"></el-input>
				</el-form-item>
				<el-form-item label="设备ID:" prop="resource">
					<el-input v-model="searchForm.resource"></el-input>
				</el-form-item>
				<el-form-item label="工单号:" prop="shopOrder">
					<el-input v-model="searchForm.shopOrder"></el-input>
				</el-form-item>
				<el-form-item label="工序:" prop="operation">
					<el-input v-model="searchForm.operation"></el-input>
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
				<el-form-item label="" prop="">
					<el-button class="mr25 pad1025" size="small" type="primary" @click="search('searchForm')">查询</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-divider></el-divider>
		<div class="content">
			<el-row>
				<el-col :span="2" class="tr"><el-button type="primary">基础信息</el-button></el-col>
				<el-col :span="6">
					<el-form :model="baseInfoForm" ref="baseInfoForm"  :label-width="formLabelWidth">
						<el-form-item label="设备类型:" prop="resourceGroup">
							<el-input v-model="baseInfoForm.resourceGroup" disabled></el-input>
						</el-form-item>
						<el-form-item label="工作中心:" prop="workCenter">
							<el-input v-model="baseInfoForm.workCenter" disabled></el-input>
						</el-form-item>
						<el-form-item label="物料组:" prop="matGroup">
							<el-input v-model="baseInfoForm.matGroup" disabled></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<el-divider></el-divider>
		<!-- parameterValue -->
		<div class="content">
			<el-row>
				<el-col :span="2" class="tr"><el-button type="primary">参数输入</el-button></el-col>
				<el-col :span="22">
					<el-table :data="paramsTableData" style="width: 100%" border>
						<el-table-column label="参数名" width="180">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.parameter }}</span>
							</template>
						</el-table-column>
						<el-table-column label="参数描述" width="180">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.parameterDes }}</span>
							</template>
						</el-table-column>
						<el-table-column label="参数值" width="180">
							<template slot-scope="scope">
								<el-input v-model="scope.row.parameterValue" ></el-input>
							</template>
						</el-table-column>
					</el-table>
						<el-button class="mr25 pad1025" size="small" type="primary" @click="sure">确定</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import {getCollectionData, getMaterialList} from '../../../api/dc.data.collection.api'
	export default {
		name:'dc-collection',
		data() {
			return {
				tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
				formLabelWidth:'120px',
				searchForm: {
					mat: 'ASDF',
					resource: '',
					shopOrder: 'SDF',
					operation: 'SD',
					collectionType: '10',
					tenantSiteCode:'test'
				},
				baseInfoForm:{
					resourceGroup:'',
					workCenter:'',
					matGroup:'',
				},
				paramsTableData:[],
				rules: {
					collectionType: [
						{ required: true, message: '请选择收集类型', trigger: 'change' },
					],
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
			}
		},
		created(){
			// this.search()
			let params = {
				mat:'',
				matRev:'',
				currentPage:1,
				pageSize:99,
				tenantSiteCode:'test',
				deleteFlag:false,
			}
			getMaterialList(params).then(data=>{
				console.log(data,'d')
			})
		},
		methods: {
			search(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = this.searchForm
						getCollectionData(params).then(data=>{
							console.log(data.data.data,'dd')
							this.baseInfoForm = data.data.data
							if(data.data.data.dcParameterMeasureList){
								this.paramsTableData = data.data.data.dcParameterMeasureList
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			add(){
				this.$router.push({path:'/material/add-material'})
			},
			edit(){
				this.$router.push({path:'/material/add-material'})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.search()
			},
			sure(){
				console.log(this.paramsTableData,'tabledata')
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-bar {
		// height: 80px;
		background: #FFFFFF;
		.form-style {
			margin: 0 !important;
			padding: 0 0 0 30px !important;
			height: 146px !important;
			position: relative;
			top: 20px;
			// transform: translateY(-50%);
		}
	}
	.content {
		background: #FFFFFF;
		padding-top: 20px;
	}
	.tr {
		text-align: right;
	}
	.el-table{
		margin-left: 50px;
	}
</style>
