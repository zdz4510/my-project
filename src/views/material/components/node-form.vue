<template>
  <el-dialog title="节点信息" :close-on-click-modal="false" :visible.sync="visible">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 一般
        </span>
        <el-form :model="node" ref="dataForm" label-width="80px">
          <!-- <el-form-item label="名称">
            <dsn-input v-model="node.name"></dsn-input>
          </el-form-item>-->
          <el-form-item label="left坐标" v-if="false">
            <dsn-input v-model="node.left"></dsn-input>
          </el-form-item>
          <el-form-item label="top坐标" v-if="false">
            <dsn-input v-model="node.top"></dsn-input>
          </el-form-item>
          <el-form-item label="ico图标" v-if="false">
            <dsn-input v-model="node.ico"></dsn-input>
          </el-form-item>
          <el-form-item label="步骤">
            <dsn-input v-model="node.stepId"></dsn-input>
          </el-form-item>
          <el-form-item   label="工序" v-if="node.routerComponentType == 'O'">
            <dsn-input readonly v-model="node.operation"></dsn-input>
          </el-form-item>
          <el-form-item label="描述">
            <dsn-input v-model="node.description"></dsn-input>
          </el-form-item>
          <el-form-item label="报工步骤" v-if="node.routerComponentType == 'O'">
            <dsn-input v-model="node.reportingStep"></dsn-input>
            <el-checkbox v-model="node.isLastReportingStep">最后包工步骤</el-checkbox>
          </el-form-item>
          <el-form-item label="返回工序" v-if="node.routerComponentType == 'R'">
            <dsn-input v-model="node.returnOperation"></dsn-input>
          </el-form-item>
          <el-form-item label="返回步骤" v-if="node.routerComponentType == 'R'">
            <dsn-input v-model="node.returnStepId"></dsn-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="自定义字段">
        <DsnData   v-model="node.customizedFieldDefInfoList"></DsnData>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <dsn-button @click="visible = false" icon="el-icon-close">取消</dsn-button>
      <dsn-button type="primary" icon="el-icon-check" @click="visible = false">确定</dsn-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      node: {}
    };
  },
  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    init(data, id) {
      this.visible = true;
      data.nodeList.filter(node => {
        if (node.id === id) {
          this.node = node;
        }
      });
    }
  }
};
</script>
