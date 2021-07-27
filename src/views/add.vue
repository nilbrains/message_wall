<template>
  <div class="add">
    <var-form class="form" ref="form">
      <var-input
        placeholder="想写你就多写点"
        textarea
        v-model="wallData.content"
        :maxlength="300"
      />
      <div class="item">
        <span class="hint switch">匿名发布</span>
        <var-switch
          v-model="wallData.is_ni"
          active-value="1"
          inactive-value="0"
        />
      </div>
      <var-input
        placeholder="留下你的足迹叭"
        readonly
        v-model="wallData.address"
        @click="selectAdrs"
      />
      <var-input
        placeholder="标签"
        clearable
        readonly
        :maxlength="4"
        v-model="wallData.label"
      />
      <div class="item">
        <span class="hint chip">推荐标签</span>
        <var-chip :type="'歪山'==wallData.label?'primary':'info'" @click="toLabel('歪山')">歪山</var-chip>
        <var-chip :type="'王者'==wallData.label?'primary':'info'" @click="toLabel('王者')">王者</var-chip>
      </div>
      <div class="vip" v-if="userinfo.vip == 1">
        <var-uploader v-model="files" :maxlength="1" @after-read="handleAfterRead"/>
      </div>
    </var-form>

    <var-button block type="success" @click="publish"> 发布 </var-button>
  </div>
</template>

<script>
import { Picker, Snackbar } from "@varlet/ui";
import columns from "@varlet/ui/json/area.json";
import { createWall } from '@/api/wall';
import { upload } from '@/api/user';
export default {
  name: "add",
  data() {
    return {
      files:[],
      wallData: {
        content: "",
        label: "",
        address: "",
        is_ni: "0",
        pic:""
      },
      userinfo: this.$store.getters.getUserinfo
    };
  },
  mounted() {
    this.wallData.address = localStorage.getItem("userAddress") || "";
  },
  methods: {
    handleAfterRead(file) {
      let f = new FormData();
      f.append("image",file.file)
      upload(f).then(res => {
        // console.log('[ res ] >', res)
        if (res.success) {
          Snackbar.success("图片上传成功")
          this.wallData.pic = res.data;
        }else{
          this.files = []
          Snackbar.info("图片上传失败")
        }
      })
    },
    toLabel(v) {
      this.wallData.label = v === this.wallData.label ? "" : v;
    },
    async selectAdrs() {
      const { state, texts, indexes } = await Picker({
        cascade: true,
        columns,
      });
      // console.log("[ texts ] >", state, texts);
      if (state == "confirm") {
        this.wallData.address = texts[texts.length - 1];
        localStorage.setItem("userAddress", this.wallData.address);
      }
    },
    publish() {

      let upData = this.wallData;
      if (upData.content.trim().length == 0) {
        Snackbar.info("请输入内容")
        return
      }
      upData.user = this.userinfo.id;
      createWall(upData).then((res) => {
        if (res.code === 20000) {
          Snackbar.success(res.message)
          this.$router.go(-1);
        }
      }).catch(()=>{
      })

    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  padding: 0.8em;
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
        transition: all .3s;
        color: #222;
        background-color: var(--chip-default-color);
      }
    }
  }
}
</style>