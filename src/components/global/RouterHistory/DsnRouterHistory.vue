<template>
  <div class="router-history">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "dsnRouterHistory",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.router-history {
  width: max-content;
  min-width: 100%;
  height: 32px;
  background: #f5f7f9;
  padding: 6px 12px;
}
</style>
