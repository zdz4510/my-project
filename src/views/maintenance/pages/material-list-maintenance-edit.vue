<template>
  <div class="materialListEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">
        返回
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="checkAdd(['baseInfoOne', 'baseInfoTwo'])"
      >
        保存
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleReset(['baseInfoOne', 'baseInfoTwo'])"
      >
        重置
      </el-button>
    </div>
    <div class="showInfo">
      <div class="right">
        <el-form
          :model="baseInfo"
          ref="baseInfoOne"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item label="物料清单" prop="bom">
            <el-input
              v-model.trim="baseInfo.bom"
              placeholder="物料清单"
              :disabled="isEditStation"
            ></el-input>
          </el-form-item>
          <el-form-item label="物料清单描述" prop="bomDes">
            <el-input
              v-model.trim="baseInfo.bomDes"
              placeholder="请输入物料清单描述"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-tabs type="border-card">
          <el-tab-pane class="baseInfo">
            <span slot="label">基础信息</span>
            <el-form
              :model="baseInfo"
              ref="baseInfoTwo"
              label-width="150px"
              :rules="rules"
            >
              <el-form-item label="当前版本" prop="bomRev">
                <el-input 
                  v-model="baseInfo.bomRev"
                />
              </el-form-item>
              <el-form-item label="版本号" prop="currentRev">
                <el-checkbox v-model="baseInfo.currentRev">当前版本</el-checkbox>
              </el-form-item>
              <el-form-item label="状态:" prop="status">
                <el-select
                  v-model="baseInfo.status"
                  filterable
                  placeholder="请选择状态"
                >
                  <el-option label="已启用" :value="true">已启用</el-option>
                  <el-option label="未启用" :value="false">未启用</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物料清单类型:" prop="bomType">
                <el-select
                  v-model="baseInfo.bomType"
                  placeholder="请选择清单类型"
                >
                  <el-option label="主数据" value="MATERIAL">主数据</el-option>
                  <el-option label="工单" value="ORDER">工单</el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane class="materialDetail">
            <span slot="label">物料清单详情</span>
            <el-button size="small" type="primary" @click="handleInsert">
              插入
            </el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="selectionList.length <= 0"
              @click="deleteDialog = true"
            >
              删除
            </el-button>
            <div class="showInfo">
              <el-table
                ref="multipleTable"
                :data="bomMaterialList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" />
                <el-table-column type="sequence" label="装配顺序">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sequence" />
                  </template>
                </el-table-column>
                <el-table-column prop="material" label="组件/版本">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.material" filterable placeholder="请选择">
                      <el-option
                        v-for="item in materialAll"
                        :key="`${item.material}/${item.materialRev}`"
                        :label="`${item.material}/${item.materialRev}`"
                        :value="`${item.material}/${item.materialRev}`">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column  label="组件描述">
                  <template slot-scope="scope">
                    <el-input :value="getMaterialInfo(scope.row.material, 'materialDes')" disabled=""/>
                  </template>
                </el-table-column>
                <el-table-column prop="assemQty" label="装配数量">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.assemQty" />
                  </template>
                </el-table-column>
                <el-table-column  label="组件类型">
                  <template slot-scope="scope">
                    <el-input :value="getMaterialInfo(scope.row.material, 'materialType')" disabled=""/>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
          </el-tab-pane>
          <el-tab-pane class="defineData">
            <span slot="label">自定义数据</span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除{{ selectionList.length }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryMaterialAll, saveBom } from "@/api/maintenance/materialList.api";

import { mapGetters, mapMutations } from "vuex";
// import _ from "lodash";
export default {
  data() {
    return {
      //是否可编辑站位
      isEditStation: false,
      isRequired: false,
      baseInfo: {
        bom: '',
        bomDes: '',
        bomRev: '',
        bomType: '',
        currentRev: true,
        status: '',
      },
      workCertFormRules: this.rules,
      materialAll: [],
      bomMaterialList: [],
      selectionList: [],
      deleteDialog: false,
    };
  },
  computed: {
    ...mapGetters(["materialList"]),
    rules() {
      return {
        bom: [{
          required: true,
          message: "请输入物料清单",
          trigger: "change"
        }],
        bomRev: [{
          required: true,
          message: '请选择当前版本',
          trigger: 'change'
        }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        bomType: [{
          required: true,
          message: '请选择物料清单',
          trigger: 'change'
        }]
      };
    }
  },
  watch: {
    // workCertificateForm: {
    //   handler(newName) {
    //     console.log("watch");
    //     this.isRequired = newName.certType ? true : false;
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  created() {
    this.getMaterialAll();
    this.operateType = this.$route.query.operateType;
    console.log('vuex', this.materialList)
    this.cloneList = JSON.parse(JSON.stringify(this.materialList));
    if (this.operateType === "edit") {
      this.baseInfo = this.cloneList[0] || JSON.parse(localStorage.getItem('materialList'))[0];
      this.bomMaterialList = this.baseInfo.bomMaterialList;
      this.isEditStation = true;
    }
  },
  methods: {
    ...mapMutations(["MATERIALLIST"]),

    // 查询所有物料
    getMaterialAll() {
      queryMaterialAll().then(res => {
        const {
          data: {
            code,
            message,
            data
          }
        } = res;
        if (code === 200) {
          this.materialAll = data;
        } else {
          this.$message({
            message,
            type: "warning"
          });
        }
      })
    },
    
    // 物料清单详情根据版本联动显示描述和类型
    getMaterialInfo(data, type) {     
      const { materialAll } = this;
      if (!data || !materialAll.length) return;
      return (
        materialAll && materialAll.find(item => (
          `${item.material}/${item.materialRev}` === data
        ))[type]
      )
    },

    // 复选框选择
    handleSelectionChange(val) {
      this.selectionList = val;
    },

    // 返回按钮
    handleBack() {
      this.$router.push({ name: "materialList" });
    },

    // 提交前检测
    checkAdd(formName) {
      let count = 0;
      formName.forEach(element => {
        this.$refs[element].validate(valid => {
          if (valid) {
            count++;
          } else {
            return false;
          }
        });
      });
      if (count >= 2) {
        this.handleSave();
        return;
      }
    },
    // 物料清单详情新增
    handleInsert() {
      const params = {
        sequence: this.bomMaterialList.length + 1,
        material: '',
        assemQty: '',
        isCreate: true
      }
      this.bomMaterialList.push(params)
    },

    // 物料清单详情删除记录
    handleDelete() {
      const { selectionList } = this;
      this.bomMaterialList = this.bomMaterialList.filter(item => !selectionList.some(ele => ele.material === item.material && ele.sequence === item.sequence))
      this.deleteDialog = false
    },

    // 保存
    handleSave() {
      const params = {};
      const {
        operateType,
        baseInfo,
        bomMaterialList
      } = this;
      if (operateType === 'add') {
        Object.assign(params, {
          createList: [{
            ...baseInfo,
            bomMaterialList
          }]
        });
      } else {
        Object.assign(params, {
          updateList: [{
            ...baseInfo,
            bomMaterialList
          }]
        });
      }
      saveBom(params).then(res => {
        console.log('res', res)
        const {
          data: {
            code,
            message
          }
        } = res;
        this.$message({
          type: code === 200 ? 'success' : 'warning',
          message: code === 200 ? '保存成功！' : message
        })
      })
    },
    //重置
    handleReset(formName) {
      if (this.operateType === "add") {
        formName.forEach(element => {
          this.$refs[element].resetFields();
        });
        return;
      }
      if (this.operateType === "edit") {
        // const object = this.workCertificateForm;
        // for (const key in object) {
        //   if (object.hasOwnProperty(key)) {
        //     if (key !== "cert") {
        //       object[key] = "";
        //     }
        //   }
        // }
        formName.forEach(element => {
          if (element === "baseInfoTwo") {
            this.$refs[element].resetFields();
          }
        });
        console.log('reset', this.baseInfo)
        this.bomMaterialList = !this.cloneList.length ? JSON.parse(localStorage.getItem('materialList'))[0].bomMaterialList : this.cloneList[0].bomMaterialList
        return;
      }
    }
  }
};
</script>

<style lang="scss">
.materialListEdit {
  padding: 10px 30px;
  .operate {
    padding: 10px 0;
  }
  .showInfo {
    display: flex;
    .left {
      width: 200px;
    }
    .right {
      flex: 1;
      .el-form {
        .el-form-item {
          .el-form-item__content {
            width: 250px;
          }
        }
      }
      .el-tabs {
        .el-form {
          .el-form-item {
            .el-form-item__content {
              width: 250px;
              .el-radio-group {
                .el-radio {
                  margin-right: 12px;
                }
              }
              .resource {
                width: 90%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
