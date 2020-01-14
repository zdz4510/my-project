<template>
  <div class="top">
    <i class="el-icon-back"></i>
    <i class="el-icon-right"></i>
    <i class="el-icon-refresh-right"></i>
    <i class="el-icon-refresh-left"></i>
    <i class="el-icon-circle-plus-outline"></i>
    <i class="el-icon-remove-outline"></i>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="字体" size="mini">
          <el-option label="宋体" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="大小" size="mini">
          <el-option label="12" value="12"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="b">
      <span><strong>B</strong></span>
    </div>
    <div class="italic">
      <span>I</span>
    </div>
    <div class="u">
      <span><u>U</u></span>
    </div>
    换行 左对齐 居中 右对齐
    <dsn-button @click="save" >保存</dsn-button>
  </div>
</template>

<script>
export default {
  name: "labelTop",
  data() {
    return {
      formInline: {
        region: ""
      }
    };
  },
  methods:{
    save(){
      this.$emit('save')
    }
  }
};
</script>
<style lang="scss" scoped>
.top {
  //   line-height: 50px;
  display: flex;
  align-items: center;
  i {
    font-size: 25px;
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .el-form {
    .el-form-item {
      margin-bottom: 0px;
      .el-select {
        width: 100px;
      }
    }
  }
  .b,
  .italic,
  .u {
    width: 30px;
    height: 30px;
    padding: 2px;
    box-sizing: border-box;
    line-height: 30px;
    text-align: center;
    span {
      font-size: 20px;
    }
  }
  .italic {
    span {
      font-style: italic;
    }
  }
}
</style>
