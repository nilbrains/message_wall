import request from '@/plugins/axios'
import { getToken } from '@/plugins/auth'

export function createWall(data) {
  return request({
    url: '/wall/wall/add',
    method: 'post',
    data,
    headers: {
      token: getToken()
    }
  })
}

export function wallList(cur, key) {
  return request({
    url: '/wall/wall/getlist',
    method: 'get',
    params: {
      cur: cur || 1,
      key: key || '',
    },
    headers: {
      token: getToken()
    }
  })
}


export function wallNewList() {
  return request({
    url: '/wall/wall/getNewlist',
    method: 'get',
    headers: {
      token: getToken()
    }
  })
}


export function starMessage(id) {
  return request({
    url: '/wall/wall/starMessage',
    method: 'post',
    data: {
      id
    },
    headers: {
      token: getToken()
    }
  })
}