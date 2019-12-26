<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" >
				<el-form-item label="编号类型:" prop="type" required>
					<el-select v-model="searchForm.type" placeholder="请选择">
						<el-option
							v-for="item in type"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="定义目标:" prop="target" required>
					<el-select v-model="searchForm.target" placeholder="请选择">
						<el-option
							v-for="item in target"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="value">
					<el-input v-model="searchForm.value"></el-input>
				</el-form-item>
				<el-form-item label="版本:" prop="vision">
					<el-input v-model="searchForm.vision"></el-input>
				</el-form-item>
				<el-form-item label="提交规则:" prop="rule" required>
					<el-select v-model="searchForm.rule" placeholder="请选择">
						<el-option
							v-for="item in rule"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('searchForm')" class="pad1040">查询</el-button>
					<el-button type="warning" @click="resetForm('searchForm')" class="pad1040">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="addDialog = true">添加</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="save">保存</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="modify">清除</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning" @click="del">删除</el-button>
		</div>
		<div class="">
			<el-table
			border
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="type" label="类型"></el-table-column>
				<el-table-column prop="material" label="值"></el-table-column>
				<el-table-column prop="operate" label="操作"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">
							<el-button size="mini" type="primary">编辑</el-button>
							<el-button size="mini" type="primary">↑</el-button>
							<el-button size="mini" type="primary">↓</el-button>
							<el-button size="mini" type="danger">删除</el-button>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="tr"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage4"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="->, total, prev, pager, next, sizes, jumper"
				:total="400">
			</el-pagination>
		</div>
		<el-dialog title="添加" :visible.sync="addDialog">
			<el-form :model="addForm" :inline="true" :label-width="formLabelWidth">
				<el-form-item label="规则类型:">
					<el-select v-model="addForm.type" placeholder="请选择">
						<el-option
							v-for="item in ruleTypes"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-row v-if="addForm.type == 1">
					<el-col :span="24">
						<el-form-item label="固定字符串:" prop="str">
							<el-input v-model="addForm.str"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.type == 2">
					<el-col :span="24">
						<el-form-item label="可替换参数:" prop="replaceable">
							<el-select v-model="addForm.replaceable" placeholder="请选择">
								<el-option
									v-for="item in replaceable"
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
						<el-form-item label="时间格式化:" prop="date" v-if="addForm.type == 3">
							<el-date-picker
								v-model="addForm.date"
								type="datetime"
								placeholder="选择日期时间">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.type == 4">
					<el-col :span="12">
						<el-form-item label="长度:" prop="length" required>
							<el-input v-model="addForm.length"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="进制:" prop="base">
							<el-input v-model="addForm.base"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.type == 4">
					<el-col :span="12">
						<el-form-item label="增量:" prop="increment">
							<el-input v-model="addForm.increment"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="初始值:" prop="initValue" required>
							<el-input v-model="addForm.initValue"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.type == 4">
					<el-col :span="12">
						<el-form-item label="终值:" prop="finalValue">
							<el-input v-model="addForm.finalValue"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="循环:" prop="circle">
							<el-select v-model="addForm.circle" placeholder="请选择">
								<el-option
									v-for="item in circle"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="addForm.type == 4">
					<el-col :span="12" style="padding-left: 120px;">
						<el-radio-group v-model="addForm.sequence">
							<el-radio-button label="顺序"></el-radio-button>
							<el-radio-button label="反序"></el-radio-button>
						</el-radio-group>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDialog = false">取 消</el-button>
				<el-button type="primary" @click="addDialog = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {saveNextNumber, getNextNumber} from '../../../api/next.number.api.js'
	export default {
		name:'next-number',
		data() {
			return {
				formLabelWidth:'120px',
				searchForm: {
					target: '',
					type: '',
					value: '',
					vision: '',
					rule: '',
				},
				addDialog: false,
				addForm: {
					type: '',
					str: '',
				},
				circle: [{
					value: '1',
					label: '从不'
				},{
					value: '2',
					label: '总是'
				},{
					value: '3',
					label: '每天'
				},{
					value: '4',
					label: '每周'
				},{
					value: '5',
					label: '每月'
				},{
					value: '6',
					label: '每年'
				}],
				ruleTypes: [{
					value: '1',
					label: '固定字符串'
				},{
					value: '2',
					label: '可替换参数'
				},{
					value: '3',
					label: '时间'
				},{
					value: '4',
					label: '自增长序列'
				}],
				replaceable: [{
					value: '1',
					label: '物料'
				},{
					value: '2',
					label: '物料版本'
				},{
					value: '3',
					label: '工单'
				},{
					value: '4',
					label: '工厂'
				}],
				
				rules: {
					materials: [
						{ required: true, message: '请输入物料号', trigger: 'blur' },
					],
				},
				tableData: [
				{
					type: "固定字符串",
					material: "ABC",
					operate: "版本",
				},
				{
					type: "可替换参数",
					material: "item",
					operate: "版本",
				}],
				type: [{
					value: '1',
					label: '工单下达'
				}, {
					value: '2',
					label: '成品'
				}, {
					value: '3',
					label: '原材料'
				}],
				target: [{
					value: '1',
					label: '物料'
				}, {
					value: '2',
					label: '物料组'
				}],
				rule: [{
					value: '1',
					label: '事务'
				}, {
					value: '2',
					label: '其他'
				}],
			}
		},
		created(){
			let params= {
					next_number_id:'',
				}
				getNextNumber(params).then(data => {
					this.tableData.data = data.data.data.data
					this.tableData.page.total = data.data.data.total
				})
		},
		methods: {
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
				let data 
				saveNextNumber(data).then(data => {
					// this.tableData = data.data.data;
					// this.formInline.user = "";
					console.log(data);
				})
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
</style>
