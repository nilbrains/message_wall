import { userinfo } from '@/api/user'
import { removeToken } from '@/plugins/auth'
import { createStore } from 'vuex'

export default createStore({
  state: {
    userinfo: {},
    islogin: false
  },
  getters: {
    getUserinfo: (state) => state.userinfo,
  },
  mutations: {
    setLogin(state, t) {
      state.islogin = t
    },
    setUserinfo(state, userinfo) {
      state.userinfo = userinfo
    },
  },
  actions: {
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        userinfo()
          .then((response) => {
            const { data } = response

            if (!data) {
              return reject('请重新登录')
            }

            commit('setUserinfo', data)
            commit('setLogin',true)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // remove token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        removeToken() // must remove  token  first
        commit('setUserinfo', {})
        commit('setLogin',false)
        resolve()
      })
    },
  },
  modules: {},
})
