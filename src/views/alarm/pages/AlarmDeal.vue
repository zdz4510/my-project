<template>
  <div class="alarm-deal">
    <dsn-tabs v-model="activeName">
      <el-tab-pane label="未处理事件" name="first">
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>搜索信息</span>
          </div>
          <div class="search-bar">
            <el-form
              :inline="true"
              :model="undealSearchForm"
              ref="undealSearchForm"
              :rules="rules"
              class="form-style"
              :label-width="formLabelWidth"
            >
              <el-form-item label="触发序号:" prop="sequence">
                <dsn-input v-model="undealSearchForm.sequence"></dsn-input>
              </el-form-item>
              <el-form-item label="触发时间:" prop="triggeringTime">
                <el-date-picker
                  v-model="undealSearchForm.triggeringTime"
                  type="datetime"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="事件编号:" prop="alarm">
                <dsn-input v-model="undealSearchForm.alarm"></dsn-input>
              </el-form-item>
              <el-form-item label="预警分组:" prop="alarmGroup">
                <dsn-input v-model="undealSearchForm.alarmGroup"></dsn-input>
              </el-form-item>
              <el-form-item label="事件等级:" prop="alarmLevel">
                <dsn-input v-model="undealSearchForm.alarmLevel"></dsn-input>
              </el-form-item>
              <el-form-item label="触发类型:" prop="triggerType">
                <dsn-input v-model="undealSearchForm.triggerType"></dsn-input>
              </el-form-item>
              <el-form-item label prop>
                <dsn-button size="small" type="primary" @click.native="searchUndeal">查询</dsn-button>
                <dsn-button size="small" type="primary" @click.native="undealResetForm('undealSearchForm')">重置</dsn-button>
              </el-form-item>
            </el-form>
          </div>
        </DsnPanel>
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>搜索结果</span>
          </div>
          <div class="operate">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <dsn-button size="small" type="primary" icon="el-icon-upload2" @click.native="exportExcelUndeal">导出</dsn-button>
              </el-form-item>
              <el-form-item>
                <dsn-button
                  size="small"
                  type="primary"
                  @click.native="ack"
                  :disabled="this.undealCheckedList.length===0"
                >确认标记</dsn-button>
              </el-form-item>
              <el-form-item>
                <dsn-input placeholder="请输入内容" v-model="ackComment" class="des">
                  <template slot="prepend">确认描述:</template>
                </dsn-input>
              </el-form-item>
            </el-form>
          </div>
          <div class>
            <dsn-table
              ref="undealTable"
              :data="this.undealTableData.data"
              tooltip-effect="dark"
              row-key="sequence"
              @selection-change="handleSelectionChangeUndeal"
            >
              <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="sequence" label="触发序号"></el-table-column>
              <el-table-column prop="triggeringTime" label="触发时间"></el-table-column>
              <el-table-column prop="alarmGroup" label="预警分组"></el-table-column>
              <el-table-column prop="alarm" label="事件编号"></el-table-column>
              <el-table-column prop="alarmLevel" label="事件等级"></el-table-column>
              <el-table-column prop="triggerType" label="触发类型"></el-table-column>
              <el-table-column prop="workCenter" label="工作中心"></el-table-column>
              <el-table-column prop="workCenterRelation" label="产线"></el-table-column>
              <el-table-column prop="station" label="工序站位"></el-table-column>
              <el-table-column prop="shopOrder" label="工单"></el-table-column>
              <el-table-column prop="numbersInvolved" label="涉及数量"></el-table-column>
              <el-table-column prop="resource" label="设备编号"></el-table-column>
              <el-table-column prop="clearFlag" label="初始化与否"></el-table-column>
              <el-table-column prop="clearTime" label="初始化时间"></el-table-column>
              <el-table-column prop="clearUserName" label="初始化用户"></el-table-column>
              <el-table-column prop="clearComment" label="初始化注释"></el-table-column>
            </dsn-table>
            <dsn-pagination
              class="mtb20"
              background
              @size-change="handleSizeChangeUndeal"
              @current-change="handleCurrentChangeUndeal"
              :current-page="this.undealTableData.page.currentPage"
              :page-sizes="[1, 10, 15, 20, 30, 50]"
              :page-size="this.undealTableData.page.pageSize"
              layout="->, total, prev, pager, next, sizes"
              :total="this.undealTableData.page.total"
            ></dsn-pagination>
          </div>
        </DsnPanel>
      </el-tab-pane>
      <el-tab-pane label="已处理事件" name="second">
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>搜索信息</span>
          </div>
          <div class="search-bar">
            <el-form
              :inline="true"
              :model="dealSearchForm"
              ref="dealSearchForm"
              :rules="rules"
              class="form-style"
              :label-width="formLabelWidth"
            >
              <el-form-item label="触发序号:" prop="sequence">
                <dsn-input v-model="dealSearchForm.sequence"></dsn-input>
              </el-form-item>
              <el-form-item label="触发时间:" prop="triggeringTime">
                <el-date-picker
                  v-model="dealSearchForm.triggeringTime"
                  type="datetime"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="事件编号:" prop="alarm">
                <dsn-input v-model="dealSearchForm.alarm"></dsn-input>
              </el-form-item>
              <el-form-item label="预警分组:" prop="alarmGroup">
                <dsn-input v-model="dealSearchForm.alarmGroup"></dsn-input>
              </el-form-item>
              <el-form-item label="事件等级:" prop="alarmLevel">
                <dsn-input v-model="dealSearchForm.alarmLevel"></dsn-input>
              </el-form-item>
              <el-form-item label="触发类型:" prop="triggerType">
                <dsn-input v-model="dealSearchForm.triggerType"></dsn-input>
              </el-form-item>
              <el-form-item label prop>
                <dsn-button size="small" type="primary" @click.native="searchDeal">查询</dsn-button>
                <dsn-button size="small" type="primary" @click.native="dealResetForm('dealSearchForm')">重置</dsn-button>
              </el-form-item>
            </el-form>
          </div>
        </DsnPanel>
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>搜索结果</span>
          </div>
          <div class="operate">
            <el-form :inline="true">
              <el-form-item>
                <dsn-button size="small" type="primary" icon="el-icon-upload2" @click.native="exportExcelDeal">导出</dsn-button>
              </el-form-item>
              <el-form-item>
                <dsn-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  @click.native="del"
                  :disabled="this.dealCheckedList.length===0"
                >删除</dsn-button>
              </el-form-item>
              <el-form-item>
                <dsn-button
                  size="small"
                  type="primary"
                  @click.native="init"
                  :disabled="this.dealCheckedList.length===0"
                >初始化</dsn-button>
              </el-form-item>
              <el-form-item>
                <dsn-input placeholder="请输入内容" v-model="clearComment" class="des">
                  <template slot="prepend">初始化描述:</template>
                </dsn-input>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <dsn-table
              ref="dealTable"
              :data="this.dealTableData.data"
              tooltip-effect="dark"
              row-key="sequence"
              @selection-change="handleSelectionChangeDeal"
            >
              <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="sequence" label="触发序号"></el-table-column>
              <el-table-column prop="triggeringTime" label="触发时间"></el-table-column>
              <el-table-column prop="alarmGroup" label="预警分组"></el-table-column>
              <el-table-column prop="alarm" label="事件编号"></el-table-column>
              <el-table-column prop="alarmLevel" label="事件等级"></el-table-column>
              <el-table-column prop="triggerType" label="触发类型"></el-table-column>
              <el-table-column prop="workCenter" label="工作中心"></el-table-column>
              <el-table-column prop="workCenterRelation" label="产线"></el-table-column>
              <el-table-column prop="station" label="工序站位"></el-table-column>
              <el-table-column prop="shopOrder" label="工单"></el-table-column>
              <el-table-column prop="numbersInvolved" label="涉及数量"></el-table-column>
              <el-table-column prop="resource" label="设备编号"></el-table-column>
              <el-table-column prop="ackFlag" label="确认标记"></el-table-column>
              <el-table-column prop="ackUserId" label="确认人"></el-table-column>
              <el-table-column prop="ackTime" label="确认时间"></el-table-column>
              <el-table-column prop="clearFlag" label="初始化与否"></el-table-column>
              <el-table-column prop="clearTime" label="初始化时间"></el-table-column>
              <el-table-column prop="clearUserName" label="初始化用户"></el-table-column>
              <el-table-column prop="clearComment" label="初始化注释"></el-table-column>
              <el-table-column prop="modifyUserName" label="修改人"></el-table-column>
              <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
            </dsn-table>
            <dsn-pagination
              background
              @size-change="handleSizeChangeDeal"
              @current-change="handleCurrentChangeDeal"
              :current-page="this.dealTableData.page.currentPage"
              :page-sizes="[1, 10, 15, 20, 30, 50]"
              :page-size="this.dealTableData.page.pageSize"
              layout="->, total, prev, pager, next, sizes"
              :total="this.dealTableData.page.total"
            ></dsn-pagination>
          </div>
        </DsnPanel>
      </el-tab-pane>
      <el-tab-pane label="事件涉及SN序列/lot序列" name="third">
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>搜索条件</span>
          </div>
          <div class="search-bar">
            <el-form
              :inline="true"
              :model="searchForm"
              ref="searchForm"
              :rules="rules"
              class="form-style"
              :label-width="formLabelWidth"
            >
              <el-form-item label="触发序号:" prop="sequence">
                <dsn-input v-model="searchForm.sequence"></dsn-input>
              </el-form-item>
              <el-form-item label prop>
                <dsn-button size="small" type="primary" @click.native="search">查询</dsn-button>
                <dsn-button size="small" type="primary" @click.native="resetForm('searchForm')">重置</dsn-button>
              </el-form-item>
            </el-form>
          </div>
        </DsnPanel>
        <DsnPanel>
          <div slot="header" class="title clearfix">
            <span>搜索结果</span>
          </div>
          <div class="operate">
            <dsn-button size="small" type="primary" icon="el-icon-upload2" @click.native="exportExcel">导出</dsn-button>
          </div>
          <div class>
            <dsn-table
              ref="multipleTable"
              :data="this.tableData.data"
              tooltip-effect="dark"
              row-key="sequence+mainNumber+lot+alarm+resource"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="sequence" label="触发序号"></el-table-column>
              <el-table-column prop="mainNumber" label="容器"></el-table-column>
              <el-table-column prop="lot" label="LOT"></el-table-column>
              <el-table-column prop="resource" label="设备编号"></el-table-column>
              <el-table-column prop="shopOrder" label="工单"></el-table-column>
              <el-table-column prop="alarm" label="事件编号"></el-table-column>
              <el-table-column prop="alarmLevel" label="事件等级"></el-table-column>
              <el-table-column prop="ackFlag" label="确认标记"></el-table-column>
              <el-table-column prop="workCenter" label="工作中心"></el-table-column>
              <el-table-column prop="workCenterRelation" label="产线"></el-table-column>
              <el-table-column prop="station" label="工序站位"></el-table-column>
              <el-table-column prop="operation" label="当前工序"></el-table-column>
              <el-table-column prop="involeNumber" label="多次触发次数"></el-table-column>
            </dsn-table>
            <dsn-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="this.tableData.page.currentPage"
              :page-sizes="[1, 10, 15, 20, 30, 50]"
              :page-size="this.tableData.page.pageSize"
              layout="->, total, prev, pager, next, sizes"
              :total="this.tableData.page.total"
            ></dsn-pagination>
          </div>
        </DsnPanel>
      </el-tab-pane>
    </dsn-tabs>
  </div>
</template>

<script>
import {
  getAlarmGroupList,
  getSequenceList,
  updateAckData,
  updateInitData,
  deleteData
} from "../../../api/alarm.deal.api";
import { exportExcel } from "@/until/excel.js";
export default {
  name: "alarm-deal",
  data() {
    var numCheck = (rule, value, callback) => {
      var reg = /^(0|\+?[1-9][0-9]*)$/;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("只能输入正整数和0"));
      }
      callback();
    };
    return {
      tHeader: [
        "触发序号",
        "容器",
        "LOT",
        "设备编号",
        "工单",
        "事件编号",
        "事件等级",
        "确认标记",
        "工作中心",
        "产线",
        "工序站位",
        "当前工序",
        "多次触发次数"
      ],
      filterVal: [
        "sequence",
        "mainNumber",
        "lot",
        "resource",
        "shopOrder",
        "alarm",
        "alarmLevel",
        "ackFlag",
        "workCenter",
        "workCenterRelation",
        "station",
        "operation",
        "involeNumber"
      ],
      fileName: "事件涉及SN序列/LOT序列维护表",
      activeName: "first",
      checkedList: [],
      undealCheckedList: [],
      dealCheckedList: [],
      formLabelWidth: "100px",
      searchForm: {
        sequence: "",
        mainNumber: "",
        lot: "",
        resource: "",
        alarm: ""
      },
      rules: {
        sequence: [{ required: false, validator: numCheck, trigger: "blur" }]
      },
      tableData: {
        data: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      },
      undealSearchForm: {
        ackFlag: false,
        sequence: "",
        triggeringTime: "",
        alarm: "",
        alarmGroup: "",
        alarmLevel: "",
        triggerType: ""
      },
      undealTableData: {
        data: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      },
      dealSearchForm: {
        ackFlag: true,
        sequence: "",
        triggeringTime: "",
        alarm: "",
        alarmGroup: "",
        alarmLevel: "",
        triggerType: ""
      },
      dealTableData: {
        data: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      },
      ackComment: "",
      clearComment: ""
    };
  },
  created() {
    this.$nextTick(() => this.search());
    // this.search()
    this.searchUndeal();
    this.searchDeal();
  },
  methods: {
    search() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          let params = this.searchForm;
          params.pageSize = this.tableData.page.pageSize;
          params.currentPage = this.tableData.page.currentPage;
          getSequenceList(params).then(data => {
            if (data.data.code == 200) {
              this.tableData.data = data.data.data.data;
              this.tableData.page.total = data.data.data.total;
            } else {
              this.$message.error(data.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(pageSize) {
      this.tableData.page.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.tableData.page.currentPage = currentPage;
      this.search();
    },
    handleSelectionChange(val) {
      this.checkedList = val;
    },

    searchUndeal() {
      let params = this.undealSearchForm;
      console.log('click')
      params.pageSize = this.undealTableData.page.pageSize;
      params.currentPage = this.undealTableData.page.currentPage;
      getAlarmGroupList(params).then(data => {
        if (data.data.code == 200) {
          this.undealTableData.data = data.data.data.data;
          this.undealTableData.page.total = data.data.data.total;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleSizeChangeUndeal(pageSize) {
      this.undealTableData.page.pageSize = pageSize;
      this.searchUndeal();
    },
    handleCurrentChangeUndeal(currentPage) {
      this.undealTableData.page.currentPage = currentPage;
      this.searchUndeal();
    },
    handleSelectionChangeUndeal(val) {
      this.undealCheckedList = val;
    },

    searchDeal() {
      let params = this.dealSearchForm;
      params.pageSize = this.dealTableData.page.pageSize;
      params.currentPage = this.dealTableData.page.currentPage;
      getAlarmGroupList(params).then(data => {
        if (data.data.code == 200) {
          this.dealTableData.data = data.data.data.data;
          this.dealTableData.page.total = data.data.data.total;
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    handleSizeChangeDeal(pageSize) {
      this.dealTableData.page.pageSize = pageSize;
      this.searchDeal();
    },
    handleCurrentChangeDeal(currentPage) {
      this.dealTableData.page.currentPage = currentPage;
      this.searchDeal();
    },
    handleSelectionChangeDeal(val) {
      this.dealCheckedList = val;
    },
    ack() {
      let arr = [];
      this.undealCheckedList.map(item => {
        let obj = item;
        obj.ackComment = this.ackComment;
        arr.push(obj);
      });
      updateAckData(arr).then(data => {
        console.log(data);
        if (data.data.code == 200) {
          this.$message.success("操作成功");
          this.searchUndeal();
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    init() {
      let arr = [];
      this.dealCheckedList.map(item => {
        let obj = item;
        obj.clearComment = this.clearComment;
        arr.push(obj);
      });
      updateInitData(arr).then(data => {
        console.log(data);
        if (data.data.code == 200) {
          this.$message.success("操作成功");
          this.searchDeal();
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    del() {
      this.$confirm("是否删除所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteData(this.dealCheckedList).then(data => {
            console.log(data, "adddata");
            if (data.data.code == 200) {
              this.$message.success("删除成功");
              this.searchDeal();
              this.$refs.dealTable.clearSelection();
            } else {
              this.$message.error(data.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.search();
    },
    undealResetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchUndeal();
    },
    dealResetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchdeal();
    },
    //导出
    exportResult(data) {
      this.tHeader = [
        "触发序号",
        "容器",
        "LOT",
        "设备编号",
        "工单",
        "事件编号",
        "事件等级",
        "确认标记",
        "工作中心",
        "产线",
        "工序站位",
        "当前工序",
        "多次触发次数"
      ];
      this.filterVal = [
        "sequence",
        "mainNumber",
        "lot",
        "resource",
        "shopOrder",
        "alarm",
        "alarmLevel",
        "ackFlag",
        "workCenter",
        "workCenterRelation",
        "station",
        "operation",
        "involeNumber"
      ];
      this.fileName = "事件涉及SN序列/LOT序列维护表";

      const tipString = exportExcel(
        this.tHeader,
        this.filterVal,
        data,
        this.fileName
      );
      if (tipString === undefined) {
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    },
    exportResultUndeal(data) {
      this.tHeader = [
        "触发序号",
        "触发时间",
        "预警分组",
        "事件编号",
        "事件等级",
        "触发类型",
        "工作中心",
        "产线",
        "工序站位",
        "工单",
        "涉及数量",
        "设备编号",
        "初始化与否",
        "初始化时间",
        "初始化用户",
        "初始化注释"
      ];
      this.filterVal = [
        "sequence",
        "triggeringTime",
        "alarmGroup",
        "alarm",
        "alarmLevel",
        "triggerType",
        "workCenter",
        "workCenterRelation",
        "station",
        "shopOrder",
        "numbersInvolved",
        "resource",
        "clearFlag",
        "clearTime",
        "clearUserName",
        "clearComment"
      ];
      this.fileName = "事件未处理维护表";
      const tipString = exportExcel(
        this.tHeader,
        this.filterVal,
        data,
        this.fileName
      );
      if (tipString === undefined) {
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    },
    exportResultDeal(data) {
      this.tHeader = [
        "触发序号",
        "触发时间",
        "预警分组",
        "事件编号",
        "事件等级",
        "触发类型",
        "工作中心",
        "产线",
        "工序站位",
        "工单",
        "涉及数量",
        "设备编号",
        "确认标记",
        "确认时间",
        "初始化与否",
        "初始化时间",
        "初始化用户",
        "初始化注释",
        "修改人",
        "修改时间"
      ];
      this.filterVal = [
        "sequence",
        "triggeringTime",
        "alarmGroup",
        "alarm",
        "alarmLevel",
        "triggerType",
        "workCenter",
        "workCenterRelation",
        "station",
        "shopOrder",
        "numbersInvolved",
        "resource",
        "ackFlag",
        "ackTime",
        "clearFlag",
        "clearTime",
        "clearUserName",
        "clearComment",
        "modifyUserName",
        "modifyTime"
      ];
      this.fileName = "事件已处理维护表";
      const tipString = exportExcel(
        this.tHeader,
        this.filterVal,
        data,
        this.fileName
      );
      if (tipString === undefined) {
        return;
      } else {
        this.$message({
          message: tipString,
          type: "warning"
        });
        return;
      }
    },
    exportHttpUndeal() {
      let params = this.undealSearchForm;
      params.pageSize = 0;
      params.currentPage = this.undealTableData.page.currentPage;
      getAlarmGroupList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          this.exportResultUndeal(res);
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    exportHttp() {
      let params = this.searchForm;
      params.pageSize = 0;
      params.currentPage = this.tableData.page.currentPage;
      getSequenceList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          this.exportResult(res);
        } else {
          this.$message.error(data.data.message);
        }
      });
    },

    exportHttpDeal() {
      let params = this.dealSearchForm;
      params.pageSize = 0;
      params.currentPage = this.dealTableData.page.currentPage;
      getAlarmGroupList(params).then(data => {
        if (data.data.code == 200) {
          let res = data.data.data.data;
          this.exportResultDeal(res);
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    exportExcel() {
      if (this.checkedList.length === 0) {
        this.exportHttp();
      }
      if (this.checkedList.length > 0) {
        this.exportResult(this.checkedList);
      }
    },
    exportExcelUndeal() {
      if (this.undealCheckedList.length === 0) {
        this.exportHttpUndeal();
      }
      if (this.undealCheckedList.length > 0) {
        this.exportResultUndeal(this.undealCheckedList);
      }
    },
    exportExcelDeal() {
      if (this.dealCheckedList.length === 0) {
        this.exportHttpDeal();
      }
      if (this.dealCheckedList.length > 0) {
        this.exportResultDeal(this.dealCheckedList);
      }
    }
  }
};
</script>

<style lang="scss">
/* .alarm-deal {
  // padding: 0 30px;
  .search-bar {
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
  .operate {
    padding: 10px 0;
  }
} */
</style>
