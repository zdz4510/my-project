<template>
  <div class="workOrder">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form label-width="100px" :inline="true">
          <!-- <el-form-item label="工单:">
           
          </el-form-item> -->
            <el-form-item label="工单:">
              <el-row>
                <el-col :span="22">
                  <dsn-input size="small" placeholder="请输入工单" v-model="shopOrder"></dsn-input>
                </el-col>
                <el-col :span="2">
                  <i class="el-icon-document" @click="orderHandler"></i>
                </el-col>
              </el-row>
              <!-- <el-input size="small" placeholder="请输入工单" v-model="shopOrder">
                <el-button slot="append" icon="el-icon-document-copy" @click="orderHandler"></el-button>
              </el-input> -->
            </el-form-item>
            <el-form-item>
                <dsn-button size="small"  type="primary" icon="el-icon-search" @click.native="getOrder">查询</dsn-button>
              <dsn-button size="small" type="primary" icon="el-icon-refresh" @click.native='reset'>重置</dsn-button>
            </el-form-item>
        </el-form>
    </DsnPanel>
    <!-- <div class="query">
      <div class="left">
        
        <div class="choiceBox">
          <i class="el-icon-document-copy"></i>
        </div>
      </div>
      <div class="right">
        <dsn-button size="small" type="primary" @click="getOrder">查询</dsn-button>
        <dsn-button size="small" type="primary" @click='reset'>重置</dsn-button>
      </div>
    </div> -->
    
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operate">
        <dsn-button size="small" type="primary" @click.native="handleSave">保存</dsn-button>
        <dsn-button size="small" type="danger" icon="el-icon-delete" @click.native="handleDelete">删除</dsn-button>
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
              <dsn-select v-model="ruleForm.shopOrderType" placeholder="生产">
                <el-option label="生产" value="PRODUCTION"></el-option>
                <el-option label="返工" value="REWORK"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="状态：" prop="state">
              <dsn-select v-model="ruleForm.status" placeholder="可下达/完成/关闭">
                <el-option label="可下达" value="RELEASABLE"></el-option>
                <el-option label="完成" value="DONE"></el-option>
                <el-option label="关闭" value="CLOSE"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="计划物料:" prop="material">
              <!-- <el-col :span="9" style="margin-right:7px;">
                <el-input size="small" placeholder="请输入计划物料" v-model="ruleForm.plannedMaterial"><el-button size="small" slot="append" icon="el-icon-document-copy" @click="materialHandler"></el-button></el-input>
              </el-col> -->
              <el-row>
                <el-col :span="22">
                  <dsn-input size="small" placeholder="请输入计划物料" v-model="ruleForm.plannedMaterial"></dsn-input>
                </el-col>
                <el-col :span="2">
                  <i class="el-icon-document" @click="materialHandler"></i>
                </el-col>
              </el-row>
              <!-- <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div> -->
              <!--物料版本-->
              <div class="version">
                <el-form>
                  <el-form-item label="版本：" style="margin-left:50px;">
                    <el-col :span="14">
                      <el-input v-model="ruleForm.plannedMaterialRev" placeholder="请输入物料版本"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
            </el-form-item>
            <el-form-item label="计划工艺路线:" label-width="150">
              <el-row>
                <el-col :span="22">
                  <dsn-input size="small" placeholder="请输入计划工艺路线" v-model="ruleForm.plannedRouter"></dsn-input>
                </el-col>
                <el-col :span="2">
                  <i class="el-icon-document" @click="routerHandler"></i>
                </el-col>
              </el-row>
              <!-- <el-col :span="9" style="margin-right:7px;">
                <el-input size="small" placeholder="计划工艺路线" v-model="ruleForm.plannedRouter"><el-button slot="append"  size="small" icon="el-icon-document-copy" @click.native="routerHandler"></el-button></el-input>
              </el-col> -->
              <!-- <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div> -->
              <!--计划工艺路线版本-->
              <div class="version">
                <el-form>
                  <el-form-item label="版本：" style="margin-left:50px;">
                    <el-col :span="14">
                      <dsn-input v-model="ruleForm.plannedRouterRev" placeholder="请输入计划工艺路线版本"></dsn-input>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
            </el-form-item>
            <el-form-item label="生产数量:" prop="number">
              <el-col :span="4" style="margin-right:31px;">
                <dsn-input placeholder="请输入生产数量" v-model="ruleForm.productQty"></dsn-input>
              </el-col>
              <!--已下达数量-->
              <div>
                <el-form>
                  <el-form-item label="已下达数量：">
                    <el-col :span="14">
                      <dsn-input v-model="ruleForm.releasedQuantity" :disabled="true"></dsn-input>
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
              <el-col :span="4">
                <dsn-input v-model="item.fieldValue"></dsn-input>
              </el-col>
            </el-form-item>
            <el-form-item :label="item.fieldName" v-for="(item,index) in customizedFieldDefInfoList" :key="index+item" v-show="item.fieldType !=='C'">
              <el-col :span="4">
                <el-input v-model="item.fieldValue"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Kay_自定义字段3：">
              <el-row>
                <el-col :span="22">
                  <dsn-input size="small" :disabled="true" v-model="ruleForm.kays_3"></dsn-input>
                </el-col>
                <el-col :span="2">
                  <i class="el-icon-document"></i>
                </el-col>
              </el-row>
              <!-- <el-col :span="14" style="margin-right:7px;">
                <dsn-input v-model="ruleForm.kays_3" :disabled="true"></dsn-input>
              </el-col>
              <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    </DsnPanel> 
    <!--删除提醒-->
    <el-dialog
      title="删除"
      :visible.sync="dialogVisible"
      :width="defaltDialogWidth">
      <el-form :rules="rules">
            <el-form-item :label="item.fieldName" v-for="(item,index) in customizedFieldDefInfoList" :key="index" v-show="item.fieldType =='C'" prop="custom">
              <el-col :span="14">
                <dsn-input v-model="item.fieldValue"></dsn-input>
              </el-col>
            </el-form-item>
            <el-form-item :label="item.fieldName" v-for="(item,index) in customizedFieldDefInfoList" :key="index+item" v-show="item.fieldType !=='C'">
              <el-col :span="14">
                <el-input v-model="item.fieldValue"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Kay_自定义字段3：">
              <el-col :span="14" style="margin-right:7px;">
                <dsn-input v-model="ruleForm.kays_3" :disabled="true"></dsn-input>
              </el-col>
              <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div>
            </el-form-item>
          </el-form>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="dialogVisible = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureDelete">确 定</dsn-button>
      </span>
    </el-dialog>
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
          <el-table-column prop="shopOrderType" label="类型"></el-table-column>
        </dsn-table>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="orderDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureOrder">确 定</dsn-button>
      </span>
    </el-dialog>
    <!--物料选择-->
    <el-dialog
      title="物料选择"
      :visible.sync="materialDialog"
      width="800px">
      <dsn-table
          ref="multipleTable"
          :data="materialTable"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
          @selection-change="handleSelectionMaterial"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="material" label="物料" width="120"></el-table-column>
          <el-table-column label="版本" prop="materialRev" width="120"></el-table-column>
          <el-table-column prop="currentRev" label="当前版本"></el-table-column>
          <el-table-column label="描述" prop="materialDes" width="120"></el-table-column>
        </dsn-table>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="materialDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureMaterial">确 定</dsn-button>
      </span>
    </el-dialog>
    <!--工艺路线选择-->
    <el-dialog
      title="工艺路线选择"
      :visible.sync="routerDialog"
      width="800px">
      <dsn-table
          ref="multipleTable"
          :data="routerTable"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
          @selection-change="handlerSelectionRouter"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="router" label="工艺路线" width="120"></el-table-column>
          <el-table-column label="版本" prop="revision" width="120"></el-table-column>
          <el-table-column prop="currentRevision" label="当前版本"></el-table-column>
          <el-table-column label="类型" prop="routerType" width="120"></el-table-column>
          <el-table-column label="描述" prop="description" width="180"></el-table-column>
        </dsn-table>
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="routerDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureRouter">确 定</dsn-button>
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
    deleteRequest,
    findShopOrderListHttp,
    listAllRequest,
    listRouterPageHttp
} from '@/api/work-order/work-order.api.js' 
export default {
  inject:['defaltDialogWidth'],
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
            kay_3: "",
            material:"",
            materialRev:"",
            router:"",
            kays_3:""
        },
        rules: {
            style: [{ required: true, message: "请选择类型", trigger: "blur" }],
            state: [{ required: true, message: "请选择状态", trigger: "blur" }],
            material: [
                { required: true, message: "请输入计划物料", trigger: "blur" }
            ],
            number: [{ required: true, message: "请输入数量", trigger: "blur" }],
            custom: [{ required: true, message: "请输入自定义字段", trigger: "blur" }],
            
        },
        shopOrder:'',//最新工单
        oldShopOrder:'',//旧工单(也就是搜索的工单)
        tenantSiteCode:'',
        allOrders:[],//获取到的所有工单
        getSearchData:'',//查询获取的工单数据
        customizedFieldDefInfoList:[],//自定义字段信息
        dialogVisible:false,//删除工单提示框,
        orderDialog:false,//工单选择模态框
        orderTable:[],
        orderChoice:[],//选中的行
        // 物料、版本、当前版本、描述
        materialTable:[],
        materialDialog:false,
        materialChoice:[],
        routerDialog:false,
        routerTable:[],
        routerChoice:[]
    };
  },
  methods:{
    routerHandler(){
      listRouterPageHttp().then(data =>{
          const res = data.data
          if(res.code == 200){
            this.routerTable=res.data.data
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
        })
      this.routerDialog=true;
    },
    sureRouter(){
      if(this.routerChoice.length>1){
        this.$message({
            message:"只能选择一行数据",
            type:'warning'
          })
          return ;
      }if(this.routerChoice.length===0){
        this.$message({
          message:"还没选择一行数据",
          type:'warning'
        })
        return ;
      }
      else{
        this.ruleForm.plannedRouter=this.routerChoice[0].router;
        this.routerDialog=false;
      }
    },
    materialHandler(){
      // alert("111")
      listAllRequest().then(data =>{
          const res = data.data
          if(res.code == 200){
            this.materialTable=res.data
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
        })
      this.materialDialog=true;
    },
    orderHandler(){
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
          return ;
      }if(this.orderChoice.length===0){
        this.$message({
          message:"还没选择一行数据",
          type:'warning'
        })
        return ;
      }
      else{
        this.shopOrder=this.orderChoice[0].shopOrder;
        this.orderDialog=false;
      }
    },
    sureMaterial(){
      if(this.materialChoice.length>1){
        this.$message({
            message:"只能选择一行数据",
            type:'warning'
          })
          return ;
      }if(this.materialChoice.length===0){
        this.$message({
          message:"还没选择一行数据",
          type:'warning'
        })
        return ;
      }
      else{
        this.ruleForm.plannedMaterial=this.materialChoice[0].material;
        this.materialDialog=false;
      }
    },
    handleSelectionMaterial(row){
      this.materialChoice=row;
    },
    handleSelectionChange(row){
      this.orderChoice=row
    },
    handlerSelectionRouter(row){
      this.routerChoice=row;
    },
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
      this.getOrder();
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
                this.ruleForm.material = res.data.shopOrder.material
                this.ruleForm.materialRev = res.data.shopOrder.materialRev
                this.ruleForm.router = res.data.shopOrder.router
            }else{
              this.$message({
                message:res.message,
                type:'warning'
              })
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
      }else if(this.ruleForm.plannedMaterial ==''){
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
              tenantSiteCode: "test",
              material:this.ruleForm.material,
              materialRev:this.ruleForm.materialRev,
              router:this.ruleForm.router,
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
                message:res.message,
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
          this.reset();
          return
        }else{
          this.dialogVisible = false
          this.$message({
            message:res.message,
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
  // padding: 0 30px;
  // .query {
  //   height: 40px;
  //   padding: 10px;
  //   display: flex;
  //   justify-content: space-between;
  //   .left {
  //     width: 300px;
  //     margin-right: 7px;
  //   }

  //   .right {
  //     width: 680px;
  //     padding: 5px 30px;
  //   }
  // }
  // .operate {
  //   padding: 10px 5px;
  // }
}
//选择弹框
// .workOrder .choiceBox {
//   width: 15px;
//   height: 41px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-right: 50px;
// }
.workOrder .version {
  width: 300px;
  display: inline-block;
}
.workOrder .showInfo .el-form-item__content {
  display: flex;
}
</style>
