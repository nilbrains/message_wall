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

export function wallList(type, cur, key) {
  return request({
    url: '/wall/wall/getlist',
    method: 'get',
    params: {
      type: type || 'new',
      cur: cur || 1,
      key: key || '',
    },
    headers: {
      token: getToken()
    }
  })
}

export function wallUserList(uid, cur) {
  return request({
    url: '/wall/wall/getUserList',
    method: 'get',
    params: {
      uid: uid || '',
      cur: cur || 1
    },
    headers: {
      token: getToken()
    }
  })
}

export function starMessage(uid,id) {
  return request({
    url: '/wall/wall/starMessage',
    method: 'post',
    data: {
      id,
      uid
    },
    headers: {
      token: getToken()
    }
  })
}