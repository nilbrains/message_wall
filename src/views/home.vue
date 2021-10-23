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
        <var-tabs-items v-model:active="activeNav" :can-swipe="false">
          <var-tab-item name="new">
            <var-list
              loading-text="正在努力输出"
              finished-text="一滴都没有了"
              error-text="出错了出错了"
              :finished="finished"
              v-model:loading="loading"
              @load="load"
            >
              <wall-item
                :data="item"
                :key="index"
                v-for="(item, index) in walls"
              />
            </var-list>
          </var-tab-item>
          <var-tab-item name="all">
            <div class="labels_box">
              <div class="label" v-for="item,index in labels" :key="`l${index}`" v-ripple @click="$router.push(`/wall/l/${item.lid}?t=${item.name}`)">
                <var-icon :name="item.icon" :size="32" />
                <div class="name">{{item.name}}</div>
              </div>
            </div>
          </var-tab-item>
        </var-tabs-items>
      </div>
    </div>
  </div>
</template>

<script>
import WallItem from "@/components/WallItem.vue";
import { labelList, wallList } from "@/api/wall.js";
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
          type: "all",
          text: "广场",
        },
      ],
      swipes: [
        "https://cdn.jsdelivr.net/gh/nilbrains/nil/images/2021/wall/banner-one.jpg",
        "https://cdn.jsdelivr.net/gh/nilbrains/nil/images/2021/wall/banner-two.jpg",
      ],
      walls: [],
      labels: []
    };
  },
  methods: {
    changeNav(active) {
      // console.log("[ active ] >", active);
      this.$router.push({query: { active }})
    },
    load() {
      this.initData();
      this.initLabels()
    },
    initLabels() {
     labelList().then((res) => {
        if (res.success) {
          this.labels = res.data;
        }
      });
    },
    initData() {
      wallList(this.page).then((res) => {
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
  mounted() {
    // this.changeNav = this.$route.query.active
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
.labels_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 0.8em;
  .label {
    flex-basis: 30%;
    text-align: center;
    box-sizing: border-box;
    padding: .2em;
    margin-bottom: .3em;
    .name {
      margin-top: 0.4em;
    }
  }
}
</style>