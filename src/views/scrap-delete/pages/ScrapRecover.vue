<template>
  <div>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <!-- 卡片内容 -->
    <div>
      <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules"  :label-width="formLabelWidth">
        <el-form-item label="输入搜索条件:" prop="width">
          <dsn-input placeholder="请输入内容" v-model="searchForm.code" class="input-with-select">
            <dsn-select v-model="searchForm.codeType" slot="prepend" @change="blurSearchFor">
              <el-option label="LOT" value="LOT"></el-option>
              <el-option label="容器" value="CON"></el-option>
            </dsn-select>
          </dsn-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <dsn-button  size="small" icon="el-icon-search" type="primary" @click.native="search">查询</dsn-button>
          <dsn-button  size="small" icon="el-icon-refresh" type="primary" @click.native="resetForm">重置</dsn-button>
        </el-form-item>
      </el-form>
    </div>
    </DsnPanel>
    <!-- 卡片内容 -->
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="报废" name="first">
        <div class="operate ml30 mtb10">
          <dsn-button class="mr25 pad1025" size="small" type="primary" @click.native="mark" :disabled="this.checkedList.length===0">报废标记</dsn-button>
          <dsn-input placeholder="请输入内容" v-model="des" class="des">
            <template slot="prepend">报废描述:</template>
          </dsn-input>
        </div>
        <div class="">
          <dsn-table
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
            <el-table-column prop="finalOperationName" label="最后作业人员"></el-table-column>
            <el-table-column prop="packingClass" label="容器层级"></el-table-column>
            <!-- <el-table-column prop="numbersInvolved" label="删除时间"></el-table-column>
            <el-table-column prop="resource" label="删除人员"></el-table-column>
            <el-table-column prop="clearFlag" label="删除描述"></el-table-column>
            <el-table-column prop="clearTime" label="恢复删除时间"></el-table-column>
            <el-table-column prop="clearUserId" label="恢复删除人员"></el-table-column>
            <el-table-column prop="clearComment" label="恢复删除描述"></el-table-column> -->
          </dsn-table>
          <dsn-pagination class="mtb20"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.tableData.page.currentPage"
            :page-sizes="[1, 10, 15, 20, 30, 50]"
            :page-size="this.tableData.page.pageSize"
            layout="->, total, prev, pager, next, sizes"
            :total="this.tableData.page.total">
          </dsn-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="恢复" name="second">
        <div class="operate ml30 mtb10">
          <dsn-button class="mr25 pad1025" size="small" type="primary" @click.native="recover" :disabled="this.checkedList.length===0">恢复报废</dsn-button>
          <dsn-input placeholder="请输入内容" v-model="unScrapDes" class="des">
            <template slot="prepend">恢复报废描述:</template>
          </dsn-input>
        </div>
        <div class="">
          <dsn-table
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
            <el-table-column prop="finalOperationName" label="最后作业人员"></el-table-column>
            <el-table-column prop="packingClass" label="容器层级"></el-table-column>
            <el-table-column prop="scrapTime" label="报废时间"></el-table-column>
            <el-table-column prop="scrapUserName" label="报废人员"></el-table-column>
            <el-table-column prop="scrapDes" label="报废描述"></el-table-column>
            <el-table-column prop="unscrapTime" label="恢复报废时间"></el-table-column>
            <el-table-column prop="unscrapUserName" label="恢复报废人员"></el-table-column>
            <el-table-column prop="unscrapDes" label="恢复报废描述"></el-table-column>
          </dsn-table>
          <dsn-pagination class="mtb20"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.tableData.page.currentPage"
            :page-sizes="[1, 10, 15, 20, 30, 50]"
            :page-size="this.tableData.page.pageSize"
            layout="->, total, prev, pager, next, sizes"
            :total="this.tableData.page.total">
          </dsn-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="记录" name="third">
        <div class="">
          <dsn-table
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
            <el-table-column prop="finalOperationName" label="最后作业人员"></el-table-column>
            <el-table-column prop="packingClass" label="容器层级"></el-table-column>
            <el-table-column prop="scrapTime" label="报废时间"></el-table-column>
            <el-table-column prop="scrapUserName" label="报废人员"></el-table-column>
            <el-table-column prop="scrapDes" label="报废描述"></el-table-column>
             <el-table-column prop="unscrapTime" label="恢复报废时间"></el-table-column>
            <el-table-column prop="unscrapUserName" label="恢复报废人员"></el-table-column>
            <el-table-column prop="unscrapDes" label="恢复报废描述"></el-table-column>
          </dsn-table>
          <dsn-pagination class="mtb20"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.tableData.page.currentPage"
            :page-sizes="[1, 10, 15, 20, 30, 50]"
            :page-size="this.tableData.page.pageSize"
            layout="->, total, prev, pager, next, sizes"
            :total="this.tableData.page.total">
          </dsn-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    </DsnPanel>
  </div>
</template>

<script>
import {getScrapList, scrapMark, getRecoverList, recoverMark, getLogList} from '../../../api/scrap.recover.api'
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
        des:'',
        unScrapDes:'',
      }
    },
    created(){
      this.search()
    },
    methods: {
       //下拉框值改变时调用
      blurSearchFor(){
        this.search()
      },
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
          getScrapList(params).then(data => {
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
          obj.des = this.des
          arr.push(obj)
        })
        let params = {
          codeType:this.searchForm.codeType,
          list: arr
        }
        scrapMark(params).then(data=>{
          console.log(data)
          if(data.data.code == 200){
            this.$message.success('操作成功')
            this.$refs.deleteTable.clearSelection()
            this.des = ''
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
          obj.unScrapDes = this.unScrapDes
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
            this.unScrapDes = ''
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
   .input-with-select{
    top: 6.9px !important;
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
