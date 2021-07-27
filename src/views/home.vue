<template>
  <div class="home">
    <div class="swipe_top">
      <var-swipe class="swipe" :autoplay="2000">
        <var-swipe-item v-for="(item, index) in swipes" :key="index">
          <img class="swipe-item" :src="item" />
        </var-swipe-item>
      </var-swipe>
    </div>
    <div class="con">
      <div class="top_navs">
        <var-tabs
          sticky
          elevation
          color="#2979ff"
          active-color="#fff"
          inactive-color="hsla(0, 0%, 100%, .6)"
          :offset-top="50"
          v-model:active="activeNav"
          @change="changeNav"
        >
          <var-tab
            v-for="(item, index) in navs"
            :key="index"
            :name="item.type"
            >{{ item.text }}</var-tab
          >
        </var-tabs>
      </div>
      <div class="bon_con">
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
    </div>
  </div>
</template>

<script>
import WallItem from "@/components/WallItem.vue";
import { wallList } from "@/api/wall.js";
export default {
  components: {
    WallItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      activeNav: "new",
      page: 1,
      navs: [
        {
          type: "new",
          text: "最新",
        },
        {
          type: "hot",
          text: "最热",
        },
        {
          type: "ran",
          text: "全部",
        },
      ],
      swipes: [
        "https://cdn.jsdelivr.net/gh/nilbrains/nil/images/2021/wall/banner-one.jpg",
        "https://cdn.jsdelivr.net/gh/nilbrains/nil/images/2021/wall/banner-two.jpg",
      ],
      walls: [],
    };
  },
  methods: {
    changeNav(active) {
      // console.log("[ active ] >", active);
      (this.page = 1), (this.loading = false);
      this.finished = false;
      this.walls = [];
      this.load();
    },
    load() {
      this.initData();
    },
    initData() {
      wallList(this.activeNav, this.page).then((res) => {
        // console.log("[ res ] >", res);
        this.loading = false;
        if (res.success) {
          this.page++;
          this.walls.push(...res.data.list);
          if (res.data.list.length == 0) {
            this.finished = true;
          }
        }
      });
    },
  },
  mounted() {
    // this.initData();
  },
};
</script>

<style lang="scss" scoped>
.swipe {
  height: 140px;
}

.swipe-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>