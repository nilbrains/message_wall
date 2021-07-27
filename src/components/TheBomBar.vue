<template>
  <div class="the-bom-bar var-elevation--4">
    <router-link class="item" to="/home">
      <var-icon :name="key=='/home'?'home':'home-outline'"/>
      <span class="name">首页</span>
    </router-link>
    <router-link class="item" to="/add">
      <var-icon :name="key=='/add'?'plus':'plus'"/>
    </router-link>
    <router-link class="item" to="/me">
      <var-icon :name="key=='/me'?'account-circle':'account-circle-outline'"/>
      <span class="name">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "the-bom-bar",
  computed: {
    key() {
      return this.$route.path;
    },
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #222;
  text-decoration: none;
}
.the-bom-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  width: 100vw;
  height: 60px;
  .item {
    text-align: center;
    flex-basis: 33%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0.5em 0;
  }
}
</style>