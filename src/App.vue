<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { Dialog } from "@varlet/ui";
export default {
  name: "App",
   async created() {
    const actions = {
      confirm: () => {
        this.$router.push('/phone')
      },
    };
    if (!this._isMobile()) {
      actions[
        await Dialog({
          title: "温馨提示",
          message: "使用手机访问体验最佳哟~~~",
          cancelButton: false,
        })
      ]();
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
};
</script>
