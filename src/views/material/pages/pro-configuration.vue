<template>
    <div class="proCon">
        <div class="query">
            <div class="left">
                <el-form label-width="100px" class="typeForm">
                    <el-form-item label="生产操作界面:" label-width="150px">
                        <el-col :span="15">
                            <!-- <el-input  v-model="podConfigName">
                                <i
                                    class="el-icon-document-copy"
                                    slot="append"
                                    @click="handleIconClick">
                                </i>
                            </el-input> -->
                            <input v-model="podConfigName" />
                        </el-col>
                        <!-- <el-select v-model="podConfigName" placeholder="请选择" @change="handlePodConfig">
                            <el-option
                            v-for="item in proNames"
                            :key="item"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select> -->
                    </el-form-item>
                </el-form>
            </div>
            <!-- <div class="choiceBox" style="height:41px;display:flex;align-items:center" >
                <i class="el-icon-document-copy" ></i>
            </div> -->
        </div>
        <div class="operation">
            <el-button size='small' type='primary' @click="handlePodConfig">查询</el-button>
            <el-button size='small' type='danger' @click="deleteDialog = true">删除</el-button>
            <el-button size='small' type='primary' @click="handleSave">保存</el-button>
            <el-button size='small' type='danger' @click="handleReset">清除</el-button>
            <el-button size='small' type='primary' @click="handleAdd" >添加</el-button>
            <el-button size='small' type='primary' @click="handleEdit">编辑</el-button>
            <el-button size='small' type="danger" @click="handleMove">移除</el-button>
        </div>
        <!--tab切换-->
        <el-tabs type="border-card">
            <el-tab-pane label="基础维护">
                <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
                >
                    <el-form-item label="描述：" prop="podConfigDesc" :label-width="labelWidth">
                        <el-col :span="9" style="margin-right:7px;">
                            <el-input  v-model="ruleForm.podConfigDesc"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status" :label-width="labelWidth">
                        <el-select v-model="ruleForm.status" placeholder="已启用">
                            <el-option label="已启用" :value="true"></el-option>
                            <el-option label="已禁用" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="默认操作:" prop="defaultOperationRef" :label-width="labelWidth">
                        <el-col :span="9" style="margin-right:7px;">
                            <el-input  v-model="ruleForm.defaultOperationRef"></el-input>
                        </el-col>
                        <div class="choiceBox">
                            <i class="el-icon-document-copy"></i>
                        </div>
                        <el-checkbox v-model="ruleForm.canChangeOperation">操作是否允许修改</el-checkbox>
                    </el-form-item>
                    <el-form-item label="默认资源:" :label-width="labelWidth">
                        <el-col :span="9" style="margin-right:7px;">
                            <el-input  v-model="ruleForm.defaultResourceRef"></el-input>
                        </el-col>
                        <div class="choiceBox">
                            <i class="el-icon-document-copy"></i>
                        </div>
                        <el-checkbox v-model="ruleForm.canChangeResource">资源是否允许修改</el-checkbox>
                    </el-form-item>
                    <el-form-item :label-width="labelWidth">
                        <el-checkbox v-model="ruleForm.showQty">是否显示数量</el-checkbox>
                        <el-checkbox v-model="ruleForm.canChangeQty">数量是否允许修改</el-checkbox>
                    </el-form-item>
                    <el-form-item style="display:flex" label-width="20px">
                        <div class="title">LOT排队中自动触发按钮标识:</div>
                        <el-col :span="9" style="margin-right:7px;">
                            <el-input type="text" v-model="ruleForm.lotQueueButtonId"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item style="display:flex" label-width="20px">
                        <div class="title">LOT工作中自动触发按钮标识:</div>
                        <el-col :span="9" style="margin-right:7px;">
                            <el-input type="text" v-model="ruleForm.lotInWorkButtonId"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="按钮">
                <el-table
                    ref="multipleTable"
                    :data="ruleForm.podButtons"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55"
                    label="序号">
                    </el-table-column>
                    <el-table-column
                    label="按钮名称"
                    width="120"
                    prop="buttonId">
                    </el-table-column>
                    <el-table-column
                    prop="buttionDesc"
                    label="按钮描述"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="groupFlag"
                    label="按钮类型"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.groupFlag?'组':'普通' }}
                        </template>
                    </el-table-column>
                    <el-table-column>
                    <template slot="header">
                        <p>操作</p>
                    </template>
                    <template slot-scope="scope">
                         <!-- <i class="el-icon-top"  @click="handleOptions(scope.$index, scope.row,'top')"></i> -->
                        <div class="iconBox" @click="handleOptions(scope.$index, scope.row,'top')" v-show="scope.$index!==0">
                            <i class="el-icon-top" ></i>
                        </div>
                        <div class="iconBox" @click="handleOptions(scope.$index, scope.row,'down')" v-show="scope.$index!==ruleForm.podButtons.length-1">
                            <i class="el-icon-bottom"></i>
                        </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!--删除弹窗-->
        <el-dialog
        title="提示"
        :visible.sync="deleteDialog"
        width="30%">
        <span>确定要删除吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleDelete">确 定</el-button>
        </span>
        </el-dialog>
        <!--生产操作弹框-->
        <!-- <el-dialog
            title="请选择生产操作名称"
            :visible.sync="dialogVisible"
            width="30%">
            <p v-for="(item,index) in proNames" :key='index'>{{item}}</p>
        </el-dialog> -->
    </div>
</template>
<script>
import {
    listPodConfigNameRequest,
    podConfigRequest,
    deleteRequest,
    addOrModiaRequest
} from '@/api/pro-configuration/pro-configuration.api.js'
import { mapMutations,
mapGetters
 } from "vuex";
export default {
    name:'pro-configuration',
    computed: {
        ...mapGetters(["proRow"])
    },
    data(){
        return{
            dialogVisible:false,//生产操作界面名称弹窗
            podConfigName:'',//生产操作界面名称
            labelWidth:'120px',
            shopOrder:'',//工单
            proNames:[],//所有生产操作界面名称
            //通过名称查询一条生产界面信息
            selectedList:[],//勾选的项
            deleteDialog:false,//删除弹窗
            rules: {
                description: [{ required: true, message: "请选择类型", trigger: "blur" }],
                status: [{ required: true, message: "请选择类型", trigger: "blur" }],
            },
            //所有数据
            ruleForm:{
                canChangeOperation: '',
                canChangeQty: '',
                canChangeResource: '',
                createTime: "",
                createUserId: "",
                createUserName: "",
                defaultOperationRef: "",
                defaultResourceRef: "",
                deleteFlag: '',
                lotInWorkButtonId: "",
                lotQueueButtonId: "",
                modifyTime: "",
                modifyUserId: "",
                modifyUserName: "",
                podButtons: [
                    {
                    buttionDesc: "",
                    buttonId: "",
                    groupFlag: '',
                    imageIcon: "",
                    location: "",
                    podActivities: [
                        {
                        activity: "",
                        activityDes: "",
                        activityType: "",
                        clearsLot: true,
                        podButtonRef: "",
                        reference: "",
                        sequence: '',
                        tenantSiteCode: ""
                        }
                    ],
                    podButtonRef: "",
                    podButtons: [
                        null
                    ],
                    podConfigRef: "",
                    reference: "",
                    sequence: '',
                    tenantSiteCode: ""
                    }
                ],
                podConfigDesc: "",
                podConfigName: "",
                reference: "",
                showQty: '',
                status: '',
                tenantSiteCode: ""
            },
            //空数据，用来清空用的
            emptyData:{
                canChangeOperation: '',
                canChangeQty: '',
                canChangeResource: '',
                createTime: "",
                createUserId: "",
                createUserName: "",
                defaultOperationRef: "",
                defaultResourceRef: "",
                deleteFlag: '',
                lotInWorkButtonId: "",
                lotQueueButtonId: "",
                modifyTime: "",
                modifyUserId: "",
                modifyUserName: "",
                podButtons: [
                    {
                    buttionDesc: "",
                    buttonId: "",
                    groupFlag: '',
                    imageIcon: "",
                    location: "",
                    podActivities: [
                        {
                        activity: "",
                        activityDes: "",
                        activityType: "",
                        clearsLot: true,
                        podButtonRef: "",
                        reference: "",
                        sequence: '',
                        tenantSiteCode: ""
                        }
                    ],
                    podButtonRef: "",
                    podButtons: [
                        null
                    ],
                    podConfigRef: "",
                    reference: "",
                    sequence: '',
                    tenantSiteCode: ""
                    }
                ],
                podConfigDesc: "",
                podConfigName: "",
                reference: "",
                showQty: '',
                status: '',
                tenantSiteCode: ""
            },
        }
    },
    methods:{
        ...mapMutations(["PROROW"]),
        handleSelectionChange(rows){
            this.selectedList = rows;
            this.PROROW(this.selectedList[0])
            // console.log('勾选',this.selectedList[0].groupFlag);
        },
        //查询生产面板名称下拉列表
        getProConfigName(){
            listPodConfigNameRequest().then(data =>{
                const res = data.data
                if(res.code == 200){
                    this.proNames = res.data
                }
            })
        },
        //通过名称查询一条生产界面信息
        handlePodConfig(){
            const params = this.podConfigName
            podConfigRequest(params).then(data =>{
                const res = data.data 
                if(res.code == 200){
                    this.ruleForm = res.data
                    
                }else{
                    this.$message({
                        message:`${res.message}`,
                        type:'warning'
                    })
                }
            })
        },
        // 点击方向按钮   
        handleOptions(index, row,option) {
            // let newobj = {}
            if(option == 'top'){
                if(index == '0'){
                    return
                }else{
                    this.ruleForm.podButtons[index] = this.ruleForm.podButtons.splice(index-1,1,this.ruleForm.podButtons[index])[0]
                 return
                }
               
            }else{
                if(index == this.ruleForm.podButtons-1){
                    return 
                }else{
                    this.ruleForm.podButtons[index] = this.ruleForm.podButtons.splice(index+1,1,this.ruleForm.podButtons[index])[0]
                    return
                }
            }
        },
        //移除操作
        handleMove(){
            alert(this.selectedList.length)
            if(this.selectedList.length == 0){
                this.$message({
                    message:'请选择移除项',
                    type:'warning'
                })
                return
            }else{
                for(let i = 0;i<this.selectedList.length;i++){
                    let val = this.ruleForm.podButtons.indexOf(this.selectedList[i])
                    if(val > -1){
                        this.ruleForm.podButtons.splice(val,1)
                        alert('移除成功')
                    }
                }
                return this.ruleForm.podButtons
            }
            
        },
        //删除操作
        handleDelete(){
            const params = this.podConfigName
            deleteRequest(params).then(data =>{
                const res = data.data
                if(res.code == 200){
                    this.$message({
                        message:`${res.message}`,
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:`${res.message}`,
                        type:"warning"
                    })
                }
                this.deleteDialog = false
            })
        },
        //清除（重置）
        handleReset(){
            this.ruleForm = this.emptyData
            this.podConfigName = ''
        },
        // 跳转新增界面
        handleAdd(){
            this.$router.push({path:'/material/newAddGroup'});
        },
        //保存操作
        handleSave(){
            if(this.ruleForm.podButtons[0].buttionDesc == ''){
                this.ruleForm.podButtons = null
            }
            this.ruleForm.podConfigName = this.podConfigName
            const params = this.ruleForm
            addOrModiaRequest(params).then(data=>{
                console.log('保存操作'+JSON.stringify(data))
                const res = data.data
                if(res.code == 200){
                    this.$message({
                        message:'新增成功',
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:`${res.message}`,
                        type:'warning'
                    })
                }
            })
        },
        //编辑
        handleEdit(){
            if(this.selectedList.length===1){
                this.$router.push({path:'/material/addGroupProCon'});
            }
        }
    },
    created(){
        this.getProConfigName()
    }
    
}
</script>
<style lang="scss">
.proCon{
     padding: 0 30px;
     .query {
        height: 40px;
        padding: 10px;
        display: flex;
        margin-bottom:20px;
        .left {
            height:41px;
            width:400px;
            margin-right: 7px;
            }
    }
    .operation{
        margin-bottom:30px;
    }
}
.title{
    width:100px;
    word-wrap:break-word ;
}
.el-form-item__content{
    width:100%;
    display: flex;
    align-items: center;
    margin-left:0;
}
.choiceBox{
    margin-right:100px;
    z-index:10;
}
.iconBox{
    display: inline-block;
    width:20px;
    height:20px;
    margin-right:7px;
    border:1px solid #606266;
    line-height: 20px;
    text-align: center;
    z-index:100
}

</style>