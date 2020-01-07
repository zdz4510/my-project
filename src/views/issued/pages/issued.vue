<template>
    <div class="issued">
        <!--顶部-->
        <div class="issudTop">
            <!--顶部左边-->
            <div class="topLeft">
                <el-form :model="workOrderIssued" ref="workOrderIssued" label-width="100px" class="demo-ruleForm">
                    <el-form-item
                        label="工单:"
                        prop="workOrder"
                        :rules="[
                        { required: true, message: '工单不能为空'}
                        ]"
                    >
                        <el-col :span="12">
                            <el-input  autocomplete="off" v-model='workOrderIssued.workOrder'></el-input>
                        </el-col>
                        
                        <div class="choiceBox">
                            <i class="el-icon-document-copy choice"></i>                        
                            <el-button size="small" type="primary">获取</el-button>
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
                        <el-col :span="12">
                            <el-input  autocomplete="off" v-model='workOrderIssued.numIssued'></el-input>
                        </el-col>
                        <el-button size="small" type="primary" style="margin-left:26px;">下达</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="topRigt">
                <div class="showData">
                    <div><i>*</i><span>状态：</span></div>
                    <div><i>*</i><span>生产数量:</span></div>
                </div>
                <div class="showData">
                    <div><i>*</i><span>物料(版本):</span></div>
                    <div><i>*</i><span>已下达数量:</span></div>
                </div>
                <div class="showData">
                    <div><i>*</i><span>工艺路线(版本)：</span></div>
                    <div><i>*</i><span>可下达数量:</span></div>
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
                width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="LOT"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="数量"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="物料"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="物料版本"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="工艺路线"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="工艺路线版本"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            workOrderIssued: {
                workOrder: '',
                numIssued:'',
            },
             tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: []
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
.height48{
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
.choiceBox{
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
.el-form-item__content{
    display: flex;
}
</style>