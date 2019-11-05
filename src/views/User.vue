<template>
  <div>
    <img
      class="user-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
    />
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
      {{name}}
    </van-cell-group>

    <van-cell-group route>
      <van-cell icon="points" to="/user/99/abc" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  props: ["name"],
  data() {
    return {
      id: 100
    };
  },
  watch: {
    // '$route'(from, to) {
    //   console.log("from to", from, to);
    // }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.name;
      console.log("vm name:", vm.name);
    });
    // setTimeout(() => {
    //   next(vm => {
    //     vm.name;
    //     console.log("vm name:", vm.name);
    //   });
    // }, 2000);
  },
  beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
      console.log(99999);
      next();
    }, 2000);
   
  },
  beforeRouteLeave(to, from, next) {
    if (this.id === 100) {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  },
  created() {
    console.log("user", this.$route);
  }
};
</script>

<style lang="scss">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
