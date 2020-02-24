<template>
  <!-- 标签配置打印 -->
  <div class="tag-print-config">
    <div>
      <dsn-button @click="addRow">添加</dsn-button>
      <dsn-button @click="deleteRow">删除</dsn-button>
      <dsn-button @click="clear">清空</dsn-button>
      <dsn-button @click="testPrint">测试打印</dsn-button>
    </div>
    <dsn-table
      :data="tableData"
      border
      highlight-current-row
      @current-change="handleCurrentChange"
      @row-click="rowClick"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="打印设备">
        <template slot-scope="scope">
          <dsn-select
            v-model="scope.row.printDevice "
            @focus="handleGetPrintDevicesAvailable"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in getDeviceList"
              :key="index"
            ></el-option>
          </dsn-select>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标签id">
        <template slot-scope="scope">
          <dsn-select v-model="scope.row.label">
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in labelList"
              :key="index"
            ></el-option>
          </dsn-select>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="打印数量">
        <template slot-scope="scope">
          <dsn-input type="number" v-model="scope.row.printCopies" />
        </template>
      </el-table-column>
    </dsn-table>
  </div>
</template>
<script>
import { getTagConfigList } from "@/api/tag/tag.config.api";
import { getPrintDevicesAvailable, printLabel } from "@/api/tag/tag.print.api";
export default {
  name: "tagPrintConfig",
  model: {
    prop: "tableData",
    event: "change"
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    labelList: {
      type: Array,
      required: true
    }
  },
  watch: {
    tableData: {
      handler: function() {
        this.$emit("change", this.tableData);
      },
      deep: true
    }
  },
  data() {
    return {
      selectDeiveName: "",
      // tableData: [
      //   {
      //     print: "",
      //     label: "",
      //     num: ""
      //   }
      // ],
      current: null,
      restaurants: [],
      getDeviceList: [],
      tagSelectList: []
    };
  },
  created() {
    // this.handleSelectTag();
    this.handleGetPrintDevicesAvailable();
  },

  methods: {
    // 同步 打印标签
    async printLabelAysnc(configArr) {
      configArr.forEach(element => {
        const data = printLabel(element);
        console.log(data);
      });
    },
    // 获取标签模板的下拉框内容
    handleSelectTag(label = "") {
      getTagConfigList({
        label: label
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.tagSelectList = res.data.data;
        }
      });
    },
    // 测试打印
    testPrint() {
      if (!this.current) {
        this.$message({
          type: "warning",
          message: "请先选中在打印"
        });

        return ;
      }
    const {label,printCopies ,printDevice } = this.current;
      if(label===''||printCopies===''||printDevice===''){
          this.$message({
          type:"warning",
          message:'请补全当前选中的行'
        })
      }
      this.printLabelAysnc([this.current])
     
    },
    // 清空表格里面的数据
    clear() {},
    // 获取打印设置
    handleGetPrintDevicesAvailable() {
      getPrintDevicesAvailable().then(data => {
        const res = data.data;
        if (res.code == 200) {
          console.log(res.data);
          this.getDeviceList = res.data;
        }
      });
    },
    //根据物料号筛选符合条件标签Id
    handleSearchLabelIdListByMat() {},
    //添加行
    addRow() {
      this.tableData.push({
        printDevice : "",
        label: "",
        printCopies : ""
      });
    },
    //删除行
    deleteRow() {
      //删除index
      if (!this.current) {
          this.$message({
          type: "warning",
          message: "请先选择删除的行"
        });
        return;
      }
      let index = this.tableData.findIndex(item => {
        return item == this.current;
      });
      console.log("tag", index);
      this.tableData.splice(index, 1);
      this.current = null;
    },
    rowClick(row) {
      this.current = row;
    },
    handleCurrentChange(current) {
      this.current = current;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>
