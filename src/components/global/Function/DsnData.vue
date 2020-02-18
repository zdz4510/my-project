<template>
  <div class="custom-data">
    <el-form :model="form" class="demo-ruleForm">
      <el-form-item
        :label="item.fieldLabel + ':'"
        :prop="item.fieldLabel"
        label-width="100px"
        :required="item.required"
        :rules="[
          {
            required: item.required,
            message: `请输入${item.fieldLabel}`,
            trigger: 'change'
          },
          {
            min: 1,
            max: 200,
            message: '长度在 3 到 200 个字符',
            trigger: 'blur'
          },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]"
        v-for="item in data"
        :key="item.lable"
      >
        <dsn-input
          type="textarea"
          v-if="item.fieldType == 'S'"
          v-model="item.fieldValue"
        ></dsn-input>
        <dsn-input
          type="number"
          v-if="item.fieldType == 'N'"
          v-model="item.fieldValue"
        ></dsn-input>
        <dsn-input
          type="text"
          v-if="item.fieldType == 'C'"
          v-model="item.fieldValue"
        ></dsn-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "DsnData",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  data() {
    return {
      //   form: [
      //     {
      //       label: "filed",
      //       value: 1
      //     }
      //   ],
      form: {}
    };
  },
  methods: {
    getData() {},
    computedRules(item) {
      const rule1 = {
        required: item.required,
        message: `请输入${item.fieldLabel}`,
        trigger: "change"
      };
      //   ,

      if (item.fieldType == "S") {
        return [
          rule1,
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ];
      }
      if (item.fieldType == "N") {
        return [
          rule1,
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ];
      }
      return [];
    }
  }
};
</script>

<style lang="scss"></style>
