<template>
  <div class="custom-data">
    <el-form :model="form" class="demo-ruleForm"   label-width="100px">
      <el-form-item
        :label="item.fieldLabel + ':'"
        :prop="item.fieldName"
      
        :rules="computedRules(item)"
        v-for="item in data"
        :key="item.lable"
      >
        <dsn-input
          :maxlength="item.fieldSize"
          show-word-limit
          type="textarea"
          v-if="item.fieldType == 'S'"
          v-model="form[`${item.fieldName}`]"
        ></dsn-input>
        <dsn-input
          type="number"
          :maxlength="item.fieldSize"
          show-word-limit
          v-if="item.fieldType == 'N'"
          v-model="form[`${item.fieldName}`]"
        ></dsn-input>
        <dsn-select
          style="width:100%"
          @focus="selectFocus(item)"
          v-if="item.fieldType == 'C'"
          v-model="form[`${item.fieldName}`]"
        >
          <el-option
            :label="item"
            :key="item"
            :value="item"
            v-for="item in list"
          ></el-option>
        </dsn-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findDataByLimitGeneralCode } from "@/api/material/route.maintenance.api.js";
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
  model: {
    prop: "data",
    event: "input"
  },
  watch: {
    data() {
      this.data.forEach(item => {
        this.$set(this.form, item.fieldName, item.fieldValue||'');
        //   this.form[`${item.fieldName}`] =item['fieldValue']
      });
    },
    form: {
      handler: function() {
        this.data.forEach(item => {
          item.fieldValue = this.form[`${item.fieldName}`]||'';
        });
        console.log("aaaaa");
        this.$emit("input", this.data);
      },
      deep: true
    }
  },
  created(){
       this.data.forEach(item => {
        this.$set(this.form, item.fieldName, item.fieldValue||'');
        //   this.form[`${item.fieldName}`] =item['fieldValue']
      });
  },
  data() {
    return {
      //   form: [
      //     {
      //       label: "filed",
      //       value: 1
      //     }
      //   ],
      form: {},
      list: []
    };
  },

  methods: {
    getData() {},
    computedRules(item) {
      const rule1 = {
        required: item.required,
        message: `${item.fieldLabel} 不能为空`,
        trigger: ["change", "blur"]
      };
      //   ,

      if (item.fieldType == "S") {
        return [
          rule1,
          {
            min: 0,
            max: parseInt(item.fieldSize),
            message: "长度在 0 到 200 个字符",
            trigger: "blur"
          }
        ];
      }
      if (item.fieldType == "N") {
        return [
          rule1,
          { min: 0, max: parseInt(item.fieldSize), message: "长度在 0 到 30 个字符", trigger: "blur" }
        ];
      }
      return rule1;
    },
    //下拉框fouces 触发的事件
    selectFocus(item) {
      const { limitGeneralField, limitGeneralCode } = item;
      this.getList({
        limitGeneralCode,
        limitGeneralField
      });
    },
    getList(data) {
      findDataByLimitGeneralCode(data).then(data => {
        console.log(data);
        const res = data.data;
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss"></style>
