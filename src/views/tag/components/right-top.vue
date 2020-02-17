<template>
  <!-- <qr-code
            :width="item.width"
            :height="item.height"
            v-if="item.type == 1"
          /> -->
  <!-- <bar-code v-else-if="item.type == 2" />
          <div v-else-if="item.type == 3">这是文字啊</div>
          <d-line v-else-if="item.type == 4" />
          <d-image v-else-if="item.type == 5" />
          <d-circular v-else-if="item.type == 6" />
          <d-rectangle v-else-if="item.type == 7" />
          <d-triangle-text v-else-if="item.type == 8" /> -->

  <div class="right-top-box">
    <div class="objAttr">
      <el-tabs
        v-model="objAttr"
        type="card"
        @tab-click="handleObjAttributeClick"
      >
        <el-tab-pane label="定位" name="location">
          <div class="location-box">
    
            <DTextInfo  :locationForm="locationForm"></DTextInfo>
           
          </div>
        </el-tab-pane>
        <el-tab-pane label="输出" name="export">输出</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import DTextInfo from "@/views/tag/components/info/d-text-info.vue"
export default {
  components:{
    DTextInfo
  },
  props: {
    locationForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      objAttr: "location"
      // locationForm: {
      //   isHide: true,
      //   fontSize: "",
      //   italic: "",
      //   bold: "",
      //   underLine: "",
      //   centerStyle: "",
      //   x: "",
      //   y: "",
      //   width: "",
      //   height: "",
      //   r: "",
      //   bgColor: "#409EFF",
      //   radiusUpperLeft: 0,
      //   radiusUpperRight: 0,
      //   radiusUnderLeft: 0,
      //   radiusUnderRight: 0,
      //   centreX: "",
      //   centreY: "",
      //   url:
      //     "http://img4.imgtn.bdimg.com/it/u=4010037292,3155271616&fm=26&gp=0.jpg",
      //   // pictureView: "",
      //   spinAngle: "",
      //   lineWidth: "",
      //   lineHeight: "",
      //   lineColor: "#409EFF"
      // }
    };
  },
  methods: {
    //对象属性栏tabs
    handleObjAttributeClick(tab, event) {
      console.log(tab, event);
    },
    //旋转度数点击事件
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="scss" scoped>
.right-top-box {
}
.objAttr {
  height: 100%;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  background: white;
  border: 0.5px solid rgb(223, 221, 221);
  .el-tabs {
    height: 100%;
    overflow-y: scroll;
    padding-right: 5px;
    .el-tabs__content {
      height: 100%;
      .el-tab-pane {
        .location-box {
          .el-form {
            .el-form-item {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang='scss'>
table.gridtable {
font-family: verdana,arial,sans-serif;
font-size:11px;
color:#333333;
border-width: 1px;
border-color: #666666;
border-collapse: collapse;
width: 100%;
}
table.gridtable th {
border-width: 1px;
padding: 8px;
border-style: solid;
border-color: #666666;
background-color: #dedede;
}
table.gridtable td {
border-width: 1px;
padding: 8px;
border-style: solid;
border-color: #666666;
background-color: #ffffff;
   &>input{
     width: 100%;
     height: 100%;
     display: block;
     outline: none;
    
   }
}
</style>
