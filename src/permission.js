import router from './router'
import { getToken } from '@/plugins/auth' 
import store from './store';

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
        console.log("hasGetUserInfo ....... true");
      } else {
        console.log("hasGetUserInfo ....... false");
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          console.log();
          next()
        }
      }
    }
  } else {
    // console.log('path === > ',to);
    if (!to.meta.needLogin) {
      next()
    } else {
      document.location = (`http://auth.nilbrains.com/#/login?callback=${document.location}`)
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
