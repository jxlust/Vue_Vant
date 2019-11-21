<template>
  
  <div>
    <router-link :to="msg">login</router-link>
    我是底部哈哈哈哈{{msg}}
  <!-- <div>
  <a v-bind:href="msg">aaaa</a>
  </div> -->

  </div>
 
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
  },
  data() {
    return {
      name:'lp'  
    }
  },
};
</script>