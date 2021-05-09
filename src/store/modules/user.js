import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/plugins/auth'

const getDefaultState = () => {
  return {
    islogin: false,
    token: getToken(),
    name: '',
    avatar: '',
    uid: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_IS_LOGIN: (state, islogin) => {
    state.islogin = islogin
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { data ,success,message} = response
        // console.log("login data === > ",response);
        if (success) {
          const { head, nickname, id } = data
          // console.log(data)
          commit('SET_NAME', nickname)
          commit('SET_UID', id )
          commit('SET_IS_LOGIN',true)
          commit('SET_AVATAR', head)
          setToken(data)
          resolve()
        }else{
          reject(message)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // get user info
  getInfo({ commit }) {
    let token = getToken()
    let userinfo = JSON.parse(token)
    const { head, nickname, id } = userinfo
    commit('SET_NAME', nickname)
    commit('SET_UID', id )
    commit('SET_IS_LOGIN',true)
    commit('SET_AVATAR', head)
  },

  // user logout
  logout({ commit }) {
      
    removeToken() 
    commit('SET_IS_LOGIN',false)
    commit('RESET_STATE')
  },



}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

