<template>
	<div>
		<div class="search-bar">
			<el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style">
				<el-form-item label="数据收集组:" prop="dcGroup">
					<el-input v-model="searchForm.dcGroup"></el-input>
				</el-form-item>
        <el-form-item label="数据收集组类型:" prop="collectionType">
          <el-select v-model="searchForm.collectionType">
            <el-option
              v-for="item in collectionType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="" prop="">
					<el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="search">查询</el-button>
					<el-button class="mr25 pad1025" size="small" type="primary" @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate ml30 mtb10">
			<el-button class="mr25 pad1025" size="small" type="primary" @click="add" :disabled="this.checkedList.length>0">新增</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="edit" :disabled="this.checkedList.length === 0">编辑</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning"  @click="del" :disabled="this.checkedList.length === 0">删除</el-button>
			<el-button class="mr25 pad1025" size="small" type="warning"  @click="exportExcel">导出</el-button>
		</div>
		
		<div class="">
			<el-table
			ref="multipleTable"
			:data="this.tableData.data"
			tooltip-effect="dark"
			row-key="dcGroup"
			@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column prop="dcGroup" label="数据收集组"></el-table-column>
				<el-table-column label="数据收集组类型">
					<template slot-scope="scope">{{ getFormat(scope.row.collectionType) }}</template>
				</el-table-column>
        <el-table-column prop="dcGroupDes" label="数据收集描述"></el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="modifyUserName" label="修改人"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
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
	</div>
</template>

<script>
import {getDataCollectionList, deleteDataCollection} from '../../../api/data.collection.api'
import { mapMutations } from "vuex";
	export default {
		name:'data-collection',
		data() {
			return {
				checkedList:[],
				formLabelWidth:'120px',
				searchForm: {
					dcGroup: '',
          collectionType: '',
          tenantSiteCode:'test'
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
        collectionType: [{
					value: '10',
					label: '物料'
				}, {
					value: '20',
					label: '资源'
				}, {
					value: '30',
					label: '工序'
				}, {
					value: '40',
					label: '工单'
				}],
			}
		},
		created(){
			this.search()
		},
		methods: {
			...mapMutations(["SETDATACOLLECTIONEDITLIST"]),
			search(){
				let params= {
					dcGroup: this.searchForm.dcGroup,
					collectionType: this.searchForm.collectionType,
					pageSize: this.tableData.page.pageSize,
					currentPage: this.tableData.page.currentPage,
				}
				getDataCollectionList(params).then(data => {
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
			add(){
				this.$router.push({path:'/dc/addDataCollection'})
			},
			edit(){
				this.SETDATACOLLECTIONEDITLIST(this.checkedList);
				this.$router.push({path:'/dc/editDataCollection'})
			},
			del(){
				this.$confirm('是否删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let params = this.checkedList
					deleteDataCollection(params).then(data=>{
						if(data.data.code == 200){
							this.$message.success('删除成功')
							this.$refs.multipleTable.clearSelection()
							this.search()
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
      getFormat(collectionType){
        if(collectionType == '10') {
          return '物料'
        }else if(collectionType == '20') {
          return '资源'
        }else if(collectionType == '30') {
          return '工序'
        }else if(collectionType == '40') {
          return '工单'
        }else {
          return '--'
        }
      },
      exportExcel(){
				let data = this.searchForm
				window.location.href=`${window.VUE_APP_URL}/mes/dcGroup/exportExcel?collectionType=${data.collectionType}&dcGroup=${data.dcGroup}&resource=${data.resource}&tenantSiteCode=${data.tenantSiteCode}`
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
	.dec {
		width: 400px !important;
	}
</style>
