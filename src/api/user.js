import { getToken } from '@/plugins/auth'
import request from '@/plugins/axios'
// 
export function userinfo() {
  return request({
    url: '/auth/user/info',
    method: 'get',
    headers: {
      auth: getToken()
    }
  })
}

// 登录
export function loginUser(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 
export function createUser(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export function changeUser(data) {
  return request({
    url: '/auth/user/modify',
    method: 'post',
    data,
    headers: {
      auth: getToken()
    }
  })
}

export function upload(data) {
  return request({
    url: 'https://api.nilbrains.com/index/index/upload',
    method: 'post',
    data,
    headers: {'Content-Type': 'multipart/form-data'},
    transformRequest: [
      (data) => {
        return data instanceof FormData
          ? data
          : JSON.stringify({
              //此处的data类型判断为重要点，
              ...data,
            });
      },
    ],
  })
}
