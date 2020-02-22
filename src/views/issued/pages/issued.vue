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
                            <dsn-button size="small" type="primary" style="margin-left:26px;" @click.native="handleIssued">下达</dsn-button>
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
        <el-dialog
        title="工单"
        :visible.sync="orderDialog"
        width="500px">
        <dsn-table
            ref="multipleTable"
            :data="orderTable"
            tooltip-effect="dark"
            style="width: 100%"
            height="350px"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="shopOrder" label="工单" width="120"></el-table-column>
            <el-table-column label="状态" prop="status" width="120"></el-table-column>
            <el-table-column prop="shopOrderType" label="类型" show-overflow-tooltip></el-table-column>
            </dsn-table>
        <span slot="footer" class="dialog-footer">
            <dsn-button @click="orderDialog = false">取 消</dsn-button>
            <dsn-button type="primary" @click="sureOrder">确 定</dsn-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
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
            workOrderIssued: {
                shopOrder: '',
                numIssued:'',
            },
            tableData:[],//工单下达列表
            multipleSelection: [],
            orderTable:[],
            orderDialog:false,
            orderChoice:[],
            handleTableChangeList:[],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            rules:{
                shopOrder: [{ required: true, message: "请输入工单", trigger: "blur" }],
                numIssued: [{ required: true, message: "请输入下达数量", trigger: "blur" }],
            }
        }
    },
    methods:{
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
            findShopOrderListHttp().then(data => {
            const res = data.data;
            if (res.code === 200) {
            data = res.data;
            console.log("data",data)
            this.exportResult(data);
            return;
            }
            this.$message({
                message: res.message,
                type: "warning"
                });
            });
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
            // alert("1111");
            findShopOrderListHttp().then(data =>{
            const res = data.data
            if(res.code == 200){
              // console.log(res,"shuju ")
              this.orderTable=res.data
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
        sureOrder(){
            if(this.orderChoice.length>1){
                this.$message({
                    message:"只能选择一行数据",
                    type:'warning'
                })
            }else{
                this.workOrderIssued.shopOrder=this.orderChoice[0].shopOrder;
                this.workOrderIssued.numIssued="";
                this.shopOrderInfo={
                    status:"",
                    productQty:"",
                    plannedMaterialRev:"",
                    plannedMaterial:"",
                    plannedRouterRev:"",
                    plannedRouter:"",
                    availableQuantity:""
                }
                this.tableData=[];
                this.orderDialog=false;
            }
        },
        handleSelectionChange(row){
            // console.log(row,"hahah")
            this.orderChoice=row
        },
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
                        console.log('获取工单信息'+JSON.stringify(this.shopOrderInfo))
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
            height:200px;
            width:50%;
            background:#fff;
            box-sizing: border-box;
            margin:0 10px;
            .showData{
                display: flex;
                justify-content:space-between;
                margin:10px;
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