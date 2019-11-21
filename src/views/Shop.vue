<template>
  <div class="shop">
    <van-notice-bar text="一杯xxx送好多杯哦哦，通知小伙伴们，快来抢购嘟噜嘟噜啦啦啦啦啦啦啦啦啦！" left-icon="volume-o" />
    <div class="content">
      <!-- 左侧导航 -->
      <van-sidebar v-model="activeKey" @change="sidebarChange">
        <van-sidebar-item
          @click="sidebarClick"
          :title="item.name"
          :key="item.key"
          :dot="(item.id == 1)? true: false"
          v-for="item in sorts"
        />
      </van-sidebar>
      <!-- 右侧内容 -->
      <div class="right-content" ref="rightContent">
        <van-image fit="contain" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <!-- 右侧导航 -->
        <div class="item-wrap" :key="item.key" v-for="item in sorts">
          <van-sticky :offset-top="86" @scroll="navScroll($event,item)" :z-index="(100+item.id)">
            <div class="nav-item">{{item.name}}</div>
          </van-sticky>
          <div class="test"></div>
        </div>

        <Footer msg="user" ref="footer"></Footer>
      </div>
    </div>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <!-- <van-checkbox v-model="checked">全选</van-checkbox> -->
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <!-- <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span>-->
    </van-submit-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { apiAddress } from "@/reuqest/api";
import { mapState, mapActions, mapGetters } from "vuex";
import Footer from "@/components/FooterBar";
import {
  NoticeBar,
  Checkbox,
  SubmitBar,
  GoodsActionIcon,
  Sidebar,
  SidebarItem,
  Sticky,
  Image,
  Lazyload
} from "vant";

Vue.use(Lazyload);
export default {
  name: "shop",
  components: {
    [NoticeBar.name]: NoticeBar,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Sticky.name]: Sticky,
    [Image.name]: Image,
    Footer
    // 'footer-bar':FooterBar
  },
  data() {
    return {
      checked: true,
      activeKey: -1,
      container: null,
      sorts: [
        { name: "店长推荐", id: 1, key: 0 },
        { name: "新品哟哟", id: 2, key: 1 },
        { name: "热销产品", id: 3, key: 2 },
        { name: "美容养颜", id: 4, key: 3 },
        { name: "找好茶", id: 5, key: 4 }
      ]
    };
  },
  computed: {
    ...mapState(["count", "isDisabled", "testData"]),
    ...mapGetters(["shopList"]),
    routerName() {
      return this.$route.params;
    }
  },
  mounted() {
    console.log(1, this.$refs.footer.name);
    this.container = this.$refs.rightContent;
    this.sorts.forEach(v => {
      v["lists"] = [1, 2, 3, 4, 5];
    });
  },
  created() {
    console.log(this);
    console.log("route params:", this.$route);
    // this.load()
    this.actionGetList()
      .then(data => {
        console.log("data:", data);
        // this.$router.push('/user');
      })
      .catch(e => {
        console.error("error:", e);
      });
  },
  methods: {
    ...mapActions({
      //方法映射到对应函数
      actionsAddCount: "actionsAddCount",
      actionsDisCount: "actionsDisCount",
      actionGetList: "actionGetList"
    }),
    // ...mapMutations({ //方法映射到对应函数
    //     'actionsAddCount':'addCount',
    //     'actionsDisCount':'disCount'
    // }),
    load() {
      apiAddress().then(res => {
        console.log(res);
      });
    },
    sidebarClick(index) {
      console.log("index", index);
      let itemArr = document.querySelectorAll('.right-content .item-wrap');
      let $rightContent = document.querySelector('.right-content');
      console.log('arr:',itemArr);
      console.log('top',itemArr[0].offsetTop);
      let top = itemArr[index].offsetTop;
      $rightContent.scrollTop = top;
      

    },
    navScroll(obj, item) {
      // console.log(99, obj);
      if (obj.isFixed) {
        this.activeKey = item.key;
      }
    },
    sidebarChange(index) {
      console.log("c", index);

    },
    onSubmit() {
      console.log("提交...");
    }
    // add(n){
    //   this.$store.dispatch('actionsAddCount',n)
    //     // this.count = this.$store.state.count
    // },
    // dis(n){
    //   this.$store.dispatch('actionsDisCount',n)
    //     // this.count = this.$store.state.count
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/shop.scss";
</style>