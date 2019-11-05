<template>
  <div v-wechat-title="$route.meta.title">
    <main role="main" class="app-main">
      <div class="loading-wrap">
        <img :src="svgUrl" class="loadingImg" />
      </div>
      <div class="bottom-wrap">
        <div class="bottom-end">
          <div class="bottom-content">
            <div>
              <router-link to="/footer">Home</router-link>|
              <router-link to="/login">login</router-link>
              <h3 class="Title-jxl">Cookies Policy</h3>
              <p class="Text-jxl">
                We use cookies to optimise this website and continuously update
                it according to your needs. Please click on “Cookies” for detailed information on the use of
                cookies on this website. If you click “Yes, I agree”, cookies will be activated. If you do
                not want cookies to be activated, you can opt out here. The settings can be changed at any
                time under “Cookies”.
              </p>
              <router-view />
            </div>
            <button class="Button-jxl jsBtn">Yes, I agree!</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import url from '../../assets/images/Circulo.svg';
import svgUrl from '../../assets/images/Circulo.svg';
export default {
  name: "Page1",
  data() {
    return {
      // svgUrl: require("../../assets/images/Circulo.svg")
      svgUrl
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/page2.scss";
</style>