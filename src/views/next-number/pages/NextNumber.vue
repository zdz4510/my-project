<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" >
				<el-form-item label="编号类型:" prop="nextNumberType" required>
					<el-select v-model="searchForm.nextNumberType" placeholder="请选择">
						<el-option
							v-for="item in type"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="定义目标:" prop="definedBy" required>
					<el-select v-model="searchForm.definedBy" placeholder="请选择" @change="definedChange">
						<el-option
							v-for="item in target"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="value" v-if="searchForm.definedBy !== 'MATERIAL_GROUP'">
					<el-select v-model="searchForm.value" placeholder="请选择" @change="onChange" filterable>
						<el-option
							v-for="item in options"
							:key="item.material+'&'+item.materialRev"
							:label="item.material"
							:value="item.material+'&'+item.materialRev">
							<span style="float: left">{{ item.material }}</span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.materialRev }}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="value" v-if="searchForm.definedBy == 'MATERIAL_GROUP'">
					<el-select v-model="searchForm.value" placeholder="请选择" @change="onChange" filterable>
						<el-option
							v-for="item in options"
							:key="item.materialGroup"
							:label="item.materialGroup"
							:value="item.materialGroup">
							<!-- <span style="float: left">{{ item.materialGroup }}</span> -->
							<!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.materialRev }}</span> -->
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="版本:" prop="materialRev" v-if="searchForm.definedBy !== 'MATERIAL_GROUP'" required>
					<el-input v-model="searchForm.materialRev" disabled></el-input>
				</el-form-item>
				<el-form-item label="提交规则:" prop="commitType" required>
					<el-select v-model="searchForm.commitType" placeholder="请选择">
						<el-option
							v-for="item in commitRule"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="search('searchForm')">查询</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="add" :disabled="this.checkedList.length>0">新增</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save" :disabled="this.checkedList.length===0">编辑</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="del" :disabled="this.checkedList.length===0">删除</el-button>
		</div>
		<div class="">
			<el-table
			border
			ref="multipleTable"
			:data="tableData.data"
			tooltip-effect="dark"
			row-key="sequence"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<!-- <el-table-column type="index" label="序号"></el-table-column> -->
				<el-table-column prop="sequence" label="序号"></el-table-column>
				<el-table-column prop="sequenceType" label="类型"></el-table-column>
				<el-table-column prop="fixedString" label="固定字符串值"></el-table-column>
				<el-table-column prop="varType" label="可替换参数值"></el-table-column>
				<el-table-column prop="dateTimeFormat" label="时间"></el-table-column>
				<el-table-column prop="length" label="长度"></el-table-column>
				<el-table-column prop="numBase" label="进制"></el-table-column>
				<el-table-column prop="numIncrease" label="增量"></el-table-column>
				<el-table-column prop="initValue" label="初始值"></el-table-column>
				<el-table-column prop="finalValue" label="最终值"></el-table-column>
				<el-table-column prop="reset" label="循环"></el-table-column>
				<el-table-column prop="orders" label="顺序"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">
							<el-button size="mini" type="primary">↑</el-button>
							<el-button size="mini" type="primary">↓</el-button>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import {getNextNumberList, searchMat, searchMatGroup, deleteNextNumber} from '../../../api/next.number.api.js'
	import { mapMutations } from "vuex";
	export default {
		name:'next-number',
		data() {
			return {
				formLabelWidth:'120px',
				searchForm: {
					definedBy: '',
					nextNumberType: '',
					value: '',
					materialRev: '',
					commitType: '',
				},
				addDialog: false,
				addForm: {
					type: '',
					str: '',
				},
				checkedList:[],
				options:[],

				rules: {
					nextNumberType:[
						{ required:true,message:'请选择编号类型', trigger: 'change' }
					],
					definedBy:[
						{ required:true,message:'请选择定义目标', trigger: 'change' }
					],
					materialRev:[
						{ required:true,message:'请填写版本号', trigger: 'blur' }
					],
					commitType:[
						{ required:true,message:'请选择提交规则', trigger: 'change' }
					],
				},
				tableData: {
					data:[],
					page:{
						currentPage:1,
						pageSize:0,
						total:0
					}
				},
				type: [{
					value: 'S',
					label: '工单下达'
				}, {
					value: 'I',
					label: '车间库存接收'
				}],
				target: [{
					value: 'MATERIAL',
					label: '物料'
				}, {
					value: 'MATERIAL_GROUP',
					label: '物料组'
				}],
				commitRule: [{
					value: 'transaction',
					label: '事务'
				}, {
					value: 'immediately',
					label: '即时'
				}],
			}
		},
		created(){
			// this.search()
		},
		methods: {
			...mapMutations(["SETNEXTNUMBEREDITLIST"]),
			definedChange(val){
				console.log(val)
				this.searchForm.value = '',
				this.searchForm.materialRev = ''
				if(val == 'MATERIAL'){
					searchMat().then(data=>{
						this.options = data.data.data
					})
				}else if(val == 'MATERIAL_GROUP'){
					searchMatGroup().then(data=>{
						this.options = data.data.data
					})
				}
			},
			search(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = this.searchForm
						params.pageSize = this.tableData.page.pageSize
						params.currentPage = this.tableData.page.currentPage
						params.material = this.searchForm.value.split('&')[0]
						getNextNumberList(params).then(data => {
							if(data.data.code == 200){
								this.tableData.data = data.data.data.sequences.data
							}else{
								this.$message.error(data.data.message)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleSelectionChange(val){
				val.map(item=>{
					item.nextNumberType = this.searchForm.nextNumberType
					item.definedBy = this.searchForm.definedBy
					item.materialRev = this.searchForm.materialRev
					item.commitType = this.searchForm.commitType
					item.material = this.searchForm.value.split('&')[0]
				})
				this.checkedList = val
			},
			handleSizeChange(pageSize){
				this.tableData.page.pageSize = pageSize
				this.search()
			},
			handleCurrentChange(currentPage){
				this.tableData.page.currentPage = currentPage
				this.search()
			},
			onChange(val){
				console.log(val)
				this.searchForm.materialRev = val.split('&')[1]
			},
			add() {
				this.$router.push({path:'/nextNumber/addNextNumber'})
			},
			save() {
				this.SETNEXTNUMBEREDITLIST(this.checkedList);
				this.$router.push({path:'/nextNumber/editNextNumber'})
			},
			del(){
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let params = {}
					params.nextNumberType = this.searchForm.nextNumberType
					params.definedBy = this.searchForm.definedBy
					params.material = this.searchForm.value.split('&')[0]
					params.materialRev = this.searchForm.materialRev
					params.commitType = this.searchForm.commitType
					params.sequences = {
						data:this.checkedList
					}
					deleteNextNumber(params).then(data=>{
						if(data.data.code == 200){
							this.$message.success('删除成功')
							this.search('searchForm')
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
</style>
