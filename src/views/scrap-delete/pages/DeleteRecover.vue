<template>
  <div>
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" class="form-style" :label-width="formLabelWidth">
        <el-form-item label="输入搜索条件:" prop="width">
          <el-input placeholder="请输入内容" v-model="searchForm.code" class="input-with-select">
            <el-select v-model="searchForm.codeType" slot="prepend">
              <el-option label="LOT" value="LOT"></el-option>
              <el-option label="容器" value="CON"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-button class="ml15 mr25 pad1025" size="small" type="primary" @click="search">查询</el-button>
          <el-button class="pad1025" size="small" type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="删除" name="first">
        <div class="operate ml30 mtb10">
          <el-button class="mr25 pad1025" size="small" type="primary" @click="mark" :disabled="this.checkedList.length===0">删除标记</el-button>
          <el-input placeholder="请输入内容" v-model="deleteDes" class="des">
            <template slot="prepend">删除描述:</template>
          </el-input>
        </div>
        <div class="">
          <el-table
          ref="deleteTable"
          :data="this.tableData.data"
          tooltip-effect="dark"
          row-key="sequence"
          @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="lot" label="LOT"></el-table-column>
            <el-table-column prop="mainNumber" label="容器号"></el-table-column>
            <el-table-column prop="material" label="物料号"></el-table-column>
            <el-table-column prop="shopOrder" label="工单号"></el-table-column>
            <el-table-column prop="operation" label="工序"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="finalOperationTime" label="最后作业时间"></el-table-column>
            <el-table-column prop="finalOperationUserName" label="最后作业人员"></el-table-column>
            <el-table-column prop="packingClass" label="容器层级"></el-table-column>
            <!-- <el-table-column prop="numbersInvolved" label="删除时间"></el-table-column>
            <el-table-column prop="resource" label="删除人员"></el-table-column>
            <el-table-column prop="clearFlag" label="删除描述"></el-table-column>
            <el-table-column prop="clearTime" label="恢复删除时间"></el-table-column>
            <el-table-column prop="clearUserId" label="恢复删除人员"></el-table-column>
            <el-table-column prop="clearComment" label="恢复删除描述"></el-table-column> -->
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
      <el-tab-pane label="恢复" name="second">
        <div class="operate ml30 mtb10">
          <el-button class="mr25 pad1025" size="small" type="primary" @click="recover" :disabled="this.checkedList.length===0">恢复删除</el-button>
          <el-input placeholder="请输入内容" v-model="undeleteDes" class="des">
            <template slot="prepend">恢复删除描述:</template>
          </el-input>
        </div>
        <div class="">
          <el-table
          ref="recoverTable"
          :data="this.tableData.data"
          tooltip-effect="dark"
          row-key="sequence"
          @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="transactionId" label="事物ID"></el-table-column>
            <el-table-column prop="lot" label="LOT"></el-table-column>
            <el-table-column prop="mainNumber" label="容器号"></el-table-column>
            <el-table-column prop="material" label="物料号"></el-table-column>
            <el-table-column prop="shopOrder" label="工单号"></el-table-column>
            <el-table-column prop="operation" label="工序"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="finalOperationTime" label="最后作业时间"></el-table-column>
            <el-table-column prop="finalOperationUserName" label="最后作业人员"></el-table-column>
            <el-table-column prop="packingClass" label="容器层级"></el-table-column>
            <el-table-column prop="deleteTime" label="删除时间"></el-table-column>
            <el-table-column prop="deleteUserName" label="删除人员"></el-table-column>
            <el-table-column prop="deleteDes" label="删除描述"></el-table-column>
            <el-table-column prop="undeleteTime" label="恢复删除时间"></el-table-column>
            <el-table-column prop="undeleteUserName" label="恢复删除人员"></el-table-column>
            <el-table-column prop="undeleteDes" label="恢复删除描述"></el-table-column>
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
      <el-tab-pane label="记录" name="third">
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
            <el-table-column prop="lot" label="LOT"></el-table-column>
            <el-table-column prop="mainNumber" label="容器号"></el-table-column>
            <el-table-column prop="material" label="物料号"></el-table-column>
            <el-table-column prop="shopOrder" label="工单号"></el-table-column>
             <el-table-column prop="operation" label="工序"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="finalOperationTime" label="最后作业时间"></el-table-column>
            <el-table-column prop="finalOperationUserName" label="最后作业人员"></el-table-column>
            <el-table-column prop="packingClass" label="容器层级"></el-table-column>
            <el-table-column prop="scrapTime" label="报废时间"></el-table-column>
            <el-table-column prop="scrapUserName" label="报废人员"></el-table-column>
            <el-table-column prop="scrapDes" label="报废描述"></el-table-column>
            <el-table-column prop="unDeleteTime" label="恢复删除时间"></el-table-column>
            <el-table-column prop="unDeleteUserName" label="恢复删除人员"></el-table-column>
            <el-table-column prop="unDeleteDes" label="恢复删除描述"></el-table-column>
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
import {getDeleteList, deleteMark, getRecoverList, recoverMark, getLogList} from '../../../api/delete.recover.api'
  export default {
    name:'delete-recover',
    data() {
      return {
        activeName:'first',
        checkedList:[],
        recoverCheckedList:[],
        formLabelWidth:'120px',
        searchForm: {
          codeType: 'LOT',
          code: '',
        },
        rules:{

        },
        tableData: {
          data:[],
          page:{
            currentPage:1,
            pageSize:10,
            total:0
          }
        },
        deleteDes:'',
        undeleteDes:'',
      }
    },
    created(){
      this.search()
    },
    methods: {
      handleClick(tab){
        this.activeName = tab.name
        this.$refs.deleteTable.clearSelection()
        this.$refs.recoverTable.clearSelection()
        this.$refs.multipleTable.clearSelection()
        this.search()
      },
      search(){
        let params = this.searchForm
        params.pageSize = this.tableData.page.pageSize
        params.currentPage = this.tableData.page.currentPage
        if(this.activeName == 'first'){
          getDeleteList(params).then(data => {
            if(data.data.code == 200){
              this.tableData.data = data.data.data.data
              this.tableData.page.total = data.data.data.total
            }else{
              this.$message.error(data.data.data.message)
            }
          })
        }else if(this.activeName == 'second'){
          getRecoverList(params).then(data => {
            if(data.data.code == 200){
              this.tableData.data = data.data.data.data
              this.tableData.page.total = data.data.data.total
            }else{
              this.$message.error(data.data.data.message)
            }
          })
        }else if(this.activeName == 'third'){
          getLogList(params).then(data => {
            if(data.data.code == 200){
              this.tableData.data = data.data.data.data
              this.tableData.page.total = data.data.data.total
            }else{
              this.$message.error(data.data.data.message)
            }
          })
        }
        
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

      mark(){
        let arr = []
        this.checkedList.map(item=>{
          let obj = item
          obj.deleteDes = this.deleteDes
          arr.push(obj)
        })
        let params = {
          codeType:this.searchForm.codeType,
          list: arr
        }
        deleteMark(params).then(data=>{
          console.log(data)
          if(data.data.code == 200){
            this.$message.success('操作成功')
            this.$refs.deleteTable.clearSelection()
            this.deleteDes = ''
            this.search()
          }else{
            this.$message.error(data.data.message)
          }
        })
      },
      recover(){
        let arr = []
        this.checkedList.map(item=>{
          let obj = item
          obj.undeleteDes = this.undeleteDes
          arr.push(obj)
        })
        let params = {
          codeType:this.searchForm.codeType,
          list: arr
        }
        recoverMark(params).then(data=>{
          console.log(data)
          if(data.data.code == 200){
            this.$message.success('操作成功')
            this.search()
            this.undeleteDes = ''
          }else{
            this.$message.error(data.data.message)
          }
        })
      },
      
      resetForm() {
        // this.$refs[formName].resetFields();
        this.searchForm.code = ''
        this.search()
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
	.content {
		background: #FFFFFF;
	}
	.add-form {
		padding-left: 25px;
	}
	.des {
		width: 770px !important;
	}
  .el-select /deep/ .el-input {
    width: 200px;
  }
</style>
