<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style">
				<el-form-item label="站点:" prop="station">
					<el-input v-model="searchForm.station" disabled=""></el-input>
				</el-form-item>
				<el-form-item label="工序:" prop="operation">
					<el-autocomplete
						class="inline-input"
						v-model="searchForm.operation"
						:fetch-suggestions="querySearch"
						placeholder="请输入内容"
					></el-autocomplete>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="search">查询</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save">保存</el-button>
		</div>
		<div class="content">
			<el-transfer
			class="transfer"
				filterable
				:titles="['未分配站位', '已分配站位']"
				v-model="value"
				:data="undistributedArr">
			</el-transfer>
		</div>
	</div>
</template>

<script>
import {getAllOperation, getDataByStation} from '../../../api/material/operation.station.api'
	export default {
		name:'operation-station',
		data() {
			return {
				undistributed:[],
				allocate:[],
				undistributedArr: [],
				value: [2],
				filterMethod(query, item) {
					return item.pinyin.indexOf(query) > -1;
				},
				searchForm: {
					operation: '',
					tenantSiteCode: 'test',
					station: '',
				},
				rules: {
					process: [
						{ required: false, message: '请输入工序名称', trigger: 'blur' },
					],
				},
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}],
				status: [{
					value: '1',
					label: '已启用'
				}, {
					value: '2',
					label: '未启用'
				}],
			}
		},
		created(){
			//获取所有工序
			getAllOperation().then(data => {
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
			search(){
				getDataByStation(this.searchForm).then(data => {
					let arr = []
					console.log(data.data.data.undistributed,'da')
					this.undistributed = data.data.data.undistributed
					this.undistributed.forEach((item, index) => {
						arr.push({
							label: item.workCenter+' -- '+item.station+' -- '+item.stationDes,
							key: index,
						});
					});
					this.undistributedArr = arr
					console.log(this.undistributedArr,'dafads')
				})
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
			add() {
				this.$router.push({path:'/addMaterial'})
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
		padding: 10px;
	}
	.el-transfer /deep/ .el-transfer-panel { width: 300px !important; }
	
</style>
