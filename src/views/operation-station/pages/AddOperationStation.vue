<template>
	<div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 ml30 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save">保存</el-button>
		</div>
		<div class="search-bar">
			<el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" class="form-style">
				<el-form-item label="工序:" prop="operation" >
					<el-select v-model="addForm.operation" @change="onChange">
						<el-option
							v-for="item in options"
							:key="item.operation"
							:label="item.operation"
							:value="item.operation">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<div class="content">
			<el-transfer
        ref="transfer"
        filterable
        v-model="allocate"
        :data="transferData"
        :titles="['未分配站位', '已分配站位']"
        :props="{
          key: 'resource',
          station: 'station',
          workCenterRelation: 'workCenterRelation',
          stationDes: 'stationDes',
        }"
      >
        <span slot-scope="{ option }"
          >{{ option.workCenterRelation }} - {{ option.station }} - {{ option.stationDes }}</span
        >
      </el-transfer>
		</div>
	</div>
</template>

<script>
import { addStation, getAllOperation, getOperationInfo} from '../../../api/operation.station.api.js'
	export default {
		name:'operation-station',
		data() {
			return {
				transferData:[],
				undistributed:[],
				allocate:[],
				allocateArr:[],
				undistributedArr: [],
				// value: [],
				filterMethod(query, item) {
					return item.workCenter.indexOf(query) > -1;
				},
				addForm: {
					operation: '',
				},
				rules: {
					operation: [
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
			// 获取所有工序
			getAllOperation().then(data => {
				let res = data.data.data
				res.forEach(item => {
					item.value = item.operation;
				})
				this.options = res
				console.log(data,'da')
			})
		},
		methods: {
			goBack(){
				this.$router.push({path:'/operation-station/operation-station'})
			},
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
			},
			save(){
				console.log(this.allocate)
				let arr = []
				for(let i = 0; i < this.allocate.length; i++){
					for(let j = 0; j < this.transferData.length; j++){
						if(this.allocate[i] == this.transferData[j]['resource']){
							let obj = {}
							obj.operation = this.addForm.operation
							obj.workCenterRelation = this.transferData[j]['workCenterRelation']
							obj.station = this.transferData[j]['station']
							arr.push(obj)
						}
					}
				}
				console.log(arr,'arr')
				addStation(arr).then(data => {
					if(data.data.message == 'success'){
						this.$message({
							type: 'success',
							message: '保存成功!'
						});
						setTimeout(()=>{
							this.$router.push({path:'/operation-station/operation-station'})
						},1000)
					}
				})
			},
			handleChange(value, direction, movedKeys) {
				console.log(value, direction, movedKeys)
				this.allocate = value
			},
			onChange(value){
				let params = {
					operation:value
				}
				getOperationInfo(params).then(data=>{
					console.log(data.data.data,'data')
					let transData = [...data.data.data.allocated.filter(Boolean), ...data.data.data.undistributed.filter(Boolean)]
					this.transferData = JSON.parse(JSON.stringify(transData)) ;

					data.data.data.allocated.filter(Boolean).forEach(element => {
						this.allocate.push(element.resource || '');
					});
				})
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
		padding: 10px;
	}
	.el-transfer /deep/ .el-transfer-panel { width: 300px !important; }
	
</style>
