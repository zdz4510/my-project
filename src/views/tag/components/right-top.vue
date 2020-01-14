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
            <el-form
              ref="locationForm"
              :model="locationForm"
              label-width="90px"
            >
              <el-switch
                v-if="locationForm.hasOwnProperty('isHide')"
                style="display: block;padding:5px 40px;"
                v-model="locationForm.isHide"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="显示"
                inactive-text="隐藏"
              >
              </el-switch>
              <el-form-item label="文本:" v-if="locationForm.type == 3">
                <el-input v-model="locationForm.value" />
              </el-form-item>
              <el-form-item
                label="字体大小:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-select v-model="locationForm.fontSize" size="mini">
                  <el-option label="12" value="12"> </el-option>
                  <el-option label="24" value="24"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="斜体:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-select v-model="locationForm.italic" size="mini">
                  <el-option label="正常" value="正常"> </el-option>
                  <el-option label="斜体" value="斜体"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="加粗:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-select v-model="locationForm.bold" size="mini">
                  <el-option label="正常" value="正常"> </el-option>
                  <el-option label="加粗" value="加粗"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="居中样式:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-select v-model="locationForm.centerStyle" size="mini">
                  <el-option label="居左对齐" value="居左对齐"> </el-option>
                  <el-option label="居中对齐" value="居中对齐"> </el-option>
                  <el-option label="居右对齐" value="居右对齐"> </el-option>
                  <el-option label="两端对齐" value="两端对齐"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="X:">
                <el-input-number
                  v-model="locationForm.x"
                  size="mini"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="Y:">
                <el-input-number
                  v-model="locationForm.y"
                  size="mini"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="宽:">
                <el-input-number
                  v-model="locationForm.width"
                  size="mini"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="高:">
                <el-input-number
                  v-model="locationForm.height"
                  size="mini"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="半径:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-input v-model="locationForm.r" size="mini"></el-input>
              </el-form-item>
              <el-form-item
                label="背景颜色:"
                v-if="locationForm.type==6||locationForm.type==7"
              >
                <el-color-picker
                  v-model="locationForm.bgColor"
                  size="mini"
                ></el-color-picker>
              </el-form-item>
              <el-form-item
                label="左上角圆角:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-slider v-model="locationForm.radiusUpperLeft"></el-slider>
              </el-form-item>
              <el-form-item
                label="右上角圆角:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-slider v-model="locationForm.radiusUpperRight"></el-slider>
              </el-form-item>
              <el-form-item
                label="左下角圆角:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-slider v-model="locationForm.radiusUnderLeft"></el-slider>
              </el-form-item>
              <el-form-item
                label="右下角圆角:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-slider v-model="locationForm.radiusUnderRight"></el-slider>
              </el-form-item>
              <el-form-item
                label="圆心的X:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-input v-model="locationForm.centreX" size="mini"></el-input>
              </el-form-item>
              <el-form-item
                label="圆心的Y:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-input v-model="locationForm.centreY" size="mini"></el-input>
              </el-form-item>
              <el-form-item
                label="旋转度数:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-input-number
                  v-model="locationForm.spinAngle"
                  @change="handleChange"
                  :min="0"
                  :max="360"
                  size="mini"
                  label="旋转度数"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="线的宽度:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-input
                  v-model="locationForm.lineHeight"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="线的高度:"
                v-if="locationForm.hasOwnProperty('isHide')"
              >
                <el-input
                  v-model="locationForm.lineWidth"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item  v-if="locationForm.type==4" label="线的颜色:">
                <el-color-picker
                  v-model="locationForm.lineColor"
                  size="mini"
                ></el-color-picker>
              </el-form-item>
              <el-form-item
                label="资源路径:"
                v-if="locationForm.type == 1 || locationForm.type == 2 || locationForm.type == 5"
              >
                <el-input v-model="locationForm.url" size="mini"></el-input>
              </el-form-item>
              <el-form-item
                label="图片预览"
                v-if="locationForm.type == 1 || locationForm.type == 2 || locationForm.type == 5"
              >
                <el-image :src="locationForm.url">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="输出" name="export">输出</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
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
