<template>
  <div class="route-maintenance">
    <DsnPanel>
      <el-form :inline="true" class="typeForm" :model="form" :rules="searchrules" ref="form">
        <el-form-item label="工艺路线:"  prop="router">
          <dsn-input   v-model="form.router" placeholder="">
            <template slot="append">
              <dsn-select  @change="handleSelectChange"  style="width:150px" placeholder="请输入工艺路线" v-model="form.router">
           <el-option :label="item.router" :value="item" v-for="(item) in selectList" :key="item.router+item.revision">
             {{item.router}} - {{item.revision}}
           </el-option>
          </dsn-select>
            </template>
          </dsn-input>
        </el-form-item>
        <el-form-item label="版本:" prop="revision">
          <dsn-input placeholder="请输入版本" v-model="form.revision"></dsn-input>
        </el-form-item>
        <el-form-item>
          <dsn-button size="small" type="primary" icon="el-icon-search" @click="handleQuery">查询</dsn-button>
          <dsn-button size="small" type="primary" icon="el-icon-refresh" @click.native="reset">重置</dsn-button>
          <dsn-button size="small" type="danger" icon="el-icon-delete" @click="clearCanvas">清除</dsn-button>
          <dsn-button size="small" type="success" icon="el-icon-check" @click="validForm">保存</dsn-button>
        </el-form-item>
      </el-form>
    </DsnPanel>
    <div class="showInfo">
      <el-tabs type="border-card" v-model='tabselect'>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 一般
          </span>
          <el-form
            :model="form"
            :rules="rules"
            ref="form2"
            label-width="100px"
            class="demo-ruleForm"
            style="width:400px"
          >
            <el-form-item label="描述：" prop="description">
              <dsn-input  v-model="form.description" placeholder="描述"></dsn-input>
            </el-form-item>
            <el-form-item label="当前版本：" prop="currentRevision">
              <el-checkbox v-model="form.currentRevision"></el-checkbox>
            </el-form-item>
            <el-form-item label="类型" prop="routerType">
              <dsn-select  style="width:100%" v-model="form.routerType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <dsn-select style="width:100%"  v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </dsn-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="附加工序">
          <pannel ref="panel" :search="searchValue"  :modelCustomizedFieldDefInfoList="list2" />
        </el-tab-pane>
        <el-tab-pane label="自定义字段">
          <DsnData style="width:450px"  ref="dsntable"  v-model="form.customizedFieldDefInfoList"></DsnData>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  createRouter,
  getRouter,
  updateRouter,
  findCustomizedFieldDefList,
  listRouterPage
} from "@/api/material/route.maintenance.api";
import Pannel from "../components/pannel";
import handleData from "../components/handleData.js";
import handleRightData from "../components/handleRightData";

export default {
  components: {
    Pannel
  },
  data() {
    return {
      tabselect:'0',
      list:[],
      list2:[],
      selectList:[],
      searchValue: "",
      form: {
        customizedFieldDefInfoList:[],
        description: "", // 描述
        currentRevision: true, // 当前版本
        routerType: "",
        status: "Releasable",
        router: "",
        revision: ""
      },
      options: [
        {
          value: "P",
          label: "生产"
        },
        {
          value: "D",
          label: "处置"
        }
      ],
      options2: [
        {
          value: "Releasable",
          label: "可下达"
        },
        {
          value: "New",
          label: "新建"
        },
        {
          value: "Scrap",
          label: "作废"
        },
        {
          value: "Hold",
          label: "保留"
        }
        // {
        //   value: "5",
        //   label: "冻结"
        // }
      ],
      value: "",
      //工单表信息
      searchrules: {
        router: [
          { required: true, validator:this.validatorRouter , trigger: "change" }
        ],
        revision: [{ required: true,validator:this.validatorRevision, trigger: "change" }]
      },
      rules: {
        description: [
          { required: false, message: "请选择类型", trigger: "blur" }
        ],
        currentRevision: [
          { required: false, message: "请选择状态", trigger: "change" }
        ],
        routerType: [
          { required: true, message: "类型不能为空", trigger: "blur" }
        ],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      },
      shopOrder: "", //最新工单
      oldShopOrder: "", //旧工单(也就是搜索的工单)
      tenantSiteCode: "",
      allOrders: [], //获取到的所有工单
      getSearchData: "", //查询获取的工单数据
      customizedFieldDefInfoList: [], //自定义字段信息
      dialogVisible: false //删除工单提示框
    };
  },
  created() {
    this.init();
    this.hanldeFindCustomizedFieldDefList(1);
    this.hanldeFindCustomizedFieldDefList(2);
    this.handleListRouterPage()
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.$refs["panel"].init();
      });
    },
    handleSelectChange(v){
      console.log(v)
       let item= this.selectList.find(item=>item==v);
       console.log(item)
       this.form.revision = item.revision;
       this.form.router = item.router;
    },
    validatorRouter(rule, value, callback){

      if(value==''){
        callback(new Error("工艺路线不能为空"));
      }
        let reg = /[A-Z,0-9,-,_,/]/;
        if (!reg.test(value)) {
           callback(new Error("工艺路线输入不合法"));
        }
       
      callback();
    },
    validForm2(){
        this.$refs['form2'].validate((flag)=>{
            if(!flag)
            {
              this.$message({
                type:'warning',
                message:'标签栏【一般】表单输入不合法'
              })
              this.tabselect ='0'
              return ;
            }

            this.valid();
            
        })
    },
    validForm(){
        this.$refs['form'].validate((flag)=>{
          if(!flag){
            this.$message({
              type:'warning',
              message:'工艺路线或者版本输入不合法'
            })
            return ;
          }
          this.validForm2()
        })
    },
     validatorRevision(rule, value, callback){

      if(value==''){
        callback(new Error("当前版本不能为空"));
      }
        let reg = /[A-Z,0-9,-,_,/]/;
        if (!reg.test(value)) {
           callback(new Error("当前版本输入不合法"));
        }
       
      callback();
    },
    handleListRouterPage(){
      listRouterPage().then(data=>{
        const res = data.data;
        if(res.code==200){
          this.selectList = res.data.data;
        }
      })
    },
    clearCanvas(){
        this.$refs["panel"].clearCanvas()
    },
    //重置
    reset() {
      this.form={
        description: "", // 描述
        currentRevision: true, // 当前版本
        routerType: "",
        status: "Releasable",
        router: "",
        revision: ""
      }
      //  this.$refs["form"].resetFields();
    },
    valid(){
      this.$refs['dsntable'].valid((flag)=>{
        if(!flag){
          this.$message({
            type:'warning',
            message:'标签栏[自定义字段]输入不合法'
          })
          this.tabselect ='2'
          return ;
        }

        this.handleSave();
      })
    },
    //保存
    handleSave() {
      
      if (this.form.modifyTime && this.form.reference) {
        this.handleUpdateRoute();
        return;
      }
      this.handleCreateRouter();
    },
    handleUpdateRoute() {
      const data = this.$refs["panel"].getDataInfo();
      const { entryRouterStep, routerSteps } = handleData(data);

      const params = {
        currentRevision: this.form.currentRevision, // 当前版本
        customizedFieldDefInfoList: this.form.customizedFieldDefInfoList, //  自定义的数据
        description: this.form.description, //  描述
        entryRouterStep: entryRouterStep, //  附加工序的根结点
        routerSteps: routerSteps, //  附加工序的数据
        router: this.form.router, //版本
        revision: this.form.revision, //工艺路线名称
        routerType: this.form.routerType,
        status: this.form.status,
        modifyTime: this.form.modifyTime,
        reference: this.form.reference
      };
      updateRouter(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "更新成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    // 创建路线
    handleCreateRouter() {
      //  获取 附加工序的数据
      const data = this.$refs["panel"].getDataInfo();
      const {nodeList} =data;
      if(nodeList.length==0 || nodeList.length==1){
        this.$message({
          type:'warning',
          message:'请先补充附加工序'
        })
        return ;
      }
     let  entryRouterStep ,routerSteps;
     try {
       const  { entryRouterStep:a, routerSteps:b } = handleData(data);
       entryRouterStep= a;
       routerSteps =b;
     } catch (error) {
        console.log(error)
         this.$message({
          type:'warning',
          message:'附加工序数据不合法'
        })
        return ;
      }
       

      const params = {
        currentRevision: this.form.currentRevision, // 当前版本
        customizedData: [], //  自定义的数据
        description: this.form.description, //  描述
        entryRouterStep: entryRouterStep, //  附加工序的根结点
        routerSteps: routerSteps, //  附加工序的数据
        router: this.form.router, //版本
        revision: this.form.revision, //工艺路线名称
        routerType: this.form.routerType,
        status: this.form.status
      };
      createRouter(params).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "新增成功"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      });
    },
    hanldeFindCustomizedFieldDefList(type){
        findCustomizedFieldDefList(type).then(data=>{
          const res= data.data;
          if(res.code==200){
              if(type==1){
                this.list = res.data.customizedFieldDefInfoList;
                this.form.customizedFieldDefInfoList = this.list
              }else{
                 this.list2 = res.data.customizedFieldDefInfoList;
              }
          }
        })
    },
    handleQuery() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.getRouteInfo();
        }
      });
    },
    getRouteInfo() {
      getRouter({
        revision: this.form.revision,
        router: this.form.router
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          const {
            description,
            currentRevision,
            routerType,
            status,
            revision,
            router,
            entryRouterStep,
            routerSteps,
            reference,
            modifyTime,
            customizedFieldDefInfoList
            
          } = res.data;
          this.form = {
            description: description, // 描述
            currentRevision: currentRevision, // 当前版本
            routerType: routerType,
            status: status,
            router: router,
            revision: revision,
            reference,
            modifyTime,
             customizedFieldDefInfoList:customizedFieldDefInfoList||[]
          };
          const data = handleRightData({
            entryRouterStep,
            routerSteps,
          });
          // 重新渲染 附加工序的图
          this.$refs["panel"].dataReload({
            nodeList: data.nodes,
            lineList: data.lines
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.route-maintenance {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  .el-form-item__content .el-input-group {
    vertical-align: initial;
  }
  .showInfo {
    flex: 1;
    overflow: hidden;
    .el-tabs {
      height: 100%;
      box-sizing: border-box;
      .el-tabs__content {
        height: 100%;
        box-sizing: border-box;
        .el-tab-pane {
          height: 100%;
          box-sizing: border-box;
        }
      }
    }
  }
  // .el-tabs--border-card > .el-tabs__header {
  //   background: #Fff;
  // }
}
//选择弹框
// .choiceBox {
//   width: 15px;
//   height: 41px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-right: 50px;
// }
// .version {
//   width: 300px;
//   display: inline-block;
// }
// .el-form-item__content {
//   display: flex;
// }
</style>
