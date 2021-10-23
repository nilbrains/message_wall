<template>
  <div class="modify">
    <var-form ref="form">
      <var-image
        width="60px"
        height="60px"
        class="head"
        fit="cover"
        radius="50%"
        :src="userinfo.head || 'https://varlet.gitee.io/varlet-ui/cat.jpg'"
      />
      <var-input placeholder="邮箱" readonly v-model="userinfo.email" />
      <var-input
        placeholder="账号"
        readonly
        @click="change('account')"
        v-model="userinfo.account"
      />
      <var-input
        placeholder="昵称"
        readonly
        @click="change('name')"
        v-model="userinfo.name"
      />
      <div class="item">
        <div class="hint">个人中心背景图片</div>
        <div>
          <var-uploader
            v-model="files"
            :maxlength="1"
            @after-read="afterRead"
            @remove="remove"
          />
        </div>
      </div>
    </var-form>

    <var-dialog v-model:show="show" @confirm="save(changeType.type)">
      <template #title>
        <var-icon name="wifi" color="#2979ff" />
        {{ changeType.title }}
      </template>

      <var-input :placeholder="changeType.tip" v-model="temp" />
    </var-dialog>
  </div>
</template>

<script>
import { Snackbar } from "@varlet/ui";
import { changeUser, userinfo } from "@/api/user";
export default {
  name: "modify",
  data() {
    return {
      files: [],
      temp: "",
      show: false,
      userinfo: this.$store.getters.getUserinfo,
      changeType: {},
      changeOption: {
        account: {
          title: "请修改你的账号",
          tip: "账号",
          type: "account",
        },
        head: {
          title: "请修改你的头像(链接)",
          tip: "头像(链接)",
          type: "head",
        },
        name: {
          title: "请修改你的昵称",
          tip: "昵称",
          type: "name",
        },
      },
    };
  },
  mounted() {
    const bg = localStorage.getItem("userbg");
    if (bg) {
      this.files = [
        {
          cover: bg,
          url: bg,
        },
      ];
    }
  },
  methods: {
    remove(file) {
      // console.log("[ file remove] >", file);
      localStorage.removeItem("userbg");
    },
    afterRead(file) {
      // console.log("[ file afterRead] >", this.files);
      localStorage.setItem("userbg", file.url);
    },
    save(type) {
      let subText = this.temp;
      let subData = {};
      if (subText.trim() == "") {
        Snackbar.warning("修改内容不能为空");
        return;
      }
      subData["uid"] = this.userinfo.id;
      subData["type"] = type;
      switch (type) {
        case "account":
          if (this.userinfo.account_change === "1") {
            Snackbar.warning("账号只能修改一次");
            return;
          }
          subData["account"] = subText;
          break;
        case "head":
          subData["head"] = subText;
          break;
        case "name":
          subData["name"] = subText;
          break;
        default:
          break;
      }
      // console.log("[ submitUpdate - type ] >", subData);

      if (subText == this.userinfo[type]) {
        Snackbar.info("没有修改内容");
        return;
      }

      console.log('%c [ subData ]', 'font-size:13px; background:pink; color:#bf2c9f;', subData)
      changeUser(subData)
        .then((res) => {
          if (res.success) {
            Snackbar.success("修改成功");
            this.userinfo[type] = subText;
            if (type == "account") {
              this.userinfo.account_change = "1";
            }
            userinfo().then((response) => {
              const { data } = response;

              this.$store.commit("setUserinfo", data);
            });
            this.changeInfoFlag = false;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.temp = "";
        });
    },
    change(v) {
      this.changeType = this.changeOption[v];
      this.temp = this.userinfo[v];
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.modify {
  padding: 0.8em;
  .form,
  .var-input {
    margin-bottom: 0.8em;
  }
  .var-image {
    margin: 0 auto;

    margin-bottom: 0.8em;
    margin-top: 0.8em;
  }
  .item {
    .hint {
      margin-bottom: 0.8em;
    }
  }
}
</style>