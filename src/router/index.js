import * as VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
          needLogin: false,
          header: false,
          bar: true,
          keep: true,
        },
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/wall/add.vue'),
        meta: { title: '添加', needLogin: true, header: false, keep: true },
      },
      {
        // label.mess.vue
        path: '/wall/l/:lid',
        name: 'label_mess',
        component: () => import('@/views/wall/label.mess.vue'),
        meta: { title: '', needLogin: false, header: true, keep: false },
      },
      {
        path: 'me',
        name: 'me',
        component: () => import('@/views/user/me.vue'),
        meta: {
          title: '我的',
          needLogin: true,
          header: false,
          bar: true,
          keep: true,
        },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/login.vue'),
        meta: { title: '登录', needLogin: false, header: true },
      },
      {
        path: '/reg',
        name: 'reg',
        component: () => import('@/views/user/reg.vue'),
        meta: { title: '注册', needLogin: false, header: true },
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/wall/add.vue'),
        meta: { title: '添加', needLogin: true, header: true },
      },
      {
        path: '/me/modify',
        name: 'modify',
        component: () => import('@/views/user/modify.vue'),
        meta: { title: '个人信息', needLogin: true, header: true },
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/index.vue'),
        meta: { title: '设置', needLogin: false, header: true, keep: true },
      },
      {
        path: '/setting/about',
        name: 'about_setting',
        component: () => import('@/views/setting/about.vue'),
        meta: { title: '关于', needLogin: false, header: true, keep: true },
      },
      {
        path: '/0',
        name: '0_error',
        component: () => import('@/views/error/0.vue'),
        meta: {
          title: 'Singularity',
          needLogin: false,
          header: false,
          bar: false,
        },
      },
      {
        path: '/phone',
        name: 'phone',
        component: () => import('@/views/error/phone.vue'),
        meta: {
          title: 'use phone',
          needLogin: false,
          header: false,
          bar: false,
        },
      },
      {
        path: '/404',
        name: '404_error',
        component: () => import('@/views/error/404.vue'),
        meta: {
          title: 'Not Found',
          needLogin: false,
          header: false,
          bar: false,
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

export default router
