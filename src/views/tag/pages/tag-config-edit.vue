<template>
  <div class="maintenanceEdit">
    <dsnPanel>
      <div class="operate mt-15">
        <dsn-button size="small" type="primary" @click="handleBack">
          返回
        </dsn-button>
        <dsn-button size="small" type="primary" @click="validFrom">
          保存
        </dsn-button>
        <dsn-button size="small" type="primary" @click="handleReset">
          重置
        </dsn-button>
      </div>
      <el-form
        :model="tagConfigForm"
        ref="tagConfigFormOne"
        :rules="rules"
        class="demo-tagConfigForm"
        :inline="true"
      >
        <el-form-item label="标签ID" prop="label">
          <dsn-input
            v-model.trim="tagConfigForm.label"
            placeholder="请输入标签ID"
            :disabled="isEditResource"
          ></dsn-input>
        </el-form-item>
      </el-form>
    </dsnPanel>
    <div class="showInfo">
      <div class="right">
        <div class="tag"></div>

        <el-tabs type="border-card" @tab-click="handleTabClick">
          <el-tab-pane class="design">
            <span slot="label">设计</span>
            <el-form
              :model="tagConfigForm"
              :rules="rules"
              :inline="true"
              ref="tagConfigFormTwo"
              label-width="120px"
              class="demo-tagConfigForm"
            >
              <el-form-item label="标签描述:" prop="labelDes">
                <dsn-input
                  v-model.trim="tagConfigForm.labelDes"
                  placeholder="请输入标签描述"
                ></dsn-input>
              </el-form-item>
              <el-form-item label="标签应用类型" prop="labelUseType">
                <dsn-select
                  v-model="tagConfigForm.labelUseType"
                  placeholder="请选择标签应用类型"
                >
                  <el-option label="LOT" value="10"></el-option>
                  <el-option label="容器" value="20"></el-option>
                </dsn-select>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="tagConfigForm.useTemplateType"
                  >使用命令行打印</el-checkbox
                >
              </el-form-item>
            </el-form>
            <div class="designContent">
              <div class="left">
                <div>
                  <dsn-button size="small" type="primary">
                    标签图像预览
                  </dsn-button>
                </div>
                <div class="image">
                  <div class="block">
                    <el-image :src="tagConfigForm.previewImage">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>
                  <dsn-button size="small" type="primary">打印命令</dsn-button>
                </div>
                <div class="image">
                  <!-- <dsn-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="tagConfigForm.labelCommand"
                    :rows="8"
                    show-word-limit
                  >
                  </dsn-input> -->
                </div>
              </div>
            </div>
            <div class="designBottom">
              <dsn-button size="small" type="primary" @click="toTagOpe">
                编辑
              </dsn-button>
              获取其他标签模板：
              <!-- <dsn-input
                class="getTemplate"
                v-model.trim="getTemplate"
               
                @keyup.enter.native='enter'
                placeholder="请输入标签模板"
              ></dsn-input> -->
              <dsn-select
                @change="handleTagIdChange"
                placeholder="请输入标签模板"
                v-model.trim="getTemplate"
              >
                <el-option
                  v-for="item in tagSelectList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                  <div class="suggest">
                    <div class="suggest-left">
                      {{ item.label }}
                    </div>
                    <div class="suggest-right">
                      {{ item.labelDes }}
                    </div>
                  </div>
                </el-option>
              </dsn-select>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关系管理" class="relationManage">
            <div class="container">
              <div class="left">
                <dsn-input
                  @intpu="querySearchAsync"
                  placeholder="请输入关系名称"
                  :style="'width: 200px'"
                  @input="handleLeftQueryChange"
                  v-model="v"
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.linkValue }}</div>
                  </template>
                </dsn-input>
                <dsn-select v-model="s1" @change="handleLeftQueryChange">
                  <el-option label="物料" value="20"></el-option>
                  <el-option label="物料组" value="10"></el-option>
                </dsn-select>
                <dsn-table
                  @selection-change="handleLeftSelect"
                  :data="list"
                  style="width: 100%"
                  border
                  height="540px"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="linkValue" label="关系名称">
                  </el-table-column>
                  <el-table-column prop="linkType" label="关系类型">
                  </el-table-column>
                  <el-table-column prop="address" label="描述">
                  </el-table-column>
                </dsn-table>
              </div>
              <div class="ope">
                <dsn-button
                  type="primary"
                  icon="el-icon-arrow-left"
                  @click="toLeft"
                ></dsn-button>
                <dsn-button
                  type="primary"
                  icon="el-icon-arrow-right"
                  @click="toRight"
                ></dsn-button>
              </div>
              <div class="right">
                <dsn-input
                  @input="querySearchAsync2"
                  @change="querySearchAsync2"
                  placeholder="请输入关系名称"
                  :style="'width: 200px'"
                  v-model="v2"
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.linkValue }}</div>
                    <!-- <span class="addr">{{ item.address }}</span> -->
                  </template>
                </dsn-input>
                <dsn-select v-model="s2" @change="handleRightQeuryChange">
                  <el-option label="物料" value="20"></el-option>
                  <el-option label="物料组" value="10"></el-option>
                </dsn-select>
                <dsn-table
                  @selection-change="handleRightSelect"
                  :data="list2"
                  style="width: 100%"
                  border
                  height="540px"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="linkValue" label="关系名称">
                  </el-table-column>
                  <el-table-column prop="linkType" label="关系类型">
                  </el-table-column>
                  <el-table-column prop="address" label="描述">
                  </el-table-column>
                </dsn-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 底部的菜单栏 -->
    <DsnFooter>
      <dsn-button @click="testPrint">测试打印</dsn-button>
      <dsn-select v-model="selectDeiveName"  @focus="handleGetPrintDevicesAvailable"> 
        <el-option :label="item" :value="item" v-for="(item, index) in getDeviceList" :key="index"></el-option>
      </dsn-select>
    </DsnFooter>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import DsnFooter from "@/views/layout/dsn-footer";
import {
  listPageUnallocatedLink,
  getListPageLink,
  addTagConfig, //  添加标签
  updateTagConfig,
  getTagConfigList,
  getLabelStorageByLabel
} from "@/api/tag/tag.config.api";
import {getPrintDevicesAvailable} from  "@/api/tag/tag.print.api"
export default {
  components: {
    DsnFooter
  },
  data() {
    return {
      s1: "",
      s2: "10",
      list: [], //左边的table
      text: "",
      v: "", //穿梭框
      v2: "",
      data: [],
      list2: [], // ，右边的table
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      tagConfigForm: {
        //标签描述
        tagDes: "",
        //标签ID
        label: "",
        checked: true,
        labelUseType: "",
        previewImage: "",
        labelCommand: "",
        labelLinkList: [],
       
      },
      rules: {
        labelDes: [
          {
            required: true,
            message: "标签描述不能为空",
            trigger: ["change", "blur"]
          }
        ],
        label: [
          {
            required: true,
            message: "标签ID不能为空",
            trigger: ["change", "blur"]
          }
        ],
        labelUseType: [
          {
            required: true,
            message: "标签应用类型不能为空",
            trigger: ["change", "blur"]
          }
        ]
      },
      //验证基础信息表单ref
      refArrBaseInfo: ["tagConfigFormOne", "tagConfigFormTwo"],
      //验证保养配置表单ref
      refArrUpkeepConfig: ["tagConfigFormOne", "upkeepConfigForm"],
      tableData: [],
      selectionList: [],
      operateType: "",
      saveType: "design",
      isEditResource: false,
      //预警
      alarmList: [],
      fn: null,
      isRequired: false,
      currentRow: {},
      getTemplate: "",
      debounceFn: null,
      debounceFn2: null,
      leftSelectList: [],
      rightSelectList: [],
      labelLinkList: [],
      labelStorageList: [],
      labelCommand: "",
      previewImage: "",
      cloneList: "",
      tagSelectList: [],
      getDeviceList:[] , // 获取可用的打印设备
       selectDeiveName:''
    };
  },
  computed: {
    ...mapGetters(["tagConfigList"])
  },
  created() {
    this.handleSelectTag(); // 获取标签模板的下拉框
    this.operateType = this.$route.query.operateType; // 获取报错的类型 add or edit

    this.init();
    if (this.operateType === "edit") {
      this.isEditResource = true;
      this.getLabelStorageByLabelId(this.tagConfigForm.label);
      this.handleGetListPageLink(
        {
          linkType: "",
          linkValue: this.v,
          label: this.tagConfigForm.label
        },
        1
      );
    }
    this.tagConfigForm = this.tagConfigList; // 从vuex 里面获取tagform
    this.list = this.tagConfigForm.labelLinkList || [];
    this.cloneList = _.cloneDeep(this.list);
  },
  mounted() {},
  methods: {
    ...mapMutations(["TAGCONFIGLIST"]),
    //testPrint  测试打印
    //
    testPrint(){

    },
    // 获取标签模板的下拉框内容
    handleSelectTag(label) {
      getTagConfigList({
        label: label
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.tagSelectList = res.data.data;
        }
      });
    },
    // 根据lable 获取标签的详情
    getTagByLable(label) {
      getTagConfigList({
        label: label
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          const arr = res.data.data;
          if (arr.length != 0) {
            const { labelCommand, previewImage } = arr[0];
            this.tagConfigForm.labelCommand = labelCommand || "";
            this.tagConfigForm.previewImage = previewImage || "";
          }
        }
      });
    },
    // 选择的标签id 改变后请求对应标签id 的内容
    handleTagIdChange(key) {
      this.getTagByLable(key);
    },

    // 获取可用的打印设置
    handleGetPrintDevicesAvailable(){
      getPrintDevicesAvailable().then(data=>{
        const res = data.data;
        if(res.code==200){
          console.log(res.data)
          this.getDeviceList =res.data;
        }
      })
    },
    init() {
      this.debounceFn = _.debounce(() => {
        getListPageLink({
          linkValue: this.v,
          linkType: this.s1
        }).then(data => {
          const res = data.data;
          if (res.code == 200) {
            console.log(res.data);
          }
        });
      });
      this.debounceFn2 = _.debounce(() => {
        listPageUnallocatedLink({
          linkValue: this.v2,
          linkType: this.s2
        }).then(data => {
          const res = data.data;
          if (res.code == 200) {
            // console.log(res.data);
            this.list2 = res.data;
          }
        });
      });

      this.debounceFn2();
    },
    // 左边的数据搜索过滤
    handleLeftQueryChange() {
      let key1 = this.v;
      let key2 = this.s1;
      this.list = this.cloneList.filter(item => {
        console.log(item.linkType, item.linkValue);
        return (
          item.linkValue.indexOf(key1) != -1 &&
          item.linkType.toString().indexOf(key2) != -1
        );
      });
    },
    //右边的搜索条件改变
    handleRightQeuryChange() {
      this.debounceFn2();
    },
    handleChangeRadio(val) {
      this.tagConfigForm.resourceStatus = val;
      console.log(val);
    },
    handleTabClick() {},
    handleReset() {
      this.tagConfigForm={
        // tagDes: "",
        //标签ID
        label: "",
        // checked: true,
        // labelUseType: "",
        // previewImage: "",
        // labelCommand: "",
        // labelLinkList: [],
      }
    },
    //选择设备
    handleCurrentChange(currentRow) {
      this.tagConfigForm = JSON.parse(JSON.stringify(currentRow));
    },
    //验证form表单
    checkFormInfo() {},
    handleSaveBaseInfo() {
      if (this.operateType === "add") {
        this.addResourceHttp();
        return;
      }
      if (this.operateType === "edit") {
        this.updateResourceHttp();
        return;
      }
    },
    addResourceHttp() {},
    updateResourceHttp() {},
    handleBack() {
      this.selectionList = [];
      this.TAGCONFIGLIST(this.selectionList);
      this.$router.push({
        name: "tagConfig"
      });
    },
    handleLocalAdd(formName) {
      formName.forEach(element => {
        if (element === "upkeepConfigForm") {
          this.$refs[element].resetFields();
        }
      });
    },
    handleLocalSave() {
      this.checkFormInfo();
    },
    querySearchAsync(key, cb) {
      this.debounceFn(cb, 1);
      this.debounceFn();
    },
    querySearchAsync2() {
      this.debounceFn2();
    },
    handleSelect(v) {
      this.v = v.linkValue;
      this.handleGetListPageLink(
        {
          linkType: this.s1,
          linkValue: this.v
        },
        1
      );
    },
    handleSelect2(v) {
      this.v2 = v.linkValue;
      this.handleGetListPageLink(
        {
          linkType: this.s2,
          linkValue: this.v2
        },
        2
      );
    },
    handleGetListPageLink(data) {
      getListPageLink(data).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.list = res.data.data;
        }
      });
    },
    //  查询子元素
    findItemInArr(item, arr) {
      return arr.filter(subItem => {
        return (
          item.linkType == subItem.linkType &&
          item.linkValue == subItem.linkValue
        );
      });
    },
    // 选择的数据移动到左边
    toLeft() {
      const arr = this.rightSelectList.filter(item => {
        //  console.log(this.findItemInArr(item,this.list))
        return this.findItemInArr(item, this.list).length == 0;
        // return this.list.includes(item) == false;
      });
      this.list = [...this.list, ...arr];
      this.cloneList = _.cloneDeep(this.list); //  复制最新的一份便于拷贝
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
      this.TAGCONFIGLIST({
        ...this.tagConfigForm,
        labelLinkList: this.cloneList,
        clonelabelLinkList: this.list
      });
      this.$router.push({
        path: "/tag/tagEdit",
        query: {
          isEditResource: this.isEditResource
        }
      });
    },
    validFrom(){
      this.$refs['tagConfigFormOne'].validate((flag)=>{
        if(!flag){
           return
        }
        //验证第二个form
      })
    },
     //  验证tab 里的数据
      validFrom2(){
      this.$refs['tagConfigFormTwo'].validate((flag)=>{
        if(!flag){

           return
        }

        this.handleSave();
        //验证第二个form
      })
    },
    //  新增保存
    handleSave() {
      if (this.isEditResource) {
        this.handleUpdate();
      } else {
        this.handleAdd();
      }
    },
    handleAdd() {
      const data = this.tagConfigForm;
      addTagConfig({
        ...data,
        labelLinkList: this.cloneList // 副本是最新的
      }).then(data => {
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
    // 修改保存
    handleUpdate() {
      const data = this.tagConfigForm;
      updateTagConfig(data).then(data => {
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
    getLabelStorageByLabelId(label) {
      getLabelStorageByLabel({
        label: label
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          if (res.data != "") {
            this.tagConfigForm.labelStorage = JSON.parse(res.data);
          }
          this.TAGCONFIGLIST(this.tagConfigForm);
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    enter(e) {
      this.getLabelStorageByLabelId(e.target.value);
    }
  }
};
</script>

<style lang="scss">
.maintenanceEdit {
  .operate {
    // padding: 10px 5px;
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
          height: 220px;
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
      .dsn-button + .dsn-button {
        margin-left: 0px;
        margin-top: 20px;
      }
    }
  }
}
.suggest {
  display: flex;
  .suggest-left {
    flex: 1;
  }
}
</style>
