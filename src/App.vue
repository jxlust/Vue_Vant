<template>
  <div id="mytest">
    <!-- <a href="page1.html">跳转到第二个页面</a> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/login">login</router-link>
    </div>
    <router-view />-->

    <van-nav-bar
      title="你是我的奶茶哦"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="location-o" size="20px" slot="right" />
    </van-nav-bar>

    <transition-group name="fade" mode="out-in">
      <router-view key="1" />
      <!-- <router-view key="2" class="order" name="order" /> -->
    </transition-group>
  </div>
</template>

<script>
import FooterBar from "_c/FooterBar";
import { Button, NavBar, Toast, Icon } from "vant";

// Vue.use(Toast);
// import { Tabbar, TabbarItem } from "vant";
// Vue.use(Tabbar).use(TabbarItem);
export default {
  components: {
    // FooterBar,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      desc: "来着父容器的底部内容......"
    };
  },
  mounted() {},
  created() {},
  updated() {},
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  },
  destroyed() {}
};
</script>
<style lang="scss">
#mytest {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__text {
  color: #fff;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar__text:active {
  background-color: #055531;
}
.van-nav-bar {
  background-color: #318866;
}
</style>
