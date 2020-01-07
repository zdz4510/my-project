<template>
    <div class="jieBao">
        <el-form
          label-width="100px"
          class="typeForm"
        >
          <el-form-item label="物料号:">
            <el-col :span="6" style="margin-right:20px">
                <el-input placeholder="请输入物料号"></el-input>
            </el-col>
            <el-button size="small" type="primary">查询</el-button>
            <el-button size="small" type="primary">重置</el-button>
          </el-form-item>
        </el-form>
          
        <div class="operation">
            <el-button type="primary" size="small" @click="goEdit">新增</el-button>
            <el-button type="primary" size="small">修改</el-button>
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">导出</el-button>
        </div>
        <!--表单-->
        <div class="tableBox">
            <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            height="514">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="序号"
                width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="物料号"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="容器类型"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="包装层级"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="容器编号规划"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="容器编号规划版本"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="容器容纳数量"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="容器标签打印"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData: [],
        }
    },
    methods:{
        goEdit(){
            this.$router.push({name:'unpackEdit'})
        }
    }
}
</script>
<style lang="scss" scoped>
.jieBao{
    padding:30px 30px;
}
.operation {
    padding: 10px 5px;
}
    
</style>