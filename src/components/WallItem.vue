<template>
  <div class="wall-item">
    <div class="author-box">
      <div class="header">
        <var-image
          width="40px"
          height="40px"
          fit="cover"
          radius="50%"
          :src="data.head"
        />
        <span class="name" :vip="data.vip">{{ data.nickname }}</span>
        <span class="m-level" :lvl="data.level || 0"></span>
      </div>
      <div class="option">
        <var-icon name="dots-vertical" />
      </div>
    </div>
    <div class="content-box">
      <div class="texts">
        {{ data.content }}
      </div>
      <div v-if="data.pic_type == 'pic' && data.pic" class="pics">
        <var-image lazy :src="`${IMAGE_URL_HEADER}${data.pic}`" :radius="10" :loading="loadingPIC" />
      </div>
      <div v-if="data.pic_type == 'bv' && data.pic" class="pics">
        <var-image lazy :src="`${BV_IMG_URL_HEADER}${data.pic}`" :radius="10" :loading="loadingPIC" />
      </div>
    </div>
    <div class="meta-box">
      <div class="time">{{ time }}</div>
      <div class="labels" v-if="data.label.length != 0">
        <var-chip type="info" plain size="small"
          >{{ data.label }}
          <template #left> <var-icon name="radio-marked" /> </template
        ></var-chip>
      </div>
      <div class="types">
        <var-chip
          v-if="data.address"
          type="info"
          plain
          size="small"
          text-color="#888"
        >
          {{ data.address }}
          <template #left>
            <var-icon name="map-marker" />
          </template>
        </var-chip>
        <var-chip v-if="data.pic_type == 'bv'" type="info" plain size="small">
          哔哩哔哩
        </var-chip>
      </div>
    </div>
    <div class="option-box">
      <span class="item">
        <span class="heart-num">{{ data.stars }}</span>
        <var-icon color="#ff4400" :name="starName" @click="star" />
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
import { starMessage } from "@/api/wall";
import { Snackbar } from "@varlet/ui";
import loadingPIC from '@/assets/loading.gif';
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
      return timeFormat(this.data.publish_date);
    },
    isLike() {
      const likes = localStorage.getItem("likes") || "likes";
      return likes.includes(this.data.id);
    },
    isStar() {
      const stars = sessionStorage.getItem("stars") || [];
      return stars.includes(this.data.id);
    },
  },
  data() {
    return {
      loadingPIC,
      IMAGE_URL_HEADER,
      BV_IMG_URL_HEADER,
      starName: "heart-outline",
      likeName: "star-outline",
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
      if (likes.includes(this.data.id)) {
        likes = likes.split(",");
        likes = likes.filter((item) => item != this.data.id);
        likewalls = likewalls.filter((item) => item.id != this.data.id);
        localStorage.setItem("likewalls", JSON.stringify(likewalls));
        localStorage.setItem("likes", likes);
        this.likeName = "star-outline";
        return;
      }

      if (likewalls.length >= 3) {
        Snackbar.warning("收藏达到上限啦");
        return;
      }
      likes = likes.split(",");
      likes.push(this.data.id);
      likewalls.push(this.data);
      localStorage.setItem("likes", likes);
      localStorage.setItem("likewalls", JSON.stringify(likewalls));
      this.likeName = "star";
    },
    star() {
      let stars = sessionStorage.getItem("stars") || "stars";
      if (stars.includes(this.data.id)) {
        return;
      }
      starMessage(this.data.user, this.data.id).then((res) => {
        if (res.success) {
          stars = stars.split(",");
          // console.log("[ stars ] >", stars);
          stars.push(this.data.id);
          sessionStorage.setItem("stars", stars);
          this.starName = "heart";
          this.data.stars++;
        }
      });
    },
  },
};
</script>

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