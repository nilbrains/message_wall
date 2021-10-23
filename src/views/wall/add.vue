<template>
  <div class="add">
    <var-form class="form" ref="form">
      <var-input
        placeholder="想写你就多写点"
        textarea
        v-model="wallData.content"
        :maxlength="300"
      />
      <!-- <div class="item">
        <span class="hint switch">匿名发布</span>
        <var-switch
          v-model="wallData.isNi"
          active-value="1"
          inactive-value="0"
        />
      </div> -->
      <var-input
        placeholder="话题"
        clearable
        readonly
        @click="selectLabel"
        v-model="wallData.label"
      />
      <!-- <div class="item">
        <span class="hint chip">推荐话题</span>
        <var-chip
          :type="'歪山' == wallData.label ? 'primary' : 'info'"
          @click="toLabel('歪山')"
          >歪山</var-chip
        >
        <var-chip
          :type="'王者' == wallData.label ? 'primary' : 'info'"
          @click="toLabel('王者')"
          >王者</var-chip
        >
      </div> -->
      <div class="vip" v-if="userinfo.isVip == 1">
        <var-uploader
          v-model="files"
          :maxlength="1"
          @after-read="handleAfterRead"
        />
      </div>
    </var-form>

    <var-popup position="left" v-model:show="labelShow">
      <div class="labels_box">
        <div class="title">请选择 话题</div>

        <div class="cons">
          <div class="line" v-for="(item, index) in labels" :key="index">
            <var-chip
              :type="item.lid == wallData.lid ? 'primary' : 'info'"
              @click="toLabel(item)"
              >{{ item.name }}</var-chip
            >
          </div>
        </div>
      </div>
    </var-popup>

    <var-button block type="success" @click="publish"> 发布 </var-button>
  </div>
</template>

<script>
import { Snackbar } from "@varlet/ui";
import { createWall, labelList } from "@/api/wall";
import { upload } from "@/api/user";
import { IMAGE_URL_HEADER } from '@/config';
export default {
  name: "add",
  data() {
    return {
      files: [],
      wallData: {
        uid: "",
        content: "",
        file: "",
        fileType: "0",
        lid: "",
        label: "",
        isNi: "0",
      },
      labels: [],
      labelShow: false,
      userinfo: this.$store.getters.getUserinfo,
    };
  },
  mounted() {
    this.wallData.address = localStorage.getItem("userAddress") || "";
  },
  methods: {
    selectLabel() {
      this.labelShow = true;
      this.initLabelList();
    },
    initLabelList() {
      labelList().then((res) => {
        if (res.success) {
          this.labels = res.data;
        }
      });
    },
    handleAfterRead(file) {
      let f = new FormData();
      f.append("image", file.file);
      upload(f).then((res) => {
        // console.log('[ res ] >', res)
        if (res.success) {
          Snackbar.success("图片上传成功");
          this.wallData.file = IMAGE_URL_HEADER + res.data;
          this.wallData.fileType = "1"
        } else {
          this.files = [];
          Snackbar.info("图片上传失败");
        }
      });
    },
    toLabel(v) {
      this.wallData.label = v.name === this.wallData.label ? "" : v.name;
      this.wallData.lid = v.lid === this.wallData.lid ? "" : v.lid;
      this.labelShow = false
    },

    publish() {
      let upData = this.wallData;
      if (upData.content.trim().length == 0) {
        Snackbar.info("请输入内容");
        return;
      }
      upData.uid = this.userinfo.id;
      console.log('%c [ upData ]', 'font-size:13px; background:pink; color:#bf2c9f;', upData)
      createWall(upData)
        .then((res) => {
          if (res.code === 20000) {
            Snackbar.success(res.message);
            this.$router.go(-1);
          }else{
            Snackbar.warning(res.message);
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  padding: 0.8em;
  .labels_box {
    padding: 20px 24px;
    width: 250px;
    .title {
      font-weight: 800;
      font-size: 1.1em;
      margin-bottom: 0.8em;
    }
    .line {
      margin-top: 0.2em;
      margin-bottom: 0.2em;
    }
  }
  .form {
    margin-bottom: 0.8em;
  }
  .var-input {
    margin-bottom: 0.8em;
  }
  .item {
    margin-bottom: 0.8em;
    .hint {
      margin-right: 0.5em;
      &.switch {
        line-height: 24px;
      }
    }
    .var-chip {
      margin: 0 0.3em;
      &.var-chip--info {
        transition: all 0.3s;
        color: #222;
        background-color: var(--chip-default-color);
      }
    }
  }
}
</style>