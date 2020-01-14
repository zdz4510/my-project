<template>
  <div v-if="easyFlowVisible" class="pannel">
    <div class="panel-container" style="height:100%">
      <!--左侧可以拖动的菜单-->
      <el-col :span="6" ref="nodeMenu">
        <div class="leftMenuBox">
          <h2 class="title" @click="dataInfo">
            {{ rightData.styleCode }} 款式工艺清单
          </h2>
          <node-menu
            :menuList="menuList"
            @addNode="addNode"
            @addAllNode="addAllNode"
          ></node-menu>
        </div>
      </el-col>
      <el-col :span="21" style="height:100%">
        <el-row>
          <!--顶部工具菜单-->
          <!-- <el-col :span="24">
            <div style="margin-bottom: 5px; margin-left: 10px">
              <el-link type="primary">{{ data.name }}</el-link>
              <dsn-button  type="info" icon="el-icon-document" @click="dataInfo"
                >流程信息</dsn-button 
              >
              <dsn-button 
                type="primary"
                @click="dataReloadA"
                icon="el-icon-refresh"
                >切换流程A</dsn-button 
              >
              <dsn-button 
                type="success"
                @click="dataReloadB"
                icon="el-icon-refresh"
                >切换流程B</dsn-button 
              >
              <dsn-button 
                type="warning"
                @click="dataReloadC"
                icon="el-icon-refresh"
                >切换流程C</dsn-button 
              >
              <dsn-button 
                type="warning"
                @click="changeLabel"
                icon="el-icon-edit-outline"
                >设置线</dsn-button 
              >
            </div>
          </el-col> -->
        </el-row>
        <el-row style="height:100%">
          <!--画布-->
          <el-col :span="24" style="height:100%" class="pannerBox">
            <div id="flowContainer" class="container">
              <template v-for="node in rightData.nodeList">
                <flow-node
                  v-show="node.show"
                  :id="node.id"
                  :key="node.id"
                  :node="node"
                  @deleteNode="deleteNode"
                  @changeNodeSite="changeNodeSite"
                  @nodeRightMenu="nodeRightMenu"
                  @editNode="editNode"
                >
                </flow-node>
              </template>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <!-- 流程数据详情 -->
    <flow-info
      v-if="flowInfoVisible"
      ref="flowInfo"
      :data="rightData"
    ></flow-info>
    <!-- 流程数据表单 -->
    <flow-node-form v-if="nodeFormVisible" ref="nodeForm"></flow-node-form>
  </div>
</template>

<script>
import { jsPlumb } from "jsplumb";
import flowNode from "./node";
import nodeMenu from "./node-menu";
import FlowInfo from "./info";
import FlowNodeForm from "./node-form";
import lodash from "lodash";
import { getDataA } from "./data_A";
import { getDataB } from "./data_B";
import { getDataC } from "./data_C";
import { getAllOperation } from "@/api/material/route.maintenance.api";
import { getCraftProcess } from "@/api/process-flow/process.flow.api/";
import  "./handleData.js";
export default {
  name: "pannel",
  props: {
    search: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuList: [],
      // jsPlumb 实例
      jsPlumb: null,
      easyFlowVisible: true,
      // 控制流程数据显示与隐藏
      flowInfoVisible: false,
      // 控制表单显示与隐藏
      nodeFormVisible: false,
      // 默认设置参数
      jsplumbSetting: {
        // 动态锚点、位置自适应
        Anchors: [
          "Top",
          "TopCenter",
          "TopRight",
          "TopLeft",
          "Right",
          "RightMiddle",
          "Bottom",
          "BottomCenter",
          "BottomRight",
          "BottomLeft",
          "Left",
          "LeftMiddle"
        ],
        Container: "flowContainer",
        // 连线的样式 StateMachine、Flowchart
        Connector: "Flowchart",
        // 鼠标不能拖动删除线
        ConnectionsDetachable: false,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        // 连线的端点
        // Endpoint: ["Dot", {radius: 5}],
        Endpoint: ["Rectangle", { height: 10, width: 10 }],
        // 线端点的样式
        EndpointStyle: { fill: "rgba(255,255,255,0)", outlineWidth: 1 },
        LogEnabled: true, //是否打开jsPlumb的内部日志记录
        // 绘制线
        PaintStyle: { stroke: "black", strokeWidth: 3 },
        // 绘制箭头
        Overlays: [["Arrow", { width: 12, length: 12, location: 1 }]],
        RenderMode: "svg"
      },
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: "Continuous"
      },
      jsplumbSourceOptions: {
        /*"span"表示标签，".className"表示类，"#id"表示元素id*/
        filter: ".flow-node-drag",
        filterExclude: false,
        anchor: "Continuous",
        allowLoopback: false
      },
      jsplumbTargetOptions: {
        /*"span"表示标签，".className"表示类，"#id"表示元素id*/
        filter: ".flow-node-drag",
        filterExclude: false,
        anchor: "Continuous",
        allowLoopback: false
      },
      // 是否加载完毕
      loadEasyFlowFinish: false,
      // 数据
      //  data: {}
      rightData: {
        description:'',
        nodeList: [],
        lineList: []
      }
    };
  },
  components: {
    flowNode,
    nodeMenu,
    FlowInfo,
    FlowNodeForm
  },
  created() {
    this.jsPlumb = jsPlumb.getInstance();
    this.$nextTick(() => {
      this.jsPlumbInit();
    });
  },
  mounted() {},
  methods: {
    init() {
      if (!this.jsPlumb) {
        this.jsPlumb = jsPlumb.getInstance();
      }

      this.getLeftData();
      // this.getRightData();
    },

    handleLeftData(isEndDrag, isStartDrag) {
      this.menuList = this.menuList.map(item => {
        let newitem = {
          id: item.operation,  // id
          name: item.operation, //  名字
          type: item.operation, // 类型
          operationDes: item.operationDes,
          reportingStep:'', // 报工步骤
          resourceGroup: item.resourceGroup,
          routerComponentType:'O',  // 工艺路线类型
          ico: "el-icon-user-solid",
          customizedData:[],
          operation:'', // 工序id
          isLastReportingStep:false, //最后包工步骤checkbox
          description:'', //  描述
          stepId:'步骤', //
          returnOperation: "", // 返回工序
          returnStepId: "",  // 返回步骤   
        };
        return {
          ...newitem
        };
      });
      const craft = {
        id: "craft",
        type: "craft",
        name: "工序",
        group: "craft",
        ico: "el-icon-user-solid",
        children: this.menuList
      };
      const startAndEnd = {
        id: "group",
        type: "group",
        name: "关键",
        ico: "el-icon-user-solid",
        children: [
          // {
          //   id: "0",
          //   type: "0",
          //   name: "结束",
          //   componentCode: "0",
          //   craftNum: "0",
          //   ico: "el-icon-odometer",
          //   hide: isEndDrag
          // },
          {
            id: "-1",
            type: "-1",
            name: "开始",
            componentCode: "-1",
            craftNum: "-1",
            ico: "el-icon-odometer",
            hide: isStartDrag
          }
        ]
      };
      const handle = {
        id: "handle",
        type: "handle",
        name: "处置",
        ico: "el-icon-user-solid",
        children: [
        
          {
            id: "A",
            type: "A",
            name: "返回置任一步骤",
            ico: "el-icon-odometer",
            routerComponentType:'R',
          },
          {
            id: "N",
            type: "N",
            name: "返回置上一步骤",
            ico: "el-icon-odometer",
            routerComponentType:'R',
          },
          {
            id: "O",
            type: "O",
            name: "返回置原始步骤",
            routerComponentType:'R',
            ico: "el-icon-odometer",
          },
          {
            id: "P",
            type: "P",
            name: "返回置下一步骤",
            ico: "el-icon-odometer",
            routerComponentType:'R',
          }
        ]
      };

      this.menuList = [startAndEnd, craft, handle];
    },
    getLeftData() {
      getAllOperation({}).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.menuList = res.data;
          this.handleLeftData();
        }
      });
    },
    getRightData() {
      getCraftProcess({
        styleCode: this.search
      }).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.rightData = res.data;
          // if(this.rightData.nodeList.length==0){
          //    this.rightData.nodeList  =[ {
          //     id: "-1",
          //     type: "-1",
          //     name: "开始",
          //     ico: "el-icon-time",
          //     top:'50px',
          //     left:'300px',
          //     show:true
          // }]
          // }

          this.dataReload(lodash.cloneDeep(this.rightData));
        }
      });
    },
    reload() {
      this.jsPlumb = jsPlumb.getInstance();
      this.$nextTick(() => {
        // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
        this.dataReload(this.rightData);
      });
    },
    // 返回唯一标识
    getUUID() {
      return Math.random()
        .toString(36)
        .substr(3, 10);
    },
    jsPlumbInit() {
      //   const _this = this;
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting);
        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true);
        // 初始化节点
        this.loadEasyFlow();
        // 单点击了连接线,
        this.jsPlumb.bind("click", conn => {
          this.$confirm("确定删除所点击的线吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.jsPlumb.deleteConnection(conn);
            })
            .catch(() => {});
        });
        // 连线
        this.jsPlumb.bind("connection", evt => {
          let from = evt.source.id;
          let to = evt.target.id;
          if (this.loadEasyFlowFinish) {
            this.rightData.lineList.push({ from: from, to: to });
          }
        });

        // 删除连线回调
        this.jsPlumb.bind("connectionDetached", evt => {
          this.deleteLine(evt.sourceId, evt.targetId);
        });

        // 改变线的连接节点
        this.jsPlumb.bind("connectionMoved", evt => {
          this.changeLine(evt.originalSourceId, evt.originalTargetId);
        });

        // 单击endpoint
        // jsPlumb.bind("endpointClick", function (evt) {
        //   console.log('endpointClick', evt)
        // })
        //
        // // 双击endpoint
        // jsPlumb.bind("endpointDblClick", function (evt) {
        //   console.log('endpointDblClick', evt)
        // })

        // contextmenu
        this.jsPlumb.bind("contextmenu", evt => {
          console.log("contextmenu", evt);
        });

        // 连线
        this.jsPlumb.bind("beforeDrop", evt => {
          let from = evt.sourceId;
          let to = evt.targetId;
          if (from === to) {
            this.$message.error("不能连接自己");
            return false;
          }
          if (this.hasLine(from, to)) {
            this.$message.error("不能重复连线");
            return false;
          }
          if (this.hashOppositeLine(from, to)) {
            this.$message.error("不能回环");
            return false;
          }
          this.$message({
            message: "连线成功",
            type: "success"
          });
          return true;
        });

        // beforeDetach
        this.jsPlumb.bind("beforeDetach", evt => {
          console.log("beforeDetach", evt);
        });
      });
    },
    // 加载流程图
    loadEasyFlow() {
      // 初始化节点
      for (let i = 0; i < this.rightData.nodeList.length; i++) {
        let node = this.rightData.nodeList[i];
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions);
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions);

        this.jsPlumb.draggable(node.id, {
          containment: "parent"
        });
      }

      // 初始化连线
      for (var i = 0; i < this.rightData.lineList.length; i++) {
        let line = this.rightData.lineList[i];
        this.jsPlumb.connect(
          {
            source: line.from,
            target: line.to
          },
          this.jsplumbConnectOptions
        );
      }
      this.$nextTick(function() {
        this.loadEasyFlowFinish = true;
      });
    },
    // 删除线
    deleteLine(from, to) {
      this.rightData.lineList = this.rightData.lineList.filter(function(line) {
        if (line.from == from && line.to == to) {
          return false;
        }
        return true;
      });
    },
    // 改变连线
    changeLine(oldFrom, oldTo) {
      this.deleteLine(oldFrom, oldTo);
    },
    // 改变节点的位置
    changeNodeSite(data) {
      // console.log("change");
      for (var i = 0; i < this.rightData.nodeList.length; i++) {
        let node = this.rightData.nodeList[i];
        if (node.id === data.nodeId) {
          node.left = data.left;
          node.top = data.top;
        }
      }
    },
    /**
     * 拖拽结束后添加新的节点
     * @param evt
     * @param nodeMenu 被添加的节点对象
     * @param mousePosition 鼠标拖拽结束的坐标
     */
    addNode(evt, nodeMenu, mousePosition) {
      console.log(nodeMenu);
      let width = this.$refs.nodeMenu.$el.clientWidth;

      let nodeId = nodeMenu.id;
      let left = mousePosition.left;
      let top = mousePosition.top;
      if (left < 0) {
        left = evt.originalEvent.layerX - width;
      }
      if (top < 0) {
        top = evt.originalEvent.clientY - 50;
      }

      let node = {
        ...nodeMenu,
        left: left + "px",
        top: top + "px",
        ico: nodeMenu.ico,
        show: true
      };
      /**
       * 这里可以进行业务判断、是否能够添加该节点
       */

      this.rightData.nodeList.push(node);
      this.deleteItem(node.id);
      this.$nextTick(function() {
        this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions);
        this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions);
        this.jsPlumb.draggable(nodeId, {
          containment: "parent"
        });
      });
    },
    addAllNode(evt, mousePosition, index) {
      //   evt, mousePosition,this.index
      let width = this.$refs.nodeMenu.$el.clientWidth;
      let left = mousePosition.left;
      let top = mousePosition.top;
      if (left < 0) {
        left = evt.originalEvent.layerX - width;
      }
      if (top < 0) {
        top = evt.originalEvent.clientY - 50;
      }
      this.addProcessFlow(this.menuList[index].children, left, top);
    },
    /**
     * 批量添加工艺
     */
    addProcessFlow(array, left, top) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const nodeId = element.id;
        let node = {
          id: nodeId,
          name: element.name,
          componentCode: element.componentCode,
          sequence: element.sequence,
          craftNum: element.craftNum,
          type: element.type,
          left: left + "px",
          top: top + "px",
          ico: "el-icon-user-solid",
          show: true
        };
        this.rightData.nodeList.push(node);
        top = top + 70;
        this.deleteItem(node.id);
        if (index >= 1) {
          this.rightData.lineList.push({
            from: array[index - 1].id,
            to: array[index].id
          });
        }
      }
      this.dataReload(lodash.cloneDeep(this.rightData));
    },
    // 删除左边菜单的数据  伪删除
    deleteItem(id) {
      for (let i = 0; i < this.menuList.length; i++) {
        let item = this.menuList[i];
        if (item.children) {
          let array = item.children;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.id == id) {
              //array.splice(index,1);
              element.hide = true;
            }
          }
        }
      }

      this.menuList = JSON.parse(JSON.stringify(this.menuList));
    },

    //选择数据
    fileterMenuList() {
      for (let i = 0; i < this.menuList.length; i++) {
        let item = this.menuList[i];
        if (item.children) {
          let array = item.children;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.hide) {
              array.splice(index, 1);
            }
          }
        }
      }
    },
    showItemByd(id) {
      for (let i = 0; i < this.menuList.length; i++) {
        let item = this.menuList[i];
        if (item.children) {
          let array = item.children;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.hide && element.id == id) {
              element.hide = false;
            }
          }
        }
      }
      this.menuList = JSON.parse(JSON.stringify(this.menuList));
    },
    /**
     * 删除节点
     * @param nodeId 被删除节点的ID
     */
    deleteNode(nodeId) {
      this.$confirm("确定要删除节点" + nodeId + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          /**
           * 这里需要进行业务判断，是否可以删除
           */
          this.rightData.nodeList = this.rightData.nodeList.filter(function(
            node
          ) {
            if (node.id === nodeId) {
              // 伪删除，将节点隐藏，否则会导致位置错位
              node.show = false;
            }
            //处理左边的数据
            return node.id != nodeId;
          });
          this.showItemByd(nodeId);
          this.$nextTick(function() {
            this.jsPlumb.removeAllEndpoints(nodeId);
          });
        })
        .catch(() => {});
      return true;
    },
    /**
     * 编辑节点
     * @param nodeId 被点击编辑的节点的ID
     */
    editNode(nodeId) {
      this.nodeFormVisible = true;
      this.$nextTick(function() {
        this.$refs.nodeForm.init(this.rightData, nodeId);
      });
    },
    // 是否具有该线
    hasLine(from, to) {
      for (var i = 0; i < this.rightData.lineList.length; i++) {
        var line = this.rightData.lineList[i];
        if (line.from === from && line.to === to) {
          return true;
        }
      }
      return false;
    },
    // 是否含有相反的线
    hashOppositeLine(from, to) {
      return this.hasLine(to, from);
    },
    nodeRightMenu(nodeId, evt) {
      this.menu.show = true;
      this.menu.curNodeId = nodeId;
      this.menu.left = evt.x + "px";
      this.menu.top = evt.y + "px";
    },
    // 流程数据信息
    dataInfo() {
      this.flowInfoVisible = true;
      this.$nextTick(function() {
        this.$refs.flowInfo.init();
      });
    },
    //书去数据
    getDataInfo() {
      return this.rightData;
    },
    // 加载流程图
    dataReload(data) {
      this.easyFlowVisible = false;
      this.rightData.nodeList = [];
      this.rightData.lineList = [];
      this.$nextTick(() => {
        data = lodash.cloneDeep(data);
        this.easyFlowVisible = true;
        this.rightData = data;
        this.$nextTick(() => {
          this.jsPlumb = jsPlumb.getInstance();
          this.$nextTick(() => {
            this.jsPlumbInit();
          });
        });
      });
    },
    // 模拟载入数据dataA
    dataReloadA() {
      this.dataReload(getDataA());
    },
    // 模拟载入数据dataB
    dataReloadB() {
      this.dataReload(getDataB());
    },
    // 模拟载入数据dataC
    dataReloadC() {
      this.dataReload(getDataC());
    },
    changeLabel() {
      var lines = this.jsPlumb.getConnections({
        source: "nodeA",
        target: "nodeB"
      });
      lines[0].setLabel({
        label: "admin",
        cssClass: "labelClass a b"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pannel {
  height: 1000px;
}
#flowContainer {
  background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
  background-color: rgb(251, 251, 251);
  min-height: 500%;
  /*background-color: #42b983;*/
  position: relative;
}

.labelClass {
  background-color: white;
  padding: 5px;
  opacity: 0.7;
  border: 1px solid #346789;
  /*border-radius: 10px;*/
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.pannerBox {
  overflow: hidden;
  overflow-y: scroll;
}
.leftMenuBox {
  overflow: hidden;

  height: 100%;
  overflow-y: scroll;
  .title {
    padding: 10px 0;
    text-align: center;
    border: 1px solid #eee;
    text-overflow: clip;
  }
}
.panel-container {
  display: flex;
}
</style>
