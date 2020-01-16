<template>
  <div class="box">
    <div class="top" >
      <top   @save="save" />
    </div>
    <div class="bottom">
      <div class="left"></div>
      <div class="content" id="content">
        <span class="x"  :style="`top:${h}px;`"></span>
        <span class="y" :style="`left:${w}px`"></span>
        <!--  @activated="onActivated(item)"
          @deactivated="onDeactivated(item)" -->
        <vue-draggable-resizable
          :snap="true"
          v-for="item in list"
          :key="item.id"
          :w="item.width"
          :h="item.height"
          :min-width="20"
          :min-height="1"
          :debug="false"
          @dragging="onDrag"
          @resizing="onResize"
          :z-index="item.zindex"
          :parent="true"
          :grid="[10, 10]"
          :isConflictCheck="true"
          :snapTolerance="1"
          @refLineParams="getRefLineParams"
          :x="item.x"
          :y="item.y"
          @click.native="handleClick(item)"
          @dblclick.native="dbClick(item)"
        >
          <qr-code
            :width="item.width"
            :height="item.height"
            :url="item.url"
            v-if="item.type == 1"
          />
          <bar-code 
          :url="item.url"
          v-else-if="item.type == 2"   :width="item.width" :height="item.height"  />
          <d-text v-else-if="item.type == 3"
           :value="item.value"
           ></d-text>
          <d-line v-else-if="item.type == 4"  :width="item.width" :height="item.height"  :lineColor="item.lineColor"/>
          <d-image  :url="item.url" v-else-if="item.type == 5"  :width="item.width" :height="item.height"  />
          <d-circular v-else-if="item.type == 6"  :width="item.width" :bgColor="item.bgColor" :height="item.height"   />
          <d-rectangle v-else-if="item.type == 7" :width="item.width" :bgColor="item.bgColor" :height="item.height" />
          <d-triangle-text v-else-if="item.type == 8" />
        </vue-draggable-resizable>
        <!-- <vue-draggable-resizable
          :w="200"
          :h="200"
          @refLineParams="getRefLineParams"
          :is-conflict-check="true"
          :snap="true"
          :parent="true"
        >
          <p>你可以拖着我，按照自己的意愿调整大小。</p>
        </vue-draggable-resizable> -->
      </div>
      <div class="right">
        <right :current="current"  @addComponent="handleAdd" />
      </div>
    </div>
  </div>
</template>

<script>
// import { Drag, Drop } from "vue-drag-drop";
import Top from "../components/top";
import Right from "../components/right";
import QrCode from "../components/qr-code"; //二维码
import BarCode from "../components/bar-code"; // 条形码
import DText from "../components/text"; // 条形码
import DLine from "../components/d-line";
import DImage from "../components/d-image";
import DCircular from "../components/circular";
import DRectangle from "../components/rectangle";
import DTriangleText from "../components/triangle-text";
import {  mapMutations,mapGetters} from "vuex";
export default {
  components: {
    Right,
    Top,
    QrCode,
    BarCode,
    DLine,
    DImage,
    DRectangle,
    DCircular,
    DTriangleText,
    DText
  },
  computed:{
    ...mapGetters([
      'tagConfigList'
    ])
  },
  data() {
    return {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      active: false,
      vLine: [],
      hLine: [],
      list: [],
      w:100,
      h:100,
      current:{

      }
    };
  },
  mounted() {
    document.getElementsByClassName("pageContent")[0].style.padding = "0px";

    window.onresize = this.computedWindow();
    this.computedWindow();
    this.init()
  },


  beforeDestroy() {
    document.getElementsByClassName("pageContent")[0].style.padding = "30px";
    window.onresize = null;
  },
  methods: {
    ...mapMutations([
      'TAGCONFIGLIST'
    ]),
    save(){
      const str =JSON.stringify(
          {
          width:this.w,
          height:this.h,
          list:this.list
          }
        );
        this.TAGCONFIGLIST(
        {
        ...this.tagConfigList,
        labelStorageList:str,
        previewImage:''
        }
        )
       this.$router.go(-1);
    },
    computedWindow() {
      const content = document.getElementById("content");
      this.width = content.offsetWidth;
      this.height = content.offsetHeight;
    },
    onActivated(item) {
      item.active = true;
    },
    onDeactivated(item) {
      console.log(item);
      item.active = false;
    },
    onResize: function(x,y,width,height) {
      //   this.x = x;
      //   this.y = y;
      //   this.width = width;
      //   this.height = height;
      this.current ={
        ...this.current,
        x:x,
        y:y,
        width:width,
        height:height
      }
      this.list.splice(this.current.id,1,this.current)
    },
    onDrag: function(x,y) {
        this.current ={
        ...this.current,
        x:x,
        y:y,
      }
      this.list.splice(this.current.id,1,this.current)
    },
    handle() {
      this.addComponentToCanvas(-200, -100);
    },
    getRefLineParams(params) {
      console.log("aa");
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
    },
    findAcitve() {
      const item = this.list.find(item => item.active == true);
      return item;
    },
    //给画布里面添加一个
    addComponentToCanvas(offsetX, offsetY, item) {
      let x = this.width + offsetX;
      let y = this.height * 0.5 + offsetY;
      const index = 1;
      if (x >= this.width) {
        x = this.width - 100 + (index % 3) * 60;
      }
      if (y > this.height) {
        y = this.height;
      }
      let url =''
      const len = this.list.length;
      const img ='https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2229864841,4232235061&fm=26&gp=0.jpg';
      const code = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578720021782&di=b4a4daef1a03ef6315141752ffe6345f&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20161219%2Fa995d33bd30542529920537ac5df1afa_th.jpg";
      const brCode ='https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=851763487,1733020085&fm=111&gp=0.jpg';
     if(item.type==1){
        url =code
      }else if(item.type==2){
         url= brCode;
      }else{
        url =img;
      }
      const component = {
        id:len,
        x: x,
        y: y,
        width: 100,
        height: item.type==4 ? 1:100,
        type: item.type,
        active: false,
        zindex: 1,
        bgColor:"#eeeeee",
        lineColor:"#000000",
        url:url,
        value:'这是文本啊',
      };
      this.list.push(component);
      this.current = component;
    },
    // 计算圆形的x,y 还有半径
    computedCircle() {},
    handleAdd(x, y, item) {
      this.addComponentToCanvas(x, y, item);
    },
    handleClick(item){
      console.log("click")
      this.current =item;
      console.log(this.current);
    },
    dbClick(){
      console.log("db")
    },
    init(){
       document.οnkeydοwn=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode==46){ // 按 Esc 
                //要做的事情
                console.log('delete')
              }
        }; 
    }
  }
};
</script>

<style lang="scss">
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  .top {
    height: 50px;
    // background: red;
  }
  .bottom {
    flex: 1;
    display: flex;
    .left {
      width: 50px;
      height: 100%;
      background: green;
      overflow: hidden;
    }
    .right {
      width: 270px;
      height: 100%;
      overflow: hidden;
      background: #eee;
    }
    .content {
      .x{
        position: absolute;
        z-index: 1;
        left: 0px;
        top: 100px;
        width: 100%;
        height: 0;
        border-bottom: 1px dashed red;
      }
       .y{
        position: absolute;
        z-index: 1;
        left: 200px;
        top: 0;
        height: 100%;
        width: 0;
        border-right: 1px dashed red;
      }
      position: relative;
      flex: 1;
      height: 100%;
      //  background: yellowgreen;
      background-image: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.15) 10%,
          rgba(0, 0, 0, 0) 10%
        ),
        linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
      background-size: 10px 10px;
      background-color: rgb(251, 251, 251);
    }
  }
}
</style>
