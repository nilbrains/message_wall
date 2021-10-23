<template>
  <div class="wall-item">
    <div class="author-box">
      <div class="header">
        <var-image
          width="40px"
          height="40px"
          fit="cover"
          radius="50%"
          :src="data.user.head"
        />
        <span class="name" :vip="data.user.isVip">{{ data.user.name }}</span>
        <span class="m-level" :lvl="data.user.level || 0"></span>
      </div>
      <div class="option">
        <slot name="menu" :mid="data.mid" :menu="menu"></slot>
      </div>
    </div>
    <div class="content-box">
      <div class="texts">
        {{ data.content }}
      </div>
      <div v-if="data.fileType == '1' && data.file" class="pics">
        <var-image
          lazy
          :src="`${data.file}`"
          :radius="10"
          :loading="loadingPIC"
        />
      </div>
      <!-- <div v-if="data.pic_type == 'bv' && data.pic" class="pics">
        <var-image lazy :src="`${BV_IMG_URL_HEADER}${data.pic}`" :radius="10" :loading="loadingPIC" />
      </div> -->
    </div>
    <div class="meta-box">
      <div class="time">{{ time }}</div>
      <div class="labels" v-if="data.label">
        <var-chip type="info" plain size="small"
          >{{ data.label }}
          <template #left> <var-icon name="radio-marked" /> </template
        ></var-chip>
      </div>
    </div>
    <div class="option-box">
      <span class="item">
        <var-badge v-if="data.isTop == '1'" type="danger" value="置顶" />
      </span>

      <span class="item">
        <var-icon color="#e8ca1a" :name="likeName" @click="like" />
      </span>
    </div>
  </div>
</template>

<script>
import { timeFormat } from "@/plugins/filter";
import { IMAGE_URL_HEADER, BV_IMG_URL_HEADER } from "@/config";
import { Snackbar } from "@varlet/ui";
import loadingPIC from "@/assets/loading.gif";
export default {
  name: "wall-item",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    time() {
      return timeFormat(this.data.publishData);
    },
    isLike() {
      const likes = localStorage.getItem("likes") || "likes";
      return likes.includes(this.data.mid);
    },
    isStar() {
      const stars = sessionStorage.getItem("stars") || [];
      return stars.includes(this.data.mid);
    },
  },
  data() {
    return {
      menu: false,
      loadingPIC,
      IMAGE_URL_HEADER,
      BV_IMG_URL_HEADER,
      starName: "heart-outline",
      likeName: "star-outline",
      userinfo: this.$store.getters.getUserinfo,
    };
  },
  mounted() {
    this.starName = this.isStar ? "heart" : "heart-outline";
    this.likeName = this.isLike ? "star" : "star-outline";
  },
  methods: {
    like() {
      let likes = localStorage.getItem("likes") || "likes";
      let likewalls = localStorage.getItem("likewalls") || "[]";
      likewalls = JSON.parse(likewalls);
      if (likes.includes(this.data.mid)) {
        likes = likes.split(",");
        likes = likes.filter((item) => item != this.data.mid);
        likewalls = likewalls.filter((item) => item.mid != this.data.mid);
        localStorage.setItem("likewalls", JSON.stringify(likewalls));
        localStorage.setItem("likes", likes);
        this.likeName = "star-outline";
        return;
      }

      if (likewalls.length >= 10) {
        Snackbar.warning("收藏达到上限啦");
        return;
      }
      likes = likes.split(",");
      likes.push(this.data.mid);
      likewalls.push(this.data);
      localStorage.setItem("likes", likes);
      localStorage.setItem("likewalls", JSON.stringify(likewalls));
      this.likeName = "star";
    },
  },
};
</script>

<style lang="scss">
.wall-item {
  .pics {
    .var-image__image {
      min-width: 50%;
      max-width: 80%;
    }
  }
}
</style>

<style lang="scss" scoped>
$padding: 0.8em;
.wall-item {
  padding: $padding;
  border-bottom: #999 0.5px dashed;

  .author-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header {
      display: flex;
      align-items: center;
      .name {
        padding-left: $padding;
        font-weight: bold;
        margin-right: 0.3em;
      }
    }
  }
  .content-box {
    .texts {
      padding: $padding 0;
    }
  }
  .meta-box {
    padding: $padding 0;
    .time {
      color: #888;
    }
    .types {
      .var-icon {
        color: #333;
      }
      .var-chip {
        margin-right: 0.3em;
      }
    }
    .labels {
      padding: $padding 0;
      padding-bottom: 0.3em;
      .var-chip {
        margin-right: 0.3em;
      }
    }
  }
  .option-box {
    display: flex;
    align-content: center;
    flex-direction: row-reverse;
    align-items: center;
    // font-size: 1.1em;
    justify-content: space-between;
    & > .item {
      display: flex;
      align-items: center;
    }
    .heart-num {
      padding-right: $padding;
    }
  }
}
</style>