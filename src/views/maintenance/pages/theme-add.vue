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
                      <!-- <el-select v-model="list.workCenterRelation" @change="changeWork"  placeholder="请选择">
                            <el-option
                                v-for="(item,index) in workCenterRelationList"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select> -->
                      <!-- list.workCenterRelation -->
                      <input
                       
                        v-model="v"
                        
                        placeholder="请输入内容"
                       />
                    </template>
                  </el-table-column>
                  <el-table-column prop="station" label="站位">
                    <template slot="header">
                      <span>站位</span>
                      <el-select
                        v-model="list.station"
                        @change="changeStation"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, index) in stationList"
                          :key="index"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stationDes" label="站位描述">
                    <template slot="header">
                      <span>站位描述</span>
                      <el-select
                        v-model="list.stationDes"
                        @change="changeStationDes"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, index) in stationDesList"
                          :key="index"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
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
                      <span>产线</span>
                      <el-select
                        v-model="list2.workCenterRelation"
                        @change="changeWork2"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, index) in workCenterRelationList2"
                          :key="index"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="station" label="站位">
                    <template slot="header">
                      <span>站位</span>
                      <el-select
                        v-model="list.station"
                        @change="changeStation2"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, index) in stationList2"
                          :key="index"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stationDes" label="站位描述">
                    <template slot="header">
                      <span>站位描述</span>
                      <el-select
                        v-model="list.stationDes"
                        @change="changeStationDes2"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, index) in stationDesList2"
                          :key="index"
                          :label="item"
                          :value="item"
                        >
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
import { findStationListHttp, addTopicHttp } from "@/api/theme/theme.api.js";
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      list: [],
      list2: [],
      workCenterRelationList: [],
      stationList: [],
      stationDesList: [],
      workCenterRelationList2: [],
      stationList2: [],
      stationDesList2: [],
      fn: null,
      v:'123444',
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
    this.fn = _.debounce(cb => {
      cb(this.list);
    }, 400);
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    ...mapMutations(["TAGCONFIGLIST"]),
    querySearch(queryString, cb) {
      console.log("1111");
      let restaurants = this.restaurants;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      console.log(this.list);
      return this.list;
      // [
      //   { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      //   { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      //   { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      //   { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
      //   { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
      //   { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
      //   { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
      //   { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
      //   { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
      //   { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
      //   { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
      //   { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
      //   { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
      //   { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
      //   { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
      //   { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
      //   { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
      //   { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      //   { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
      //   { "value": "枪会山", "address": "上海市普陀区棕榈路" },
      //   { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
      //   { "value": "钱记", "address": "上海市长宁区天山西路" },
      //   { "value": "壹杯加", "address": "上海市长宁区通协路" },
      //   { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
      //   { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
      //   { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
      //   { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
      //   { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
      //   { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
      //   { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
      //   { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
      //   { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
      //   { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
      //   { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
      //   { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
      //   { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
      //   { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
      //   { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
      //   { "value": "浏阳蒸菜", "address": "天山西路430号" },
      //   { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
      //   { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
      //   { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
      //   { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
      //   { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
      //   { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
      //   { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
      //   { "value": "阳阳麻辣烫", "address": "天山西路389号" },
      //   { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      // ];
    },
    handleSelect() {
      // this.status1=item.work;
      // console.log(this.status1);
      // console.log(item.value);
    },
    // 导航栏改变发请求渲染两个表的数据
    handleTabClick() {
      // console.log(this.themeForm,"this.themeForm")
      const data = this.themeForm;
      findStationListHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.list2 = res.data.currentAllotStations;
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
    mesHanadler() {
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      if (this.list.length > 0) {
        this.list.forEach(item => {
          arr.push(item.workCenterRelation);
          arr2.push(item.station);
          arr3.push(item.stationDes);
        });
        this.workCenterRelationList = arr;
        this.stationList = arr2;
        this.stationDesList = arr3;
      }
      if (this.list.length > 0) {
        this.list2.forEach(item => {
          arr4.push(item.workCenterRelation);
          arr5.push(item.station);
          arr6.push(item.stationDes);
        });
        this.workCenterRelationList2 = arr4;
        this.stationList2 = arr5;
        this.stationDesList2 = arr6;
      } else {
        return;
      }
    },
    changeWork(val) {
      // console.log(val,'数据')
      this.themeForm.workCenterRelation = val.workCenterRelation;
      // let arr=this.list.filter(item=>{
      //   return val===item.workCenterRelation
      // })
      // this.list = arr;
      // this.list.workCenterRelation=val;
      // // 下拉框默认显示第一条数据的内容
      // this.list.station=arr[0].station;
      // this.list.stationDes=arr[0].stationDes;
      // this.mesHanadler();
    },
    changeWork2(val) {
      let arr = this.list2.filter(item => {
        return val === item.workCenterRelation;
      });
      this.list2 = arr;
      this.list2.workCenterRelation = val;
      // 下拉框默认显示第一条数据的内容
      this.list2.station = arr[0].station;
      this.list2.stationDes = arr[0].stationDes;
      this.mesHanadler();
    },
    changeStation(val) {
      let arr = this.list.filter(item => {
        return val === item.station;
      });
      this.list = arr;
      this.list.station = val;
      // 下拉框默认显示第一条数据的内容
      this.list.workCenterRelation = arr[0].workCenterRelation;
      this.list.stationDes = arr[0].stationDes;
      this.mesHanadler();
    },
    changeStation2(val) {
      let arr = this.list2.filter(item => {
        return val === item.station;
      });
      this.list2 = arr;
      this.list2.station = val;
      // 下拉框默认显示第一条数据的内容
      this.list2.workCenterRelation = arr[0].workCenterRelation;
      this.list2.stationDes = arr[0].stationDes;
      this.mesHanadler();
    },
    changeStationDes(val) {
      let arr = this.list.filter(item => {
        return val === item.stationDes;
      });
      this.list = arr;
      this.list.stationDes = val;
      // 下拉框默认显示第一条数据的内容
      this.list.workCenterRelation = arr[0].workCenterRelation;
      this.list.station = arr[0].station;
      this.mesHanadler();
    },
    changeStationDes2(val) {
      let arr = this.list2.filter(item => {
        return val === item.stationDes;
      });
      this.list2 = arr;
      this.list2.stationDes = val;
      // 下拉框默认显示第一条数据的内容
      this.list2.workCenterRelation = arr[0].workCenterRelation;
      this.list2.station = arr[0].station;
      this.mesHanadler();
    },
    handleReset() {
      this.themeForm = {};
    },
    // 返回
    handleBack() {
      this.selectionList = [];
      // this.TAGCONFIGLIST(this.selectionList);
      this.themeForm = {};
      this.$router.push({
        name: "themeSafeguard"
      });
    },
    saveHandle() {
      const data = { ...this.themeForm, ...this.list, ...this.list2 };
      addTopicHttp(data).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "新增成功"
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
