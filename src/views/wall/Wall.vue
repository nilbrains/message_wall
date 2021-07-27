<template>
  <div class="wall container">
    <div class="top">
      <el-alert
        title="留言墙"
        type="success"
        :closable="false"
        description="你可以在这里留下你想对(ta,他，她)说的话，当然也可以是对自己说的......"
      >
      </el-alert>
      <div class="search">
        <el-input
          v-model="searchKey"
          placeholder="搜一搜"
          size="normal"
          prefix-icon="el-icon-search"
          clearable
          @keyup.enter.native="handleSearch"
        >
          <el-button slot="append" @click="handleSearch">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="mainc">
      <div class="content-box">
        <wall-card
          v-for="(item, index) in wallList"
          :key="index"
          :data="item"
        />
        <empty-box v-if="wallList.length === 0" />
      </div>
      <div class="pages">
        <el-pagination
          background
          :page-size="page.size"
          :current-page="page.cur"
          layout="prev, pager, next"
          :total="page.count"
          @current-change="pageChange"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { wallList } from "@/api/wall";

import WallCard from "@/components/WallCard";
import EmptyBox from "@/components/EmptyBox";
export default {
  name: "Wall",
  components: {
    WallCard,
    EmptyBox
  },
  data() {
    return {
      searchKey: "",
      wallList: [],
      page: {
        size: 20,
        cur: 1,
        count: 0,
      },
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    pageChange(cur) {
      this.fetch(cur, this.searchKey);
    },
    fetch(cur, key) {
      wallList(cur, key)
        .then((res) => {
          // console.log("[ res ] >", res);
          if (res.code === 20000) {
            this.wallList = res.data.list;
            this.page.cur = +res.data.cur_page;
            this.page.count = res.data.count;
          }
        })
        .catch(() => {});
    },
    handleSearch() {
      // console.log("[ searchKey ] >", this.searchKey);

      if (this.searchKey.trim().length > 0) {
        this.$router.push({
          query: {
            key: this.searchKey,
            t: new Date().getTime()
          },
        });
      } else {
        this.$router.push("/wall?t="+ new Date().getTime());
      }
      this.fetch(1, this.searchKey);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  padding: 2rem 0;
  .el-image {
    width: 100%;
  }
  .search {
    margin-top: 2rem;
  }
}
.mainc {
  .text-center {
    text-align: center;
  }
  .content-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .pages {
    text-align: center;
  }
}
</style>
