<template>
  <div class="maintenanceEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">
        返回
      </el-button>
      <el-button size="small" type="primary" @click="handleSave">
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
            <el-form-item label="标签ID" prop="label">
              <el-input
                v-model.trim="tagConfigForm.label"
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
                  v-model.trim="tagConfigForm.labelDes"
                  placeholder="请输入标签描述"
                ></el-input>
              </el-form-item>
              <el-form-item label="标签应用类型">
                <el-select
                  v-model="tagConfigForm.labelUseType"
                  placeholder="请选择标签应用类型"
                >
                  <el-option label="LOT" value="10"></el-option>
                  <el-option label="容器" value="20"></el-option>
                </el-select>
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
                  <el-button size="small" type="primary">
                    标签图像预览
                  </el-button>
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
                  <el-button size="small" type="primary">打印命令</el-button>
                </div>
                <div class="image">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="tagConfigForm.labelCommand"
                    :rows="5"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
            </div>
            <div class="designBottom">
              <el-button size="small" type="primary" @click="toTagOpe">
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
            <div class="container">
              <div class="left">
                <el-input
                  @intpu="querySearchAsync"
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
                <el-table
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
                </el-table>
              </div>
              <div class="ope">
                <el-button
                  type="primary"
                  icon="el-icon-arrow-left"
                  @click="toLeft"
                ></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-arrow-right"
                  @click="toRight"
                ></el-button>
              </div>
              <div class="right">
                <el-input
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
                </el-input>
                <el-select v-model="s2">
                  <el-option label="物料" value="20"></el-option>
                  <el-option label="物料组" value="10"></el-option>
                </el-select>
                <el-table
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
  updateTagConfig
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
      list2: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      tagConfigForm: {
        //标签描述
        tagDes: "",
        //标签ID
        label: "",
        checked: true
      },
      rules: {
        tagDes: [{ required: true, message: "请输入标签描述" }],
        label: [{ required: false, message: "请输入标签ID" }]
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
      cloneList: ""
    };
  },
  computed: {
    ...mapGetters(["tagConfigList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.tagConfigForm = this.tagConfigList;
    this.init();
    if (this.operateType === "edit") {
      this.isEditResource = true;
      this.list = this.tagConfigForm.labelLinkList || [];
      this.cloneList = _.cloneDeep(this.list);
      this.handleGetListPageLink(
        {
          linkType: "",
          linkValue: this.v,
          label: this.tagConfigForm.label
        },
        1
      );
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(["TAGCONFIGLIST"]),
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

    //  新增保存
    handleSave() {
      if(this.isEditResource){
        this.handleUpdate()
      } else{
        this.handleAdd();
      }
    },
    handleAdd(){
      const data = this.tagConfigForm;
      addTagConfig({
        ...data,
        labelLinkList: this.list
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
