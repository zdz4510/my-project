<template>
    <div class="issued">
        <!--顶部-->
        <div class="issudTop">
            <!--顶部左边-->
            <div class="topLeft">
                <DsnPanel>
                    <div slot="header" class="title clearfix">
                        <span>搜索信息</span>
                    </div>
                    <el-form
                        :inline="true"
                        :model="workOrderIssued"
                        ref="workOrderIssued"
                        :rules="rules"
                        class="form-style"
                        label-width="100px"
                    >
                        <el-form-item 
                            label="工单:"
                            prop="shopOrder">
                            <el-row>
                                <el-col :span="22">
                                <dsn-input size="small" placeholder="请输入工单" v-model="workOrderIssued.shopOrder"></dsn-input>
                                </el-col>
                                <el-col :span="2">
                                <i class="el-icon-document" @click="orderHandler"></i>
                                </el-col>
                            </el-row>
                            <!-- <el-input size="small" autocomplete="off" v-model='workOrderIssued.shopOrder'><el-button size="small" slot="append" icon="el-icon-document-copy" @click="orderHandler"></el-button></el-input> -->
                        </el-form-item> 
                        <el-form-item>
                            <dsn-button size="small" type="primary" @click.native="handleGet">获取</dsn-button>
                            <dsn-button size="small" type="primary" @click.native="reset">清除</dsn-button>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" :rules="rules" ref="workOrderIssued" label-width="100px" class="demo-ruleForm" :model="workOrderIssued">
                        <el-form-item
                            label="下达数量:"
                            prop="numIssued"
                        >
                            <dsn-input  autocomplete="off" v-model='workOrderIssued.numIssued'></dsn-input>
                        </el-form-item>
                        <el-form-item>
                            <dsn-button size="small" type="primary" style="margin-left:26px;" :disabled="disabledVisable"  @click.native="handleIssued">下达</dsn-button>
                        </el-form-item>
                    </el-form>
                    <!-- <div class="operate">                       
                        <dsn-button size="small" type="primary" @click.native="handleGet">获取</dsn-button>
                        <dsn-button size="small" type="primary" @click.native="reset">清除</dsn-button>
                    </div> -->
                </DsnPanel>
            </div>
            <div class="topRigt">
                <div class="showData">
                    <div><i>*</i><span>状态：{{shopOrderInfo.status}}</span></div>
                    <div><i>*</i><span>生产数量:{{shopOrderInfo.productQty}}</span></div>
                </div>
                <div class="showData">
                    <div><i>*</i><span>物料(版本):{{shopOrderInfo.plannedMaterial}}/{{shopOrderInfo.plannedMaterialRev}}</span></div>
                    <div><i>*</i><span>已下达数量:{{shopOrderInfo.releasedQuantity}}</span></div>
                </div>
                <div class="showData">
                    <div><i>*</i><span>工艺路线(版本)：{{shopOrderInfo.plannedRouter}}/{{shopOrderInfo.plannedRouterRev}}</span></div>
                    <div><i>*</i><span>可下达数量:{{shopOrderInfo.availableQuantity}}</span></div>
                </div>
            </div>
        </div>
        
        <!--下达列表-->
        <div class="height48">
            <div>工单下达</div>
            <dsn-button type="primary" size="small" icon="el-icon-upload2" @click.native="exportExcelUndeal" >导出</dsn-button>
        </div>
        <div class="issuedTable">
            <dsn-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                height="514px"
                @selection-change="handleTableChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="工单"
                width="120"
                prop='shopOrder'>
                </el-table-column>
                <el-table-column
                prop="lot"
                label="LOT"
                width="120">
                </el-table-column>
                <el-table-column
                prop="quantity"
                label="数量"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="material"
                label="物料"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="materialRev"
                label="物料版本"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="router"
                label="工艺路线"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="routerRev"
                label="工艺路线版本"
                show-overflow-tooltip>
                </el-table-column>
            </dsn-table>
        </div>
        <!--工单选择-->
        <DsnSelectDialog
        title="工单选择"
        :isSingle="true"
        ref="orderChoice"
        :tableData="orderTable"
        v-model="selectOrderArr"
        :helpText="helpTextOrdere"
        @confirm="handlerOrderChange"
        @cancle="handlerCancleOrder"
        :visible.sync="orderDialog"
        width="800px"
        keyValue="shopOrder">
      <!-- <template slot="header">
        <el-input v-model="v" placeholder=""></el-input>
        <el-button @click="orderHandler">search</el-button>
      </template> -->
      <!-- <dsn-table
          ref="multipleTable"
          :data="orderTable"
          tooltip-eforderTablefect="dark"
          style="width: 100%"
          height="350px"
          stripe
          highlight-current-row
          border
          @selection-change="handleSelectionChange"
        > -->
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <template slot="header">
            <el-form label-width="100px" ref="searchOrderForm" :model="searchOrderForm" :inline="true">
              <el-form-item label="工单:">
                <dsn-input size="small" placeholder="请输入工单" v-model="searchOrderForm.shopOrder"></dsn-input>
              </el-form-item>
              <el-form-item label="工单类型:">
                <!-- <dsn-input size="small" placeholder="请输入工单类型" v-model="searchOrderForm.shopOrderType"></dsn-input> -->
                <dsn-select v-model="searchOrderForm.shopOrderType" placeholder="生产">
                  <el-option label="生产" value="PRODUCTION"></el-option>
                  <el-option label="返工" value="REWORK"></el-option>
                </dsn-select>
              </el-form-item>
              <el-form-item>
                  <dsn-button size="small"  type="primary" icon="el-icon-search" @click.native="searchOrder">查询</dsn-button>
                  <dsn-button size="small" type="primary" icon="el-icon-refresh" @click.native='resetSearchForm'>重置</dsn-button>
              </el-form-item>
            </el-form>
          </template>
          <template slot="body">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="shopOrder" label="工单" width="120"></el-table-column>
            <el-table-column label="状态" prop="status" width="120"></el-table-column>
            <el-table-column prop="shopOrderType" label="类型">
            </el-table-column>
          </template>
        <!-- </dsn-table> -->
      <!-- <span slot="footer" class="dialog-footer">
        <dsn-button @click="orderDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureOrder">确 定</dsn-button>
      </span> -->
    </DsnSelectDialog>
    </div>
</template>
<script>
import _ from "lodash";
import {
    findShopOrderListRequest,
    releaseRequest
} from '@/api/issued/issued.api.js' 
import{
    findShopOrderListHttp
} from '@/api/work-order/work-order.api.js'
import { exportExcel } from "@/until/excel.js";
const tHeader = [
  "工单",
  "Lot",
  "数量",
  "物料",
  "物料版本",
  "工艺路线",
  "工艺路线版本"
];
const filterVal = [
  "shopOrder",
  "lot",
  "quantity",
  "material",
  "materialRev",
  "router",
  "routerRev"
];
const fileName="工单下达表"
export default {
    data(){
        const numIssuedRules = (rule, value, callback) => {
        if (value === "") {
            this.disabledVisable=true;
            callback("下达数量不为空");
        }
        let reg = /^[1-9]\d*$/;
        if (!reg.test(value)) {
            this.disabledVisable=true;
            callback("下达数量应只包含非零整数");
        }else{
            this.disabledVisable=false;
            callback();
        }
        
        };
        return{
            tHeader,
            filterVal,
            fileName,
            tenantSiteCode:'',
            shopOrderInfo:{
                status:"",
                productQty:"",
                plannedMaterialRev:"",
                plannedMaterial:"",
                plannedRouterRev:"",
                plannedRouter:"",
                availableQuantity:""
            },//工单信息
            disabledVisable:true,
            workOrderIssued: {
                shopOrder: '',
                numIssued:'',
            },
            searchOrderForm:{
                shopOrder:"",
                shopOrderType:"PRODUCTION"
            },
            selectOrderArr:[],
            orderAll:[],
            tableData:[],//工单下达列表
            multipleSelection: [],
            orderTable:[],
            orderDialog:false,
            // orderChoice:[],
            handleTableChangeList:[],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            rules:{
                shopOrder: [{ required: true, message: "请输入工单", trigger: "blur" }],
                numIssued: [{ required: true, validator: numIssuedRules, trigger: "blur" }],
            }
        }
    },
    created(){
        this.shopOrderAll();
    },
    methods:{
        // 工单相关
        helpTextOrdere(item){
        return item["shopOrder"];
        },
        handlerOrderChange(val){
        this.selectOrderArr=val
        if(this.selectOrderArr.length===0){
            this.workOrderIssued.shopOrder="";
        }else{
            this.workOrderIssued.shopOrder=this.selectOrderArr[0].shopOrder;
        }
        this.orderDialog=false;
        },
        // 取消事件,工单
        handlerCancleOrder(){
        this.orderDialog=false;
        },
        searchOrder(){
            const data=this.searchOrderForm
            findShopOrderListHttp(data).then(data =>{
                const res = data.data
                if(res.code == 200){
                this.orderTable=res.data
                }else{
                this.$message({
                    message:res.message,
                    type:'warning'
                })
                }
            })
            },
        resetSearchForm(){
            this.searchOrderForm.shopOrder="",
            this.searchOrderForm.shopOrderType="";
            this.$refs["orderChoice"].resert();
            this.orderTable=this.orderAll;
        // this.selectOrderArr=[];
        },
        shopOrderAll(){
        const data={
            shopOrder:"",
            shopOrderType:""
        }
        findShopOrderListHttp(data).then(data =>{
            const res = data.data
            if(res.code == 200){
            this.orderAll=_.cloneDeep(res.data)
            }else{
            this.$message({
                message:res.message,
                type:'warning'
            })
            }
        })
        },
        // 工单表格
        handleTableChange(row){
            this.handleTableChangeList=row;
        },
        // 导出操作
        exportExcelUndeal(){
            if (this.handleTableChangeList.length === 0) {
                this.exportHttpUndeal();
            }
            if (this.handleTableChangeList.length > 0) {
                this.exportResult(this.handleTableChangeList);
            }
        },
        exportHttpUndeal(){
            // findShopOrderListHttp().then(data => {
            // const res = data.data;
            // if (res.code === 200) {
            // data = res.data;
            // console.log("data",data)
            this.exportResult(this.tableData);
            // return;
            // }
            // this.$message({
            //     message: res.message,
            //     type: "warning"
            //     });
            // });
        },
        //返回结果，提示信息
        exportResult(data) {
        const tipString = exportExcel(tHeader, filterVal, data, this.fileName);
        if (tipString === undefined) {
            this.$message({
            message: "导出成功",
            type: "success"
            });
            return;
        } else {
            this.$message({
            message: tipString,
            type: "warning"
            });
            return;
        }
        },
        
        orderHandler(){
            this.orderDialog=true;
            const data={
                shopOrder:"",
                shopOrderType:""
            }
            findShopOrderListHttp(data).then(data =>{
            const res = data.data
            if(res.code == 200){
              // console.log(res,"shuju ")
              this.orderTable=res.data
              this.orderAll=_.cloneDeep(res.data)
              // this.$message({
              //   message:'更新成功',
              //   type:'success'
              // })
            }else{
              this.$message({
                message:res.message,
                type:'warning'
              })
            }
          })
            this.orderDialog=true;
        },
        // sureOrder(){
        //     if(this.orderChoice.length>1){
        //         this.$message({
        //             message:"只能选择一行数据",
        //             type:'warning'
        //         })
        //     }else{
        //         this.workOrderIssued.shopOrder=this.orderChoice[0].shopOrder;
        //         this.workOrderIssued.numIssued="";
        //         this.shopOrderInfo={
        //             status:"",
        //             productQty:"",
        //             plannedMaterialRev:"",
        //             plannedMaterial:"",
        //             plannedRouterRev:"",
        //             plannedRouter:"",
        //             availableQuantity:""
        //         }
        //         this.tableData=[];
        //         this.orderDialog=false;
        //     }
        // },
        // handleSelectionChange(row){
        //     // console.log(row,"hahah")
        //     this.orderChoice=row
        // },
        //清除按钮
        reset(){
            this.workOrderIssued ={
                shopOrder: '',
                numIssued:'',
            };
            this.shopOrderInfo={
                status:"",
                productQty:"",
                plannedMaterialRev:"",
                plannedMaterial:"",
                plannedRouterRev:"",
                plannedRouter:"",
                availableQuantity:""
            };
            this.tableData=[];
        },
        //获取工单信息
        handleGet(){
            const params = {
                shopOrder:this.workOrderIssued.shopOrder,
                tenantSiteCode:this.tenantSiteCode
            }
            if(this.workOrderIssued.shopOrder !== ""){
                findShopOrderListRequest(params).then(data =>{
                    // console.log('获取工单信息'+JSON.stringify(data))
                    const res = data.data
                    if(res.code == 200){
                        this.shopOrderInfo = res.data
                        // console.log('获取工单信息'+JSON.stringify(this.shopOrderInfo))
                    }else{
                        this.$message({
                            message:`${res.message}`,
                            type:'warning'
                        })
                    }  
                })
            }else{
                this.$message({
                    message: "请输入工单",
                    type:'warning'
                })
            }
            
        },
        //点击下达按钮
        handleIssued(){
            if(this.workOrderIssued.numIssued===""){
                this.$message({
                    message:"请先输入下达数量",
                    type:'warning'
                })
            }else{
            const params = {
                quantity: this.workOrderIssued.numIssued,
                shopOrder: this.workOrderIssued.shopOrder
            }
            releaseRequest(params).then(data=>{
                const res = data.data
                if(res.code == 200){
                    this.tableData = res.data.releasedLotList
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].shopOrder = this.workOrderIssued.shopOrder
                    }
                }else{
                    this.$message({
                        message:`${res.message}`,
                        type:'warning'
                    })
                }
            })
            }
        }
    }

}
</script>
<style lang="scss" scoped>
.issued{
    padding: 0 30px;
    .issudTop{
        width:100%;
        margin-top:30px;
        display: flex;
        margin-bottom:30px;
        .topLeft{
            width:50%;
        }
        .topRigt{
            height:170px;
            width:50%;
            background:#fff;
            box-sizing: border-box;
            margin:0 10px;
            .showData{
                display: flex;
                justify-content:space-between;
                margin:30px;
                >div{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size:14px;
                    i{
                        display: inline-block;
                        color:red;
                        margin-right:7px;
                    }
                    
                }
            }
        }
    }
    
}
.issued .height48{
    height:48px;
    width:100%;
    background:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:14px;
    border:1px solid #fff;
    border-bottom-color:rgb(235, 238, 245);
    padding:0 10px;
    box-sizing: border-box;
    div{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
//选择弹框
.issued .choiceBox{
    width:150px;
    height:41px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:50px;
    .choice{
        margin-right:7px;
    }
}
// .issued .el-form-item__content{
//     display: flex;
// }
</style>