import request from '@/plugins/axios'

export function createUser(data) {
  return request({
    url: '/wall/user/reg',
    method: 'post',
    data
  })
}


export function login(data) {
  return request({
    url: '/wall/user/login',
    method: 'post',
    data
  })
}
