<template>
  <div class="login">
    <div class="form">
      <div class="title">欢迎登陆</div>
      <var-form ref="form">
        <var-input placeholder="请输入邮箱" v-model="loginData.username" />
        <var-input
          type="password"
          placeholder="请输入密码"
          v-model="loginData.password"
        />
      </var-form>
      <div class="hint">没有账号？<router-link to="reg">注册</router-link></div>
      <var-button block type="success" @click="login"> 登录 </var-button>
    </div>
  </div>
</template>

<script>
const emailRo =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import { Snackbar } from "@varlet/ui";
import { loginUser, userinfo } from "@/api/user";
import { setToken } from "@/plugins/auth";
export default {
  name: "login",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.loginData.username = localStorage.getItem("username")
  },
  methods: {
    login() {
      if (!emailRo.test(this.loginData.username)) {
        Snackbar.info("邮箱不规范");
        return;
      }
      if (!this.loginData.password) {
        Snackbar.info("密码不能为空");
        return;
      }
      let data = {};
      data.email = this.loginData.username;
      data.password = this.loginData.password;
      data.app = "well";
      loginUser(data)
        .then((res) => {
          // console.log("[ res ] >", res);
          localStorage.setItem("username",this.loginData.username)
          if (res.success) {
            setToken(res.data);
            this.$router.push("/me");
          } else {
            Snackbar.warning(res.message);
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  .form {
    width: 80vw;
    .var-input {
      padding-bottom: 1.5em;
    }
  }
  .title {
    font-size: 1.5em;
    padding-bottom: 1.5em;
  }
  .hint {
    padding-bottom: 1em;
    a {
      color: blue;
      text-decoration: none;
    }
  }
}
</style>