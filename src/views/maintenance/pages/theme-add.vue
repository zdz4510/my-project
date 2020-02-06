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
                      <div class="inputChoice">
                        <div class="input-left">产线</div>
                        <div class="input-right">
                          <input
                            v-model="v"
                            class="input"
                            v-on:input="changeWork"
                            placeholder="请输入产线"
                          />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="station" label="站位">
                    <template slot="header">
                      <div class="inputChoice">
                        <div class="input-left">站位</div>
                        <div class="input-right">
                          <input
                            v-model="v1"
                            class="input"
                            v-on:input="changeStation"
                            placeholder="请输入站位"
                          />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stationDes" label="站位描述">
                    <template slot="header">
                      <div class="inputChoice">
                        <div class="input-left">站位描述</div>
                        <div class="input-right">
                          <input
                            v-model="v2"
                            class="input"
                            v-on:input="changeStationDes"
                            placeholder="请输入站位描述"
                          />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="ope">
                <el-button
                  type="primary"
                  icon="el-icon-arrow-left"
                  @click.native="toLeft"
                >
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
                      <div class="inputChoice">
                        <div class="input-left">产线</div>
                        <div class="input-right">
                          <input
                            v-model="w"
                            class="input"
                            v-on:input="changeWork"
                            placeholder="请输入产线"
                          />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="station" label="站位">
                    <template slot="header">
                      <div class="inputChoice">
                        <div class="input-left">站位</div>
                        <div class="input-right">
                          <input
                            v-model="w1"
                            class="input"
                            v-on:input="changeStation"
                            placeholder="请输入站位"
                          />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stationDes" label="站位描述">
                    <template slot="header">
                      <template slot="header">
                      <div class="inputChoice">
                        <div class="input-left">站位描述</div>
                        <div class="input-right">
                          <input
                            v-model="w2"
                            class="input"
                            v-on:input="changeStationDes"
                            placeholder="请输入站位描述"
                          />
                        </div>
                      </div>
                    </template>
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
import { findStationListHttp, addTopicHttp } from "@/api/theme/theme.api.js";
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      list: [],
      list2: [],
      allList:{},
      // 左侧未分配数据
      v:'',
      v1:'',
      v2:'',
      // 右侧已分配数据
      w:'',
      w1:'',
      w2:'',
      themeForm: {
        //主题描述
        topicDes: "",
        //主题
        topic: ""
      },
      status1: "",
      //验证基础信息表单ref
      refArrBaseInfo: ["themeForm", "themeFormTwo"],
      //验证保养配置表单ref
      refArrUpkeepConfig: ["themeForm", "upkeepConfigForm"],
      tableData: [],
      selectionList: [],
      operateType: "",
      saveType: "design",
      isEditResource: false,
      //预警
      alarmList: [],
      isRequired: false,
      currentRow: {},
      getTemplate: "",
      leftSelectList: [],
      rightSelectList: [],
      labelLinkList: [],
      labelStorageList: [],
      labelCommand: "",
      previewImage: ""
    };
  },
  computed: {
    ...mapGetters(["tagConfigList"])
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapMutations(["TAGCONFIGLIST"]),
    // 导航栏改变发请求渲染两个表的数据
    handleTabClick() {
      // console.log(this.themeForm,"this.themeForm")
      const data = this.themeForm;
      findStationListHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.list2 = res.data.currentAllotStations;
          this.list = res.data.unAllotStations;
          this.messageDetail();
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    // 数据处理
    messageDetail(){
      let obj={
            currentAllotStations: this.list2,
            unAllotStations: this.list
          }
      // 深拷贝查询出来的表格数据
      this.allList= _.cloneDeep(obj);
    },
    changeWork() {
      let arr = this.list.filter(item => {
        if(item.workCenterRelation.indexOf(this.v)>=0){
          return  item.workCenterRelation;
        }
      });
      this.list=arr;
    },
    changeWork2() {
      let arr = this.list2.filter(item => {
        if(item.workCenterRelation.indexOf(this.w)>=0){
          return  item.workCenterRelation;
        }
      });
      this.list2=arr;
    },
    changeStation() {
      let arr = this.list.filter(item => {
        if(item.station.indexOf(this.v1)>=0){
          return  item.station;
        }
      });
      this.list=arr;
    },
    changeStation2() {
      let arr = this.list2.filter(item => {
        if(item.station.indexOf(this.w1)>=0){
          return  item.station;
        }
      });
      this.list2=arr;
    },
    changeStationDes() {
      let arr = this.list.filter(item => {
        if(item.stationDes.indexOf(this.v2)>=0){
          return  item.stationDes;
        }
      });
      this.list=arr;
    },
    changeStationDes2() {
      let arr = this.list2.filter(item => {
        if(item.stationDes.indexOf(this.w2)>=0){
          return  item.stationDes;
        }
      });
      this.list2=arr;
    },
    handleReset() {
      this.themeForm = {};
      this.handleTabClick();
    },
    // 返回
    handleBack() {
      this.selectionList = [];
      this.themeForm = {};
      this.$router.push({
        name: "themeSafeguard"
      });
    },
    saveHandle() {
      const data = { ...this.themeForm, ...this.allList.currentAllotStations, ...this.allList.unAllotStations };
      addTopicHttp(data).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "新增成功"
          });
          this.$router.push({
            name: "themeSafeguard"
          });
        } else {
          this.$message({
            type: "error",
            message: "新增失败"
          });
        }
      });
    },
    //  查询子元素，有没有
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
      // 右边数据增加
      this.list = [...this.list, ...arr];
      // 同时深拷贝来的数据进行操作
      let arr2=this.allList.currentAllotStations.filter((item)=>{
        return this.fiterRight(item,arr).length==0;
      })
      this.allList.currentAllotStations=arr2
      this.selectionList = [];
    },
    //选择到数据移动到右边
    toRight() {
      console.log(this.allList,"1")
      const arr = this.leftSelectList.filter(item => {
        return this.findItemInArr(item, this.list2).length == 0;
      });
      console.log(arr,"数据");
      this.list2 = [...this.list2, ...arr];
      // 同时深拷贝来的数据进行操作
      let arr2=this.allList.unAllotStations.filter((item)=>{
        return this.fiterRight(item,arr).length==0;
      })
      this.allList.unAllotStations=arr2
      this.selectionList = [];
    },
    fiterRight(item, arr) {
      return arr.filter(subItem => {
        return (
          item.workCenterRelation == subItem.workCenterRelation &&
          item.workCenter == subItem.workCenter
        );
      });
    },
    handleLeftSelect(s) {
      this.leftSelectList = s;
    },
    handleRightSelect(s) {
      this.rightSelectList = s;
    },
    toTagOpe() {
      this.$router.push("/tag/tagEdit");
    }
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
    .inputChoice{
      .input-left{
        text-align:center;
        line-height:24px;
      }
      .input-right{
        input{
          width:100%;
          text-align:center;
          height:40px;
          border:1px #ededed solid;
        }
      }
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
