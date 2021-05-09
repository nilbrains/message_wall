<template>
  <el-card shadow="hover" class="wall_card">
    <div slot="header" class="clearfix">
      <span class="towho"
        ><i class="iconfont icon-submit"></i>
        {{ data.to_username || "未知" }}</span
      >
      <span class="from_address"
        ><i class="iconfont icon-address"></i>
        {{ data.address || "未知" }}</span
      >
    </div>
    <div class="con_body" v-html="data.content"></div>
    <div class="con_label">
      <el-tag
        type="success"
        size="small"
        effect="dark"
        v-for="(iiii, index) in data.label.split(',')"
        :key="index"
        >{{ iiii }}</el-tag
      >
    </div>
    <div class="con_foot">
      <span class="time"
        ><i class="iconfont icon-time"></i> {{ data.publish_date }}</span
      >
      <span class="who"
        ><i class="iconfont icon-user_pre"></i> {{ data.nickname }}</span
      >
      <span class="star" @click="starMess(data.id)"
        ><i class="iconfont icon-star" :class="data.stars == 0 ? '' :'red_color'"></i> {{ data.stars }}</span
      >
    </div>
  </el-card>
</template>

<script>
import { starMessage } from "@/api/wall";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    starMess(id) {
      // console.log("[ id ] >", id);
      starMessage(id)
        .then((res) => {
          // console.log(res);
          if (res.success) {
            this.$message.success(res.message);
            this.data.stars += 1;
          } else {
            this.$message.info("点赞失败");
          }
        })
        .catch(() => {
          this.$message.info("点赞失败");
        });
    },
  },
};
</script>

<style lang="scss" scope>
.wall_card {
  width: 48%;
  margin-bottom: 10px;
  .from_address {
    float: right;
    padding: 3px 0;
  }
  .con_body {
    margin-bottom: 5px;
  }
  .con_label {
    margin-bottom: 5px;
  }
  .con_foot {
    span {
      padding: 0 5px;
    }
  }
  .red_color {
    color: #f40;
  }
}

@media screen and (max-width: 768px) {
  .wall_card {
    width: 96%;
  }
}
</style>
