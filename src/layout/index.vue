<template>
  <div class="app-wapper">
    <div class="navbar">
      <div class="container">
        <div class="left-menu">
          <el-image class="logo" :src="logo" fit="fill"></el-image>
        </div>
        <nav class="nav">
          <el-link icon="el-icon-home">
            <router-link to="/home"> 首页 </router-link>
          </el-link>
          <el-link icon="el-icon-home">
            <router-link to="/wall"> 留言墙 </router-link>
          </el-link>
          <el-link icon="el-icon-home">
            <router-link to="/about"> 关于 </router-link>
          </el-link>
        </nav>
        <div class="right-menu">
          <el-dropdown v-if="islogin" class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <img :src="avatar" class="user-avatar" />
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link to="/add">
                <el-dropdown-item> 添加留言 </el-dropdown-item>
              </router-link>
              <a href="http://auth.nilbrains.com" target="_black">
                <el-dropdown-item> 个人中心 </el-dropdown-item></a
              >
              <el-dropdown-item divided @click.native="logout">
                <span style="display: block">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-else>
            <a type="text" :href="`http://auth.nilbrains.com/#/login?callback=${calllpath}`">登录</a>
          </span>
        </div>
      </div>
    </div>
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
    <el-footer>
      <div class="container footer">
        <div class="">
          <a href="https://support.qq.com/product/325310" target="_blank">
            我要反馈
          </a>
        </div>
        <div>
          <a href="http://beian.miit.gov.cn/" target="_blank"
            ><i class="iconfont icon-beian"></i> 浙ICP备20019719号-1</a
          >
        </div>
        <div class="">
          <span>@2020-2021 </span>
          <a href="https://www.nilbrains.com" target="_blank">NILBRAINS</a>
        </div>
      </div>
    </el-footer>

    <el-backtop :bottom="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #ffffff;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 9px 3px;
            text-align: center;
            line-height: 40px;
            color: #1989fa;
            border-radius: 10px;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "@/assets/logo.png";
import { removeToken } from "@/plugins/auth";
import store from '@/store';
export default {
  name: "AppMain",
  computed: {
    ...mapGetters(["avatar", "islogin", "name", "uid"]),
    key() {
      return this.$route.path;
    },
    calllpath() {
      return document.location;
    }
  },
  data() {
    return {
      searchKey: "",
      logo: logo,
    };
  },
  methods: {
    logout() {
      removeToken();
      store.dispatch("logout")
      location.reload();
    },
  },
};
</script>
<style scoped>
.footer {
  text-align: center;
  padding: 20px;
}
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 10px;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .left-menu {
    float: left;
    height: 100%;
    min-height: 50px;
    .logo {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
  .nav {
    display: inline-block;
    font-size: 16px;
    font-weight: 800;
    line-height: 50px;
    margin-left: 8px;
    .el-link {
      margin: 0 15px;
    }
    .search-box {
      margin-left: 15px;
      width: 250px;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
