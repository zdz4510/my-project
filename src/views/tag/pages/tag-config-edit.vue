<template>
  <div class="maintenanceEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">
        返回
      </el-button>
      <el-button size="small" type="primary">
        保存
      </el-button>
      <el-button size="small" type="primary" @click="handleReset">
        重置
      </el-button>
    </div>
    <div class="showInfo">
      <div class="right">
        <div class="tag">
          <el-form
            :model="tagConfigForm"
            ref="tagConfigFormOne"
            :rules="rules"
            label-width="100px"
            class="demo-tagConfigForm"
          >
            <el-form-item label="标签ID" prop="tagID">
              <el-input
                v-model.trim="tagConfigForm.tagID"
                placeholder="请输入标签ID"
                :disabled="isEditResource"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

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
              <el-form-item label="标签描述:">
                <el-input
                  v-model.trim="tagConfigForm.tagDes"
                  placeholder="请输入标签描述"
                ></el-input>
              </el-form-item>
              <el-form-item label="标签应用类型">
                <el-select
                  v-model="tagConfigForm.tagDes"
                  placeholder="请选择标签应用类型"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="designContent">
              <div class="left">
                <div>
                  <el-button size="small" type="primary">
                    标签图像预览
                  </el-button>
                </div>
                <div class="image">放图片</div>
              </div>
              <div class="right">
                <div>
                  <el-button size="small" type="primary">打印命令</el-button>
                </div>
                <div class="image">放图片</div>
              </div>
            </div>
            <div class="designBottom">
              <el-button size="small" type="primary">
                编辑
              </el-button>
              获取其他标签模板：
              <el-input
                class="getTemplate"
                v-model.trim="getTemplate"
                placeholder="请输入标签模板"
              ></el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关系管理" class="relationManage">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入城市拼音"
              v-model="value"
              :data="data"
            >
            </el-transfer>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import _ from "lodash";

export default {
  data() {
    return {
      list: [],
      //穿梭框
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      tagConfigForm: {
        //标签描述
        tagDes: "",
        //标签ID
        tagID: ""
      },
      rules: {
        tagDes: [{ required: true, message: "请输入标签描述" }],
        tagID: [{ required: false, message: "请输入标签ID" }]
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
      getTemplate: ""
    };
  },
  computed: {
    ...mapGetters(["tagConfigList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.cloneList = JSON.parse(JSON.stringify(this.tagConfigList));
    console.log(this.cloneList);
    this.tagConfigForm = this.cloneList[0];
    if (this.operateType === "edit") {
      this.isEditResource = true;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["TAGCONFIGLIST"]),
    init() {},
    handleChangeRadio(val) {
      this.tagConfigForm.resourceStatus = val;
      console.log(val);
    },
    handleTabClick() {},
    handleReset() {},
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
      console.log(11);
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
}
</style>
