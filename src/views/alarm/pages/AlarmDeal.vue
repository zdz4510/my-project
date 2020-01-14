<template>
	<div>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="未处理事件" name="first">
				<div class="search-bar">
					<el-form :inline="true" :model="undealSearchForm" ref="undealSearchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
						<el-form-item label="触发序号:" prop="sequence">
							<el-input v-model="undealSearchForm.sequence"></el-input>
						</el-form-item>
						<el-form-item label="触发时间:" prop="triggeringTime">
							<el-date-picker v-model="undealSearchForm.triggeringTime" type="date" placeholder="选择日期"></el-date-picker>
						</el-form-item>
						<el-form-item label="事件编号:" prop="alarm">
							<el-input v-model="undealSearchForm.alarm"></el-input>
						</el-form-item>
						<el-form-item label="预警分组:" prop="alarmGroup">
							<el-input v-model="undealSearchForm.alarmGroup"></el-input>
						</el-form-item>
						<el-form-item label="事件等级:" prop="alarmLevel">
							<el-input v-model="undealSearchForm.alarmLevel"></el-input>
						</el-form-item>
						<el-form-item label="触发类型:" prop="triggerType">
							<el-input v-model="undealSearchForm.triggerType"></el-input>
						</el-form-item>
						<el-form-item label="" prop="">
							<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="searchUndeal">查询</el-button>
							<el-button class="pad1025" size="small" type="primary" @click="undealResetForm('undealSearchForm')">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="operate ml30 mtb10">
					<el-button class="mr25 pad1025" size="small" type="warning"  @click="exportExcelUndeal" >导出</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="ack" :disabled="this.undealCheckedList.length===0">确认标记</el-button>
					<el-input placeholder="请输入内容" v-model="ackComment" class="des">
						<template slot="prepend">确认描述:</template>
					</el-input>
				</div>
				<div class="">
					<el-table
					ref="undealTable"
					:data="this.undealTableData.data"
					tooltip-effect="dark"
					row-key="sequence"
					@selection-change="handleSelectionChangeUndeal"
					>
						<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
						<el-table-column type="index" label="序号"></el-table-column>
						<el-table-column prop="sequence" label="触发序号"></el-table-column>
						<el-table-column prop="triggeringTime" label="触发时间"></el-table-column>
						<el-table-column prop="alarmGroup" label="预警分组"></el-table-column>
						<el-table-column prop="alarm" label="事件编号"></el-table-column>
						<el-table-column prop="alarmLevel" label="事件等级"></el-table-column>
						<el-table-column prop="triggerType" label="触发类型"></el-table-column>
						<el-table-column prop="workCenter" label="工作中心"></el-table-column>
						<el-table-column prop="workCenterRelation" label="产线"></el-table-column>
						<el-table-column prop="station" label="工序站位"></el-table-column>
						<el-table-column prop="shopOrder" label="工单"></el-table-column>
						<el-table-column prop="numbersInvolved" label="涉及数量"></el-table-column>
						<el-table-column prop="resource" label="设备编号"></el-table-column>
						<el-table-column prop="clearFlag" label="初始化与否"></el-table-column>
						<el-table-column prop="clearTime" label="初始化时间"></el-table-column>
						<el-table-column prop="clearUserId" label="初始化用户"></el-table-column>
						<el-table-column prop="clearComment" label="初始化注释"></el-table-column>
					</el-table>
					<el-pagination class="mtb20"
						background
						@size-change="handleSizeChangeUndeal"
						@current-change="handleCurrentChangeUndeal"
						:current-page="this.undealTableData.page.currentPage"
						:page-sizes="[1, 10, 15, 20, 30, 50]"
						:page-size="this.undealTableData.page.pageSize"
						layout="->, total, prev, pager, next, sizes, jumper"
						:total="this.undealTableData.page.total">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="已处理事件" name="second">
				<div class="search-bar">
					<el-form :inline="true" :model="dealSearchForm" ref="dealSearchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
						<el-form-item label="触发序号:" prop="sequence">
							<el-input v-model="dealSearchForm.sequence"></el-input>
						</el-form-item>
						<el-form-item label="触发时间:" prop="triggeringTime">
							<el-date-picker v-model="dealSearchForm.triggeringTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
						</el-form-item>
						<el-form-item label="事件编号:" prop="alarm">
							<el-input v-model="dealSearchForm.alarm"></el-input>
						</el-form-item>
						<el-form-item label="预警分组:" prop="alarmGroup">
							<el-input v-model="dealSearchForm.alarmGroup"></el-input>
						</el-form-item>
						<el-form-item label="事件等级:" prop="alarmLevel">
							<el-input v-model="dealSearchForm.alarmLevel"></el-input>
						</el-form-item>
						<el-form-item label="触发类型:" prop="triggerType">
							<el-input v-model="dealSearchForm.triggerType"></el-input>
						</el-form-item>
						<el-form-item label="" prop="">
							<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="searchDeal">查询</el-button>
							<el-button class="pad1025" size="small" type="primary" @click="dealResetForm('dealSearchForm')">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="operate ml30 mtb10">
					<el-button class="mr25 pad1025" size="small" type="warning"  @click="exportExcelDeal" >导出</el-button>
					<el-button class="mr25 pad1025" size="small" type="warning"  @click="del" :disabled="this.dealCheckedList.length===0">删除</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="init" :disabled="this.dealCheckedList.length===0">初始化</el-button>
					<el-input placeholder="请输入内容" v-model="clearComment" class="des">
						<template slot="prepend">初始化描述:</template>
					</el-input>
				</div>
				<div class="">
					<el-table
					ref="dealTable"
					:data="this.dealTableData.data"
					tooltip-effect="dark"
					row-key="sequence"
					@selection-change="handleSelectionChangeDeal"
					>
						<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
						<el-table-column type="index" label="序号"></el-table-column>
						<el-table-column prop="sequence" label="触发序号"></el-table-column>
						<el-table-column prop="triggeringTime" label="触发时间"></el-table-column>
						<el-table-column prop="alarmGroup" label="预警分组"></el-table-column>
						<el-table-column prop="alarm" label="事件编号"></el-table-column>
						<el-table-column prop="alarmLevel" label="事件等级"></el-table-column>
						<el-table-column prop="triggerType" label="触发类型"></el-table-column>
						<el-table-column prop="workCenter" label="工作中心"></el-table-column>
						<el-table-column prop="workCenterRelation" label="产线"></el-table-column>
						<el-table-column prop="station" label="工序站位"></el-table-column>
						<el-table-column prop="shopOrder" label="工单"></el-table-column>
						<el-table-column prop="numbersInvolved" label="涉及数量"></el-table-column>
						<el-table-column prop="resource" label="设备编号"></el-table-column>
						<el-table-column prop="ackFlag" label="确认标记"></el-table-column>
						<el-table-column prop="ackUserId" label="确认人"></el-table-column>
						<el-table-column prop="ackTime" label="确认时间"></el-table-column>
						<el-table-column prop="clearFlag" label="初始化与否"></el-table-column>
						<el-table-column prop="clearTime" label="初始化时间"></el-table-column>
						<el-table-column prop="clearUserId" label="初始化用户"></el-table-column>
						<el-table-column prop="clearComment" label="初始化注释"></el-table-column>
						<el-table-column prop="modifyUserId" label="修改人"></el-table-column>
						<el-table-column prop="modifyUserName" label="修改时间"></el-table-column>
					</el-table>
					<el-pagination class="mtb20"
						background
						@size-change="handleSizeChangeDeal"
						@current-change="handleCurrentChangeDeal"
						:current-page="this.dealTableData.page.currentPage"
						:page-sizes="[1, 10, 15, 20, 30, 50]"
						:page-size="this.dealTableData.page.pageSize"
						layout="->, total, prev, pager, next, sizes, jumper"
						:total="this.dealTableData.page.total">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="事件涉及SN序列/lot序列" name="third">
				<div class="search-bar">
					<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
						<el-form-item label="触发序号:" prop="sequence">
							<el-input v-model="searchForm.sequence"></el-input>
						</el-form-item>
						<el-form-item label="" prop="">
							<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="search">查询</el-button>
							<el-button class="pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="operate ml30 mtb10">
					<el-button class="mr25 pad1025" size="small" type="warning"  @click="exportExcel" >导出</el-button>
				</div>
				<div class="">
					<el-table
					ref="multipleTable"
					:data="this.tableData.data"
					tooltip-effect="dark"
					row-key="sequence+mainNumber+lot+alarm+resource"
					@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
						<el-table-column type="index" label="序号"></el-table-column>
						<el-table-column prop="sequence" label="触发序号"></el-table-column>
						<el-table-column prop="mainNumber" label="容器"></el-table-column>
						<el-table-column prop="lot" label="LOT"></el-table-column>
						<el-table-column prop="resource" label="设备编号"></el-table-column>
						<el-table-column prop="alarm" label="工单"></el-table-column>
						<el-table-column prop="alarm" label="事件编号"></el-table-column>
						<el-table-column prop="alarm" label="事件等级"></el-table-column>
						<el-table-column prop="alarm" label="确认标记"></el-table-column>
						<el-table-column prop="alarm" label="是否多次触发"></el-table-column>
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
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import {getAlarmGroupList, getSequenceList, updateAckData, updateInitData, deleteData} from '../../../api/alarm.deal.api'
	export default {
		name:'alarm-deal',
		data() {
			return {
				activeName:'first',
				checkedList:[],
				undealCheckedList:[],
				dealCheckedList:[],
				formLabelWidth:'120px',
				searchForm: {
					sequence: '',
					mainNumber: '',
					lot: '',
					resource: '',
					alarm: '',
				},
				rules:{},
				tableData: {
					data:[],
					page:{
						currentPage:1,
						pageSize:10,
						total:0
					}
				},
				undealSearchForm: {
					ackFlag:false,
					sequence: '',
					triggeringTime: '',
					alarm: '',
					alarmGroup: '',
					alarmLevel: '',
					triggerType: '',
				},
				undealTableData: {
					data:[],
					page:{
						currentPage:1,
						pageSize:10,
						total:0
					}
				},
				dealSearchForm: {
					ackFlag:true,
					sequence: '',
					triggeringTime: '',
					alarm: '',
					alarmGroup: '',
					alarmLevel: '',
					triggerType: '',
				},
				dealTableData: {
					data:[],
					page:{
						currentPage:1,
						pageSize:10,
						total:0
					}
				},
				ackComment:'',
				clearComment:'',
			}
		},
		created(){
			this.search()
			this.searchUndeal()
			this.searchDeal()
		},
		methods: {
			search(){
				let params = this.searchForm
				params.pageSize = this.tableData.page.pageSize
				params.currentPage = this.tableData.page.currentPage
				getSequenceList(params).then(data => {
					if(data.data.code == 200){
						this.tableData.data = data.data.data.data
						this.tableData.page.total = data.data.data.total
					}else{
						this.$message.error(data.data.message)
					}
					
				})
			},
			handleSizeChange(pageSize){
				this.tableData.page.pageSize = pageSize
				this.search()
			},
			handleCurrentChange(currentPage){
				this.tableData.page.currentPage = currentPage
				this.search()
			},
			handleSelectionChange(val) {
				this.checkedList = val;
			},

			searchUndeal(){
				let params = this.undealSearchForm
				params.pageSize = this.undealTableData.page.pageSize
				params.currentPage = this.undealTableData.page.currentPage
				getAlarmGroupList(params).then(data => {
					if(data.data.code == 200){
						this.undealTableData.data = data.data.data.data
						this.undealTableData.page.total = data.data.data.total
					}else{
						this.$message.error(data.data.message)
					}
					
				})
			},
			handleSizeChangeUndeal(pageSize){
				this.undealTableData.page.pageSize = pageSize
				this.searchUndeal()
			},
			handleCurrentChangeUndeal(currentPage){
				this.undealTableData.page.currentPage = currentPage
				this.searchUndeal()
			},
			handleSelectionChangeUndeal(val) {
				this.undealCheckedList = val;
			},

			searchDeal(){
				let params = this.dealSearchForm
				params.pageSize = this.dealTableData.page.pageSize
				params.currentPage = this.dealTableData.page.currentPage
				getAlarmGroupList(params).then(data => {
					if(data.data.code == 200){
						this.dealTableData.data = data.data.data.data
						this.dealTableData.page.total = data.data.data.total
					}else{
						this.$message.error(data.data.message)
					}
					
				})
			},
			handleSizeChangeDeal(pageSize){
				this.dealTableData.page.pageSize = pageSize
				this.searchDeal()
			},
			handleCurrentChangeDeal(currentPage){
				this.dealTableData.page.currentPage = currentPage
				this.searchDeal()
			},
			handleSelectionChangeDeal(val) {
				this.dealCheckedList = val;
			},
			ack(){
				let arr = []
				this.undealCheckedList.map(item=>{
					let obj = item
					obj.ackComment = this.ackComment
					arr.push(obj)
				})
				updateAckData(arr).then(data=>{
					console.log(data)
					if(data.data.code == 200){
						this.$message.success('操作成功')
						this.searchUndeal()
					}else{
						this.$message.error(data.data.message)
					}
				})
			},
			init(){
				let arr = []
				this.dealCheckedList.map(item=>{
					let obj = item
					obj.clearComment = this.clearComment
					arr.push(obj)
				})
				updateInitData(arr).then(data=>{
					console.log(data)
					if(data.data.code == 200){
						this.$message.success('操作成功')
						this.searchDeal()
					}else{
						this.$message.error(data.data.message)
					}
				})
			},
			del(){
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
				deleteData(this.dealCheckedList).then(data=>{
					console.log(data,'adddata')
					if(data.data.code == 200){
						this.$message.success('删除成功')
						this.searchDeal()
						this.$refs.dealTable.clearSelection()
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.search()
			},
			undealResetForm(formName) {
				this.$refs[formName].resetFields();
				this.searchUndeal()
			},
			dealResetForm(formName) {
				this.$refs[formName].resetFields();
				this.searchdeal()
			},
			exportExcel(){

			},
			exportExcelUndeal(){

			},
			exportExcelDeal(){

			}
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
	.des {
		width: 770px !important;
	}
</style>
