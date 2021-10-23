<template>
  <div class="me">
    <div class="user-card var-elevation--4" v-lazy:background-image="bg">
      <var-image
        width="60px"
        height="60px"
        class="head"
        fit="cover"
        radius="50%"
        :src="userinfo.head || 'https://varlet.gitee.io/varlet-ui/cat.jpg'"
      />
      <div class="info">
        <div class="name">{{ userinfo.name || "未登录" }}</div>
        <div class="account">{{ userinfo.account || "5201314" }}</div>
      </div>
      <div class="options">
        <var-button
          text
          color="transparent"
          text-color="#ffffff"
          @click="$router.push('/me/modify')"
        >
          修改资料
        </var-button>
        <var-button
          round
          text
          color="transparent"
          text-color="#ffffff"
          @click="$router.push('/setting')"
        >
          <var-icon name="menu" />
        </var-button>
      </div>
    </div>
    <div class="navs">
      <var-tabs v-model:active="activeNavs">
        <var-tab>发布</var-tab>
        <var-tab>收藏</var-tab>
      </var-tabs>
    </div>
    <div class="cons">
      <var-tabs-items v-model:active="activeNavs">
        <var-tab-item>
          <var-pull-refresh v-model="isRefresh" @refresh="refreshUser">
            <var-list
              loading-text="正在努力输出"
              finished-text="一滴都没有了"
              error-text="出错了出错了"
              :finished="finished"
              v-if="userinfo.id"
              v-model:loading="isRefresh"
              @load="load"
            >
              <wall-item
                :data="item"
                :key="index"
                v-for="(item, index) in userwalls"
              >
                <template #menu="data">
                  <var-icon name="trash-can" @click="deletedTo(data)" />
                </template>
              </wall-item>
            </var-list>
            <empty
              v-if="userwalls.length == 0 && !isRefresh"
              hint="快去添加吧"
            />
          </var-pull-refresh>
        </var-tab-item>
        <var-tab-item>
          <var-pull-refresh v-model="isRefresh" @refresh="refresh">
            <wall-item
              :data="item"
              :key="index"
              v-for="(item, index) in likewalls"
            />
            <empty v-if="likewalls.length == 0" hint="快去收藏吧" />
          </var-pull-refresh>
        </var-tab-item>
      </var-tabs-items>
    </div>
  </div>
</template>

<script>
import WallItem from "@/components/WallItem.vue";
import Empty from "@/components/Empty.vue";
import { deleteMess, wallUserList } from "@/api/wall";
import { mapState } from "vuex";
import { Snackbar } from "@varlet/ui";
export default {
  components: { WallItem, Empty },
  name: "me",
  data() {
    return {
      menu: false,
      finished: false,
      isRefresh: false,
      activeNavs: 0,
      likewalls: [],
      userwalls: [],
      page: 1,
      bg: "https://varlet.gitee.io/varlet-ui/cat.jpg",
    };
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  mounted() {
    this.likewalls = JSON.parse(localStorage.getItem("likewalls")) || [];
    this.bg =
      localStorage.getItem("userbg") ||
      "https://varlet.gitee.io/varlet-ui/cat.jpg";
  },
  methods: {
    refresh() {
      setTimeout(() => {
        this.likewalls = JSON.parse(localStorage.getItem("likewalls")) || [];
        this.isRefresh = false;
      }, 1000);
    },
    deletedTo(data) {
      deleteMess(this.userinfo.id, data.mid)
        .then((res) => {
          if (res.success) {
            Snackbar.success(res.message);
            this.refreshUser();
          } else {
            Snackbar.warning(res.message);
          }
        })
        .finally(() => {
          this.menu = false;
        });
    },
    load() {
      this.initData();
    },
    initData() {
      wallUserList(this.userinfo.id, this.page).then((res) => {
        this.isRefresh = false;
        if (res.success) {
          this.page++;
          this.userwalls.push(...res.data.records);
          if (res.data.records.length == 0) {
            this.finished = true;
          }
        }
      });
    },
    refreshUser() {
      setTimeout(() => {
        this.page = 1;
        this.userwalls = [];
        this.load();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.me {
  .user-card {
    height: 220px;
    display: flex;
    flex-direction: column;

    background-size: 100% 100%;
    justify-content: flex-end;
    align-items: center;
    padding: 1em;
    .head {
      border: #fff 2px solid;
      margin-bottom: 0.8em;
    }
    .info {
      text-align: center;
      margin-bottom: 1.8em;
      .name {
        font-size: 1.3em;
        display: block;
        color: #fff;
      }
      .account {
        display: block;
        color: #f2f2f2;
      }
    }
    .options {
      align-self: flex-end;
      display: flex;
      align-items: center;
    }
  }
}
</style>