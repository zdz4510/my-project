<template>
  <div class="addProConfig">
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索条件</span>
      </div>
      <!-- 查询条件start -->
      <el-row>
        <el-col :span="12">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="按钮类型:" prop="style">
              <dsn-select v-model="ruleForm.style" @change="changeButton" :disabled="showSelect">
                <el-option label="普通" value="普通"></el-option>
                <el-option label="组" value="组"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="按钮位置：" prop="location">
              <dsn-select v-model="ruleForm.location" placeholder="上">
                <el-option label="上" value="上"></el-option>
                <el-option label="下" value="下"></el-option>
                <el-option label="左" value="左"></el-option>
                <el-option label="右" value="右"></el-option>
              </dsn-select>
            </el-form-item>
            <el-form-item label="按钮标识：" prop="buttonId">
              <el-col :span="12">
                <dsn-input v-model="ruleForm.buttonId"></dsn-input>
              </el-col>
            </el-form-item>
            <el-form-item label="按钮描述：" prop="buttionDesc">
              <el-col :span="12">
                <dsn-input v-model="ruleForm.buttionDesc"></dsn-input>
              </el-col>
            </el-form-item>
            <el-form-item label="按钮图标：" prop="imageIcon">
              <el-col :span="12">
                <dsn-input v-model="ruleForm.imageIcon"></dsn-input>
              </el-col>
              <i class="el-icon-more"></i>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="topRight">
          <div class="optionBox">
            <div class="boxTop">上</div>
            <div class="boxCenter">
              <div class="centerLeft">左</div>
              <div class="centerRight">右</div>
            </div>
            <div class="boxDown">下</div>
          </div>
        </el-col>
      </el-row>
    </DsnPanel>
    <DsnPanel>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <div class="operation">
        <dsn-button size="small" type="success" @click="addWork" :disabled="workVisable" icon="el-icon-folder-add">添加作业</dsn-button>
        <dsn-button size="small" type="success" @click="addButton" :disabled="buttonVisable" icon="el-icon-folder-add">添加按钮</dsn-button>
        <dsn-button size="small" type="success" @click="saveMessage">保存并返回</dsn-button>
      </div>
      <!--列表-->
      <dsn-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        v-if="visableTable2"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="55" type="index">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="activity" label="作业" width="120">
          <template slot-scope="scoped">
            <dsn-input v-model="scoped.row.activity"></dsn-input>
          </template>
        </el-table-column>
        <el-table-column prop="activityDes" label="作业描述" show-overflow-tooltip>
          <template slot-scope="scoped">
            <dsn-input v-model="scoped.row.activityDes"></dsn-input>
          </template>
        </el-table-column>
        <el-table-column prop="activityType" label="作业类型" show-overflow-tooltip>
          <template slot-scope="scoped">
            <dsn-input v-model="scoped.row.activityType"></dsn-input>
          </template>
        </el-table-column>
        <el-table-column prop="clearsLot" label="清除LOT" show-overflow-tooltip>
          <template slot-scope="scoped">
            <dsn-select v-model="scoped.row.clearsLot" placeholder="已启用">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </dsn-select>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <dsn-button size="small" type="success" @click="toTopWork(scope.$index, scope.row)">上</dsn-button>
            <dsn-button size="small" type="success" @click="toDownWork(scope.$index, scope.row)">下</dsn-button>
            <dsn-button size="small" type="danger" icon="el-icon-delete" @click="handleDeleteWork(scope.$index, scope.row)">删除</dsn-button>
          </template>
        </el-table-column>
      </dsn-table>
      <dsn-table
          ref="multipleTable"
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100%"
          v-if="visableTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="55" type="index">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column prop="buttonId" label="按钮名称" width="120">
            <template slot-scope="scoped">
              <dsn-input v-model="scoped.row.buttonId"></dsn-input>
            </template>
          </el-table-column>
          <el-table-column prop="buttionDesc" label="按钮描述" show-overflow-tooltip>
            <template slot-scope="scoped">
              <dsn-input v-model="scoped.row.buttionDesc"></dsn-input>
            </template>
          </el-table-column>
          <el-table-column prop="groupFlag" label="按钮类型" show-overflow-tooltip>

            <template slot-scope="scoped">
              <dsn-select v-model="scoped.row.groupFlag" placeholder="已启用">
                <!-- <el-option label="组" :value="true"></el-option> -->
                <el-option label="普通" :value="false"></el-option>
              </dsn-select>
              <!-- <dsn-input v-model="scoped.row.groupFlag">
                 <template slot-scope="scope">{{ scope.row.groupFlag ? '组' : '普通' }}</template>
              </dsn-input> -->
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
            <dsn-button size="small" type="success" @click="toTopButton(scope.$index, scope.row)">上</dsn-button>
            <dsn-button size="small" type="success" @click="toDownButton(scope.$index, scope.row)">下</dsn-button>
            <dsn-button size="small" type="danger" icon="el-icon-delete" @click="handleDeleteButton(scope.$index, scope.row)">删除</dsn-button>
          </template>
          </el-table-column>
        </dsn-table>
    </DsnPanel>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "add-pro-configuration",
  computed: {
    ...mapGetters(["proRow","allMessage"])
  },
  data() {
    return {
      ruleForm: {
        style: "普通", //按钮类型
        location: "", //按钮方向
        buttonId: "", //按钮标识
        buttionDesc: "", //按钮描述
        imageIcon: "" //按钮图标
      },
      rules: {
        style: [{ required: true, message: "请选择按钮类型", trigger: "blur" }],
        location: [{ required: true, message: "请选择方向", trigger: "blur" }],
        buttonId: [{ required: true, message: "标识不能为空", trigger: "blur" }],
        buttionDesc: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ]
      },
      selectedList: [], //选中项
      //列表数据
      tableData: [],//作业表格
      tableData2:[],// 按钮表格
      workVisable:false,//添加作业是否可以选择
      visableTable:false,// 按钮表格
      visableTable2:true, //普通，作业
      buttonVisable:true,//添加按钮
      showSelect:false,// 只有判断按钮底下有作业或者组底下有按钮才不改
      transData:{},//数据展示保存在这
      getData:{},//vuex的数据暂存
  };
},
  watch:{
    tableData:function(){
      if(this.tableData.length>0){
        this.showSelect=true;
      }
    },
    tableData2:function(){
      if(this.tableData2.length>0){
        this.showSelect=true;
      }
    }
  },
  methods: {
    ...mapMutations(["PROROW","ALLMESSAGE"]),
    // 按钮类型改变时
    changeButton(val){
      if(val==="组"){
        this.visableTable2=false;// 作业丢掉
        this.visableTable=true;//组表格显示
        this.workVisable=true;//作业按钮无效
        this.buttonVisable=false;// 添加按钮有效
      }else{
        this.visableTable2=true;// 作业显示
        this.visableTable=false;//组表格丢掉
        this.workVisable=false;//作业按钮有效
        this.buttonVisable=true;// 添加按钮失效
      }
    },
    saveMessage(){
      console.log(this.$route.params.num,"数字1")
      if(this.$route.params.num>=0){
        console.log(this.$route.params.num,"数字2")
        const data={};
        if(this.ruleForm.style==="组"){
          data.groupFlag=true;
          data.podActivities=this.tableData;
          data.podButtons=this.tableData2;
        }else{
          data.groupFlag=false;
          data.podActivities=this.tableData;
          data.podButtons=this.tableData2;
        }
        if(this.ruleForm.location==="上"){
          data.location="top"; 
        }
        else if(this.ruleForm.location==="下"){
          data.location="bottom"; 
        }
        else if(this.ruleForm.location==="左"){
          data.location="left"; 
        }
        else if(this.ruleForm.location==="右"){
          data.location="right"; 
        }
        data.buttonId=this.ruleForm.buttonId; //按钮标识
        data.buttionDesc=this.ruleForm.buttionDesc; //按钮描述
        data.imageIcon=this.ruleForm.imageIcon; //按钮图标
        this.getData.podButtons[this.$route.params.num]=data;
        this.$router.push({
        // path: "/device/materialGroupEdit",
        name: "proConfiguration",
        params:{change:this.getData}
      });
        // this.getData.podButtons[num]
      }else{
        if(this.ruleForm.location==="上"){
          this.transData.location="top"; 
        }
        if(this.ruleForm.location==="下"){
          this.transData.location="bottom"; 
        }
        if(this.ruleForm.location==="左"){
          this.transData.location="left"; 
        }
        if(this.ruleForm.location==="右"){
          this.transData.location="right"; 
        }
        this.transData.buttonId=this.ruleForm.buttonId; //按钮标识
        this.transData.buttionDesc=this.ruleForm.buttionDesc; //按钮描述
        this.transData.imageIcon=this.ruleForm.imageIcon; //按钮图标
        if(this.ruleForm.style==="组"){
          this.transData.groupFlag=true;
          this.transData.podActivities=this.tableData;// 为空数组
          this.transData.podButtons=this.tableData2;// 当前的按钮表格
          this.setter()

        }else{
          this.transData.groupFlag=false;
          this.transData.podActivities=this.tableData; // 当前作业表格
          this.transData.podButtons=this.tableData2; //为空数组
          this.setter()
        }
        
        // this.$router.push({ path: "/material/proConfiguration",params{}});
      }
      
    },
    setter(){
      console.log("要加的数据",this.transData)
      this.transData.sequence=this.allMessage.podButtons.length+1;
      this.getData.podButtons.push(this.transData);// 新增的组
      console.log("加后的数据",this.getData)
      this.ALLMESSAGE(this.getData);
      this.$router.push({
        // path: "/device/materialGroupEdit",
        name: "proConfiguration",
        params:{message:this.getData}
      });
      // this.$router.push({ path: "/material/proConfiguration",params:{message:this.getData}});
    },
    //新增按钮ss
    addButton(){
      const len = this.tableData2.length;
      this.tableData2.splice(len, 0, {
        buttonId:"",
        buttionDesc:"",
        groupFlag:false
      });
    },
    // 新增作业
    addWork(){
      const len = this.tableData.length;
      this.tableData.splice(len, 0, {
        activity:"",
        activityDes:"",
        activityType:"",
        clearsLot:true,
      });
      // this.lockOpeAction = true;
    },
    //上移按钮
    toTopButton(index){
      if(index<=0){
          this.$message({
            type: "warning",
            message: "已经在最上方"
          });
      }
      const selectOne=this.tableData2[index];
      const topOne = this.tableData2[index-1];
      this.tableData2.splice(index,1,topOne);
      this.tableData2.splice(index-1,1,selectOne);
    },
    toDownButton(index){
      const len=this.tableData2.length;
      if(index+1===len){
          this.$message({
            type: "warning",
            message: "已经在最下方"
          });
      }
      const selectOne=this.tableData2[index];
      const bottomOne = this.tableData2[index+1];
      this.tableData2.splice(index,1,bottomOne);
      this.tableData2.splice(index+1,1,selectOne);
    },
    handleDeleteButton(index){
      this.tableData2.splice(index,1);
    },
    // 上移作业
    toTopWork(index){
      if(index<=0){
          this.$message({
            type: "warning",
            message: "已经在最上方"
          });
      }
      const selectOne=this.tableData[index];
      const topOne = this.tableData[index-1];
      this.tableData.splice(index,1,topOne);
      this.tableData.splice(index-1,1,selectOne);
    },
    // 下移作业
    toDownWork(index){
      const len=this.tableData.length;
      if(index+1===len){
          this.$message({
            type: "warning",
            message: "已经在最下方"
          });
      }
      const selectOne=this.tableData[index];
      const bottomOne = this.tableData[index+1];
      this.tableData.splice(index,1,bottomOne);
      this.tableData.splice(index+1,1,selectOne);
    },
    // 删除作业
    handleDeleteWork(index){
      this.tableData.splice(index,1);
    },
    handleSelectionChange(rows) {
      this.selectedList = rows;
    }
  },
  created(){
    this.getData=this.allMessage;
    console.log(this.getData,"是否相同")
    // 是编辑时
    if(this.$route.params.messageList[0]){
      if(this.$route.params.messageList[0].groupFlag){
        this.ruleForm.style="组";
        this.workVisable=true;//添加作业是否可以选择
        this.visableTable=true;// 按钮表格
        this.visableTable2=false; //普通，作业
        this.buttonVisable=false;//添加按钮
        this.showSelect=true;// 只有判断按钮底下有作业或者组底下有按钮才不改
        this.tableData=[];
        this.tableData2=this.$route.params.messageList[0].podButtons
      }else{
        this.ruleForm.style="普通"
        this.workVisable=false;//添加作业是否可以选择
        this.visableTable=false;// 按钮表格
        this.visableTable2=true; //普通，作业
        this.buttonVisable=true;//添加按钮
        this.showSelect=false;// 只有判断按钮底下有作业或者组底下有按钮才不改
        this.tableData2=[];
        console.log(this.$route.params.messageList[0],"传过来的数据")
        this.tableData=this.$route.params.messageList[0].podActivities
      }
      if(this.$route.params.messageList[0].location==="top"){
        this.ruleForm.location="上"
      }else if(this.$route.params.messageList[0].location==="bottom"){
        this.ruleForm.location="下"
      }else if(this.$route.params.messageList[0].location==="left"){
        this.ruleForm.location="左"
      }else if(this.$route.params.messageList[0].location==="right"){
        this.ruleForm.location="右"
      }
      this.ruleForm.buttonId=this.$route.params.messageList[0].buttonId; //按钮标识
      this.ruleForm.buttionDesc=this.$route.params.messageList[0].buttionDesc; //按钮描述
      this.ruleForm.imageIcon=this.$route.params.messageList[0].imageIcon; //按钮图标
    }
  },
};
</script>
<style lang="scss">
.addProConfig {
  .topRight {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .optionBox {
      width: 250px;
      height: 150px;
      border: 1px solid;
      box-sizing: border-box;
      .boxTop {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: burlywood;
        font-size: 14px;
      }
      .boxDown {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: brown;
        font-size: 14px;
      }
      .boxCenter {
        width: 100%;
        height: 60%;
        background: pink;
        display: flex;
        justify-content: space-between;
        .centerLeft,
        .centerRight {
          width: 30px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: powderblue;
        }
      }
    }
  }
}
</style>