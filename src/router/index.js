import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

const routes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: { needLogin: false }
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
        meta: { needLogin: false }
      }
    ],
    meta: { needLogin: false }
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/wall/Home'),
        meta: { title: '首页', icon: 'dashboard' ,needLogin: false }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/wall/Add'),
        meta: { title: '添加留言', icon: 'dashboard' ,needLogin: true }
      },
      {
        path: 'wall',
        name: 'wall',
        component: () => import('@/views/wall/Wall'),
        meta: { title: '留言墙', icon: 'dashboard',needLogin: false  }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/wall/About'),
        meta: { title: '关于', icon: 'dashboard',needLogin: false  }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})

export default router
