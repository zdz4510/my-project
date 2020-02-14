<template>
  <div class="menu-tree">
    <label :key="item.id" v-for="item in data">
      <el-submenu :index="item.id" v-if="item.children">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.lable }}</span>
        </template>
       
        <DsnMenutree  :data="item.children"   />
      </el-submenu>
      <el-menu-item
          v-else
          :route="{
            name: item.key
          }"
          :key="item.id"
          :index="item.id"
          >{{ item.lable }}</el-menu-item
        >
    </label>
  </div>
</template>

<script>
import DsnMenutree from "@/views/layout/dsn-menutree";
export default {
  name: "DsnMenutree",
  data() {
    return {
      menu_data: {}
    };
  },
  components: {
    DsnMenutree: DsnMenutree
  },
  props: ["data"]
};
</script>
