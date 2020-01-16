<template>
  <div class="jieBao">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      class="form-style"
      :label-width="formLabelWidth"
      :rules="searchFormRules"
      style="display:flex;align-items:center"
    >
      <el-form-item label="工序:" prop="operation">
        <el-input v-model="searchForm.operation"></el-input>
      </el-form-item>
      <el-form-item label="设备:" prop="resource">
        <el-input v-model="searchForm.resource"></el-input>
      </el-form-item>
      <el-form-item
        label="LOT:"
        prop="lot"
        style="display:flex;align-items:center;width:300px"
      >
        <div style="display:flex;align-item:center">
          <el-input v-model="searchForm.lot"></el-input>
          <i class="el-icon-document-copy" @click="goQuery"></i>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="checkForm('searchForm')"
          >查询</el-button
        >
        <el-button size="small" type="primary" @click="resetForm('searchForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <div class="operation">
      <el-button type="primary" size="small" @click="goEdit">开始</el-button>
      <el-button type="primary" size="small" @click="reset">注销</el-button>
      <el-button type="primary" size="small">结束</el-button>
      <el-button type="primary" size="small">1号组</el-button>
      <el-button type="primary" size="small">2号组</el-button>
    </div>
    <!--表单-->
    <div class="tableBox">
      <el-table
        ref="multipleTable"
        :data="row"
        tooltip-effect="dark"
        style="width: 100%"
        height="514"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="120">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column
          prop="name"
          label="LOT编号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="LOT状态"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="工单"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="物料"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="工艺路线"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>

    <!-- LOT模态框 -->
    <el-dialog title="lot" :visible.sync="lotDialog" width="50%">
      <span>
        <dimQueryLotModel
          :lot="lotDatas"
          @selectLot="selectLot"
        ></dimQueryLotModel>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lotDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectLot">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { listLotHttp } from "@/api/dc/lot.divestiture.api.js";
import dimQueryLotModel from "../components/dim-query-lots-model.vue";
import { listPodLotHttp } from "@/api/dc/production.operate.api.js";

export default {
  name: "productionOperate",
  components: {
    // mergeLotModel,
    dimQueryLotModel
  },
  data() {
    return {
      lotDialog: false,
      formLabelWidth: "80px",
      searchForm: {
        operation: "",
        lot: "",
        resource: ""
      },
      searchFormRules: {
        operation: [
          { required: true, message: "请输入工序", trigger: "change" }
        ],
        lot: [{ required: true, message: "请输入lot", trigger: "change" }],
        resource: [{ required: true, message: "请输入设备", trigger: "change" }]
      },
      popupData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableData: [],
      row: [],
      lotDatas: [],
      currentLot: {}
    };
  },
  methods: {
    handledbClick(row) {
      this.row.push(row);
      // this.row = row
      //  this.$refs.multipleTable.toggleRowSelection(row);
      this.lotDialog = false;
    },
    resetForm() {},
    goQuery() {
      const data = {};
      listLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.lotDatas = res.data;
          this.lotDialog = true;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    goEdit() {},
    reset() {
      this.$router.go(0);
    },
    //获取lot弹出框单个选择的数据
    selectLot(row) {
      this.currentLot = row;
    },
    //弹出框确认选择lot
    handleSelectLot() {
      this.searchForm.lot = this.currentLot.lot;
      this.lotDialog = false;
    },
    //查询前验证表单
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleQuery();
        } else {
          return false;
        }
      });
    },
    //查询
    handleQuery() {
      const data = {
        lot: this.searchForm.lot,
        operation: this.searchForm.operation,
        resource: this.searchForm.resource
      };
      listPodLotHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          console.log(res.data);
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.jieBao {
  padding: 30px 30px;
}
.operation {
  padding: 10px 5px;
}
.el-icon-document-copy {
  display: flex;
  align-items: center;
  margin: 0 40px 0 7px;
}
.popupBox {
  overflow-x: hidden;
  overflow: auto;
  display: flex;
  //  width: 600px;
  //  height:300px;
  line-height: 100px;
}
.el-dialog__body {
  padding: 10px 20px !important;
}
</style>
