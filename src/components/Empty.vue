<template>
  <div class="empty">
    <div class="empty-img">
      <var-image :src="empty" />
    </div>
    <div class="empty-hint">
      {{hint}}
    </div>
  </div>
</template>

<script>
import empty from '@/assets/empty.png';
export default {
  name: "empty",
  props: {
    hint: {
      type: String,
      default: "空空如也"
    }
  },
  data() {
    return {
      empty
    }
  }
};
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .empty-img {
    width: 50%;
    padding: 1.8em 0 ;
  }
}
</style>