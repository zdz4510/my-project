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
            :model="themeForm"
            ref="themeForm"
            :rules="rules"
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
            <el-form-item label="主题描述" prop="label">
              <el-input
                v-model.trim="themeForm.topicDec"
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
              :rules="rules"
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
                <el-input
                  :fetch-suggestions="querySearchAsync"
                  @select="handleSelect"
                  placeholder="请输入关系名称"
                  :style="'width: 200px'"
                  v-model="v"
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.linkValue }}</div>
                  
                  </template>
                </el-input>
                <el-select v-model="s1">
                  <el-option label="物料" value="20"></el-option>
                  <el-option label="物料组" value="10"></el-option>
                </el-select>
                <div class="choice">
                  <div style="width:253px;textAlign:center">1</div>
                  <div style="width:253px;">2</div>
                  <div style="width:253px;">3</div>
                </div>
                <el-table
                  :selection-change="handleLeftSelect"
                  :data="data"
                  style="width: 100%"
                  border
                  height="540px"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="date" label="关系名称">
                  </el-table-column>
                  <el-table-column prop="name" label="关系类型">
                  </el-table-column>
                  <el-table-column prop="address" label="描述">
                  </el-table-column>
                </el-table>
              </div>
              <div class="ope">
                <el-button type="primary" icon="el-icon-arrow-left"></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-arrow-right"
                ></el-button>
              </div>
              <div class="right">
                <el-autocomplete
                  :fetch-suggestions="querySearchAsync2"
                  @select="handleSelect2"
                  placeholder="请输入关系名称"
                  :style="'width: 200px'"
                  v-model="v2"
                >
                 <template slot-scope="{ item }">
                    <div class="name">{{ item.linkValue }}</div>
                    <!-- <span class="addr">{{ item.address }}</span> -->
                  </template>
                </el-autocomplete>
                <el-select v-model="s2">
                  <el-option label="物料" value="20"></el-option>
                  <el-option label="物料组" value="10"></el-option>
                </el-select>
                <el-table
                  :selection-change="handleRightSelect"
                  :data="data"
                  style="width: 100%"
                  border
                  height="540px"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="date" label="关系名称">
                  </el-table-column>
                  <el-table-column prop="name" label="关系类型">
                  </el-table-column>
                  <el-table-column prop="address" label="描述">
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
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import {
  listPageUnallocatedLink,
  getListPageLink,
  addTagConfig, //  添加标签
  updateTagConfig,
} from "@/api/tag/tag.config.api";
export default {
  data() {
    return {
      s1: "10",
      s2: "10",
      list: [],
      text: "",
      v: "", //穿梭框
      v2: "",
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      themeForm: {
        //主题描述
        topicDec: "",
        //主题
        topic: "",
        checked: true
      },
      rules: {
        tagDes: [{ required: true, message: "请输入标签描述" }],
        label: [{ required: false, message: "请输入主题" }]
      },
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
      fn: null,
      isRequired: false,
      currentRow: {},
      getTemplate: "",
      debounceFn: null,
      leftSelectList: [],
      rightSelectList: [],
      labelLinkList: [],
      labelStorageList: [],
      labelCommand:'',
      previewImage:'',
    };
  },
  computed: {
    ...mapGetters(["tagConfigList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.themeForm = this.tagConfigList;
    if (this.operateType === "edit") {
      this.isEditResource = true;
    }

    this.handleGetListPageLink(
       {
          linkType: this.s1,
          linkValue: this.v
        },
        1
    )
  },
  mounted() {
    this.init();
    this.debounceFn = _.debounce((cb, flag) => {
      listPageUnallocatedLink({
        linkValue: flag == 1 ? this.v : this.v2,
        linkType: flag == 1 ? this.s1 : this.s2
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          console.log(res.data);
          cb(res.data);
        }
      });
    });
  },
  methods: {
    ...mapMutations(["TAGCONFIGLIST"]),
    init() {},
    handleChangeRadio(val) {
      this.themeForm.resourceStatus = val;
      console.log(val);
    },
    handleTabClick() {},
    handleReset() {},
    //选择设备
    handleCurrentChange(currentRow) {
      this.themeForm = JSON.parse(JSON.stringify(currentRow));
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
    },
    querySearchAsync(key, cb) {
      this.debounceFn(cb, 1);
    },
    querySearchAsync2(key, cb) {
      this.debounceFn(cb, 2);
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
    handleGetListPageLink(data, falg) {
      getListPageLink(data).then(data => {
        const res = data.data;
        if (res.code == 200) {
          if (falg == 1) {
            this.list = res.data;
          } else {
            this.list2 = res.data;
          }
        }
      });
    },
    // 选择的数据移动到左边
    toLeft() {
      this.list = [...this.list, ...this.rightSelectList];
    },
    //选择到数据移动到右边
    toRight() {
      this.list2 = [...this.list2, ...this.leftSelectList];
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

    //  新增保存
    handleSave() {
      const data = this.themeForm;
      addTagConfig(data).then(data => {
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
      const data = {};
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
    .left>.choice{
        display: flex;
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
