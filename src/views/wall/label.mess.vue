<template>
  <div>
    <var-list
      loading-text="正在努力输出"
      finished-text="一滴都没有了"
      error-text="出错了出错了"
      :finished="finished"
      v-model:loading="loading"
      @load="load"
    >
      <wall-item :data="item" :key="index" v-for="(item, index) in walls" />
    </var-list>
  </div>
</template>

<script>
import WallItem from "@/components/WallItem.vue";
import { labelMess } from "@/api/wall";
export default {
  components: {
    WallItem,
  },
  data() {
    return {
      lid: this.$route.params.lid,
      loading: false,
      finished: false,
      page: 1,
      walls: [],
    };
  },
  created() {},
  methods: {
    load() {
      this.initData();
    },
    initData() {
      labelMess(this.lid, this.page).then((res) => {
        console.log("[ res ] >", res);
        this.loading = false;
        if (res.success) {
          this.page++;
          this.walls.push(...res.data.records);
          if (res.data.records.length == 0) {
            this.finished = true;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
</style>