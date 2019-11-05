<template>
  <div class="home">
    <h2>{{testData}}</h2>
    <h3>当前计数为:{{ count }}</h3>
    <button @click="actionsAddCount(1)">+1</button>
    <button :disabled="isDisabled" @click="actionsDisCount(1)">-1</button>
    <ul>
      <li v-for="(shop,index) in shopList" :key="index">{{shop.text}}</li>
    </ul>
    <HelloWorld msg="这是我的vuecli多页面构建Demo" />

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { apiAddress } from "@/reuqest/api";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {};
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
