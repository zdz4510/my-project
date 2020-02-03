<template>
  <div class="standingBtnDistributeEdit">
    <div class="operate">
      <el-button size="small" type="primary" @click="handleBack">
        返回
      </el-button>
      <el-button size="small" type="primary" @click="handleSaveButton">
        保存
      </el-button>
      <el-button size="small" type="primary" @click="handleReset">
        重置
      </el-button>
    </div>
    <el-form
      :model="standingBtnDistributeForm"
      ref="standingBtnDistributeForm"
      label-width="100px"
      :inline="true"
      class="standingBtnDistributeForm"
    >
      <el-form-item label="产线:">
        <el-input
          v-model="standingBtnDistributeForm.workCenter"
          disabled
          placeholder="请输入产线"
        ></el-input>
      </el-form-item>
      <el-form-item label="站位:">
        <el-input
          disabled
          v-model="standingBtnDistributeForm.workCenterDes"
          placeholder="请输入站位"
        ></el-input>
      </el-form-item>
      <el-form-item label="产线描述:">
        <el-input
         disabled
          v-model="standingBtnDistributeForm.station"
          placeholder="请输入产线描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="站位描述:">
        <el-input
         disabled
          v-model="standingBtnDistributeForm.stationDes"
          placeholder="请输入站位描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="按钮分配" name="btnDistribute">
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
            <el-table
              @selection-change="handleLeftSelect"
              :data="data"
              style="width: 100%"
              border
              height="540px"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="btn" label="已分配按钮">
              </el-table-column>
              <el-table-column prop="des" label="按钮描述"> </el-table-column>
            </el-table>
          </div>
          <div class="ope">
            <el-button type="primary" icon="el-icon-arrow-left" @click="toLeft"></el-button>
            <el-button type="primary" icon="el-icon-arrow-right" @click="toRight"></el-button>
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
            <el-table
               @selection-change="handleRightSelect"
              :data="data2"
              style="width: 100%"
              border
              height="540px"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="btn" label="已分配按钮">
              </el-table-column>
              <el-table-column prop="des" label="按钮描述"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  listAssignedButton,
  listUnassingButton,
  saveButton
} from "@/api/base/standing.btn.distribute.js";
export default {
  data() {
    return {
      standingBtnDistributeForm: {
        station: "",
        workCenter: "",
        stationDes: "",
        workCenterDes: ""
      },
      activeName: "btnDistribute",
      v: "", //穿梭框
      v2: "",
      data: [],
      data2:[],
      debounceFn: null,
      rightSelectList:[],
      leftSelectList:[]
    };
  },
  computed: {
    ...mapGetters(["standingBtnDistributeEdit"])
  },
  created() {
    console.log(this.standingBtnDistributeEdit);
    this.standingBtnDistributeForm = JSON.parse(
      JSON.stringify(this.standingBtnDistributeEdit)
    );

    this.handleListUnassingButton();
    this.handleListAssignedButton();
  },
  methods: {
    //返回
    handleBack() {
      this.$router.push({ name: "standingButtonDistribute" });
    },
    //重置
    handleReset() {},
    //标签选择
    handleClick(tab, event) {
      console.log(tab, event);
    },
    querySearchAsync(key, cb) {
      this.debounceFn(cb);
    },
    querySearchAsync2(key, cb) {
      this.debounceFn(cb);
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
      findItemInArr(item, arr) {
      return arr.filter(subItem => {
        return (
          item.btn == subItem.btn &&
          item.des == subItem.des
        );
      });
    },
    // 选择的数据移动到左边
    toLeft() {
        const arr = this.rightSelectList.filter(item => {
        //  console.log(this.findItemInArr(item,this.list))
        return this.findItemInArr(item, this.data).length == 0;
        // return this.list.includes(item) == false;
      });
      this.data = [...this.data, ...arr];
    },
    //选择到数据移动到右边
    toRight() {
        const arr = this.rightSelectList.filter(item => {
        //  console.log(this.findItemInArr(item,this.list))
        return this.findItemInArr(item, this.data2).length == 0;
        // return this.list.includes(item) == false;
      });
      this.data2 = [...this.data2, ...arr];
    },
    handleLeftSelect(s) {
      this.leftSelectList = s;
    },
    handleRightSelect(s) {
      this.rightSelectList = s;
    },
    handleListAssignedButton() {
      listAssignedButton({
        station: this.standingBtnDistributeForm.station,
        workCenter: this.standingBtnDistributeForm.workCenter
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
           this.data=res.data.map(item=>{
             const arr = item.split('-');
             return {
               btn:arr[0],
               des:arr[1]
             }
          })
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleListUnassingButton() {
      listUnassingButton({
        station: this.standingBtnDistributeForm.station,
        workCenter: this.standingBtnDistributeForm.workCenter
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
           this.data2=res.data.map(item=>{
             const arr = item.split('-');
             return {
               btn:arr[0],
               des:arr[1]
             }
          })
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleSaveButton() {
      const arr = this.data.map(
        item=>{
          return `${item.btn}-${item.des}`
        }
      )
      saveButton({
        station: this.standingBtnDistributeForm.station,
        workCenter: this.standingBtnDistributeForm.workCenter,
        list:arr
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
            this.$message(
             {type:'success',
              message:"保存成功"
              }
            )
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
.standingBtnDistributeEdit {
  padding: 5px 30px;
  .el-form {
    width: 70%;
    padding: 5px 0;
  }
  .el-tabs {
    .el-tab-pane {
      .container {
        display: flex;
        .left {
          flex: 1;
        }
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
  }
}
</style>
