<template>
  <div class="about">
    <var-card
      title="注意事项一"
      description="为营造良好的网络环境，请遵守相关法律法规，请勿发布垃圾、敏感等信息留言；若遇到不良信息一定要向我们举报。"
    />
    <var-card
      title="注意事项二"
      description="如果你有更好的建议或者反馈 --> 那么"
    >
      <template #extra>
        <var-button type="primary"
        @click="toFeedback"
          >使劲点我</var-button
        >
      </template>
    </var-card>
  </div>
</template>

<script>
export default {
  name: "about",
  methods: {
    toFeedback() {
      location.href = '//support.qq.com/product/325310'
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  padding: 0.8em;
  .var-card {
    margin-bottom: 0.8em;
  }
}
</style>