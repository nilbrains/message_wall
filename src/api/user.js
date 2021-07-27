import { getToken } from '@/plugins/auth'
import request from '@/plugins/axios'

export function userinfo() {
  return request({
    url: '/auth/user/info',
    method: 'get',
    headers: {
      token: getToken()
    }
  })
}

export function loginUser(data) {
  return request({
    url: '/auth/user/login',
    method: 'post',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/auth/user/register',
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
      token: getToken()
    }
  })
}

export function upload(data) {
  return request({
    url: '/index/index/upload',
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
