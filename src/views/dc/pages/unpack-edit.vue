<template>
    <div class="unpackEdtit">
        <div class="operation">
            <el-button type="primary" size="small">返回</el-button>
            <el-button type="primary" size="small">保存</el-button>
        </div>
        <div class="content">
            <div class="leftTable">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="容器编号规则：" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="手动/调取编号规则">
                            <el-option label="手动" value="手动"></el-option>
                            <el-option label="调取编号规则" value="调取编号规则"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="容器编号规则版本：">
                        <el-select v-model="ruleForm.region" placeholder="v1.0">
                            <el-option label="v1.0" value="v1.0"></el-option>
                            <el-option label="v1.1" value="v1.1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="容器容纳数" prop="name">
                        <el-input ></el-input>
                    </el-form-item>
                    <el-form-item label="容器标签打印：" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="是/TRUE">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="rightTable">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
                    <el-form-item label="容器类型：" prop="name">
                        <el-input ></el-input>
                    </el-form-item>
                    <el-form-item label="包装层级：">
                        <el-input ></el-input>
                    </el-form-item>
                    <el-form-item label="被容器编号规则：" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="LOT/手动/调取编号规则">
                            <el-option label="LOT" value="LOT"></el-option>
                            <el-option label="手动" value="手动"></el-option>
                            <el-option label="调取编号规则" value="调取编号规则"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="被容器编号规则版本：" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="是/TRUE">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return{
            ruleForm:{
                region:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    display: flex;
    padding:10px 30px;
    .leftTable{
        margin-right:30px;
    }
}
.operation{
    padding:10px 30px;
}
</style>