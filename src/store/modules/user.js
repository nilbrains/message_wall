import { userinfo } from '@/api/user'
import { getToken } from '@/plugins/auth'


const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    uid: '',
    islogin: !!getToken()
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
  SET_UID: (state,uid) => {
    state.uid = uid
  }
}

const actions = {
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      userinfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, id, head } = data
        commit('SET_NAME', name)
        commit('SET_UID', id)
        commit('SET_AVATAR', head)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit }){
    commit('RESET_STATE', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

