import router from './router'
import { getToken } from '@/plugins/auth'
import { Snackbar } from '@varlet/ui'
import store from './store'
import {TITLE} from './config';

function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${TITLE}`
}

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next()
    } else {
      const hasGetUserInfo = store.getters.getUserinfo.id
      if (hasGetUserInfo) {
        next()
        // console.log("hasGetUserInfo ....... true");
      } else {
        // console.log("hasGetUserInfo ....... false");
        try {
          await store.dispatch('getInfo')
          next()
        } catch (error) { 
          await store.dispatch('resetToken')
          Snackbar.info(error || "出了个错")
          next(`/login`)
        }
      }
    }
  } else {
    // console.log('path === > ',to);
    if (!to.meta.needLogin) {
      next()
    } else {
      Snackbar.info('请先登录')
      next('/login')
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
