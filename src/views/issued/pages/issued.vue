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
                    <el-form  ref="workOrderIssued" label-width="100px" class="demo-ruleForm" :model="workOrderIssued">
                        <el-form-item
                            label="工单:"
                            prop="shopOrder"
                            :rules="[
                            { required: true, message: '工单不能为空'}
                            ]"
                        >
                            <el-col :span="9">
                                <dsn-input  autocomplete="off" v-model='workOrderIssued.shopOrder'></dsn-input>
                            </el-col>
                            
                            <div class="choiceBox">
                                <i class="el-icon-document-copy choice"></i>                        
                                <dsn-button size="small" type="primary" @click.native="handleGet">获取</dsn-button>
                                <dsn-button size="small" type="primary" @click.native="reset">清除</dsn-button>
                            </div>

                        </el-form-item>
                        <el-form-item
                            label="下达数量:"
                            prop="numIssued"
                            :rules="[
                            { required: true, message: '下达数量不能为空'}
                            ]"
                        >
                            <el-col :span="9">
                                <dsn-input  autocomplete="off" v-model='workOrderIssued.numIssued'></dsn-input>
                            </el-col>
                            <dsn-button size="small" type="primary" style="margin-left:26px;" @click.native="handleIssued">下达</dsn-button>
                        </el-form-item>
                    </el-form>
                </DsnPanel>
            </div>
            <div class="topRigt">
                <div class="showData">
                    <div><i>*</i><span>状态：{{shopOrderInfo.status}}</span></div>
                    <div><i>*</i><span>生产数量:{{shopOrderInfo.productQty}}</span></div>
                </div>
                <div class="showData">
                    <div><i>*</i><span>物料(版本):{{shopOrderInfo.plannedMaterialRev}}</span></div>
                    <div><i>*</i><span>已下达数量:{{shopOrderInfo.releasedQuantity}}</span></div>
                </div>
                <div class="showData">
                    <div><i>*</i><span>工艺路线(版本)：{{shopOrderInfo.plannedRouterRev}}</span></div>
                    <div><i>*</i><span>可下达数量:{{shopOrderInfo.availableQuantity}}</span></div>
                </div>
            </div>
        </div>
        <!--下达列表-->
        <div class="height48">
            <div>工单下达</div>
            <dsn-button type="primary" size="small" icon="el-icon-upload2">导出</dsn-button>
        </div>
        <div class="issuedTable">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                height="514">
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
            </el-table>
        </div>
    </div>
</template>
<script>
import {
    findShopOrderListRequest,
    releaseRequest
} from '@/api/issued/issued.api.js' 
export default {
    data(){
        return{
            tenantSiteCode:'',
            shopOrderInfo:'',//工单信息
            workOrderIssued: {
                shopOrder: '',
                numIssued:'',
            },
            tableData:[],//工单下达列表
            multipleSelection: []
        }
    },
    methods:{
        //清除按钮
        reset(){
            this.workOrderIssued = {};
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
            width:40%;
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
.issued .el-form-item__content{
    display: flex;
}
</style>