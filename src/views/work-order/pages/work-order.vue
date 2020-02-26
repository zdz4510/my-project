<template>
  <div class="workOrder">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form label-width="100px" :model="searchForm" :rules="searchRules" :inline="true">
            <el-form-item label="工单:" prop="shopOrder">
              <el-row>
                <el-col :span="22">
                  <dsn-input size="small" placeholder="请输入工单" v-model="searchForm.shopOrder"></dsn-input>
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
        <dsn-button size="small" type="primary" @click.native="handleSave" :disabled="visableSave">保存</dsn-button>
        <dsn-button size="small" type="danger" icon="el-icon-delete" @click.native="handleDelete" :disabled="disabelDel">删除</dsn-button>
      </div>
    <div class="showInfo">
      <el-tabs type="border-card" style="height:600px">
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
            <el-form-item label="类型：" :label-width="formLabelWidth" prop="style">
              <dsn-select v-model="ruleForm.shopOrderType" placeholder="生产">
                <el-option label="生产" value="PRODUCTION"></el-option>
                <el-option label="返工" value="REWORK"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth" prop="state">
              <dsn-select v-model="ruleForm.status" placeholder="可下达/完成/关闭">
                <el-option label="可下达" value="RELEASABLE"></el-option>
                <el-option label="完成" value="DONE"></el-option>
                <el-option label="关闭" value="CLOSE"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="计划物料:" :label-width="formLabelWidth" prop="plannedMaterial">
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
              
                <el-form>
                  <el-form-item label="版本：" :label-width="formLabelWidth">
                    <dsn-input v-model="ruleForm.plannedMaterialRev" placeholder="请输入物料版本"></dsn-input>
                  </el-form-item>
                </el-form>
              
            </el-form-item>
            <el-form-item label="计划工艺路线:" :label-width="formLabelWidth">
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
                <el-form>
                  <el-form-item label="版本：" :label-width="formLabelWidth">
                    <dsn-input v-model="ruleForm.plannedRouterRev" placeholder="请输入计划工艺路线版本"></dsn-input>
                  </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="生产数量:" prop="productQty" :label-width="formLabelWidth">
              <el-col :span="4">
                <dsn-input placeholder="请输入生产数量" v-model="ruleForm.productQty"></dsn-input>
              </el-col>
              <!--已下达数量-->
              <el-form>
                <el-form-item label="已下达数量：" :label-width="formLabelWidth">
                  <dsn-input v-model="ruleForm.releasedQuantity" :disabled="true"></dsn-input>
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="自定义字段">
          <DsnData style="width:450px" ref="dsntable" v-model="ruleForm.customizedFieldDefInfoList"></DsnData>
          <!-- <el-form :rules="rules" :label-width="formLabelWidth">
            <el-form-item  :label="item.fieldName" v-for="(item,index) in customizedFieldDefInfoList" :key="index" v-show="item.fieldType =='C'" prop="custom">
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
            </el-form-item>
          </el-form> -->
        </el-tab-pane>
      </el-tabs>
    </div>
    </DsnPanel> 
    <!--删除提醒-->
    <el-dialog
      title="删除"
      :visible.sync="dialogVisible"
      :width="defaltDialogWidth">
      <span>是否删除此工单？</span>
      <!-- <el-form :rules="rules">
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
              <el-col :span="12" style="margin-right:7px;">
                <dsn-input v-model="ruleForm.kays_3" :disabled="true"></dsn-input>
              </el-col>
              <div class="choiceBox">
                <i class="el-icon-document-copy"></i>
              </div>
            </el-form-item>
          </el-form> -->
      <span slot="footer" class="dialog-footer">
        <dsn-button @click="dialogVisible = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureDelete">确 定</dsn-button>
      </span>
    </el-dialog>
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
    <!--物料选择-->
    <DsnSelectDialog
      title="物料选择"
      :isSingle="true"
      ref="materialChoice"
       :tableData="materialTable"
       v-model="selectMaterialArr"
       :helpText="helpTextMaterial"
       @confirm="handlerMaterialChange"
       @cancle="handlerCancleMaterial"
      :visible.sync="materialDialog"
      width="800px"
      keyValue="material">
      <!-- <dsn-table
          ref="multipleTable"
          :data="materialTable"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
          stripe
          highlight-current-row
          border
          @selection-change="handleSelectionMaterial"
        >
          <el-table-column type="selection" width="55"></el-table-column> -->
          <template slot="header">
            <el-form label-width="100px" ref="searchMaterialForm" :model="searchMaterialForm" :inline="true">
              <el-form-item label="物料:">
                <dsn-input size="small" placeholder="请输入物料" v-model="searchMaterialForm.material"></dsn-input>
              </el-form-item>
              <el-form-item label="物料版本:">
                <dsn-input size="small" placeholder="请输入物料版本" v-model="searchMaterialForm.materialRev"></dsn-input>
              </el-form-item>
              <el-form-item>
                  <dsn-button size="small"  type="primary" icon="el-icon-search" @click.native="searchMaterialFormChange">查询</dsn-button>
                  <dsn-button size="small" type="primary" icon="el-icon-refresh" @click.native='resetSearchMaterialForm'>重置</dsn-button>
              </el-form-item>
            </el-form>
          </template>
          <template slot="body">
            <el-table-column prop="material" label="物料"></el-table-column>
            <el-table-column label="版本" prop="materialRev"></el-table-column>
            <el-table-column prop="currentRev" label="当前版本">
              <template slot-scope="scope">{{ scope.row.currentRev ? '已启用' : '未启用' }}</template>
            </el-table-column>
            <el-table-column label="描述" prop="materialDes"></el-table-column>
          </template>
        <!-- </dsn-table> -->
      <!-- <span slot="footer" class="dialog-footer">
        <dsn-button @click="materialDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureMaterial">确 定</dsn-button>
      </span> -->
    </DsnSelectDialog>
    <!--工艺路线选择-->
    <DsnSelectDialog
      title="工艺路线选择"
      :visible.sync="routerDialog"
      :isSingle="true"
      ref="routerChoice"
       :tableData="routerTable"
       v-model="selectRouterArr"
       :helpText="helpTextRouter"
       @confirm="handlerRouterChange"
       @cancle="handlerCancleRouter"
      width="800px"
      keyValue="router">
      <!-- <dsn-table
          ref="multipleTable"
          :data="routerTable"
          tooltip-effect="dark"
          style="width: 100%"
          height="350px"
          stripe
          highlight-current-row
          border
          @selection-change="handlerSelectionRouter"
        > -->
        <template slot="header">
            <el-form label-width="100px" ref="searchMaterialForm" :model="searchRouterForm" :inline="true">
              <el-form-item label="工艺路线:">
                <dsn-input size="small" placeholder="请输入工艺路线" v-model="searchRouterForm.router"></dsn-input>
              </el-form-item>
              <el-form-item label="工艺路线版本:">
                <dsn-input size="small" placeholder="请输入工艺路线版本" v-model="searchRouterForm.revision"></dsn-input>
              </el-form-item>
              <el-form-item>
                  <dsn-button size="small"  type="primary" icon="el-icon-search" @click.native="searchRouterFormChange">查询</dsn-button>
                  <dsn-button size="small" type="primary" icon="el-icon-refresh" @click.native='resetSearchRouterFormForm'>重置</dsn-button>
              </el-form-item>
            </el-form>
          </template>
        <template slot="body">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="router" label="工艺路线" width="120"></el-table-column>
          <el-table-column label="版本" prop="revision" width="120"></el-table-column>
          <el-table-column prop="currentRevision" label="当前版本">
            <template slot-scope="scope">{{ scope.row.currentRevision ? '已启用' : '未启用' }}</template>
          </el-table-column>
          <el-table-column label="类型" prop="routerType" width="120"></el-table-column>
          <el-table-column label="描述" prop="description" width="180"></el-table-column>
        </template>
        <!-- </dsn-table> -->
      <!-- <span slot="footer" class="dialog-footer">
        <dsn-button @click="routerDialog = false">取 消</dsn-button>
        <dsn-button type="primary" @click="sureRouter">确 定</dsn-button>
      </span> -->
    </DsnSelectDialog>
  </div>
</template>

<script>
import _ from "lodash";
import{
    findShopOrderRequest,
    updateShopOrderRequest,
    saveShopOrderRequest,
    findFieldRequest,
    deleteRequest,
    findShopOrderListHttp,
    findMaterialRequest,
    listRouterPageHttp,
    getRouterRequest
} from '@/api/work-order/work-order.api.js' 
export default {
  inject:['defaltDialogWidth'],
  data() {
    var shopOrderRule = (rule, value, callback) => {
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("只能为字母、数字、-、_、/组成"));
      }
      if ((value + "").length > 30) {
        return callback(new Error("只能输入30位以内"));
      }
      this.searchForm.shopOrder = value.toUpperCase();
      callback();
    };
    const numIssuedRules = (rule, value, callback) => {
      let reg = /^[1-9]\d*$/;
        if (value === "") {
            this.visableSave=true;
            callback("生产数量不为空");
        }
        if (!reg.test(value)) {
            this.visableSave=true;
            callback("生产数量应只包含非零整数");
        }else{
          this.visableSave=false;
          callback();
        }

        };
    return {
      //工单表信息
        ruleForm: {
            shopOrderType: "PRODUCTION", //类型
            status: "RELEASABLE", //状态
            plannedMaterial: "", //计划物料
            plannedMaterialRev: "", //计划物料版本
            plannedRouter: "", //计划工艺路线
            plannedRouterRev: "", //计划工艺路线版本
            productQty: "", //生产数量
            releasedQuantity: "" ,//已下达数量
            material:"",
            materialRev:"",
            router:"",
            customizedFieldDefInfoList:[],//自定义字段信息
        },
        searchOrderForm:{
          shopOrder:"",
          shopOrderType:"PRODUCTION"
        },
        searchRouterForm:{
          router:"",
          revision:""
        },
        searchMaterialForm:{
          material:"",
          materialRev:""
        },
        visableSave:false,
        selectOrderArr:[],
        selectMaterialArr:[],
        selectRouterArr:[],
        formLabelWidth:"150px",
        searchRules:{
          shopOrder: [{ validator: shopOrderRule, trigger: "blur" }]
        },
        rules: {
            style: [{ required: true, message: "请选择类型", trigger: "blur" }],
            state: [{ required: true, message: "请选择状态", trigger: "blur" }],
            plannedMaterial: [
                { required: true, message: "请输入计划物料", trigger: "blur" }
            ],
            productQty: [{ required: true, validator: numIssuedRules, trigger: "blur" }],
            // custom: [{ required: true, message: "请输入自定义字段", trigger: "blur" }],
        },
        searchForm:{
          shopOrder:''//最新工单
        },
        oldShopOrder:'',//旧工单(也就是搜索的工单)
        tenantSiteCode:'',
        allOrders:[],//获取到的所有工单
        getSearchData:'',//查询获取的工单数据
        
        dialogVisible:false,//删除工单提示框,
        orderDialog:false,//工单选择模态框
        orderTable:[],
        // 物料、版本、当前版本、描述
        materialTable:[],
        materialDialog:false,
        // materialChoice:[],
        routerDialog:false,
        routerTable:[],
        // routerChoice:[]
        disabelDel:true,
        orderAll:[],
        materialAll:[],
        routerAll:[],
    };
  },
  methods:{
    // 工单相关
    helpTextOrdere(item){
      return item["shopOrder"];
    },
    // 确认事件，工单
    handlerOrderChange(val){
      this.selectOrderArr=val
      if(this.selectOrderArr.length===0){
        this.searchForm.shopOrder=""
      }else{
        this.searchForm.shopOrder=this.selectOrderArr[0].shopOrder;
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
      console.log(this.selectOrderArr,"1111")
      this.searchOrderForm.shopOrder="",
      this.searchOrderForm.shopOrderType="";
      this.$refs["orderChoice"].resert();
      this.orderTable=this.orderAll;
      // this.selectOrderArr=[];
    },
    // 物料相关
    helpTextMaterial(item){
      return item["material"];
    },
    handlerMaterialChange(val){
      this.selectMaterialArr=val;
      if(this.selectMaterialArr.length===0){
        this.ruleForm.plannedMaterial="";
        this.ruleForm.plannedMaterialRev="";
      }else{
        this.ruleForm.plannedMaterial=this.selectMaterialArr[0].material;
        this.ruleForm.plannedMaterialRev=this.selectMaterialArr[0].materialRev;
      }
      this.materialDialog=false;
    },
    handlerCancleMaterial(){
      this.materialDialog=false;
    },
    searchMaterialFormChange(){
      const data=this.searchMaterialForm;
      data.pageSize=0;
      data.currentPage=1;
      findMaterialRequest(data).then(data =>{
        const res = data.data
        if(res.code == 200){
          this.materialTable=res.data.data
        }else{
          this.$message({
            message:res.message,
            type:'warning'
          })
        }
      })
    },
    resetSearchMaterialForm(){
      this.searchMaterialForm.material="",
      this.searchMaterialForm.materialRev="";
      this.$refs["materialChoice"].resert();
      this.materialTable=this.materialAll;
      // this.selectMaterialArr=[]
    },
    // 路线相关
    helpTextRouter(item){
      return item["router"];
    },
    handlerRouterChange(val){
      this.selectRouterArr=val;
      if(this.selectRouterArr.length===0){
        this.ruleForm.plannedRouterRev="";
        this.ruleForm.plannedRouter="";
      }else{
        this.ruleForm.plannedRouterRev=this.selectRouterArr[0].revision;
        this.ruleForm.plannedRouter=this.selectRouterArr[0].router;
      }
      this.routerDialog=false;
    },
    searchRouterFormChange(){
      let  data=this.searchRouterForm;
      getRouterRequest(data).then(data =>{
        const res = data.data
        if(res.code == 200){
          // console.log(res.data,"数据是")
          let arr=[];
          arr.push(res.data);
          this.routerTable=arr;
        }else{
          this.$message({
            message:res.message,
            type:'warning'
          })
        }
      })
    },
    resetSearchRouterFormForm(){
      this.searchRouterForm.router="",
      this.searchRouterForm.revision="";
      this.$refs["routerChoice"].resert();
      this.routerTable=this.routerAll;
      // this.selectRouterArr=[]
    },
    handlerCancleRouter(){
      this.routerDialog=false;
    },
    routerHandler(){
      listRouterPageHttp().then(data =>{
          const res = data.data
          if(res.code == 200){
            this.routerTable=res.data.data
            this.routerAll=_.cloneDeep(res.data.data)
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
        })
      this.routerDialog=true;
    },
    materialHandler(){
      this.materialDialog=true;
      const data={
        material:"",
        materialRev:"",
        currentPage:1,
        pageSize:100
      }
      findMaterialRequest(data).then(data =>{
        const res = data.data
        if(res.code == 200){
          this.materialTable=res.data.data
          this.materialAll=_.cloneDeep(res.data.data);
        }else{
          this.$message({
            message:res.message,
            type:'warning'
          })
        }
      })
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
          this.orderTable=res.data
          this.orderAll=_.cloneDeep(res.data)
        }else{
          this.$message({
            message:res.message,
            type:'warning'
          })
        }
      })
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
    // 初始化获取自定义字段
    getCustom(){
        const params ={
          customizedItem:'CMF_SHOP_ORDER'
        }
        findFieldRequest(params).then(data=>{
          const res=data.data;
          if(res.code===200){
            this.ruleForm.customizedFieldDefInfoList=res.data.customizedFieldDefInfoList;
            // console.log("初始化自定义字段"+JSON.stringify(res.data))
          }
        })
      },
    //重置
    reset(){
      //把绑定ruleForm的数据清空
      for(let key in this.ruleForm){
         this.ruleForm[key]  = ''
      }
      this.ruleForm.shopOrderType="PRODUCTION"; //类型
      this.ruleForm.status="RELEASABLE"; //状态
      //shopOrder
      this.searchForm.shopOrder = ''
      //重置oldShopOrder
      this.oldShopOrder = ''
      this.getCustom();
    },
      //查询指定工单
    getOrder(){
        const params ={
            shopOrder:this.searchForm.shopOrder,
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
                this.ruleForm.customizedFieldDefInfoList = res.data.customizedFieldDefInfoList//工单的自定义字段信息
                this.ruleForm.material = res.data.shopOrder.material
                this.ruleForm.materialRev = res.data.shopOrder.materialRev
                this.ruleForm.router = res.data.shopOrder.router;
                this.disabelDel=false;
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
      }else if(this.ruleForm.productQty == ''){
        this.$message({
          message:'生产数量未填写,提交失败',
          type:'warning'
        })
      }else{
        this.orderAll.forEach(item=>{
          if(item.shopOrder===this.searchForm.shopOrder){
            this.oldShopOrder=item.shopOrder
          }
        })
        const params = {
          customizedFieldDefInfoList: this.ruleForm.customizedFieldDefInfoList,
            shopOrder: {
              shopOrder:this.searchForm.shopOrder,
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
        if(this.oldShopOrder == this.searchForm.shopOrder){
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
                message:res.message,
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
      if(this.oldShopOrder == '' || this.oldShopOrder !== this.searchForm.shopOrder){
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
          this.$message({
            message:'删除成功',
            type:'success'
          })
          this.reset();
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
         this.dialogVisible = false
      })
    }
  },
  created(){
    this.getCustom();
    this.shopOrderAll();
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
.workOrder .showInfo{
  height:800px;
}
.workOrder .showInfo .el-form-item__content {
  display: flex;
}
</style>
