<template>
  <div class="maintenanceEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click.native="handleBack">
        返回
      </el-button>
      <el-button size="small" type="primary" @click.native="saveHandle">
        保存
      </el-button>
      <el-button size="small" type="primary" @click.native="handleReset">
        重置
      </el-button>
    </div>
    <div class="showInfo">
      <div class="right">
        <div class="tag">
          <el-form
            :model="themeForm"
            ref="themeForm"
            label-width="100px"
            class="demo-themeForm"
          >
            <el-form-item label="主题" prop="label">
              <el-input
                v-model.trim="themeForm.topic"
                placeholder="请输入主题"
                :disabled="isEditResource"
              ></el-input>
            </el-form-item>
            <el-form-item label="主题描述" prop="topicDes">
              <el-input
                v-model.trim="themeForm.topicDes"
                placeholder="请输入主题描述"
                :disabled="isEditResource"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <el-tabs type="border-card" @tab-click="handleTabClick">
          <el-tab-pane class="design">
            <span slot="label">基础信息</span>
            <el-form
              :model="themeForm"
              :inline="true"
              ref="themeFormTwo"
              label-width="120px"
              class="demo-themeForm"
            >
              <el-form-item label="主题地址:">
                <el-input
                  v-model.trim="themeForm.catenation"
                  placeholder="请输入标签描述"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="主题与站位关系维护" class="relationManage">
            <div class="container">
              <div class="left">
                <el-table
                  @selection-change="handleLeftSelect"
                  :data="list"
                  style="width: 100%"
                  border
                  height="540px"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="workCenterRelation" label="产线">
                    <template slot="header">
                        <span>产线</span>
                        <el-select v-model="list.workCenterRelation" @change="changeWork"  placeholder="请选择">
                            <el-option
                                v-for="(item,index) in workCenterRelationList"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="station" label="站位">
                    <template slot="header">
                        <span>站位</span>
                        <el-select v-model="list.station" @change="changeStation" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in stationList"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stationDes" label="站位描述">
                    <template slot="header">
                        <span>站位描述</span>
                        <el-select v-model="list.stationDes" @change="changeStationDes" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in stationDesList"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="ope">
                <el-button type="primary" 
                  icon="el-icon-arrow-left" 
                  @click.native="toLeft">
                </el-button>
                <el-button
                  type="primary"
                  icon="el-icon-arrow-right"
                  @click.native="toRight"
                ></el-button>
              </div>
              <div class="right">
                <el-table
                  @selection-change="handleRightSelect"
                  :data="list2"
                  style="width: 100%"
                  border
                  height="540px"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="workCenterRelation" label="产线">
                    <template slot="header">
                        <span>产线</span>
                        <el-select v-model="list2.workCenterRelation" @change="changeWork2"  placeholder="请选择">
                            <el-option
                                v-for="(item,index) in workCenterRelationList2"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="station" label="站位">
                    <template slot="header">
                        <span>站位</span>
                        <el-select v-model="list.station" @change="changeStation2" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in stationList2"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stationDes" label="站位描述">
                    <template slot="header">
                        <span>站位描述</span>
                        <el-select v-model="list.stationDes" @change="changeStationDes2" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in stationDesList2"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { findStationListHttp,updateTopicHttp } from "@/api/theme/theme.api.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      list: [],
      list2:[],
      workCenterRelationList:[],
      stationList:[],
      stationDesList:[],
      workCenterRelationList2:[],
      stationList2:[],
      stationDesList2:[],
      themeForm: {
        //主题描述
        topicDes: "",
        //主题
        topic: "",
        checked: true
      },
      //验证基础信息表单ref
      refArrBaseInfo: ["themeForm", "themeFormTwo"],
      //验证保养配置表单ref
      refArrUpkeepConfig: ["themeForm", "upkeepConfigForm"],
      tableData: [],
      selectionList: [],
      saveType: "design",
      isEditResource: false,
      //预警
      alarmList: [],
      fn: null,
      isRequired: false,
      currentRow: {},
      getTemplate: "",
      leftSelectList: [],
      rightSelectList: [],
      labelLinkList: [],
      labelStorageList: [],
      labelCommand:'',
      previewImage:'',
    };
  },
  computed: {
    ...mapGetters(["themeListGet"])
  },
  created() {
      // console.log(this.themeListGet,"vusx")
      this.themeForm=this.themeListGet[0];
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["themeList"]),
    init() {},
    // handleChangeRadio(val) {
    //   this.themeForm.resourceStatus = val;
    //   console.log(val);
    // },
    // 导航栏改变发请求渲染两个表的数据
    handleTabClick() {
      // console.log(this.themeForm,"this.themeForm")
      const data=this.themeForm;
      findStationListHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.list2=res.data.currentAllotStations
          this.list = res.data.unAllotStations;
          this.mesHanadler();
          // this.themeForm.topic = "";
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    // 数据处理
    mesHanadler(){
      let arr= [];
      let arr2=[];
      let arr3=[];
      let arr4=[];
      let arr5=[];
      let arr6=[];
      if(this.list.length>0){
        this.list.forEach(item=>{
          arr.push(item.workCenterRelation);
          arr2.push(item.station);
          arr3.push(item.stationDes);
        })
        this.workCenterRelationList=arr
        this.stationList=arr2;
        this.stationDesList=arr3;
      }
      if(this.list.length>0){
        this.list2.forEach(item=>{
          arr4.push(item.workCenterRelation);
          arr5.push(item.station);
          arr6.push(item.stationDes);
        })
        this.workCenterRelationList2=arr4
        this.stationList2=arr5;
        this.stationDesList2=arr6;
      }
      else{
        return
      }
    },
    changeWork(val){
      let arr=this.list.filter(item=>{
        return val===item.workCenterRelation
      })
      this.list = arr;
      this.list.workCenterRelation=val;
      // 下拉框默认显示第一条数据的内容
      this.list.station=arr[0].station;
      this.list.stationDes=arr[0].stationDes;
      this.mesHanadler();
    },
    changeWork2(val){
      let arr=this.list2.filter(item=>{
        return val===item.workCenterRelation
      })
      this.list2 = arr;
      this.list2.workCenterRelation=val;
      // 下拉框默认显示第一条数据的内容
      this.list2.station=arr[0].station;
      this.list2.stationDes=arr[0].stationDes;
      this.mesHanadler();
    },
    changeStation(val){
      let arr=this.list.filter(item=>{
        return val===item.station
      })
      this.list = arr;
      this.list.station=val;
      // 下拉框默认显示第一条数据的内容
      this.list.workCenterRelation=arr[0].workCenterRelation;
      this.list.stationDes=arr[0].stationDes;
      this.mesHanadler();
    },
    changeStation2(val){
      let arr=this.list2.filter(item=>{
        return val===item.station
      })
      this.list2 = arr;
      this.list2.station=val;
      // 下拉框默认显示第一条数据的内容
      this.list2.workCenterRelation=arr[0].workCenterRelation;
      this.list2.stationDes=arr[0].stationDes;
      this.mesHanadler();
    },
    changeStationDes(val){
      let arr=this.list.filter(item=>{
        return val===item.stationDes
      })
      this.list = arr;
      this.list.stationDes=val;
      // 下拉框默认显示第一条数据的内容
      this.list.workCenterRelation=arr[0].workCenterRelation;
      this.list.station=arr[0].station;
      this.mesHanadler();
    },
    changeStationDes2(val){
      let arr=this.list2.filter(item=>{
        return val===item.stationDes
      })
      this.list2 = arr;
      this.list2.stationDes=val;
      // 下拉框默认显示第一条数据的内容
      this.list2.workCenterRelation=arr[0].workCenterRelation;
      this.list2.station=arr[0].station;
      this.mesHanadler();
    },
    handleReset() {
      this.themeForm={}
    },
    // 返回
    handleBack() {
      this.selectionList = [];
      // this.themeList(this.selectionList);
      this.themeForm={};
      this.$router.push({
        name: "themeSafeguard"
      });
    },
    saveHandle(){
      const data= {...this.themeForm,...this.list,...this.list2};
      updateTopicHttp(data).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "新增失败"
          });
        }
      });
    },
    //  查询子元素
    findItemInArr(item, arr) {
      return arr.filter(subItem => {
        return (
          item.workCenterRelation == subItem.workCenterRelation &&
          item.workCenter == subItem.workCenter
        );
      });
    },
    // 选择的数据移动到左边
    toLeft() {
      const arr = this.rightSelectList.filter(item => {
        return this.findItemInArr(item, this.list).length == 0;
      });
      this.list = [...this.list, ...arr];
      this.selectionList = [];

    },
    //选择到数据移动到右边
    toRight() {
      const arr = this.leftSelectList.filter(item => {
        return this.findItemInArr(item, this.list2).length == 0;
      });
      this.list2 = [...this.list2, ...arr];
      this.selectionList = [];
    },
    handleLeftSelect(s) {
      this.leftSelectList = s;
    },
    handleRightSelect(s) {
      this.rightSelectList = s;
    },
    toTagOpe() {
      this.$router.push("/tag/tagEdit");
    },
  }
};
</script>

<style lang="scss">
.maintenanceEdit {
  padding: 0 30px;
  .operate {
    padding: 10px 5px;
  }
  .showInfo {
    .right {
      flex: 1;
      .tag {
        width: 25%;
      }
      .design {
        .designContent {
          display: flex;
          height: 200px;
          .left {
            flex: 2;
            .image {
              border: 1px solid grey;
              min-height: 170px;
            }
          }
          .right {
            flex: 1;
            .image {
              border: 1px solid grey;
              min-height: 170px;
            }
          }
        }
        .designBottom {
          padding: 10px 10px;
          .getTemplate {
            width: 150px;
          }
        }
      }
    }
  }

  .container {
    display: flex;
    .left,
    .right {
      flex: 1;
    }
    .ope {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      .el-button + .el-button {
        margin-left: 0px;
        margin-top: 20px;
      }
    }
  }
}
</style>
