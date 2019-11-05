<template>
  <div id="mytest">
    <!-- <a href="page1.html">跳转到第二个页面</a> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/login">login</router-link>
    </div>
    <router-view />-->
    <transition-group name="fade" mode="out-in">
      <router-view key="1" />
      <router-view key="2" class="aaaa" name="a" />
    </transition-group>

    <van-tabbar route>
      <van-tabbar-item replace to="/goods-1" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item replace to="/card" icon="search">标签</van-tabbar-item>
      <van-tabbar-item replace to="/user/1/abcd" icon>标签</van-tabbar-item>
    </van-tabbar>

    <!-- <FooterBar :msg="desc"></FooterBar> -->
    <!-- <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>-->
  </div>
</template>

<script>
// import FooterBar from "_c/FooterBar";
import { Button } from "vant";
import { Tabbar, TabbarItem } from "vant";
// Vue.use(Tabbar).use(TabbarItem);
export default {
  components: {
    // FooterBar,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      desc: "来着父容器的底部内容......"
    };
  },
  mounted() {},
  created() {},
  updated() {},
  destroyed() {}
};
</script>
<style lang="stylus">
#mytest {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
