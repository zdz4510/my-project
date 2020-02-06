<template>
    <div class="issued">
        <!--顶部-->
        <div class="issudTop">
            <!--顶部左边-->
            <div class="topLeft">
                <el-form  ref="workOrderIssued" label-width="100px" class="demo-ruleForm" :model="workOrderIssued">
                    <el-form-item
                        label="工单:"
                        prop="shopOrder"
                        :rules="[
                        { required: true, message: '工单不能为空'}
                        ]"
                    >
                        <el-col :span="9">
                            <el-input  autocomplete="off" v-model='workOrderIssued.shopOrder'></el-input>
                        </el-col>
                        
                        <div class="choiceBox">
                            <i class="el-icon-document-copy choice"></i>                        
                            <el-button size="small" type="primary" @click="handleGet">获取</el-button>
                            <el-button size="small" type="primary">清除</el-button>
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
                            <el-input  autocomplete="off" v-model='workOrderIssued.numIssued'></el-input>
                        </el-col>
                        <el-button size="small" type="primary" style="margin-left:26px;" @click="handleIssued">下达</el-button>
                    </el-form-item>
                </el-form>
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
            <el-button type="primary" size="small">导出</el-button>
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
            shopOrder:'',//工单
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
        //获取工单信息
        handleGet(){
            const params = {
                shopOrder:this.shopOrder,
                tenantSiteCode:this.tenantSiteCode
            }
            console.log(this.shopOrder,"111")
            if(this.shopOrder !== ""){
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
                quantity: 2,
                shopOrder: this.shopOrder
            }
            releaseRequest(params).then(data=>{
                const res = data.data
                if(res.code == 200){
                    this.tableData = res.data.releasedLotList
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].shopOrder = this.shopOrder
                    }
                }else{
                    this.$message({
                        message:`${res.message}`,
                        type:'warning'
                    })
                }
                console.log('这是工单下达信息'+JSON.stringify(this.tableData))
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
            height:auto;
            width:40%;
            background:#fff;
            box-sizing: border-box;
            padding:10px 5px;
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