<template>
  <div class="login">
    <div class="form">
      <div class="title">欢迎注册</div>
      <var-form ref="form">
        <var-input placeholder="请输入邮箱" v-model="regData.email" />
        <var-input
          type="password"
          placeholder="请输入密码(字,数,@$%)"
          v-model="regData.password"
        />
        <var-input
          type="password"
          placeholder="请再次输入密码"
          v-model="regData.rePassword"
        />
      </var-form>
      <div class="hint">
        已有账号！<router-link to="login">登录</router-link>
      </div>
      <var-button block type="success" @click="reg"> 注册 </var-button>
    </div>
  </div>
</template>

<script>
const emailRo =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRo = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[a-z])(?=\S*[@$%])\S*$/;

import { Snackbar } from "@varlet/ui";
import { createUser } from '@/api/user';
export default {
  name: "login",
  data() {
    return {
      regData: {
        email: "",
        password: "",
        rePassword: "",
      },
    };
  },
  methods: {
    reg() {
      if (!emailRo.test(this.regData.email)) {
        Snackbar.info("邮箱不规范");
        return;
      }
      // if (!passRo.test(this.regData.password)) {
      //   Snackbar.info("密码强度有点低喔");
      //   return;
      // }
      if (this.regData.rePassword != this.regData.password) {
        Snackbar.info("两次密码不一致");
        return;
      }
      let data = {};

      data.email = this.regData.email;
      data.password = this.regData.password;
      data.rePassword = this.regData.rePassword;
      
      createUser(data)
        .then((res) => {
          // console.log("[ res ] >", res);
          if (res.success) {
            Snackbar.success("注册成功")
            this.$router.push("/login")
          }else{
            Snackbar.error(res.message)
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