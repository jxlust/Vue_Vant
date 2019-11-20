<template>
  <div class="shop">
    <van-notice-bar text="一杯xxx送好多杯哦哦，通知小伙伴们，快来抢购嘟噜嘟噜啦啦啦啦啦啦啦啦啦！" left-icon="volume-o" />
    <div class="content"></div>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <!-- <van-checkbox v-model="checked">全选</van-checkbox> -->
       <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <!-- <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span> -->
    </van-submit-bar>
  </div>
</template>

<script>
// @ is an alias to /src

import { apiAddress } from "@/reuqest/api";
import { mapState, mapActions, mapGetters } from "vuex";
import { NoticeBar, Checkbox, SubmitBar, GoodsActionIcon, } from "vant";
export default {
  name: "shop",
  components: {
    [NoticeBar.name]: NoticeBar,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [GoodsActionIcon.name]: GoodsActionIcon
  },
  data() {
    return {
      checked: true
    };
  },
  computed: {
    ...mapState(["count", "isDisabled", "testData"]),
    ...mapGetters(["shopList"]),
    routerName() {
      return this.$route.params;
    }
  },
  created() {
    console.log(this);
    console.log("route params:", this.$route);
    // this.load()
    this.actionGetList()
      .then(data => {
        // console.log('data:',data);
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
    onSubmit() {
      console.log("提交...");
    },
    // add(n){
    //   this.$store.dispatch('actionsAddCount',n)
    //     // this.count = this.$store.state.count
    // },
    // dis(n){
    //   this.$store.dispatch('actionsDisCount',n)
    //     // this.count = this.$store.state.count
    // }
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/shop.scss";
</style>