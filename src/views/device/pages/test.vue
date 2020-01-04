<template>
  <div>{{ aa | filterA | filterB }}</div>
</template>

<script>
export default {
  data() {
    return {
      aa: "abc"
    };
  },
  filters: {
    filterA(value) {
      console.log(value);
      return "b";
    },
    filterB(value) {
      console.log(value);
      return value;
    }
  }
};
</script>

<style></style>
