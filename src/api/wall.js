import request from '@/plugins/axios'
import { getToken } from '@/plugins/auth'

//
export function createWall(data) {
  return request({
    url: '/wall/create',
    method: 'post',
    data,
    headers: {
      auth: getToken(),
    },
  })
}

// 获取列表
export function wallList(cur, key) {
  return request({
    url: '/wall/list',
    method: 'get',
    params: {
      current: cur || 1,
      key: key || '',
    },
    headers: {
      auth: getToken(),
    },
  })
}

export function labelList() {
  return request({
    url: '/wall/label',
    method: 'get',
    headers: {
      auth: getToken(),
    },
  })
}

export function label(lid) {
  return request({
    url: `/wall/label/${lid}`,
    method: 'get',
    headers: {
      auth: getToken(),
    },
  })
}

export function labelMess(lid, cur) {
  return request({
    url: `/wall/label/${lid}/mess`,
    method: 'get',
    params: {
      current: cur || 1,
    },
    headers: {
      auth: getToken(),
    },
  })
}

export function wallUserList(uid, cur) {
  return request({
    url: `/wall/u/${uid}`,
    method: 'get',
    params: {
      uid: uid || '',
      current: cur || 1,
    },
    headers: {
      auth: getToken(),
    },
  })
}

export function deleteMess(uid, mid) {
  return request({
    url: `/wall/u/${uid}/m/${mid}`,
    method: 'DELETE',
    headers: {
      auth: getToken(),
    },
  })
}
