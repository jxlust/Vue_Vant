<template>
  <div>我是底部哈哈哈哈{{msg}}</div>
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
  name: "FooterBar",
  props: {
    msg: String
  }
};
</script>