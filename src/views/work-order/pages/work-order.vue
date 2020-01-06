<template>
  <div class="workOrder">
    <div class="query">
      <div class="left">
        <el-form
          label-width="100px"
          class="typeForm"
        >
          <el-form-item label="工单">
            <el-input
              placeholder="请输入工单"
              v-model="workOrder"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="choiceBox"><i class="el-icon-document-copy"></i></div>
      <div class="right">
        <el-button size="small" type="primary">
          查询
        </el-button>
        <el-button size="small" type="primary">
          重置
        </el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" >保存</el-button>
      <el-button size="small" type="danger">删除</el-button>
    </div>

    <div class="showInfo">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 一般</span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="类型：" prop="style">
                        <el-select v-model="ruleForm.style" placeholder="生产/返工">
                            <el-option label="生产" value="生产"></el-option>
                            <el-option label="返工" value="返工"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：" prop="state">
                        <el-select v-model="ruleForm.state" placeholder="可下达/完成/关闭">
                            <el-option label="可下达" value="可下达"></el-option>
                            <el-option label="完成" value="完成"></el-option>
                            <el-option label="关闭" value="关闭"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计划物料:" prop="material" >
                        <el-col :span="9" style="margin-right:7px;">
                            <el-input 
                                placeholder="请输入计划物料" v-model="ruleForm.material"
                            ></el-input>
                        </el-col>
                        <div class="choiceBox"><i class="el-icon-document-copy"></i></div>
                        <!--物料版本-->
                        <div class="version">
                            <el-form>
                                <el-form-item label="版本：">
                                    <el-col :span="12">
                                        <el-input v-model="ruleForm.materialVer"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                    <el-form-item label="计划工艺路线:" label-width='150'>
                        <el-col :span="9" style="margin-right:7px;">
                            <el-input 
                                placeholder="计划工艺路线" v-model="ruleForm.technologyLine"
                            ></el-input>
                        </el-col>
                        <div class="choiceBox"><i class="el-icon-document-copy"></i></div>
                        <!--计划工艺路线版本-->
                        <div class="version">
                            <el-form>
                                <el-form-item label="版本：">
                                    <el-col :span="12">
                                        <el-input v-model="ruleForm.technologyLineVer"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                    <el-form-item label="生产数量:" prop="number">
                        <el-col :span="9" style="margin-right:31px;">
                            <el-input 
                                placeholder="请输入生产数量" v-model="ruleForm.number"
                            ></el-input>
                        </el-col>
                        <!--已下达数量-->
                        <div>
                            <el-form>
                                <el-form-item label="已下达数量：">
                                    <el-col :span="14">
                                        <el-input v-model="ruleForm.issuedNum" :disabled="true"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="自定义字段">
                <el-form>
                    <el-form-item label="Kay_自定义字段1：">
                        <el-col :span="14">
                            <el-input v-model="kays.kays_1" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Kay_自定义字段2：">
                        <el-col :span="14">
                            <el-input v-model="kays.kays_2" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Kay_自定义字段3：">
                        <el-col :span="14" style="margin-right:7px;">
                            <el-input v-model="kays.kays_3" :disabled="true"></el-input>
                        </el-col>
                        <div class="choiceBox"><i class="el-icon-document-copy"></i></div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>

  </div>
</template>

<script>
export default {
    data(){
        return{
            workOrder:'',//工单
            ruleForm:{
                style:'',//类型
                state:'',//状态
                material:'',//物料
                materialVer:'',//物料版本
                technologyLine:'',//计划工艺路线
                number:'',//生产数量
                technologyLineVer:'',//计划工艺路线版本
                issuedNum:'',//已下达数量

            },
            kays:{
                kay_1:'',
                kay_2:'',
                kay_3:'',
            },
            rules: {
                style: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                material: [
                    { required: true, message: '请输入计划物料', trigger: 'change' }
                ],
                number: [
                    { required: true, message: '请输入数量', trigger: 'change' }
                ],
            }
        }
    }
}
</script>

<style lang="scss">
.workOrder {
  padding: 0 30px;
  .query {
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
      margin-right:7px;
    }

    .right {
      width: 680px;
      padding: 5px 30px;
    }
  }
  .operate {
    padding: 10px 5px;
  }
}
//选择弹框
.choiceBox{
    width:15px;
    height:41px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:50px;
}
.version{
    width:300px;
    display: inline-block
}
.el-form-item__content{
    display: flex;
}
</style>
