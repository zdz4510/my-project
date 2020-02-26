<template>
  <div class="bottom">
    <div class="component">
      <!-- <draggable
        v-model="tableData"
        :options="{ group: 'people' }"
        @start="start"
        @end="end"
        :move="move"
      > -->
      <!-- <li v-for="(item, index) in tableData" :key="index">
             {{item.value}}
    </li> -->
      <el-tabs v-model="component" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理" name="manage">管理</el-tab-pane>
        <el-tab-pane label="插入" name="insert">
         <div class="tab-content-container">
            <el-row>
            <el-col
              :span="8"
              v-for="(item, index) in tableData"
              :key="item.type"
            >
              <draggable
                v-model="tableData"
                :options="{ group: 'people' }"
                @start="start(index)"
                @end="end"
                :move="move"
              >
                <div :type="item.type" class="grid-content bg-purple">
                  <qr-code v-if="item.type == 1" />
                  <bar-code v-else-if="item.type == 2" />
                  <div v-else-if="item.type == 3">这是文字啊</div>
                  <d-line  style="padding:0px 0" :height="5" v-else-if="item.type == 4" />
                  <d-image v-else-if="item.type == 5" />
                  <d-circular v-else-if="item.type == 6" />
                  <d-rectangle v-else-if="item.type == 7" />
                  <d-triangle-text v-else-if="item.type == 8" />
                </div>
              </draggable>
            </el-col>
          </el-row>
         </div>
        </el-tab-pane>
      </el-tabs>
      <!-- </draggable> -->
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";
import DLine from "./d-line";
import QrCode from "./qr-code";
import BarCode from "./bar-code";
import DImage from "./d-image";
import DCircular from "./circular";
import DRectangle from "./rectangle"
import DTriangleText from './triangle-text'
export default {
  name: "rightBottom",
  components: {
    draggable,
    DLine,
    QrCode,
    BarCode,
    DImage,
    DCircular,
    DRectangle,
    DTriangleText
  },
  data() {
    return {
      component: "manage",
      isDragging: false,
      tableData: [
        {
          name: "数据一",
          value: "1",
          type: 1
        },
        {
          name: "数据二",
          value: "2",
          type: 2
        },
        {
          name: "数据三",
          value: "3",
          type: 3
        },
        {
          name: "数据四",
          value: "4",
          type: 4
        },
        {
          name: "数据五",
          value: "5",
          type: 5
        },
        {
          name: "数据五",
          value: "6",
          type: 6
        },
        {
          name: "数据五",
          value: "7",
          type: 7
        },
        {
          name: "数据五",
          value: "8",
          type: 8
        }
      ],
      cloneList: []
    };
  },
  created() {
    this.cloneList = _.cloneDeep(this.tableData);
  },
  methods: {
    change: function(evt) {
      console.log(evt);
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start: function(evt) {
      console.log(evt);
    },
    end: function(evt) {
      console.log(evt);
      // evt.item //可以知道拖动的本身
      //evt.to    // 可以知道拖动的目标列表
      //evt.from  // 可以知道之前的列表
      //evt.oldIndex  // 可以知道拖动前的位置
      //evt.newIndex  // 可以知道拖动后的位置
      const type = evt.item.attributes.type.nodeValue;
      const offsetX = evt.originalEvent.offsetX;
      const offsetY = evt.originalEvent.offsetY;

      this.tableData = _.cloneDeep(this.cloneList);
      const item = this.getItem(type);
      console.log(offsetX, offsetY);
      if (offsetX > 0 || offsetX > -150) {
        return;
      }
      this.$parent.$emit("addComponent", offsetX, offsetY, item);
    },
    getItem(type) {
      for (let i = 0; i < this.tableData.length; i++) {
        let item = this.tableData[i];

        if (item.type == type) {
          return item;
        }
      }
    },
    move: function(evt, originalEvent) {
      console.log(evt);
      console.log(originalEvent); //鼠标位置
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss">
.bottom {
  position: relative;
  .component {
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    background: white;
    box-sizing: border-box;
    border: 0.5px solid rgb(223, 221, 221);
    .el-tabs {
      height: 100%;
      .el-tabs__content{
        height: calc(100% - 60px);
        overflow: hidden;
        overflow-y: scroll;
      }
      .el-tab-pane {
        .el-row {
          box-sizing: border-box;
          .el-col {
            // background: red;
            height: 80px;
            padding: 5px 5px;
            display: flex;
            align-content: center;
            align-items: center;
            border: 1px solid #eee;
            border-left: none;
            border-top: none;
            justify-content: center;
            &:nth-of-type(1) {
              border-top: 1px solid #eee;
            }
            &:nth-of-type(2) {
              border-top: 1px solid #eee;
            }
            &:nth-of-type(3) {
              border-top: 1px solid #eee;
            }
          }
        }
      }
    }
  }

  .tab-content-container{
    height: calc(100%-60px);
    // overflow: scroll;
  }
}
</style>
