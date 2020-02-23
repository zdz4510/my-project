<template>
  <!-- 文本 -->
  <el-tabs
        class="tabs-wrap"
        v-model="currentTabs"
        type="card"
      >
      <el-tab-pane label="定位" name="location">
        <table>
          <tr>
            <td>X轴:</td>
            <td><input type="text"></td>
          </tr>
          <tr>
            <td>Y轴:</td>
            <td><input type="text"></td>
          </tr>
          <tr>
            <td>长度:</td>
            <td><input type="text"></td>
          </tr>
          <tr>
            <td>宽度:</td>
            <td><input type="text"></td>
          </tr>
          <tr>
            <td>旋转:</td>
            <td><input type="text"></td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="输出" name="export">
        <table class="info-table gridtable" border="1">
            <tr>
              <td>定位</td>
              <td>输出</td>
            </tr>
            <tr>
              <td>文本值:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>变量名称:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>Y轴:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>长度:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>宽度::</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>字体大小:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>颜色:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>颜色:</td>
              <td>
              <el-color-picker  size="mini" v-model="value"></el-color-picker>
              </td>
            </tr>
            <tr>
              <td>文本输出前缀:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>文本输出后缀:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>文本填充位数:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>文本填充值:</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>横向对齐方式:</td>
              <td>
                <el-select size="mini" v-model="value" placeholder="请选择">
                  <el-option label="居上" value="1"></el-option>
                  <el-option label="居中" value="2"></el-option>
                  <el-option label="居下" value="3"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>纵向对齐方式:</td>
              <td>
                <el-select size="mini" v-model="value" placeholder="请选择">
                  <el-option label="居左" value="1"></el-option>
                  <el-option label="居中" value="2"></el-option>
                  <el-option label="居右" value="3"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>粗体:</td>
              <td>
                <el-switch size="mini" v-model="value1"></el-switch>
              </td>
            </tr>
            <tr>
              <td>斜体:</td>
              <td>
                <el-switch size="mini" v-model="value1"></el-switch>
              </td>
            </tr>
            <tr>
              <td>自动换行:</td>
              <td>
                <el-switch size="mini" v-model="value1"></el-switch>
              </td>
            </tr>
          </table>
      </el-tab-pane>
      <el-tab-pane label="资料源" name="infoSource">
        <DInfo></DInfo>
      </el-tab-pane>
    <!-- <el-form
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
    </el-form>-->
  </el-tabs>
</template>

<script>
import DInfo from './d-component-info.vue'
export default {
  name: "",
  props: {
    locationForm: {
      type: Object,
      required: true
    }
  },
  components: {
    DInfo,
  },
  data() {
    return {
      currentTabs: 'location',
      radio1: "",
      value1: true,
      value: ""
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.info-box {
  display: flex;
  flex-direction: row;
  border: 1px solid #eee;
  justify-content: center;
  align-items: center;
  height: 30px;
  &-label {
    width: 100px;
    height: 100%;
    border-right: 1px solid #eee;
    line-height: 30px;
  }
  &-value {
    flex: 1;
    height: 100%;
  }
}

</style>
