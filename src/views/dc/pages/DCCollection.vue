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
					<el-button class="mr25 pad1025" size="small" type="success" @click="search('searchForm')">查询</el-button>
					<el-button class="mr25 pad1025" size="small" type="warning" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		
	</div>
</template>

<script>
import {getCollectionData, getMaterialList} from '../../../api/dc.data.collection.api'
	export default {
		name:'dc-collection',
		data() {
			return {
				formLabelWidth:'200px',
				searchForm: {
					mat: '',
					resource: '',
					shopOrder: '',
					operation: '',
					collectionType: '',
					tenantSiteCode:'test'
				},
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
	}
	.add-form {
		padding-left: 25px;
	}
	.dec {
		width: 400px !important;
	}
</style>
