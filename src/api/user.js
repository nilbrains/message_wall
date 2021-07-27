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