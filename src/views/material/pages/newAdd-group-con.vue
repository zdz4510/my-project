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
              <dsn-select v-model="ruleForm.style" @change="changeButton" :disabled="selectVisable">
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
            <el-form-item label="按钮描述：" prop="buttonDesc">
              <el-col :span="12">
                <dsn-input v-model="ruleForm.buttonDesc"></dsn-input>
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
        <dsn-button size="small" type="success" icon="el-icon-folder-add">添加</dsn-button>
        <dsn-button size="small" type="danger" icon="el-icon-delete">移除</dsn-button>
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
        <el-table-column prop="activity" label="作业" width="120"></el-table-column>
        <el-table-column prop="activityDes" label="作业描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="activityType" label="作业类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="clearsLot" label="清除LOT" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.clearsLot ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" show-overflow-tooltip>
          <dsn-button>111</dsn-button>
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
          <el-table-column prop="buttonName" label="按钮名称" width="120"></el-table-column>
          <el-table-column prop="buttonDes" label="按钮描述" show-overflow-tooltip></el-table-column>
          <el-table-column prop="buttonStyle" label="按钮类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="operate" label="操作" show-overflow-tooltip></el-table-column>
        </dsn-table>
    </DsnPanel>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "add-pro-configuration",
  computed: {
    ...mapGetters(["proRow"])
  },
  data() {
    return {
      ruleForm: {
        style: "普通", //按钮类型
        location: "", //按钮方向
        buttonId: "", //按钮标识
        buttonDesc: "", //按钮描述
        imageIcon: "" //按钮图标
      },
      rules: {
        style: [{ required: true, message: "请选择按钮类型", trigger: "blur" }],
        location: [{ required: true, message: "请选择方向", trigger: "blur" }],
        buttonId: [{ required: true, message: "标识不能为空", trigger: "blur" }],
        buttonDesc: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ]
      },
      selectedList: [], //选中项
      //列表数据
      tableData: [],//作业表格
      tableData2:[],// 按钮表格
      selectVisable:false,//下拉框是否可以选择
      visableTable2:true, //普通，作业
      visableTable:false // 组，按钮显示
    };
  },
  methods: {
    ...mapMutations(["PROROW"]),
    changeButton(val){
      console.log(val)
      if(val==="组"){
        this.visableTable2=false;// 作业丢掉
        this.visableTable=true;//组表格显示
      }else{
        this.visableTable2=true;// 作业显示
        this.visableTable=false;//组表格丢掉
      }
    },
    handleSelectionChange(rows) {
      this.selectedList = rows;
    }
  },
  created(){
    // if(this.proRow.groupFlag){
    //   this.ruleForm.style="组"
    // }else{
    //   this.ruleForm.style="普通"
    // }
    // this.tableData=this.proRow.podActivities;
    // console.log(this.proRow,"数据")
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