<template>
  <div class="container">
    <div class="formlabel">
      <el-form label-width="100px" class="typeForm">
        <el-form-item label="物料号:">
          <el-col style="margin-right:20px">
            <el-input placeholder="请输入物料号"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="包装层级:" prop="subordinationNumberType">
          <el-select>
            <el-option label="LOT" value="30"></el-option>
            <el-option label="手动" value="20"></el-option>
            <el-option label="调取编号规则" value="10"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作业方式:" prop="subordinationNumberType">
          <el-select>
            <el-option label="包装" value="30"></el-option>
            <el-option label="解包" value="20"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="输入容器:">
          <el-col style="margin-right:20px">
            <el-input placeholder="请输入物料号"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="被容器">
          <el-col style="margin-right:20px">
            <el-input placeholder="请输入物料号"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div>
        <div class="operation">
          <el-button type="primary" size="small">完成装入</el-button>
          <el-button type="primary" size="small">包装打印</el-button>
          <el-button type="danger" size="small">重置</el-button>
          <el-checkbox v-model="checked" style="margin-left:10px">自动打印</el-checkbox>
        </div>
      </div>
    </div>

    <div class="baseForm">
      <el-form label-width="100px" class="typeForm">
        <el-form-item label="容器类型:">
          <el-col style="margin-right:20px">
            <el-input placeholder="请输入物料号"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="工单:" prop="subordinationNumberType">
          <el-input placeholder="请输入物料号"></el-input>
        </el-form-item>

        <el-form-item label="物料号:" prop="subordinationNumberType">
          <el-input placeholder="请输入物料号"></el-input>
        </el-form-item>

        <el-form-item label="编写规则:">
          <el-input placeholder="请输入物料号"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="容器容纳数">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前数量">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="是否打印箱标">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签脚本">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="list">
      <div>包装清单</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="514"
      >
        <el-table-column prop="dataIndex" label="序号"></el-table-column>
        <el-table-column prop="mat" label="被容器/LOT"></el-table-column>
        <el-table-column prop="containerType" label="包装时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="packingClass" label="包装员" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>

    <div class="log">
      <div>日志记录</div>
      <div style="background:#fff;width:100%;height:200px">112312</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.container {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .formlabel {
    width: 50%;
    .operation {
      width: 100%;
      text-align: center;
    }
  }
  .baseForm {
    width: 50%;
  }
  .list {
    width: 50%;
  }
  .log {
    width: calc(50% - 20px);
    padding: 0 10px;
  }
}
</style>