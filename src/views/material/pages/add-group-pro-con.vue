<template>
    <div class="addProConfig">
        <div class="addTop">
            <div class="topLeft">
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="按钮类型:" prop="style">
                        <el-select v-model="ruleForm.style" placeholder="普通">
                            <el-option label="普通" value="普通"></el-option>
                            <el-option label="组" value="组"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="按钮位置：" prop="options">
                        <el-select v-model="ruleForm.options" placeholder="上">
                            <el-option label="上" value="上"></el-option>
                            <el-option label="下" value="下"></el-option>
                            <el-option label="左" value="左"></el-option>
                            <el-option label="右" value="右"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="按钮标识：" prop="buttonId">
                        <el-col :span="12">
                            <el-input  v-model="ruleForm.buttonId" style="width:217px"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="按钮描述：" prop="buttonDesc">
                        <el-col :span="12">
                            <el-input  v-model="ruleForm.buttonDesc" style="width:217px"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="按钮图标：" prop="imageIcon">
                        <el-col :span="12">
                            <el-input  v-model="ruleForm.imageIcon" style="width:217px"></el-input>
                        </el-col>
                        <i class="el-icon-more" style="margin-left:7px;"></i>
                    </el-form-item>
                </el-form>
            </div>
            <div class="topRight">
                <div class="optionBox">
                    <div class="boxTop">上</div>
                    <div class="boxCenter">
                        <div class="centerLeft">左</div>
                        <div class="centerRight">右</div>
                    </div>
                    <div class="boxDown">下</div>
                </div>
            </div>
        </div>
       <div class="addDown">
           <div class="operation">
                <el-button size="small" type="primary" @click="handleAdd" >添加</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">移除</el-button>
           </div>
           <!--列表-->
           <div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="序号"
                    width="55"
                    type="index">
                    <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                    </el-table-column>
                    <el-table-column
                    prop="buttonName"
                    label="按钮名称"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="buttonDes"
                    label="按钮描述"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="buttonStyle"
                    label="按钮类型"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="operate"
                    label="操作"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
           </div>
       </div>
    </div>
</template>
<script>
import { mapMutations,
mapGetters
 } from "vuex";
export default {
    name:'add-pro-con-configuration',
    computed: {
        ...mapGetters(["proRow"])
    },
    data(){
        return{
            ruleForm:{
                style:'',//按钮类型
                options:'',//按钮方向
                buttonId:'',//按钮标识
                buttonDesc:'',//按钮描述
                imageIcon:'',//按钮图标路径
            },
            rules: {
                style: [
                    { required: true, message: '请选择按钮类型', trigger: 'blur' }
                ],
                options: [
                    { required: true, message: '请选择方向', trigger: 'blur' }
                ],
                buttonId: [
                    { required: true, message: '标识不能为空', trigger: 'blur' }
                ],
                buttonDesc: [
                    { required: true, message: '描述不能为空', trigger: 'blur' }
                ],
            },
            selectedList:[],//选中项
            //列表数据
            tableData: [],
        }
    },
    methods:{
        ...mapMutations(["PROROW"]),
        handleSelectionChange(rows){
            this.selectedList = rows
        },
        dealHandler(){
            if(this.proRow.groupFlag===true){
                this.ruleForm.style="组"
            }else{
                this.ruleForm.style="普通"
            }
            this.tableData=this.proRow.podActivities;
        },
        //到添加页面
        handleAdd(){
            this.$router.push({path:'/material/addProConfig'});
        },
    },
    created(){
        this.$nextTick(()=>{
            this.dealHandler();
        })
    },
}
</script>
<style lang="scss">
.addProConfig{
    padding:20px 30px;
    .addTop{
        display: flex;
        justify-content: space-between;
        margin-bottom:20px;
        .topLeft{
            flex:1
        }
        .topRight{
            flex:1;
            display: flex;
            align-items: center;
            justify-content: center;
            .optionBox{
                width:250px;
                height:150px;
                border:1px solid;
                box-sizing: border-box;
                .boxTop{
                    width:100%;
                    height:20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background:burlywood;
                    font-size: 14px;
                }
                .boxDown{
                    width:100%;
                    height:20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background:brown;
                    font-size: 14px;
                }
                .boxCenter{
                    width:100%;
                    height:60%;
                    background:pink;
                    display: flex;
                    justify-content: space-between;
                    .centerLeft,.centerRight{
                        width:30px;
                        height:100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background:powderblue;
                    }
                }
            }

        }
    }
    .addDown{
        .operation{
            margin-bottom:20px;
        }
    }
}
</style>