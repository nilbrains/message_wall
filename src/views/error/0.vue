<template>
  <div class="error_page flex-center position-ref full-height">
    <div class="error_code">
      <var-button @click="$router.back()">首页</var-button>
    </div>

    <div class="error_message" style="padding: 10px">哎呀，出了个错~~</div>
  </div>
</template>

<script>
export default {
  name: "error0",
};
</script>