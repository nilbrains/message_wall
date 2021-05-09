import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/plugins/auth' 

// NProgress.configure({ showSpinner: false }) // NProgress Configuration
const title = '一言于心';  

function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`
  }
  return `${title}`
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  // NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      // NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
        // console.log("hasGetUserInfo ....... true");
      } else {
        // console.log("hasGetUserInfo ....... false");
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {
    // console.log('path === > ',to);
    if (!to.meta.needLogin) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
