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
