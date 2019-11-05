<template>
  <div>我是打印测试....</div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100px;
  background-color: #f8f8f8;
}
</style>
<script>
export default {
  name: "PrintTxt",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  created() {
    console.log("printtxt create:", this.$route);
    setTimeout(() => {
      // this.$router.push({ name: "user", params: { id: 111, name: "aa" } });
    }, 3000);
  }
};
</script>