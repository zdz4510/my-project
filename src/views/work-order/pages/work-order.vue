<template>
  <div class="workOrder">
    <div class="query">
      <div class="left">
        <el-form label-width="100px" class="typeForm">
          <el-form-item label="工单:">
            <el-input placeholder="请输入工单" v-model="shopOrder"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="choiceBox">
        <i class="el-icon-document-copy"></i>
      </div>
      <div class="right">
        <el-button size="small" type="primary" @click="getOrder">查询</el-button>
        <el-button size="small" type="primary" @click='reset'>重置</el-button>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" @click="handleSave">保存</el-button>
      <el-button size="small" type="danger" @click="handleDelete">删除</el-button>
    </div>

    <div class="showInfo">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 一般
          </span>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="类型：" prop="style">
              <el-select v-model="ruleForm.shopOrderType" placeholder="生产">
                <el-option label="生产" value="PRODUCTION"></el-option>
                <el-option label="返工" value="REWORK"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：" prop="state">
              <el-select v-model="ruleForm.status" placeholder="可下达/完成/关闭">
                <el-option label="可下达" value="RELEASABLE"></el-option>
                <el-option label="完成" value="DONE"></el-option>
                <el-option label="关闭" value="CLOSE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划物料:" prop="material">
              <el-col :span="9" style="margin-right:7px;">
                <el-input placeholder="请输入计划物料" v-model="ruleForm.plannedMaterial"></el-input>
              </el-col>
              <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div>
              <!--物料版本-->
              <div class="version">
                <el-form>
                  <el-form-item label="版本：">
                    <el-col :span="12">
                      <el-input v-model="ruleForm.plannedMaterialRev"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
            </el-form-item>
            <el-form-item label="计划工艺路线:" label-width="150">
              <el-col :span="9" style="margin-right:7px;">
                <el-input placeholder="计划工艺路线" v-model="ruleForm.plannedRouter"></el-input>
              </el-col>
              <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div>
              <!--计划工艺路线版本-->
              <div class="version">
                <el-form>
                  <el-form-item label="版本：">
                    <el-col :span="12">
                      <el-input v-model="ruleForm.plannedRouterRev"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
            </el-form-item>
            <el-form-item label="生产数量:" prop="number">
              <el-col :span="9" style="margin-right:31px;">
                <el-input placeholder="请输入生产数量" v-model="ruleForm.productQty"></el-input>
              </el-col>
              <!--已下达数量-->
              <div>
                <el-form>
                  <el-form-item label="已下达数量：">
                    <el-col :span="14">
                      <el-input v-model="ruleForm.releasedQuantity" :disabled="true"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="自定义字段">
          <el-form :rules="rules">
            <el-form-item :label="item.fieldName" v-for="(item,index) in customizedFieldDefInfoList" :key="index" v-show="item.fieldType =='C'" prop="custom">
              <el-col :span="14">
                <el-input v-model="item.fieldValue"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item :label="item.fieldName" v-for="(item,index) in customizedFieldDefInfoList" :key="index+item" v-show="item.fieldType !=='C'">
              <el-col :span="14">
                <el-input v-model="item.fieldValue"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Kay_自定义字段3：">
              <el-col :span="14" style="margin-right:7px;">
                <el-input v-model="ruleForm.kays_3" :disabled="true"></el-input>
              </el-col>
              <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>  
    <!--删除提醒-->
    <el-dialog
      title="删除"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除此工单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import{
    findShopOrderRequest,
    updateShopOrderRequest,
    saveShopOrderRequest,
    // findFieldRequest,
    deleteRequest
} from '@/api/work-order/work-order.api.js' 
export default {
  data() {
    return {
      //工单表信息
        ruleForm: {
            shopOrderType: "", //类型
            status: "", //状态
            plannedMaterial: "", //计划物料
            plannedMaterialRev: "", //计划物料版本
            plannedRouter: "", //计划工艺路线
            plannedRouterRev: "", //计划工艺路线版本
            productQty: "", //生产数量
            releasedQuantity: "" ,//已下达数量
            kay_1: "",
            kay_2: "",
            kay_3: ""
        },
        rules: {
            style: [{ required: true, message: "请选择类型", trigger: "blur" }],
            state: [{ required: true, message: "请选择状态", trigger: "change" }],
            material: [
                { required: true, message: "请输入计划物料", trigger: "change" }
            ],
            number: [{ required: true, message: "请输入数量", trigger: "change" }],
            custom: [{ required: true, message: "请输入自定义字段", trigger: "change" }],
            
        },
        shopOrder:'',//最新工单
        oldShopOrder:'',//旧工单(也就是搜索的工单)
        tenantSiteCode:'',
        allOrders:[],//获取到的所有工单
        getSearchData:'',//查询获取的工单数据
        customizedFieldDefInfoList:[],//自定义字段信息
        dialogVisible:false,//删除工单提示框
    };
  },
  methods:{
    //初始化获取自定义字段
    // getCustom(){
    //     const params ={
    //       customizedItem:'永恒之歌'
    //     }
    //     findFieldRequest(params).then(data=>{
    //       console.log("初始化自定义字段"+JSON.stringify(data))
    //     })
    //   },
    //重置
    reset(){
      //把绑定ruleForm的数据清空
      for(let key in this.ruleForm){
         this.ruleForm[key]  = ''
      }
      //shopOrder
      this.shopOrder = ''
      //重置oldShopOrder
      this.oldShopOrder = ''

    },
      //查询指定工单
    getOrder(){
        const params ={
            shopOrder:this.shopOrder,
            tenantSiteCode:this.tenantSiteCode
        }
        findShopOrderRequest(params).then(data =>{
          // console.log('获取工单所有信息'+JSON.stringify(data))
            const res = data.data
            // console.log('获取工单'+JSON.stringify(data))
            if(res.code == 200){
                this.getSearchData = res.data.shopOrder//工单信息
                this.oldShopOrder = this.getSearchData.shopOrder
                this.ruleForm.shopOrderType = this.getSearchData.shopOrderType
                this.ruleForm.plannedMaterial = this.getSearchData.plannedMaterial
                this.ruleForm.status = this.getSearchData.status
                this.ruleForm.plannedMaterialRev = this.getSearchData.plannedMaterialRev
                this.ruleForm.plannedRouter = this.getSearchData.plannedRouter
                this.ruleForm.plannedRouterRev = this.getSearchData.plannedRouterRev
                this.ruleForm.productQty = this.getSearchData.productQty
                this.ruleForm.releasedQuantity = this.getSearchData.releasedQuantity
                this.customizedFieldDefInfoList = res.data.customizedFieldDefInfoList//工单的自定义字段信息
            }
        })
    },
    //保存
    handleSave(){
      if(this.ruleForm.style ==''){
        this.$message({
          message:'类型未填写,提交失败',
          type:'warning'
        })
      }else if(this.ruleForm.state ==''){
        this.$message({
          message:'状态未填写,提交失败',
          type:'warning'
        }) 
      }else if(this.ruleForm.material ==''){
        this.$message({
          message:'计划物料未填写,提交失败',
          type:'warning'
        })
      }else if(this.ruleForm.number == ''){
        this.$message({
          message:'生产数量未填写,提交失败',
          type:'warning'
        })
      }else{
        const params = {
          customizedFieldDefInfoList: [
          {
              createTime: "2019-12-20 09:00:00",
              createUserId: "string",
              createUserName: "string",
              deleteFlag: false,
              fieldLabel: "string",
              fieldName: "field01",
              fieldSize: 0,
              fieldType: "string",
              fieldValue: "001",
              limitGeneralCode: "string",
              limitGeneralField: "string",
              modifyTime: "2019-12-20 09:00:00",
              modifyUserId: "string",
              modifyUserName: "string",
              required: true,
              sequence: 0,
              tenantSiteCode: "test"
            },
          {
                createTime: "2019-12-20 09:00:00",
                createUserId: "string",
                createUserName: "string",
                deleteFlag: false,
                fieldLabel: "string",
                fieldName: "field02",
                fieldSize: 0,
                fieldType: "string",
                fieldValue: "001",
                limitGeneralCode: "string",
                limitGeneralField: "string",
                modifyTime: "2019-12-20 09:00:00",
                modifyUserId: "string",
                modifyUserName: "string",
                required: true,
                sequence: 0,
                tenantSiteCode: "test"
              }
            ],
            shopOrder: {
              shopOrder:this.shopOrder,
              shopOrderType: this.ruleForm.shopOrderType, //类型
              status: this.ruleForm.status,  //状态
              plannedMaterial: this.ruleForm.plannedMaterial,  //计划物料
              plannedMaterialRev: this.ruleForm.plannedMaterialRev,  //计划物料版本
              plannedRouter: this.ruleForm.plannedRouter,  //计划工艺路线
              plannedRouterRev: this.ruleForm.plannedRouterRev,  //计划工艺路线版本
              productQty: this.ruleForm.productQty, //生产数量
              releasedQuantity: this.ruleForm.releasedQuantity, //已下达数量
              tenantSiteCode: "test"
            }
        }
        if(this.oldShopOrder == this.shopOrder){
          //oldShopOrder和shopOrder相同则调用更新接口
          updateShopOrderRequest(params).then(data =>{
            const res = data.data
            if(res.code == 200){
              this.$message({
                message:'更新成功',
                type:'success'
              })
            }else{
              this.$message({
                message:'更新失败',
                type:'warning'
              })
            }
            // console.log('oldShopOrder和shopOrder相同则调用更新接口'+JSON.stringify(data))
          })
        }else{
          //oldShopOrder和shopOrder不相同则调用新增接口
          saveShopOrderRequest(params).then(data =>{
            const res = data.data
            if(res.code == 200){
              this.$message({
                message:'新增成功',
                type:'success'
              })
              this.$router.go(0);
            }else{
              this.$message({
                message:'新增失败',
                type:'warning'
              })
            }
            // console.log('oldShopOrder和shopOrder不同则调用更新接口'+JSON.stringify(data))
          })
        }
      }
    },
    //检测是否点击过查询工单的按钮，点击过查询按钮则可删除此工单，如果输入框中的工单号与查询的工单不相同或者输入框中的工单号为空，则不允许删除
    handleDelete(){
      if(this.oldShopOrder == '' || this.oldShopOrder !== this.shopOrder){
        this.$message({
          message:'删除失败，请先查询工单!',
          type:'warning'
        })
        return 
      }else{
        this.dialogVisible = true
      }
    },
    //确认删除工单
    sureDelete(){
      const params = {
        shopOrder:this.oldShopOrder
      }
      // console.log(this.oldShopOrder)
      deleteRequest(params).then(data =>{
        // console.log('删除的返回信息'+JSON.stringify(data))
        const res = data.data
        if(res.code == 200){
          this.dialogVisible = false
          this.$message({
            message:'删除成功！',
            type:'success'
          })
          return
        }else{
          this.dialogVisible = false
          this.$message({
            message:'删除失败！',
            type:'warning'
          })
          return
        }
      })
    }

  },
  created(){
    // this.getCustom()
  }
};
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
      margin-right: 7px;
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
.choiceBox {
  width: 15px;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
}
.version {
  width: 300px;
  display: inline-block;
}
.el-form-item__content {
  display: flex;
}
</style>
