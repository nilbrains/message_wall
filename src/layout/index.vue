<template>
  <div class="root">
    <div class="header" v-if="header">
      <var-app-bar :title="title">
        <template #left>
          <var-button
            round
            text
            color="transparent"
            text-color="#ffffff"
            @click="goBack"
          >
            <var-icon name="chevron-left" :size="24" />
          </var-button>
        </template>
      </var-app-bar>
    </div>
    <section class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </section>
    <the-bom-bar v-if="bar" />
  </div>
</template>

<script>
import TheBomBar from "@/components/TheBomBar.vue";
export default {
  components: { TheBomBar },
  computed: {
    bar() {
      return this.$route.meta.bar || false;
    },
    header() {
      return this.$route.meta.header || false;
    },
    key() {
      return this.$route.path;
    },
    title() {
      return this.$route.meta.title;
    },
  },
  mounted() {
    document.getElementById("app").style.display = "block";
    const my = document.getElementById("login_view")
    my.parentNode.removeChild(my);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-bottom: 60px;
}
</style>