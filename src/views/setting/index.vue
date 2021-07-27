<template>
  <div class="setting">
    <div class="block" v-ripple>
      <var-cell
        border
        icon="information"
        title="关于我们"
        @click="$router.push('/setting/about')"
      >
        <template #extra>
          <var-icon name="chevron-right" />
        </template>
      </var-cell>
    </div>

    <div class="block" v-ripple>
      <var-cell border icon="power" title="退出登录" @click="logout">
        <template #extra>
          <var-icon name="chevron-right" />
        </template>
      </var-cell>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/plugins/auth";
export default {
  name: "setting",
  data() {
    return {
    };
  },
  methods: {
    logout() {
      this.$store.commit("setUserinfo", {});
      removeToken();
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss">
.setting {
  padding: 0.8em;
}
</style>